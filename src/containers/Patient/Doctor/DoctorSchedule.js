import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeDeader from '../../HomePage/HomeDeader';
import './DoctorSchedule.scss'
import Select from 'react-select';
import moment from 'moment';
import { LANGUAGES } from '../../../utils'
import localization from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {


    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }



    async componentDidMount() {
        let { language } = this.props
        let allDays = this.getArrDays(language)
        if (this.props.doctorIdFromParent) {
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)

            console.log(' allAvalableTime: res.data ? res.data : [] 1', res);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
        }
        if (allDays && allDays.length > 0) {
            this.setState({
                allDays: allDays,
            })
        }
    }


    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).add(i, 'days').format('DD/MM')
                    let today = `Hôm nay - ${ddMM} `
                    object.label = today
                }
                else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).add(i, 'days').format('DD/MM')
                    let today = `Today - ${ddMM} `
                    object.label = today
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('days').valueOf()

            allDays.push(object)
        }
        return allDays
    }




    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })

        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            // if (res && res.errCode === 0) {
            //     let res = res.data
            //     if (res && data.length > 0) {
            //         data.map((item, index) => {
            //             item.timeTypeData === null ? delete item.timeTypeData : item.timeTypeData
            //         })
            //         return item
            //     }
            // }

            console.log(' allAvalableTime: res.data ? res.data : [] 2', res);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
        }

    }

    handleOnChangeSelected = async (event) => {

        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log(' allAvalableTime: res.data ? res.data : []3', res);
            // for (var propName in res) {
            //     if (res[propName] === null) {
            //         delete res[propName];
            //         return res
            //     }
            // }
            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
        }

    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    closeBookingClose = () => {
        this.setState({
            isOpenModalBooking: false
        })
    };


    render() {

        let { allDays, allAvalableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state
        console.log('allAvalableTime', allAvalableTime);
        let { language } = this.props


        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelected(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {

                                return (
                                    <option key={index} value={item.value}>{item.label}</option>

                                )
                            })}
                        </select>

                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>

                            <i className='fas fa-calendar-alt'></i>
                            <span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>


                        </div>
                        <div className='time-container'>
                            {allAvalableTime && allAvalableTime.length > 0 ?
                                <>
                                    <div className='time-container-btns'>
                                        {allAvalableTime.map((item, index) => {
                                            // let timeDisplay = Object.fromEntries(Object.entries(item).filter(([timeTypeData, v]) => v != null));
                                            // let timeDisplay1 = item.timeTypeData.valueVi
                                            // let timeDisplay2 = item.timeTypeData.valueEn

                                            let timeDisplay = language === LANGUAGES.VI ?
                                                item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            // let timeDisplay = language === LANGUAGES.VI ? timeDisplay1 : timeDisplay2
                                            // let timeDisplay = item.timeTypeData
                                            // let timeDisplay = item.timeTypeData ? item.timeTypeData.valueEn : item.timeTypeData
                                            return (
                                                <button key={index}
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                    className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                // onClick={() => this.handleClickScheduleTime(item)}
                                                // className='btn-vi'
                                                >
                                                    {timeDisplay}

                                                </button>
                                            )
                                        })}
                                    </div>

                                    <div className='book-free'>
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />

                                            <i className='far fa-hand-point-up'></i>
                                            <FormattedMessage id="patient.detail-doctor.and-book" />
                                        </span>
                                    </div>
                                </>
                                : <div className='no-schedule'>
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            }
                        </div>

                    </div>

                </div>
                <BookingModal
                    isOpenModalBooking={isOpenModalBooking}
                    closeBookingClose={this.closeBookingClose}
                    dataTime={dataScheduleTimeModal}
                />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
