import { Link } from "@/components/link/link"
import { LOMINGO_INFO_URL, SOURCE_CODE_URL } from "@/utils/constants"

export const AppFooter = () => {
  return (
    <footer className="border-border/50 bg-background/80 mt-auto border-t py-5 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 md:px-8">
        <p className="text-muted-foreground max-w-xl text-center text-xs leading-relaxed md:text-sm">
          Za dodatne informacije posetite sajt{" "}
          <Link href={LOMINGO_INFO_URL}>lomingo.rs</Link>. Izvorni kod
          aplikacije je javno dostupan (open source) i možete ga pregledati na
          sledećem <Link href={SOURCE_CODE_URL}>linku</Link>.
        </p>
      </div>
    </footer>
  )
}
