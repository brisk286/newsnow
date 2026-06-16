import { existsSync, readFileSync, writeFileSync } from "node:fs"
import process from "node:process"
import { join } from "node:path"
import { projectDir } from "../shared/dir"

const routesPath = join(projectDir, "dist/output/_routes.json")

if (!existsSync(routesPath)) {
  console.log("[fix-routes] No _routes.json found, skipping")
  process.exit(0)
}

const routes = JSON.parse(readFileSync(routesPath, "utf8"))

// Make the Worker handle all routes so the workers.dev URL works for the full site
routes.include = ["/*"]
routes.exclude = []

writeFileSync(routesPath, JSON.stringify(routes))
console.log("[fix-routes] Updated _routes.json to handle all routes via Worker")
