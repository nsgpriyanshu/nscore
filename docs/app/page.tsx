import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Command, ShieldCheck, Info, Terminal, LifeBuoy } from 'lucide-react'
import Image from 'next/image'
export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 space-y-24">
      {/* Hero */}
      <section className="text-center space-y-6">
        {/* Banner placeholder */}
        <div className="relative mx-auto h-56 md:h-72 w-full max-w-5xl rounded-xl border bg-muted flex items-center justify-center">
          <span className="text-sm text-muted-foreground">
            <Image src="/banner.png" alt="nsCore banner" fill className="object-cover rounded-xl" />
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Introducing <span className="text-primary">nsCore</span>
        </h1>

        <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
          nsCore is a powerful and informative Discord bot built with TypeScript, JavaScript, and
          discord.js — designed to elevate your server experience.
        </p>

        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/docs/general">View Commands</Link>
          </Button>

          <Button asChild size="lg" variant="secondary">
            <Link href="https://discord.com/oauth2/authorize">Invite Bot</Link>
          </Button>
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-center">Why use nsCore?</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Feature
            icon={Command}
            title="Rich Command System"
            description="Hybrid, slash, and message commands with clear documentation and examples."
          />
          <Feature
            icon={ShieldCheck}
            title="Moderation Ready"
            description="Powerful moderation tools designed for real Discord servers."
          />
          <Feature
            icon={Terminal}
            title="Developer Friendly"
            description="Open-source, structured, and fully documented for contributors."
          />
        </div>
      </section>

      <Separator />

      {/* Command Categories */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-center">Command Categories</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <CategoryCard
            icon={Command}
            title="General"
            href="/docs/general"
            description="Utility and everyday commands."
          />
          <CategoryCard
            icon={Info}
            title="Info"
            href="/docs/info"
            description="Fetch detailed server and user information."
          />
          <CategoryCard
            icon={ShieldCheck}
            title="Moderation"
            href="/docs/moderation"
            description="Manage roles, channels, and permissions."
          />
        </div>
      </section>

      <Separator />

      {/* Support */}
      <section className="text-center space-y-4">
        <LifeBuoy className="mx-auto h-10 w-10 text-muted-foreground" />

        <h2 className="text-2xl font-semibold">Need Help?</h2>

        <p className="text-muted-foreground max-w-xl mx-auto">
          If you’re confused about commands or need assistance, explore the documentation or join
          our Discord server for support.
        </p>

        <Button asChild variant="outline">
          <Link href="https://discord.gg/your-server">Join Support Server</Link>
        </Button>
      </section>
    </main>
  )
}

/* ---------- Components ---------- */

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-3 text-center">
        <Icon className="mx-auto h-8 w-8 text-primary" />
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function CategoryCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ElementType
  title: string
  description: string
  href: string
}) {
  return (
    <Link href={href}>
      <Card className="hover:border-primary transition-colors">
        <CardContent className="pt-6 space-y-3">
          <Icon className="h-6 w-6 text-primary" />
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
