/* tslint:disable */
/* eslint-disable */
/**
 * Swagger Example API
 * This is a sample server celler server.
 *
 * The version of the OpenAPI document: 1.0
 * Contact: support@swagger.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ControllerMessage,
  HttputilHTTPError,
  ModelAccount,
  ModelAddAccount,
  ModelAdmin,
  ModelUpdateAccount,
} from '../models/index';
import {
    ControllerMessageFromJSON,
    ControllerMessageToJSON,
    HttputilHTTPErrorFromJSON,
    HttputilHTTPErrorToJSON,
    ModelAccountFromJSON,
    ModelAccountToJSON,
    ModelAddAccountFromJSON,
    ModelAddAccountToJSON,
    ModelAdminFromJSON,
    ModelAdminToJSON,
    ModelUpdateAccountFromJSON,
    ModelUpdateAccountToJSON,
} from '../models/index';

export interface AccountsGetRequest {
    q?: string;
}

export interface AccountsIdDeleteRequest {
    id: number;
}

export interface AccountsIdGetRequest {
    id: number;
}

export interface AccountsIdImagesPostRequest {
    id: number;
    file: Blob;
}

export interface AccountsIdPatchRequest {
    id: number;
    account: ModelUpdateAccount;
}

export interface AccountsPostRequest {
    account: ModelAddAccount;
}

/**
 * 
 */
export class AccountsApi extends runtime.BaseAPI {

    /**
     * get accounts
     * List accounts
     */
    async accountsGetRaw(requestParameters: AccountsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ModelAccount>>> {
        const queryParameters: any = {};

        if (requestParameters['q'] != null) {
            queryParameters['q'] = requestParameters['q'];
        }

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/accounts`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ModelAccountFromJSON));
    }

    /**
     * get accounts
     * List accounts
     */
    async accountsGet(requestParameters: AccountsGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ModelAccount>> {
        const response = await this.accountsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete by account ID
     * Delete an account
     */
    async accountsIdDeleteRaw(requestParameters: AccountsIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelAccount>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling accountsIdDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/accounts/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        const response = await this.request({
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelAccountFromJSON(jsonValue));
    }

    /**
     * Delete by account ID
     * Delete an account
     */
    async accountsIdDelete(requestParameters: AccountsIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelAccount> {
        const response = await this.accountsIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get string by ID
     * Show an account
     */
    async accountsIdGetRaw(requestParameters: AccountsIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelAccount>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling accountsIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/accounts/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelAccountFromJSON(jsonValue));
    }

    /**
     * get string by ID
     * Show an account
     */
    async accountsIdGet(requestParameters: AccountsIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelAccount> {
        const response = await this.accountsIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Upload file
     * Upload account image
     */
    async accountsIdImagesPostRaw(requestParameters: AccountsIdImagesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ControllerMessage>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling accountsIdImagesPost().'
            );
        }

        if (requestParameters['file'] == null) {
            throw new runtime.RequiredError(
                'file',
                'Required parameter "file" was null or undefined when calling accountsIdImagesPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters['file'] != null) {
            formParams.append('file', requestParameters['file'] as any);
        }


        let urlPath = `/accounts/{id}/images`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ControllerMessageFromJSON(jsonValue));
    }

    /**
     * Upload file
     * Upload account image
     */
    async accountsIdImagesPost(requestParameters: AccountsIdImagesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ControllerMessage> {
        const response = await this.accountsIdImagesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update by json account
     * Update an account
     */
    async accountsIdPatchRaw(requestParameters: AccountsIdPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelAccount>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling accountsIdPatch().'
            );
        }

        if (requestParameters['account'] == null) {
            throw new runtime.RequiredError(
                'account',
                'Required parameter "account" was null or undefined when calling accountsIdPatch().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';


        let urlPath = `/accounts/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        const response = await this.request({
            path: urlPath,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: ModelUpdateAccountToJSON(requestParameters['account']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelAccountFromJSON(jsonValue));
    }

    /**
     * Update by json account
     * Update an account
     */
    async accountsIdPatch(requestParameters: AccountsIdPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelAccount> {
        const response = await this.accountsIdPatchRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * add by json account
     * Add an account
     */
    async accountsPostRaw(requestParameters: AccountsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelAccount>> {
        if (requestParameters['account'] == null) {
            throw new runtime.RequiredError(
                'account',
                'Required parameter "account" was null or undefined when calling accountsPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';


        let urlPath = `/accounts`;

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ModelAddAccountToJSON(requestParameters['account']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelAccountFromJSON(jsonValue));
    }

    /**
     * add by json account
     * Add an account
     */
    async accountsPost(requestParameters: AccountsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelAccount> {
        const response = await this.accountsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get admin info
     * Auth admin
     */
    async adminAuthPostRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelAdmin>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // ApiKeyAuth authentication
        }


        let urlPath = `/admin/auth`;

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelAdminFromJSON(jsonValue));
    }

    /**
     * get admin info
     * Auth admin
     */
    async adminAuthPost(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelAdmin> {
        const response = await this.adminAuthPostRaw(initOverrides);
        return await response.value();
    }

}
