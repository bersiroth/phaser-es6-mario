build: Dockerfile
		docker build -t front .

new:
		docker run -t -d --name mario -v /home/bernard/workspace/perso/front-template:/workspace front

start:
		docker start mario

start-server:
		docker start mario
		docker exec -i -t mario gulp server

server:
		docker exec -i -t mario gulp server

deploy:
		docker exec -i -t mario gulp deploy

ssh:
		docker exec -i -t mario /bin/bash

logs:
		docker logs -f mario