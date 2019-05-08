import React from "react";
import { withRouter } from "react-router-dom"
import { Row, Button, Col, Table } from "react-bootstrap"
import { Container } from "reactstrap"
import Navigation from "./nav"
import Axios from "axios"
import { URL } from "../Utils/server"

class JobsOfThatCompany extends React.Component {
    constructor() {
        super();
        this.state = {
            jobs: [],
            companyInfo: {}
        };
        this.delete = this.delete.bind(this);
    }
    delete(id) {
        const token = localStorage.getItem('token');
        Axios.delete(`${URL}/job/${id}/${this.state.companyInfo._id}`, { headers: { Authorization: token } }).then(res => {
            if (res.data.status) {
                Axios.get(`${URL}/job/showAllOfThatCompany/${this.props.location.state._id}`, { headers: { Authorization: token } }).then(jobs => {
                    this.setState({ jobs:jobs.data.jobs })
                })
            }
        })
    }
    componentDidMount() {
        const token = localStorage.getItem('token')
        Axios.get(`${URL}/job/showAllOfThatCompany/${this.props.match.params.id}`,{headers:{Authorization:token}}).then(jobs=>{
            console.log('d',jobs.data.jobs,this.props)
            this.setState({jobs:jobs.data.jobs,companyInfo:this.props.location.state})
        })
    }
    render() {
        const { name, email, info, _id } = this.state.companyInfo;
        const jobs = this.state.jobs;
        // Current User Role:
        const { role } = JSON.parse(localStorage.getItem("data"))
        return (
            <Container>
                <Navigation role={role} />
                <Row style={{ margin: 0, marginTop: 25, width: '100%' }}>
                    <Col md={11} sm={10} xs={10}>
                        <p style={{ fontWeight: 'bold', fontSize: window.width > 500 ? 30 : 16 }}>{name && name.toUpperCase()}'s Jobs</p>
                    </Col>
                </Row>
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title<span style={{ color: '#fff' }}>____________________________</span></th>
                            {
                                role === 'admin' &&
                                <th style={{ textAlign: 'center' }}>Remove</th>
                            }
                        </tr>
                    </thead>
                    <tbody>

                        {
                            !jobs.length ? 'No Jobs To Show!' : jobs.map((job, i) => (<tr key={`${job.title}${i}`}>
                                <td>{i + 1}</td>
                                <td onClick={_ => this.props.history.push(`/job/${job._id}`, job)} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>{job.title}</td>
                                {
                                    role === 'admin' &&
                                    <td className="deleteIcon" onClick={_ => this.delete(job._id)}><i className="fas fa-trash-alt"></i></td>
                                }
                            </tr>
                            ))
                        }
                    </tbody>
                </Table>;
            </Container>
        );
    }
}

export default withRouter(JobsOfThatCompany);