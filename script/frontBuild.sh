docker-compose exec frontend pnpm build
docker-compose exec frontend pnpm export
# exportするとyarn devが動かなくなるので、再起動する
docker-compose restart frontend
