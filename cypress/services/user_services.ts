import APIClient from "../api/apiclient";
import { ApiConstant } from "../constant/api_constant";
import { GetCurrentUserInfoResponse } from "../data-object/services_objects/response/get_current_user_info_response";
import { LikedPhotosResponse } from "../data-object/services_objects/response/like_photo_response";


export class UserServices {
    private apiClient: APIClient

    constructor() {
        this.apiClient = new APIClient(ApiConstant.API_URL)
    }

    getUserLikedPhotos(username: string, page: number = 1, perPage: number = 10): Cypress.Chainable<Cypress.Response<LikedPhotosResponse>> {
        return this.apiClient
            .createRequest(`/users/${username}/likes`)
            .addHeaderBearerToken(ApiConstant.ACCESS_TOKEN)
            .addContentTypeHeader('application/json')
            .addParam('page', page.toString())
            .addParam('per_page', perPage.toString())
            .executeGet<LikedPhotosResponse>()
    }

    getCurrentUserInfo(): Cypress.Chainable<Cypress.Response<GetCurrentUserInfoResponse>> {
        return this.apiClient
            .createRequest('/me')
            .addHeaderBearerToken(ApiConstant.ACCESS_TOKEN)
            .addContentTypeHeader('application/json')
            .executeGet<GetCurrentUserInfoResponse>()
    }

    getUsername(): Cypress.Chainable<any>{
        return this.getCurrentUserInfo().then(response => {
            const username = response.body.username
            return username
        });
    }
}
