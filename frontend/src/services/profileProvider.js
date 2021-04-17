import api from './api';
import {toast} from 'react-toastify';

export default class ProfileProvider{
    async ListByName(name){
        try {
            const result = await api.get(`/user/author/${name}`);
            return result.data;
        } catch (err) {
            console.info(err);
            toast.error('[Usuário] - Erro ao conectar ao banco de dados');
            return {};
        }
    }

    async Authenticate(data){
        try {
            const result = await api.post(`/user/login`, data);
            return result.data;
        } catch (err) {
            console.info(err);
            return undefined;
        }
    }
}