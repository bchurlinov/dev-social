import React, {useState} from 'react';
import {connect} from "react-redux";
import ProfileCard from "../profiles/ProfileCard";
import {loadProfiles} from "../../store/actions/profileActions";
import {Input, Select, Icon, Button} from "antd";
import _ from "lodash";
import "./Developers.scss";

const {Option} = Select;

const Developers = ({profiles, loadProfiles}) => {

    const [filter, setFilter] = useState({isVisible: false});
    const [select, setSelect] = useState({
        status: "",
        skills: "",
        location: ""
    });

    const toggleFilters = () => {
        setFilter({
            ...filter,
            isVisible: !filter.isVisible
        })
    };

    const filtersClass = () => {
        return filter.isVisible ? {display: "flex"} : {display: "none"}
    };

    const renderDevelopers = () => {
        return profiles && _.map(profiles, (profile, index) => {
            return <ProfileCard key={index} profile={profile}/>
        })
    };

    const inputHandler = event => {
        setSelect({
            ...select,
            [event.target.name]: event.target.value
        })
    };

    const selectChange = (value, name) => {
        setSelect({
            ...select,
            [name]: value
        })
    };

    const searchDev = () => {
        loadProfiles(select.status, select.skills, select.location);
    };

    return (
        <div id="developers">
            <div className="container">
                <div className="developers-header">
                    <h2>Find developers</h2>
                    <h3 onClick={toggleFilters}>Filters <Icon type="interaction"/></h3>
                    <div className="clearfix">{""}</div>
                </div>
                <div className="filters-wrap animated fadeIn" style={filtersClass()}>
                    <div className="filters-wrap__item">
                        <label>What type of developer you need ?</label>
                        <Select
                            placeholder="Choose from the options"
                            onChange={(value) => selectChange(value, "status")}
                            allowClear={true}
                        >
                            <Option value="front_end">Front End Developer</Option>
                            <Option value="back_end">Back End Developer</Option>
                            <Option value="full_stack">Full Stack Developer</Option>
                        </Select>
                    </div>
                    <div className="filters-wrap__item">
                        <label>What type of skills you look for a developer ?</label>
                        <Select
                            name="skills"
                            placeholder="Select at least one skill"
                            onChange={(value) => selectChange(value, "skills")}
                        >
                            <Option value="html5">HTML 5</Option>
                            <Option value="css3">CSS 3</Option>
                            <Option value="javascript">Javascript</Option>
                            <Option value="jquery">JQuery</Option>
                            <Option value="node">Node.js</Option>
                            <Option value="php">PHP</Option>
                            <Option value="python">Python</Option>
                            <Option value="bootstrap">Bootstrap</Option>
                            <Option value="react">React.JS</Option>
                            <Option value="vue">Vue.JS</Option>
                            <Option value="angular">Angular.JS</Option>
                        </Select>
                    </div>
                    <div className="filters-wrap__item">
                        <label>Find developer by location</label>
                        <Input
                            name="location"
                            placeholder="Type any location"
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="filters-wrap__item">
                        <Button type="primary" onClick={searchDev}>
                            Find Developers
                        </Button>
                    </div>
                </div>
                <div className="developers-wrapper">
                    {profiles.length !== 0 ?
                        renderDevelopers()
                        :
                        <p>No developers found that match your search criteria</p>
                    }

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userData: state.auth.user,
        profiles: state.profile.profiles,
    }
};

export default connect(mapStateToProps, {loadProfiles})(Developers);