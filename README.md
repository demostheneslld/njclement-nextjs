# Simple NextJS + Docker Brochure App for NJC Enterprises

Personal Site for Nathan Clement

## How to Run?

- Local via docker: `./scripts/docker_local.sh` -- this simulates the deployment environment
- Local Development via bun: `bun run dev`

## How to Deploy?

- The provided github actions publish the docker image to the ghcr.io registry
- If you want a similar functionality, you can adjust those actions to publish to your own registry
- Once it is published, you can deploy it to your own environment
