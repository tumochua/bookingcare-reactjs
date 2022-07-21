import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeDeader.scss'
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions'
import { withRouter } from 'react-router'



class HomeDeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        console.log('check this.props', language);
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    render() {
        let language = this.props.language

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars header-icon"></i>
                            <div className='header-logo' onClick={() => this.returnToHome()}></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.speciality" /></b></div>
                                <div><FormattedMessage id='homeheader.searchdoctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.health-facility' /></b></div>
                                <div><FormattedMessage id='homeheader.select-room' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.doctor' /></b></div>
                                <div><FormattedMessage id='homeheader.select-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.fee' /></b></div>
                                <div><FormattedMessage id='homeheader.check-health' /> </div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className='fas fa-question-circle'></i>
                                <FormattedMessage id='homeheader.support' />
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span className='a' onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>
                                <FormattedMessage id='banner.title1' />
                            </div>
                            <div className='title2'>
                                <FormattedMessage id='banner.title2' />
                            </div>
                            <div className='search'>
                                <i className='fas fa-search home-deader-search-icon'></i>
                                <input type='text' placeholder='Tìm phòng khám' />
                            </div>
                        </div>

                        <div className='content-down'>
                            <div className='options'>
                                <div className='options-child'>
                                    <div className='icon-child'>
                                        <i className='far fa-hospital'></i>
                                        <div className='text-child'>
                                            <FormattedMessage id='banner.child1' />
                                        </div>
                                    </div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-mobile-alt"></i>
                                        <div className='text-child'>
                                            <FormattedMessage id='banner.child2' />
                                        </div>
                                    </div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-procedures"></i>
                                        <div className='text-child'>
                                            <FormattedMessage id='banner.child3' />
                                        </div>
                                    </div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-vial"></i>
                                        <div className='text-child'>
                                            <FormattedMessage id='banner.child4' />
                                        </div>
                                    </div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-vial"></i>
                                        <div className='text-child'>
                                            <FormattedMessage id='banner.child5' />
                                        </div>
                                    </div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'>
                                        <i className="fas fa-procedures"></i>
                                        <div className='text-child'>
                                            <FormattedMessage id='banner.child6' />
                                        </div>
                                    </div>
                                </div>




                            </div>

                        </div>

                    </div>
                }


            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeDeader));
