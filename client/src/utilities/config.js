import _ from "lodash";

export const url = "http://localhost:5000/api";

export const getUserPosition = profile => {
    if (profile) {
        const status = profile.split("_");
        return _.startCase(_.toLower(status[0])) + " " + _.startCase(_.toLower(status[1]));
    }
};