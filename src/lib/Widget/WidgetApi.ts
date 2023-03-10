import { AyanzaClientTransport } from '../AyanzaClient';
import {
    SearchQuery,
    SearchRequestBody,
} from "../Space/SpaceApi";

export type WidgetResponse = {
    id: string,
    archived: boolean,
    ownerId: string,
    title: string,
    createdAt: string,
    properties: WidgetProperties
};

export type WidgetPostRequestBody = {
    title: string,
    parentId: string | null,
    properties?: WidgetProperties
    content?: any
};

export type WidgetPatchRequestBody = {
    title: string,
    properties?: WidgetProperties
    content?: any
};

export interface WidgetProperties {
    [schemaId: string]: {
        [propertyId: string]: {
            [k: string]: any;
        };
    };
}

export class WidgetApi {
    constructor(private transport: AyanzaClientTransport) {}

    get(id: string): Promise<WidgetResponse> {
        return this.transport(`widget/${id}`);
    }
    create(title: string, parentId: string | null, properties?: WidgetProperties, content?: any): Promise<WidgetResponse> {
        const reqBody: WidgetPostRequestBody = {title, parentId}
        if(properties) reqBody.properties = properties
        if(content) reqBody.content = content

        return this.transport(`widget`, {method: 'POST', body: reqBody});
    }
    update(id:string, title: string, properties?: WidgetProperties, content?: any): Promise<WidgetResponse> {
        const reqBody: WidgetPatchRequestBody = {title}
        if(properties) reqBody.properties = properties
        if(content) reqBody.content = content

        return this.transport(`widget/${id}`, {method: 'PATCH', body: reqBody});
    }
    search(queries: SearchQuery[]): Promise<WidgetResponse[]>{
        const reqBody: SearchRequestBody = {queries: queries}
        return this.transport(`widget/search`, {method: 'POST', body: reqBody});
    }
    delete(id: string): Promise<unknown> {
        return this.transport(`widget/${id}`, {method: 'DELETE'});
    }
}
