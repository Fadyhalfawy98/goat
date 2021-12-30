import {NavLink} from "react-router-dom";
import Link from "react-router-dom/Link";
import React from "react";

const NavBar = ({ user }) => {

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">GOAT</Link>
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