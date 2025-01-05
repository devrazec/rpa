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
} from 'mdb-react-ui-kit';

// Data Provider
import { DataContext } from '../data/DataContext';

const ComponentGallery = () => {

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

    useEffect(() => {
        setDataImageGalleryColumn(6);
    }, []);

    useEffect(() => {
        if (dataSourceImageJson) {
            setDataImageGalleryTable({
                columns: handleGalleryColumn(dataImageGalleryColumn),
                rows: handleGalleryRow(dataImageGalleryColumn),
            });
        }
    }, [dataSourceImageJson]);

    const handleGalleryColumn = (numColumns) => {
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

    const handleGalleryRow = (numColumns) => {

        if (dataSourceImageJson) {

            const imageArray = (Array.isArray(dataSourceImageJson) ? dataSourceImageJson : []).map(item => ({
            //const imageArray = dataSourceImageJson?.map(item => ({
                filename: item.filename,
                category: item.category,
                subcategory: item.subcategory,
                image_url: `http://localhost:3002/${item.category}/${item.subcategory}/${item.filename}`
            }));            

            const rows = [];            

            for (let i = 0; i < Math.ceil(imageArray.length / numColumns); i++) {
                const row = [];
                for (let j = 0; j < numColumns; j++) {
                    const index = i * numColumns + j;
                    if (index < imageArray.length) {
                        const image = imageArray[index];
                        row.push(
                            <a
                                href={image.image_url.startsWith("http") ? image.image_url : `https://${image.image_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={image.image_url}
                                    alt={`${image.subcategory}-${image.filename}`}
                                    style={{
                                        width: "200px",
                                        //height: "50px",
                                        objectFit: "cover",
                                        cursor: "pointer"
                                    }}
                                />
                            </a>
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
            <MDBDatatable maxWidth='1080px' entriesOptions={[2, 3, 4]} data={dataImageGalleryTable} />
        </>
    );
};

export default React.memo(ComponentGallery);