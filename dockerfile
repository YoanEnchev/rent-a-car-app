FROM ubuntu:22.04


USER root
WORKDIR /var/www

RUN apt-get update
RUN apt-get -y install curl gnupg

RUN curl -sL https://deb.nodesource.com/setup_18.x  | bash -
RUN apt-get -y install nodejs

# Makes it visible to the ENTRYPOINT instruction.
COPY entrypoint.sh /

ENTRYPOINT ["sh", "/entrypoint.sh"]