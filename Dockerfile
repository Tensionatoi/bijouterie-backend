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
RUN yarn run build

# NO extra COPY after build - this is the key fix vs Nixpacks

EXPOSE 9000

CMD ["sh", "-c", "echo 'Listing .medusa directory:'; ls -R .medusa || echo '.medusa not found'; npx medusa start"]
