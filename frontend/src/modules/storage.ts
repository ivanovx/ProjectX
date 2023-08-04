export default class Storage {
    static get(key: string) {
        return JSON.parse(window.sessionStorage.getItem(key)!);
    }

    static set(key: string, value: any) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }
}