import { AppFooter } from "@/components/app-footer/app-footer"
import { Questions } from "@/components/questions/questions"

export default function App() {
  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <main className="flex min-h-0 flex-1 flex-col">
        <Questions />
      </main>
      <AppFooter />
    </div>
  )
}
