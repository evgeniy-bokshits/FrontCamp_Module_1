import configuration from '@infrastructure/configuration';

export default class newsApiService {
    constructor() {
        this.baseUrl = configuration.baseUrl;
        this.apiKey = configuration.apiKey;
    }

    async getTopNewsForCountry (country) {
        const url = `${this.baseUrl}${configuration.endpoints.topheadlines}?` +
			  `country=${country}&` +
			  `apiKey=${this.apiKey}`;
        const response = await fetch(url);
        return await response.json();
    }  
};