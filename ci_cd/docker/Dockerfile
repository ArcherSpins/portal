FROM	node:10.15.3-alpine as builder

WORKDIR	/app

COPY	package.json .
COPY  lerna.json .
RUN	yarn

COPY	. .
RUN	yarn build


FROM	nginx:latest as web

COPY	--from=builder /app/build /usr/share/nginx/html
