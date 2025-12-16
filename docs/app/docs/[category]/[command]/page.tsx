import { Badge } from "@/components/ui/badge"

const mock = {
  general: [
    { name: "ping", type: "HYBRID", description: "Check bot latency" },
    { name: "help", type: "HYBRID", description: "Show help menu" },
    { name: "news", type: "SLASH", description: "Latest news" },
    { name: "weather", type: "SLASH", description: "Weather info" },
  ],
}

export default function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const commands = mock[params.category as keyof typeof mock] ?? []

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold capitalize">
        {params.category} Commands
      </h1>

      <p className="text-muted-foreground">
        Commands available under the <b>{params.category}</b> category.
      </p>

      <div className="space-y-4">
        {commands.map(cmd => (
          <div
            key={cmd.name}
            className="rounded-lg border p-4 hover:bg-muted/40 transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{cmd.name}</h3>
              <Badge
                variant={
                  cmd.type === "HYBRID"
                    ? "default"
                    : "secondary"
                }
              >
                {cmd.type}
              </Badge>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {cmd.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
