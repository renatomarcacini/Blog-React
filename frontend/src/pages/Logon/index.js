import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './styles.css';
import ProfileProvider from '../../services/profileProvider';


export default class Logon extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        authenticate: false
    }

    async handleAuthenticate(e) {
        e.preventDefault();
        const data = {
            email: this.state.email.trim(),
            password: this.state.password.trim()
        }
        const response = await new ProfileProvider().Authenticate(data);
        if(response){
            sessionStorage.setItem('access_token', response.token);
            this.setState({authenticate: true});
        }else{
            this.setState({error: 'Usuário ou Senha inválido'});
        }   
    }

    render() {

        if(this.state.authenticate){
            return <Redirect to='/admin/category' />;
        }

        return (
            <div className="login-container">
                <form className="login-form" onSubmit={this.handleAuthenticate.bind(this)}>
                    <h3>Login</h3>
                    <span className="error">{this.state.error}</span>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Digite seu e-mail" required
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    <label>Senha</label>
                    <input
                        type="password"
                        placeholder="Digite sua senha" required
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <button type="submit">Logar</button>
                </form>
            </div>
        );
    }

}