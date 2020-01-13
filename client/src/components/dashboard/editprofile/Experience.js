import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {addExperience} from "../../../store/actions/profileActions";
import {Input, DatePicker, Button, Checkbox, message} from "antd";
import moment from "moment";
import "./Education.scss"

const Experience = ({profile, history, addExperience, experienceLoading, profileUpdated, successExperience}) => {

    useEffect(() => {
      if(successExperience) {
          success(successExperience);
      }
    }, [successExperience]);

    useEffect(() => {
        if (profileUpdated) {
            setTimeout(() => {
                history.push(`/profile/${profile.user._id}`);
            }, 2000)
        }
    }, [profileUpdated])

    const [inputs, setInputs] = useState({
        position: "",
        company: "",
        location: "",
        from: "",
        to: "",
        description: "",
        current: false
    });

    const inputHandler = event => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    };

    const dateHandler = (date, datestring, name) => {
        setInputs({
            ...inputs,
            [name]: date
        })
    };

    const checkBoxHandler = event => {
        setInputs({
            ...inputs,
            to: "",
            [event.target.name]: event.target.checked
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (formValid()) {
            addExperience(inputs);
        }

    };

    const formValid = () => {
        if (checkIfEmpty()) {
            error("All fields are required");
            return false;
        } else if (!checkCompany()) {
            error("Company should contain at least 2 characters");
            return false;
        } else if (!checkCompanyPosition()) {
            error("Company's position should contain at least 5 characters");
            return false;
        } else if (checkDates()) {
            error("From Date shouldn't be greater than To Date");
            return false;
        } else {
            return true;
        }
    };

    const checkIfEmpty = () => {
        return (
            !inputs.company || !inputs.position || !inputs.location || !inputs.from
        )
    };

    const checkCompany = () => {
        return inputs.company.length >= 2
    };

    const checkCompanyPosition = () => {
        return inputs.position.length >= 5
    };

    const checkDates = () => {
        const fromDate = moment(inputs.from);
        const toDate = moment(inputs.to);

        if (checkCurrent()) {
            return true;
        } else return fromDate.diff(toDate, "days") >= 0;

    };

    const checkCurrent = () => {
        return !!(inputs.current && inputs.to);
    };

    const success = msg => {
        message.success(msg);
    };

    const error = msg => {
        message.error(msg);
    };

    return (
        <div className="add-education-wrap">
            {checkDates()}
            <form onSubmit={handleSubmit} className="add-education-form" noValidate>
                <div className="add-education-form__group">
                    <label>Company: </label>
                    <Input
                        name="company"
                        value={inputs.company}
                        placeholder="Add the company that you worked in"
                        onChange={inputHandler}
                    />
                </div>
                <div className="add-education-form__group">
                    <label>Position: </label>
                    <Input
                        name="position"
                        value={inputs.position}
                        placeholder="Enter your position in this company"
                        onChange={inputHandler}
                    />
                </div>
                <div className="add-education-form__group">
                    <label>Location: </label>
                    <Input
                        name="location"
                        value={inputs.location}
                        placeholder="Add the company's location"
                        onChange={inputHandler}
                    />
                </div>
                <div className="add-education-form__group">
                    <label>Description: </label>
                    <Input
                        name="description"
                        value={inputs.description}
                        placeholder="In one sentence describe the company you worked in"
                        onChange={inputHandler}
                    />
                </div>
                <div className="add-education-form__group">
                    <label>From: </label><br/>
                    <DatePicker
                        name="from"
                        placeholder="From"
                        allowClear={true}
                        defaultValue={inputs.from ? inputs.from : null}
                        onChange={(date, dateString) => dateHandler(date, dateString, "from")}
                    />
                </div>
                <div className="add-education-form__group">
                    <label>To: </label><br/>
                    <DatePicker
                        name="to"
                        placeholder="To"
                        allowClear={true}
                        disabled={inputs.current}
                        defaultValue={inputs.to ? inputs.to : null}
                        onChange={(date, dateString) => dateHandler(date, dateString, "to")}
                    />
                </div>
                <div className="add-education-form__group">
                    <label>Currently work here: </label>
                    <Checkbox
                        name="current"
                        onChange={checkBoxHandler}
                    >
                    </Checkbox>
                </div>
                <div className="add-education-form__group">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={experienceLoading}
                        disabled={experienceLoading}
                    >
                        Submit Experience
                    </Button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        experienceLoading: state.profile.experienceLoading,
        successExperience: state.profile.successExperience,
        profileUpdated: state.profile.profileUpdated
    }
};

export default connect(mapStateToProps, {addExperience})(Experience);