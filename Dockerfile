FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn
RUN yarn run build
CMD ["yarn", "run", "start"]