import APIClient from "../api/apiclient";
import { ApiConstant } from "../constant/api_constant";
import { GetRandomPhotosResponse } from "../data-object/services_objects/response/get_random_photos_response";

export class PhotoServices {
    private apiClient: APIClient

    constructor() {
        this.apiClient = new APIClient(ApiConstant.API_URL)
    }

    unlikePhoto(photoId: string): Cypress.Chainable<Cypress.Response<any>> {
        return this.apiClient
            .createRequest(`/photos/${photoId}/like`)
            .addHeaderBearerToken(ApiConstant.ACCESS_TOKEN)
            .addContentTypeHeader('application/json')
            .executeDelete<any>()
    }

    getRandomPhoto(numberOfPhoto: string): Cypress.Chainable<Cypress.Response<GetRandomPhotosResponse>> {
        return this.apiClient
            .createRequest(`/photos/random`)
            .addHeaderBearerToken(ApiConstant.ACCESS_TOKEN)
            .addContentTypeHeader('application/json')
            .addParam('count', numberOfPhoto)
            .executeGet<GetRandomPhotosResponse>()
    }
}
