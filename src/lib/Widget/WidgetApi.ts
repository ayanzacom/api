import { AyanzaClientTransport } from '../AyanzaClient';

export type WidgetResponse = {
    id: string,
    ownerId: string,
    title: string,
};

export type WidgetPostRequest = {
    title: string, parentId: string | null
};

export class WidgetApi {
    constructor(private transport: AyanzaClientTransport) {}

    get(id: string): Promise<WidgetResponse> {
        return this.transport(`widgets/${id}`);
    }
    create(title: string, parentId: string | null): Promise<WidgetResponse> {
        const reqBody: WidgetPostRequest = {title, parentId}
        return this.transport(`widgets`, {method: 'POST', body: reqBody});
    }
    update(): Promise<WidgetResponse> {
        //TODO..
        return this.transport(`widgets`, {method: 'PATCH'});
    }
    delete(id: string): Promise<unknown> {
        return this.transport(`widgets/${id}`, {method: 'DELETE'});
    }
}
