#############
### Build ###
#############

# Base image
FROM node:10.15.3-alpine as build

# Set working directory
ENV NODE_ENV=development
ENV PORT=8080

WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN cd /usr/src/app && CI=true npm install

EXPOSE 8080
CMD ["npm", "run", "serve"]