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
    postCategoryData,
    postSubcategoryData,
    getCategoryData,
    getSubcategoryData,
} from '../api/ApiScrapping';

const PageSubcategory = () => {

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

    useEffect(() => {
        onGetSubcategory();
    }, []);

    const onGetSubcategory = () => {

        setHookLoadingVisible(true);

        getSubcategoryData().then(
            (response) => {
                if (response) {

                    setDataSourceSubcategoryJson(response);

                    setDataSourceSubcategoryTable({
                        columns: dataSourceSubcategoryTable.columns,
                        rows: response.map((item) => ({
                            ...item,
                            id: item.id,
                            name: item.name.trim()
                        })),
                    });

                    setHookLoadingVisible(false);
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
        const modifiedData = [...dataSourceSubcategoryTable.rows, newRow];
        setDataSourceSubcategoryTable({ ...dataSourceSubcategoryTable, rows: modifiedData });
        const jsonOutput = convertRowsToJson(modifiedData);
        setDataSourceSubcategoryJson(jsonOutput);
        postSubcategoryData(jsonOutput).then(
            (response) => {
                if (response) {
                    //console.log(response);
                }
            }
        );
    };

    const handleRowEdit = (modifiedData) => {
        setDataSourceSubcategoryTable({ ...dataSourceSubcategoryTable, rows: modifiedData });
        const jsonOutput = convertRowsToJson(modifiedData);
        setDataSourceSubcategoryJson(jsonOutput);
        postSubcategoryData(jsonOutput).then(
            (response) => {
                if (response) {
                    //console.log(response);
                }
            }
        );
    };

    const handleRowDelete = (id) => {
        const modifiedData = dataSourceSubcategoryTable.rows.filter((row, index) => index !== id);
        setDataSourceSubcategoryTable({ ...dataSourceSubcategoryTable, rows: modifiedData });
        const jsonOutput = convertRowsToJson(modifiedData);
        setDataSourceSubcategoryJson(jsonOutput);
        postSubcategoryData(jsonOutput).then(
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
                <h1 className="h5 text-center py-3 mb-0">Subcategory Management</h1>

                <MDBCard>
                    <MDBCardBody>
                        <MDBTableEditor
                            //modal
                            sm
                            striped
                            dark={hookTheme === 'dark'}
                            data={dataSourceSubcategoryTable}
                            entriesOptions={[5, 10, 15]}
                            onAdd={(newRow) => handleRowAdd(newRow)}
                            onModify={handleRowEdit}
                            onDelete={(rowToDelete) => {
                                const rowIndex = dataSourceSubcategoryTable.rows.findIndex(
                                    (row) => row.id === rowToDelete.id
                                );
                                handleRowDelete(rowToDelete);
                            }}
                            setData={(e) => setDataSourceSubcategoryTable({ ...dataSourceSubcategoryTable, rows: e })}
                        />
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        </>
    );
};

export default React.memo(PageSubcategory);