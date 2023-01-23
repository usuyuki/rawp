docker-compose exec frontend pnpm lint:fix
docker-compose exec rust cargo fix --allow-no-vcs
