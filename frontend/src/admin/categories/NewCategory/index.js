import React, { Component } from 'react';
import BaseProvider from '../../../services/baseProvider';
import { Link } from 'react-router-dom';

export default class NewCategory extends Component {

    state = {
        name: ''
    }

    async handlePostForm(e) {
        e.preventDefault();
        const data = {name: this.state.name.trim()}
        
        if(await new BaseProvider('category').Create(data)){
            this.props.history.push('/admin/category');
        }
    }

    render() {
        return (
            <div className="table-container">
                <h1>Nova Categoria</h1>
                <form onSubmit={this.handlePostForm.bind(this)}>
                    <label>Categoria</label>
                    <input type="text"
                        maxLength={250}
                        placeholder='Nome da categoria'
                        required
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                    />
                    <button type="submit">Cadastrar</button>
                </form>
                <Link className="link-normal" to='/admin/category'>Voltar para lista</Link>
            </div>
        );
    }
}