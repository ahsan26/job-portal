import React from "react";
import { withRouter } from "react-router-dom"
import { Row, Button, Col, Table } from "react-bootstrap"
import { Container } from "reactstrap"
import Navigation from "./nav"
import Axios from "axios"
import { URL } from "../Utils/server"

class Company extends React.Component {
    constructor() {
        super();
        this.state = {
            company: {name:'',email:'',info:'',_id:'',info:{jobsPosted:[]}}
        };
        this.fetchCompanyDetails = this.fetchCompanyDetails.bind(this);
    }
    delete(id) {
        Axios.delete(`${URL}/user/company/${id}`, { headers: { Authorization: localStorage.getItem('token') } }).then(res => {
            if (res.data.status) {
                this.props.history.goBack()
            }
        })
    }
    fetchCompanyDetails() {
        console.log(this.props.match.params.id)
        Axios.get(`${URL}/user/company/${this.props.match.params.id}`, { headers: { Authorization: localStorage.getItem('token') } }).then(data => {
            this.setState({ company: data.data.data })
        })
    }
    componentDidMount() {
        this.fetchCompanyDetails();
    }
    render() {
        const { name, email, info, _id } = this.state.company;
 const { jobsPosted } = info;
        // Current User Role
        const { role } = JSON.parse(localStorage.getItem("data"))
        return (
            <Container>
                <Navigation role={role} />
                <Row style={{ margin: 0, marginTop: 25, width: '100%' }}>
                    <Col md={11} sm={10} xs={10}>
                        <p style={{ fontWeight: 'bold', fontSize: window.width > 500 ? 30 : 16 }}>{name.toUpperCase()}</p>
                    </Col>
                    {
                    role==='admin'  && 
                    <Col md={1} sm={2} xs={2}>
                        <Button variant="danger" onClick={_ => this.delete(_id)}>Remove</Button>
                    </Col>}
                </Row>
                <Table style={{ marginTop: 30 }} bordered responsive>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <td>{_id}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <th>Jobs Posted</th>
                            <td style={{ color: "blue", textDecoration: 'underline', cursor: 'pointer' }} onClick={_ => this.props.history.push(`/jobsOfThatCompany/${_id}`, this.props.location.state)}>{jobsPosted.length}</td>
                        </tr>
                    </tbody>
                </Table>;
            </Container>
        );
    }
}

export default withRouter(Company);