export interface PostResponse {
  complete: boolean
  id?: number
  authorId?: number
  postDate?: Date
  postLink?: string
  postTitle?: string
  postContent?: string
  postExcerpt?: string
  postStatus?: string
  postModified?: Date
  postPicture?: string
}
