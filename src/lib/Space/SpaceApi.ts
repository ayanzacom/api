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
    create(title: string, isTeam: boolean = false): Promise<WorkspaceResponse> {
        const reqBody: WorkspacePostRequest = {title, isTeam}
        return this.transport(`spaces`, {method: 'POST', body: reqBody});
    }
    update(): Promise<WorkspaceResponse> {
        //TODO..
        return this.transport(`spaces`, {method: 'PATCH'});
    }
    delete(id: string): Promise<unknown> {
        return this.transport(`spaces/${id}`, {method: 'DELETE'});
    }
}
