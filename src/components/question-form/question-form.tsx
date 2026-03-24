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
  type QuestionFormValues,
  createQuestionFormSchema,
} from "@/schemas/question-form"
import type { Question } from "@/types/question"

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form"
import { useForm, useWatch } from "react-hook-form"

export interface QuestionFormHandle {
  submitNext: () => void
}

export interface QuestionFormProps {
  question: Question
  onProceed: () => void
}

export const QuestionForm = forwardRef<QuestionFormHandle, QuestionFormProps>(
  function QuestionForm({ question, onProceed }, ref) {
    const schema = useMemo(() => createQuestionFormSchema(question), [question])

    const methods = useForm<QuestionFormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        selected: question.answers.map(() => false),
      },
      mode: "onSubmit",
      reValidateMode: "onSubmit",
    })

    const { clearErrors, control, handleSubmit, setValue } = methods
    const selectedValues =
      useWatch({ control, name: "selected" }) ??
      question.answers.map(() => false)

    const [correctFeedback, setCorrectFeedback] = useState(false)
    const proceedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const clearWrongSelectionTimerRef = useRef<ReturnType<
      typeof setTimeout
    > | null>(null)

    const clearTimers = () => {
      if (proceedTimerRef.current !== null) {
        clearTimeout(proceedTimerRef.current)
        proceedTimerRef.current = null
      }
      if (clearWrongSelectionTimerRef.current !== null) {
        clearTimeout(clearWrongSelectionTimerRef.current)
        clearWrongSelectionTimerRef.current = null
      }
    }

    useEffect(() => {
      return clearTimers
    }, [])

    const onValid: SubmitHandler<QuestionFormValues> = () => {
      setCorrectFeedback(true)
      clearTimers()
      proceedTimerRef.current = setTimeout(() => {
        proceedTimerRef.current = null
        setCorrectFeedback(false)
        onProceed()
      }, 1000)
    }

    const onInvalid: SubmitErrorHandler<QuestionFormValues> = (errors) => {
      if (errors.selected?.message !== "Odgovor nije tačan.") {
        return
      }

      clearTimers()
      clearWrongSelectionTimerRef.current = setTimeout(() => {
        clearWrongSelectionTimerRef.current = null
        setValue(
          "selected",
          question.answers.map(() => false),
          {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: false,
          },
        )
        clearErrors("selected")
      }, 1000)
    }

    useImperativeHandle(ref, () => ({
      submitNext: () => {
        void handleSubmit(onValid, onInvalid)()
      },
    }))

    return (
      <Card className="border-border/60 shadow-xl shadow-black/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary/70 text-xs font-semibold tracking-widest uppercase">
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
                        const isChecked = selectedValues[idx] ?? false
                        return (
                          <label
                            key={idx}
                            htmlFor={id}
                            className={[
                              "flex cursor-pointer flex-row items-start gap-3 rounded-lg border p-3 transition-all duration-150",
                              isChecked
                                ? "border-primary/60 bg-primary/10 shadow-primary/10 shadow-sm"
                                : "border-border/50 bg-muted/20 hover:border-border hover:bg-muted/50",
                            ].join(" ")}
                          >
                            <Checkbox
                              id={id}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                clearTimers()
                                setCorrectFeedback(false)
                                clearErrors("selected")
                                const next = [...selectedValues]
                                next[idx] = checked === true
                                field.onChange(next)
                              }}
                              className="mt-0.5"
                            />
                            <Label
                              htmlFor={id}
                              className="cursor-pointer leading-snug font-normal"
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
                        <span className="text-lg text-emerald-400">✓</span>
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
