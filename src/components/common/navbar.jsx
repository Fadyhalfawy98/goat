import {NavLink} from "react-router-dom";
import Link from "react-router-dom/Link";
import React from "react";

const NavBar = ({ user }) => {
    const url = "https://thumbs.dreamstime.com/z/vector-goat-head-design-white-background-wild-animals-vector-goat-head-design-white-background-wild-animals-101979508.jpg";

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
                <img
                    src={url}
                    width="75"
                    height="75"
                    className="d-inline-block align-top mr-3"
                    alt="No Image Found"/>
            </Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/home">
                        Home
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/products">
                        Products
                    </NavLink>
                    <NavLink className="nav-item nav-link" to="/audit">
                        Audit
                    </NavLink>
                </div>
            </div>

            <div className="navbar-nav">
                { user && (
                    <React.Fragment>
                        <NavLink className="nav-item nav-link" to="/profile">
                            { user.name }
                        </NavLink>

                        <NavLink className="nav-item nav-link" to="/logout">
                            Logout
                        </NavLink>
                    </React.Fragment>
                )}

            </div>
        </nav>
    );
}

export default NavBar;