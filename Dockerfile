# Base image
FROM node:18

ENV NODE_ENV=production  

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .


RUN yarn build:prod
EXPOSE 4000
# Start the server using the production build
CMD [ "node", "dist/server.js" ]