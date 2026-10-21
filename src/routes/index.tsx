import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prism — the reactive terminal workspace" },
      { name: "description", content: "A terminal that reacts to your machine, serves over SSH, runs TUI apps as apps, and multiplexes into a full desktop-like workspace." },
      { property: "og:title", content: "Prism — the reactive terminal workspace" },
      { property: "og:description", content: "Reactive. Servable. Integratable. Designable. Not just a terminal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type StateKey = "idle" | "battery" | "load" | "done";
const STATES: Record<StateKey, { label: string; color: string; msg: string; icon: string }> = {
  idle: { label: "idle", color: "var(--ok)", msg: "all systems nominal", icon: "●" },
  battery: { label: "low battery", color: "var(--warn)", msg: "battery 12% — dimming effects, eco palette", icon: "▁" },
  load: { label: "high load", color: "var(--destructive)", msg: "cpu 94% — animations paused, heat theme", icon: "▲" },
  done: { label: "cmd finished", color: "var(--info)", msg: "cargo build ✓ 14.2s — success pulse", icon: "✓" },
};

const SCRIPT = [
  "$ prism connect dev@atlas --served",
  "→ handshake with prismd on atlas … ok",
  "→ environment: atlas (linux, 32 cores) · client: local",
  "$ prism open monitor --as-app",
  "→ launching module ‘monitor’ in app view",
];

function useTyped(lines: string[]) {
  const [out, setOut] = useState<string[]>([""]);
  useEffect(() => {
    let l = 0, c = 0;
    const id = setInterval(() => {
      if (l >= lines.length) { l = 0; c = 0; setOut([""]); return; }
      c++;
      setOut((prev) => {
        const next = [...prev];
        next[l] = lines[l].slice(0, c);
        return next;
      });
      if (c >= lines[l].length) { l++; c = 0; setOut((p) => (l < lines.length ? [...p, ""] : p)); }
    }, 38);
    return () => clearInterval(id);
  }, [lines]);
  return out;
}

function Index() {
  const [state, setState] = useState<StateKey>("idle");
  const typed = useTyped(SCRIPT);
  const s = STATES[state];

  useEffect(() => {
    const order: StateKey[] = ["idle", "done", "load", "battery"];
    const id = setInterval(() => setState((p) => order[(order.indexOf(p) + 1) % order.length]), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ "--state": s.color } as CSSProperties} className="min-h-screen transition-colors">
      <nav className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-sm">
          <span className="font-bold"><span className="text-state transition-colors">▍</span>prism</span>
          <div className="hidden gap-6 text-muted-foreground md:flex">
            {["reactive", "servable", "integratable", "workspace", "design"].map((x) => (
              <a key={x} href={`#${x}`} className="hover:text-primary">./{x}</a>
            ))}
          </div>
          <a href="#join" className="rounded border border-primary px-3 py-1 text-primary hover:bg-primary hover:text-primary-foreground">join beta</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative overflow-hidden grid-bg">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          <div className="rise">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">// not just a terminal</p>
            <h1 className="text-5xl font-bold leading-[1.05] md:text-7xl">
              A terminal that <span className="text-state transition-colors">feels</span> your machine.
            </h1>
            <p className="mt-6 max-w-md text-muted-foreground">
              Reactive, servable, integratable and designable. Prism turns your shell into a living workspace —
              apps, widgets, multiviews and remote machines, all in one window.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="#join" className="rounded bg-primary px-5 py-3 font-semibold text-primary-foreground glow">$ get early access</a>
              <a href="#reactive" className="rounded border px-5 py-3 hover:border-primary">explore ↓</a>
            </div>
          </div>
          <Window title={`dev@atlas — ${s.label}`}>
            <div className="min-h-56 space-y-1 text-sm">
              {typed.map((t, i) => (
                <div key={i} className={t.startsWith("$") ? "text-foreground" : "text-muted-foreground"}>
                  {t}{i === typed.length - 1 && <span className="caret text-state">█</span>}
                </div>
              ))}
            </div>
            <StatusBar s={s} />
          </Window>
        </div>
      </header>

      {/* REACTIVE */}
      <Section id="reactive" n="01" title="Reactive" lead="Colour, motion and layout encode the state of your environment. Not decoration — information.">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(STATES) as StateKey[]).map((k) => (
              <button key={k} onClick={() => setState(k)}
                style={{ "--state": STATES[k].color } as CSSProperties}
                className={`rounded border p-4 text-left transition-all ${state === k ? "border-state bg-card glow" : "hover:border-state"}`}>
                <div className="text-2xl text-state">{STATES[k].icon}</div>
                <div className="mt-2 text-sm">{STATES[k].label}</div>
              </button>
            ))}
          </div>
          <Window title="~/projects/core">
            <div className="flex items-center gap-4">
              <span className="h-3 w-3 rounded-full bg-state pulse-ring" />
              <span className="text-state transition-colors">{s.msg}</span>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded bg-muted">
              <div className="h-full bg-state transition-all duration-700"
                style={{ width: state === "load" ? "94%" : state === "battery" ? "12%" : state === "done" ? "100%" : "38%" }} />
            </div>
            <pre className="mt-6 text-xs text-muted-foreground">{`[on.battery.below 20]  theme = "eco"   motion = "reduced"
[on.cpu.above 90]      theme = "heat"  motion = "paused"
[on.command.exit 0]    pulse = "success"
[on.command.exit !0]   shake = true`}</pre>
          </Window>
        </div>
      </Section>

      {/* SERVABLE */}
      <Section id="servable" n="02" title="Servable" lead="Two ways to be somewhere else. Both feel like home.">
        <div className="grid gap-6 md:grid-cols-2">
          <Card tag="served mode" title="Run prismd on the host">
            Start the Prism server on any machine. Your client connects through it and the whole experience —
            widgets, apps, reactivity — runs as if you were sitting at that machine.
            <Diagram a="client" b="prismd @ atlas" link="prism protocol" />
          </Card>
          <Card tag="ssh mode" title="Plain SSH, made smart">
            No server needed. Prism uses the remote as the execution environment while balancing rendering,
            fonts, images and state on your local client.
            <Diagram a="client (render)" b="atlas (exec)" link="ssh" />
          </Card>
        </div>
      </Section>

      {/* INTEGRATABLE */}
      <Section id="integratable" n="03" title="Integratable" lead="Commands become apps. Your favourite TUIs get a job. The terminal speaks UI.">
        <div className="grid gap-4 md:grid-cols-3">
          <Card tag="apps" title="TUIs as apps">Package a command or TUI as an app — Prism opens it in a dedicated app view with its own chrome.</Card>
          <Card tag="roles" title="Assign purposes">Set lazygit as your git view, btop as your monitor, yazi as your file picker — Prism routes to them.</Card>
          <Card tag="modules" title="Modules & widgets">Interfaces for prompts, forms, lists, toasts and panels that any script can use to talk to the user.</Card>
        </div>
      </Section>

      {/* WORKSPACE */}
      <Section id="workspace" n="04" title="A multiplexer that's a workspace" lead="Statusbar, sidebar, windowbar and multiview — all customisable. Switch to desktop mode and it becomes a desktop.">
        <Workspace s={s} />
      </Section>

      {/* UI RICH */}
      <Section id="design" n="05" title="UI-rich. Designable." lead="Images, rich primitives and polished defaults — and every pixel is yours to restyle.">
        <div className="grid gap-6 md:grid-cols-2">
          <Window title="rich primitives">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><div className="h-14 w-14 rounded bg-gradient-to-br from-primary to-info" /><span className="text-muted-foreground">inline image · kitty/sixel compatible</span></div>
              <div className="flex gap-2">{["deploy", "rollback", "logs"].map((b) => <span key={b} className="rounded border border-primary px-2 py-1 text-primary">{b}</span>)}</div>
              <div className="rounded border-l-2 border-accent bg-muted px-3 py-2 text-accent">⚑ toast: migration complete</div>
              <div className="flex items-end gap-1 h-12">{[4,7,3,9,6,8,5,10,7,4,8,6].map((h,i)=><div key={i} className="w-3 bg-primary/70" style={{height:`${h*10}%`}}/>)}</div>
            </div>
          </Window>
          <Window title="~/.config/prism/theme.toml">
            <pre className="text-xs leading-relaxed text-muted-foreground">{`[theme]
base      = "phosphor"
font      = "JetBrains Mono"
radius    = 8
`}<span className="text-primary">{`[statusbar]
left      = ["host", "git", "state"]
right     = ["battery", "load", "clock"]
`}</span>{`[multiview.dev]
layout    = "shell | app:lazygit / widget:logs"
desktop   = true`}</pre>
          </Window>
        </div>
      </Section>

      <section id="join" className="border-t grid-bg">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Your terminal, <span className="text-state transition-colors">alive</span>.</h2>
          <p className="mt-4 text-muted-foreground">Join the early access list.</p>
          <form onSubmit={(e) => { e.preventDefault(); (e.currentTarget.querySelector("button") as HTMLButtonElement).textContent = "✓ queued"; }}
            className="mx-auto mt-8 flex max-w-md overflow-hidden rounded border focus-within:border-primary">
            <span className="px-3 py-3 text-primary">$</span>
            <input required type="email" placeholder="you@machine.dev" className="flex-1 bg-transparent py-3 outline-none" />
            <button className="bg-primary px-5 font-semibold text-primary-foreground">join</button>
          </form>
        </div>
      </section>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">prism · exit 0</footer>
    </div>
  );
}

function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rise relative overflow-hidden rounded-lg border bg-card glow transition-shadow">
      <div className="flex items-center gap-2 border-b px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
        <span className="h-2.5 w-2.5 rounded-full bg-warn" />
        <span className="h-2.5 w-2.5 rounded-full bg-ok" />
        <span className="ml-3 truncate text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="relative p-5">{children}</div>
      <div className="pointer-events-none absolute inset-0 scanlines" />
    </div>
  );
}

function StatusBar({ s }: { s: (typeof STATES)[StateKey] }) {
  return (
    <div className="mt-6 flex justify-between rounded bg-state px-3 py-1 text-xs text-primary-foreground transition-colors">
      <span>atlas · main</span><span>{s.icon} {s.label}</span>
    </div>
  );
}

function Section({ id, n, title, lead, children }: { id: string; n: string; title: string; lead: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs text-state transition-colors">[{n}]</p>
        <h2 className="mt-2 text-3xl font-bold md:text-5xl">{title}</h2>
        <p className="mt-3 mb-10 max-w-2xl text-muted-foreground">{lead}</p>
        {children}
      </div>
    </section>
  );
}

function Card({ tag, title, children }: { tag: string; title: string; children: ReactNode }) {
  return (
    <div className="group rounded-lg border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary">
      <span className="text-xs text-accent">#{tag}</span>
      <h3 className="mt-2 text-xl font-semibold group-hover:text-primary">{title}</h3>
      <div className="mt-3 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function Diagram({ a, b, link }: { a: string; b: string; link: string }) {
  return (
    <div className="mt-5 flex items-center gap-2 text-xs">
      <span className="rounded border px-2 py-1 text-foreground">{a}</span>
      <span className="flex-1 border-t border-dashed border-primary text-center"><span className="relative -top-2 bg-card px-1 text-primary">{link}</span></span>
      <span className="rounded border border-primary px-2 py-1 text-primary">{b}</span>
    </div>
  );
}

function Workspace({ s }: { s: (typeof STATES)[StateKey] }) {
  const [desktop, setDesktop] = useState(false);
  return (
    <div>
      <button onClick={() => setDesktop((d) => !d)} className="mb-4 rounded border px-3 py-1 text-sm hover:border-primary">
        mode: <span className="text-primary">{desktop ? "desktop" : "multiview"}</span> ⇄
      </button>
      <div className="overflow-hidden rounded-lg border bg-card glow">
        <div className="flex gap-1 border-b px-2 py-1 text-xs">
          {["1:dev", "2:ops", "3:notes"].map((w, i) => (
            <span key={w} className={`rounded px-2 py-0.5 ${i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{w}</span>
          ))}
          <span className="ml-auto text-muted-foreground">windowbar</span>
        </div>
        <div className="flex h-80">
          <aside className="w-36 border-r p-3 text-xs text-muted-foreground space-y-2">
            <div className="text-foreground">sidebar</div>
            <div>▸ src/</div><div>▸ tests/</div><div className="text-primary">◉ prism.toml</div>
          </aside>
          {desktop ? (
            <div className="relative flex-1 grid-bg">
              {[["shell", "left-6 top-6"], ["lazygit", "left-40 top-20"], ["logs", "right-6 top-10"]].map(([t, pos]) => (
                <div key={t} className={`rise absolute ${pos} w-44 rounded border bg-background p-2 text-xs`}>
                  <div className="mb-2 border-b pb-1 text-muted-foreground">{t}</div>
                  <div className="h-16 bg-muted/50" />
                </div>
              ))}
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded border bg-background px-3 py-1 text-xs">⌂ ▢ ◫ ⚙</div>
            </div>
          ) : (
            <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-px bg-border">
              <div className="row-span-2 bg-card p-3 text-xs"><span className="text-primary">$</span> nvim main.rs<span className="caret">█</span></div>
              <div className="bg-card p-3 text-xs"><div className="text-accent">app: lazygit</div><div className="mt-2 text-muted-foreground">● feat/reactive<br/>○ main</div></div>
              <div className="bg-card p-3 text-xs"><div className="text-info">widget: cpu</div><div className="mt-2 flex h-12 items-end gap-1">{[3,5,8,6,9,4,7].map((h,i)=><div key={i} className="w-2 bg-state transition-colors" style={{height:`${h*10}%`}}/>)}</div></div>
            </div>
          )}
        </div>
        <div className="flex justify-between bg-state px-3 py-1 text-xs text-primary-foreground transition-colors">
          <span>statusbar · atlas</span><span>{s.icon} {s.label} · 03:36</span>
        </div>
      </div>
    </div>
  );
}
