import { AyanzaClientTransport } from '../AyanzaClient';

export type WidgetResponse = {
    id: string,
    ownerId: string,
    title: string,
};

export type WidgetPostRequest = {
    title: string, parentId?: string
};

export class WidgetApi {
    constructor(private transport: AyanzaClientTransport) {}

    get(id: string): Promise<WidgetResponse> {
        return this.transport(`widgets/${id}`);
    }
    create(request: WidgetPostRequest): Promise<WidgetResponse> {
        return this.transport(`widgets`, {method: 'POST', body: {title: request.title, parentId: request.parentId}});
    }
    update(): Promise<WidgetResponse> {
        //TODO..
        return this.transport(`widgets`, {method: 'PATCH'});
    }
    delete(id: string): Promise<unknown> {
        return this.transport(`widgets/${id}`, {method: 'DELETE'});
    }
}
