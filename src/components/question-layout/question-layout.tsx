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
  const progress = ((currentIndex + 1) / total) * 100

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-widest text-primary/70 uppercase">
              Dron test
            </span>
          </div>
          <span className="text-muted-foreground text-sm tabular-nums">
            <span className="text-foreground font-medium">{currentIndex + 1}</span>
            <span className="mx-1 text-muted-foreground/50">/</span>
            {total}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="min-h-0 flex-1">{children}</div>

      <div className="flex flex-wrap gap-2 border-t border-border/50 pt-4">
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
        <Button type="button" variant="ghost" onClick={onRestart} size="sm" className="text-muted-foreground">
          Počni iznova
        </Button>
      </div>
    </div>
  )
}
