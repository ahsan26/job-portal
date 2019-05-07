import React from "react";
import { withRouter } from "react-router-dom"
import { Row, Button, Col, Table } from "react-bootstrap"
import { Container } from "reactstrap"
import Navigation from "./nav"
import Axios from "axios"
import { URL } from "../Utils/server"

class Job extends React.Component {
    constructor() {
        super()
        this.state = {
            applied: false
        };
        this.apply = this.apply.bind(this);
    }
    delete(id) {
        const token = localStorage.getItem('token');
        Axios.delete(`${URL}/job/${id}/${this.props.location.state.companyId}`, { headers: { Authorization: token } }).then(res => {
            if (res.data.status) {
                this.props.history.goBack()
            }
        })
    }
    apply(id) {
        const token = localStorage.getItem('token');
        Axios.post(`${URL}/job/apply`, { jobId: id }, { headers: { Authorization: token } }).then(res=>{
            if(res.status)this.setState({applied:true});
        })
    }
    componentDidMount() {
        const {_id } = JSON.parse(localStorage.getItem("data"))
        console.log( this.props.location.state.applicants.find(job => job._id === _id),this.props,_id)
        this.setState({
            applied: this.props.location.state.applicants.find(job => job._id === _id) ? true : false
        })
    }
    render() {
        const { title, salary_range, applicants, skills, description, _id } = this.props.location.state;
        // Current User Role
        const { role } = JSON.parse(localStorage.getItem("data"))
        return (
            <Container>
                <Navigation role={role} />
                <Row style={{ margin: 0, marginTop: 25, width: '100%' }}>
                    <Col md={10} sm={9} xs={8}>
                        <p style={{ fontWeight: 'bold', fontSize: window.width > 500 ? 30 : 16 }}>{title.toUpperCase()}</p>
                    </Col>
                    {
                        role === 'admin' &&
                        <Col md={2} sm={3} xs={4}>
                            <Button variant="danger" onClick={_ => this.delete(_id)}>Remove</Button>
                        </Col>
                    }
                    {
                        role === 'student' &&
                        <Col md={2} sm={3} xs={4}>
                            <Button variant={this.state.applied ? "danger" : "success"} disabled={this.state.applied ? true : false} onClick={_ => this.apply(_id)}>{this.state.applied ? 'Already Applied' : 'Apply'}</Button>
                        </Col>
                    }
                </Row>
                <Table style={{ marginTop: 30 }} bordered responsive>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <td>{_id}</td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td>{title}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{description}</td>
                        </tr>
                        <tr>
                            <th>Skills</th>
                            <td>{skills}</td>
                        </tr>
                        <tr>
                            <th>Salary Range</th>
                            <td>{salary_range}</td>
                        </tr>
                        {
                            (role === 'admin' || role === 'company') &&
                            < tr >
                                <th>Applicants</th>
                                <td style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={_ => this.props.history.push('/jobApplicants', _id)}>{applicants.length}</td>
                            </tr>
                        }
                    </tbody>
                </Table>;
            </Container>
        );
    }
}

export default withRouter(Job);