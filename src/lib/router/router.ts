/* eslint-disable @typescript-eslint/unbound-method */
import { createEffect, createEvent, createStore, sample } from 'effector';
import {
  BrowserHistory,
  HashHistory,
  MemoryHistory,
  State,
  Update,
} from 'history';

import { createMergedRoute, createRoute } from './route';
import {
  Delta,
  MergedRoute,
  Params,
  Query,
  Route,
  RouteConfig,
  Router,
  RouterConfig,
  ToLocation,
} from './types';
import {
  createHistory,
  getQueryParams,
  historyChanger,
  reduceStore,
} from './utils';

export const createRouter = <Q extends Query = Query, S extends State = State>({
  history: userHistory,
  root,
}: RouterConfig<S> = {}): Router<Q, S> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let history = userHistory! ?? createHistory<S>(root);

  const historyUpdated = createEvent<Update>();
  const $historyUpdate = createStore<Update>({
    location: history.location,
    action: history.action,
  }).on(historyUpdated, (_, update) => update);

  let unlisten = history.listen(historyUpdated);

  const navigate = createEvent<ToLocation<S>>();
  const redirect = createEvent<ToLocation<S>>();
  const shift = createEvent<Delta>();
  const back = shift.prepend<void>(() => -1);
  const forward = shift.prepend<void>(() => 1);

  const $location = $historyUpdate.map((update) => update.location);
  const $action = $historyUpdate.map((update) => update.action);
  const $pathname = $location.map((location) => location.pathname);
  const $search = $location.map((location) => location.search);
  const $hash = $location.map((location) => location.hash);
  const $state = $location.map((location) => location.state);
  const $key = $location.map((location) => location.key);
  const $href = $location.map(history.createHref);
  const $query = $search.map<Q>(getQueryParams);

  const $hasMatches = createStore(false);
  const $noMatches = $hasMatches.map((hasMatches) => !hasMatches);

  sample({
    source: $location,
    clock: navigate,
    fn: (location, toLocation) => ({ location, toLocation }),
    target: createEffect(historyChanger<S>(history.push)),
  });

  sample({
    source: $location,
    clock: redirect,
    fn: (location, toLocation) => ({ location, toLocation }),
    target: createEffect(historyChanger<S>(history.replace)),
  });

  sample({
    source: shift,
    target: createEffect(history.go),
  });

  const connectRoute = <P extends Params = Params>(
    route: Route<P, unknown> | MergedRoute
  ): void => {
    reduceStore(
      $hasMatches,
      route.visible,
      (hasMatches, visible) => hasMatches || visible
    );
  };

  const router: Router<Q, S> = {
    history,
    historyUpdated,
    historyUpdate: $historyUpdate,

    navigate,
    redirect,
    shift,
    back,
    forward,

    location: $location,
    action: $action,
    pathname: $pathname,
    search: $search,
    hash: $hash,
    state: $state,
    key: $key,
    href: $href,
    query: $query,

    hasMatches: $hasMatches,
    noMatches: $noMatches,

    add: <P extends Params = Params>(
      pathConfig: string | RouteConfig
    ): Route<P, Router<Q, S>> => {
      const routeConfig =
        typeof pathConfig === 'string' ? { path: pathConfig } : pathConfig;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      const route = createRoute<P, Router<Q, S>>(router, routeConfig);
      connectRoute(route);
      return route;
    },

    merge: <T extends Route[]>(routes: T): MergedRoute => {
      const route = createMergedRoute(routes);
      connectRoute(route);
      return route;
    },

    none: <T extends Route[]>(routes: T): MergedRoute => {
      const route = createMergedRoute(routes);
      route.visible = route.visible.map((visible) => !visible);
      return route;
    },

    use: (
      givenHistory: BrowserHistory | HashHistory | MemoryHistory
    ) => {
      const { location, action } = givenHistory;
      const defaultState = { location, action };
      $historyUpdate.defaultState = defaultState;
      unlisten();
      unlisten = givenHistory.listen(historyUpdated);
      history = givenHistory;
      historyUpdated(defaultState);
    },
  };

  return router;
};
