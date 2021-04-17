import React, { Component } from 'react';
import BaseProvider from '../../../services/baseProvider';
import { Link } from 'react-router-dom';

export default class Category extends Component {

    state = {
        categories: [],
        page: 1,
        maxPage: 1
    }


    componentDidMount() {
        this.loadCategories(1, 5);
    }

    async loadCategories(pageNumber, pageSize) {
        const response = await new BaseProvider('category').List();
        const itemsPaginated = this.PaginationArray(response, pageNumber, pageSize);
        const maxPage = this.CountPages(response, 5);
        this.setState({ categories: itemsPaginated, page: pageNumber, maxPage });
    }

    CountPages(items, itemsCountPerPage) {
        let page = 1;
        if ((items.length / itemsCountPerPage) % 2 === 0) {
            page = (items.length / itemsCountPerPage);
        }
        else {
            page = parseInt(items.length / itemsCountPerPage) + 1;
        }
        return page;
    }

    PaginationArray(items, pageNumber, pageSize) {
        return items.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    }

    nextPage() {
        const { page, maxPage } = this.state;
        if (page < maxPage) {
            this.loadCategories((page + 1), 5);
        }
    }

    previousPage() {
        const { page } = this.state;
        if (page > 1) {
            this.loadCategories((page - 1), 5);
        }
    }

    async handleDeleteCategory(id){
        if(window.confirm('Deseja realmente deletar este item?')){
            if(await new BaseProvider('category').Delete(id)){
                this.props.history.push('/admin/category');
                this.loadCategories(1, 5);
                return;
            }
        }
        return false;
    }

    render() {
        const { categories, page, maxPage } = this.state;

        return (
            <div className="table-container">
                <h1>Lista de Categoria</h1>
                    <Link to='category/create' className="link-normal">Nova categoria</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td >{category.name}</td>
                                <td>
                                    <Link to={`category/${category.id}`}>Editar</Link>
                                    <Link to='category' onClick={()=> this.handleDeleteCategory(category.id)}>Deletar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <div className="table-buttons-paginated">
                    <button className="table-button-page" onClick={this.previousPage.bind(this)}> Anterior </button>
                    <span>{`${page} de ${maxPage}`}</span>
                    <button className="table-button-page" onClick={this.nextPage.bind(this)}> Próximo</button>
                </div>
            </div>

        );
    }
}