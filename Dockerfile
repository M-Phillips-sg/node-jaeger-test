FROM node:lts
RUN apt-get update
RUN apt-get install -y openssl

# ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.* ./
RUN yarn install
RUN yarn global add typescript
ADD . .
RUN ls -a

RUN yarn run build



# RUN chmod 777 ./prisma
# RUN chmod 777 ./node_modules/prisma
# RUN chmod 777 ./node_modules/.prisma/client/index.js

# RUN npx prisma generate

EXPOSE 4010
RUN npx prisma generate
CMD [ "node", "./dist/server.js"]

