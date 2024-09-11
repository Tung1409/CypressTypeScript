import APIClient from "../api/apiclient";
import { ApiConstant } from "../constant/api_constant";
import { CreateCollectionResponse } from "../data-object/services_objects/response/create_collection_response";

export class CollectionServices {
    private apiClient: APIClient

    constructor() {
        this.apiClient = new APIClient(ApiConstant.API_URL)
    }

    createNewCollection(
        title: string, 
        { description = 'default description', isPrivate = false }: { description?: string, isPrivate?: boolean } = {}
    ): Cypress.Chainable<Cypress.Response<CreateCollectionResponse>> {
        const request = this.apiClient
            .createRequest(`/collections`)
            .addHeaderBearerToken(ApiConstant.ACCESS_TOKEN)
            .addContentTypeHeader('application/json')
            .addParam('title', title)
    
        if (description !== 'default description') {
            request.addParam('description', description)
        }
        if (isPrivate) {
            request.addParam('private', isPrivate)
        }
    
        return request.executePost<CreateCollectionResponse>()
    }

    deleteCollection(collectionId: string): Cypress.Chainable<Cypress.Response<any>>{
        return this.apiClient
            .createRequest(`/collections/${collectionId}`)
            .addHeaderBearerToken(ApiConstant.ACCESS_TOKEN)
            .addContentTypeHeader('application/json')
            .executeDelete<any>()
    }

    addPhotoIntoCollection(collectionId: string, photoId: string): Cypress.Chainable<Cypress.Response<any>>{
        return this.apiClient
            .createRequest(`/collections/${collectionId}/add`)
            .addHeaderBearerToken(ApiConstant.ACCESS_TOKEN)
            .addContentTypeHeader('application/json')
            .addParam('photo_id', photoId)
            .executePost<any>()
    }
}
