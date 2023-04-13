import {AyanzaClientTransport} from "../AyanzaClient";

export type MetricResponse = {
    createdAt: number,
    value: number,
    creationSource: string,
};

export class MetricApi {
    constructor(private transport: AyanzaClientTransport) {}

    /**
     * Fetches metric data for a given metric ID.
     *
     * @param id - The ID of the metric to fetch. Slug can be used as an ID
     * @returns A Promise that resolves to an array of MetricResponse objects.
     */
    get(id: string): Promise<MetricResponse[]> {
        return this.transport(`metric/${id}`);
    }

    /**
     * Updates the values of one or multiple metrics.
     *
     * @param request - An object containing key-value pairs where the keys represent timestamps (in milliseconds) as a string and the values represent records containing metric IDs/slugs and new values.
     * @returns A Promise that resolves to void.
     */
    update(request: Record<string, Record<string, number>>){
        return this.transport(`metric/update`, {method: 'POST', body: request});
    }

    /**
     * Creates a slug for a given metric ID.
     *
     * @param request - An object containing the metric ID and the desired slug.
     */
    createSlug(request: {id: string, slug: string }){
        return this.transport(`metric/slug`, {method: 'POST', body: request});
    }
}
