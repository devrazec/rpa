import React, { useEffect, useContext, useState } from 'react'

// MD BootStrap Component
import {
    MDBSideNav,
    MDBSideNavMenu,
    MDBSideNavItem,
    MDBSideNavLink,
    MDBBtn,
    MDBIcon,
    MDBSelect,
} from 'mdb-react-ui-kit';

// Data Provider
import { DataContext } from '../data/DataContext';

// Rest Api
import { getSettings, postSettings, patchtHookSettingsVisible, patchtHookSettingsEnable } from '../api/ApiSettings';

const ComponentSettings = () => {

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

    } = useContext(DataContext);

    //const [settingsVisible, setSettingsVisible] = useState(false);

    const [selectTheme, setSelectTheme] = useState([
        { text: 'Light', value: 'light' },
        { text: 'Dark', value: 'dark' },
        { text: 'Blue', value: 'blue' },
        { text: 'Green', value: 'green' },
        { text: 'Red', value: 'red' },
        { text: 'Yellow', value: 'yellow' },
    ]);

    useEffect(() => {
        const handleResize = () => {
            setHookWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);

    }, []);

    useEffect(() => {

        getSettings().then(
            (response) => {
                if (response) {
                    setHookTheme(response.hookTheme);
                    setHookHeaderEnable(response.hookHeaderEnable);
                    setHookSidebarEnable(response.hookSidebarEnable);
                    setHookFooterEnable(response.hookFooterEnable);
                    setHookSettingsEnable(response.hookSettingsEnable);
                    setHookSettingsVisible(response.hookSettingsVisible);
                }
            }
        )
    }, []);

    useEffect(() => {

        if (hookSettingsVisible) {

            postSettings(
                {
                    "hookTheme": hookTheme,
                    "hookHeaderEnable": hookHeaderEnable,
                    "hookSidebarEnable": hookSidebarEnable,
                    "hookFooterEnable": hookFooterEnable,
                    "hookSettingsEnable": hookSettingsEnable,
                    "hookSettingsVisible": hookSettingsVisible,
                }
            ).then(
                (response) => {
                    if (response) {
                        //console.log(response);
                    }
                }
            )
        }
    }, [
        hookTheme,
        hookHeaderEnable,
        hookSidebarEnable,
        hookFooterEnable,
        hookSettingsEnable,
        hookSettingsVisible,
    ]);

    const loadTheme = async () => {

        const cssTheme = document.getElementById("css-theme");

        document.documentElement.setAttribute('data-mdb-theme', hookTheme);

        if (cssTheme) {

            if (hookTheme === 'light') {
                cssTheme.href = 'theme/mdb.min.css';
            }

            if (hookTheme === 'dark') {
                cssTheme.href = 'theme/mdb.dark.min.css';
            }

            if (hookTheme === 'blue') {
                cssTheme.href = 'theme/mdb.blue.min.css';
            }

            if (hookTheme === 'green') {
                cssTheme.href = 'theme/mdb.green.min.css';
            }

            if (hookTheme === 'red') {
                cssTheme.href = 'theme/mdb.red.min.css';
            }

            if (hookTheme === 'yellow') {
                cssTheme.href = 'theme/mdb.yellow.min.css';
            }

            document.head.appendChild(cssTheme);

        } else {
            const link = document.createElement('link');
            link.id = "css-theme";
            link.rel = 'stylesheet';

            if (hookTheme === 'light') {
                link.href = 'theme/mdb.min.css';
            }

            if (hookTheme === 'dark') {
                link.href = 'theme/mdb.dark.min.css';
            }

            if (hookTheme === 'blue') {
                link.href = 'theme/mdb.blue.min.css';
            }

            if (hookTheme === 'green') {
                link.href = 'theme/mdb.green.min.css';
            }

            if (hookTheme === 'red') {
                link.href = 'theme/mdb.red.min.css';
            }

            if (hookTheme === 'yellow') {
                link.href = 'theme/mdb.yellow.min.css';
            }

            document.head.appendChild(link);
        }
    };

    useEffect(() => {
        if (hookTheme) {
            loadTheme();
        }
    }, [hookTheme]);

    const handleSettingsVisible = () => {
        setHookSettingsVisible(false);
        patchtHookSettingsVisible(!hookSettingsVisible);
    };

    const handleSettingsEnable = () => {
        setHookSettingsVisible(false);
        setHookSettingsEnable(false);
        patchtHookSettingsVisible(!hookSettingsVisible);
        patchtHookSettingsEnable(!hookSettingsEnable);
    };

    return (
        <>
            {hookSettingsEnable && (
                <>
                    <MDBSideNav
                        right
                        open={hookSettingsVisible}
                        backdrop={false}
                        style={{
                            padding: '15px',
                            //backgroundColor: '#e3f2fd'
                        }}
                    >
                        <MDBSideNavMenu>

                            <div className="d-flex justify-content-end mb-2">
                                <MDBBtn
                                    //color="danger"
                                    //size="sm"
                                    outline
                                    floating
                                    onClick={() => handleSettingsVisible()}
                                >
                                    <MDBIcon fas icon='times' size='2x' />
                                </MDBBtn>
                            </div>
                            <p className="mb-1">Theme</p>
                            <MDBSelect
                                className="mb-4"
                                size="lg"
                                data={selectTheme}
                                //label='Theme'
                                value={hookTheme}
                                onChange={(e) => {
                                    setHookTheme(e.value);
                                }}
                            />

                            <div className="form-check form-switch mb-4">
                                <input className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="switchHeader"
                                    checked={hookHeaderEnable}
                                    onChange={(e) => setHookHeaderEnable(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="switchHeader">Enable Header</label>
                            </div>

                            <div className="form-check form-switch mb-4">
                                <input className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="switchSidebar"
                                    checked={hookSidebarEnable}
                                    onChange={(e) => setHookSidebarEnable(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="switchSidebar">Enable Sidebar</label>
                            </div>

                            <div className="form-check form-switch mb-4">
                                <input className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="switchFooter"
                                    checked={hookFooterEnable}
                                    onChange={(e) => setHookFooterEnable(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="switchFooter">Enable Footer</label>
                            </div>

                            <div className="form-check form-switch mb-4">
                                <input className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="switchSettings"
                                    checked={hookSettingsEnable}
                                    onChange={() => handleSettingsEnable()}
                                />
                                <label className="form-check-label" htmlFor="switchSettings">Enable Settings</label>
                            </div>

                        </MDBSideNavMenu>
                    </MDBSideNav>

                    {/* <div
                        style={{
                            position: 'relative'
                        }}>
                        <MDBBtn
                            onClick={() => setHookSettingsVisible(true)}
                            style={{
                                position: "fixed",
                                top: "50%",
                                right: "0",
                                transform: "translateY(-50%)",                                
                                border: "none",
                                borderRadius: "5px 0 0 5px",
                                width: "50px",
                                height: "50px",
                                cursor: "pointer",
                            }}
                        >
                            <MDBIcon className='d-flex justify-content-center' fas icon='cog' size='2x' />
                        </MDBBtn>
                    </div> */}
                </>
            )}
        </>
    );
};

export default React.memo(ComponentSettings);