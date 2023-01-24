import { AyanzaClientTransport } from '../AyanzaClient';

export type WidgetResponse = {
    id: string,
    ownerId: string,
    title: string,
};

export type WidgetPostRequestBody = {
    title: string,
    parentId: string | null,
    properties?: WidgetProperties
};

export type WidgetPatchRequestBody = {
    title: string,
    properties?: WidgetProperties
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
    create(title: string, parentId: string | null, properties?: any): Promise<WidgetResponse> {
        const reqBody: WidgetPostRequestBody = {title, parentId}
        if(properties) reqBody.properties = properties

        return this.transport(`widget`, {method: 'POST', body: reqBody});
    }
    update(title: string, properties?: any): Promise<WidgetResponse> {
        const reqBody: WidgetPatchRequestBody = {title}
        if(properties) reqBody.properties = properties

        return this.transport(`widget`, {method: 'PATCH'});
    }
    delete(id: string): Promise<unknown> {
        return this.transport(`widget/${id}`, {method: 'DELETE'});
    }
}