# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.7.0
FROM node:${NODE_VERSION}-slim as base

# Next.js/Prisma app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# copy all required files from the monorepo
COPY package.json yarn.lock .yarnrc.yml playwright.config.ts turbo.json git-init.sh git-setup.sh ./
COPY /.yarn ./.yarn
COPY ./apps/api ./apps/api
COPY ./packages ./packages
# TODO: follow up pr to remove dependencies on web
COPY ./apps/web ./apps/web

# Final stage
FROM base
WORKDIR /app

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

# Expose port 80
EXPOSE 80

# Start cmd, called when docker image is mounted
CMD [ "yarn", "workspace", "@calcom/api", "docker-start-api"]