import React from "react";
import { Form, Button, Alert } from "react-bootstrap"
import axios from "axios"
import { URL } from "../Utils/server"
import { withRouter } from "react-router-dom"

class signIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            err: ''
        };
        this.signIn = this.signIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        if (localStorage.getItem('token')) this.props.history.push('/dashboard')
    }
    signIn(e) {
        const { email, password } = this.state;
        if (email !== '' && password !== '') {
            axios.post(URL + '/user/signIn', { ...this.state }).then(res => {
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
                <div style={styles.signInContainer}>
                    {
                        this.state.err &&
                        <Alert variant={'danger'} style={styles.alert}>
                            {this.state.err}
                        </Alert>
                    }

                    <p style={styles.signInHeading}>SignIn</p>
                    <Form onSubmit={this.signIn}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" onChange={this.handleChange} placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                        </Form.Group>
                        <div style={{ width: "100%", textAlign: 'center' }}>
                            <Button variant="primary" type="submit">
                                SignIn
  </Button>
                        </div>
                    </Form>
                    <p onClick={_ => this.props.history.push('/')} style={{ cursor: 'pointer', textAlign: 'center', marginTop: 15 }}>Don't Have Account! <span style={{ color: 'blue' }}>Create Now For Free</span></p>
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
    signInContainer: {
        margin: 'auto',
        left: '50%',
        width: 500,
        border: '1px solid gray',
        top: '50%',
        position: 'absolute',
        msTransform: "translate(-50%,-50%)",
        transform: "translate(-50%,-50%)"
    },
    signInHeading: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    }
};

export default withRouter(signIn);