FROM alekzonder/puppeteer:1
WORKDIR /app
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm install

ADD . /app
CMD ["node", "src/index.js"]