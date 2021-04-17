import api from './api';
import {toast} from 'react-toastify';

export default class BaseProvider{
    
    constructor(model){
        this._model = model; 
    }

    async List(){
        try {            
            const result = await api.get(`/${this._model}`);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error(`[${this._model}] - Erro ao conectar ao banco de dados`);
            return [];
        }
    }

    async ListById(id){
        try {            
            const result = await api.get(`/${this._model}/${id}`);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error(`[${this._model}] - Erro ao conectar ao banco de dados`);
            return {};
        }
    }

    async ListOrderByID(){
        try {            
            const result = await api.get(`/${this._model}`);
            return result.data.sort((a,b) => b.id - a.id);
        } catch (err) {
            console.info(err);
            toast.error(`[${this._model}] - Erro ao conectar ao banco de dados`);
            return {};
        }
    }

    async Create(data){
        try {            
            const result = await api.post(`/${this._model}`, data);
            toast.success(`[${this._model}] - Adicionado com sucesso`);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error(`[${this._model}] - Erro ao conectar ao banco de dados`);
            return false;
        }
    }

    async Update(id, data){
        try {            
            const result = await api.put(`/${this._model}/${id}`, data);
            toast.success(`[${this._model}] - Atualizado com sucesso`);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error(`[${this._model}] - Erro ao conectar ao banco de dados`);
            return false;
        }
    }

    async Delete(id){
        try {            
            const result = await api.delete(`/${this._model}/${id}`);
            toast.success(`[${this._model}] - Deletado com sucesso`);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error(`[${this._model}] - Erro ao conectar ao banco de dados`);
            return false;
        }
    }
}


