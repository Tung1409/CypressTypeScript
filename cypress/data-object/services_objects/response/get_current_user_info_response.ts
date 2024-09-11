export interface GetCurrentUserInfoResponse {
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
    links: Links
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
    followed_by_user: boolean
    photos: any[]
    badge: any
    tags: Tags
    followers_count: number
    following_count: number
    allow_messages: boolean
    numeric_id: number
    downloads: number
    meta: Meta
    uid: string
    confirmed: boolean
    uploads_remaining: number
    unlimited_uploads: boolean
    email: string
    dmca_verification: string
    unread_in_app_notifications: boolean
    unread_highlight_notifications: boolean
  }
  
  export interface Links {
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
  
  export interface Tags {
    custom: any[]
    aggregated: any[]
  }
  
  export interface Meta {
    index: boolean
  }
  