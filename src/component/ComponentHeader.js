import React, { useEffect, useContext, useRef } from 'react'

// MD BootStrap Component
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
} from 'mdb-react-ui-kit';

// Data Provider
import { DataContext } from '../data/DataContext';

const ComponentHeader = () => {

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

    const headerRef = useRef(null);

    useEffect(() => {
        if (headerRef.current) {
            const handleHeaderResize = () => {
                if (headerRef.current) {
                    const { width, height } = headerRef.current.getBoundingClientRect();
                    setHookHeaderSize({ width, height });
                }
            };

            window.addEventListener("resize", handleHeaderResize);
            handleHeaderResize();

            return () => window.removeEventListener("resize", handleHeaderResize);
        }
    }, []);

    return (
        <>
            {hookHeaderEnable && (
                <MDBNavbar
                    ref={headerRef}
                    fixed='top'
                    className='p-3'
                    style={{   
                        marginLeft: hookSidebarEnable ? '242px' : '0px',                                                          
                        //backgroundColor: '#e3f2fd',
                    }}
                >
                    <MDBContainer fluid>
                        <MDBNavbarBrand href='#'>Logo Name</MDBNavbarBrand>
                    </MDBContainer>
                </MDBNavbar>
            )}
        </>
    );
};

export default React.memo(ComponentHeader);