import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker'
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService'
import { LANGUAGES } from '../../../utils'
import RemedyModal from './RemedyModal';
import LoadingOverlay from 'react-loading-overlay';
import moment from 'moment'
import { toast } from 'react-toastify';

class ManagePatient extends Component {


    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('days').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            ishowLoading: false
        }
    }

    async componentDidMount() {
        this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
        // console.log('check value onchange', date);
    }

    handleBtnConfirm = (item) => {

        let data = {
            doctorId: item.doctorId,
            email: item.patientData.email,
            patientId: item.patientId,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
        console.log('tumochua check data ', data);
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state
        this.setState({
            ishowLoading: true
        })
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if (res && res.errCode === 0) {
            this.setState({
                ishowLoading: false
            })
            toast.success('xác nhuận lịch hẹn thành công')
            this.closeRemedyModal()
            await this.getDataPatient()
        } else {
            toast.error('xác nhuận lịch hẹn thất bại')

            console.log('tumochua res', res);
        }
    }



    render() {
        // console.log('tumochua check state', this.state);
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state
        let { language } = this.props
        return (
            <>

                <div className='manange-patient-container'>
                    <div className='m-p-title'>
                        Quản Lý Bệnh Nhân Khám Bệnh
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label>Chọn ngày Khám</label>
                            <DatePicker onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Họ và tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Actions</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0
                                        ? dataPatient.map((item, index) => {
                                            let time = language === LANGUAGES.VI ?
                                                item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                                            let gender = language === LANGUAGES.VI ?
                                                item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                            return (
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <th>{time}</th>
                                                    <th>{item.patientData.firstName}</th>
                                                    <th>{item.patientData.address}</th>
                                                    <th>{gender}</th>
                                                    <td>
                                                        <button className='mp-btn-confirm'
                                                            onClick={() => this.handleBtnConfirm(item)}
                                                        >Xác nhận</button>

                                                    </td>
                                                </tr>

                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan={'6'} style={{ textAlign: "center" }}>
                                                no data
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>

                        </div>


                    </div>

                </div>
                <RemedyModal
                    isOpenModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}
                />
                <LoadingOverlay
                    active={this.state.ishowLoading}
                    spinner
                    text='Loading your content...'
                >
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
