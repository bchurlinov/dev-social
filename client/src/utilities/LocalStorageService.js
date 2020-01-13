import axios from "axios";

export const setToken = (token) => {
    localStorage.setItem("token", token);
};

export const getAccessToken = () => {
    return localStorage.getItem("token");
};

export const clearToken = () => {
    localStorage.removeItem("token");
};

export const requestInterceptor = () => {
    return (
        axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem("token");

                if (token) {
                    config.headers['x-auth-token'] = `${token}`;
                } else {
                    delete config.headers.common["Authorization"]
                }

                config.headers['Content-Type'] = 'application/json';

                return config;
            },
            error => {
                Promise.reject(error)
            })
    )
};




