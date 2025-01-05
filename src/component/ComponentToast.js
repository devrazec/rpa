import React, { useContext } from 'react'

// MD BootStrap Component
import {
    MDBContainer,
    MDBToast,
    MDBIcon,
} from 'mdb-react-ui-kit';

// Data Provider
import { DataContext } from '../data/DataContext';

const ComponentToast = () => {

    // Global Data Context
    const {

        // Toast
        hookToastActive, setHookToastActive,
        hookToastMessage, setHookToastMessage,

    } = useContext(DataContext);

    return (
        <>
            <MDBContainer className='text-center'>
                <MDBToast
                    color='info'
                    open={hookToastActive}
                    className='mx-auto'
                    onClose={() => setHookToastActive(false)}
                    autohide
                    position='top-right'
                    delay={3000}
                    appendToBody
                    bodyContent={
                        <div className="d-flex align-items-center">
                            <MDBIcon className='me-3' fas icon='info-circle' size='2x' />
                            <strong className='me-auto'>{hookToastMessage}</strong>
                        </div>
                    }
                />
            </MDBContainer>
        </>
    );
};

export default React.memo(ComponentToast);