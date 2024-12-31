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
    getScrapping,
    getFormatJson,
    getCleanJson,
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
        dataSourceTable, setDataSourceTable,

    } = useContext(DataContext);

    const [iconsActive, setIconsActive] = useState('Source');

    useEffect(() => {
        // Add the Save button dynamically after the search bar is rendered
        const searchBarContainer = document.querySelector('.mdb-table-editor-search');
        if (searchBarContainer && !searchBarContainer.querySelector('.save-button')) {
            const saveButton = document.createElement('button');
            saveButton.innerText = 'Save';
            saveButton.className = 'btn btn-success save-button';
            saveButton.style.marginLeft = '8px';
            saveButton.onclick = () => {
                console.log('Save button clicked', dataSourceTable.rows);
                // Add your save logic here
            };
            searchBarContainer.appendChild(saveButton);
        }
    }, [dataSourceTable]);

    const handleIconsClick = (value) => {
        if (value === iconsActive) {
            return;
        }
        setIconsActive(value);
    };

    const onSaveSource = () => {
       
    };

    const handleRowEdit = (modifiedData) => {
        setDataSourceTable({ ...dataSourceTable, rows: modifiedData });
        onSaveSource();
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

                    </MDBTabsPane>
                    <MDBTabsPane open={iconsActive === 'Images'}>

                    </MDBTabsPane>
                </MDBTabsContent>



            </MDBContainer>
        </>
    );
};

export default React.memo(PageHome);