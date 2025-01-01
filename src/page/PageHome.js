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
    getSourceScrappingData,
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
        dataSourceScrappingJson, setDataSourceScrappingJson,
        dataSourceScrappingTable, setDataSourceScrappingTable,

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
                        <MDBTabsLink onClick={() => handleIconsClick('Source')} active={iconsActive === 'Source'}>
                            <MDBIcon fas icon='table' className='me-2' /> Source
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleIconsClick('Data')} active={iconsActive === 'Data'}>
                            <MDBIcon fas icon='database' className='me-2' /> Data
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleIconsClick('Images')} active={iconsActive === 'Images'}>
                            <MDBIcon fas icon='images' className='me-2' /> Images
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>

                    <MDBTabsPane open={iconsActive === 'Source'}>
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
                    <MDBTabsPane open={iconsActive === 'Data'}>
                        <MDBDatatable maxWidth='1080px' sm fixedHeader striped data={dataSourceScrappingTable} />
                    </MDBTabsPane>
                    <MDBTabsPane open={iconsActive === 'Images'}>

                    </MDBTabsPane>
                </MDBTabsContent>

            </MDBContainer>
        </>
    );
};

export default React.memo(PageHome);