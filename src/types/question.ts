export interface Question {
  question: string
  answers: Array<Answer>
}

export interface Answer {
  answer: string
  is_answer_correct: boolean
  checked: boolean
}
