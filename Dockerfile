FROM node:7.8
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN mkdir ~/.ssh \
  && ssh-keygen -t rsa -f ~/.ssh/id_rsa -q -P “” \
  && chmod 700 ~/.ssh
EXPOSE 3000
CMD ["npm", "start"]
