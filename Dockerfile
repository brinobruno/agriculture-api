# Use Node.js version 18 as the base image
FROM node:18.0.0

# Install the 'tsx' package globally
RUN npm i -g tsx

# Set the working directory for subsequent commands
WORKDIR /app

# Copy package.json and tsconfig.json to the container's WORKDIR
COPY ["package.json", "./"]

# Install project dependencies using 'yarn'
RUN yarn

# Copy the entire content of the current directory to WORKDIR
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run when the container starts
CMD yarn dev
