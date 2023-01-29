FROM nginx:1.21.5-alpine

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY . .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
