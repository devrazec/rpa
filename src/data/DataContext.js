import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const DataProvider = (props) => {

  // Hooks
  const [hookThemeSelected, setHookThemeSelected] = useState('light');
  const [hookThemeOption, setHookThemeOption] = useState([
    { text: 'Light', value: 'light' },
    { text: 'Dark', value: 'dark' },
    { text: 'Blue', value: 'blue' },
    { text: 'Green', value: 'green' },
    { text: 'Red', value: 'red' },
    { text: 'Yellow', value: 'yellow' },
  ]);

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
    { text: 'Website 1', value: 'website1' },
    { text: 'Website 2', value: 'website2' },
    { text: 'Website 3', value: 'website3' },
    { text: 'Website 4', value: 'website4' },
    { text: 'Website 5', value: 'website5' },
  ]);
  const [dataSourceCategoryJson, setDataSourceCategoryJson] = useState([]);
  const [dataSourceSubcategoryJson, setDataSourceSubcategoryJson] = useState([]);

  const [dataSourceSelected, setDataSourceSelected] = useState([]);
  const [dataCategoryOption, setDataCategoryOption] = useState([]);
  const [dataSubcategoryOption, setDataSubcategoryOption] = useState([]);
  const [dataSourceJson, setDataSourceJson] = useState([]);
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
        sort: true,
        label: "Source",
        field: "source",
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
        sort: true,
        label: "Source",
        field: "source",
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
        label: "Filename",
        field: "filename",
      },
      {
        sort: false,
        label: "Image",
        field: "image_url",
      }
    ],
    rows: [],
  });

  const [dataImageGalleryArray, setDataImageGalleryArray] = useState([]);
  const [dataImageGalleryTable, setDataImageGalleryTable] = useState({
    columns: [],
    rows: [],
  });
  const [dataImageGalleryColumn, setDataImageGalleryColumn] = useState(4);

  // Data Website
  const [dataWebsiteSelected, setDataWebsiteSelected] = useState([]);
  const [dataWebsiteOption, setDataWebsiteOption] = useState([]);
  const [dataSourceWebsiteJson, setDataSourceWebsiteJson] = useState([]);
  const [dataSourceWebsiteTable, setDataSourceWebsiteTable] = useState({
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
  
  return (

    <DataContext.Provider value={{

      // Hooks
      hookThemeSelected, setHookThemeSelected,
      hookThemeOption, setHookThemeOption,

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

      // Data Source      
      dataSourceOption, setDataSourceOption,
      dataSourceSelected, setDataSourceSelected,
      dataSourceJson, setDataSourceJson,
      dataSourceTable, setDataSourceTable,
      dataSourceUrlJson, setDataSourceUrlJson,
      dataSourceUrlTable, setDataSourceUrlTable,   
      dataSourceImageJson, setDataSourceImageJson,
      dataSourceImageTable, setDataSourceImageTable,

      // Data Website
      dataWebsiteSelected, setDataWebsiteSelected,
      dataWebsiteOption, setDataWebsiteOption,
      dataSourceWebsiteJson, setDataSourceWebsiteJson,
      dataSourceWebsiteTable, setDataSourceWebsiteTable,

      // Data Category
      //dataCategorySelectedTab1, setDataCategorySelectedTab1,
      //dataCategorySelectedTab2, setDataCategorySelectedTab2,
      //dataCategorySelectedTab3, setDataCategorySelectedTab3,
      //dataCategorySelectedTab4, setDataCategorySelectedTab4,
      dataCategoryOption, setDataCategoryOption,
      dataSourceCategoryJson, setDataSourceCategoryJson,
      dataSourceCategoryTable, setDataSourceCategoryTable,

      // Data Subcategory
      //dataSubcategorySelectedTab1, setDataSubcategorySelectedTab1,
      //dataSubcategorySelectedTab2, setDataSubcategorySelectedTab2,
      //dataSubcategorySelectedTab3, setDataSubcategorySelectedTab3,
      //dataSubcategorySelectedTab4, setDataSubcategorySelectedTab4,
      dataSubcategoryOption, setDataSubcategoryOption,
      dataSourceSubcategoryJson, setDataSourceSubcategoryJson,
      dataSourceSubcategoryTable, setDataSourceSubcategoryTable,

      // Data Image
      dataImageGalleryArray, setDataImageGalleryArray,
      dataImageGalleryTable, setDataImageGalleryTable,
      dataImageGalleryColumn, setDataImageGalleryColumn,

    }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default React.memo(DataProvider);