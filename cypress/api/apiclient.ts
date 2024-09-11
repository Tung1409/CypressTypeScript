export default class APIClient {
  private baseUrl: string;
  private endpoint: string = '';
  private headers: { [key: string]: string } = {};
  private body: any = null;
  private params: { [key: string]: any } = {};

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public createRequest(endpoint: string): this {
    this.endpoint = endpoint
    return this;
  }

  private constructUrl(): string {
    const url = `${this.baseUrl}${this.endpoint}`;
    console.log(`Constructed URL: ${url}`);
    return url;
  }

  public addHeader(name: string, value: string): this {
    this.headers[name] = value;
    return this;
  }

  public addContentTypeHeader(value: string): this {
    this.headers['Content-Type'] = value;
    return this;
  }

  public addHeaderBearerToken(token: string): this {
    return this.addHeader('Authorization', `Bearer ${token}`);
  }

  public addBody(data: any): this {
    this.body = data;
    return this;
  }

  public addParam(name: string, value: any): this {
    this.params[name] = value;
    return this;
  }

  public executeGet<T>(): Cypress.Chainable<Cypress.Response<T>> {
    const params = { ...this.params }; 
    this.params = {}; 
    return cy.request<T>({
      method: 'GET',
      url: this.constructUrl(),
      headers: this.headers,
      qs: params,
    });
  }

  public executePost<T>(): Cypress.Chainable<Cypress.Response<T>> {
    const params = { ...this.params }; 
    this.params = {};
    return cy.request<T>({
      method: 'POST',
      url: this.constructUrl(),
      headers: this.headers,
      body: this.body,
      qs: params,
    });
  }

  public executePut<T>(): Cypress.Chainable<Cypress.Response<T>> {
    const params = { ...this.params }; 
    this.params = {};
    return cy.request<T>({
      method: 'PUT',
      url: this.constructUrl(),
      headers: this.headers,
      body: this.body,
      qs: params,
    });
  }

  public executeDelete<T>(): Cypress.Chainable<Cypress.Response<T>> {
    const params = { ...this.params }; 
    this.params = {};
    return cy.request<T>({
      method: 'DELETE',
      url: this.constructUrl(),
      headers: this.headers,
      body: this.body,
      qs: params,
    });
  }
}
