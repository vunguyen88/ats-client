import React, {useEffect, useContext, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import TopBar from './components/TopBar';
import DashboardPage from './Pages/Dashboard';
import EmployeesPage from './Pages/Employees/EmployeeListPage';
import NotificationPage from './Pages/Notification';
import EmployeeDetailPage from './Pages/Employees/EmployeeDetailPage';
import JobsOpeningPage from './Pages/JobsOpening/JobListPage';
import JobDetailsPage from './Pages/JobsOpening/JobDetailPage';
import AddJobPage from './Pages/JobsOpening/AddJobPage';
import CandidatesPage from './Pages/Candidates/CandidateListPage';
import CandidateDetailsPage from './Pages/Candidates/CandidateDetailPage';
import LandingPage from './Pages/Landing';
import TimeOffPage from './Pages/TimeOff';
import ProfilePage from './Pages/Profile';
import SettingsPage from './Pages/Settings';
import AboutPage from './Pages/About';
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Switch>
            {/* <Route exact path='/' component={LandingPage} /> */}
            <Route exact path="/" component={LandingPage} /> 
            <AuthRoute exact path="/app/dashboard" component={DashboardPage} />
            <AuthRoute exact path="/app/employees" component={EmployeesPage} />  
            <AuthRoute exact path="/app/employees/:id" component={EmployeeDetailPage} />  
            <AuthRoute exact path="/app/notification" component={NotificationPage} />  
            <AuthRoute exact path="/app/jobs" component={JobsOpeningPage} />
            <AuthRoute exact path="/app/jobs/:id" component={JobDetailsPage} /> 
            <AuthRoute exact path="/app/newjob" component={AddJobPage} />  
            <AuthRoute exact path="/app/candidates" component={CandidatesPage} />
            <AuthRoute exact path="/app/candidates/:id" component={CandidateDetailsPage} /> 
            <AuthRoute exact path="/app/timeoff" component={TimeOffPage} /> 
            <AuthRoute exact path="/app/profile" component={ProfilePage} /> 
            <AuthRoute exact path="/app/settings" component={SettingsPage} /> 
            <Route exact path="/signup" component={LandingPage} />
            <Route exact path="/signin" component={LandingPage} />
            <Route exact path="/about" component={AboutPage} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;
