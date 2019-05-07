import React from "react";
import { withRouter } from "react-router-dom"
import { Row, Button, Col, Table } from "react-bootstrap"
import { Container } from "reactstrap"
import Navigation from "./nav"
import Axios from "axios"
import { URL } from "../Utils/server"

class JobApplicants extends React.Component {
    constructor() {
        super();
        this.state = {
            applicants: [],
        };
        this.fetchApplicants = this.fetchApplicants.bind(this);
    }
    fetchApplicants() { 
        const token = localStorage.getItem('token')
        Axios.get(`${URL}/job/applicants/${this.props.location.state}`,{headers:{Authorization:token}}).then(applicants=>{
            this.setState({applicants:applicants.data.applicants})
        })
    }
    componentDidMount() {
            this.fetchApplicants();
    }
    render() {
        const applicants = this.state.applicants;
        console.log('applicants',applicants)
        // Current User Role:
        const { role } = JSON.parse(localStorage.getItem("data"))
        return (
            <Container>
                <Navigation role={role} />
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name<span style={{ color: '#fff' }}>____________________________</span></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            !applicants.length ? 'No Applicants To Show!' : applicants.map((applicant, i) => (<tr key={applicant.name}>
                                <td>{i + 1}</td>
                                <td style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>{applicant.name}</td>
                            </tr>
                            ))
                        }
                    </tbody>
                </Table>;
            </Container>
        );
    }
}

export default withRouter(JobApplicants);