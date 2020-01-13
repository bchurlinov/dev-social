import React, {useState, useEffect} from 'react';
import Login from "./Login";
import Register from "./Register";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {logIn} from "../../store/actions/authActions";
import {Button, Icon, Modal, message} from "antd";
import 'antd/dist/antd.css';
import "./Auth.scss";

const Auth = ({isAuthenticated, logIn, loading, errorMessage}) => {

    const [modal, setModal] = useState({isVisible: false});

    const toggleModal = () => {
        setModal({
            ...modal,
            isVisible: !modal.isVisible
        });
    };

    const error = msg => {
        message.error(msg);
    };

    useEffect(() => {

        if (errorMessage) {
            error(errorMessage);
        }

    }, [errorMessage]);

    if (isAuthenticated) {
        return <Redirect to="/"/>
    }

    return (
        <div className="auth-wrap">
            <div className="auth-wrap__item">
                <div>
                    <ul>
                        <li><Icon type="search"/> Find developers and work together</li>
                        <li><Icon type="wechat"/> Socialize with developers around the world</li>
                        <li><Icon type="api"/> Connect and share knowledge</li>
                    </ul>
                </div>
            </div>

            <div className="auth-wrap__item container">
                <Login
                    loading={loading}
                    logIn={logIn}
                />

                <div className="auth-register">
                    <p>
                        <Icon type="api"/>
                    </p>
                    <h3>
                        <br/> Share ideas, get connected <br/> and socialize
                    </h3>
                    <Button onClick={toggleModal}>
                        Register
                    </Button>
                </div>
            </div>

            <Modal
                footer={null}
                title="Register"
                visible={modal.isVisible}
                okText="Register"
                // onOk={this.handleOk}
                onCancel={toggleModal}
            >
                <Register
                    loading={loading}
                    logIn={logIn}
                />
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.auth.loading,
        errorMessage: state.auth.errorMessage
    }
};


export default connect(mapStateToProps, {logIn})(Auth);