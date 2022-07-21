import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeDeader from '../../HomePage/HomeDeader';
import './DoctorExtralnInfro.scss'
import { FormattedMessage } from 'react-intl';
import { getExtraInforDoctorById } from '../../../services/userService'
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils';



class DoctorExtralnInfro extends Component {


    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }




    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

        }
    }


    showHaiDetailInFor = (status) => {
        this.setState({
            isShowDetailInfor: status

        })
    }



    render() {
        let { isShowDetailInfor, extraInfor } = this.state
        let { language } = this.props
        // console.log('check state doctorExtraInfor', this.state);

        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id="patient.extra-infor-doctor.address-of-examination" />
                    </div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ?
                            extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-doctor'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='examination-price'>
                            <FormattedMessage id="patient.extra-infor-doctor.examination-price" />

                            {
                                extraInfor && extraInfor.priceIdData && language === LANGUAGES.VI
                                &&
                                <NumberFormat value={extraInfor.priceIdData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true} suffix={' VND'}
                                    className='currency'
                                />
                            }
                            {
                                extraInfor && extraInfor.priceIdData && language === LANGUAGES.EN
                                &&
                                <NumberFormat value={extraInfor.priceIdData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true} suffix={' $'}
                                    className='currency'
                                />
                            }
                            <span onClick={() => this.showHaiDetailInFor(true)}>
                                <span className='See-details'>
                                    <FormattedMessage id="patient.extra-infor-doctor.see-details" />
                                </span>
                            </span>
                        </div>
                    }
                    {
                        isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>
                                <FormattedMessage id="patient.extra-infor-doctor.examination-price" />
                            </div>
                            <div className='detail-infor'>
                                <span className='left'>
                                    <FormattedMessage id="patient.extra-infor-doctor.examination-price" />

                                </span>
                                <span className='right'>
                                    {
                                        extraInfor && extraInfor.priceIdData && language === LANGUAGES.VI
                                        &&
                                        <NumberFormat value={extraInfor.priceIdData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true} suffix={' VND'}
                                            className='currency'
                                        />
                                    }
                                    {
                                        extraInfor && extraInfor.priceIdData && language === LANGUAGES.EN
                                        &&
                                        <NumberFormat value={extraInfor.priceIdData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true} suffix={' $'}
                                            className='currency'
                                        />
                                    }
                                    {/* {extraInfor && extraInfor.priceIdData ? extraInfor.priceIdData : ''} */}

                                </span>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}

                                </div>
                            </div>
                            <div className='payment'>
                                <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                {extraInfor && extraInfor.paymentIdData && language === LANGUAGES.VI ? extraInfor.paymentIdData.valueVi : ''}
                                {extraInfor && extraInfor.paymentIdData && language === LANGUAGES.EN ? extraInfor.paymentIdData.valueEn : ''}
                            </div>
                            <div className='hide-price' onClick={() => this.showHaiDetailInFor(false)}>
                                <span onClick={() => this.showHaiDetailInFor(false)}>
                                    <FormattedMessage id="patient.extra-infor-doctor.hide-price-list" />
                                </span>
                            </div>
                        </>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtralnInfro);
