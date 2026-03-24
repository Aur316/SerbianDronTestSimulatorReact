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
      <Card className="border-border/60 shadow-xl shadow-black/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-semibold tracking-widest text-primary/70 uppercase">
            Pitanje
          </CardTitle>
          <CardDescription className="text-foreground pt-1 text-base leading-relaxed font-normal">
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
                    <div className="space-y-2">
                      {question.answers.map((ans, idx) => {
                        const id = `answer-${idx}`
                        const isChecked = field.value[idx] ?? false
                        return (
                          <label
                            key={idx}
                            htmlFor={id}
                            className={[
                              "flex cursor-pointer flex-row items-start gap-3 rounded-lg border p-3 transition-all duration-150",
                              isChecked
                                ? "border-primary/60 bg-primary/10 shadow-sm shadow-primary/10"
                                : "border-border/50 bg-muted/20 hover:border-border hover:bg-muted/50",
                            ].join(" ")}
                          >
                            <Checkbox
                              id={id}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                setCorrectFeedback(false)
                                const next = [...field.value]
                                next[idx] = checked === true
                                field.onChange(next)
                              }}
                              className="mt-0.5"
                            />
                            <Label
                              htmlFor={id}
                              className="cursor-pointer font-normal leading-snug"
                            >
                              {ans.answer}
                            </Label>
                          </label>
                        )
                      })}
                    </div>
                    <FormMessage />
                    {correctFeedback ? (
                      <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
                        <span className="text-emerald-400 text-lg">✓</span>
                        <p className="text-sm font-medium text-emerald-400">
                          Tačno!
                        </p>
                      </div>
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
