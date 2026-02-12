FROM node:22-alpine

WORKDIR /app

# Copy package files and Yarn Berry setup
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Install all dependencies (dev deps needed for build)
RUN yarn install

# Copy source code
COPY . .

# Build backend + admin panel
ENV NODE_ENV=production
RUN yarn run build

# Workaround: Copy admin assets to potential fallback locations
RUN mkdir -p public/admin && cp -r .medusa/server/public/admin/* public/admin/ || echo "Admin build not found to copy"

# NO extra COPY after build - this is the key fix vs Nixpacks

EXPOSE 9000
ENV HOST=0.0.0.0

CMD ["npx", "medusa", "start"]
