## *My current project*

### Devnotes - FullStack MERN AWS Project

Currently transferring frontend and backend servers to AWS EC2 instances. UI is done with light/dark mode option for now. Improvements made once deployed on AWS successfully..

#### current app: 

Home page:

<img src="images/Screenshot 2025-02-19 at 7.43.32 PM.png" width="500" title="home">

Dark Mode Home Page: 

<img src="images/Screenshot 2025-02-19 at 7.44.02 PM.png" width="500" title="homeDarkMode">

SignUp + SignUp Dark mode: 

<img src="images/Screenshot 2025-02-19 at 7.44.27 PM.png" width="500" title="SignUp">

<img src="images/Screenshot 2025-02-19 at 7.44.39 PM.png" width="500" title="SignUpDarkMode">

Dashboard once logged in: 
(Dark mode version unavailable due to backend connectivity issues with backend ec2 instance)

<img src="images/Screenshot 2025-02-09 at 9.59.49 PM.png" width="500" title="dashboard">

Check documentation for information on the project, tech, structure and plan

Check ToDos for the rough development process. 

## For further DevNotes development:

### For local development:

Change constants.js to: 

export const BASE_URL = "http://localhost:8000"

Run both frontend and backend locally

Test your changes


### Before deploying:

Change constants.js back to:

export const BASE_URL = "http://54.166.240.19:8000"

Commit and push to GitHub


### On EC2 instances:

Pull the changes: git pull

Rebuild frontend: npm run build

Copy to web server: sudo cp -r dist/* /var/www/devnotes/

Restart backend if needed: pm2 restart devnotes-backend
