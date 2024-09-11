export interface CreateCollectionResponse {
    id: string
    title: string
    description: any
    published_at: string
    last_collected_at: string
    updated_at: string
    featured: boolean
    total_photos: number
    private: boolean
    share_key: string
    tags: any[]
    links: Links
    user: User
    cover_photo: any
    preview_photos: any
  }
  
  export interface Links {
    self: string
    html: string
    photos: string
    related: string
  }
  
  export interface User {
    id: string
    updated_at: string
    username: string
    name: string
    first_name: string
    last_name: string
    twitter_username: any
    portfolio_url: any
    bio: any
    location: any
    links: Links2
    profile_image: ProfileImage
    instagram_username: any
    total_collections: number
    total_likes: number
    total_photos: number
    total_promoted_photos: number
    total_illustrations: number
    total_promoted_illustrations: number
    accepted_tos: boolean
    for_hire: boolean
    social: Social
  }
  
  export interface Links2 {
    self: string
    html: string
    photos: string
    likes: string
    portfolio: string
    following: string
    followers: string
  }
  
  export interface ProfileImage {
    small: string
    medium: string
    large: string
  }
  
  export interface Social {
    instagram_username: any
    portfolio_url: any
    twitter_username: any
    paypal_email: any
  }
  