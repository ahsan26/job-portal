import React from "react";
import { Nav,Button } from "react-bootstrap";
import { withRouter } from "react-router-dom"

class Navigation extends React.Component {
    constructor(){
        super();
        this.logOut=this.logOut.bind(this);
    }
    logOut(){
        localStorage.removeItem('token')
        localStorage.removeItem('data')
        this.props.history.push("/signIn");
    }
    render() {
        const data =  JSON.parse(localStorage.getItem('data'))
        return (
            <React.Fragment>
                {
                    this.props.role === 'admin' ? (<Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link onClick={_ => this.props.history.push('/dashboard')}>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={_ => this.props.history.push('/allCompanies')}>Companies</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={_ => this.props.history.push('/allJobs')}>Jobs</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={_ => this.props.history.push('/allStudents')}>Students</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={this.logOut}>Logout</Nav.Link>
                        </Nav.Item>
                    </Nav>) : this.props.role === 'company' ? (<Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link onClick={_ => this.props.history.push('/dashboard')}>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={_ => this.props.history.push(`/jobsOfThatCompany/${data._id}`,data)}>Jobs</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={_ => this.props.history.push('/allStudents')}>Students</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={this.logOut}>Logout</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link><Button variant="success" onClick={_ => this.props.history.push('/createJob',data)}>Create Job</Button></Nav.Link>
                        </Nav.Item>
                    </Nav>) : (<Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link onClick={_ => this.props.history.push('/dashboard')}>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={_ => this.props.history.push('/allJobs')}>Jobs</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={_ => this.props.history.push('/allCompanies')}>Companies</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={this.logOut}>Logout</Nav.Link>
                        </Nav.Item>
                    </Nav>)
                }
            </React.Fragment>
        );
    }
}

export default withRouter(Navigation);