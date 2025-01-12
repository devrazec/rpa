import React, { useContext, useRef } from 'react'

// MD BootStrap Component
import {
    MDBContainer,
    MDBNavbar,
    MDBInputGroup,
    MDBBtn,
    MDBIcon,
} from 'mdb-react-ui-kit';

// Data Provider
import { DataContext } from '../data/DataContext';

const PageFolder = () => {

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

    } = useContext(DataContext);

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <>
            <MDBContainer fluid className='mb-3'
                style={{
                    flex: 1,
                    marginLeft: '0px',
                    backgroundColor: hookTheme === 'dark' && ' #303030',
                    //marginTop: hookHeaderEnable ? '20px' : '0px',
                    //backgroundColor: '#e3f2fd'
                    //backgroundColor: '#4f4f4f'
                    //backgroundColor: '#303030'
                }}
            >
                <h1 className="h5 text-center py-3 mb-0">Folder Management</h1>

                <MDBNavbar
                    style={{
                        backgroundColor: hookTheme === 'dark' ? '#424242' : ' #FFFFFF'
                    }}
                >
                    <MDBContainer fluid>
                        <MDBInputGroup className='d-flex w-100 justify-content-between'>

                            <div style={{ textAlign: "center", alignItems: "center", display: "flex" }}>
                                <MDBBtn
                                    //tag='a'
                                    color='none'
                                    className="me-2"
                                    onClick={() => handleGoBack()}
                                >
                                    <MDBIcon fas icon="arrow-left" style={{ fontSize: '34px' }} />
                                </MDBBtn>
                            </div>
                        </MDBInputGroup>

                        <hr />

                        <iframe
                            style={{
                                width: '100%',
                                height: '500px',                                
                                backgroundColor: hookTheme === 'dark' && ' #4f4f4f',
                            }}
                            src="https://localhost:3002/images"
                            title="Folder"
                        ></iframe>

                    </MDBContainer>
                </MDBNavbar>
            </MDBContainer>
        </>
    );
};

export default React.memo(PageFolder);