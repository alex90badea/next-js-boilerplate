import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, Row, Col
} from 'reactstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setModalLogin} from "../../actions/main";
import {setUser} from "../../actions/user";
import Http from '../../libs/http';
import Auth from "../../services/auth";

// Google Login
import Google from '../auth/SocialLogin/Google';
// Facebook Login
import Facebook from '../auth/SocialLogin/Facebook';

const initialHasError = {
    email: false,
    password: false,
    username: false,
    name: false,
    error: false
};

class LoginModal extends React.Component {

    /**
     * initial state
     */
    state = {
        email: 'admin@mail.com',
        password: '123abc',
        username: '',
        name: '',
        hasError: initialHasError,
        currentTab: 'login'
    };

    closeModalLogin = () => {
        this.props.setModalLogin(false);
    };

    switchTab = (currentTab) => _ => {
        this.setState({currentTab});
    };

    updateInputs = (e) => {
        const {value, name} = e.target;

        this.setState({
            [name]: value,
            hasError: {
                ...this.state.hasError,
                [name]: false
            }
        });

    };

    /**
     * Login user
     *
     * @returns {Promise<boolean>}
     */
    login = async () => {

        this.setState({
            hasError: initialHasError
        });

        let {email, password} = this.state;
        let response = await Http.post('login', {email, password});
        if (response.isError) {
            this.setState({
                hasError: {
                    ...this.state.hasError,
                    ...response.errorMessage
                }
            });
            return false;
        }

        //do login
        this._loginUserAndCloseModal(response.data);
    };

    /**
     * Register user
     *
     * @returns {Promise<boolean>}
     */
    register = async () => {

        this.setState({
            hasError: initialHasError
        });

        let response = await Http.post('register', {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
            name: this.state.name,
            phone: this.state.phone,
            registration_type: 2,
        });

        if (response.isError) {
            this.setState({
                hasError: {
                    ...this.state.hasError,
                    ...response.errorMessage
                }
            });
            return false;
        }

        //do login
        this._loginUserAndCloseModal(response.data);


    };

    /**
     * Forgot password
     *
     * @returns {Promise<boolean>}
     */
    forgot = async () => {

        this.setState({
            hasError: initialHasError
        });

        let response = await Http.post('forgot', {
            email: this.state.email,
        });

        if (response.isError) {
            this.setState({
                hasError: {
                    ...this.state.hasError,
                    ...response.errorMessage
                }
            });
            return false;
        }


    };

    /**
     * Social login
     *
     * @param userData
     */
    socialCallback = (userData) => {

        if (userData === false) {
            this.setState({
                hasError: {
                    ...this.state.hasError,
                    error: 'invalid_social_user_data'
                }
            });
        } else {

            //do login
            this._loginUserAndCloseModal(userData);
        }

    };

    _loginUserAndCloseModal = (res) => {

        const {user, jwt} = res;
        this.props.setUser(user, jwt);
        Auth.login(jwt);

        this.closeModalLogin();

    };

    render() {

        const {email, password, hasError, username, name, phone, currentTab} = this.state;

        return (
            <Modal isOpen={this.props.modalLogin} toggle={this.closeModalLogin} className={this.props.className}>
                <ModalHeader toggle={this.closeModalLogin}>
                    <span onClick={this.switchTab('login')}>Login</span> / <span
                    onClick={this.switchTab('register')}>Register</span>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm={6} className="p-0 text-center">
                            <Google socialCallback={this.socialCallback}/>
                        </Col>
                        <Col sm={6} className="p-0 text-center">
                            <Facebook socialCallback={this.socialCallback}/>
                        </Col>
                    </Row>
                    <br/>
                    <Form>

                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input {...(hasError.email && {invalid: true})} type="email" name="email" value={email}
                                   onChange={this.updateInputs} placeholder="email"/>
                            {hasError.email && <FormFeedback>{hasError.email}</FormFeedback>}
                        </FormGroup>

                        {currentTab !== 'forgot' && <FormGroup>
                            <Label for="password">Password</Label>
                            <Input {...(hasError.password && {invalid: true})} type="password" name="password"
                                   value={password} onChange={this.updateInputs} placeholder="password"/>
                            {hasError.password && <FormFeedback>{hasError.password}</FormFeedback>}
                        </FormGroup>}

                        {currentTab === 'register' && <React.Fragment>

                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input {...(hasError.username && {invalid: true})} type="text" name="username"
                                       value={username}
                                       onChange={this.updateInputs} placeholder="username"/>
                                {hasError.username && <FormFeedback>{hasError.username}</FormFeedback>}
                            </FormGroup>

                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input {...(hasError.name && {invalid: true})} type="text" name="name" value={name}
                                       onChange={this.updateInputs} placeholder="name"/>
                                {hasError.name && <FormFeedback>{hasError.name}</FormFeedback>}
                            </FormGroup>

                            <FormGroup>
                                <Label for="phone">Name</Label>
                                <Input {...(hasError.phone && {invalid: true})} type="text" phone="phone" value={phone}
                                       onChange={this.updateInputs} placeholder="phone"/>
                                {hasError.phone && <FormFeedback>{hasError.phone}</FormFeedback>}
                            </FormGroup>

                        </React.Fragment>}

                        <FormGroup>
                            {hasError.error && <div>{hasError.error}</div>}
                        </FormGroup>
                    </Form>

                </ModalBody>
                <ModalFooter>
                    <span onClick={this.switchTab('forgot')}>Forgot password</span>
                    {currentTab === 'login' && <Button color="primary" onClick={this.login}>Login</Button>}
                    {currentTab === 'register' && <Button color="primary" onClick={this.register}>Register</Button>}
                    {currentTab === 'forgot' && <Button color="primary" onClick={this.forgot}>Forgot</Button>}
                    <Button color="secondary" onClick={this.closeModalLogin}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

export default connect(store => ({
        modalLogin: store.base.modalLogin
    }),
    dispatch => ({
        ...bindActionCreators({
            setModalLogin,
            setUser
        }, dispatch)
    })
)(LoginModal);
