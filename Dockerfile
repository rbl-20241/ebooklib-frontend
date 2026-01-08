FROM node:alpine
LABEL authors="rene"

WORKDIR /ebooklib-fe
COPY . /ebooklib-fe

RUN npm install -g @angular/cli
RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]


