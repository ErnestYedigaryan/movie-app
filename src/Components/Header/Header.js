import React, { useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle, faSignOutAlt , faSignInAlt , faUserAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import ReactModalLogin from 'react-modal-login'
import SignIn from "../Login/SignIn";
import SignUp from "../Login/SignUp"

const styles = {
    Navbar: {
        backgroundColor: "#143D59",
    },
    colorW: {
        color: "white"
    },
    icon: {
        color: "#F4B41A"
    }
};

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function openModal() {
        setShowModal(true)
    }
       
    function closeModal() {
        setShowModal(false);
        setError(null)
    }
    
    function onLoginSuccess(method, response) {
        console.log("logged successfully with " + method);
    }
    
    function onLoginFail(method, response) {
        console.log("logging failed with " + method);
        setError(response)
    }
    
    function startLoading() {
        setLoading(true)
    }
    
    function finishLoading() {
        setLoading(false)
    }
    
    function afterTabsChange() {
        setError(null)
    }  

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar style={styles.Navbar} light expand="md">
                <NavbarBrand > <NavLink style={styles.colorW} to="/">KinoBase</NavLink> </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto mr-auto" navbar>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle style={styles.colorW} nav caret>
                                Movies
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <NavLink to="/search">Search</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink to="/collections">Collection</NavLink>
                                </DropdownItem>


                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <NavItem className="m-2">
                            <NavLink to="/cinema" style={styles.colorW}>Cinema</NavLink>
                        </NavItem>
                        <NavItem className="m-2">
                            <NavLink to="/about" style={styles.colorW}>About</NavLink>
                        </NavItem>
                    </Nav>

                    <NavLink to='/' ><FontAwesomeIcon icon={faUserCircle} style={styles.icon} size="2x" className="mr-3"/></NavLink>
                    <NavLink to="/SignUp"><FontAwesomeIcon icon={faUserPlus} style={styles.icon} size="2x" className="mr-3"/></NavLink>
                    <NavLink to="/SignIn"><FontAwesomeIcon icon={faSignInAlt} style={styles.icon} size="2x" className="mr-3"/></NavLink>
                    <NavLink to='' ><FontAwesomeIcon icon={faSignOutAlt} style={styles.icon} size="2x" className="mr-3"/></NavLink>
                    
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;