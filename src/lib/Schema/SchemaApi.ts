import { AyanzaClientTransport } from '../AyanzaClient';

export type SchemaAddPropertyBodyRequest = {
    name: string,
    type: string,
};

export type SchemaAddPropertyResponse = {
    id: string,
    type: string,
    name: string,
};

export class SchemaApi {
    constructor(private transport: AyanzaClientTransport) {}

    get(id: string): Promise<unknown> {
        return this.transport(`schema/${id}`);
    }
    addProperty(schemaId: string, type: string,name: string): Promise<SchemaAddPropertyResponse> {
        const reqBody: SchemaAddPropertyBodyRequest = {name, type}
        return this.transport(`schema/${schemaId}/property`, {method: 'POST', body: reqBody});
    }
    deleteProperty(schemaId: string, propertyId: string): Promise<unknown> {
        return this.transport(`schema/${schemaId}/property/${propertyId}`, {method: 'DELETE'});
    }
}
