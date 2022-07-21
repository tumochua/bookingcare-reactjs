import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap'
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';



class BookingModal extends Component {


    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            brithday: '',
            selectedGenders: '',
            genders: '',
            doctorId: '',
            timeType: '',
            ishowModalLoading: false
        }
    }

    async componentDidMount() {
        this.props.getGenders()
    }

    buildDataGender = (data) => {
        let result = []
        let language = this.props.language
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.KeyMap
                result.push(object)
            })
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnchangeInput = (event, id) => {
        let stateCoppy = { ...this.state }
        stateCoppy[id] = event.target.value
        this.setState({
            ...stateCoppy
        })
    }


    handleOnChangeDatePicker = (date) => {
        this.setState({
            brithday: date[0]
        })
    }

    handleChanSelect = (selectedOption) => {
        this.setState({
            selectedGenders: selectedOption
        })
    }

    buildTiemBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let tiem = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(+dataTime.date / 1000).locale('en').format(' ddd - MM/DD/YYYY')
            return `${tiem}  - ${date}`

        }
        return ''
    }

    handlConfirmBooking = async () => {
        this.setState({
            ishowModalLoading: true
        })
        let doctorName = this.buiDoctorName(this.props.dataTime)
        let date = new Date(this.state.brithday).getTime()
        let timeSing = this.buildTiemBooking(this.props.dataTime)
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            brithday: date,
            selectedGenders: this.state.selectedGenders.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeSing: timeSing,
            doctorName: doctorName,

        })
        this.setState({
            ishowModalLoading: false
        })

        if (res && res.errCode === 0) {

            toast.success('Booking a new appointment succeed!')
            this.props.closeBookingClose(
                this.setState({
                    fullName: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                    reason: '',
                    brithday: '',
                    selectedGenders: '',
                    genders: '',
                    doctorId: '',
                    timeType: ''
                })
            )
        } else {
            toast.error('Booking a new appointment error!')
        }
    }

    buiDoctorName = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name

        }
        return ''
    }

    render() {

        let { isOpenModalBooking } = this.props
        let { closeBookingClose, dataTime } = this.props
        let doctorId = ''
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        let { ishowModalLoading } = this.state
        return (
            // toggle={ }
            <>

                <LoadingOverlay
                    active={this.state.ishowModalLoading}
                    spinner
                    text='Loading your content...'
                >
                    <Modal
                        size='lg'
                        centered
                        isOpen={isOpenModalBooking} className={'booking-modal-container'}>
                        <div className='booking-modal-container'>

                            <div className='booking-modal-header'>
                                <span className='left'>
                                    <FormattedMessage id="patient.booking-modal.title" />
                                </span>
                                <span className='right'>
                                    <i onClick={closeBookingClose}
                                        className='fas fa-times'></i>
                                </span>
                            </div>
                            <div className='booking-modal-body'>
                                {/* {JSON.stringify(dataTime)} */}
                                <div className='doctor-infor'>
                                    <ProfileDoctor
                                        doctorId={doctorId}
                                        inShowDescriptionDoctor={false}
                                        dataTime={dataTime}
                                        isShowLinkDetail={false}
                                        isShowPrice={true}
                                    />
                                </div>
                                {/* <div className='price'>
                            Giá Khám 500.000 VND
                        </div> */}

                                <div className='row'>
                                    <div className='col-6 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.fullname" />
                                        </label>
                                        <input className=' form-control'
                                            value={this.state.fullName}
                                            onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.phonenumber" />
                                        </label>
                                        <input className=' form-control'
                                            value={this.state.phoneNumber}
                                            onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.email" />
                                        </label>
                                        <input className=' form-control'
                                            value={this.state.email}
                                            onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.address" />
                                        </label>
                                        <input className=' form-control'
                                            value={this.state.address}
                                            onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                        />
                                    </div>
                                    <div className='col-12 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.reason" />
                                        </label>
                                        <input className=' form-control'
                                            value={this.state.reason}
                                            onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.gender-booking-modal" />
                                        </label>
                                        <Select
                                            value={this.state.selectedGenders}
                                            onChange={this.handleChanSelect}
                                            options={this.state.genders}
                                        />

                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>
                                            <FormattedMessage id="patient.booking-modal.brithday" />
                                        </label>
                                        <DatePicker onChange={this.handleOnChangeDatePicker}
                                            className='form-control'
                                            value={this.state.brithday}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className='booking-modal-footer'>
                                <button className='btn-booking-confirm'
                                    onClick={() => this.handlConfirmBooking()}
                                >
                                    <FormattedMessage id="patient.booking-modal.ok" />
                                </button>
                                <button className='btn-booking-cancel'
                                    onClick={closeBookingClose}
                                >
                                    <FormattedMessage id="patient.booking-modal.cancel" />
                                </button>

                            </div>
                        </div>

                    </Modal>
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
