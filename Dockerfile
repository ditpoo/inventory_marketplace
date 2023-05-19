FROM node:16.3.0-alpine

ENV NODE_ENV development
ENV AWS_ACCESS_KEY_ID access_key
ENV AWS_SECRET_ACCESS_KEY secret_key
ENV AWS_DEFAULT_REGION us-east-1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY tsconfig.json ./
RUN npm install

# Bundle app source
COPY . .

RUN npm run build

RUN npm run local synth
RUN npm run local bootstrap
RUN npm run local deploy

# Bundle app source
COPY . .

# Copy keys
# COPY .env .

# Final configuration and then run!
EXPOSE 8001

CMD [ "npm", "run", "start" ]
