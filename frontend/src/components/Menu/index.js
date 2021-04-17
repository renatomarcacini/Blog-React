import React, { Component } from 'react';
import './styles.css';

import CategoryProvider from '../../services/categoryProvider';

import { Link } from 'react-router-dom';

export default class Menu extends Component {

    state = {
        categories: [],
        param: ''
    }

    componentDidMount() {
        this.loadCategories();
    }

    async loadCategories() {
        const response = await new CategoryProvider().List();
        this.setState({ categories: response });
    }

    render() {
        const { categories } = this.state;

        return (
            <div id="categories">
                <h3>Categorias</h3>
                <ul>
                    {categories.map(category => (
                        <li key={category.name}> <Link  to={`/?category=${category.name}`}>> {category.name} </Link> </li>
                    ))}
                </ul>
            </div>
        );
    }
}