import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const DataProvider = (props) => {

  // Hooks
  const [hookTheme, setHookTheme] = useState('light');

  // Size
  const [hookWindowSize, setHookWindowSize] = useState({ width: 0, height: 0 });
  const [hookHeaderSize, setHookHeaderSize] = useState({ width: 0, height: 0 });
  const [hookSidebarSize, setHookSidebarSize] = useState({ width: 0, height: 0 });
  const [hookFooterSize, setHookFooterSize] = useState({ width: 0, height: 0 });
  const [hookSettingsSize, setHookSettingSize] = useState({ width: 0, height: 0 });

  // Enable
  const [hookHeaderEnable, setHookHeaderEnable] = useState(false);
  const [hookSidebarEnable, setHookSidebarEnable] = useState(false);
  const [hookFooterEnable, setHookFooterEnable] = useState(false);
  const [hookSettingsEnable, setHookSettingsEnable] = useState(false);

  // Visible
  const [hookSettingsVisible, setHookSettingsVisible] = useState(false);
  const [hookLoadingVisible, setHookLoadingVisible] = useState(false);

  // Active
  const [hookTabHomeActive, setHookTabHomeActive] = useState('Datasource');

  // Toast
  const [hookToastActive, setHookToastActive] = useState(false);
  const [hookToastMessage, setHookToastMessage] = useState(null);

  // Data
  const [dataSourceOption, setDataSourceOption] = useState([
    { text: 'Ikea', value: 'ikea' },
    { text: 'Mohd', value: 'mohd' },
    { text: 'Overstock', value: 'overstock' },
    { text: 'Online Furniture', value: 'onlinefurniture' },
    { text: 'Bed Bath and Beyond', value: 'bedbathandbeyond' },
  ]);
  const [dataSourceCategoryJson, setDataSourceCategoryJson] = useState(null);
  const [dataSourceSubcategoryJson, setDataSourceSubcategoryJson] = useState(null);

  const [dataSourceSelected, setDataSourceSelected] = useState(null);
  const [dataCategoryOption, setDataCategoryOption] = useState(null);
  const [dataSubcategoryOption, setDataSubcategoryOption] = useState(null);
  const [dataSourceJson, setDataSourceJson] = useState(null);
  const [dataSourceTable, setDataSourceTable] = useState({
    columns: [
      {
        sort: true,
        inputType: "number",
        label: "ID",
        field: "id",
      },
      {
        sort: false,
        inputType: "text",
        label: "Source",
        field: "source",
      },
      {
        sort: true,
        options: [],
        inputType: "select",
        label: "Category",
        field: "category",
      },
      {
        sort: true,
        options: [],
        inputType: "select",
        label: "Subcategory",
        field: "subcategory",
      },
      {
        sort: false,
        inputType: "text",
        label: "URL",
        field: "url",
      },
      {
        sort: true,
        inputType: "number",
        label: "Image",
        field: "image",
      },
      {
        sort: true,
        inputType: "checkbox",
        label: "Enable",
        field: "enable",
      }
    ],
    rows: []
  });
  const [dataSourceUrlJson, setDataSourceUrlJson] = useState([]);
  const [dataSourceUrlTable, setDataSourceUrlTable] = useState({
    columns: [
      {
        sort: true,
        label: "ID",
        field: "id",
      },
      {
        sort: false,
        label: "Number",
        field: "number",
      },
      {
        sort: true,
        label: "Name",
        field: "name",
      },
      {
        sort: false,
        label: "Price",
        field: "price",
      },
      {
        sort: true,
        label: "Category",
        field: "category",
      },
      {
        sort: true,
        label: "Subcategory",
        field: "subcategory",
      },
      {
        sort: false,
        label: "URL",
        field: "url",
      },
      {
        sort: false,
        label: "Image",
        field: "image_url",
      },
      {
        sort: true,
        label: "Source",
        field: "source",
      }
    ],
    rows: [],
  });
  const [dataSourceCategoryTable, setDataSourceCategoryTable] = useState({
    columns: [
      {
        sort: true,
        label: "ID",
        field: "id",
      },
      {
        sort: true,
        label: "Name",
        field: "name",
      }
    ],
    rows: []
  });
  const [dataSourceSubcategoryTable, setDataSourceSubcategoryTable] = useState({
    columns: [
      {
        sort: true,
        label: "ID",
        field: "id",
      },
      {
        sort: true,
        label: "Name",
        field: "name",
      }
    ],
    rows: []
  });

  const [dataSourceImageJson, setDataSourceImageJson] = useState([]);
  const [dataSourceImageTable, setDataSourceImageTable] = useState({
    columns: [
      {
        sort: true,
        label: "ID",
        field: "id",
      },
      {
        sort: false,
        label: "Filename",
        field: "filename",
      },
      {
        sort: false,
        label: "Number",
        field: "number",       
      },
      {
        sort: true,
        label: "Name",
        field: "name",
      },
      {
        sort: false,
        label: "Price",
        field: "price",
      },
      {
        sort: true,
        label: "Category",
        field: "category",
      },
      {
        sort: true,
        label: "Subcategory",
        field: "subcategory",
      },
      {
        sort: true,
        label: "Source",
        field: "source",
      }
    ],
    rows: [],
  });

  const [dataImageGalleryArray, setDataImageGalleryArray] = useState(null);
  const [dataImageGalleryTable, setDataImageGalleryTable] = useState({
    columns: [],
    rows: [],
  });
  const [dataImageGalleryColumn, setDataImageGalleryColumn] = useState(null);

  return (

    <DataContext.Provider value={{

      // Hooks
      hookTheme, setHookTheme,

      // Size
      hookWindowSize, setHookWindowSize,
      hookHeaderSize, setHookHeaderSize,
      hookSidebarSize, setHookSidebarSize,
      hookFooterSize, setHookFooterSize,
      hookSettingsSize, setHookSettingSize,

      // Enable
      hookHeaderEnable, setHookHeaderEnable,
      hookSidebarEnable, setHookSidebarEnable,
      hookFooterEnable, setHookFooterEnable,
      hookSettingsEnable, setHookSettingsEnable,

      // Visible
      hookSettingsVisible, setHookSettingsVisible,
      hookLoadingVisible, setHookLoadingVisible,

      // Active
      hookTabHomeActive, setHookTabHomeActive,

      // Toast
      hookToastActive, setHookToastActive,
      hookToastMessage, setHookToastMessage,

      // Data       
      dataSourceOption, setDataSourceOption,
      dataSourceSelected, setDataSourceSelected,
      dataCategoryOption, setDataCategoryOption,
      dataSubcategoryOption, setDataSubcategoryOption,
      dataSourceJson, setDataSourceJson,
      dataSourceTable, setDataSourceTable,
      dataSourceUrlJson, setDataSourceUrlJson,
      dataSourceUrlTable, setDataSourceUrlTable,
      dataSourceCategoryJson, setDataSourceCategoryJson,
      dataSourceSubcategoryJson, setDataSourceSubcategoryJson,
      dataSourceCategoryTable, setDataSourceCategoryTable,
      dataSourceSubcategoryTable, setDataSourceSubcategoryTable,
      dataSourceImageJson, setDataSourceImageJson,
      dataSourceImageTable, setDataSourceImageTable,
      dataImageGalleryArray, setDataImageGalleryArray,
      dataImageGalleryTable, setDataImageGalleryTable,
      dataImageGalleryColumn, setDataImageGalleryColumn,

    }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default React.memo(DataProvider);