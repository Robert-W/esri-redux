FROM node:6.7

# Update everything and install Yarn
RUN apt-get update
RUN apt-get install yarn

# Set the working directory
WORKDIR /srv/src

# Define any Environment variables
ENV PORT 3000

# Copy and install any third party dependencies
COPY package.json yarn.lock /srv/src
RUN yarn --pure-lockfile

# Copy our application code
COPY app config /srv/src

# Start the application
RUN npm start
