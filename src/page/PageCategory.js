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
} from '../api/ApiScrapping';

const PageCategory = () => {

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

    } = useContext(DataContext);

    useEffect(() => {
        onGetCategory();
    }, []);

    const onGetCategory = () => {

        setHookLoadingVisible(true);

        getDataCategory().then(
            (response) => {
                if (response) {

                    setDataSourceCategoryJson(response);

                    setDataSourceCategoryTable({
                        columns: dataSourceCategoryTable.columns,
                        rows: response.map((item) => ({
                            ...item,
                            id: item.id,
                            name: item.name.trim()
                        })),
                    });

                    setHookLoadingVisible(false);
                } else {
                    setHookLoadingVisible(false);
                    setHookToastActive(true);
                    setHookToastMessage('There is not Data Category!');
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
        const modifiedData = [...dataSourceCategoryTable.rows, newRow];
        setDataSourceCategoryTable({ ...dataSourceCategoryTable, rows: modifiedData });
        const jsonOutput = convertRowsToJson(modifiedData);
        setDataSourceCategoryJson(jsonOutput);
        postDataCategory(jsonOutput).then(
            (response) => {
                if (response) {
                    //console.log(response);
                }
            }
        );
    };

    const handleRowEdit = (modifiedData) => {
        setDataSourceCategoryTable({ ...dataSourceCategoryTable, rows: modifiedData });
        const jsonOutput = convertRowsToJson(modifiedData);
        setDataSourceCategoryJson(jsonOutput);
        postDataCategory(jsonOutput).then(
            (response) => {
                if (response) {
                    //console.log(response);
                }
            }
        );
    };

    const handleRowDelete = (id) => {
        const modifiedData = dataSourceCategoryTable.rows.filter((row, index) => index !== id);
        setDataSourceCategoryTable({ ...dataSourceCategoryTable, rows: modifiedData });
        const jsonOutput = convertRowsToJson(modifiedData);
        setDataSourceCategoryJson(jsonOutput);
        postDataCategory(jsonOutput).then(
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
                <h1 className="h5 text-center py-3 mb-0">Category Management</h1>

                <MDBCard>
                    <MDBCardBody>
                        <MDBTableEditor
                            //modal
                            sm
                            striped
                            dark={hookTheme === 'dark'}
                            data={dataSourceCategoryTable}
                            entriesOptions={[5, 10, 15]}
                            onAdd={(newRow) => handleRowAdd(newRow)}
                            onModify={handleRowEdit}
                            onDelete={(rowToDelete) => {
                                const rowIndex = dataSourceCategoryTable.rows.findIndex(
                                    (row) => row.id === rowToDelete.id
                                );
                                handleRowDelete(rowToDelete);
                            }}
                            setData={(e) => setDataSourceCategoryTable({ ...dataSourceCategoryTable, rows: e })}
                        />
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        </>
    );
};

export default React.memo(PageCategory);