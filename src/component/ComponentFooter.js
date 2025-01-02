import React, { useContext } from 'react'

// MD BootStrap Component
import {
    MDBContainer,
    MDBFooter,
} from 'mdb-react-ui-kit';

// Data Provider
import { DataContext } from '../data/DataContext';

const ComponentFooter = () => {

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

    return (
        <>
            {hookFooterEnable && (
                <MDBFooter
                    className='text-center shadow-inner'
                    style={{
                        marginLeft: hookSidebarEnable ? '242px' : '0px',
                        //backgroundColor: '#e3f2fd',
                    }}
                >
                    <MDBContainer fluid>
                        <div className='text-center p-3' style={{}}>
                            &copy; {new Date().getFullYear()} Copyright:{' '}
                            <a className='' href='https://www.desion.de/'>
                                www.desion.de
                            </a>
                        </div>
                    </MDBContainer>
                </MDBFooter>
            )}
        </>
    );
};

export default React.memo(ComponentFooter);