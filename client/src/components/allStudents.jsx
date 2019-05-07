import React from "react";
import { withRouter } from "react-router-dom"
import { Row, Button, Col, Table } from "react-bootstrap"
import { Container } from "reactstrap"
import Navigation from "./nav"
import Axios from "axios"
import { URL } from "../Utils/server"

class AllStudents extends React.Component {
    constructor() {
        super();
        this.state = {
            students: [],
        };
        this.delete = this.delete.bind(this);
        this.fetchStudents = this.fetchStudents.bind(this);
    }
    delete(student) {
        const token = localStorage.getItem('token');
        Axios.delete(`${URL}/user/student/${student._id}`, { headers: { Authorization: token } }).then(res => {
            if (res.data.status) {
        this.delete = this.delete.bind(this);
        this.fetchStudents();
            }
        })
    }
    fetchStudents() { 
        const token = localStorage.getItem('token')
        Axios.get(`${URL}/user/students`,{headers:{Authorization:token}}).then(students=>{
            this.setState({students:students.data.students})
        })
    }
    componentDidMount() {
            this.fetchStudents();
    }
    render() {
        const students = this.state.students;
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
                            {
                                role === 'admin' &&
                                <th style={{ textAlign: 'center' }}>Remove</th>
                            }
                        </tr>
                    </thead>
                    <tbody>

                        {
                            !students.length ? 'No students To Show!' : students.map((student, i) => (<tr key={student.name}>
                                <td>{i + 1}</td>
                                <td style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>{student.name}</td>
                                {
                                    role === 'admin' &&
                                    <td className="deleteIcon" onClick={_ => this.delete(student)}><i className="fas fa-trash-alt"></i></td>
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

export default withRouter(AllStudents);