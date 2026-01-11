FROM nginx:stable-alpine

COPY dist /usr/share/nginx/html

COPY nginx.conf.template /etc/nginx/templates/default.conf.template

COPY scripts/sc.sh /scripts/sc.sh

RUN chmod +x /scripts/sc.sh

EXPOSE 80

CMD ["/scripts/sc.sh"]