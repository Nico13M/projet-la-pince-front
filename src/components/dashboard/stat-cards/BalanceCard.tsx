'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from '@/types/user'
import { formatEuro } from '@/utils/format'

export function BalanceCard({
  remainingBalance,
  userData,
  isLoading,
}: {
  remainingBalance: number
  userData: User | null
  isLoading: boolean
}) {
  if (isLoading) return null

  return (
    <Card className="from-primary to-secondary relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br text-white shadow-lg backdrop-blur-sm">
      <div className="absolute inset-0 bg-white/5"></div>
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-black/10 blur-3xl"></div>
      <CardHeader className="z-10 flex flex-row items-center justify-between pt-6">
        <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
          <span className="font-semibold tracking-wide text-white uppercase">
            Solde restant
          </span>
        </CardTitle>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <svg
            viewBox="0 0 48 48"
            height="24"
            width="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" fill="white" fillOpacity="0.01" />
            <path
              d="M44 11H4V37H44V11Z"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M4 19H44"
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M10 29H20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 11L16 11"
              stroke="#FFD666"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </CardHeader>
      <CardContent className="z-10 flex flex-col gap-5">
        <div className="text-3xl font-bold tracking-tight">
          {formatEuro(remainingBalance)}
        </div>
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <span className="text-xs tracking-wider text-white/60 uppercase">
                Titulaire
              </span>
              <span className="mt-1 text-sm text-white">
                {userData?.lastName} {userData?.firstName}
              </span>
            </div>
            <span className="font-semibold tracking-wider text-white/80">
              VISA
            </span>
          </div>
          <div className="mt-4">
            <div className="text-sm font-light tracking-[0.25em] text-white">
              •••• •••• •••• 3479
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
