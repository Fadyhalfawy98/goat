import React from "react";
import {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import NavBar from "./components/common/navbar";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/common/logout";
import LoginForm from "./components/forms/loginForm";
import SignupForm from "./components/forms/signupForm";
import NotFoundForm from "./components/forms/notFoundForm";
import Audit from "./components/forms/audit";
import Products from "./components/forms/tableForm/products";
import ProductForm from "./components/forms/productForm";

class App extends Component {
    state = {}

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ user });
    }

    render() {
        const { user } = this.state;

        return(
            <React.Fragment>

                <ToastContainer />

                <NavBar user={user}/>

                <main className={"container"}>

                    <Switch>
                        <Route path={"/login"} component={LoginForm} />
                        <Route path={"/signup"} component={SignupForm} />
                        <ProtectedRoute path={"/products/:id"} component={ProductForm} />
                        <ProtectedRoute path={"/products"} component={Products} />
                        <ProtectedRoute path={"/audit"} component={Audit} />
                        <Route path={"/logout"} component={Logout} />
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