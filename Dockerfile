FROM node:slim

MAINTAINER Bernard CARON <caronbernard1@gmail.com>

WORKDIR /workspace

RUN npm install gulp -g
RUN npm install

CMD ["/bin/bash"]