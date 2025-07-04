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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ModelAddAccount
 */
export interface ModelAddAccount {
    /**
     * 
     * @type {string}
     * @memberof ModelAddAccount
     */
    name?: string;
}

/**
 * Check if a given object implements the ModelAddAccount interface.
 */
export function instanceOfModelAddAccount(value: object): value is ModelAddAccount {
    return true;
}

export function ModelAddAccountFromJSON(json: any): ModelAddAccount {
    return ModelAddAccountFromJSONTyped(json, false);
}

export function ModelAddAccountFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelAddAccount {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'] == null ? undefined : json['name'],
    };
}

export function ModelAddAccountToJSON(json: any): ModelAddAccount {
    return ModelAddAccountToJSONTyped(json, false);
}

export function ModelAddAccountToJSONTyped(value?: ModelAddAccount | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
    };
}

