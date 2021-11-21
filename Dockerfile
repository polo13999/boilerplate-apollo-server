# Grab the node image
FROM node:16.13.0

RUN npm install -g pm2
RUN npm install -g yarn
RUN npm install -g typescript
RUN npm install -g ts-node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN yarn

# Bundle app source
COPY . /usr/src/app

# Open app port and start
EXPOSE 4005
CMD [ "npm", "run", "start" ]