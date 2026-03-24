import { INDEX_STORAGE_KEY } from "@/utils/constants"

export const readStoredIndex = (total: number): number => {
  if (total === 0) {
    return 0
  }
  try {
    const raw = localStorage.getItem(INDEX_STORAGE_KEY)
    if (raw === null) {
      return 0
    }
    const n = Number.parseInt(raw, 10)
    if (!Number.isFinite(n) || n < 0) {
      return 0
    }
    if (n > total) {
      return total
    }
    return n
  } catch {
    return 0
  }
}
