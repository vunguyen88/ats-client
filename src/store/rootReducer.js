import { combineReducers } from 'redux';
import employeesReducer from '../Pages/Employees/state/EmployeesReducers';
import userReducer from '../Pages/Landing/state/UserReducers';
import jobListingReducer from '../Pages/Landing/state/JobListingReducers';

const rootReducer = combineReducers({
    employees: employeesReducer,
    user: userReducer,
    jobListings: jobListingReducer,
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
