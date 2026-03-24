import { CustomDialog } from "@/components/custom-dialog/custom-dialog"
import { CustomProgressBar } from "@/components/custom-progress-bar/custom-progress-bar"
import { Button } from "@/components/ui/button"

import type { PropsWithChildren } from "react"

export interface QuestionLayoutProps {
  currentIndex: number
  total: number
  isFirst: boolean
  onPrev: () => void
  onNext: () => void
  onSkip: () => void
  onRestart: () => void
}

export const QuestionLayout = ({
  children,
  currentIndex,
  total,
  isFirst,
  onPrev,
  onNext,
  onSkip,
  onRestart,
}: PropsWithChildren<QuestionLayoutProps>) => {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col gap-6 p-4 md:p-8">
      <CustomProgressBar
        currentIndex={currentIndex}
        total={total}
        title="Dron test"
      />
      <div className="min-h-0 flex-1">{children}</div>
      <div className="border-border/50 flex flex-wrap gap-2 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isFirst}
          size="sm"
        >
          ← Prethodno
        </Button>
        <Button type="button" onClick={onNext} size="sm">
          Sledeće →
        </Button>
        <div className="flex-1" />
        <Button type="button" variant="secondary" onClick={onSkip} size="sm">
          Preskoči
        </Button>
        <CustomDialog
          title="Počni iznova?"
          description="Napredak će biti izgubljen. Možete početi ispočetka kada potvrdite."
          onConfirm={onRestart}
          trigger={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              disabled={isFirst}
            >
              Počni iznova
            </Button>
          }
        />
      </div>
    </div>
  )
}
