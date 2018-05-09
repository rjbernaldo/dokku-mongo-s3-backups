FROM node:7.2.0

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
RUN echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.6 main" | tee /etc/apt/sources.list.d/mongodb-org-3.6.list
RUN apt-get update -y && \ 
    apt-get install -y mongodb-org

WORKDIR /srv/app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]