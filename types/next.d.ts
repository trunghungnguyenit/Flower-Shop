declare module 'next/image' {
  import { ComponentType } from 'react'
  const Image: ComponentType<any>
  export default Image
}

declare module 'next/link' {
  import { ComponentType } from 'react'
  const Link: ComponentType<any>
  export default Link
}

declare module 'next/navigation' {
  export function notFound(): never
  export function useParams(): any
  export function useRouter(): any
  export function useSearchParams(): any
  export function usePathname(): string
}