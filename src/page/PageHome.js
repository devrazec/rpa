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
    getSource,
    postSource,
    postScrappingData,    
    getFormatScrappingData,
    getCleanScrappingData,
    getSourceData,
    getCategoryData,
    getSubcategoryData,
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

    const [iconsActive, setIconsActive] = useState('Source');

    const handleIconsClick = (value) => {
        if (value === iconsActive) {
            return;
        }
        setIconsActive(value);
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
        postSource(dataSourceSelected, jsonOutput).then(
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
                        <MDBTabsLink onClick={() => handleIconsClick('Datasource')} active={iconsActive === 'Datasource'}>
                            <MDBIcon fas icon='table' className='me-2' /> Data Source
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleIconsClick('Dataurl')} active={iconsActive === 'Dataurl'}>
                            <MDBIcon fas icon='table' className='me-2' /> Data Url
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleIconsClick('Dataimage')} active={iconsActive === 'Dataimage'}>
                            <MDBIcon fas icon='table' className='me-2' /> Data Image
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleIconsClick('Image')} active={iconsActive === 'Image'}>
                            <MDBIcon fas icon='images' className='me-2' /> Image
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>

                    <MDBTabsPane open={iconsActive === 'Datasource'}>
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
                    <MDBTabsPane open={iconsActive === 'Dataurl'}>
                        <MDBDatatable maxWidth='1080px' sm fixedHeader striped data={dataSourceUrlTable} />
                    </MDBTabsPane>

                    <MDBTabsPane open={iconsActive === 'Dataimage'}>
                    </MDBTabsPane>

                    <MDBTabsPane open={iconsActive === 'Image'}>
                    </MDBTabsPane>

                </MDBTabsContent>
            </MDBContainer>
        </>
    );
};

export default React.memo(PageHome);