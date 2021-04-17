import React, { Component } from 'react';
import ProfileProvider from '../../services/profileProvider';
import './styles.css';
import { Link, Redirect } from 'react-router-dom';



export default class Dashboard extends Component {

    state = {
        user: {},
    }

    componentDidMount() {

        this.loadProfile('Renato Gomes Marcacini');
    }


    async loadProfile(name) {
        const response = await new ProfileProvider().ListByName(name);
        this.setState({ user: response });
    }

    handleSessionDisconnect() {
        sessionStorage.clear();
    }

    render() {
        const { user } = this.state;
        // if(Object.keys(user).length === 0){
        //     alert('Acesso não autorizado');
        //     return <Redirect to='/login' />
        // }

        if (!sessionStorage.getItem('access_token')) {
            return <Redirect to='/login' />
        }

        const LinkState = ({ linkName, route }) => {
            const path = window.location.pathname.split('/')[1] + '/' + window.location.pathname.split('/')[2];
            if (path === route) {
                return <Link key={route} to={`/${route}`} className="active">{linkName}</Link>;
            }
            else {
                return <Link key={route} to={`/${route}`}>{linkName}</Link>;
            }
        }

        return (
            <div id="profile-admin">
                <h3>{user.name}</h3>
                <p>Desenvolvedor de Software</p>

                <h3>Dashboard</h3>
                <div className="profile-admin-link">
                    <LinkState state={true} linkName='Categorias' route='admin/category' />
                    <LinkState state={false} linkName='Postagens' route='admin/post' />
                    <LinkState state={false} linkName='Autor' route='admin/user' />
                    <Link to='/login' onClick={this.handleSessionDisconnect.bind(this)}>Sair</Link>
                </div>
            </div>
        );
    }
}