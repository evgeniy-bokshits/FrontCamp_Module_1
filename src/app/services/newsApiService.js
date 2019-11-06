import configuration from '@infrastructure/configuration';

export default class newsApiService {
    constructor(httpMethod) {
        this.baseUrl = configuration.baseUrl;
        this.apiKey = configuration.apiKey;
        this.httpMethod = httpMethod;
    }

    async getTopNewsForCountry (country) {
        const url = `${this.baseUrl}${configuration.endpoints.topheadlines}?` +
			  `country=${country}&` +
              `apiKey=${this.apiKey}`;
              
        return await this.fetchTopNewsByUrl(url);
    };
    
    async fetchTopNewsByUrl(url) {
        let response;
        try {
            // throw new Error('test handle exception');
            response = await fetch(url);
        } catch (error) {
            await this.handleError(error);
        }

        return await response.json(); 
    };

    async handleError(error) {
        await import('@services/errorHandlerService').then(errorHandlerService => {
            let errorHandler = new errorHandlerService.default(error);
            errorHandler.showError();
        });
        
    }
};