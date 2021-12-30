import React from "react";
import {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/forms/loginForm";
import SignupForm from "./components/forms/signupForm";
import NotFoundForm from "./components/forms/notFoundForm";

class App extends Component {
    render() {
        return(
            <React.Fragment>

                <ToastContainer />

                <main className={"container"}>

                    <Switch>
                        <Route path={"/login"} component={LoginForm} />
                        <Route path={"/signup"} component={SignupForm} />
                        <Route path={"/notfound"} component={NotFoundForm} />
                        <Redirect from={"/"} exact to={"/login"} />
                        <Redirect to={"/notfound"} />
                    </Switch>

                </main>

            </React.Fragment>
        );
    }
}

export default App;