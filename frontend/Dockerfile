# Stage 1: Build the React app
#as builder represent a stage and assign name to a stage in the multi-stage build process. 
#It allows us to separate the build environment from the final runtime environment, 
#which helps to keep the final image smaller and more secure. 
FROM node:20-alpine AS builder 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the built files with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

#we follow these two stages. only when our project is static.
#if we have a dynamic project, we can use the backend server to serve the frontend files.   
# then we add this line of code in the backend Dockerfile to serve the frontend files from the backend server.
#FROM node:20-alpine AS builder
# ... build steps ...

#FROM node:20-alpine
#COPY --from=builder /app/.next ./.next
# ... aur Node.js hi chalega final stage mein, Nginx nahi
#CMD ["node", "server.js"]