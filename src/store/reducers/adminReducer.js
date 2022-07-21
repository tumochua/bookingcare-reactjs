import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state }
            copyState.isLoadingGender = true
            return {
                ...copyState,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            // console.log('tumochua it fire fetch gender success', action);
            state.genders = action.data
            state.isLoadingGender = false
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAIDED:
            state.isLoadingGender = false
            state.genders = []
            console.log('tumochua it fire fetch gender faided', action);
            return {
                ...state,

            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_FAIDED:
            state.positions = []
            return {
                ...state

            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_FAIDED:
            state.roles = []
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_FAIDED:
            state.users = []
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctor
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTORS_FAILDED:
            state.topDoctors = []
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTORS_FAILDED:
            state.allDoctors = []
            return {
                ...state
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime
            return {
                ...state
            }


        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED:
            state.allScheduleTime = []
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data
            return {
                ...state
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED:
            state.allRequiredDoctorInfor = []
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;