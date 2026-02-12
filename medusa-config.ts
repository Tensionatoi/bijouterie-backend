import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || (process.env.NODE_ENV === "production" ? (() => { throw new Error("JWT_SECRET is required in production") })() : "supersecret"),
      cookieSecret: process.env.COOKIE_SECRET || (process.env.NODE_ENV === "production" ? (() => { throw new Error("COOKIE_SECRET is required in production") })() : "supersecret"),
    },
    redisUrl: process.env.REDIS_URL,
  },
  modules: [
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-s3",
            id: "s3",
            options: {
              file_url: process.env.MINIO_PUBLIC_URL,
              access_key_id: process.env.MINIO_ACCESS_KEY,
              secret_access_key: process.env.MINIO_SECRET_KEY,
              region: "us-east-1",
              bucket: process.env.MINIO_BUCKET,
              endpoint: process.env.MINIO_ENDPOINT,
              additional_client_config: {
                forcePathStyle: true,
              },
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/event-bus-redis",
      key: "eventBus",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/cache-redis",
      key: "cacheService",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
  ],
})
