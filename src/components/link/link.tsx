import { cn } from "@/lib/utils"

import type { HtmlHTMLAttributes, PropsWithChildren } from "react"

export interface LinkProps extends HtmlHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export const Link = ({
  href,
  children,
  ...props
}: PropsWithChildren<LinkProps>) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "text-primary hover:text-primary/80 cursor-pointer font-bold font-medium hover:underline",
        props.className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
