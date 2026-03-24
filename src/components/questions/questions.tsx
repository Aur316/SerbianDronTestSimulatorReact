import {
  QuestionForm,
  type QuestionFormHandle,
} from "@/components/question-form/question-form"
import { QuestionLayout } from "@/components/question-layout/question-layout"
import { Button } from "@/components/ui/button"
import type { Question } from "@/types/question"
import testData from "@/utils/test.json"

import { useRef, useState } from "react"

const questions = testData.questions as Array<Question>

export const Questions = () => {
  const [index, setIndex] = useState(0)
  const formRef = useRef<QuestionFormHandle>(null)

  if (!questions.length) {
    return (
      <div className="text-muted-foreground flex min-h-screen items-center justify-center p-8">
        Nema učitanih pitanja.
      </div>
    )
  }

  const atEnd = index >= questions.length

  if (atEnd) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-6 p-8 text-center">
        <p className="text-lg font-medium">Završili ste sva pitanja.</p>
        <Button type="button" onClick={() => setIndex(0)}>
          Počni iznova
        </Button>
      </div>
    )
  }

  const question = questions[index]
  return (
    <QuestionLayout
      currentIndex={index}
      total={questions.length}
      isFirst={index === 0}
      onPrev={() => setIndex((i) => Math.max(0, i - 1))}
      onNext={() => formRef.current?.submitNext()}
      onSkip={() => setIndex((i) => Math.min(questions.length, i + 1))}
      onRestart={() => setIndex(0)}
    >
      <QuestionForm
        ref={formRef}
        key={index}
        question={question}
        onProceed={() => setIndex((i) => i + 1)}
      />
    </QuestionLayout>
  )
}
