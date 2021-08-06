import React from 'react'
import { Link, useHistory } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div>

            Work Profile photo About me
            <h1>Hello, I'm Vu Nguyen, a Full Stack Developer currently working at Cognizant</h1>
            <h2>I have a deep interest in enterprise architecture as well as microservices</h2>
            <h3>About application</h3>
            <h3>This application is a light combination of application tracking system and hr to help tackle talent problem as well as some basic hr stuff</h3>
            <h3>The app also is a tester to seek out the optimal solution in architecture design and implementation </h3>
            <h1>User Story</h1>
            <h3>Landing Page</h3> see all the available jobs, display job details and description, and candidate able to submit their application
            <h3>Authentication Page</h3> user able to signin using login page and create new account using sign up page for authentication
            <h3>Job Page</h3> list all jobs, click to view job details, create new job for landing page and edit current job
            <h3>Candidate Page</h3>list all candidates applied for jobs, review and rating candidate, update candidate information
            <h3>User Page</h3>list all users, see user basic info, send user message and check user calendar 
            <h3>Profile Page</h3>list all user data, update user profile picture and update user details
            <h3>Time Page</h3>allow user to submit for time off, check current time off status and hours of timeoff available
            <h3>Message Page</h3>list all employees that user interact by messasage
            <h3>Dashboard Page</h3>list app performance, statictist, and user private data
            <Link to="/signin">Click here to go back to login page</Link>
        </div>
    )
}
