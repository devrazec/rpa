import React, { useEffect, useState, useContext } from 'react'

// MD BootStrap Component
import {
    MDBLoadingManagement,
    MDBIcon,
} from 'mdb-react-ui-kit';

// Data Provider
import { DataContext } from '../data/DataContext';

const ComponentLoading = () => {

    // Global Data Context
    const {
        hookLoadingVisible, setHookLoadingVisible,
    } = useContext(DataContext);

    return (
        <>
            <MDBLoadingManagement
                isOpen={hookLoadingVisible}
                fullScreen
                backdropColor='black'
                backdropOpacity={0.2}
                spinnerElement={<MDBIcon className='loading-icon' fas icon='spinner' size='4x' spin />}
            />
        </>
    );
};

export default React.memo(ComponentLoading);