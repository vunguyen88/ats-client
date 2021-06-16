const candidateDetailsReducers = (state = [], action) => {

    switch(action.type) {
        case `GET_CANDIDATE_WITH_ID_SUCCESS`: {
            return {...action.payload, isLoading: false, error: false}
        }

        default:
            return state
    }
}

export default candidateDetailsReducers;