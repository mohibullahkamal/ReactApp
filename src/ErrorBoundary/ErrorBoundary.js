import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }
    componentDidCatch = (error, info) => {   //new method: this recieved a potential error and some additional info passed into it automatically by React 
        this.setState({hasError: true, errorMessage: error});
    }

    render() {
        if (this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>;
        } else {
            return this.props.children;   //important when accessing props in class...

        }
    }
}
export default ErrorBoundary;