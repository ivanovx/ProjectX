export default class Storage {
    static get(key: string) {
        return JSON.parse(window.localStorage.getItem(key)!);
    }

    static set(key: string, value: any) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}