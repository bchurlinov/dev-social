import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logOut} from "../../store/actions/authActions";
import {Icon} from "antd";
import "./Navbar.scss";

const Navbar = ({logOut, isAuthenticated}) => {

    const logOutUser = () => {
        logOut();
    };

    return (
        <>
            {isAuthenticated ?
                <nav>
                    <div>
                        <Link to="/">
                            <Icon type="api"/>
                            <span>Social<b>Dev</b></span>
                        </Link>
                    </div>

                    <div>
                        <ul>
                            <li>
                                <Link to="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/developers">
                                    Developers
                                </Link>
                            </li>
                            <li>
                                <Link to="/posts">
                                    Posts
                                </Link></li>
                            <li> | </li>
                            <li>
                                <Icon type="setting"/>
                                <Link to="/dashboard">Settings</Link>
                            </li>
                            <li onClick={logOutUser}>
                                <Icon type="logout"/>
                                Logout
                            </li>
                        </ul>
                    </div>
                    <div className="clearfix">{""}</div>
                </nav>
                : null
            }
        </>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
};

export default connect(mapStateToProps, {logOut})(Navbar);