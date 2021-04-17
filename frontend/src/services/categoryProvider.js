import api from './api';
import {toast} from 'react-toastify';

export default class CategoryProvider{
    async List(){
        try {            
            const result = await api.get('/category');
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error('[Categoria] - Erro ao conectar ao banco de dados');
            return [];
        }
    }

    async ListById(id){
        try {            
            const result = await api.get(`/category/${id}`);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error('[Categoria] - Erro ao conectar ao banco de dados');
            return {};
        }
    }

    async Create(data){
        try {            
            const result = await api.post('/category', data);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error('[Categoria] - Erro ao conectar ao banco de dados');
            return false;
        }
    }

    async Update(id, data){
        try {            
            const result = await api.put(`/category/${id}`, data);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error('[Categoria] - Erro ao conectar ao banco de dados');
            return false;
        }
    }

    async Delete(id){
        try {            
            const result = await api.delete(`/category/${id}`);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error('[Categoria] - Erro ao conectar ao banco de dados');
            return false;
        }
    }
}


