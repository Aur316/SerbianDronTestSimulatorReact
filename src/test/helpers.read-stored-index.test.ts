import { INDEX_STORAGE_KEY } from "@/utils/constants"
import { readStoredIndex } from "@/utils/helpers"

import { beforeEach, describe, expect, it } from "vitest"

describe("readStoredIndex", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("vraća 0 kada je total 0", () => {
    expect(readStoredIndex(0)).toBe(0)
  })

  it("vraća 0 kada nema vrednosti u localStorage", () => {
    expect(readStoredIndex(50)).toBe(0)
  })

  it("čita sačuvani indeks", () => {
    localStorage.setItem(INDEX_STORAGE_KEY, "7")
    expect(readStoredIndex(50)).toBe(7)
  })

  it("ograničava na total kada je sačuvana vrednost veća", () => {
    localStorage.setItem(INDEX_STORAGE_KEY, "999")
    expect(readStoredIndex(50)).toBe(50)
  })

  it("vraća 0 za nevalidan string", () => {
    localStorage.setItem(INDEX_STORAGE_KEY, "nije-broj")
    expect(readStoredIndex(50)).toBe(0)
  })

  it("vraća 0 za negativan broj", () => {
    localStorage.setItem(INDEX_STORAGE_KEY, "-3")
    expect(readStoredIndex(50)).toBe(0)
  })
})
