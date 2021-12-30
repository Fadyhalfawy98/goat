import React, {Component} from "react";
import Joi from "joi-browser";
import InputForm from "./inputForm";
import HandleButtonTransfer from "../../helperFunctions/handleButtonTransfer";

class MainForm extends Component {
    state = {
      data: {},
      errors: {}
    };

    validate() {
        const { data } = this.state;
        const options = { abortEarly: false };
        const { error } = Joi.validate(data, this.schema, options);

        if (!error) return null;

        const errors = {};

        for (let item of error.details) errors[ item.path[0] ] = item.message;

        return errors;
    };

    validateProperty = ({ name, value }) => {
      const obj = { [name]: value };
      const schema = { [name]: this.schema[name] };
      const { error } = Joi.validate(obj, schema);

      return error ? error.details[0].message : null;
    };

    handleChange = ({ currentTarget: target }) => {
      const { data, errors } = this.state;
      const getErrors = { ...errors };
      const error = this.validateProperty(target);

      if (error) getErrors[target.name] = error;
      else delete getErrors[target.name];

      const getData = { ...data };
      getData[target.name] = target.value;
      this.setState({ data: getData, errors: getErrors });
    };

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    handleButtonCLick = (history, path, label) => {
        if (path === "/movies") {
            const errors = this.validate();
            this.setState({errors: errors || {}});
            if (errors) return;
        }

        HandleButtonTransfer(history, path, label);
    };

    renderInputForm(name, label, placeHolder, type="text") {
        const { data, errors } = this.state;

        return(
            <InputForm
                name={name}
                label={label}
                placeholder={placeHolder}
                type={type}
                value={data[name]}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    };

    renderButton(style, label, onClick, disabled) {
      return(
          <button
              className={"btn " + style + " btn-space"}
              disabled={disabled}
              onClick={onClick}
          >
              {label}
          </button>
      );
    };

}

export default MainForm;