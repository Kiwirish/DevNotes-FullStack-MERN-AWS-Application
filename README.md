# DevNotes - FullStack MERN AWS Application

DevNotes is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js) and deployed on AWS infrastructure using Terraform. It allows developers to create, organize, and save code snippets and development notes.


#### Live Demo: http://98.83.115.12


<img src="images/Screenshot 2025-02-21 at 5.35.44 PM.png" width="350" title="LightModeDashboard">


<img src="images/Screenshot 2025-02-21 at 5.36.11 PM.png" width="350" title="DarkModeDashboard">

## Table of Contents

- [DevNotes - FullStack MERN AWS Application](#devnotes---fullstack-mern-aws-application)
      - [Live Demo: http://98.83.115.12](#live-demo-http988311512)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [DevOps \& Infrastructure](#devops--infrastructure)
  - [Architecture](#architecture)
  - [Get Started Locally, or Deploy:](#get-started-locally-or-deploy)
    - [Local Development](#local-development)
    - [Deployment (IaC using Terraform)](#deployment-iac-using-terraform)
  - [App update workflow](#app-update-workflow)
    - [Before pushing change API URL back to production:](#before-pushing-change-api-url-back-to-production)
    - [On EC2 instances:](#on-ec2-instances)
  - [More on Infrastructure](#more-on-infrastructure)
      - [EC2 Instances:](#ec2-instances)
    - [Terraform Configuration](#terraform-configuration)
  - [Developed by](#developed-by)
      - [Blake Leahy](#blake-leahy)




## Features

 - User Authentication: Secure signup and login functionality
  
 - Note Management: Create, read, update, and delete notes
  
 - Search Functionality: Search through your notes by title or content
 - HashTag System: Organize notes with custom tags
 - Pin Important Notes: Pin priority notes to the top of your dashboard
 - Dark Mode: Toggle between light and dark themes
 - Responsive Design: Works on desktop and mobile devices

## Tech Stack

### Frontend

 - React: UI library for building the user interface
  
 - React Router: Client-side routing
  
 - Tailwind CSS: Utility-first CSS framework for styling
 - Framer Motion: Animation library for React
 - Axios: HTTP client for making API calls
 - React Icons: Icon library for UI elements
 - React Modal: Modal component for React

### Backend

 - Node.js: JavaScript runtime for the server
  
 - Express.js: Web framework for building the REST API
  
 - MongoDB: NoSQL database for storing data
 - Mongoose: ODM library for MongoDB
 - JWT: JSON Web Tokens for authentication
 - CORS: Cross-origin resource sharing middleware

### DevOps & Infrastructure

 - AWS: Cloud provider for hosting the application:

    - EC2: Virtual servers for hosting frontend and backend
    - VPC: Network isolation for EC2 instances
    - Security Groups: Firewall rules for EC2 instances

 - Terraform: Infrastructure as Code (IaC) for AWS resource provisioning
 - PM2: Process manager for Node.js applications
 - NGINX: Web server for serving the frontend
 - GitHub: Version control and source code management

## Architecture

DevNotes follows a microservices architecture with separate frontend and backend services:

 - Frontend EC2: Hosts the React application served by NGINX
  
 - Backend EC2: Runs the Node.js/Express API with PM2
  
 - MongoDB Atlas: Cloud-hosted MongoDB database
 - Terraform: Manages infrastructure creation and updates


## Get Started Locally, or Deploy:

Prerequisites

 - Node.js (v18+)
 - npm or yarn
 - MongoDB (local or, if deploymentAtlas)
 - AWS account (for deployment)
 - Terraform (for infrastructure)

### Local Development

1. Clone the repo
    ```
    git clone https://github.com/Kiwirish/DevNotes-FullStack-MERN-AWS-Application.git

    cd DevNotes-FullStack-MERN-AWS-Application

    ```     

2. Setup the backend
    ```
    cd backend
    npm install

    # Create a .env file with the following:
    # ACCESS_TOKEN_SECRET = "your_secret_key"
    # MONGODB_URI = "your_mongodb_connection_string"

    npm start

    ```   

3. Setup the frontend
    ```
    cd ../frontend/notes-app
    npm install

    # Update src/utils/constants.js to point to the local backend:
    # export const BASE_URL = "http://localhost:8000"

    npm run dev

    ```   

4. Access the app locally: 

    Open your browser and navigate to: http://localhost:5173

### Deployment (IaC using Terraform)

1. Configure the AWS CLI:
    ```
    cd ../frontend/notes-app
    npm install

    # Update src/utils/constants.js to point to the local backend:
    # export const BASE_URL = "http://localhost:8000"

    npm run dev
    ```   

2. Create SSH Key Pair: 
    ```
    aws ec2 create-key-pair --key-name devnotes-key --query 'KeyMaterial' --output text > devnotes-key.pem

    chmod 400 devnotes-key.pem

    mv devnotes-key.pem ~/.ssh/

    ```   

3. Terraform Variables settings: Create a terraform.tfvars file
    ```
    aws_region   = "us-east-1"
    key_name     = "devnotes-key"
    my_ip        = "YOUR_IP/32"
    mongodb_uri  = "YOUR_MONGODB_CONNECTION_STRING"
    ```   

4. Initialise and run Terraform plan to get Infrastructure up through code
    ```
    cd terraform
    terraform init
    terraform plan
    terraform apply
    ```   

5. Deploy Application on EC2 Instances:

 - Connect to instances using SSH
 - Clone repository
 - Configure and start backend
 - Configure and build frontend
 - Set up NGINX for the frontend

Refer to Documentation.txt for more detailed deployment documentation.



## App update workflow

Change API URL in constants.js to: 
```
export const BASE_URL = "http://localhost:8000"
```

 - Run both frontend and backend locally

 - Test your changes


### Before pushing change API URL back to production:

Change API URL in constants.js back to:

    ```
    export const BASE_URL = "http://54.166.240.19:8000"
    ```

 - Commit and push changes


### On EC2 instances:

- SSH into instances
    ```
    ssh -i ~/.ssh/devnotes-key.pem ubuntu@YOUR_EC2_IP
    ```

- Pull latest changes
    ```
    cd DevNotes-FullStack-MERN-AWS-Application

    git pull
    ```
 - For frontend:
    ```
    cd frontend/notes-app

    npm install

    npm run build

    sudo cp -r dist/* /var/www/devnotes/
    ```

 - For backend:
    ```
    cd backend

    npm install

    pm2 restart devnotes-backend
    ```

## More on Infrastructure

The application uses the following AWS resources:

- VPC: Isolated network for EC2 instances
- Subnet: Public subnet for EC2 instances
- Internet Gateway: Enables internet access for EC2 instances
- Security Groups:

**Frontend**: Allows inbound traffic on ports 80 (HTTP), 443 (HTTPS), and 22 (SSH)\

**Backend**: Allows inbound traffic on ports 8000 (API) and 22 (SSH)


#### EC2 Instances:

**Frontend**: t2.micro running Ubuntu 22.04 LTS
**Backend**: t2.micro running Ubuntu 22.04 LTS



### Terraform Configuration

All infrastructure is defined in Terraform configuration files:

 - main.tf: Main infrastructure definition
 - variables.tf: Input variables
 - outputs.tf: Output values
 - terraform.tfvars: Variable values (not committed to repository)

To make changes to the infrastructure:

 - Update the relevant Terraform files
 - Run terraform plan to see changes
 - Run terraform apply to apply changes



## Developed by
#### Blake Leahy 
- [GitHub](https://github.com/Kiwirish)
- [Portfolio](https://blakeleahy.tech)
