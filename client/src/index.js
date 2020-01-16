import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect, withRouter} from "react-router-dom";

import App from './App';
import Auth from "./components/authentication/Auth";
import PrivateRoute from "./utilities/PrivateRoute";
import NotFound from "./NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import Developers from "./components/developers/Developers";
import Posts from "./components/posts/Posts";
import PostDetails from "./components/posts/PostDetails";
import CreateProfile from "./components/profiles/CreateProfile";
import Profile from "./components/profiles/Profile";
import Navbar from "./components/navbar/Navbar";

import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider, connect} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./store/reducers";

import {autoLoginUser} from "./store/actions/authActions";

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

class Root extends Component {

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token) {
            this.props.autoLoginUser();
        }
    }

    render() {
        return (
            <>
                <Navbar/>
                <Switch>
                    <Route exact path="/auth" component={Auth}/>
                    <PrivateRoute exact path="/" component={App}/>
                    <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                    <PrivateRoute exact path="/developers" component={Developers}/>
                    <PrivateRoute exact path="/posts" component={Posts}/>
                    <PrivateRoute exact path="/posts/:id" component={PostDetails}/>
                    <PrivateRoute exact path="/profile/:id" component={Profile}/>
                    <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                    <PrivateRoute component={NotFound}/>
                </Switch>
            </>
        )
    }
}

const RootWithStore = withRouter(connect(null, {autoLoginUser})(Root));


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <RootWithStore/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
