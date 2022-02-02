# FROM means that we inherit a node image so that we have node already installe inside the container, so we can run npm install and npm start!
FROM node:16

# Create app directory in the VMs system (this is where the project will be located and run from)
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "npm" , "start" ]