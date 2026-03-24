import { createQuestionFormSchema } from "@/schemas/question-form"
import type { Question } from "@/types/question"
import testData from "@/utils/test.json"

import { describe, expect, it } from "vitest"

const questions = testData.questions as Array<Question>

describe("test.json — šema za sva učitana pitanja", () => {
  it("svako pitanje ima bar jedan odgovor", () => {
    for (const q of questions) {
      expect(q.answers.length).toBeGreaterThan(0)
    }
  })

  it.each(questions.map((q, i) => [i, q] as const))(
    "pitanje #%i: tačna kombinacija iz JSON-a prolazi validaciju",
    (_i, q) => {
      const schema = createQuestionFormSchema(q)
      const selected = q.answers.map((a) => a.is_answer_correct)
      const result = schema.safeParse({ selected })
      expect(result.success).toBe(true)
    },
  )
})
