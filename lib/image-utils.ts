/**
 * Validates and returns a safe image source URL
 * @param src - The image source to validate
 * @param fallback - The fallback image URL
 * @returns A valid image URL
 */
export function getSafeImageSrc(src: string | undefined | null, fallback: string): string {
  if (!src || typeof src !== 'string' || src.trim() === '') {
    return fallback
  }
  return src.trim()
}

/**
 * Validates and returns a safe alt text
 * @param alt - The alt text to validate
 * @param fallback - The fallback alt text
 * @returns A valid alt text
 */
export function getSafeAltText(alt: string | undefined | null, fallback: string): string {
  if (!alt || typeof alt !== 'string' || alt.trim() === '') {
    return fallback
  }
  return alt.trim()
}