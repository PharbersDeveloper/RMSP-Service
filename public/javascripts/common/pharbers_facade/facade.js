var Facade = function () {
    this.validationModule = new ValidateHandler();
    this.ajaxModule =  new AjaxCall();
    this.cookieModule = new CookieHandler();
    this.parameterPrefixModule = new ParameterPrefix();
    this.thousandsModule = new Thousands();
    this.alert = new Alert();
};
