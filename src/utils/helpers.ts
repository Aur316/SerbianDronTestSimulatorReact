import type { Question } from "@/types/question"
import { INDEX_STORAGE_KEY } from "@/utils/constants"

const shuffleInPlace = <T>(items: Array<T>): void => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
}

export const shuffleAnswersOrder = (
  questions: Array<Question>,
): Array<Question> =>
  questions.map((q) => {
    const answers = q.answers.map((a) => ({ ...a }))
    shuffleInPlace(answers)
    return { ...q, answers }
  })

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
