import React from "react";
import { withRouter } from "react-router-dom"
import { Row, Button, Col, Table } from "react-bootstrap"
import { Container } from "reactstrap"
import Navigation from "./nav"
import Axios from "axios"
import { URL } from "../Utils/server"

class AllJobs extends React.Component {
    constructor() {
        super();
        this.state = {
            jobs: [],
        };
        this.delete = this.delete.bind(this);
        this.fetchJobs = this.fetchJobs.bind(this);
    }
    delete(job) {
        const token = localStorage.getItem('token');
        Axios.delete(`${URL}/job/${job._id}/${job.companyId}`, { headers: { Authorization: token } }).then(res => {
            if (res.data.status) {
        this.delete = this.delete.bind(this);
        this.fetchJobs();
            }
        })
    }
    fetchJobs() { 
        const token = localStorage.getItem('token')
        Axios.get(`${URL}/job/showAll`,{headers:{Authorization:token}}).then(jobs=>{
            console.log('j',jobs)
            this.setState({jobs:jobs.data.jobs})
        })
    }
    componentDidMount() {
            this.fetchJobs();
    }
    render() {
        const jobs = this.state.jobs;
        // Current User Role:
        const { role } = JSON.parse(localStorage.getItem("data"))
        return (
            <Container>
                <Navigation role={role} />
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
                            !jobs.length ? 'No Jobs To Show!' : jobs.map((job, i) => (<tr key={job.title}>
                                <td>{i + 1}</td>
                                <td onClick={_ => this.props.history.push(`/job/${job._id}`, job)} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>{job.title}</td>
                                {
                                    role === 'admin' &&
                                    <td className="deleteIcon" onClick={_ => this.delete(job)}><i className="fas fa-trash-alt"></i></td>
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

export default withRouter(AllJobs);