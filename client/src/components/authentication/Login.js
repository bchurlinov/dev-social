import React, {useState} from 'react';
import {Button, Input, message} from "antd";
import "./Auth.scss";

const Login = ({logIn, loading}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
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

        if(formValid()) {
            logIn(inputs);
        }
    };

    const errorMessage = msg => {
        message.error(msg);
    };

    const formValid = () => {
        let error = "";
        let errors = [];

        if(!emailValid()) {
            error = "Enter a valid e-mail address";

            setErrors({
                ...errors,
                messages: errors.concat(error)
            });

            errorMessage(error);

            return false
        } else if(!passwordValid()) {
           error = "Password should contain at least 6 characters";

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

    const emailValid = () => {
        return !!inputs.email.match(/\S+@\S+\.\S+/);
    };

    const passwordValid = () => {
        return !(!inputs.password.length || inputs.password.length < 6);
    };

    const checkInputErrors = keyword => {
        return  errors.messages.some(err => err.toLowerCase().includes(keyword)) ? "input-error" : "";
    };


    return (
        <div className="login-group">
            <form onSubmit={submitHandler} className="login-form" noValidate>
                <div>
                    <label>Enter your e-mail</label>
                    <Input
                        type="email"
                        name="email"
                        className={checkInputErrors("e-mail")}
                        onChange={inputHandler}
                    />
                </div>

                <div>
                    <label>Enter your password</label>
                    <Input
                        type="password"
                        name="password"
                        className={checkInputErrors("password")}
                        onChange={inputHandler}
                    />
                </div>

                <div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={loading}
                    >
                        Log in</Button>
                </div>
            </form>
        </div>
    );
};

export default Login;