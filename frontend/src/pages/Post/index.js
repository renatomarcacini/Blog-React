import React, { Component } from 'react';
import PostProvider from '../../services/postProvider';
import Util from '../../util/util';
import { Link } from 'react-router-dom';
import Disqus from 'disqus-react';  
import './styles.css';



export default class Post extends Component {
    state = {
        post: {}
    }

    util = new Util();

    componentDidMount() {
        this.loadPost(this.props.match.params.id);
    }

    async loadPost(titlePage) {
        const response = await new PostProvider().ListByTitlePage(titlePage);
        this.setState({ post: response });
    }

    render() {
        const { post } = this.state;

        const disqusShorname = 'renatodevblog';
        const BASE_URL = window.location.href;
        const disqusConfig = {
            url: BASE_URL,
            identifier: this.props.match.params.id,
            title: post.title
        }

        return (
            <div className="post-container">
                <article key={post.id} className="post-box">
                    <div className="post-header">
                        <p>DATA: {this.util.convertToShortDate(post.created_at)}</p>
                        <Link to={`/?category=${post.category}`}> {post.category}</Link>
                    </div>
                    <div className="post-format">
                        <h1 className="post-content-title"> {post.title} </h1>
                        <div dangerouslySetInnerHTML={{ __html: post.text }}></div>
                    </div>
                </article>

                <Disqus.DiscussionEmbed
                    shortname={disqusShorname}
                    config={disqusConfig}
                />
            </div>


        );
    }

}