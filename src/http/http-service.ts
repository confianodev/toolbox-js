import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ExecuteRequest extends AxiosRequestConfig {
    path?: string;
}

interface Header {
    [key: string]: string;
}

export interface IHttpService {
    get<T>(path?: string, headers?: Header): Promise<T>;
    post<T>(path?: string, data?: any, headers?: Header): Promise<T>;
    put<T>(path?: string, data?: any, headers?: Header): Promise<T>;
    patch<T>(path?: string, data?: any, headers?: Header): Promise<T>;
}

export class HttpService implements IHttpService {
    private readonly client: AxiosInstance;

    constructor(baseUri: string) {
        this.client = axios.create({ baseURL: baseUri });
    }

    public async get<T>(path = '', headers: Header = {}): Promise<T> {
        return await this.execute<T>({ url: path, method: 'GET', headers });
    }

    public async post<T>(path = '', data: any = {}, headers: Header = {}): Promise<T> {
        return await this.execute<T>({ url: path, method: 'POST', data, headers });
    }

    public async put<T>(path = '', data: any = {}, headers: Header = {}): Promise<T> {
        return await this.execute<T>({ url: path, method: 'PUT', data, headers });
    }

    public async patch<T>(path = '', data: any = {}, headers: Header = {}): Promise<T> {
        return await this.execute<T>({ url: path, method: 'PATCH', data, headers });
    }

    private async execute<T>(request: ExecuteRequest): Promise<T> {
        const response: AxiosResponse<T> = await this.client.request<T>(request);
        return response.data;
    }
}