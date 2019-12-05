import React from 'react';
import Link from 'next/link';
import LoginModal from './LoginModal';
import {connect} from "react-redux";
import * as actions from '../../actions/main';
import {setUser} from '../../actions/user';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Button, NavItem,
    UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from 'reactstrap';


import {bindActionCreators} from 'redux';
import Auth from "../../services/auth";


class Header extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    openModalLogin = () => {
        this.props.setModalLogin(true);
    };

    logout = () => {
        this.props.setUser(false);
        Auth.logout();
    };


    render() {
        
        const {user} = this.props;

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <Link href="/">
                        <NavbarBrand>next.js</NavbarBrand>
                    </Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link href="/"><a className="nav-link">Home</a></Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/news"><a className="nav-link">News</a></Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/about"><a className="nav-link">About</a></Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/protected"><a className="nav-link">Protected</a></Link>
                            </NavItem>

                            {!user && <NavItem>
                                <Button color="primary" onClick={this.openModalLogin}>Login</Button>
                            </NavItem>}

                            {user && <NavItem>
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle caret>
                                        Dropdown
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem header>{user.username}</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.logout}>Logout</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </NavItem>}
                        </Nav>
                    </Collapse>
                </Navbar>
                {!user && <LoginModal className="modal-sm" /> }
            </div>
        )
    }
}


export default connect( store => ({
        modalLogin: store.base.modalLogin,
        user: store.user.user
    }),
    dispatch => ({
        ...bindActionCreators({
            ...actions,
            setUser
        }, dispatch)
    })
)(Header);
