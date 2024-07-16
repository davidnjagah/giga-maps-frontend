import { Image, Search } from '@carbon/icons-react'
import { Button, DatePicker, DatePickerInput, Form, Link, RadioButton, TextInput } from "@carbon/react"
import { format } from 'date-fns';
import { useStore } from 'effector-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';

import { createOrUpdateCountryFx, getPublishDataLayerListFx } from '~/@/admin/effects/api-country-fx';
import { $formDataCountry, $publishDataLayerListResponce, onUdpateCountryForm, setToasterWarning } from '~/@/admin/models/country-model';
import { Div } from '~/@/common/style/styled-component-style';
import { adminCountry, router } from '~/core/routes';
import { speedConverterUtil } from '~/lib/utils';

import { BottomButtonWrapper, CountryFormScroll, CountryListDataLayer, DateOfJoiningWrapper, DatePickerBoxWrapper, InlineToastWrapper, InputBoxWrapper, InputContainer, InputLabel, LastWeekStatusWrapper, LayerConfigButtonWrapper, MultiSelectLayerConfig, RowContainer, SchoolFieldsContainer, SchoolFieldsWrapper, UploadFlagImage } from "../../styles/admin-styles";
import React from 'react';


const FormCountry = ({ isEdit, countryItemId }: { isEdit: boolean, countryItemId?: number }) => {

  const id = Number(countryItemId);
  const formDataCountry = useStore($formDataCountry);
  const publishDataLayerListResponce = useStore($publishDataLayerListResponce)
  const [selectedFile, setSelectedFile] = useState(null)
  const [layerDescriptions, setLayerDescriptions] = useState<Record<string, string>>({});
  const [layersBenchmark, setLayersBenchmark] = useState<Record<string, string>>({});
  const [dataSource, setDataSource] = useState<Record<string, { name: string, description: string }>>({});
  const [selectedActiveLayers, setActiveLayerList] = useState<{ id: number; name: string; }[]>([]);
  const filteredPublishDataLayerList = useMemo(() => publishDataLayerListResponce.sort((a, b) => a.type.localeCompare(b.type)), [publishDataLayerListResponce]);
  const [defaultLayer, setDefaultLayer] = useState<number | undefined>();
  // isEdit ?
  //   publishDataLayerListResponce.filter(item => item.applicable_countries.length === 0 || item.applicable_countries.includes(id))
  //   : publishDataLayerListResponce.filter(item => item.applicable_countries.length === 0);

  const layersNames = useMemo(() => {
    return publishDataLayerListResponce.reduce((acc, curr) => {
      acc[curr.id] = curr.name;
      return acc;
    }, {} as Record<string, string>)
  }, [publishDataLayerListResponce])

  const layerListAvailablility = useMemo(() => publishDataLayerListResponce.map((item) => ({ id: item.id, name: item.name })), [publishDataLayerListResponce]);

  useEffect(() => {
    if (formDataCountry?.active_layers_list) {
      const dataSourceList = {} as Record<string, { name: string, description: string }>;
      let currentDefaultLayer;
      const activeLayerList = formDataCountry.active_layers_list.map((layer: { data_layer_id: number; is_default: boolean; data_source: { name?: string, description?: string } }) => {
        dataSourceList[String(layer.data_layer_id)] = {
          name: '',
          description: '',
          ...layer.data_sources
        }
        if (layer.is_default) {
          currentDefaultLayer = layer?.data_layer_id;
        }
        return {
          id: layer.data_layer_id,
          name: layersNames[String(layer.data_layer_id)],
        }
      });
      setActiveLayerList(activeLayerList);
      setDataSource(dataSourceList);
      setDefaultLayer(currentDefaultLayer);
    }
  }, [formDataCountry?.active_layers_list, layerListAvailablility])

  useEffect(() => {
    const { live_layer = {}, layer_descriptions = {} } = formDataCountry?.benchmark_metadata || {};
    setLayersBenchmark({ ...live_layer });
    setLayerDescriptions({ ...layer_descriptions });
  }, [formDataCountry?.benchmark_metadata]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setToasterWarning('Please select a valid JPEG or PNG image.');
        event.target.value = null;
        return;
      }
      const maxSize = 500 * 1024;
      if (file.size > maxSize) {
        setToasterWarning('File size exceeds the limit of 500 KB.');
        event.target.value = null;
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile && !isEdit) {
      setToasterWarning("Please Upload flag image")
    }
    else {
      const formElement = event.target as HTMLFormElement;
      const formData = new FormData();
      formData.append('name', formElement.name?.value);
      formData.append('code', formElement.code?.value);
      formData.append('description', formElement.description?.value);
      formData.append('iso3_format', formElement.iso3_format?.value);
      formData.append('data_source', formElement.data_source?.value);
      formData.append('last_weekly_status_id', formElement.last_weekly_status_id?.value)
      formData.append('date_of_join', formElement.date_of_join?.value?.split('/').join('-'));
      formData.append('date_schools_mapped', formElement.date_schools_mapped?.value?.split('/').join('-'));
      formData.append('active_layers_list', JSON.stringify(selectedActiveLayers?.map((layer) => ({
        data_layer_id: layer.id,
        data_sources: dataSource[String(layer.id)],
        is_default: String(defaultLayer) === String(layer.id) ? true : false
      }))));

      if (selectedFile) {
        formData.append('flag', selectedFile);
      }

      formData.append('benchmark_metadata', JSON.stringify({
        live_layer: layersBenchmark,
        layer_descriptions: layerDescriptions,
        static_layer: {}
      }));

      try {
        await createOrUpdateCountryFx({
          formData,
          isEdit,
          countryItemId
        })
        adminCountry.navigate();
      }
      catch (e) {
        console.error(e)
      }
    };
  }

  useEffect(() => {
    void getPublishDataLayerListFx()
  }, [])


  return (
    <>
      <Form id="formElem"
        data-testid="country-form-submit"
        onSubmit={handleFormSubmit} autoComplete="off" >
        <CountryFormScroll>
          <RowContainer>
            <UploadFlagImage>
              {
                selectedFile ?
                  <img src={URL.createObjectURL(selectedFile)} alt='' /> :
                  formDataCountry?.flag ?
                    <img
                      src={formDataCountry?.flag}
                      alt='' />
                    : <Image />
              }
              <h3>Upload Flag Image</h3>
              <p>
                Max file size is 500kb. Supported file types are .jpg and .png.
              </p>
              <TextInput
                type="file"
                labelText=""
                data-testid="flag-image-upload"
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: 'none' }} />
              <Button
                id="flag-upload-button"
                onClick={() => document.getElementById('fileInput').click()}
                kind='primary'> Upload</Button>
            </UploadFlagImage>
            <InputContainer>
              <InputLabel>
                Last weekly status
              </InputLabel>
              <LastWeekStatusWrapper>
                <InputBoxWrapper>
                  <TextInput
                    min={0}
                    type="number"
                    labelText=""
                    id="last-week-status"
                    name='last_weekly_status_id'
                    placeholder='Enter last week status'
                    value={formDataCountry?.last_weekly_status_id}
                    onChange={(e) => onUdpateCountryForm([e.target.name, e.target.value])}
                  />
                </InputBoxWrapper>
                <Link href="/admin/country/?tab=1" target="_blank">
                  <Search />
                </Link>
              </LastWeekStatusWrapper>
            </InputContainer>
          </RowContainer>
          <RowContainer>
            <InputContainer>
              <InputLabel>
                Country name
              </InputLabel>
              <InputBoxWrapper>
                <TextInput
                  type="text"
                  labelText=""
                  name='name'
                  id="country-name"
                  placeholder='Enter country name'
                  required
                  value={formDataCountry?.name}
                  onChange={(e) => onUdpateCountryForm([e.target.name, e.target.value])}
                />
              </InputBoxWrapper>
            </InputContainer>
            <InputContainer>
              <InputLabel>
                Country code
              </InputLabel>
              <InputBoxWrapper>
                <TextInput
                  type="text"
                  labelText=""
                  id="country-code"
                  name="code"
                  placeholder='Enter country code'
                  value={formDataCountry?.code}
                  onChange={(e) => onUdpateCountryForm([e.target.name, e.target.value])}
                  required
                />
              </InputBoxWrapper>
            </InputContainer>
          </RowContainer>
          <RowContainer>
            <InputContainer>
              <InputLabel>
                Iso3 format
              </InputLabel>
              <InputBoxWrapper>
                <TextInput
                  type="text"
                  labelText=""
                  id="iso3-format"
                  name="iso3_format"
                  placeholder='Enter iso3 format'
                  value={formDataCountry?.iso3_format}
                  onChange={(e) => onUdpateCountryForm([e.target.name, e.target.value])}
                  required
                />
              </InputBoxWrapper>
            </InputContainer>
            <InputContainer>
              <InputLabel>
                Description
              </InputLabel>
              <InputBoxWrapper>
                <TextInput
                  type="text"
                  labelText=""
                  id="description"
                  name="description"
                  placeholder='Enter description'
                  value={formDataCountry?.description}
                  onChange={(e) => onUdpateCountryForm([e.target.name, e.target.value])}
                />
              </InputBoxWrapper>
            </InputContainer>
          </RowContainer>
          <RowContainer>
            <DateOfJoiningWrapper>
              <InputLabel>
                Date of Join
              </InputLabel>
              <DatePickerBoxWrapper>
                <DatePicker
                  datePickerType="single"
                  dateFormat='d/m/Y'
                  value={formDataCountry?.date_of_join}
                  onChange={(date) => {
                    onUdpateCountryForm(['date_of_join', format(date[0], 'dd-MM-yyyy')])
                  }}
                >
                  <DatePickerInput
                    labelText=""
                    id="date-picker-join-date"
                    placeholder="dd-mm-yyyy"
                    Name='date_of_join'
                  />
                </DatePicker>
              </DatePickerBoxWrapper>
            </DateOfJoiningWrapper>
            <DateOfJoiningWrapper>
              <InputLabel>
                School mapped Date
              </InputLabel>
              <DatePickerBoxWrapper>
                <DatePicker
                  datePickerType="single"
                  dateFormat='d/m/Y'
                  value={formDataCountry?.date_schools_mapped}
                  onChange={(date) => onUdpateCountryForm(['date_schools_mapped', format(date[0], 'dd-MM-yyyy')])}
                >
                  <DatePickerInput
                    labelText=""
                    id="date-picker-school-mapped-date"
                    placeholder="dd-mm-yyyy"
                    Name='date_schools_mapped'
                  />
                </DatePicker>
              </DatePickerBoxWrapper>
            </DateOfJoiningWrapper>
          </RowContainer>
          <RowContainer>
            <InputContainer>
              <InputLabel>
                Data Source
              </InputLabel>
              <InputBoxWrapper>
                <TextInput
                  type="text"
                  labelText=""
                  id="data-souce"
                  name="data_source"
                  placeholder='Enter data source'
                  value={formDataCountry?.data_source}
                  onChange={(e) => onUdpateCountryForm([e.target.name, e.target.value])}
                />
              </InputBoxWrapper>
            </InputContainer>
            <InputContainer>
              <MultiSelectLayerConfig
                name="active_layers_list"
                required
                label="Choose active layers"
                titleText="Active layers"
                itemToString={(item: { id: number; name: string }) => item.name || ''}
                itemToElement={(item: { id: number; name: string }) => (
                  <span>
                    {item.name}
                  </span>
                )}
                items={layerListAvailablility}
                id={`active-layers`}
                onChange={({ selectedItems }: { selectedItems: { id: number; name: string }[] }) => {
                  setActiveLayerList(selectedItems);
                }}
                selectedItems={selectedActiveLayers}
              />
            </InputContainer>
          </RowContainer>
          <CountryListDataLayer>
            <h3>Associated Giga layers: </h3>
            {
              filteredPublishDataLayerList.map((item, index) => (
                selectedActiveLayers.some(layer => layer.id === item.id) && <React.Fragment key={item.id}>
                  <div style={{ marginTop: '1rem', paddingLeft: '3rem', gap: '0.4rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <p style={{ fontWeight: 'bold' }}>{item.name} ({item.type.toLowerCase()})</p>
                    {item.type === 'LIVE' &&
                      <RadioButton labelText="Select default layer" name={item.name} value={item.id} id={String(item.id)} checked={String(item.id) === String(defaultLayer)} onChange={() => setDefaultLayer(item.id)} />
                    }
                  </div>
                  <RowContainer>
                    {item.type === 'LIVE' && <InputContainer>
                      <InputLabel>
                        National benchmark ({item.global_benchmark?.unit})
                      </InputLabel>
                      <SchoolFieldsWrapper>
                        <TextInput
                          labelText=""
                          id={`${item?.name}{item?.id}`}
                          name={item?.name}
                          placeholder="Enter national benchmark"
                          value={layersBenchmark[item?.id] || ""}
                          onChange={(e) => setLayersBenchmark({ ...layersBenchmark, [item?.id]: e.target.value })}
                        />
                        <Div $margin="0.5rem 0">
                          <InputLabel>
                            {speedConverterUtil(item.global_benchmark.unit, item.global_benchmark.convert_unit, Number(layersBenchmark[item?.id] || 0))}
                            {' '}<b>{item?.global_benchmark?.convert_unit?.toUpperCase()}</b>
                          </InputLabel>
                        </Div>
                      </SchoolFieldsWrapper>
                    </InputContainer>}
                    {item.type === 'LIVE' && <InputContainer>
                      <InputLabel>
                        National benchmark description
                      </InputLabel>
                      <SchoolFieldsWrapper>
                        <TextInput
                          labelText=""
                          id={`${item?.name}{item?.id}`}
                          name={item?.name}
                          placeholder="Enter national benchmark"
                          value={layerDescriptions[item?.id] || ""}
                          onChange={(e) => setLayerDescriptions({ ...layerDescriptions, [item?.id]: e.target.value })}
                        />
                      </SchoolFieldsWrapper>
                    </InputContainer>}
                  </RowContainer>
                  <RowContainer>
                    <InputContainer>
                      <InputLabel>
                        Data source name
                      </InputLabel>
                      <SchoolFieldsWrapper>
                        <TextInput
                          labelText=""
                          id={`${item?.name}data_source${item?.id}`}
                          name={`${item?.name}_data_source_name`}
                          placeholder="Enter datasoure name"
                          value={dataSource[item.id]?.name || ""}
                          onChange={(e) => setDataSource({ ...dataSource, [item.id]: { ...dataSource[item.id], name: e.target.value } })}
                        />
                      </SchoolFieldsWrapper>
                    </InputContainer>
                    <InputContainer>
                      <InputLabel>
                        Data source descriptions
                      </InputLabel>
                      <SchoolFieldsWrapper>
                        <TextInput
                          labelText=""
                          id={`${item?.name}datasource${item?.id}`}
                          name={`data_source_description_${item.id}`}
                          placeholder="Enter data source descriptions"
                          value={dataSource[item.id]?.description || ""}
                          onChange={(e) => setDataSource({ ...dataSource, [item.id]: { ...dataSource[item.id], description: e.target.value } })}
                        />
                      </SchoolFieldsWrapper>
                    </InputContainer>
                  </RowContainer>
                </React.Fragment>
              ))
            }
            <h4 />
          </CountryListDataLayer>
        </CountryFormScroll>
        <BottomButtonWrapper>
          <Button
            kind="secondary"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            kind="primary">
            Save
          </Button>
        </BottomButtonWrapper>
      </Form >
    </>
  )
}

export default FormCountry