import React from "react";
import Joi from "joi-browser";
import Redirect from "react-router-dom/Redirect";
import MainForm from "./mainForm";
import auth from "../../services/authService";

class LoginForm extends MainForm {
    state = {
        data: {
            email: "",
            password: ""
        },

        errors: {}
    };

    schema = {
        email: Joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .label('Email'),

        password: Joi
            .string()
            .required()
            .label('Password')
    };

    render() {
        const { history } = this.props;
        const user = auth.getCurrentUser();

        if (user) return <Redirect to={"/products"} />;

        return(
            <React.Fragment>

                <h1>Login Form</h1>

                <form>
                    { this.renderInputForm("email", "Email", "Email@") }
                    { this.renderInputForm("password", "Password", "Password", "Password") }

                    { this.renderButton("btn-outline-success", "Login", this.handleSubmit, this.validate()) }
                    { this.renderButton("btn-outline-info", "Signup", () => this.handleButtonCLick(history, "/signup", "Signup"),false)}

                </form>
        </React.Fragment>
        );
    };

    doSubmit = async () => {
        const {data, errors} = this.state;
        const { location } = this.props;

        try {
            await auth.login(data.email, data.password);
            const {  state } = location;

            window.location = state ? state.from.pathname : "/products";
        }
        catch (e) {
            if (e.response && e.response.status === 400) {
                const error = { ...errors };
                error.email = e.response.data;
                this.setState({ errors: error });
            }

        }
    };
}

export default LoginForm;