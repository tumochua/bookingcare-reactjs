import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss'
import { toast } from 'react-toastify';
import moment from 'moment';
import { CommonUtils } from '../../../utils';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'



class RemedyModal extends Component {


    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: ''

        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }


    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)

            this.setState({
                imgBase64: base64
            })
        }

    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }



    render() {

        let { isOpenModal, dataModal, closeRemedyModal, sendRemedy } = this.props

        return (
            <Modal
                size='md'
                centered
                isOpen={isOpenModal} className={'booking-modal-container'}>

                <div className="modal-header">
                    <h5 className="modal-title"> Gửi hóa đơn khám bệnh thành công
                    </h5>
                    <button type="button" className="btn-close" aria-label="Close"
                        onClick={closeRemedyModal}
                    >
                        <span aria-hidden="true">x</span>
                    </button>
                </div>


                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email bệnh nhân</label>
                            <input className='form-control' type='email' value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn file đơn thuốc</label>
                            <input type='file' className='form-control-file'
                                onChange={(event) => this.handleOnchangeImage(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => this.handleSendRemedy()}
                    >
                        Send
                    </Button>
                    {' '}
                    <Button onClick={closeRemedyModal}>
                        Cancel
                    </Button>
                </ModalFooter>

            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,



    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
