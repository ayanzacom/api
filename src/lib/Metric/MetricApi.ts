import {AyanzaClientTransport} from "../AyanzaClient";

export type MetricResponse = {
    createdAt: number,
    value: number,
};

export class MetricApi {
    constructor(private transport: AyanzaClientTransport) {}

    get(metricId: string): Promise<MetricResponse[]> {
        return this.transport(`metric/${metricId}`);
    }
    create(metricId: string, reqBody: {value: number}): Promise<MetricResponse> {
        return this.transport(`metric/${metricId}`, {method: 'POST', body: reqBody});
    }
}
