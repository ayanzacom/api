import { FetchOptions, ofetch } from 'ofetch';
import { SpaceApi } from './Space/SpaceApi';

type OptionsType = {
    token: string;
    apiTarget?: string;
}

const DEFAULT_API_TARGET = 'https://ayanza.com/api';
export type AyanzaClientTransport = <T>(target: string, options?: FetchOptions) => Promise<T>;
export class AyanzaClient {
    constructor(private options: OptionsType) {}

    get transport() {
        return <T>(target: string, options?: FetchOptions) => {
            return ofetch<T>(`${this.options?.apiTarget ?? DEFAULT_API_TARGET}/${target}`, {
                ...options ?? {},
                responseType: 'json',
                headers: {
                    ...options?.headers ?? {},
                    ['Accept']: 'application/json',
                    ['Content-Type']: 'application/json',
                    ['Authorization']: `Bearer ${this.options.token}`
                }
            })
        }
    }

    get space() {
        return new SpaceApi(this.transport);
    }

    widget() {

    }
}
