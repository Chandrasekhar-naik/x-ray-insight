import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/api';
import { Input } from '@/components/ui/input';
import { Search, FileImage, ChevronRight } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function HistoryPage() {
  const [q, setQ] = useState('');

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: async () => api.get('/diagnoses'),
  });

  const filtered = useMemo(
    () => items.filter((item) => (item.result || '').toLowerCase().includes(q.toLowerCase())),
    [items, q],
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Your History</h1>
          <p className="text-sm text-muted-foreground">All previous X-ray uploads and diagnoses.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search findings…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">
          <FileImage className="h-10 w-10 text-muted-foreground mx-auto" />
          <p className="mt-3 font-medium">No diagnoses yet</p>
          <p className="text-sm text-muted-foreground">Upload your first X-ray from the home page.</p>
          <Link to="/home" className="mt-4 inline-block text-primary hover:underline">Go to upload</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((item, index) => (
            <motion.div key={item._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <Link
                to={`/diagnosis/${item._id}`}
                className="group flex gap-4 p-4 rounded-2xl bg-card-gradient border border-border shadow-soft hover:shadow-elegant transition-all"
              >
                <div className="h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-black grid place-items-center">
                  {item.imagePath ? (
                    <img src={`${API_BASE}${item.imagePath}`} alt="X-ray thumbnail" className="h-full w-full object-cover" />
                  ) : (
                    <FileImage className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-2">{item.result || 'Pending'}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(item.createdAt).toLocaleString()}</p>
                  {item.confidence != null && <p className="text-xs text-primary font-semibold mt-1">{Math.round(item.confidence * 100)}% confidence</p>}
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground self-center group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
