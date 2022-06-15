import { VERIFY_PRESCRIPTION_SUCCESS , VERIFY_PRESCRIPTION_ERROR  } from "../actions/types"

const initialState = {
    prescriptionVerification : false,
    error: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case VERIFY_PRESCRIPTION_SUCCESS:
      return {
        ...state,
        prescriptionVerification : payload
      }
    case VERIFY_PRESCRIPTION_ERROR:
      return {
        ...state,
        error: payload,
        prescriptionVerification : false
      }
    default:
      return state
  }
}