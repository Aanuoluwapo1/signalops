import { useState, type FormEvent } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, Plus, Clock, UserCheck } from 'lucide-react'
import type { InvestigationNote } from '@/types/incidents'
import { useIncidentsStore } from '../stores/use-incidents-store'

interface NotesTimelineProps {
  readonly incidentId: string
  readonly notes: readonly InvestigationNote[]
}

export function NotesTimeline({ incidentId, notes }: NotesTimelineProps) {
  const { addInvestigationNote } = useIncidentsStore()
  const [newNote, setNewNote] = useState('')
  const [author] = useState('Analyst Reynolds')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return

    addInvestigationNote(incidentId, newNote.trim(), author)
    setNewNote('')
  }

  return (
    <Card className="bg-[#080d1a] border-[#16233b]">
      <CardHeader className="pb-3 border-b border-[#141f33]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-cyan-400" />
            <CardTitle className="text-sm font-semibold text-slate-100">
              Investigation Notes & Responder Log
            </CardTitle>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {notes.length} entries recorded
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* New Note Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            rows={2}
            placeholder="Record containment actions, playbook outputs, or forensic findings..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full p-2.5 text-xs rounded-md bg-[#0c1424] border border-[#1e2e4f] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
              <UserCheck className="h-3 w-3 text-cyan-400" />
              <span>Logging as: {author}</span>
            </div>
            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={!newNote.trim()}
              className="text-xs h-7"
            >
              <Plus className="h-3 w-3 mr-1" />
              <span>Add Entry</span>
            </Button>
          </div>
        </form>

        {/* Timeline Stream */}
        <div className="pt-2 border-t border-[#141f33] space-y-3">
          {notes.length === 0 ? (
            <p className="text-xs text-slate-500 font-mono text-center py-4">
              No notes logged yet.
            </p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="p-3 rounded-md bg-[#0c1424] border border-[#182744] space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-semibold text-cyan-300">{note.author}</span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed select-text">
                  {note.text}
                </p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
