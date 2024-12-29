import React, { useEffect, useContext, useRef } from 'react';

// MD BootStrap Component
import {
    MDBSideNav,
    MDBSideNavMenu,
    MDBSideNavItem,
    MDBSideNavLink,
    MDBIcon
} from 'mdb-react-ui-kit';

// Data Provider
import { DataContext } from '../data/DataContext';

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

    } = useContext(DataContext);

    const sidebarRef = useRef(null);

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

    return (
        <>
            {hookSidebarEnable && (
                <div style={{ width: "242px", height: "100%" }}>
                    <MDBSideNav
                        ref={sidebarRef}
                        backdrop={false}
                        absolute                       
                    >
                        <MDBSideNavMenu>
                            <MDBSideNavItem>
                                <MDBSideNavLink>
                                    <MDBIcon far icon='smile' className='fa-fw me-3' />
                                    Link 1
                                </MDBSideNavLink>
                            </MDBSideNavItem>
                            <MDBSideNavItem>
                                <MDBSideNavLink>
                                    <MDBIcon fas icon='grin' className='fa-fw me-3' />
                                    Link 2
                                </MDBSideNavLink>
                            </MDBSideNavItem>
                            <MDBSideNavItem>
                                <MDBSideNavLink>
                                    <MDBIcon fas icon='grin' className='fa-fw me-3' />
                                    Link 3
                                </MDBSideNavLink>
                            </MDBSideNavItem>
                        </MDBSideNavMenu>
                    </MDBSideNav>
                </div>
            )}
        </>
    );
};

export default React.memo(ComponentSidebar);