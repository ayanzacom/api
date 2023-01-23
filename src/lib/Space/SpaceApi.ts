import { AyanzaClientTransport } from '../AyanzaClient';

export class SpaceApi {
    constructor(private transport: AyanzaClientTransport) {}

    get(id: string): Promise<{ title: string; ownerId: string }> {
        return this.transport(`widgets/${id}`);
    }
}
