import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Brain, Lock, Stethoscope, Cpu, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stack = [
  { name: 'React + Vite', icon: Cpu },
  { name: 'Express + MongoDB', icon: Activity },
  { name: 'Tailwind CSS', icon: HeartPulse },
  { name: 'Framer Motion', icon: Brain },
  { name: 'JWT Authentication', icon: Lock },
  { name: 'Local Upload Storage', icon: Stethoscope },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">About LumenX</h1>
            <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
              A modern, AI-assisted diagnostic companion for radiology — bringing clarity to chest imaging in seconds.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link to="/login">
                <Button size="lg" variant="secondary">Get started</Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground/10">
                  Back home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-16 space-y-16">
        <section>
          <h2 className="font-display text-2xl font-bold">Our Mission</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Every minute matters in clinical care. LumenX gives radiologists and physicians a structured, AI-assisted second opinion the moment an X-ray is captured — not days later.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">Technology</h2>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stack.map((s) => (
              <div key={s.name} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 shadow-soft">
                <div className="h-9 w-9 grid place-items-center rounded-lg bg-accent text-accent-foreground"><s.icon className="h-4 w-4" /></div>
                <span className="font-medium text-sm">{s.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-soft">
            <h3 className="font-display text-lg font-semibold">Team</h3>
            <p className="text-sm text-muted-foreground mt-2">Clinicians, ML researchers, and product engineers building responsibly for healthcare. <span className="italic">(Team page coming soon.)</span></p>
          </div>
          <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-soft">
            <h3 className="font-display text-lg font-semibold">Contact</h3>
            <p className="text-sm text-muted-foreground mt-2">Partnerships and inquiries: <a className="text-primary" href="mailto:hello@lumenx.health">hello@lumenx.health</a></p>
          </div>
        </section>
      </main>
    </div>
  );
}
