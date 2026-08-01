import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getSupportDb(): D1Database {
  const environment = getCloudflareContext().env as unknown as {
    SUPPORT_DB?: D1Database;
  };
  const database = environment.SUPPORT_DB;

  if (!database) {
    throw new Error("SUPPORT_DB binding is not configured");
  }

  return database;
}

export function createId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().replaceAll("-", "")}`;
}
