// Library
import React from 'react';

interface LoadingProps {
    isLoading: boolean
}

export const Loading: React.FC<LoadingProps> = (props) => {
    const {isLoading} = props
    return <>
        {isLoading &&
        <div className="lds-dual-ring"/>
        }
        </>
}
