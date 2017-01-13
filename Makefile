build: Dockerfile
		docker build -t front .

run: 
		docker run -t -d --name mario -v /home/bernard/workspace/perso/front-template:/workspace front

start:
		docker start mario

server:
		docker exec mario gulp server-dist

server-build:
		docker exec mario gulp build

ssh:
		docker exec -i -t mario /bin/bash

logs:
		docker logs -f mario