import type { Question } from "@/types/question"

import * as z from "zod"

export interface QuestionFormValues {
  selected: Array<boolean>
}

export function createQuestionFormSchema(question: Question) {
  return z
    .object({
      selected: z.array(z.boolean()),
    })
    .superRefine((val, ctx) => {
      if (val.selected.length !== question.answers.length) {
        ctx.addIssue({
          code: "custom",
          message: "Neispravan broj odgovora.",
          path: ["selected"],
        })
        return
      }
      if (!val.selected.some(Boolean)) {
        ctx.addIssue({
          code: "custom",
          message: "Izaberite bar jedan odgovor.",
          path: ["selected"],
        })
        return
      }
      const matches = question.answers.every(
        (a, i) => val.selected[i] === a.is_answer_correct,
      )
      if (!matches) {
        ctx.addIssue({
          code: "custom",
          message: "Odgovor nije tačan.",
          path: ["selected"],
        })
      }
    })
}
