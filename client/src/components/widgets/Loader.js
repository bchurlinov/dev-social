import React from 'react';
import "./Loader.scss";

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <div className="lds-ring">
                <div>{""}</div>
                <div>{""}</div>
                <div>{""}</div>
                <div>{""}</div>
            </div>
        </div>
    );
};

export default Loader;
