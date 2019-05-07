import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./components/pr"
import Companies from "./components/companies";
import Company from "./components/company";
import JobsOfThatCompany from "./components/jobsofthatcompany";
import Job from "./components/job";
import CreateJob from "./components/createJob";
import AllJobs from "./components/allJobs";
import AllStudents from "./components/allStudents";
import JobApplicants from "./components/jobApplicants";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={SignUp} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/dashboard" component={ProtectedRoute(Dashboard)} />
      <Route path="/allCompanies" component={ProtectedRoute(Companies)} />
      <Route path="/company/:id" component={ProtectedRoute(Company)} />
      <Route path="/jobsOfThatCompany/:id" component={ProtectedRoute(JobsOfThatCompany)} />
      <Route path="/job/:id" component={ProtectedRoute(Job)} />
      <Route path="/createJob" component={ProtectedRoute(CreateJob)} />
      <Route path="/allJobs" component={ProtectedRoute(AllJobs)} />
      <Route path="/allStudents" component={ProtectedRoute(AllStudents)} />
      <Route path="/jobApplicants" component={ProtectedRoute(JobApplicants)} />
      
    </BrowserRouter>
  );
}

export default App;
