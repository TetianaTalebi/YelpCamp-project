# YelpCamp

![Yelp Camp home page for screen width 1500px](/assets/images/YC_home_page_screen1500px.jpg "Yelp Camp Home page")

[Link to this project on Render](https://tetianatalebi-yelpcamp-project.onrender.com)

Demo Logins:

Username: globetrotter
Password: globetrotter

Username: traveller90
Password: traveller90


# Project Overview / Description

YelpCamp is a full-stack CRUD application designed for managing campground data, user-generated content, and geolocation-based resources. The platform enables authenticated users to perform end-to-end operations on campgrounds, including data creation, modification, and deletion. Each campground supports associated metadata such as images, pricing, descriptions, and geographic coordinates.

The system provides the following user capabilities:

- Register and authenticate using session-based login
- Create new campgrounds enriched with photos, descriptions, prices and location data
- Edit and delete campgrounds they own, with full authorization checks
- Browse campgrounds created by other users
- Submit and manage reviews with rating and comment fields
- Delete their own reviews with ownership validation

# Key Features

- RESTful architecture following standard CRUD route conventions
- Responsive UI using CSS Flexbox, Grid, media queries, and a Bootstrap-powered navigation bar
- Pagination system built with Bootstrap pagination components, CSS Grid layout logic and JavaScript
- Comprehensive form validation:
    - Client-side: Bootstrap validation utilities
    - Server-side: Joi schema validation
- Authentication & Authorization implemented with Express-Session, Passport, and Passport-Local, including route-level access control and ownership checks
- Interactive map integration (cluster maps and single-map views) with clickable markers and pop-up detail windows using Maptiler
- Flash messaging system using Connect-Flash for user feedback
- Security with Helmet for HTTP headers and Express-Mongo-Sanitize for injection protection
- Accessible star-rating component using the Starability library (fully keyboard-navigable, screen reader friendly, CSS-only animations)
- Micro-interactions such as hover effects, animated buttons, and “Read More” expansions for enhanced UX

# Tools and Technologies Used

## Back End

- Node.js
- Express.js (routing, middleware, request handling)
- MongoDB
- Mongoose (Object Data Modeling (ODM) library, schema modeling, validation)
- Schema design & data modeling
- EJS (Embedded JavaScript templating engine)
- EJS boilerplates, partials, and layout patterns
- RESTful API architecture
- CRUD operations implementation
- MVC (Model–View–Controller architectural pattern)
- Multer & Cloudinary for file uploads
- Maptiler SDK (Software Development Kit) for geocoding
- MongoDB Atlas (cloud-hosted database)
- Render (cloud hosting platform for deployment)

## Front End

- Client-side JavaScript
- HTML5
- CSS3
- Responsive design using CSS Flexbox and CSS Grid
- Bootstrap 4 & 5 (UI components, layout system)

## Hybrid / Shared Technologies (Used across both client and server layers)

- JSON (data serialization and API responses)
- Cookies & Sessions (authentication state management)
- Geocoding & Interactive Maps (Maptiler APIs & map rendering)

<!-- # Screenshots/GIFs/Demo

Home page
! -->

# Acknowledgements

*YelpCamp* is a full stack project that is based on a tutorial from the Udemy course [*“The Web Developer Bootcamp 2025”*](https://www.udemy.com/share/101W9C3@8DTcK_av2hYV0yXuZOXIV73A-SbVYORYJ5C3MAiOxghfLpL505eBLg685qZ09XVBHg==/), taught by [*Colt Steele*](https://www.udemy.com/user/coltsteele/). 

# Contact (My Info)

Tetiana Talebi
[GitHub](https://github.com/TetianaTalebi)
[LinkedIn](https://www.linkedin.com/in/tetianatalebi/)


