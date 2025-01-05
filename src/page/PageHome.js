import React, { useContext, useState, useEffect } from 'react'

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

// Component
//import ComponentLayout from '../component/ComponentLayout';

// Data Provider
import { DataContext } from '../data/DataContext';

// Api
import {
    postReadDataSource,
    postWriteDataSource,
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

const PageHome = () => {

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

    } = useContext(DataContext);

    const handleTabActive = (value) => {
        if (value === hookTabHomeActive) {
            return;
        }
        setHookTabHomeActive(value);
    };

    function convertRowsToJson(rows) {
        return rows.map(row => ({
            id: row.id,
            source: row.source,
            category: row.category,
            subcategory: row.subcategory,
            url: row.url,
            image: row.image,
            enable: row.enable
        }));
    }

    const handleRowEdit = (modifiedData) => {
        setDataSourceTable({ ...dataSourceTable, rows: modifiedData });
        const jsonOutput = convertRowsToJson(modifiedData);
        setDataSourceJson(jsonOutput);
        postWriteDataSource(dataSourceSelected, jsonOutput).then(
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
                <MDBTabs className='mb-3 mt-3'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleTabActive('Datasource')} active={hookTabHomeActive === 'Datasource'}>
                            <MDBIcon fas icon='table' className='me-2' /> Data Source
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleTabActive('Dataurl')} active={hookTabHomeActive === 'Dataurl'}>
                            <MDBIcon fas icon='table' className='me-2' /> Data Url
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleTabActive('Dataimage')} active={hookTabHomeActive === 'Dataimage'}>
                            <MDBIcon fas icon='table' className='me-2' /> Data Image
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleTabActive('Image')} active={hookTabHomeActive === 'Image'}>
                            <MDBIcon fas icon='images' className='me-2' /> Image
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>

                    <MDBTabsPane open={hookTabHomeActive === 'Datasource'}>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBTableEditor
                                    modal
                                    sm
                                    striped
                                    dark={hookTheme === 'dark'}
                                    data={dataSourceTable}
                                    entriesOptions={[5, 10, 15]}
                                    onAdd={(newRow) => setDataSourceTable({ ...dataSourceTable, rows: [...dataSourceTable.rows, newRow] })}
                                    onModify={handleRowEdit}
                                    onDelete={(id) => setDataSourceTable({ ...dataSourceTable, rows: dataSourceTable.rows.filter((row, i) => i !== id) })}
                                    setData={(e) => setDataSourceTable({ ...dataSourceTable, rows: e })}
                                />
                            </MDBCardBody>
                        </MDBCard>

                    </MDBTabsPane>
                    <MDBTabsPane open={hookTabHomeActive === 'Dataurl'}>
                        <MDBDatatable maxWidth='1080px' sm fixedHeader striped data={dataSourceUrlTable} />
                    </MDBTabsPane>

                    <MDBTabsPane open={hookTabHomeActive === 'Dataimage'}>
                        <MDBDatatable maxWidth='1080px' sm fixedHeader striped data={dataSourceImageTable} />
                    </MDBTabsPane>

                    <MDBTabsPane open={hookTabHomeActive === 'Image'}>
                    </MDBTabsPane>

                </MDBTabsContent>
            </MDBContainer>
        </>
    );
};

export default React.memo(PageHome);