import React, { Component } from 'react';
import ProfileProvider from '../../services/profileProvider';
import './styles.css';
import { Link } from 'react-router-dom';



export default class Profile extends Component {

    state = {
        user: {}
    }

    componentDidMount() {
       console.log();
        this.loadProfile('Renato Gomes Marcacini');
    }

    async loadProfile(name) {
        const response = await new ProfileProvider().ListByName(name);
        this.setState({ user: response });
    }

    render() {
        const { user } = this.state;
        const LinkState = ({ linkName, route }) => {
            if (window.location.pathname.split('/')[1] === route) {
                return <Link key={route} to={`/${route}`} className="active">{linkName}</Link>;
            }
            else {
                return <Link key={route} to={`/${route}`}>{linkName}</Link>;
            }
        }

        return (
            <div id="profile">
                <img src={user.photo} alt="foto de perfil" />
                <h3>{user.name}</h3>
                <p>Desenvolvedor de Software</p>

                <div className="profile-link">
                    <LinkState state={true} linkName='Artigos' route=''/>
                    <LinkState state={false} linkName='Sobre' route='about'/>
                </div>
            </div>
        );
    }
}