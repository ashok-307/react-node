
export class StorageService {
    static prefix = 'Store-';
    static setLocal(key: string, value: any): void {
        localStorage.setItem(this.prefix + key, JSON.stringify(value));
        return;
    }

    static getLocal(key: string): any {
        let value = localStorage.getItem(this.prefix + key);
        return value ? JSON.parse(value) : '';
    }

    static removeLocal(key: string): void {
        localStorage.removeItem(this.prefix + key);
        return;
    }

    static clearLocal(): void {
        localStorage.clear();
        return;
    }

    static setSession(key: string, value: any): void {
        sessionStorage.setItem(this.prefix + key, JSON.stringify(value));
        return;
    }

    static getSession(key: string): any {
        let value = sessionStorage.getItem(this.prefix + key);
        return value ? JSON.parse(value) : '';
    }

    static removeSession(key: string): void {
        sessionStorage.removeItem(this.prefix + key);
        return;
    }

    static clearSession(): void {
        sessionStorage.clear();
        return;
    }
}
