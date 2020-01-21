import _ from "lodash";
import {Spin} from "antd";
import React from "react";

// export const url = "http://localhost:5000/api";
export const url = "https://fierce-beach-01153.herokuapp.com/api";

export const getUserPosition = profile => {
    if (profile) {
        const status = profile.split("_");
        return _.startCase(_.toLower(status[0])) + " " + _.startCase(_.toLower(status[1]));
    }
};

export const renderProfileSpinner = () => {
    return (
        <div className="profile-spinner">
            <Spin size="large"/>
        </div>
    )
};