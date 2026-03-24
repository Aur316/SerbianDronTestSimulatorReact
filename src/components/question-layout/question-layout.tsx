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
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-4 md:p-8">
      <p className="text-muted-foreground text-sm">
        Pitanje {currentIndex + 1} od {total}
      </p>

      <div className="min-h-0 flex-1">{children}</div>

      <div className="border-border flex flex-wrap gap-2 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isFirst}
        >
          Prethodno
        </Button>
        <Button type="button" onClick={onNext}>
          Sledeće
        </Button>
        <Button type="button" variant="secondary" onClick={onSkip}>
          Preskoči
        </Button>
        <Button type="button" variant="ghost" onClick={onRestart}>
          Počni iznova
        </Button>
      </div>
    </div>
  )
}
