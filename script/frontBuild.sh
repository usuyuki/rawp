docker-compose exec frontend yarn build
docker-compose exec frontend yarn export
# exportするとyarn devが動かなくなるので、再起動する
docker-compose restart frontend
