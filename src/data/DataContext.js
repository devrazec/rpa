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

  // Data
  const [dataSourceOption, setDataSourceOption] = useState([
    { text: 'Ikea', value: 'ikea' },
    { text: 'Mohd', value: 'mohd' },
    { text: 'Overstock', value: 'overstock' },
    { text: 'Online Furniture', value: 'onlinefurniture' },
    { text: 'Bed Bath and Beyond', value: 'bedbathandbeyond' },
  ]);
  const [dataSourceSelected, setDataSourceSelected] = useState(null);
  const [dataCategoryOption, setDataCategoryOption] = useState(null);
  const [dataSubcategoryOption, setDataSubcategoryOption] = useState(null);
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
    rows: [],
  });

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

      // Data       
      dataSourceOption, setDataSourceOption,
      dataSourceSelected, setDataSourceSelected,
      dataCategoryOption, setDataCategoryOption,
      dataSubcategoryOption, setDataSubcategoryOption,
      dataSourceTable, setDataSourceTable,

    }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default React.memo(DataProvider);