# FROM node:16
FROM node:lts-alpine3.16
# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock ./
# RUN npm install --location=global yarn
RUN yarn install --production=true
# RUN npm ci --only=production
# Bundle app source
COPY . .
EXPOSE 3000
CMD [ "node", "src/index.ts" ]

