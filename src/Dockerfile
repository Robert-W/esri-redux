FROM node:6.7

# Update everything and install Yarn
RUN apt-get update
RUN npm install -g yarnpkg

# Set the working directory
WORKDIR /srv/src

# Define any Environment variables
ENV PORT 3000

# Copy and install any third party dependencies
COPY package.json yarn.lock /srv/src/
# RUN yarn --pure-lockfile
RUN npm install

# Copy our application code
COPY . /srv/src/

# Start the application
CMD npm start
