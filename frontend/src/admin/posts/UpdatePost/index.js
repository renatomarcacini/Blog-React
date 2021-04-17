import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BaseProvider from '../../../services/baseProvider';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export default class UpdatePost extends Component {

    state = {
        title: '',
        title_page: '',
        short_text: '',
        text: '',
        user_id: 1,
        category_id: 1,
        categories: [],
        authors: []
    }

    componentDidMount(){
        this.loadPost();
        this.loadCategories();
        this.loadAuthors();
    }

    async loadPost(){
        const response = await new BaseProvider('post').ListById(this.props.match.params.id);
        this.setState({
            title: response.title,
            title_page: response.title_page,
            short_text: response.short_text,
            text: response.text,
            user_id: response.user_id,
            category_id: response.category_id
        });
    }

    async loadCategories(){
        const response = await new BaseProvider('category').List();
        this.setState({ categories: response});
    }

    async loadAuthors(){
        const response = await new BaseProvider('user').List();
        this.setState({ authors: response});
    }

    async handlePostForm(e) {
        e.preventDefault();
        let title_format = this.state.title.split(' ').map((s => s.charAt(0).toUpperCase() + s.substring(1))).join(' ').trim();
        let title_page_format = this.state.title.toLowerCase().trim().split(' ').join('-');

        const data = {
            title: title_format,
            title_page: title_page_format,
            short_text: this.state.short_text.trim(),
            text: this.state.text,
            user_id: parseInt(this.state.user_id),
            category_id: parseInt(this.state.category_id),
        }
        if (await new BaseProvider('post').Update(this.props.match.params.id, data)) {
            this.props.history.push('/admin/post');
        }
    }

    handleChange(content){
        console.log(content);
        this.setState({text: content});
    }

    handleChangeTitle(e){
        let title_format = e.target.value.toLowerCase().split(' ').map((s => s.charAt(0).toUpperCase() + s.substring(1))).join(' ');
        this.setState({ title: title_format });
    }

    render() {
        const { categories, authors} = this.state;

        return (
            <div className="table-container">
                <h1>Nova Postagem</h1>
                <form onSubmit={this.handlePostForm.bind(this)}>
                    <label>Titulo</label>
                    <input type="text"
                        maxLength={250}
                        placeholder='Titulo da postagem'
                        required
                        value={this.state.title}
                        onChange={this.handleChangeTitle.bind(this)}
                    />
                    <label>Pré-conteudo</label>
                    <input type="text"
                        placeholder='Pré-conteudo da postagem'
                        required
                        value={this.state.short_text}
                        onChange={e => this.setState({ short_text: e.target.value })}
                    />
                    <label>Autor</label>
                    <select value={this.state.user_id} onChange={e => this.setState({ user_id: e.target.value})}>
                        {authors.map(author => (
                            <option value={author.id} key={author.id}>{author.name}</option>
                        ))}
                    </select>
                    <label>Categoria</label>
                    <select value={this.state.category_id} onChange={e => this.setState({ category_id: e.target.value})}>
                        {categories.map(category => (
                            <option value={category.id} key={category.id}>{category.name}</option>
                        ))}
                    </select>

                    <label>Texto</label>
                    <SunEditor  
                        width='100%'
                        setOptions={{
                            buttonList: buttonList.complex,
                            minHeight: 400
                        }}  
                        onChange={this.handleChange.bind(this)}
                        setContents={this.state.text}       
                    />
                    <button type="submit">Atualizar</button>
                </form>
                <Link className="link-normal" to='/admin/post'>Voltar para lista</Link>
            </div>
        );
    }
}