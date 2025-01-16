import React, { useContext, useState, useEffect } from 'react'
import ReactDOM from 'react-dom';

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
    MDBNavbar,
    MDBNavbarBrand,
    MDBInputGroup,
    MDBSelect,
} from 'mdb-react-ui-kit';

import { MDBTableEditor } from "mdb-react-table-editor";

// Component
import ComponentGallery from '../component/ComponentGallery';

// Data Provider
import { DataContext } from '../data/DataContext';

// Icons
import { LuColumns2 } from "react-icons/lu";
import { LuColumns3 } from "react-icons/lu";
import { LuColumns4 } from "react-icons/lu";

import { TfiLayoutColumn2Alt } from "react-icons/tfi";
import { TfiLayoutColumn3Alt } from "react-icons/tfi";
import { TfiLayoutColumn4Alt } from "react-icons/tfi";

import { BsFiletypeJson } from "react-icons/bs";
import { BsFiletypeXlsx } from "react-icons/bs";

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
} from '../api/ApiGetData';

const PageHome = () => {

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
        dataImageGalleryArray, setDataImageGalleryArray,
        dataImageGalleryTable, setDataImageGalleryTable,
        dataImageGalleryColumn, setDataImageGalleryColumn,

    } = useContext(DataContext);

    const [divCustomSearch, setDivCustomSearch] = useState(null);

    useEffect(() => {

        const cardBody = document.querySelector('.card-body > div:nth-child(1)');
        if (cardBody) {
            if (cardBody && !document.querySelector('.custom-search')) {
                const newDiv = document.createElement('div');
                newDiv.className = 'custom-search';
                cardBody.appendChild(newDiv);
                setDivCustomSearch(newDiv);
            }
        }

        const cssDiv1 = document.querySelector('.card-body .d-flex.justify-content-end');
        if (cssDiv1) {
            cssDiv1.classList.remove('justify-content-end');
            cssDiv1.classList.add('justify-content-between');
        }

        //const div1 = document.querySelector('.card-body > div:nth-child(1)');
        //if (div1) {
        //    div1.remove();
        //}

        //const hr = document.querySelector('.card-body > hr');
        //if (hr) {
        //    hr.remove();
        //}

    }, []);

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
        postDataSource(jsonOutput).then(
            (response) => {
                if (response) {
                    //console.log(response);
                }
            }
        );
    };

    const renderComponent = () => {
        return (

            <MDBInputGroup className='d-flex w-100 justify-content-end gap-3'>
                <MDBSelect
                    label='Category'
                    size='lg'
                    multiple
                    data={[
                        { text: 'Living Room' },
                        { text: 'Bedroom' },
                        { text: 'Dining Room' },
                        { text: 'Kitchen' },
                        { text: 'Home Office' },
                        { text: 'Outdoor' },
                    ]}
                    className="me-4"
                />

                <MDBSelect
                    label='Subcategory'
                    size='lg'
                    multiple
                    data={[
                        { text: 'Bed' },
                        { text: 'Sofa' },
                        { text: 'Armchair' },
                        { text: 'Shelve' },
                        { text: 'Table' },
                        { text: 'Cabinet' },
                        { text: 'TV Stand' },
                    ]}
                />
                <div className="d-flex ms-auto">

                    <div style={{ textAlign: "center", alignItems: "center", display: "flex" }}>
                        <MDBBtn
                            tag='a'
                            color='none'
                            className="me-2"
                            onClick={() => setDataImageGalleryColumn(2)}
                        >
                            <BsFiletypeJson style={{ fontSize: '34px' }} />
                        </MDBBtn>
                        <MDBBtn
                            tag='a'
                            color='none'
                            className="me-2"
                            onClick={() => setDataImageGalleryColumn(2)}
                        >
                            <BsFiletypeXlsx style={{ fontSize: '34px' }} />
                        </MDBBtn>

                    </div>
                </div>
            </MDBInputGroup>
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
                    <MDBTabsItem
                        style={{
                        }}
                    >
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

                        {divCustomSearch && ReactDOM.createPortal(renderComponent(), divCustomSearch)}

                        <MDBCard
                            className='mb-3'
                        >
                            <MDBCardBody>
                                <MDBTableEditor
                                    //modal
                                    //advancedSearch={[ { text: 'All columns', value: '' }, { text: 'Category', value: 'category' }, { text: 'Subcategory', value: 'subcategory' }, ]} 
                                    search={false}
                                    striped
                                    hover
                                    dark={hookThemeSelected === 'dark'}
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
                    <MDBTabsPane open={hookTabHomeActive === 'Dataurl'} >
                        <MDBNavbar
                            style={{
                                backgroundColor: hookThemeSelected === 'dark' ? '#424242' : ' #FFFFFF'
                            }}
                        >
                            <MDBContainer fluid>
                                <MDBInputGroup className='d-flex w-100 justify-content-between mb-3'>
                                    <MDBSelect
                                        label='Category'
                                        size='lg'
                                        multiple
                                        data={[
                                            { text: 'Living Room' },
                                            { text: 'Bedroom' },
                                            { text: 'Dining Room' },
                                            { text: 'Kitchen' },
                                            { text: 'Home Office' },
                                            { text: 'Outdoor' },
                                        ]}
                                        className="me-4"
                                    />

                                    <MDBSelect
                                        label='Subcategory'
                                        size='lg'
                                        multiple
                                        data={[
                                            { text: 'Bed' },
                                            { text: 'Sofa' },
                                            { text: 'Armchair' },
                                            { text: 'Shelve' },
                                            { text: 'Table' },
                                            { text: 'Cabinet' },
                                            { text: 'TV Stand' },
                                        ]}
                                    />
                                    <div className="d-flex ms-auto">

                                        <div style={{ textAlign: "center", alignItems: "center", display: "flex" }}>
                                            <MDBBtn
                                                tag='a'
                                                color='none'
                                                className="me-2"
                                                onClick={() => setDataImageGalleryColumn(2)}
                                            >
                                                <BsFiletypeJson style={{ fontSize: '34px' }} />
                                            </MDBBtn>
                                            <MDBBtn
                                                tag='a'
                                                color='none'
                                                className="me-2"
                                                onClick={() => setDataImageGalleryColumn(2)}
                                            >
                                                <BsFiletypeXlsx style={{ fontSize: '34px' }} />
                                            </MDBBtn>

                                        </div>

                                    </div>

                                </MDBInputGroup>

                            </MDBContainer>


                        </MDBNavbar>

                        <MDBDatatable
                            className='mb-3'
                            maxWidth='100%'
                            sm
                            fixedHeader
                            striped
                            dark={hookThemeSelected === 'dark'}
                            data={dataSourceUrlTable} />
                    </MDBTabsPane>

                    <MDBTabsPane open={hookTabHomeActive === 'Dataimage'}>
                        <MDBNavbar
                            style={{
                                backgroundColor: hookThemeSelected === 'dark' ? '#424242' : ' #FFFFFF'
                            }}
                        >
                            <MDBContainer fluid>
                                <MDBInputGroup className='d-flex w-100 justify-content-between mb-2'>

                                    <MDBSelect
                                        label='Category'
                                        size='lg'
                                        multiple
                                        data={[
                                            { text: 'Living Room' },
                                            { text: 'Bedroom' },
                                            { text: 'Dining Room' },
                                            { text: 'Kitchen' },
                                            { text: 'Home Office' },
                                            { text: 'Outdoor' },
                                        ]}
                                        className="me-4"
                                    />

                                    <MDBSelect
                                        label='Subcategory'
                                        size='lg'
                                        multiple
                                        data={[
                                            { text: 'Bed' },
                                            { text: 'Sofa' },
                                            { text: 'Armchair' },
                                            { text: 'Shelve' },
                                            { text: 'Table' },
                                            { text: 'Cabinet' },
                                            { text: 'TV Stand' },
                                        ]}
                                    />
                                    <div className="d-flex ms-auto">

                                        <div style={{ textAlign: "center", alignItems: "center", display: "flex" }}>
                                            <MDBBtn
                                                tag='a'
                                                color='none'
                                                className="me-2"
                                                onClick={() => setDataImageGalleryColumn(2)}
                                            >
                                                <BsFiletypeJson style={{ fontSize: '34px' }} />
                                            </MDBBtn>
                                            <MDBBtn
                                                tag='a'
                                                color='none'
                                                className="me-2"
                                                onClick={() => setDataImageGalleryColumn(2)}
                                            >
                                                <BsFiletypeXlsx style={{ fontSize: '34px' }} />
                                            </MDBBtn>
                                        </div>
                                    </div>
                                </MDBInputGroup>
                            </MDBContainer>
                        </MDBNavbar>
                        <MDBDatatable
                            className='mb-3'
                            maxWidth='100%'
                            sm
                            fixedHeader
                            striped
                            dark={hookThemeSelected === 'dark'}
                            data={dataSourceImageTable} />
                    </MDBTabsPane>

                    <MDBTabsPane open={hookTabHomeActive === 'Image'}>
                        <ComponentGallery />
                    </MDBTabsPane>

                </MDBTabsContent>
            </MDBContainer>
        </>
    );
};

export default React.memo(PageHome);