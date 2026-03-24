import type { Question } from "@/types/question"

/** Jedan tačan, ostali netačni (klasično jednokratno pitanje). */
export const singleCorrectQuestion: Question = {
  question: "Jedan tačan odgovor",
  answers: [
    { answer: "Tačno", is_answer_correct: true, checked: false },
    { answer: "Netačno A", is_answer_correct: false, checked: false },
    { answer: "Netačno B", is_answer_correct: false, checked: false },
    { answer: "Netačno C", is_answer_correct: false, checked: false },
  ],
}

/** Svi odgovori su tačni (mora se označiti sve). */
export const allAnswersCorrectQuestion: Question = {
  question: "Svi su tačni",
  answers: [
    { answer: "A", is_answer_correct: true, checked: false },
    { answer: "B", is_answer_correct: true, checked: false },
    { answer: "C", is_answer_correct: true, checked: false },
  ],
}

/** Više tačnih i jedan netačan (tipično „označite sve tačne”). */
export const multipleCorrectWithOneWrongQuestion: Question = {
  question: "Mešovito",
  answers: [
    { answer: "Tačno 1", is_answer_correct: true, checked: false },
    { answer: "Tačno 2", is_answer_correct: true, checked: false },
    { answer: "Netačno", is_answer_correct: false, checked: false },
  ],
}

/** Samo netačni odgovori u ključu (nijedan true u podacima) — korisnik ne može tačno da potvrdi izborom. */
export const noCorrectAnswerInDataQuestion: Question = {
  question: "Svi netačni u JSON-u",
  answers: [
    { answer: "X", is_answer_correct: false, checked: false },
    { answer: "Y", is_answer_correct: false, checked: false },
  ],
}
