import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbNavProps {
  currentPage: string
}

export function BreadcrumbNav({ currentPage }: BreadcrumbNavProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="py-4 px-4 lg:px-0"
      style={{ marginBottom: "var(--spacing-md)" }}
    >
      <ol className="flex items-center gap-2 font-body" style={{ fontSize: "14px" }}>
        <li>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-smooth"
          >
            <Home className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Trang chủ</span>
          </Link>
        </li>
        <li>
          <ChevronRight
            className="w-3.5 h-3.5 text-[var(--accent)]"
            strokeWidth={1.5}
          />
        </li>
        <li>
          <span
            className="text-[var(--text-primary)] font-medium"
            aria-current="page"
          >
            {currentPage}
          </span>
        </li>
      </ol>
    </nav>
  )
}
