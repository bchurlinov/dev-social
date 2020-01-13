import React, {useState} from 'react';
import {connect} from "react-redux";
import {Button, Input, message} from "antd";
import {registerUser} from "../../store/actions/authActions";
import "./Auth.scss";

const Register = ({loading, registerUser}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        name: ""
    });

    const [errors, setErrors] = useState({messages: []});

    const inputHandler = event => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    };

    const submitHandler = event => {
        event.preventDefault();

        if (formValid()) {
           registerUser(inputs);
        }
    };

    const errorMessage = msg => {
        message.error(msg);
    };

    const formValid = () => {
        let error = "";
        let errors = [];

        if(inputsEmpty()) {
            error = "Please fill all the fields";

            setErrors({
                ...errors,
                messages: errors.concat(error)
            });

            errorMessage(error);

            return false;

        }else if (!nameValid()) {
            error = "Name should be at least 2 characters long";

            setErrors({
                ...errors,
                messages: errors.concat(error)
            });

            errorMessage(error);

            return false;

        } else if (!emailValid()) {
            error = "Enter a valid e-mail address";

            setErrors({
                ...errors,
                messages: errors.concat(error)
            });

            errorMessage(error);

            return false

        } else if (!passwordValid()) {
            error = "Password should contain at least 6 characters";

            setErrors({
                ...errors,
                messages: errors.concat(error)
            });

            errorMessage(error);

            return false;

        } else if (!matchPassword()) {
            error = "Passwords do not match";

            setErrors({
                ...errors,
                messages: errors.concat(error)
            });

            errorMessage(error);

            return false;

        } else {
            return true;
        }
    };

    const nameValid = () => {
        return inputs.name.length > 2;
    };

    const emailValid = () => {
        return !!inputs.email.match(/\S+@\S+\.\S+/);
    };

    const passwordValid = () => {
        return !(!inputs.password.length || inputs.password.length < 6);
    };

    const matchPassword = () => {
        return inputs.password === inputs.passwordConfirm;
    };

    const inputsEmpty = () => {
        return (
            !inputs.name || !inputs.email || !inputs.password || !inputs.passwordConfirm
        )
    };

    const checkInputErrors = keyword => {
        return errors.messages.some(err => err.toLowerCase().includes(keyword)) ? "input-error" : "";
    };

    return (
        <div>
            <form onSubmit={submitHandler} className="register-form" noValidate>

                <div className="form-group">
                    <label>Enter your name</label>
                    <Input
                        type="text"
                        name="name"
                        className={checkInputErrors("name")}
                        onChange={inputHandler}
                    />
                </div>

                <div className="form-group">
                    <label>Enter your e-mail</label>
                    <Input
                        type="email"
                        name="email"
                        className={checkInputErrors("e-mail")}
                        onChange={inputHandler}
                    />
                </div>

                <div className="form-group">
                    <label>Enter your password</label>
                    <Input
                        type="password"
                        name="password"
                        className={checkInputErrors("password")}
                        onChange={inputHandler}
                    />
                </div>

                <div className="form-group">
                    <label>Confirm your password</label>
                    <Input
                        type="password"
                        name="passwordConfirm"
                        className={checkInputErrors("passwords")}
                        onChange={inputHandler}
                    />
                </div>

                <div className="form-group text-center" style={{marginBottom: 0}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={loading}
                    >
                        Register
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default connect(null, {registerUser})(Register);