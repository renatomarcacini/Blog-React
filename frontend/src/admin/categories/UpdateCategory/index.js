import React, { Component } from 'react';
import BaseProvider from '../../../services/baseProvider';

import { Link } from 'react-router-dom';


export default class NewCategory extends Component {

    state = {
        name: ''
    }

    componentDidMount() {
        this.loadCategory(this.props.match.params.id);
    }

    async loadCategory(id) {
        const response = await new BaseProvider('category').ListById(id);
        this.setState({ name: response.name });
    }

    async handleUpdateCategory(e) {
        e.preventDefault();
        const data = {name: this.state.name.trim()}

        if (await new BaseProvider('category').Update(this.props.match.params.id, data)) {
            this.props.history.push('/admin/category');
        }
    }

    render() {
        return (
            <div className="table-container">
                <h1>Nova Categoria</h1>
                <form onSubmit={this.handleUpdateCategory.bind(this)}>
                    <label>Categoria</label>
                    <input type="text"
                        maxLength={250}
                        placeholder='Nome da categoria'
                        required
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                    />
                    <button type="submit">Atualizar</button>
                </form>
                <Link className="link-normal" to='/admin/category'>Voltar para lista</Link>
            </div>
        );
    }
}