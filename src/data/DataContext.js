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

  // Data 

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

      // Data 

    }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default React.memo(DataProvider);