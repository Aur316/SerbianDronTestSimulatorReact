import { Progress } from "@/components/ui/progress"

export interface CustomProgressBarProps {
  currentIndex: number
  total: number
  title: string
}

export const CustomProgressBar = ({
  currentIndex,
  total,
  title,
}: CustomProgressBarProps) => {
  const progress = ((currentIndex + 1) / total) * 100

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary/70 text-xs font-semibold tracking-widest uppercase">
            {title}
          </span>
        </div>
        <span className="text-muted-foreground text-sm tabular-nums">
          <span className="text-foreground font-medium">
            {currentIndex + 1}
          </span>
          <span className="text-muted-foreground/50 mx-1">/</span>
          {total}
        </span>
      </div>
      <Progress
        value={progress}
        className="h-1.5 [&_[data-slot=progress-indicator]]:duration-500 [&_[data-slot=progress-indicator]]:ease-out"
      />
    </div>
  )
}
