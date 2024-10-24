# Virgool Project Front-End

## Overview

This is a front-end website simulate virgool website (https://virgool.io)that provides users with an interactive platform to share content, connect with others, and manage their profiles. The website integrates several features, including authentication, post creation, profile management, and content tagging, and uses an external API to handle various functionalities like authentication, data retrieval, and file uploads.

## Features

- **User Authentication**: Users can securely sign up, log in, and log out. Login credentials are validated, and errors are displayed for incorrect input.
- **Profile Management**: Users can edit their profile, including adding profile images, updating bios, and changing contact details.
- **Post Creation**: Users can create posts with titles, descriptions, tags, images, and publish them. They can set custom time durations for reading (e.g., estimated reading time) and categorize posts.
- **Tags and Categories**: Posts can be assigned categories and tags to improve discoverability. Tags can be dynamically added by users and managed within posts.
- **Search Functionality**: A robust search feature allows users to search for posts or profiles by keywords or tags.
- **Post Interaction**: Posts include engagement metrics such as likes and comments, which users can interact with.
- **Post Editing and Deletion**: Users can edit or delete their posts. They can also manage post publication status.
- **Responsive Design**: The website is fully responsive and optimized for various screen sizes, ensuring a consistent experience across devices.
- **Image Uploads**: Users can upload profile pictures and post images using a simple drag-and-drop interface or a file upload button. The images are previewed before being uploaded.
- **Audio & Podcasts**: Users can interact with podcast content, including playback functionality and sound management. Podcasts can be searched, and related audio is displayed.
- **Dark/Light Theme**: Users can toggle between a dark and light theme, which is persisted across sessions.
- **User Account Management**: Users can delete their accounts, which permanently removes their data from the platform.
- **OTP Verification**: During sign-up, users are prompted to enter an OTP sent to their email to verify their account.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js
- **API**: REST API for authentication, data management, and post interactions.

## API Endpoints

- `/login`: Authenticate users.
- `/register`: User registration and OTP verification.
- `/posts`: CRUD operations for posts (Create, Read, Update, Delete).
- `/profile`: Fetch and update user profile information.
- `/category`: Manage post categories.
- `/tags`: Tag management for posts.
- `/search`: Search posts or profiles based on keywords.

## Installation

> npm install
