import { useEffect, useRef, useState } from "react"

import {
  QuestionForm,
  type QuestionFormHandle,
} from "@/components/question-form/question-form"
import { QuestionLayout } from "@/components/question-layout/question-layout"
import { Button } from "@/components/ui/button"
import type { Question } from "@/types/question"
import { INDEX_STORAGE_KEY } from "@/utils/constants"
import { readStoredIndex, shuffleAnswersOrder } from "@/utils/helpers"
import testData from "@/utils/test.json"

const questions = shuffleAnswersOrder(testData.questions as Array<Question>)

export const Questions = () => {
  const [index, setIndex] = useState(() => readStoredIndex(questions.length))
  const formRef = useRef<QuestionFormHandle>(null)

  useEffect(() => {
    try {
      localStorage.setItem(INDEX_STORAGE_KEY, String(index))
    } catch {
      // ignore (private mode, quota, etc.)
    }
  }, [index])

  if (!questions.length) {
    return (
      <div className="text-muted-foreground flex min-h-0 flex-1 flex-col items-center justify-center p-8">
        Nema učitanih pitanja.
      </div>
    )
  }

  const atEnd = index >= questions.length

  if (atEnd) {
    return (
      <div className="mx-auto flex min-h-0 max-w-md flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
        <div className="flex size-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-4xl">
          ✓
        </div>
        <div className="space-y-2">
          <p className="text-foreground text-2xl font-semibold">Čestitamo!</p>
          <p className="text-muted-foreground">Završili ste sva pitanja.</p>
        </div>
        <Button
          type="button"
          onClick={() => setIndex(0)}
          size="lg"
          className="mt-2"
        >
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
