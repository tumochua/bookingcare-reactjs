import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import NumberFormat from 'react-number-format';
import _ from 'lodash'
import moment from 'moment';
import { Link } from 'react-router-dom';


class ProfileDoctor extends Component {


    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.language) {

        }
    }
    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let tiem = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(+dataTime.date / 1000).locale('en').format(' ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{tiem}  - {date}</div>
                    <div>
                        Miễn Phí Đặt Lịch
                        {/* <FormattedMessage id="patient.booking-modal.Free-Book-an-Appointment" /> */}
                    </div>
                </>
            )

        }
    }


    render() {
        // console.log('tumochua check state profile ', this.state);
        let { dataProfile } = this.state
        let { language, inShowDescriptionDoctor, dataTime, isShowLinkDetail,
            isShowPrice, doctorId } = this.props

        let nameVi = '', nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        // console.log('check dataProfile.Doctor_Infor.priceIdData.valueVi', dataProfile.Doctor_Infor.priceIdData.valueVi);
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left' style={{
                        backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`
                    }}>

                    </div>
                    <div className='content-right'>
                        <h4 className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                            {/* {nameVi} */}
                        </h4>
                        <div className='down'>
                            {
                                inShowDescriptionDoctor === true ?

                                    <>
                                        {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                            <span>
                                                {dataProfile.Markdown.description}
                                            </span>
                                        }
                                    </>
                                    : <>
                                        {this.renderTimeBooking(dataTime)}
                                    </>
                            }
                        </div>
                    </div>
                </div>
                {isShowLinkDetail === true &&
                    <div
                        className='profiledoctor-see-more'
                    >
                        <Link to={`/detail-doctor/${doctorId}`}>Xem Thêm</Link>
                    </div>
                }
                {isShowPrice === true &&
                    <div className='price'>
                        Giá Khám:
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI &&
                            <NumberFormat value={dataProfile.Doctor_Infor.priceIdData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true} suffix={' VND'}
                                className='currency'
                            />
                        }
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN &&
                            <NumberFormat value={dataProfile.Doctor_Infor.priceIdData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true} suffix={' $'}
                                className='currency'
                            />
                        }
                    </div>
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
