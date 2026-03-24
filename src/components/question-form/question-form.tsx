import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import {
  createQuestionFormSchema,
  type QuestionFormValues,
} from "@/schemas/question-form"
import type { Question } from "@/types/question"

import { zodResolver } from "@hookform/resolvers/zod"
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"

export interface QuestionFormHandle {
  submitNext: () => void
}

export interface QuestionFormProps {
  question: Question
  onProceed: () => void
}

export const QuestionForm = forwardRef<QuestionFormHandle, QuestionFormProps>(
  function QuestionForm({ question, onProceed }, ref) {
    const schema = useMemo(
      () => createQuestionFormSchema(question),
      [question],
    )

    const methods = useForm<QuestionFormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        selected: question.answers.map(() => false),
      },
      mode: "onSubmit",
      reValidateMode: "onChange",
    })

    const { control, handleSubmit } = methods
    const [correctFeedback, setCorrectFeedback] = useState(false)
    const proceedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
      return () => {
        if (proceedTimerRef.current !== null) {
          clearTimeout(proceedTimerRef.current)
        }
      }
    }, [])

    const onValid: SubmitHandler<QuestionFormValues> = () => {
      setCorrectFeedback(true)
      if (proceedTimerRef.current !== null) {
        clearTimeout(proceedTimerRef.current)
      }
      proceedTimerRef.current = setTimeout(() => {
        proceedTimerRef.current = null
        setCorrectFeedback(false)
        onProceed()
      }, 700)
    }

    useImperativeHandle(ref, () => ({
      submitNext: () => {
        void handleSubmit(onValid)()
      },
    }))

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pitanje</CardTitle>
          <CardDescription className="text-foreground pt-2 text-base leading-relaxed font-normal">
            {question.question}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form className="space-y-6" noValidate>
              <FormField
                control={control}
                name="selected"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-4">
                      {question.answers.map((ans, idx) => {
                        const id = `answer-${idx}`
                        return (
                          <div
                            key={idx}
                            className="flex flex-row items-start gap-3 rounded-lg border border-transparent p-2 hover:bg-muted/50"
                          >
                            <Checkbox
                              id={id}
                              checked={field.value[idx] ?? false}
                              onCheckedChange={(checked) => {
                                setCorrectFeedback(false)
                                const next = [...field.value]
                                next[idx] = checked === true
                                field.onChange(next)
                              }}
                            />
                            <Label
                              htmlFor={id}
                              className="cursor-pointer font-normal leading-snug"
                            >
                              {ans.answer}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                    <FormMessage />
                    {correctFeedback ? (
                      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        Tačno!
                      </p>
                    ) : null}
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    )
  },
)
