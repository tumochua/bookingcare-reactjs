import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';




class About extends Component {



    render() {


        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    NGUYỄN VĂN TÚ
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400" src="https://www.youtube.com/embed/30KI5SuECuc?list=RD30KI5SuECuc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                    </div>

                    <div className='content-right'>
                        Được thực hiện bởi / Video made by
                        Sáng tác / Composer: Sơn Tùng M-TP
                        Đạo diễn / Director: Nguyễn Quang Huy
                        Hoạ sĩ thiết kế / Production designer: Ngô Phước Trường
                        Giám đốc hình ảnh / D.O.P. : Đức Bi
                        Hoà âm hậu kì / Sound Re-recording Mixer: Long Halo
                        Sản xuất / Producer: Tiên Crala

                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
