import traceService from '@services/traceService';

export default class newsApiServiceFactory {
    createService (httpMethod) {
        switch (httpMethod) {
            case 'POST':
                return this.getService('POST');
            case 'PUT':
                return this.getService('PUT');
            case 'GET':
                return this.getService('GET');

            default: return this.getService('GET');
        }
    }

    getService(httpMethod){
        const trace = new traceService(httpMethod);
        return trace.getNewsApiService();
    }
};