import { createQuestionFormSchema } from "@/schemas/question-form"
import type { Question } from "@/types/question"
import {
  allAnswersCorrectQuestion,
  multipleCorrectWithOneWrongQuestion,
  noCorrectAnswerInDataQuestion,
  singleCorrectQuestion,
} from "@/test/fixtures/questions"

import { describe, expect, it } from "vitest"

function parse(
  question: Question,
  selected: Array<boolean>,
): ReturnType<ReturnType<typeof createQuestionFormSchema>["safeParse"]> {
  return createQuestionFormSchema(question).safeParse({ selected })
}

function expectMessages(
  result: ReturnType<ReturnType<typeof createQuestionFormSchema>["safeParse"]>,
  ...messages: Array<string>
) {
  expect(result.success).toBe(false)
  if (result.success) {
    return
  }
  const set = new Set(result.error.issues.map((i) => i.message))
  for (const m of messages) {
    expect(set.has(m)).toBe(true)
  }
}

describe("createQuestionFormSchema — jedan tačan odgovor", () => {
  it("prihvata samo tačnu kombinaciju (jedan označen)", () => {
    const r = parse(singleCorrectQuestion, [true, false, false, false])
    expect(r.success).toBe(true)
  })

  it("odbija kada je označen netačan umesto tačnog", () => {
    const r = parse(singleCorrectQuestion, [false, true, false, false])
    expectMessages(r, "Odgovor nije tačan.")
  })

  it("odbija kada su označena dva (višak)", () => {
    const r = parse(singleCorrectQuestion, [true, true, false, false])
    expectMessages(r, "Odgovor nije tačan.")
  })

  it("odbija prazan izbor", () => {
    const r = parse(singleCorrectQuestion, [false, false, false, false])
    expectMessages(r, "Izaberite bar jedan odgovor.")
  })
})

describe("createQuestionFormSchema — svi odgovori su tačni", () => {
  it("prihvata kada su sva tri označena", () => {
    const r = parse(allAnswersCorrectQuestion, [true, true, true])
    expect(r.success).toBe(true)
  })

  it("odbija kada fali jedan tačan", () => {
    const r = parse(allAnswersCorrectQuestion, [true, false, true])
    expectMessages(r, "Odgovor nije tačan.")
  })

  it("odbija kada je samo jedan označen", () => {
    const r = parse(allAnswersCorrectQuestion, [true, false, false])
    expectMessages(r, "Odgovor nije tačan.")
  })
})

describe("createQuestionFormSchema — više tačnih + jedan netačan", () => {
  it("prihvata tačnu kombinaciju (oba tačna, netačan neoznačen)", () => {
    const r = parse(multipleCorrectWithOneWrongQuestion, [true, true, false])
    expect(r.success).toBe(true)
  })

  it("odbija kada je netačan takođe označen", () => {
    const r = parse(multipleCorrectWithOneWrongQuestion, [true, true, true])
    expectMessages(r, "Odgovor nije tačan.")
  })

  it("odbija kada fali jedan od tačnih", () => {
    const r = parse(multipleCorrectWithOneWrongQuestion, [true, false, false])
    expectMessages(r, "Odgovor nije tačan.")
  })
})

describe("createQuestionFormSchema — ivice", () => {
  it("odbija kada broj oznaka ne odgovara broju odgovora", () => {
    const r = parse(singleCorrectQuestion, [true, false])
    expectMessages(r, "Neispravan broj odgovora.")
  })

  it("kada u podacima nema tačnog odgovora, prazan izbor daje „bar jedan”", () => {
    const r = parse(noCorrectAnswerInDataQuestion, [false, false])
    expectMessages(r, "Izaberite bar jedan odgovor.")
  })

  it("kada u podacima nema tačnog odgovora, bilo koji izbor je netačan", () => {
    const r = parse(noCorrectAnswerInDataQuestion, [true, false])
    expectMessages(r, "Odgovor nije tačan.")
  })
})
