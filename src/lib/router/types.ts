import { Event, Store } from 'effector';
import {
  Action,
  BrowserHistory,
  Hash,
  HashHistory,
  History,
  InitialEntry,
  Key,
  Location,
  MemoryHistory,
  Pathname,
  Search,
  State,
  To,
  Update,
} from 'history';
import {
  ParseOptions,
  RegexpToFunctionOptions,
  TokensToFunctionOptions,
  TokensToRegexpOptions,
} from 'path-to-regexp';
import {
  AnchorHTMLAttributes,
  ComponentType,
  DetailedHTMLProps,
  ReactNode,
} from 'react';

export { ParseOptions, TokensToFunctionOptions };

export interface ObjectAny {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export interface ObjectUnknown {
  [key: string]: unknown;
}
export interface ObjectString {
  [key: string]: string;
}

export type ToLocation<S extends State = State> =
  | string
  | { to?: To; state?: S };
export type Delta = number;
export type Href = string;
export type Pattern = string;
export interface Query extends ObjectString { }
export interface Params extends ObjectUnknown { }

export type RouterConfig<S extends State = State> = {
  history?: BrowserHistory | HashHistory | MemoryHistory;
  root?: InitialEntry;
};

export type RouteConfig = {
  path: Pattern;
  matchOptions?: ParseOptions & TokensToRegexpOptions & RegexpToFunctionOptions;
};

export type CompileConfig<P extends Params = Params> = {
  params?: P;
  query?: string[][] | Record<string, string> | string | URLSearchParams;
  hash?: string;
  options?: ParseOptions & TokensToFunctionOptions;
};

export type BindConfig = {
  router: Router;
  parse?: (rawParam?: string) => string | undefined;
  format?: (path?: string) => string | undefined;
};

export type Route<P extends Params = Params, R = Router> = {
  visible: Store<boolean>;
  params: Store<null | P>;
  config: RouteConfig;
  compile: (compileConfig?: CompileConfig<P>) => string;
  router: R extends Router<infer Q, infer S> ? Router<Q, S> : never;
  navigate: Event<P | void>;
  redirect: Event<P | void>;
  bindings: Partial<{ [K in keyof P]: BindConfig }>;
  bind: (
    param: keyof P,
    bindConfig: {
      router: Router;
      parse?: (rawParam?: string) => string | undefined;
      format?: (path?: string) => string | undefined;
    }
  ) => Route<P, R>;
};

export type MergedRoute = {
  visible: Store<boolean>;
  routes: Route[];
  configs: RouteConfig[];
};

export type Router<Q extends Query = Query, S extends State = State> = {
  history: History;
  historyUpdated: Event<Update>;
  historyUpdate: Store<Update>;
  navigate: Event<ToLocation>;
  redirect: Event<ToLocation<S>>;
  shift: Event<Delta>;
  back: Event<void>;
  forward: Event<void>;
  location: Store<Location>;
  action: Store<Action>;
  pathname: Store<Pathname>;
  search: Store<Search>;
  hash: Store<Hash>;
  state: Store<S>;
  key: Store<Key>;
  href: Store<Href>;
  query: Store<Q>;
  hasMatches: Store<boolean>;
  noMatches: Store<boolean>;
  add: <P extends Params = Params>(
    pathConfig: Pattern | RouteConfig
  ) => Route<P, Router<Q, S>>;
  merge: <T extends Route[]>(routes: T) => MergedRoute;
  none: <T extends Route[]>(routes: T) => MergedRoute;
  use: (
    givenHistory: BrowserHistory
  ) => void;
};

export type RouteProps = {
  of: Route;
  children?: ReactNode;
  component?: ComponentType;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseRoute = (route: Route<any> | MergedRoute) => boolean;

export type LinkProps<P extends Params> = {
  to: Route<P>;
  children: ReactNode;
  params?: P;
  query?: string[][] | Record<string, string> | string | URLSearchParams;
  hash?: string;
  compileOptions?: ParseOptions & TokensToFunctionOptions;
} & DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
