import {Component} from "react";
import React from "react";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/forms/loginForm";

class App extends Component {
    render() {
        return(
            <React.Fragment>

                <ToastContainer />

                <main className={"container"}>

                    <LoginForm />

                </main>

            </React.Fragment>
        );
    }
}

export default App;