import { useEffect, useState } from 'react'

const POLL_MS = 10000
const TIMEOUT_MS = 3000

export function BackendStatus() {
  const [alive, setAlive] = useState<boolean | null>(null)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const check = async () => {
      const controller = new AbortController();
      const fetchTimeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
      
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '/api' : '')
        const res = await fetch(`${apiBaseUrl}/health`, { signal: controller.signal })
        setAlive(res.ok)
      } catch {
        setAlive(false)
      } finally {
        clearTimeout(fetchTimeoutId)
      }
    }
    
    check()
    const id = setInterval(check, POLL_MS)
    return () => {
      clearInterval(id)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <span
      className="inline-flex items-center gap-1.5 cursor-default"
      title={alive === true ? 'Backend: Online' : alive === false ? 'Backend: Offline' : 'Checking…'}
    >
      <span
        className={`h-2 w-2 rounded-full shrink-0 ${alive === true ? 'bg-emerald-500' : alive === false ? 'bg-red-500' : 'bg-zinc-500 animate-pulse'
          }`}
        aria-hidden
      />
      <span className="text-xs text-zinc-400 sr-only sm:not-sr-only">
        {alive === true ? 'Backend: Online' : alive === false ? 'Backend: Offline' : 'Checking…'}
      </span>
    </span>
  )
}
