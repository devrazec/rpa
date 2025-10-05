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
    MDBSideNav,
    MDBSideNavMenu,
    MDBSideNavItem,
    MDBSideNavLink,
    MDBSelect,
    MDBInputGroup,
    MDBNavbar,
    MDBNavbarBrand,
    MDBLightbox,
    MDBLightboxItem,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';

// Icons
import { LuColumns2 } from "react-icons/lu";
import { LuColumns3 } from "react-icons/lu";
import { LuColumns4 } from "react-icons/lu";

import { TfiLayoutColumn2Alt } from "react-icons/tfi";
import { TfiLayoutColumn3Alt } from "react-icons/tfi";
import { TfiLayoutColumn4Alt } from "react-icons/tfi";

import { BsFiletypeJson } from "react-icons/bs";
import { BsFiletypeXlsx } from "react-icons/bs";

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
} from '../api/ApiGetData';

let PROTOCOL = '';

const BACKEND_HTTPS = process.env.REACT_APP_BACKEND_HTTPS;

if (BACKEND_HTTPS === 'true') {
    PROTOCOL = 'https://'
} else {
    PROTOCOL = 'http://';
}

const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;

const ComponentGallery = () => {

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
        dataSourceWebsiteJson, setDataSourceWebsiteJson,
        dataSourceWebsiteTable, setDataSourceWebsiteTable,
        dataSourceImageJson, setDataSourceImageJson,
        dataSourceImageTable, setDataSourceImageTable,
        dataImageGalleryArray, setDataImageGalleryArray,
        dataImageGalleryTable, setDataImageGalleryTable,
        dataImageGalleryColumn, setDataImageGalleryColumn,

    } = useContext(DataContext);

    useEffect(() => {
        if (dataSourceImageJson) {
            handleGalleryColumn();
            handleGalleryRow();
            setDataImageGalleryTable({
                columns: handleGalleryColumn(dataImageGalleryColumn),
                rows: handleGalleryRow(dataImageGalleryColumn),
            });
        }
    }, [dataSourceImageJson, dataImageGalleryColumn]);

    const onGetCategory = () => {

        getDataCategory().then(
            (response) => {
                if (response) {
                    //setDataSourceCategoryJson(response);

                    const transformedData = response.map(item => ({
                        text: item.name,
                        value: item.id
                    }));
                }
            }
        );
    };

    const handleGalleryColumn = () => {

        const numColumns = dataImageGalleryColumn;
        const columns = [];

        for (let i = 1; i <= numColumns; i++) {
            columns.push({
                sort: false,
                label: '',
                field: `column${i}`,
            });
        }
        return columns;
    };

    const handleGalleryRow = () => {

        if (dataSourceImageJson) {

            const numColumns = dataImageGalleryColumn;

            const imageArray = (Array.isArray(dataSourceImageJson) ? dataSourceImageJson : []).map(item => ({
                //const imageArray = dataSourceImageJson?.map(item => ({
                filename: item.filename,
                category: item.category,
                subcategory: item.subcategory,
                image_url: `${PROTOCOL}${BACKEND_IP}:${BACKEND_PORT}/images/${item.category}/${item.subcategory}/${item.filename}`
            }));

            const rows = [];

            for (let i = 0; i < Math.ceil(imageArray.length / numColumns); i++) {
                const row = [];
                for (let j = 0; j < numColumns; j++) {
                    const index = i * numColumns + j;
                    if (index < imageArray.length) {
                        const image = imageArray[index];
                        row.push(
                            <>
                                <span style={{ marginBottom: "8px", fontSize: "16px", textAlign: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                                    {image.category} / {image.subcategory}
                                </span>
                                <MDBLightbox>
                                    <MDBLightboxItem
                                        src={image.image_url}
                                        fullscreenSrc={image.image_url}
                                        className='w-100'
                                        alt={`${image.subcategory}-${image.filename}`}
                                        caption={image.category + '/' + image.subcategory + ' | Filename: ' + image.filename}
                                    />
                                </MDBLightbox>

                                <span style={{ marginTop: "8px", fontSize: "16px", textAlign: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                                    Filename: {image.filename}
                                </span>
                            </>
                        );
                    } else {
                        row.push(null);
                    }
                }
                rows.push(row);
            }

            //console.log(rows);
            return rows;
        }
    };

    return (
        <>
            <MDBNavbar
                style={{
                    backgroundColor: hookThemeSelected === 'dark' ? '#424242' : ' #FFFFFF'
                }}
            >
                <MDBContainer fluid>
                    <MDBInputGroup className='d-flex w-100 justify-content-between'>
                        <MDBSelect
                            label='Category'
                            size='lg'
                            multiple
                            data={[
                                { text: 'Living Room' },
                                { text: 'Bedroom' },
                                { text: 'Dining Room' },
                                { text: 'Bar' },
                                { text: 'Kitchen' },
                                { text: 'Home Office' },
                                { text: 'Bathroom' },
                                { text: 'Entryway' },
                            ]}
                            className="me-4"
                        />

                        <MDBSelect
                            label='Subcategory'
                            size='lg'
                            multiple
                            data={[
                                { text: 'Sofa' },
                                { text: 'Armchair' },
                                { text: 'Bed' },
                                { text: 'Shelve' },
                                { text: 'Table' },
                                { text: 'Cabinet' },
                                { text: 'TV Stand' },
                                { text: 'Outdoor' },
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
                                    <TfiLayoutColumn2Alt style={{ fontSize: '34px' }} />
                                </MDBBtn>
                                <MDBBtn
                                    tag='a'
                                    color='none'
                                    className="me-2"
                                    onClick={() => setDataImageGalleryColumn(3)}
                                >
                                    <TfiLayoutColumn3Alt style={{ fontSize: '34px' }} />
                                </MDBBtn>
                                <MDBBtn
                                    tag='a'
                                    color='none'
                                    className="me-2"
                                    onClick={() => setDataImageGalleryColumn(4)}
                                >
                                    <TfiLayoutColumn4Alt style={{ fontSize: '34px' }} />
                                </MDBBtn>
                            </div>
                        </div>
                    </MDBInputGroup>
                </MDBContainer>
            </MDBNavbar>
            <div>
                <MDBDatatable
                    className='mb-3'
                    maxWidth='100%'
                    striped
                    hover
                    dark={hookThemeSelected === 'dark'}
                    entries={2}
                    entriesOptions={[2, 3, 4]}
                    data={dataImageGalleryTable} />
            </div>
        </>
    );
};

export default React.memo(ComponentGallery);