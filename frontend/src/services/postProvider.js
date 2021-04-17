import api from './api';
import {toast} from 'react-toastify';


export default class PostProvider{
    async List(page = 1, category) {
        if (page <= 0)
            page = 1;

        try {
            const result = await api.get(`/post?page=${page}&category=${category}`);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error('[Post] - Erro ao conectar ao banco de dados');
            return [];
        }
    }

    async ListByTitlePage(titlePage) {
        try {
            const result = await api.get(`/post/title/${titlePage}`);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error('[Post] - Erro ao conectar ao banco de dados');
            return {};
        }
    }

    async ListById(id) {
        try {
            const result = await api.get(`/post/${id}`);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error('[Post] - Erro ao conectar ao banco de dados');
            return {};
        }
    }

    async Create(data) {
        try {
            const result = await api.post(`/post`, data);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error('[Post] - Erro ao conectar ao banco de dados');
            return false;
        }
    }

    async Update(data) {
        try {
            const result = await api.post(`/post`, data);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error('[Post] - Erro ao conectar ao banco de dados');
            return false;
        }
    }

    

};

