# dDrive

dDrive is a modern, user-friendly web application designed for seamless file and folder management. With dDrive, users can easily create, navigate, and manage their directories, upload images, and maintain an organized digital workspace.

## Features

- **User Authentication**: Secure login and registration with JWT token-based authentication.
- **Folder Management**: Create, view, and delete folders with a simple and intuitive interface.
- **Breadcrumb Navigation**: Easily track and navigate the folder hierarchy with a dynamic breadcrumb component.
- **Image Upload**: Upload and manage images within folders.
- **Search Functionality**: Search for images within a folder by name.
- **Responsive Design**: Fully responsive UI for optimal experience on both desktop and mobile devices.
- **Loader Component**: Visual feedback during data fetching and processing.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/DhirajsGithub/dDriveBE.git
   cd dDriveBE
   npm install
   node server.js
   ```
   - it should start on port 3000
   
2. **Create a `.env` file in the root directory**

   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
3. **Clone the repository**

   ```bash
   git clone https://github.com/DhirajsGithub/dDriveFE.git
    cd dDriveFE
    npm install
    npm start
    ```
4. **change the base url in the src/utils/baseUrl.js to your backend url**
   ```js
   const baseURL = 'http://localhost:3000';
   ```
   - front end should start on http://localhost:5173/

## Technology Stack
* Frontend
  - React: A JavaScript library for building user interfaces.
  - React Router: A collection of navigational     components for React applications.
  - Axios: Promise-based HTTP client for making requests to the backend.
  - CSS: Custom CSS for styling components.

* Backend
  - Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
  - Express: A minimal and flexible Node.js web application framework.
  - MongoDB: A NoSQL database for storing application data.
  - Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
  - JWT (JSON Web Tokens): For secure user authentication.

```
ddrive/
│
├── client/                 # React frontend
│   ├── public/             # Public assets
│   ├── src/
│   │   ├── assets/         # Images and icons
│   │   ├── components/     # React components
│   │   ├── pages/          # React pages
│   │   ├── App.js          # Main application component
│   │   └── index.js        # Entry point for React
│   └── package.json        # Client dependencies
│
├── server/                 # Express backend
│   ├── controllers/        # Controllers for handling requests
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── server.js           # Entry point for the server
│   └── package.json        # Server dependencies
│
└── README.md               # Project documentation

```