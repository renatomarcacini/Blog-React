import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

import PostProvider from '../../services/postProvider';

import Pagination from 'react-js-pagination';

export default class Home extends Component {
    state = {
        posts: [],
        category: '',
        page: 1,
        pageTotal: 1,
        totalItems: 1
    }

    componentDidMount() {
        const category = this.props.location.search.split('=')[1] || '';
        this.loadPosts(1, category);
    }

    componentDidUpdate() {
        const category = this.props.location.search.split('=')[1] || '';
        if ((category || category === '') && category !== this.state.category) {
            this.loadPosts(1, category);
        }
    }

    async loadPosts(pageNumber, category) {
        window.scrollTo(0, 0);
        const response = await new PostProvider().List(pageNumber, category);
        if (await response) {
            const { content, pageTotal, totalItems } = response;
            this.setState({ posts: content, page: pageNumber, pageTotal, totalItems, category });
        }
    }

    handlePageChange(pageNumber, category) {
        this.setState({ page: pageNumber });
        this.loadPosts(pageNumber, this.state.category);
    }

    convertToShortDate(date) {
        let shortDate = new Date(date).toLocaleDateString();
        return shortDate;
    }

    render() {
        const { posts, totalItems } = this.state;

        const ListOfPost = () => {
            if (posts) {
                if (posts.length > 0) {
                    return posts.map(post => (
                        <div key={post.id} className="post-box">
                            <div className="post-header">
                                <p>DATA: {this.convertToShortDate(post.created_at)}</p>
                                <Link to={`/?category=${post.category}`}> {post.category}</Link>
                            </div>
                            <div className="post-content">
                                <h1> <Link to={`/post/${post.title_page}`}> {post.title} </Link> </h1>
                                <div>{post.short_text}</div>
                            </div>
                            <div className="post-link">
                                <Link to={`/post/${post.title_page}`}>LER MAIS</Link>
                            </div>
                        </div>
                    ));
                }
                else {
                    return <h1>Desculpe, nada foi encontrado!</h1>;
                }
            }
            else {
                return <h1>Desculpe, nada foi encontrado!</h1>;
            }
        }


        return (
            <div className="home-container">
                <section>
                    <ListOfPost />

                    <div id="pagination">
                        <p>Páginas</p>
                        <Pagination
                            activePage={this.state.page}
                            hideNavigation
                            itemsCountPerPage={5}
                            totalItemsCount={totalItems}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                            activeLinkClass='active'
                        />
                    </div>

                </section>
            </div>
        );
    }
}

