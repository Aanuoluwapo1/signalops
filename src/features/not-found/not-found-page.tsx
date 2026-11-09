import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShieldAlert, Home } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="py-12 flex items-center justify-center">
      <Card className="max-w-md w-full text-center border-[#233555]">
        <CardHeader>
          <div className="h-12 w-12 rounded-full bg-red-950/60 border border-red-800/60 flex items-center justify-center mx-auto mb-2 text-red-400">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <CardTitle className="text-lg justify-center">404: Endpoint Not Found</CardTitle>
          <CardDescription>
            The requested SOC route or resource is not registered in this environment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-slate-400">
            Verify the target path or return to the main security operations dashboard.
          </p>
          <Link to="/dashboard" className="inline-block">
            <Button variant="default" size="sm">
              <Home className="h-3.5 w-3.5 mr-1.5" />
              <span>Return to Dashboard</span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
