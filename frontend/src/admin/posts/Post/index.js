import React, { Component } from 'react';
import BaseProvider from '../../../services/baseProvider';
import { Link } from 'react-router-dom';
import Util from '../../../util/util';

export default class Post extends Component {

    state = {
        posts: [],
        page: 1,
        maxPage: 1
    }

    componentDidMount() {
        this.loadPosts(1, 5);
    }

    async loadPosts(pageNumber, pageSize) {
        const response = await new BaseProvider('post').List();
        const itemsPaginated = this.PaginationArray(response.content, pageNumber, pageSize);
        const maxPage = this.CountPages(response.content, 5);
        this.setState({ posts: itemsPaginated, page: pageNumber, maxPage });
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
            this.loadPosts((page + 1), 5);
        }
    }

    previousPage() {
        const { page } = this.state;
        if (page > 1) {
            this.loadPosts((page - 1), 5);
        }
    }

    async handleDeletePost(id) {
        if (window.confirm('Deseja realmente deletar este item?')) {
            if (await new BaseProvider('post').Delete(id)) {
                this.props.history.push('/admin/post');
                this.loadPosts(1, 5);
                return;
            }
        }
        return false;
    }

    render() {
        const { posts, page, maxPage } = this.state;

        return (
            <div className="table-container">
                <h1>Lista de Postagens</h1>
                <Link to='post/create' className="link-normal">Nova postagem</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Categoria</th>
                            <th>Data de Postagem</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id}>
                                <td >{post.title}</td>
                                <td >{post.category}</td>
                                <td >{new Util().convertToShortDate(post.created_at)}</td>
                                <td>
                                    <Link to={`post/${post.id}`}>Editar</Link>
                                    <Link to='post' onClick={() => this.handleDeletePost(post.id)}>Deletar</Link>
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