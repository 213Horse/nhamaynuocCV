FROM node:18 as build
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM nginx:alpine as deploy
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build /app/build .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
