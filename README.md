# 🏓 Ping Pong Paradise

An interactive Ping Pong information website built with Node.js and Express for the CAP3321 Data Wrangling course.

## 🚀 Features

- **Interactive Navigation**: Seamless section switching
- **Rules Guide**: Comprehensive ping pong rules with visual cards
- **Equipment Showcase**: Essential equipment information
- **Technique Trainer**: Interactive technique selector with detailed instructions
- **Knowledge Quiz**: 5-question ping pong quiz with scoring
- **Responsive Design**: Works on all devices
- **Modern UI**: Beautiful gradients and animations

## 🛠️ Technologies Used

- **Backend**: Node.js with Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with gradients and animations
- **Deployment**: Netlify (Static Site)

## 📁 Project Structure

```
nodejs-app/
├── public/                 # Static files served by Express
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styling
│   ├── script.js          # Interactive JavaScript
│   └── nano-banana-generated-1758152497584.png  # Ping pong image
├── server.js              # Express server configuration
├── package.json           # Node.js dependencies and scripts
├── netlify.toml          # Netlify deployment configuration
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🌐 Deployment

This application is configured for deployment on Netlify as a static site. The `netlify.toml` file configures:

- **Publish Directory**: `public/` (contains all static files)
- **SPA Routing**: Redirects all routes to `index.html`
- **Security Headers**: X-Frame-Options, XSS Protection, etc.
- **Caching**: Optimized cache headers for static assets

## 🏃‍♂️ Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Open Browser**:
   Navigate to `http://localhost:3000`

## 📚 Assignment Context

This project was created for **CAP3321 Data Wrangling Assignment 4**, demonstrating:

- Node.js and Express.js setup
- Static file serving
- Interactive frontend development
- Modern web development practices
- Deployment configuration

## 👨‍💻 Author

**Alexandre Saliba** - CAP3321 Data Wrangling Course

---

*Built with ❤️ for learning web development and ping pong enthusiasts!* 🏓
