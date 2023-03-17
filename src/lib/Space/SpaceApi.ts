import { AyanzaClientTransport } from '../AyanzaClient';
import {WidgetResponse} from "../Widget/WidgetApi";

export type WorkspaceResponse = {
    id: string,
    parentId: string | null,
    ownerId: string,
    title: string,
    widgets: WidgetResponse[],
    schemaId: string,
    schemaProperties: any[], // TODO type
    settings?: any // TODO type WorkspaceSettings & ContentMetaSettings;
};

export type WorkspacePostRequestBody = {
    title: string,
    parentId: string | null,
    isTeam?: boolean
    settings?: any // TODO type WorkspaceSettings & ContentMetaSettings;
};

export type SearchQuery ={
    property: string,
    operator:
        '<' |
        '<=' |
        '==' |
        '>' |
        '>=' |
        '!=' |
        'array-contains' |
        'array-contains-any' |
        'in' |
        'not-in'
    ,
    value: unknown,
};

export type SearchRequestBody = {
    queries: SearchQuery[]
}

export class SpaceApi {
    constructor(private transport: AyanzaClientTransport) {}

    get(id: string): Promise<WorkspaceResponse> {
        return this.transport(`space/${id}`);
    }
    create(title: string, parentId: string | null, isTeam = false, settings?: any): Promise<WorkspaceResponse> {
        const reqBody: WorkspacePostRequestBody = {title, parentId, isTeam}
        if(settings) reqBody.settings = settings

        return this.transport(`space`, {method: 'POST', body: reqBody});
    }
    update(id: string, title: string, parentId: string | null, isTeam: boolean, settings?: any): Promise<WorkspaceResponse> {
        const reqBody: WorkspacePostRequestBody = {title, parentId, isTeam}
        if(settings) reqBody.settings = settings

        return this.transport(`space/${id}`, {method: 'PATCH', body: reqBody});
    }
    delete(id: string): Promise<unknown> {
        return this.transport(`space/${id}`, {method: 'DELETE'});
    }
    search(queries: SearchQuery[]): Promise<WorkspaceResponse[]>{
        const reqBody: SearchRequestBody = {queries: queries}
        return this.transport(`space/search`, {method: 'POST', body: reqBody});
    }
}
