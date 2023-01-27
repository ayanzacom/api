import { AyanzaClientTransport } from '../AyanzaClient';

export type SchemaAddPropertyBodyRequest = {
    id?: string,
    type: string,
    name: string,
};

export type SchemaAddPropertyResponse = {
    id: string,
    type: string,
    name: string,
};

export type SchemaGetResponse = {
    id: string,
    ownerId: string,
    organizationId: string,
    properties: any[], // TODO.. type
    isPublishedOnInternet: boolean,
};

export class SchemaApi {
    constructor(private transport: AyanzaClientTransport) {}

    get(id: string): Promise<SchemaGetResponse> {
        return this.transport(`schema/${id}`);
    }
    addProperty(schemaId: string, type: string, name: string, propertyId?: string): Promise<SchemaAddPropertyResponse> {
        const reqBody: SchemaAddPropertyBodyRequest = {name, type}
        if(propertyId) reqBody.id = propertyId
        return this.transport(`schema/${schemaId}/property`, {method: 'POST', body: reqBody});
    }
    deleteProperty(schemaId: string, propertyId: string): Promise<unknown> {
        return this.transport(`schema/${schemaId}/property/${propertyId}`, {method: 'DELETE'});
    }
}
