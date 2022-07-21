import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../..//utils/emitter'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            id: ''

        }

        this.listenToEmiter()

    }
    listenToEmiter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {

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
            'lastName',
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

    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.createNewUser(this.state, 'abc')
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
                                value={this.state.email}
                                onChange={(event) => this.handleOnchageInput(event, 'email')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
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
                                value={this.state.lastName}
                                onChange={(event) => this.handleOnchageInput(event, 'lastName')}
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
                        onClick={() => this.handleAddNewUser()}
                    // onClick={() => { this.toggle() }}
                    >
                        Save
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
