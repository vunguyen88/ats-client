import { combineReducers } from 'redux';
import employeesReducer from '../Pages/Employees/state/EmployeesReducers';
import userReducer from '../Pages/Landing/state/UserReducers';
import jobListingReducer from '../Pages/Landing/state/JobListingReducers';
import jobsReducer from '../Pages/JobsOpening/state/JobReducers';
import candidatesReducer from '../Pages/Candidates/state/CandidateReducers';

const rootReducer = combineReducers({
    employees: employeesReducer,
    user: userReducer,
    jobListings: jobListingReducer,
    jobs: jobsReducer,
    candidates: candidatesReducer,
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
