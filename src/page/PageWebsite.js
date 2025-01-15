import React, { useContext, useEffect } from 'react'

// MD BootStrap Component
import {
    MDBContainer,
    MDBFooter,
    MDBCard,
    MDBCardBody,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBIcon,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBDatatable,
} from 'mdb-react-ui-kit';

import { MDBTableEditor } from "mdb-react-table-editor";

// Data Provider
import { DataContext } from '../data/DataContext';

// Api
import {
    getDataSource,
    postDataSource,
    getDataUrl,
    postDataUrl,
    getDataImage,
    postDataImage,
    getCleanDataUrl,
    getCleanDataImage,
    postDataCategory,
    getDataCategory,
    getDataSubcategory,
    postDataSubcategory,
    getDataWebsite,
    postDataWebsite,
} from '../api/ApiGetData';

const PageWebsite = () => {

    // Global Data Context
    const {

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
        dataSourceWebsiteJson, setDataSourceWebsiteJson,
        dataSourceWebsiteTable, setDataSourceWebsiteTable,

        // Data Website
        dataWebsiteOption, setDataWebsiteOption,

    } = useContext(DataContext);

    useEffect(() => {
        onGetWebsite();
    }, []);

    const onGetWebsite = () => {

        setHookLoadingVisible(true);

        getDataWebsite().then(
            (response) => {
                if (response) {

                    setDataSourceWebsiteJson(response);

                    setDataSourceWebsiteTable({
                        columns: dataSourceWebsiteTable.columns,
                        rows: response.map((item) => ({
                            ...item,
                            id: item.id,
                            name: item.name.trim()
                        })),
                    });

                    setDataWebsiteOption(
                        response?.map(item => ({
                            value: item.id,
                            text: item.name,
                        }))
                    );
 
                    setHookLoadingVisible(false);

                } else {
                    setHookLoadingVisible(false);
                    setHookToastActive(true);
                    setHookToastMessage('There is not Data Website!');
                }
            }
        );
    };

    function convertRowsToJson(rows) {
        return rows.map(row => ({
            id: row.id,
            name: row.name
        }));
    }

    const handleRowAdd = (newRow) => {
        const modifiedData = [...dataSourceWebsiteTable.rows, newRow];
        setDataSourceWebsiteTable({ ...dataSourceWebsiteTable, rows: modifiedData });
        const jsonOutput = convertRowsToJson(modifiedData);
        setDataSourceWebsiteJson(jsonOutput);
        postDataWebsite(jsonOutput).then(
            (response) => {
                if (response) {
                    //console.log(response);
                }
            }
        );
    };

    const handleRowEdit = (modifiedData) => {
        setDataSourceWebsiteTable({ ...dataSourceWebsiteTable, rows: modifiedData });
        const jsonOutput = convertRowsToJson(modifiedData);
        setDataSourceWebsiteJson(jsonOutput);
        postDataWebsite(jsonOutput).then(
            (response) => {
                if (response) {
                    //console.log(response);
                }
            }
        );
    };

    const handleRowDelete = (id) => {
        const modifiedData = dataSourceWebsiteTable.rows.filter((row, index) => index !== id);
        setDataSourceWebsiteTable({ ...dataSourceWebsiteTable, rows: modifiedData });
        const jsonOutput = convertRowsToJson(modifiedData);
        setDataSourceWebsiteJson(jsonOutput);
        postDataWebsite(jsonOutput).then(
            (response) => {
                if (response) {
                    //console.log(response);
                }
            }
        );
    };

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
                <h1 className="h5 text-center py-3 mb-0">Website Management</h1>

                <MDBCard className='mb-3'>
                    <MDBCardBody>
                        <MDBTableEditor
                            //sm
                            striped
                            dark={hookThemeSelected === 'dark'}
                            data={dataSourceWebsiteTable}
                            entriesOptions={[5, 10, 15]}
                            onAdd={(newRow) => handleRowAdd(newRow)}
                            onModify={handleRowEdit}
                            onDelete={(rowToDelete) => {
                                const rowIndex = dataSourceWebsiteTable.rows.findIndex(
                                    (row) => row.id === rowToDelete.id
                                );
                                handleRowDelete(rowToDelete);
                            }}
                            setData={(e) => setDataSourceWebsiteTable({ ...dataSourceWebsiteTable, rows: e })}
                        />
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        </>
    );
};

export default React.memo(PageWebsite);