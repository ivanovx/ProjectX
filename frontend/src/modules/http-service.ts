import axios from "axios";

export default class HttpService {
    static doGet(url: string, config?: any) {
        const abortController = new AbortController();

        return new Promise((resolve, reject) => {
            axios.get(url, {
                signal: abortController.signal,
                ...config
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
            .finally(abortController.abort);
        });
    }

    static doPost(url: string, data: any, config?: any) {
        const abortController = new AbortController();

        return new Promise((resolve, reject) => {
            axios.post(url, data, {
                signal: abortController.signal,
                ...config
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
            .finally(abortController.abort);
        });
    }

    static doPut(url: string, data: any, config?: any) {
        const abortController = new AbortController();

        return new Promise((resolve, reject) => {
            axios.put(url, data, {
                signal: abortController.signal,
                ...config
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
            .finally(abortController.abort);
        });
    }

    static doDelete(url: string, config?: any) {
        const abortController = new AbortController();

        return new Promise((resolve, reject) => {
            axios.delete(url, {
                signal: abortController.signal,
                ...config
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
            .finally(abortController.abort);
        });
    }
}