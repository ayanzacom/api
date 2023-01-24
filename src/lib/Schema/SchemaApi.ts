import { AyanzaClientTransport } from '../AyanzaClient';

export type SchemaAddPropertyBodyRequest = {
    schemaId: string,
    type: string,
    name: string,
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
        const reqBody: SchemaAddPropertyBodyRequest = {schemaId, name, type}
        return this.transport(`schema/property`, {method: 'POST', body: reqBody});
    }
    deleteProperty(): Promise<unknown> {
        //TODO..
        return this.transport(`schema/property`, {method: 'DELETE'});
    }
}
