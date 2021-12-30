import React from "react";
import Joi from "joi-browser";
import MainForm from "./mainForm";
import auth from "../../services/authService";
import {signUp} from "../../services/addUser";

class SignupForm extends MainForm {
    state = {
        data: {
            email: "",
            name: "",
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

        name: Joi
            .string()
            .required()
            .min(3)
            .label('Name'),

        password: Joi
            .string()
            .required()
            .min(5)
            .label('Password')
    };

    render() {
        const { history } = this.props;

        return(
            <React.Fragment>

                <h1>Sign Up here!</h1>

                <form>
                    { this.renderInputForm("email", "Email", "Email@") }
                    { this.renderInputForm("name", "Name", "Nick-Name") }
                    { this.renderInputForm("password", "Password", "Password", "Password") }

                    { this.renderButton("btn-outline-success", "Signup", this.handleSubmit, this.validate()) }
                    { this.renderButton("btn-outline-danger", "Back", () => this.handleButtonCLick(history, "/login", "Back"), false) }
                </form>

            </React.Fragment>

        );
    };

     doSubmit = async () => {
        const { data: user, errors } = this.state;
        const { history } = this.props;

      try {
          const jwt = await signUp(user);
          auth.loginWithJwt(jwt.headers["x-auth-token"]);
          history.replace("/login");
      }
      catch (e) {
          if (e.response && e.response.status === 400) {
              const error = { ...errors };
              error.email = e.response.data;
              this.setState({ errors: error});
          }
      }
    };
}

export default SignupForm;