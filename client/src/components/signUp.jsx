import React from "react";
import { Form, Button, Alert } from "react-bootstrap"
import axios from "axios"
import { URL } from "../Utils/server"
import { withRouter } from "react-router-dom"

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            role: '',
            password: '',
            err: ''
        };
        this.signUp = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        if (localStorage.getItem('token')) this.props.history.push('/dashboard')
    }
    signUp(e) {
        const { name, email, role, password } = this.state;
        if (name !== '' && email !== '' && role !== '' && password !== '') {
            axios.post(URL + '/user/signUp', { ...this.state }).then(res => {
                if (res.data.status === true) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('data', JSON.stringify(res.data.data));
                    this.props.history.push('/dashboard', res.data);
                }
            }).catch(err => {
                this.setState({ err: err.response.data.err })
            })
        }
        e.preventDefault();
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.signUpContainer}>
                    {
                        this.state.err &&
                        <Alert variant={'danger'} style={styles.alert}>
                            {this.state.err}
                        </Alert>
                    }

                    <p style={styles.signUpHeading}>SignUp</p>
                    <Form onSubmit={this.signUp}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" onChange={this.handleChange} placeholder="Enter Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" onChange={this.handleChange} placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
    </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Select Role</Form.Label>
                            <Form.Control as="select" name="role" onChange={this.handleChange}>
                                <option>Role</option>
                                <option value="admin">Admin</option>
                                <option value="student">Student</option>
                                <option value="company">Company</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                        </Form.Group>
                        <div style={{ width: "100%", textAlign: 'center' }}>
                            <Button variant="primary" type="submit">
                                Submit
  </Button>
                        </div>
                    </Form>
                    <p onClick={_ => this.props.history.push('/signIn')} style={{cursor:'pointer', textAlign: 'center', marginTop: 15 }}>Already Have Account! <span style={{ color: 'blue' }}>SignIn</span></p>
                </div>
            </div>
        );
    }
}

const styles = {
    alert: {
        textAlign: 'center'
    },
    container: {
        height: 700,
        position: 'relative',
    },
    signUpContainer: {
        margin: 'auto',
        left: '50%',
        width: 500,
        border: '1px solid gray',
        top: '50%',
        position: 'absolute',
        msTransform: "translate(-50%,-50%)",
        transform: "translate(-50%,-50%)"
    },
    signUpHeading: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    }
};

export default withRouter(SignUp);