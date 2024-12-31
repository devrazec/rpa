import React, { useEffect, useContext, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

// MD BootStrap Component
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon,
    MDBBtn,
    MDBDropdown,
    MDBInputGroup,
    MDBDropdownToggle,
    MDBBadge,
    MDBDropdownMenu,
    MDBDropdownItem,


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
        hookLoadingVisible, setHookLoadingVisible,

    } = useContext(DataContext);

    const [isOpen, setIsOpen] = useState(false);

    const headerRef = useRef(null);

    const navigate = useNavigate();
    const urlPath = useLocation();

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
                    //ref={headerRef}
                    //fixed='top'
                    expand="lg"
                    className='p-3'
                    style={{
                        marginLeft: hookSidebarEnable ? '242px' : '0px',
                        //backgroundColor: '#e3f2fd',
                    }}
                >
                    <MDBContainer fluid>
                        <MDBNavbarToggler
                            type="button"
                            aria-controls="navbarMenu"
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <MDBIcon icon="bars" fas />
                        </MDBNavbarToggler>

                        <MDBCollapse navbar id="navbarMenu">
                            <MDBNavbarNav className="ms-auto d-flex flex-row">
                                <MDBNavbarItem>
                                    <MDBNavbarLink onClick={() => navigate('/')}>
                                        Home
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink onClick={() => navigate('/pagefolder')}>Folder</MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink onClick={() => navigate('/pagejson')}>Json</MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink onClick={() => navigate('/pagescripts')}>Scripts</MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink onClick={() => setHookSettingsVisible(true)}>
                                        <MDBIcon className='me-4' fas icon='cog' size='1x' />
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBContainer>
                </MDBNavbar>
            )}
        </>
    );
};

export default React.memo(ComponentHeader);