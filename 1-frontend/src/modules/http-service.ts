import axios from "axios";

export const BEARER_TOKEN_AUTH = (token: string) => {
    return { 'Authorization' : `Bearer ${token}` };
}

export default class HttpService {
    static doGet(url: string, config?: any) {
        return new Promise((resolve, reject) =>
            axios
                .get(url, config)
                .then(res => resolve(res.data))
                .catch(err => reject(err))    
        );
    }

    static doPost(url: string, data: any, config?: any) {
        return new Promise((resolve, reject) => 
            axios
                .post(url, data, config)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        );
    }

    static doPut(url: string, data: any, config?: any) {
        return new Promise((resolve, reject) =>
            axios
                .put(url, data, config)
                .then(res => resolve(res.data))
                .catch(err => reject(err)
        ));
    }

    static doDelete(url: string, config?: any) {
        return new Promise((resolve, reject) =>
            axios
                .delete(url, config)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        );
    }
}