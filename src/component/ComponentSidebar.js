import React, { useEffect, useContext, useRef, useState } from 'react';

// MD BootStrap Component
import {
    MDBSideNav,
    MDBSideNavMenu,
    MDBSideNavItem,
    MDBSideNavLink,
    MDBIcon,
    MDBSelect,
    MDBBtn,
    MDBRipple,
} from 'mdb-react-ui-kit';

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

const ComponentSidebar = () => {

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
        dataImageGalleryArray, setDataImageGalleryArray,
        dataImageGalleryTable, setDataImageGalleryTable,
        dataImageGalleryColumn, setDataImageGalleryColumn,

    } = useContext(DataContext);

    const sidebarRef = useRef(null);

    const extractUrl = (input) => {
        const match = input.match(/href=['"]([^'"]*)['"]/);
        return match ? match[1] : input;
    };

    useEffect(() => {
        const source = 'website1';
        setDataSourceSelected(source);
    }, []);

    useEffect(() => {

        getDataCategory().then(
            (response) => {
                if (response) {
                    setDataSourceCategoryJson(response);
                }
            }
        );

        getDataSubcategory().then(
            (response) => {
                if (response) {
                    setDataSourceSubcategoryJson(response);
                }
            }
        );

    }, []);

    useEffect(() => {
        if (sidebarRef.current) {
            const handleSidebarResize = () => {
                if (sidebarRef.current) {
                    const { width, height } = sidebarRef.current.getBoundingClientRect();
                    setHookSidebarSize({ width, height });
                }
            };

            window.addEventListener("resize", handleSidebarResize);
            handleSidebarResize();

            return () => window.removeEventListener("resize", handleSidebarResize);
        }
    }, []);

    const getTextBySource = (source) => {
        const matchedItem = dataSourceOption.find((item) => item.value === source);
        return matchedItem ? matchedItem.text : '';
    };

    const onPostReadDataSource = (source) => {

        setHookLoadingVisible(true);

        postReadDataSource(source).then(
            (response) => {
                if (response) {

                    setDataSourceJson(response);

                    const dataCategories = [...new Set(dataSourceCategoryJson?.map(item => item.name))];
                    const dataSubcategories = [...new Set(dataSourceSubcategoryJson?.map(item => item.name))];

                    setDataSourceTable({
                        columns: dataSourceTable.columns.map((column) => {
                            if (column.field === "category") {
                                return {
                                    ...column,
                                    options: dataCategories,
                                };
                            }
                            if (column.field === "subcategory") {
                                return {
                                    ...column,
                                    options: dataSubcategories,
                                };
                            }
                            return column;
                        }),
                        rows: response.map((item) => ({
                            ...item,
                            id: item.id,
                            source: getTextBySource(item.source),
                            category: item.category.trim(),
                            subcategory: item.subcategory.trim(),
                            url: item.url,
                            enable: item.enable
                        })),
                    });

                    setHookLoadingVisible(false);
                } else {
                    setHookLoadingVisible(false);
                    setHookToastActive(true);
                    setHookToastMessage('There is not Data Source!');
                }
            }
        );

        setHookTabHomeActive('Datasource');
    };

    const onLoadingDataUrl = () => {

        setHookLoadingVisible(true);

        getDataUrl().then(
            (response) => {

                if (response) {

                    setDataSourceUrlJson(response);

                    setDataSourceUrlTable({
                        columns: dataSourceUrlTable.columns,
                        rows: response.map((item) => ({
                            ...item,
                            id: item.id,                            
                            category: item.category.trim(),
                            subcategory: item.subcategory.trim(),
                            url: (
                                <a
                                    href={extractUrl(item.url).startsWith("http") ? extractUrl(item.url) : `https://${extractUrl(item.url)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ pointerEvents: "auto" }}
                                >
                                    Link
                                </a>
                            ),
                            image_url: (
                                <a
                                    href={item.image_url.startsWith("http") ? item.image_url : `https://${item.image_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.number}
                                        style={{ width: "50px", height: "50px", objectFit: "cover", cursor: "pointer" }}
                                    />
                                </a>
                            ),
                            source: getTextBySource(item.source)
                        }))
                    });                  

                    setHookLoadingVisible(false);

                } else {
                    setHookLoadingVisible(false);
                    setHookToastActive(true);
                    setHookToastMessage('There is not Data Url!');
                }
            }
        );

        setHookTabHomeActive('Dataurl');
    };

    const onLoadingDataImage = () => {

        setHookLoadingVisible(true);

        getDataImage().then(
            (response) => {

                if (response) {

                    setDataSourceImageJson(response);

                    setDataSourceImageTable({
                        columns: dataSourceImageTable.columns,
                        rows: response.map((item) => ({
                            ...item,
                            id: item.id,
                            filename: item.filename,                           
                            category: item.category.trim(),
                            subcategory: item.subcategory.trim(),
                            source: getTextBySource(item.source)
                        }))
                    });

                    setHookTabHomeActive('Dataimage');
                    setHookLoadingVisible(false);

                } else {
                    setHookTabHomeActive('Dataimage');
                    setHookLoadingVisible(false);
                    setHookToastActive(true);
                    setHookToastMessage('There is not Data Image!');
                }
            }
        );
    };

    const onPostDataUrl = (source, data) => {

        setHookLoadingVisible(true);

        const dataEnable = data.filter((item) => item.enable === true);

        if (dataEnable?.length > 0) {

            postDataUrl(source, dataEnable).then(
                (response) => {
                    if (response) {
                        setHookLoadingVisible(false);
                        setDataSourceUrlJson(response);
                    }
                }
            );
        } else {
            setHookLoadingVisible(false);
            setHookToastActive(true);
            setHookToastMessage('Enable Data Source!');
        }

        setHookTabHomeActive('Dataurl');
    };

    const onPostDataImage = (data) => {

        setHookLoadingVisible(true);

        if (data?.length > 0) {
            postDataImage(data).then(
                (response) => {
                    if (response) {
                        setHookLoadingVisible(false);
                        setDataSourceImageJson(response);
                        onLoadingDataImage();
                    }
                }
            );
        } else {
            setHookLoadingVisible(false);
            setHookToastActive(true);
            setHookToastMessage('Data Url is empty!');
        }

        setHookTabHomeActive('Dataimage');
    };

    const onCleanDataUrl = (source) => {

        setHookLoadingVisible(true);

        getCleanDataUrl(source).then(
            (response) => {
                if (response) {
                    setHookLoadingVisible(false);
                    setDataSourceUrlJson(null);
                    setDataSourceUrlTable({
                        columns: dataSourceUrlTable.columns,
                        rows: []
                    });
                }
            }
        );

        setHookTabHomeActive('Dataurl');
    };

    const onCleanDataImage = (source) => {

        setHookLoadingVisible(true);

        getCleanDataImage(source).then(
            (response) => {
                if (response) {
                    setHookLoadingVisible(false);
                    setDataSourceImageJson(null);
                    setDataSourceImageTable({
                        columns: dataSourceImageTable.columns,
                        rows: []
                    });
                }
            }
        );

        setHookTabHomeActive('Dataimage');
    };

    return (
        <>
            {hookSidebarEnable && (
                <div style={{ width: "242px", height: "100%" }}>
                    <MDBSideNav
                        ref={sidebarRef}
                        backdrop={false}
                        absolute
                        style={{
                            padding: '15px',
                            //backgroundColor: '#e3f2fd'
                        }}
                    >
                        <MDBRipple tag="a" className="d-flex justify-content-center">
                            <img
                                className=""
                                id="desion-logo"
                                src="./desion_logo.png"
                                alt="Desion Logo"
                                width="150px"
                                draggable="false"
                            />
                        </MDBRipple>

                        <hr />

                        <MDBSideNavMenu>

                            <p className="mb-1">Data Source</p>
                            <MDBSelect
                                className="mb-4"
                                size="lg"
                                data={dataSourceOption}
                                placeholder='Select'
                                //label='Theme'
                                value={dataSourceSelected}
                                onChange={(e) => {
                                    setDataSourceSelected(e.value);
                                }}
                            />

                            <MDBBtn
                                className="w-100 mb-4"
                                size="sm"
                                color='success'
                                onClick={() => onPostReadDataSource(dataSourceSelected)}
                                disabled={dataSourceSelected ? (false) : (true)}
                                style={{
                                }}
                            >
                                <MDBIcon className='me-4' fas icon='redo' size='1x' />
                                Load Data
                            </MDBBtn>
                            <MDBBtn
                                className="w-100"
                                size="sm"
                                color='success'
                                onClick={() => onPostDataUrl(dataSourceSelected, dataSourceJson)}
                                disabled={dataSourceSelected && dataSourceJson ? (false) : (true)}
                                style={{
                                }}
                            >
                                <MDBIcon className='me-3' fas icon='play' size='1x' />
                                Get Data
                            </MDBBtn>

                            <hr />

                            <p className="mb-3">Data Url</p>
                            <MDBBtn
                                className="w-100 mb-4"
                                size="sm"
                                color='success'
                                onClick={() => onLoadingDataUrl()}
                                style={{
                                }}
                            >
                                <MDBIcon className='me-4' fas icon='redo' size='1x' />
                                Load Data
                            </MDBBtn>
                            <MDBBtn
                                className="w-100"
                                size="sm"
                                color='danger'
                                onClick={() => onCleanDataUrl()}
                                style={{
                                }}
                            >
                                <MDBIcon className='me-4' fas icon='trash-alt' size='1x' />
                                Clean
                            </MDBBtn>
                            <hr />
                            <p className="mb-3">Data Image</p>
                            <MDBBtn
                                className="w-100 mb-4"
                                size="sm"
                                color='success'
                                onClick={() => onLoadingDataImage()}
                                style={{
                                }}
                            >
                                <MDBIcon className='me-4' fas icon='redo' size='1x' />
                                Load Data
                            </MDBBtn>
                            <MDBBtn
                                className="w-100 mb-4"
                                size="sm"
                                color='success'
                                onClick={() => onPostDataImage(dataSourceUrlJson)}
                                disabled={dataSourceUrlJson ? (false) : (true)}
                                style={{
                                }}
                            >
                                <MDBIcon className='me-3' fas icon='play' size='1x' />
                                Get Image
                            </MDBBtn>
                            <MDBBtn
                                className="w-100"
                                size="sm"
                                color='danger'
                                onClick={() => onCleanDataImage()}
                                style={{
                                }}
                            >
                                <MDBIcon className='me-4' fas icon='trash-alt' size='1x' />
                                Clean
                            </MDBBtn>

                        </MDBSideNavMenu>
                    </MDBSideNav>
                </div>
            )}
        </>
    );
};

export default React.memo(ComponentSidebar);