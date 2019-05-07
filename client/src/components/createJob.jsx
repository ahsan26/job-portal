import React from "react";
import { Form, Button } from "react-bootstrap"
import { Container } from "reactstrap"
import Navigation from "./nav"
import Axios from "axios";
import { URL } from "../Utils/server";

class CreateJob extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            skills: '',
            salary_range: '',
            disabled:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.addJob = this.addJob.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    addJob(e) {
        const { salary_range, skills, title, description } = this.state;
        e.preventDefault();
        if (salary_range != '' && skills != '' && title != '' && description != '') {
            this.setState({disabled:true});
            const token = localStorage.getItem('token');
            Axios.post(`${URL}/job/post`, this.state, { headers: { Authorization: token } }).then(res => {
                if (res.status) {
                    this.setState({ title: '', salary_range: '', description: '', skills: '' })
                    this.props.history.push('/jobsOfThatCompany/' + this.props.location.state._id, this.props.location.state)
                }
            });
        }
    }
    render() {
        const { role } = this.props.location.state;
        return (
            <Container>
                <Navigation role={role} />
                <h2>Create New Job</h2>
                <Form onSubmit={this.addJob}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={this.state.title} name="title" onChange={this.handleChange} type="text" placeholder="Enter Title of The Job" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" as="textarea" rows={3} value={this.state.description} name="description" onChange={this.handleChange} placeholder="Description" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Skills Required</Form.Label>
                        <Form.Control type="text" placeholder="Skills" value={this.state.skills} name="skills" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Salary</Form.Label>
                        <Form.Control type="text" placeholder="Salary" value={this.state.salary_range} name="salary_range" onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" disabled={this.state.disabled} type="submit">
                        Submit
  </Button>
                </Form>
            </Container>
        );
    }
}

export default CreateJob;