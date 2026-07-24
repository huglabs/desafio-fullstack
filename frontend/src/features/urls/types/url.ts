export interface Url {
  id: number
  original_url: string
  slug: string
  short_url: string
  expires_at: string | null
  has_password: boolean
  created_at: string
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number | null
  to: number | null
}

export interface UrlListResponse {
  data: Url[]
  meta: PaginationMeta
}

export interface UrlResponse {
  data: Url
}

export interface CreateUrlPayload {
  original_url: string
  expires_at?: string | null
  password?: string | null
}

export interface ListUrlsParams {
  page?: number
  per_page?: number
  refresh?: boolean
}
