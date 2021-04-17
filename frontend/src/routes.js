import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import AppRoute from './approute';

import AdminLayout from './layouts/adminLayout';
import MainLayout from './layouts/mainLayout';
import LoginLayout from './layouts/loginLayout';

//Public routes
import Home from './pages/Home';
import Post from './pages/Post';
import About from './pages/About';
import Logon from './pages/Logon';
import NotFound from './pages/NotFound';

//Private routes
import Category from './admin/categories/Category';
import NewCategory from './admin/categories/NewCategory';
import UpdateCategory from './admin/categories/UpdateCategory';

import PostAdmin from './admin/posts/Post';
import NewPost from './admin/posts/NewPost';
import UpdatePost from './admin/posts/UpdatePost';

import User from './admin/users/User';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <AppRoute exact path="/" component={Home} layout={MainLayout} />
                <AppRoute path="/post/:id" component={Post} layout={MainLayout} />
                <AppRoute path="/about" component={About} layout={MainLayout} />
                <AppRoute path="/login" component={Logon} layout={LoginLayout} />

                <AppRoute exact path="/admin/category" component={Category} layout={AdminLayout} />
                <AppRoute path="/admin/category/create" component={NewCategory} layout={AdminLayout} />
                <AppRoute path="/admin/category/:id" component={UpdateCategory} layout={AdminLayout} />

                <AppRoute exact path="/admin/post" component={PostAdmin} layout={AdminLayout} />
                <AppRoute path="/admin/post/create" component={NewPost} layout={AdminLayout} />
                <AppRoute path="/admin/post/:id" component={UpdatePost} layout={AdminLayout} />

                <AppRoute exact path="/admin/user" component={User} layout={AdminLayout} />
                <AppRoute component={NotFound} layout={MainLayout} />

            </Switch>
        </BrowserRouter>
    );
}