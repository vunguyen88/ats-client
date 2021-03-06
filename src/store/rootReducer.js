import { combineReducers } from 'redux';
import employeesReducer from '../Pages/Employees/EmployeeListPage/state/EmployeesReducers';
import userReducer from '../Pages/Landing/state/UserReducers';
import jobListingReducer from '../Pages/Landing/state/JobListingReducers';
import jobsReducer from '../Pages/JobsOpening/JobListPage/state/JobReducers';
import jobDetailsReducer from '../Pages/JobsOpening/JobDetailPage/state/JobDetailsReducers'; 
import candidatesReducer from '../Pages/Candidates/CandidateListPage/state/CandidateReducers';
import candidateDetailsReducer from '../Pages/Candidates/CandidateDetailPage/state/CandidateDetailsReducers';
import applyJobReducer from '../Pages/Landing/state/ApplyJobReducers';

const rootReducer = combineReducers({
    employees: employeesReducer,
    user: userReducer,
    jobListings: jobListingReducer,
    jobs: jobsReducer,
    jobDetails: jobDetailsReducer,
    candidates: candidatesReducer,
    candidateDetails: candidateDetailsReducer,
    applyJob: applyJobReducer,
    // appTickets: appTicketReducer,
    // users: loginReducer,
    // updatedUsers: registerReducer,
    // auth: authReducer,
    // cart: cartReducer,
    // navbar: navbarReducer,
    // payment: paymentReducer,
    // timer: timerReducer,
    // filterTickets: filterTicketReducer,
})

export default rootReducer;
