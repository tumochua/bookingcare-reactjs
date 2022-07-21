import React, { Component } from "react";
import { connect } from "react-redux";
// import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from "react-intl";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeDeader from "../HomePage/HomeDeader";
import "./verifyEmail.scss";

class verifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      console.log("check res verify:", res);
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { statusVerify, errCode } = this.state;

    return (
      <>
        <HomeDeader />
        {statusVerify === false ? (
          <div>Loading data ....</div>
        ) : (
          <div>
            {+errCode === 0 ? (
              <div className="title">Xác nhận lịch hẹn thành công</div>
            ) : (
              <div className="title">
                Lịch hẹn không tồn tại hoặc đã xác nhận
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);
