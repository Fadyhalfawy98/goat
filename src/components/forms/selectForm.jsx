import React from "react";

const SelectForm = ({ id, label, options, error, ...rest }) => {
    return(
        <div className="form-group">
            <label className="form-choose-label"
                   htmlFor={ id }>{label}</label>

            <select className="custom-select" name={id} id={id} {...rest} required>
                <option value="" />
                {options.map(option => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div
                className="alert alert-danger"
                role="alert">
                {error}
            </div>
            }
        </div>
    );
}

export default SelectForm;