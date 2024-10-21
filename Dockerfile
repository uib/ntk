FROM node AS builder
COPY . /repo
WORKDIR /repo

RUN npm install && npm run build

FROM nginxinc/nginx-unprivileged:alpine
COPY --from=builder /repo/out /usr/share/nginx/html
