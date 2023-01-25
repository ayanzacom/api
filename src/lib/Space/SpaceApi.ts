import { AyanzaClientTransport } from '../AyanzaClient';

export type WorkspaceResponse = {
    id: string,
    parentId: string | null,
    ownerId: string,
    title: string,
    widgets: string[],
    schemaId: string,
    schemaProperties: any[], // TODO type o.o
};

export type WorkspacePostRequestBody = {
    title: string,
    parentId: string | null,
    isTeam?: boolean
};

export class SpaceApi {
    constructor(private transport: AyanzaClientTransport) {}

    get(id: string): Promise<WorkspaceResponse> {
        return this.transport(`space/${id}`);
    }
    create(title: string, parentId: string | null, isTeam: boolean = false): Promise<WorkspaceResponse> {
        const reqBody: WorkspacePostRequestBody = {title, parentId, isTeam}
        return this.transport(`space`, {method: 'POST', body: reqBody});
    }
    // TODO..
    // update(): Promise<WorkspaceResponse> {
    //
    //     return this.transport(`space`, {method: 'PATCH'});
    // }
    delete(id: string): Promise<unknown> {
        return this.transport(`space/${id}`, {method: 'DELETE'});
    }
}
