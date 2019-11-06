export default class errorHandlerService {
    constructor(errorMessage = '') {
        if (typeof errorHandlerService.instance === 'object'){
            return errorHandlerService.instance;
        }
        errorHandlerService.instance = this;

        this.errorMessage = errorMessage;

        return this;
    };

    getErrorMessage() {
        return this.errorMessage;
    };

    setErrorMessage(errorMessage = '') {
        this.errorMessage = errorMessage;
    };

    showError() {
        alert(this.errorMessage);
    }
}