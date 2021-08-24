FROM node:14.17.3

WORKDIR /home/ubuntu/Ally-Doc/server/services/admins

ENV PORT=3001
ENV DB_ATLAS=mongodb+srv://allydoc:allydocsuccess@allydoc.37p8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
ENV SECRET_KEY=allydoc

COPY package.json package-lock.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]