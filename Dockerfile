# Install dependencies only when needed
FROM node:16 AS deps
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

ENV PORT 3000

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

# Install dependencies based on the preferred package manager
COPY package.json tsconfig.json tailwind.config.js postcss.config.js next.config.js next-env.d.ts globals.d.ts package-lock.json ./
RUN npm i;
COPY ./public ./public
COPY ./types ./types
COPY ./components ./components
COPY ./pages ./pages
COPY ./config ./config

EXPOSE 3000
RUN mkdir ./.next;
CMD ["npm", "start"]