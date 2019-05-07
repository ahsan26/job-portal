import React from "react";
import Axios from "axios";
import { URL } from "../Utils/server"
import { Row, Col, Table } from "react-bootstrap"
import { Container } from "reactstrap"
import Navigation from "./nav";

class Companies extends React.Component {
    constructor() {
        super();
        this.state = {
            companies: [],
            loading: true
        }
        this.fetchCompanies = this.fetchCompanies.bind(this)
    }
    componentDidMount() {
        this.fetchCompanies();
    }
    fetchCompanies() {
        Axios.get(URL + '/user/showCompanies', { headers: { Authorization: localStorage.getItem('token') } }).then(companies => {
console.log('data',companies)
            this.setState({ loading: false, companies: companies.data.companies });
        })
    }
    delete(id) {
        this.setState({ loading: true });
        Axios.delete(`${URL}/user/company/${id}`, { headers: { Authorization: localStorage.getItem('token') } }).then(res => {
            if (res.data.status) {
                this.fetchCompanies();
            }
        })
    }
    render() {
        // Current User Role
        const { role } = JSON.parse(localStorage.getItem("data"))
        return (
            <Container>
                <Navigation role={role} />
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name<span style={{ color: '#fff' }}>____________________________</span></th>
                            {
                                role === 'admin' &&
                                <th style={{ textAlign: 'center' }}>Remove</th>
                            }
                        </tr>
                    </thead>
                    <tbody>

                        {
                            this.state.loading ? (<td style={{ textAlign: 'center', width: '100%', position: 'relative', left: '50%', top: 25, transform: 'translateX(-50%)' }}><i style={{ color: '#27ae60' }} className="fas fa-circle-notch fa-3x fa-spin"></i></td>) : !this.state.companies.length ? <p style={{ textAlign: 'center' }}>No Companies To Show</p> : this.state.companies.map((company, i) => (<tr key={company.name}>
                                <td>{i + 1}</td>
                                <td onClick={_ => this.props.history.push(`/company/${company._id}`, company)} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>{company.name}</td>
                                {
                                    role === 'admin' &&
                                    <td className="deleteIcon" onClick={_ => this.delete(company._id)}><i className="fas fa-trash-alt"></i></td>
                                }
                            </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default Companies;