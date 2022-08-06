/* tslint:disable */
/* eslint-disable */
/**
 * Spire
 * Spire API documentation
 *
 * The version of the OpenAPI document: 3.0
 * Contact: akkadius1@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { CrudcontrollersBulkFetchByIdsGetRequest } from '../models';
// @ts-ignore
import { ModelsDynamicZoneTemplate } from '../models';
/**
 * DynamicZoneTemplateApi - axios parameter creator
 * @export
 */
export const DynamicZoneTemplateApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Creates DynamicZoneTemplate
         * @param {ModelsDynamicZoneTemplate} dynamicZoneTemplate DynamicZoneTemplate
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createDynamicZoneTemplate: async (dynamicZoneTemplate: ModelsDynamicZoneTemplate, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dynamicZoneTemplate' is not null or undefined
            if (dynamicZoneTemplate === null || dynamicZoneTemplate === undefined) {
                throw new RequiredError('dynamicZoneTemplate','Required parameter dynamicZoneTemplate was null or undefined when calling createDynamicZoneTemplate.');
            }
            const localVarPath = `/dynamic_zone_template`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof dynamicZoneTemplate !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(dynamicZoneTemplate !== undefined ? dynamicZoneTemplate : {})
                : (dynamicZoneTemplate || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Deletes DynamicZoneTemplate
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteDynamicZoneTemplate: async (id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteDynamicZoneTemplate.');
            }
            const localVarPath = `/dynamic_zone_template/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Gets DynamicZoneTemplate
         * @param {number} id Id
         * @param {string} [includes] Relationships [all] for all [number] for depth of relationships to load or [.] separated relationship names 
         * @param {string} [select] Column names [.] separated to fetch specific fields in response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDynamicZoneTemplate: async (id: number, includes?: string, select?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getDynamicZoneTemplate.');
            }
            const localVarPath = `/dynamic_zone_template/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (includes !== undefined) {
                localVarQueryParameter['includes'] = includes;
            }

            if (select !== undefined) {
                localVarQueryParameter['select'] = select;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Gets DynamicZoneTemplates in bulk
         * @param {CrudcontrollersBulkFetchByIdsGetRequest} body body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDynamicZoneTemplatesBulk: async (body: CrudcontrollersBulkFetchByIdsGetRequest, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling getDynamicZoneTemplatesBulk.');
            }
            const localVarPath = `/dynamic_zone_templates/bulk`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof body !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(body !== undefined ? body : {})
                : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Lists DynamicZoneTemplates
         * @param {string} [includes] Relationships [all] for all [number] for depth of relationships to load or [.] separated relationship names 
         * @param {string} [where] Filter on specific fields. Multiple conditions [.] separated Example: col_like_value.col2__val2
         * @param {string} [whereOr] Filter on specific fields (Chained ors). Multiple conditions [.] separated Example: col_like_value.col2__val2
         * @param {string} [groupBy] Group by field. Multiple conditions [.] separated Example: field1.field2
         * @param {string} [limit] Rows to limit in response (Default: 10,000)
         * @param {number} [page] Pagination page
         * @param {string} [orderBy] Order by [field]
         * @param {string} [orderDirection] Order by field direction
         * @param {string} [select] Column names [.] separated to fetch specific fields in response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDynamicZoneTemplates: async (includes?: string, where?: string, whereOr?: string, groupBy?: string, limit?: string, page?: number, orderBy?: string, orderDirection?: string, select?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/dynamic_zone_templates`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (includes !== undefined) {
                localVarQueryParameter['includes'] = includes;
            }

            if (where !== undefined) {
                localVarQueryParameter['where'] = where;
            }

            if (whereOr !== undefined) {
                localVarQueryParameter['whereOr'] = whereOr;
            }

            if (groupBy !== undefined) {
                localVarQueryParameter['groupBy'] = groupBy;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (orderBy !== undefined) {
                localVarQueryParameter['orderBy'] = orderBy;
            }

            if (orderDirection !== undefined) {
                localVarQueryParameter['orderDirection'] = orderDirection;
            }

            if (select !== undefined) {
                localVarQueryParameter['select'] = select;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Updates DynamicZoneTemplate
         * @param {number} id Id
         * @param {ModelsDynamicZoneTemplate} dynamicZoneTemplate DynamicZoneTemplate
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateDynamicZoneTemplate: async (id: number, dynamicZoneTemplate: ModelsDynamicZoneTemplate, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling updateDynamicZoneTemplate.');
            }
            // verify required parameter 'dynamicZoneTemplate' is not null or undefined
            if (dynamicZoneTemplate === null || dynamicZoneTemplate === undefined) {
                throw new RequiredError('dynamicZoneTemplate','Required parameter dynamicZoneTemplate was null or undefined when calling updateDynamicZoneTemplate.');
            }
            const localVarPath = `/dynamic_zone_template/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof dynamicZoneTemplate !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(dynamicZoneTemplate !== undefined ? dynamicZoneTemplate : {})
                : (dynamicZoneTemplate || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DynamicZoneTemplateApi - functional programming interface
 * @export
 */
export const DynamicZoneTemplateApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Creates DynamicZoneTemplate
         * @param {ModelsDynamicZoneTemplate} dynamicZoneTemplate DynamicZoneTemplate
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createDynamicZoneTemplate(dynamicZoneTemplate: ModelsDynamicZoneTemplate, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ModelsDynamicZoneTemplate>>> {
            const localVarAxiosArgs = await DynamicZoneTemplateApiAxiosParamCreator(configuration).createDynamicZoneTemplate(dynamicZoneTemplate, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: (configuration?.basePath || basePath) + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Deletes DynamicZoneTemplate
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteDynamicZoneTemplate(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await DynamicZoneTemplateApiAxiosParamCreator(configuration).deleteDynamicZoneTemplate(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: (configuration?.basePath || basePath) + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Gets DynamicZoneTemplate
         * @param {number} id Id
         * @param {string} [includes] Relationships [all] for all [number] for depth of relationships to load or [.] separated relationship names 
         * @param {string} [select] Column names [.] separated to fetch specific fields in response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDynamicZoneTemplate(id: number, includes?: string, select?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ModelsDynamicZoneTemplate>>> {
            const localVarAxiosArgs = await DynamicZoneTemplateApiAxiosParamCreator(configuration).getDynamicZoneTemplate(id, includes, select, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: (configuration?.basePath || basePath) + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Gets DynamicZoneTemplates in bulk
         * @param {CrudcontrollersBulkFetchByIdsGetRequest} body body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDynamicZoneTemplatesBulk(body: CrudcontrollersBulkFetchByIdsGetRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ModelsDynamicZoneTemplate>>> {
            const localVarAxiosArgs = await DynamicZoneTemplateApiAxiosParamCreator(configuration).getDynamicZoneTemplatesBulk(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: (configuration?.basePath || basePath) + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Lists DynamicZoneTemplates
         * @param {string} [includes] Relationships [all] for all [number] for depth of relationships to load or [.] separated relationship names 
         * @param {string} [where] Filter on specific fields. Multiple conditions [.] separated Example: col_like_value.col2__val2
         * @param {string} [whereOr] Filter on specific fields (Chained ors). Multiple conditions [.] separated Example: col_like_value.col2__val2
         * @param {string} [groupBy] Group by field. Multiple conditions [.] separated Example: field1.field2
         * @param {string} [limit] Rows to limit in response (Default: 10,000)
         * @param {number} [page] Pagination page
         * @param {string} [orderBy] Order by [field]
         * @param {string} [orderDirection] Order by field direction
         * @param {string} [select] Column names [.] separated to fetch specific fields in response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listDynamicZoneTemplates(includes?: string, where?: string, whereOr?: string, groupBy?: string, limit?: string, page?: number, orderBy?: string, orderDirection?: string, select?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ModelsDynamicZoneTemplate>>> {
            const localVarAxiosArgs = await DynamicZoneTemplateApiAxiosParamCreator(configuration).listDynamicZoneTemplates(includes, where, whereOr, groupBy, limit, page, orderBy, orderDirection, select, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: (configuration?.basePath || basePath) + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Updates DynamicZoneTemplate
         * @param {number} id Id
         * @param {ModelsDynamicZoneTemplate} dynamicZoneTemplate DynamicZoneTemplate
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateDynamicZoneTemplate(id: number, dynamicZoneTemplate: ModelsDynamicZoneTemplate, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ModelsDynamicZoneTemplate>>> {
            const localVarAxiosArgs = await DynamicZoneTemplateApiAxiosParamCreator(configuration).updateDynamicZoneTemplate(id, dynamicZoneTemplate, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: (configuration?.basePath || basePath) + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * DynamicZoneTemplateApi - factory interface
 * @export
 */
export const DynamicZoneTemplateApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Creates DynamicZoneTemplate
         * @param {ModelsDynamicZoneTemplate} dynamicZoneTemplate DynamicZoneTemplate
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createDynamicZoneTemplate(dynamicZoneTemplate: ModelsDynamicZoneTemplate, options?: any): AxiosPromise<Array<ModelsDynamicZoneTemplate>> {
            return DynamicZoneTemplateApiFp(configuration).createDynamicZoneTemplate(dynamicZoneTemplate, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Deletes DynamicZoneTemplate
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteDynamicZoneTemplate(id: number, options?: any): AxiosPromise<string> {
            return DynamicZoneTemplateApiFp(configuration).deleteDynamicZoneTemplate(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Gets DynamicZoneTemplate
         * @param {number} id Id
         * @param {string} [includes] Relationships [all] for all [number] for depth of relationships to load or [.] separated relationship names 
         * @param {string} [select] Column names [.] separated to fetch specific fields in response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDynamicZoneTemplate(id: number, includes?: string, select?: string, options?: any): AxiosPromise<Array<ModelsDynamicZoneTemplate>> {
            return DynamicZoneTemplateApiFp(configuration).getDynamicZoneTemplate(id, includes, select, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Gets DynamicZoneTemplates in bulk
         * @param {CrudcontrollersBulkFetchByIdsGetRequest} body body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDynamicZoneTemplatesBulk(body: CrudcontrollersBulkFetchByIdsGetRequest, options?: any): AxiosPromise<Array<ModelsDynamicZoneTemplate>> {
            return DynamicZoneTemplateApiFp(configuration).getDynamicZoneTemplatesBulk(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Lists DynamicZoneTemplates
         * @param {string} [includes] Relationships [all] for all [number] for depth of relationships to load or [.] separated relationship names 
         * @param {string} [where] Filter on specific fields. Multiple conditions [.] separated Example: col_like_value.col2__val2
         * @param {string} [whereOr] Filter on specific fields (Chained ors). Multiple conditions [.] separated Example: col_like_value.col2__val2
         * @param {string} [groupBy] Group by field. Multiple conditions [.] separated Example: field1.field2
         * @param {string} [limit] Rows to limit in response (Default: 10,000)
         * @param {number} [page] Pagination page
         * @param {string} [orderBy] Order by [field]
         * @param {string} [orderDirection] Order by field direction
         * @param {string} [select] Column names [.] separated to fetch specific fields in response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDynamicZoneTemplates(includes?: string, where?: string, whereOr?: string, groupBy?: string, limit?: string, page?: number, orderBy?: string, orderDirection?: string, select?: string, options?: any): AxiosPromise<Array<ModelsDynamicZoneTemplate>> {
            return DynamicZoneTemplateApiFp(configuration).listDynamicZoneTemplates(includes, where, whereOr, groupBy, limit, page, orderBy, orderDirection, select, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Updates DynamicZoneTemplate
         * @param {number} id Id
         * @param {ModelsDynamicZoneTemplate} dynamicZoneTemplate DynamicZoneTemplate
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateDynamicZoneTemplate(id: number, dynamicZoneTemplate: ModelsDynamicZoneTemplate, options?: any): AxiosPromise<Array<ModelsDynamicZoneTemplate>> {
            return DynamicZoneTemplateApiFp(configuration).updateDynamicZoneTemplate(id, dynamicZoneTemplate, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createDynamicZoneTemplate operation in DynamicZoneTemplateApi.
 * @export
 * @interface DynamicZoneTemplateApiCreateDynamicZoneTemplateRequest
 */
export interface DynamicZoneTemplateApiCreateDynamicZoneTemplateRequest {
    /**
     * DynamicZoneTemplate
     * @type {ModelsDynamicZoneTemplate}
     * @memberof DynamicZoneTemplateApiCreateDynamicZoneTemplate
     */
    readonly dynamicZoneTemplate: ModelsDynamicZoneTemplate
}

/**
 * Request parameters for deleteDynamicZoneTemplate operation in DynamicZoneTemplateApi.
 * @export
 * @interface DynamicZoneTemplateApiDeleteDynamicZoneTemplateRequest
 */
export interface DynamicZoneTemplateApiDeleteDynamicZoneTemplateRequest {
    /**
     * id
     * @type {number}
     * @memberof DynamicZoneTemplateApiDeleteDynamicZoneTemplate
     */
    readonly id: number
}

/**
 * Request parameters for getDynamicZoneTemplate operation in DynamicZoneTemplateApi.
 * @export
 * @interface DynamicZoneTemplateApiGetDynamicZoneTemplateRequest
 */
export interface DynamicZoneTemplateApiGetDynamicZoneTemplateRequest {
    /**
     * Id
     * @type {number}
     * @memberof DynamicZoneTemplateApiGetDynamicZoneTemplate
     */
    readonly id: number

    /**
     * Relationships [all] for all [number] for depth of relationships to load or [.] separated relationship names 
     * @type {string}
     * @memberof DynamicZoneTemplateApiGetDynamicZoneTemplate
     */
    readonly includes?: string

    /**
     * Column names [.] separated to fetch specific fields in response
     * @type {string}
     * @memberof DynamicZoneTemplateApiGetDynamicZoneTemplate
     */
    readonly select?: string
}

/**
 * Request parameters for getDynamicZoneTemplatesBulk operation in DynamicZoneTemplateApi.
 * @export
 * @interface DynamicZoneTemplateApiGetDynamicZoneTemplatesBulkRequest
 */
export interface DynamicZoneTemplateApiGetDynamicZoneTemplatesBulkRequest {
    /**
     * body
     * @type {CrudcontrollersBulkFetchByIdsGetRequest}
     * @memberof DynamicZoneTemplateApiGetDynamicZoneTemplatesBulk
     */
    readonly body: CrudcontrollersBulkFetchByIdsGetRequest
}

/**
 * Request parameters for listDynamicZoneTemplates operation in DynamicZoneTemplateApi.
 * @export
 * @interface DynamicZoneTemplateApiListDynamicZoneTemplatesRequest
 */
export interface DynamicZoneTemplateApiListDynamicZoneTemplatesRequest {
    /**
     * Relationships [all] for all [number] for depth of relationships to load or [.] separated relationship names 
     * @type {string}
     * @memberof DynamicZoneTemplateApiListDynamicZoneTemplates
     */
    readonly includes?: string

    /**
     * Filter on specific fields. Multiple conditions [.] separated Example: col_like_value.col2__val2
     * @type {string}
     * @memberof DynamicZoneTemplateApiListDynamicZoneTemplates
     */
    readonly where?: string

    /**
     * Filter on specific fields (Chained ors). Multiple conditions [.] separated Example: col_like_value.col2__val2
     * @type {string}
     * @memberof DynamicZoneTemplateApiListDynamicZoneTemplates
     */
    readonly whereOr?: string

    /**
     * Group by field. Multiple conditions [.] separated Example: field1.field2
     * @type {string}
     * @memberof DynamicZoneTemplateApiListDynamicZoneTemplates
     */
    readonly groupBy?: string

    /**
     * Rows to limit in response (Default: 10,000)
     * @type {string}
     * @memberof DynamicZoneTemplateApiListDynamicZoneTemplates
     */
    readonly limit?: string

    /**
     * Pagination page
     * @type {number}
     * @memberof DynamicZoneTemplateApiListDynamicZoneTemplates
     */
    readonly page?: number

    /**
     * Order by [field]
     * @type {string}
     * @memberof DynamicZoneTemplateApiListDynamicZoneTemplates
     */
    readonly orderBy?: string

    /**
     * Order by field direction
     * @type {string}
     * @memberof DynamicZoneTemplateApiListDynamicZoneTemplates
     */
    readonly orderDirection?: string

    /**
     * Column names [.] separated to fetch specific fields in response
     * @type {string}
     * @memberof DynamicZoneTemplateApiListDynamicZoneTemplates
     */
    readonly select?: string
}

/**
 * Request parameters for updateDynamicZoneTemplate operation in DynamicZoneTemplateApi.
 * @export
 * @interface DynamicZoneTemplateApiUpdateDynamicZoneTemplateRequest
 */
export interface DynamicZoneTemplateApiUpdateDynamicZoneTemplateRequest {
    /**
     * Id
     * @type {number}
     * @memberof DynamicZoneTemplateApiUpdateDynamicZoneTemplate
     */
    readonly id: number

    /**
     * DynamicZoneTemplate
     * @type {ModelsDynamicZoneTemplate}
     * @memberof DynamicZoneTemplateApiUpdateDynamicZoneTemplate
     */
    readonly dynamicZoneTemplate: ModelsDynamicZoneTemplate
}

/**
 * DynamicZoneTemplateApi - object-oriented interface
 * @export
 * @class DynamicZoneTemplateApi
 * @extends {BaseAPI}
 */
export class DynamicZoneTemplateApi extends BaseAPI {
    /**
     * 
     * @summary Creates DynamicZoneTemplate
     * @param {DynamicZoneTemplateApiCreateDynamicZoneTemplateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DynamicZoneTemplateApi
     */
    public createDynamicZoneTemplate(requestParameters: DynamicZoneTemplateApiCreateDynamicZoneTemplateRequest, options?: any) {
        return DynamicZoneTemplateApiFp(this.configuration).createDynamicZoneTemplate(requestParameters.dynamicZoneTemplate, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Deletes DynamicZoneTemplate
     * @param {DynamicZoneTemplateApiDeleteDynamicZoneTemplateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DynamicZoneTemplateApi
     */
    public deleteDynamicZoneTemplate(requestParameters: DynamicZoneTemplateApiDeleteDynamicZoneTemplateRequest, options?: any) {
        return DynamicZoneTemplateApiFp(this.configuration).deleteDynamicZoneTemplate(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Gets DynamicZoneTemplate
     * @param {DynamicZoneTemplateApiGetDynamicZoneTemplateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DynamicZoneTemplateApi
     */
    public getDynamicZoneTemplate(requestParameters: DynamicZoneTemplateApiGetDynamicZoneTemplateRequest, options?: any) {
        return DynamicZoneTemplateApiFp(this.configuration).getDynamicZoneTemplate(requestParameters.id, requestParameters.includes, requestParameters.select, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Gets DynamicZoneTemplates in bulk
     * @param {DynamicZoneTemplateApiGetDynamicZoneTemplatesBulkRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DynamicZoneTemplateApi
     */
    public getDynamicZoneTemplatesBulk(requestParameters: DynamicZoneTemplateApiGetDynamicZoneTemplatesBulkRequest, options?: any) {
        return DynamicZoneTemplateApiFp(this.configuration).getDynamicZoneTemplatesBulk(requestParameters.body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Lists DynamicZoneTemplates
     * @param {DynamicZoneTemplateApiListDynamicZoneTemplatesRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DynamicZoneTemplateApi
     */
    public listDynamicZoneTemplates(requestParameters: DynamicZoneTemplateApiListDynamicZoneTemplatesRequest = {}, options?: any) {
        return DynamicZoneTemplateApiFp(this.configuration).listDynamicZoneTemplates(requestParameters.includes, requestParameters.where, requestParameters.whereOr, requestParameters.groupBy, requestParameters.limit, requestParameters.page, requestParameters.orderBy, requestParameters.orderDirection, requestParameters.select, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Updates DynamicZoneTemplate
     * @param {DynamicZoneTemplateApiUpdateDynamicZoneTemplateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DynamicZoneTemplateApi
     */
    public updateDynamicZoneTemplate(requestParameters: DynamicZoneTemplateApiUpdateDynamicZoneTemplateRequest, options?: any) {
        return DynamicZoneTemplateApiFp(this.configuration).updateDynamicZoneTemplate(requestParameters.id, requestParameters.dynamicZoneTemplate, options).then((request) => request(this.axios, this.basePath));
    }
}
