import {AyanzaClientTransport} from "../AyanzaClient";

export type MetricResponse = {
    createdAt: number,
    value: number,
    creationSource: string,
};

export type MetricRequestObject = {
    timestamp?: number,
    metricId: string,
    value:number
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
     * Updates the value of one metric.
     */
    update(request: MetricRequestObject){
        return this.transport(`metric/update`, {method: 'POST', body: request});
    }

    /**
     * Updates the values of multiple metrics.
     */
    updateBulk(request: MetricRequestObject[]){
        return this.transport(`metric/update-bulk`, {method: 'POST', body: request});
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
