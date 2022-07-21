import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss'
import HomeDeader from '../../HomePage/HomeDeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtralnInfro from '../Doctor/DoctorExtralnInfro'
import ProfileDoctor from '../Doctor/ProfileDoctor'
import { getDetailClinicById, getAllcodeService } from '../../../services/userService'
import _ from 'lodash'
import { LANGUAGES } from '../../../utils';


class DetailClinic extends Component {


    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailClinicById({
                id: id,
            })
            if (res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }



    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { arrDoctorId, dataDetailClinic } = this.state
        let { language } = this.props
        console.log('check state detailspecialty', this.state);


        return (
            <>
                <HomeDeader />
                <div className='detail-specialty-container'>
                    <div className='detai-specialty-body'>

                        <div className='description-specialty'>
                            {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                                <>
                                    <div>
                                        {dataDetailClinic.name}
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHtml }}>

                                    </div>
                                </>

                            }
                        </div>
                        {arrDoctorId && arrDoctorId.length > 0
                            && arrDoctorId.map((item, index) => {
                                return (
                                    <div className='each-doctor' key={index}>
                                        <div className='dt-content-left'>
                                            <div className='profile-doctor'>
                                                <ProfileDoctor
                                                    doctorId={item}
                                                    inShowDescriptionDoctor={true}
                                                    isShowLinkDetail={true}
                                                    isShowPrice={false}
                                                />

                                            </div>
                                        </div>
                                        <div className='dt-content-right'>
                                            <div className='doctor-schedule'>
                                                <DoctorSchedule
                                                    doctorIdFromParent={item}
                                                />
                                            </div>
                                            <div className='doctor-extra-infor'>
                                                <DoctorExtralnInfro
                                                    doctorIdFromParent={item}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
