# Simple NextJS + Docker Brochure App for NJC Enterprises

Personal Site for Nathan Clement

## How to Install Bun

We standardize on Bun for this repo.

```sh
curl -fsSL https://bun.sh/install | bash
```

Restart your terminal, then verify with:

```sh
bun --version
```

## Node Version

Use the Node version in `.nvmrc` (currently Node 22).

```sh
nvm use
```

## How to Run?

- Local via docker: `./scripts/docker_local.sh` -- this simulates the deployment environment
- Local Development via Bun: `bun install` then `bun run dev`

Other Bun commands: `bun run build`, `bun run lint`, `bun run test`.

### Environment Variables

Set `OPENAI_API_KEY` to an API key with a monthly spending cap. Optionally set
`OPENAI_USAGE_LIMIT` to the monthly dollar limit. When the limit is exceeded,
the chat endpoint will respond that too many people have been chatting this
month.

## How to Deploy?

- The provided github actions publish the docker image to the ghcr.io registry
- If you want a similar functionality, you can adjust those actions to publish to your own registry
- Once it is published, you can deploy it to your own environment
