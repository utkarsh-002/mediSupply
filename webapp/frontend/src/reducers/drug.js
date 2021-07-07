import { DRUG_ERROR, CLEAR_DRUG, GET_DRUG, ALL_DRUG } from "../actions/types"

const initialState = {
  drug: null,
  drugs : [],
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_DRUG:
      return {
        ...state,
        drug: payload,
        loading: false,
      }
    case DRUG_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case ALL_DRUG:
      return {
        ...state,
        drugs: payload,
        loading:false
      }
    case CLEAR_DRUG:
      return {
        ...state,
        drug: null,
        loading: true,
      }
    default:
      return state
  }
}