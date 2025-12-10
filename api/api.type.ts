export interface ImageData {
  url: string
}

export type SuKien = string

export interface SanPham {
  id: string 
  documentId?: string
  TenHoa: string
  MoTa?: string
  Gia: number | string
  slug?: string
  image?: string[] | ImageData[] | null
  loai_hoa?: string
  su_kiens?: SuKien[]
  [k: string]: any
}
