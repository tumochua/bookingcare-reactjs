import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeDeader from '../../HomePage/HomeDeader';
import './DetailDoctor.scss'
import { getDetailInforDoctor } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtralnInfro from './DoctorExtralnInfro';
import LikeAndShare from '../SociaPlugin/LikeAndShare';
import Comment from '../SociaPlugin/Comment';

class DetailDoctor extends Component {


    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id)
            if (res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }

        }

    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { detailDoctor } = this.state
        let { language } = this.props
        // console.log('check state detailDoctor', this.state);
        let nameVi = '', nameEn = ''
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }

        let currentURL = +process.REACT_APP_FACEBOOK_APP_ID === 1 ?
            "https://eric-restaurant-bot-tv.herokuapp.com/" : window.location.href


        return (
            <>
                <HomeDeader isShowBanner={false} />


                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left' style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>

                        </div>
                        <div className='content-right'>
                            <h4 className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </h4>
                            <div className='down'>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>

                                }
                                <div className='like-share-plugin'>
                                    <LikeAndShare
                                        dataHref={currentURL}
                                    />

                                </div>


                            </div>

                        </div>

                    </div>
                    <div className='sechdule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorExtralnInfro
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>

                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>

                            </div>
                        }

                    </div>
                    <div className='comment-doctor'>
                        <Comment
                            dataHref={currentURL}
                            width={"100%"}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
