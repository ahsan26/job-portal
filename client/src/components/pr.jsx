import React from "react";
import { withRouter } from "react-router-dom"

function PR(ComposedComponent) {
    class PRC extends React.Component {
        componentWillMount() {
            const token = localStorage.getItem('token');
            console.log('t',token)
            if (!token) {
                this.props.history.push('/signIn');
            }
        }
        render() {
            return <ComposedComponent {...this.props} />
        }
    }
    return withRouter(PRC);
}

export default PR;