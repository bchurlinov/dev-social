import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {editEducation} from "../../../store/actions/profileActions";
import {Input, Select, DatePicker, Button, Checkbox, message} from "antd";
import moment from "moment";
import "./Education.scss"

const Education = ({profile, successEducation, history, editEducation, educationLoading, profileUpdated}) => {

    useEffect(() => {
        if(successEducation) {
            success(successEducation)
        }
    }, [successEducation]);

    useEffect(() => {
        if (profileUpdated) {
            setTimeout(() => {
                history.push(`/profile/${profile.user._id}`);
            }, 2000)
        }
    }, [profileUpdated])

    const [inputs, setInputs] = useState({
        school: "",
        fieldofstudy: "",
        degree: "",
        description: "",
        from: "",
        to: "",
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
            editEducation(inputs);
        }

    };

    const formValid = () => {
        if (checkIfEmpty()) {
            error("All fields are required");
            return false;
        } else if (!checkSchool()) {
            error("School should contain at least 3 characters");
            return false;
        } else if (!checkStudyField()) {
            error("Field of study should contain at least 5 characters");
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
            !inputs.school || !inputs.fieldofstudy || !inputs.degree || !inputs.from
        )
    };

    const checkSchool = () => {
        return inputs.school.length >= 3
    };

    const checkStudyField = () => {
        return inputs.fieldofstudy.length >= 5
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
                    <label>School: </label>
                    <Input
                        name="school"
                        value={inputs.school}
                        placeholder="Add a school that you attended"
                        onChange={inputHandler}
                    />
                </div>
                <div className="add-education-form__group">
                    <label>Field of study: </label>
                    <Input
                        name="fieldofstudy"
                        value={inputs.fieldofstudy}
                        placeholder="Add field of study"
                        onChange={inputHandler}
                    />
                </div>
                <div className="add-education-form__group">
                    <label>Degree: </label>
                    <Input
                        name="degree"
                        value={inputs.degree}
                        placeholder="Add university degree"
                        onChange={inputHandler}
                    />
                </div>
                <div className="add-education-form__group">
                    <label>Description: </label>
                    <Input
                        name="description"
                        value={inputs.description}
                        placeholder="In one sentence describe your experience with this university"
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
                    <label>Currently studies here: </label>
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
                        loading={educationLoading}
                        disabled={educationLoading}
                    >
                        Submit Education
                    </Button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        successEducation: state.profile.successEducation,
        educationLoading: state.profile.educationLoading,
    }
};

export default connect(mapStateToProps, {editEducation})(Education);