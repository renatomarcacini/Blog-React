import React, { Component } from 'react';
import BaseProvider from '../../../services/baseProvider';
import ProfileProvider from '../../../services/profileProvider';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export default class User extends Component {

    state = {
        id: 1,
        name: '',
        email: '',
        photo: '',
        about: '',
        password: '',
        confirm_password: '',
        error: ''
    }

    componentDidMount() {
        this.loadAuthor();
    }

    async loadAuthor() {
        const response = await new ProfileProvider('user').ListByName('Renato Gomes Marcacini');
        this.setState({
            id: response.id,
            name: response.name,
            email: response.email,
            photo: response.photo,
            about: response.about,
        });
    }

    async handlePostForm(e) {
        e.preventDefault();
        this.setState({ error: '' });
        let data = {
            name: this.state.name,
            email: this.state.email,
            photo: this.state.photo,
            about: this.state.about,
            password: this.state.password
        };

        if ((this.state.password) &&
            (this.state.password === this.state.confirm_password)) {
            if (await new BaseProvider('user').Update(this.state.id, data)) {
                this.props.history.push('/admin/user');
            }
        }
        else if (!this.state.password) {
            data = {
                name: this.state.name,
                email: this.state.email,
                photo: this.state.photo,
                about: this.state.about,
            };
            if (await new BaseProvider('user').Update(this.state.id, data)) {
                this.props.history.push('/admin/user');
            }
        }
        else {
            this.setState({ error: 'As senhas devem ser exatamente iguais' });
        }

    }

    render() {
        return (
            <div className="table-container">
                <h1>Bem vindo, {this.state.name}</h1>
                <form onSubmit={this.handlePostForm.bind(this)}>
                    <label>Email</label>
                    <input type="text"
                        maxLength={250}
                        placeholder='Email'
                        required
                        value={this.state.email}
                        onChange={e => (this.setState({ email: e.target.value }))}
                    />
                    <label>Senha</label>
                    <input type="password"
                        maxLength={250}
                        placeholder='Senha'
                        value={this.state.password}
                        onChange={e => (this.setState({ password: e.target.value }))}
                    />
                    <label>Confirmar-Senha</label>
                    <span className='error'>{this.state.error}</span>
                    <input type="password"
                        maxLength={250}
                        placeholder='Confirmar senha'
                        value={this.state.confirm_password}
                        onChange={e => (this.setState({ confirm_password: e.target.value }))}
                    />
                    <label>Foto</label>
                    <input type="url"
                        placeholder='Foto'
                        required
                        value={this.state.photo}
                        onChange={e => (this.setState({ photo: e.target.value }))}
                    />
                    <label>Sobre</label>
                    <textarea placeholder="Sobre" required value={this.state.about}
                        onChange={e => (this.setState({ about: e.target.value }))}>

                    </textarea>
                    <button type="submit">Atualizar</button>
                </form>
            </div>
        );
    }
}