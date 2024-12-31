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
    getScrapping,
    getFormatJson,
    getCleanJson,
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
        dataSourceTable, setDataSourceTable,

    } = useContext(DataContext);

    const sidebarRef = useRef(null);

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
    };

    const onGetScrapping = (data) => {

        setHookLoadingVisible(true);

        getScrapping(data).then(
            (response) => {
                if (response) {
                    setHookLoadingVisible(false);
                }
            }
        );
    };

    const onGetFormatJson = (data) => {

        setHookLoadingVisible(true);

        getFormatJson(data).then(
            (response) => {
                if (response) {
                    setHookLoadingVisible(false);
                }
            }
        );
    };

    const onGetCleanJson = (data) => {

        setHookLoadingVisible(true);

        getCleanJson(data).then(
            (response) => {
                if (response) {
                    setHookLoadingVisible(false);
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
                            <div className="d-flex align-items-center justify-content-between">
                                <MDBBtn
                                    className=""
                                    size="sm"
                                    color='success'
                                    onClick={() => onGetScrapping(dataSourceSelected)}
                                    disabled={dataSourceSelected ? (false) : (true)}
                                    style={{
                                    }}
                                >
                                    <MDBIcon className='me-3' fas icon='play' size='1x' />
                                    Start
                                </MDBBtn>

                                <MDBBtn
                                    className=""
                                    size="sm"
                                    color='secondary'
                                    onClick={() => onGetFormatJson(dataSourceSelected)}
                                    disabled={dataSourceSelected ? (false) : (true)}
                                    style={{

                                    }}
                                >
                                    <MDBIcon className='me-1' fas icon='align-justify' size='1x' />
                                    Format
                                </MDBBtn>
                            </div>

                            <hr />

                            <p className="mb-3">Data</p>
                            <MDBBtn
                                className="w-100 mb-4"
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
                            <MDBBtn
                                className="w-100"
                                size="sm"
                                color='danger'
                                onClick={() => onGetCleanJson(dataSourceSelected)}
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