FROM node:8.9.3

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
