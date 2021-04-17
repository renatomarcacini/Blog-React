'use strict'
const express = require('express');
const app = express();
const { errors } = require('celebrate');
const authentication = require('../middlewares/authentication');
const cors = require('cors');
//Rotas
const categoryRouter = require('../routes/categoryRouter');
const userRouter = require('../routes/userRouter');
const postRouter = require('../routes/postRouter');

//Configurações de requisição e reposta
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Configurando rotas da API
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/category', authentication, categoryRouter);

//Configurando errors ocasionados pelo bad request no celebrate
app.use(errors());
module.exports = app;