import MainForm from "./mainForm";
import Joi from "joi-browser";
import auth from "../../services/authService";
import React from "react";
import {date} from "joi";

class ProfileForm extends MainForm {
    state = {
        data: {
            email: "",
            name: ""
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
            .label('Name')
    };

    async componentDidMount() {
       await this.getUserProfile();
    }

    render() {
        return(
            <React.Fragment>
                <form>
                    { this.renderInputForm("email", "Email", "Email@") }
                    { this.renderInputForm("name", "Name", "User-Name") }

                    { this.renderButton("btn-outline-success", "Done", this.handleSubmit, this.validate()) }
                </form>

            </React.Fragment>
        );
    }

    async getUserProfile() {
        const user = await auth.getCurrentUser();
        this.setState({ data: this.mapToUserProfile(user) });
    };


    mapToUserProfile(user) {
        return{
            email: user.email,
            name: user.name,
        }
    };

    doSubmit = () => {
        const { history } = this.props;
        return history.push("/products");
    };
}
export default ProfileForm;