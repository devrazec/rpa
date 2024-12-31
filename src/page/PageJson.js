import React, { useContext } from 'react'

// MD BootStrap Component
import {
    MDBContainer,
} from 'mdb-react-ui-kit';

// Data Provider
import { DataContext } from '../data/DataContext';

const PageJson = () => {

    // Global Data Context
    const {

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

    } = useContext(DataContext);

    return (
        <>
            <MDBContainer fluid
                style={{
                    flex: 1,
                    marginLeft: '0px',
                    //marginTop: hookHeaderEnable ? '20px' : '0px',
                    //backgroundColor: '#e3f2fd'
                }}
            >
                <h1 className="h5 text-center py-3 mb-0">Json Management</h1>

                <div>

                </div>

            </MDBContainer>
        </>
    );
};

export default React.memo(PageJson);