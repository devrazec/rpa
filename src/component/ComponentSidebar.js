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
    getSource,
    postSource,
    postScrappingData,
    getFormatScrappingData,
    getCleanScrappingData,
    getSourceScrappingData,
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

    const sidebarRef = useRef(null);

    const extractUrl = (input) => {
        const match = input.match(/href=['"]([^'"]*)['"]/);
        return match ? match[1] : input;
    };

    useEffect(() => {
        setDataSourceSelected('ikea');
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

    const onGetSource = (data) => {

        setHookLoadingVisible(true);

        getSource(data).then(
            (response) => {
                if (response) {

                    setDataSourceJson(response);

                    const dataCategories = [...new Set(response.map(item => item.category.trim()))];
                    const dataSubcategories = [...new Set(response.map(item => item.subcategory.trim()))];

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
                            source: item.source,
                            category: item.category.trim(),
                            subcategory: item.subcategory.trim(),
                            url: item.url,
                            image: item.image,
                            enable: item.enable
                        })),
                    });

                    setHookLoadingVisible(false);
                }
            }
        );

        onLoadingScrappingData(data);
    };

    const onScrappingData = (source) => {

        setHookLoadingVisible(true);

        postScrappingData(source, dataSourceJson).then(
            (response) => {
                if (response) {
                    setHookLoadingVisible(false);
                    setDataSourceScrappingJson(response);
                }
            }
        );
    };

    const onFormatScrappingData = (data) => {

        setHookLoadingVisible(true);

        getFormatScrappingData(data).then(
            (response) => {
                if (response) {
                    setHookLoadingVisible(false);
                }
            }
        );
    };

    const onLoadingScrappingData = (data) => {

        setHookLoadingVisible(true);

        getSourceScrappingData(data).then(
            (response) => {
                if (response) {

                    setHookLoadingVisible(false);

                    setDataSourceScrappingJson(response);

                    setDataSourceScrappingTable({
                        columns: dataSourceScrappingTable.columns,
                        rows: response.map((item) => ({
                            ...item,
                            id: item.id,
                            number: item.number,
                            name: item.name,
                            price: item.price,
                            category: item.category.trim(),
                            subcategory: item.subcategory.trim(),
                            url: (
                                <a
                                    href={extractUrl(item.url).startsWith("http") ? extractUrl(item.url) : `https://${extractUrl(item.url)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open Link
                                </a>
                            ),
                            image_url: (
                                <a
                                    href={item.image_url.startsWith("http") ? item.image_url : `https://${item.image_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open Link
                                </a>
                            )
                        }))
                    });
                }
            }
        );
    };

    const onCleanScrappingData = (data) => {

        setHookLoadingVisible(true);

        getCleanScrappingData(data).then(
            (response) => {
                if (response) {
                    setHookLoadingVisible(false);
                    setDataSourceScrappingJson(null);
                }
            }
        );
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

                            <p className="mb-1">Source</p>
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
                                className="w-100"
                                size="sm"
                                color='success'
                                onClick={() => onGetSource(dataSourceSelected)}
                                disabled={dataSourceSelected ? (false) : (true)}
                                style={{
                                }}
                            >
                                <MDBIcon className='me-4' fas icon='redo' size='1x' />
                                Loading
                            </MDBBtn>
                            <hr />
                            <p className="mb-3">Scrapping</p>
                            <MDBBtn
                                className="w-100"
                                size="sm"
                                color='success'
                                onClick={() => onScrappingData(dataSourceSelected)}
                                disabled={dataSourceSelected && dataSourceJson ? (false) : (true)}
                                style={{
                                }}
                            >
                                <MDBIcon className='me-3' fas icon='play' size='1x' />
                                Start
                            </MDBBtn>

                            <hr />

                            <p className="mb-3">Data</p>
                            <MDBBtn
                                className="w-100 mb-4"
                                size="sm"
                                color='secondary'
                                onClick={() => onFormatScrappingData(dataSourceSelected)}
                                disabled={dataSourceSelected && dataSourceScrappingJson ? (false) : (true)}
                                style={{
                                }}
                            >
                                <MDBIcon className='me-1' fas icon='align-justify' size='1x' />
                                Format
                            </MDBBtn>
                            <MDBBtn
                                className="w-100 mb-4"
                                size="sm"
                                color='success'
                                onClick={() => onLoadingScrappingData(dataSourceSelected)}
                                disabled={dataSourceSelected && dataSourceScrappingJson ? (false) : (true)}
                                style={{
                                }}
                            >
                                <MDBIcon className='me-4' fas icon='redo' size='1x' />
                                Loading
                            </MDBBtn>
                            <MDBBtn
                                className="w-100"
                                size="sm"
                                color='danger'
                                onClick={() => onCleanScrappingData(dataSourceSelected)}
                                disabled={dataSourceSelected ? (false) : (true)}
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