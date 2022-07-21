import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            inShowPassword: false,
            errMessage: ''

        }
    }


    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }


    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        // console.log('username:', this.state.username, 'password:', this.state.password);
        // console.log('all state:', this.state);
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }

            if (data && data.errCode === 0) {
                this.props.usreLoginSuccess(data.user)
                console.log('login succeeds');
            }

        }
        catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })

                }

            }

            console.log('test', error.response);
        }
        // await handleLoginApi(this.state.username, this.state.password)

    }

    handleShowHidePassword = () => {
        this.setState({
            inShowPassword: !this.state.inShowPassword,

        })
    }

    handlerKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin()
        }

    }



    render() {


        return (
            <div className='login-backgroud'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input className='form-control'
                                type='text' placeholder='nhập tên'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />

                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input className='form-control'
                                    type={this.state.inShowPassword ? 'text' : 'password'} placeholder='nhập mật khẩu'
                                    onChange={(event) => { this.handleOnChangePassword(event) }}
                                    onKeyDown={(event) => this.handlerKeyDown(event)}
                                />
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.inShowPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
                                </span>
                            </div>

                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMessage}

                            </div>

                        </div>
                        <div className='col-12 ' >
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>

                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>

                        </div>
                        <div className='col-12'>
                            <span className='orlogin mt-3 ' >Or Login with</span>

                        </div>
                        <div className='col-12 social-login '>
                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f facebook'></i>

                        </div>
                    </div>

                </div>

            </div>

        )
    }
}






const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        usreLoginSuccess: (userInfo) => dispatch(actions.usreLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
