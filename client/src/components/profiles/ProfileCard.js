import React from 'react';
import {Link} from "react-router-dom";
import {Button, Icon} from "antd";
import _ from "lodash";
import "./ProfileCard.scss";

const ProfileCard = ({profile}) => {

    const getPosition = () => {
        const status = profile.status.split("_");
        return _.startCase(_.toLower(status[0])) + " " + _.startCase(_.toLower(status[1]));
    };

    const getSkills = () => {
      return _.map(profile.skills.slice(0,3), (skill, index) => {
          return (
              <li key={index}>
                  <Icon type="check"/> {skill.toUpperCase()}
              </li>
          )
      })
    };

    return (
        <>
            <div className="profile animated fadeIn">
                <div className="profile-wrap">
                    <div className="profile-header">
                        <img src={profile.user.avatar} alt="Avatar"/>
                    </div>
                    <div className="profile-information">
                        <div>
                            <h3>{profile.user.name}</h3>
                            <h4>{getPosition()} Developer</h4>
                        </div>

                        <div>
                            <ul>
                                {getSkills()}
                                <span>...</span>
                            </ul>
                        </div>
                    </div>
                    <div className="profile-link">
                        <Button type="primary">
                            <Link to={`/profile/${profile.user._id}`} className="button button-small">
                                View Profile
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileCard;