import {AyanzaClientTransport} from "../AyanzaClient";

export type MetricResponse = {
    time: number,
    value: number | string,
};

export class MetricApi {
    constructor(private transport: AyanzaClientTransport) {}

    get(metricId: string): Promise<MetricResponse[]> {
        return this.transport(`metric/${metricId}`);
    }
    create(metricId: string, reqBody: {value: string | number}): Promise<MetricResponse> {
        return this.transport(`metric/${metricId}`, {method: 'POST', body: reqBody});
    }
}
