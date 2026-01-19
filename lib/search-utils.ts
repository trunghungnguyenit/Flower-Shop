/**
 * Search utilities for product search functionality
 */

// Vietnamese diacritics removal mapping
const VIETNAMESE_MAP: Record<string, string> = {
  'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
  'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
  'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
  'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
  'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
  'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
  'đ': 'd',
  'À': 'A', 'Á': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ã': 'A', 'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A',
  'È': 'E', 'É': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E',
  'Ì': 'I', 'Í': 'I', 'Ị': 'I', 'Ỉ': 'I', 'Ĩ': 'I',
  'Ò': 'O', 'Ó': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O', 'Ỡ': 'O',
  'Ù': 'U', 'Ú': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ử': 'U', 'Ữ': 'U',
  'Ỳ': 'Y', 'Ý': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
  'Đ': 'D'
}

/**
 * Normalize Vietnamese text by removing diacritics, converting to lowercase, and trimming
 */
export function normalizeVietnamese(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .split('')
    .map(char => VIETNAMESE_MAP[char] || char)
    .join('')
}

/**
 * Keyword to occasion mapping
 */
export const OCCASION_KEYWORDS: Record<string, string[]> = {
  'sinh-nhat': ['sinh nhat', 'sinh nhật', 'birthday', 'happy birthday'],
  'tinh-yeu': ['tinh yeu', 'tình yêu', 'nguoi yeu', 'người yêu', 'valentine', 'love'],
  'cuoi': ['cuoi', 'cưới', 'wedding', 'dam cuoi', 'đám cưới'],
  'chia-buon': ['chia buon', 'chia buồn', 'tang le', 'tang lễ', 'condolence'],
  'khai-truong': ['khai truong', 'khai trương', 'opening', 'mo cua hang', 'mở cửa hàng'],
  'tet': ['tet', 'tết', 'new year', 'nam moi', 'năm mới'],
  'trang-tri': ['trang tri', 'trang trí', 'decoration', 'decor'],
  'su-kien': ['su kien', 'sự kiện', 'event', 'hoi nghi', 'hội nghị']
}

/**
 * Keyword to gift guide mapping
 */
export const GIFT_GUIDE_KEYWORDS: Record<string, string[]> = {
  'me': ['me', 'mẹ', 'mama', 'mom', 'mother', 'tang me', 'tặng mẹ'],
  'nguoi-yeu': ['nguoi yeu', 'người yêu', 'ban gai', 'bạn gái', 'ban trai', 'bạn trai', 'lover', 'girlfriend', 'boyfriend'],
  'sep': ['sep', 'sếp', 'boss', 'quan ly', 'quản lý', 'chu tich', 'chủ tịch'],
  'ban-than': ['ban than', 'bạn thân', 'ban be', 'bạn bè', 'friend', 'bestie'],
  'vo-chong': ['vo chong', 'vợ chồng', 'vo', 'vợ', 'chong', 'chồng', 'wife', 'husband', 'spouse']
}

/**
 * Parse price from search query
 */
export function parsePriceFromQuery(query: string): { maxPrice?: number; hasPrice: boolean } {
  const normalizedQuery = normalizeVietnamese(query)
  
  // Match patterns like "500k", "1 trieu", "duoi 500k", etc.
  const pricePatterns = [
    /(\d+)\s*k(?:\s|$)/i,           // 500k
    /(\d+)\s*(?:trieu|tr)(?:\s|$)/i, // 1 trieu, 1tr
    /duoi\s+(\d+)\s*k/i,            // duoi 500k
    /duoi\s+(\d+)\s*(?:trieu|tr)/i, // duoi 1 trieu
    /tren\s+(\d+)\s*k/i,            // tren 500k (not implemented but parsed)
    /tren\s+(\d+)\s*(?:trieu|tr)/i  // tren 1 trieu (not implemented but parsed)
  ]

  for (const pattern of pricePatterns) {
    const match = normalizedQuery.match(pattern)
    if (match) {
      const value = parseInt(match[1])
      if (pattern.source.includes('trieu') || pattern.source.includes('tr')) {
        return { maxPrice: value * 1000000, hasPrice: true }
      } else {
        return { maxPrice: value * 1000, hasPrice: true }
      }
    }
  }

  return { hasPrice: false }
}

/**
 * Find matching occasion IDs from query
 */
export function findMatchingOccasions(normalizedQuery: string): string[] {
  const matches: string[] = []
  
  for (const [occasionId, keywords] of Object.entries(OCCASION_KEYWORDS)) {
    for (const keyword of keywords) {
      const normalizedKeyword = normalizeVietnamese(keyword)
      if (normalizedQuery.includes(normalizedKeyword)) {
        matches.push(occasionId)
        break // Only add once per occasion
      }
    }
  }
  
  return matches
}

/**
 * Find matching gift guide IDs from query
 */
export function findMatchingGiftGuides(normalizedQuery: string): string[] {
  const matches: string[] = []
  
  for (const [giftGuideId, keywords] of Object.entries(GIFT_GUIDE_KEYWORDS)) {
    for (const keyword of keywords) {
      const normalizedKeyword = normalizeVietnamese(keyword)
      if (normalizedQuery.includes(normalizedKeyword)) {
        matches.push(giftGuideId)
        break // Only add once per gift guide
      }
    }
  }
  
  return matches
}