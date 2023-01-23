import { AyanzaClientTransport } from '../AyanzaClient';

export type WorkspaceResponse = {
    id: string,
    ownerId: string,
    title: string,
    widgets: string[],
    schemaId: string,
    schemaProperties: any[],
};

export type WorkspacePostRequest = {
    title: string, isTeam?: boolean
};

export class SpaceApi {
    constructor(private transport: AyanzaClientTransport) {}

    get(id: string): Promise<WorkspaceResponse> {
        return this.transport(`spaces/${id}`);
    }
    create(request: WorkspacePostRequest): Promise<WorkspaceResponse> {
        return this.transport(`spaces`, {method: 'POST', body: {title: request.title, isTeam: request?.isTeam ?? false}});
    }
    update(): Promise<WorkspaceResponse> {
        //TODO..
        return this.transport(`spaces`, {method: 'PATCH'});
    }
    delete(id: string): Promise<unknown> {
        return this.transport(`spaces/${id}`, {method: 'DELETE'});
    }
}
