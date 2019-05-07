import React from "react";
import { withRouter } from "react-router-dom"
import Navigation from "./nav";
import { Container } from "reactstrap";

class Dashboard extends React.Component {
    render() {
        const { role,name } = this.props.location.state ? this.props.location.state.data : JSON.parse(localStorage.getItem('data'))
        return (
            <Container>
                <Navigation role={role} />
                <h1>Welcome, {name.toUpperCase()} as a {role.toUpperCase()}</h1>
            </Container>
        );
    }
}

export default withRouter(Dashboard);