import React, { useContext } from 'react'

// MD BootStrap Component
import {
    MDBContainer,
    MDBFooter,
} from 'mdb-react-ui-kit';

// Component
//import ComponentLayout from '../component/ComponentLayout';

// Data Provider
import { DataContext } from '../data/DataContext';

const PageHome = () => {

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

    return (
        <>
            <MDBContainer fluid
                style={{
                    flex: 1,
                    marginLeft: '0px',
                    marginTop: hookHeaderEnable ? '73px' : '0px',
                    //backgroundColor: '#e3f2fd'
                }}
            >
                <h2>Main Content</h2>
                <p>
                    This is the main content area. You can add your application s primary content here.
                </p>

            </MDBContainer>
        </>
    );
};

export default React.memo(PageHome);