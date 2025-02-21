# DevNotes - Technical Documentation

This document provides detailed technical documentation for the DevNotes application, covering architecture, components, database schemas, API endpoints, deployment instructions, and development workflows.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Frontend Architecture](#frontend-architecture)
  - [Component Structure](#component-structure)
  - [State Management](#state-management)
  - [Routing](#routing)
  - [Theming](#theming)
- [Backend Architecture](#backend-architecture)
  - [Server Structure](#server-structure)
  - [Database Schema](#database-schema)
  - [Authentication](#authentication)
  - [API Endpoints](#api-endpoints)
- [AWS Infrastructure](#aws-infrastructure)
  - [VPC Configuration](#vpc-configuration)
  - [EC2 Instances](#ec2-instances)
  - [Security Groups](#security-groups)
  - [Terraform Configuration](#terraform-configuration)
- [Development Workflow](#development-workflow)
  - [Local Development](#local-development)
  - [Deployment Process](#deployment-process)
  - [Continuous Integration](#continuous-integration)
- [Troubleshooting](#troubleshooting)

## Architecture Overview

DevNotes follows a standard three-tier architecture:

1. **Presentation Layer (Frontend)**: React-based single-page application
2. **Application Layer (Backend)**: Node.js/Express REST API
3. **Data Layer**: MongoDB database (hosted on MongoDB Atlas)

The application is deployed on AWS using Infrastructure as Code (Terraform) with the following components:
- Frontend hosted on EC2 with NGINX
- Backend API hosted on EC2 with Node.js/Express
- MongoDB Atlas for database storage
- VPC with public subnet for network isolation
- Security groups for access control

## Frontend Architecture

The frontend is built with React and follows a component-based architecture.

### Component Structure
```
frontend/
├── notes-app/
├── public/
├── src/
├── components/
│   ├── cards/
│   │   ├── NoteCard.jsx        # Individual note card display
│   │   └── ProfileInfo.jsx     # User profile information
│   ├── EmptyCard/
│   │   └── EmptyCard.jsx       # Empty state display
│   ├── Input/
│   │   ├── PasswordInput.jsx   # Password input with toggle
│   │   └── TagInput.jsx        # Tag input with add/remove
│   ├── Navbar/
│   │   └── Navbar.jsx          # Application navigation bar
│   ├── SearchBar/
│   │   └── SearchBar.jsx       # Search functionality
│   ├── Theme/
│   │   └── ThemeToggle.jsx     # Dark/light mode toggle
│   └── ToastMessage/
│       └── Toast.jsx           # Toast notifications
├── context/
│   └── ThemeContext.jsx        # Theme state management
├── pages/
│   ├── Home/
│   │   ├── AddEditNotes.jsx    # Add/edit note modal
│   │   ├── Home.jsx            # Dashboard page
│   │   └── HomePage.jsx        # Landing page
│   ├── Login/
│   │   └── Login.jsx           # Login page
│   └── SignUp/
│       └── SignUp.jsx          # Signup page
├── utils/
│   ├── axiosInstance.js        # Axios configuration
│   ├── constants.js            # Global constants
│   └── helper.js               # Helper functions
├── App.jsx                     # Application routes
├── index.css                   # Global styles
└── main.jsx                    # Application entry point
```

### State Management

The application uses React's built-in state management:
- Local component state with `useState` for component-specific data
- Context API with `useContext` for global state (e.g., theming)
- `useEffect` for side effects and data fetching

### Routing

Routing is handled by React Router v7:

```javascript
// App.jsx
const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
)
```

## Backend Architecture

The backend is built with Node.js and Express, following a standard REST API structure.

### Server Structure

```
backend/
├── models/
│   ├── note.model.js       # Note schema definition
│   └── user.model.js       # User schema definition
├── utilities.js            # Helper functions (authentication, etc.)
├── config.json             # Configuration (database connection, etc.)
├── .env                    # Environment variables
└── index.js                # Main server file with API endpoints
```

## Database Schema

#### User Schema
```javascript
const userSchema = new Schema({
    fullName: {type: String},
    email: {type: String},
    password: {type: String},
    createdOn: {type: Date, default: new Date().getTime()},
});
```
#### Note Schema
```javascript
const noteSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    tags: { type: [String], default: []},
    isPinned: { type: Boolean, default: false},
    userId: { type: String, required: true},
    createdOn: { type: Date, default: new Date().getTime()},
});
```

## Authentication


Authentication is implemented using JWT (JSON Web Tokens):

1. User logs in with email and password
2. Server validates credentials and generates a JWT
3. JWT is stored in localStorage on the client
4. JWT is sent with each API request via Authorization header
5. Server validates JWT for protected routes


## API Endpoints

| Endpoint | Method | Description | Authentication Required | Request Body | Response |
|----------|--------|-------------|------------------------|--------------|----------|
| `/` | GET | API health check | No | None | `{"data":"Hello"}` |
| `/create-account` | POST | Create new user account | No | `{fullName, email, password}` | User object with access token |
| `/login` | POST | User login | No | `{email, password}` | Access token |
| `/get-user` | GET | Get current user info | Yes | None | User object |
| `/add-note` | POST | Create a new note | Yes | `{title, content, tags}` | New note object |
| `/edit-note/:noteId` | PUT | Update a note | Yes | `{title, content, tags}` | Updated note object |
| `/get-all-notes` | GET | Get all notes for user | Yes | None | Array of notes |
| `/delete-note/:noteId` | DELETE | Delete a note | Yes | None | Success message |
| `/update-note-pinned/:noteId` | PUT | Toggle note pin status | Yes | `{isPinned}` | Updated note object |
| `/search-notes` | GET | Search notes | Yes | Query param: `query` | Array of matching notes |


## AWS Infrastructure

VPC Configuration
The application is deployed within a VPC with the following components:

 - CIDR Block: 10.0.0.0/16
 - Public Subnet: 10.0.1.0/24
 - Internet Gateway for external access
 - Route Tables for traffic routing
#### EC2 Instances
Two EC2 instances are used to host the application:

 - Frontend Instance

    Type: t2.micro

    AMI: Ubuntu 22.04 LTS

    Software: Node.js, npm, NGINX

    Configuration: NGINX serves the React build files


 - Backend Instance

    Type: t2.micro

    AMI: Ubuntu 22.04 LTS

    Software: Node.js, npm, PM2

    Configuration: PM2 manages the Node.js process

#### Security Groups

Frontend Security Group

 - Inbound:

    Port 80 (HTTP) from anywhere

    Port 443 (HTTPS) from anywhere
    Port 22 (SSH) from specified IP



Backend Security Group

 - Inbound:

    Port 8000 (API) from anywhere
    Port 22 (SSH) from specified IP



### Terraform Configuration

The AWS infrastructure is defined in Terraform:
```
# Main VPC
resource "aws_vpc" "devnotes_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "devnotes-vpc"
  }
}

# Frontend EC2 Instance
resource "aws_instance" "frontend" {
  ami           = var.ami_id
  instance_type = "t2.micro"
  key_name      = var.key_name

  subnet_id                   = aws_subnet.public_subnet.id
  vpc_security_group_ids      = [aws_security_group.frontend_sg.id]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y nodejs npm nginx
              sudo npm install -g pm2
              EOF

  tags = {
    Name = "devnotes-frontend"
  }
}

# Backend EC2 Instance
resource "aws_instance" "backend" {
  ami           = var.ami_id
  instance_type = "t2.micro"
  key_name      = var.key_name

  subnet_id                   = aws_subnet.public_subnet.id
  vpc_security_group_ids      = [aws_security_group.backend_sg.id]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y nodejs npm
              sudo npm install -g pm2
              EOF

  tags = {
    Name = "devnotes-backend"
  }
}

# Security group for backend - add the required 8000 port access
resource "aws_security_group" "backend_sg" {
  # ... other configuration ...

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # For production, restrict this
  }
}
```
## Troubleshooting

### Common Issues

MongoDB Connection Issues

 - Check if MongoDB Atlas IP whitelist includes your EC2 instance IP
 - Verify correct connection string in .env file
 - Check MongoDB Atlas user permissions

CORS Issues

 - Verify CORS configuration in backend index.js
 - Check security group settings for proper port access

EC2 Connectivity Issues

 - Check security group inbound rules
 - Verify instance status in AWS Console
 - Check NGINX configuration on frontend instance




