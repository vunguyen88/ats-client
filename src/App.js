import React, {useEffect, useContext, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import TopBar from './components/TopBar';
import EmployeesPage from './Pages/Employees';
import JobsOpeningPage from './Pages/JobsOpening';
import AddJobPage from './Pages/JobsOpening/AddJobPage';
import CandidatesPage from './Pages/Candidates/CandidateListPage';
import CandidateDetailsPage from './Pages/Candidates/CandidateDetailPage';
import LandingPage from './Pages/Landing';
import TimeOffPage from './Pages/TimeOff';
import SettingsPage from './Pages/Settings';


function App() {
  return (
    <div className="App">
      
      {/* <LandingPage /> */}
      {/* <EmployeePage /> */}
      <Router>
        <Switch>
            {/* <Route exact path='/' component={LandingPage} /> */}
            <Route exact path="/" component={LandingPage} /> 
            <Route exact path="/app/employees" component={EmployeesPage} />  
            <Route exact path="/app/jobs" component={JobsOpeningPage} />
            <Route exact path="/app/newjob" component={AddJobPage} />  
            <Route exact path="/app/candidates" component={CandidatesPage} />
            <Route exact path="/app/candidates/:id" component={CandidateDetailsPage} /> 
            <Route exact path="/app/timeoff" component={TimeOffPage} /> 
            <Route exact path="/app/settings" component={SettingsPage} /> 
            <Route exact path="/signup" component={LandingPage} />
            <Route exact path="/signin" component={LandingPage} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;
