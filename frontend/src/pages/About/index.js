import React, { Component } from 'react';
import ProfileProvider from '../../services/profileProvider';

import './styles.css';

export default class About extends Component {

    state = {
        user: {}
    }

    componentDidMount() {
        this.loadProfile();
    }

    async loadProfile() {
        const response = await new ProfileProvider().ListByName('Renato Gomes Marcacini');
        this.setState({ user: response });
    }

    render() {
        const { user } = this.state;
        return (
            <div className="about-container">
                <h1>Sobre</h1>
                <p>{user.about} </p>
            </div>
        );
    }
}