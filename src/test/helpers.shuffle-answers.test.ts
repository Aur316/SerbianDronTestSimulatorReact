import { describe, expect, it } from "vitest"

import { multipleCorrectWithOneWrongQuestion } from "@/test/fixtures/questions"
import { shuffleAnswersOrder } from "@/utils/helpers"

describe("shuffleAnswersOrder", () => {
  it("čuva dužinu i broj tačnih odgovora po pitanju", () => {
    const input = [multipleCorrectWithOneWrongQuestion]
    const out = shuffleAnswersOrder(input)

    expect(out).toHaveLength(1)
    expect(out[0].answers).toHaveLength(
      multipleCorrectWithOneWrongQuestion.answers.length,
    )

    const countCorrect = (a: (typeof out)[0]["answers"]) =>
      a.filter((x) => x.is_answer_correct).length

    expect(countCorrect(out[0].answers)).toBe(
      countCorrect(multipleCorrectWithOneWrongQuestion.answers),
    )
  })

  it("ne mutira ulazni niz pitanja", () => {
    const input = [multipleCorrectWithOneWrongQuestion]
    const before = JSON.stringify(input)
    shuffleAnswersOrder(input)
    expect(JSON.stringify(input)).toBe(before)
  })
})
