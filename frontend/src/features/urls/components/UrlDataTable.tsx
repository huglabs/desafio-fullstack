import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table'
import { Copy, ExternalLink, Eye, Lock, MoreHorizontal, Trash2 } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import type { Url } from '@/features/urls/types/url'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'

interface UrlDataTableProps {
  urls: Url[]
  isLoading: boolean
  onDelete: (url: Url) => void
}

function formatDate(value: string | null) {
  if (!value) return '—'
  return new Date(value).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Link copiado')
  } catch {
    toast.error('Não foi possível copiar')
  }
}

export function UrlDataTable({ urls, isLoading, onDelete }: UrlDataTableProps) {
  const columns = useMemo<ColumnDef<Url>[]>(
    () => [
      {
        accessorKey: 'original_url',
        header: 'URL original',
        cell: ({ row }) => (
          <span className="block max-w-[220px] truncate" title={row.original.original_url}>
            {row.original.original_url}
          </span>
        ),
      },
      {
        accessorKey: 'short_url',
        header: 'Link curto',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <code className="bg-muted/80 rounded-lg px-2 py-1 text-xs">{row.original.slug}</code>
            {row.original.has_password && (
              <Tooltip>
                <TooltipTrigger>
                  <Lock className="text-muted-foreground size-3.5" />
                </TooltipTrigger>
                <TooltipContent>Protegida por senha</TooltipContent>
              </Tooltip>
            )}
          </div>
        ),
      },
      {
        accessorKey: 'expires_at',
        header: 'Expira',
        cell: ({ row }) => (
          <span className="text-muted-foreground">{formatDate(row.original.expires_at)}</span>
        ),
      },
      {
        accessorKey: 'created_at',
        header: 'Criada',
        cell: ({ row }) => (
          <span className="text-muted-foreground">{formatDate(row.original.created_at)}</span>
        ),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex justify-end gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Copiar link"
              onClick={() => copyToClipboard(row.original.short_url)}
            >
              <Copy />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost" size="icon" aria-label="Mais ações">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to={`/urls/${row.original.id}`}>
                    <Eye />
                    Analytics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => copyToClipboard(row.original.short_url)}>
                  <Copy />
                  Copiar link
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onDelete(row.original)}
                >
                  <Trash2 />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [onDelete],
  )

  const table = useReactTable({
    data: urls,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return (
      <div className="border-border/70 bg-card/80 space-y-3 rounded-xl border p-4 backdrop-blur-xl">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-11 w-full" />
        ))}
      </div>
    )
  }

  if (urls.length === 0) {
    return (
      <div className="border-border/70 bg-card/50 rounded-xl border border-dashed px-6 py-12 text-center backdrop-blur-xl">
        <ExternalLink className="text-muted-foreground mx-auto mb-3 size-8" />
        <p className="font-display text-lg font-semibold">Nenhuma URL ainda</p>
        <p className="text-muted-foreground mt-1 text-sm">
          Crie seu primeiro link curto para começar.
        </p>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="border-border/70 bg-card/80 rounded-xl border backdrop-blur-xl">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  )
}
