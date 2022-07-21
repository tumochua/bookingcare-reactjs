import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../..//utils/emitter'
import _ from 'lodash'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastname: '',
            address: ''

        }


    }

    componentDidMount() {
        let user = this.props.curentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastname: user.lastName,
                address: user.address,
            })
        }
        console.log('check didmount edit modal', user);
    }

    toggle = () => {
        this.props.toogleFromParent()

    }

    handleOnchageInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValideInput = () => {
        let isValid = true
        let arrInput = ['email',
            'password',
            'firstName',
            'lastname',
            'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('bạn nhập thiếu tham số bắt buộc : ' + arrInput[i])
                break;
            }
        }
        return isValid
    }

    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.editUser(this.state)
        }
    }



    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size='lg'
                className={'modal-user-container'}
            // centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    Modal title
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'
                                disabled
                                value={this.state.email}
                                onChange={(event) => this.handleOnchageInput(event, 'email')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                                disabled
                                value={this.state.password}
                                onChange={(event) => this.handleOnchageInput(event, 'password')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input type='text'
                                value={this.state.firstName}
                                onChange={(event) => this.handleOnchageInput(event, 'firstName')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text'
                                value={this.state.lastname}
                                onChange={(event) => this.handleOnchageInput(event, 'lastname')}
                            />
                        </div>
                        <div className='input-container col-12'>
                            <label>Address</label>
                            <input type='text'
                                value={this.state.address}
                                onChange={(event) => this.handleOnchageInput(event, 'address')}
                            />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => this.handleSaveUser()}
                    // onClick={() => { this.toggle() }}
                    >
                        Save changes
                    </Button>
                    {' '}
                    <Button onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
