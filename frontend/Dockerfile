FROM ubuntu 
# ubuntu setup
RUN apt-get update -y
RUN apt-get upgrade -y 
RUN apt-get autoclean

# install nodejs and npm 
RUN apt-get install nodejs -y && apt-get install npm -y

# install curl and vim
RUN apt-get install curl -y
RUN apt-get install vim -y 

# install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get install apt-transport-https
RUN apt-get update && apt-get install yarn

# obtain latest stable version of node
RUN yarn cache clean
RUN yarn global add n
RUN n stable 

# setup working directory
RUN mkdir -p /usr/src/app
COPY package.json yarn.* /usr/src/app/
WORKDIR /usr/src/app

# Workaround for libpng issue https://github.com/tcoopman/image-webpack-loader/issues/76
RUN apt-get install libpng12-0

RUN yarn install 
COPY . /usr/src/app

# expose port
EXPOSE 3000

CMD [ "yarn", "start" ]
