FROM node:7.8
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN mkdir ~/.ssh \
         && ssh-keygen -t rsa -f ~/.ssh/id_rsa -q -P “” \
         && chmod 700 ~/.ssh \
         && ssh-keygen -f ~/.ssh/id_rsa.pub -e -m pem \
         && openssl rsa -in ~/.ssh/id_rsa -outform pem > /app/server/private_key.pem \
         && chmod 700 /app/server/private_key.pem
EXPOSE 3000
CMD ["npm", "start"]
