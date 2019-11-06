import newsApiService from '@services/newsApiService';

export default class traceService {
    constructor(httpMethod) {
        const service = new newsApiService(httpMethod);
        this.service = service;
    }

    traceMethodCalls(service) {
        let handler = {
            get(target, propKey) {
                const origMethod = target[propKey];

                return function (...args) {
                    let result = origMethod.apply(target, args);
                    console.log(`[TRACE]: ${propKey + JSON.stringify(args)} was called`);
                    return result;
                };
            }
        };
        return new Proxy(service, handler);
    }

    getNewsApiService() {
        return this.traceMethodCalls(this.service);
    }

}