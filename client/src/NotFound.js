import React, {useEffect, useState} from 'react';
import {Icon, Statistic} from "antd";

const {Countdown} = Statistic;

const NotFound = (props) => {

    useEffect(() => {

        setTimeout(() => {
            props.history.push("/")
        }, 5500);

    }, []);

    const [second, setSeconds] = useState({timer: 5});

    useEffect(() => {

        if(second.timer !== 0) {
            const counter = setInterval(() => {
                setSeconds({
                    ...second,
                    timer: second.timer - 1
                })
            }, 1000);

            return () => {
                clearInterval(counter);
            }
        }

    }, [second]);


    return (
        <div>
            <h1>
                <Icon type="exclamation-circle"/>
                The URL you are trying to reach does not exist
            </h1>
            <h3>You will be redirected in <span>{second.timer}</span></h3>
        </div>
    );
};

export default NotFound;