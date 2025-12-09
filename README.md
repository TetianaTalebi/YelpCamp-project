# 🏕️ YelpCamp

![Yelp Camp home page for screen width 1500px](/assets/images/YC_home_page_screen1500px.jpg "Yelp Camp Home page")

Link to this project on Render:  
**[https://tetianatalebi-yelpcamp-project.onrender.com](https://tetianatalebi-yelpcamp-project.onrender.com)**

**Demo Logins:**

| Username      | Password     |
| ------------- | ------------ |
| globetrotter  | globetrotter |
| traveller90   | traveller90  |

***

# Project Overview / Description

YelpCamp is a full-stack CRUD application designed for managing campground data, user-generated content, and geolocation-based resources. The platform enables authenticated users to perform end-to-end operations on campgrounds, including data creation, modification, and deletion. Each campground supports associated metadata such as images, pricing, descriptions, and geographic coordinates.

The system provides the following user capabilities:

- Register and authenticate using session-based login
- Create new campgrounds enriched with photos, descriptions, prices and location data
- Edit and delete campgrounds they own, with full authorization checks
- Browse campgrounds created by other users
- Submit and manage reviews with rating and comment fields
- Delete their own reviews with ownership validation

***

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

***

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

***

# 📸 Screenshots/Demo

Link to this project on Render:  
**[https://tetianatalebi-yelpcamp-project.onrender.com](https://tetianatalebi-yelpcamp-project.onrender.com)**

**Demo Logins:**

| Username      | Password     |
| ------------- | ------------ |
| globetrotter  | globetrotter |
| traveller90   | traveller90  |

## 🖼️ Screenshots

A selection of key screenshots is shown below.  
To view the complete gallery, visit the screenshots folder **[./assets/images/](./assets/images/)**.

### 🏡 Home Page

| Home Page (screen 320px) | Show Page (screen 1500px) |
|------|----------|
| ![](/assets/images/YC_home_page_screen320px.jpg) | ![](/assets/images/YC_home_page_screen1500px.jpg) |

### ⛺ All Campgrounds Page

| All Campgrounds with cluster map (screen 1500px) | All Campgrounds with pagination navbar (screen 1500px) |
|------|--------------|
| ![](/assets/images/YC_All_Camps_page_screen1500px.jpg) | ![](/assets/images/YC_All_Camps_page_screen1500px_2.jpg) |

| All Campgrounds with drop-down menu (screen 320px) | All Campgrounds with pagination navbar (screen 320px) | All Campgrounds (screen 580px) | All Campgrounds (screen 995px) | All Campgrounds with alert (screen 1000px) |
|------|--------------|----------|--------------|----------|
| ![](/assets/images/YC_All_Camps_page_screen320px.jpg) | ![](/assets/images/YC_All_Camps_page_screen320px_2.jpg) | ![](/assets/images/YC_All_Camps_page_screen580px.jpg) | ![](/assets/images/YC_All_Camps_page_screen995px.jpg) | ![](/assets/images/YC_All_Camps_page_screen1000px_alert.jpg) |

### ✅ Register and Login Pages

| Register page (screen 1200px) | Login page (screen 320px) | Login page with alert (screen 1000px) |
|------|--------------|----------|
| ![](/assets/images/YC_Register_page_screen1200px.jpg) | ![](/assets/images/YC_Login_page_screen320px.jpg) | ![](/assets/images/YC_Login_page_screen1000px_alert.jpg) |

### ✨ Add New Campground Page

| New Campground page with alert (screen 320px) | New Campground page form validation (screen 780px) | New Campground page form validation (screen 780px) |
|------|--------------|----------|
| ![](/assets/images/YC_NewCamp_page_screen320px_alert.jpg) | ![](/assets/images/YC_NewCamp_page_screen780px_form_validation_1.jpg) | ![](/assets/images/YC_NewCamp_page_screen780px_form_validation_2.jpg) |

### 🌟 Show Campground Page 

| Show Campground Page with alert (screen 780px) | Show Campground Page with map (screen 580px) | Show Campground Page with campground author logged-in (screen 1500px) |
|------|--------------|----------|
| ![](/assets/images/YC_ShowCamp_page_screen780px_alert.jpg) | ![](/assets/images/YC_ShowCamp_page_screen580px_map.jpg) | ![](/assets/images/YC_ShowCamp_page_screen1500px_author_logged-in.jpg) |

### 👍 Review form and reviews

| Review form with validation at Show Campground page (screen 320px) | Review form and reviews at Show Campground page (screen 580px) | Reviews at Show Campground page, review form is hidden because a user is not logged-in (screen 320px) |
|------|--------------|----------|
| ![](/assets/images/YC_ShowCamp_page_screen320px_review_form_green.jpg) | ![](/assets/images/YC_ShowCamp_page_screen580px_review_form_reviews.jpg) | ![](/assets/images/YC_ShowCamp_page_screen320px_reviews.jpg) |

### ❌ Show Campground Page with no image available

| Show Campground page when image is not available (screen 1200px) | Show Campground page with map when image is not available (screen 1000px) |
|------|--------------|
| ![](/assets/images/YC_ShowCamp_page_screen1200px_no_img.jpg) | ![](/assets/images/YC_ShowCamp_page_screen1000px_map_pop-up_msg.jpg) |

### 📝 Edit Campground Page

| Edit Campground (screen 1500px) | Edit Campground (screen 1500px) |
|------|--------------|
| ![](/assets/images/YC_Edit_Camp_page_screen1500px_2.jpg) | ![](/assets/images/YC_Edit_Camp_page_screen1500px.jpg) |

### 🤷‍♂️ 404 Page

| 404 Page (screen 320px) | 404 Page (screen 1000px) | 
|------|--------------|
| ![](/assets/images/YC_404_page_screen320px.jpg) | ![](/assets/images/YC_404_page_screen1000px.jpg) |

***

## 🙏 Acknowledgements

This project was inspired by and built following guidance from the Udemy course   
[*“The Web Developer Bootcamp 2025”*](https://www.udemy.com/share/101W9C3@8DTcK_av2hYV0yXuZOXIV73A-SbVYORYJ5C3MAiOxghfLpL505eBLg685qZ09XVBHg==/), taught by [*Colt Steele*](https://www.udemy.com/user/coltsteele/). 

Additional thanks to the open-source libraries and tools that made development smoother. 

***

## 📫 Contact

**Author:** Tetiana Talebi   
**Email:** [tetiana.talebi1111@gmail.com](mailto:tetiana.talebi1111@gmail.com)  
**GitHub:** [github.com/TetianaTalebi](https://github.com/TetianaTalebi)  
**LinkedIn:** [linkedin.com/in/tetianatalebi/](https://www.linkedin.com/in/tetianatalebi/)  



