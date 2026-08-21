# URL Shortener for testing BuildRelay project test10

A simple and efficient URL shortening service built with Express.js and MongoDB. This application allows users to create short, shareable links that redirect to longer URLs while tracking visit statistics.

## Features

- **Create Short URLs**: Generate short, unique IDs for long URLs
- **URL Redirection**: Seamlessly redirect from short URLs to original URLs
- **Visit Analytics**: Track visit history and timestamps for each shortened URL
- **Web Interface**: User-friendly web interface for shortening URLs
- **RESTful API**: Easy-to-use API endpoints for programmatic access
- **Environment Configuration**: Secure configuration using environment variables
- **Logging**: Detailed logging for monitoring and debugging

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone or download the project**
   ```bash
   cd url_shortner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and configure:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/url_shortener
   NODE_ENV=development
   ```

4. **Ensure MongoDB is running**
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Use your connection string in MONGODB_URI

## Usage

### Development Mode
Start the server with auto-reload using nodemon:
```bash
npm run dev
```

### Production Mode
Start the server normally:
```bash
npm start
```

The server will run on `http://localhost:3000` (or the port specified in `.env`)

## API Endpoints

### 1. Generate Short URL
**POST** `/url`
- **Body**: `{ "redirectUrl": "https://example.com/very/long/url" }`
- **Response**: Returns the short URL ID and the full short URL

### 2. Redirect to Original URL
**GET** `/url/:shortId`
- **Description**: Redirects to the original URL and logs the visit
- **Response**: 301/302 redirect to the original URL

### 3. Create Short URL (Web Form)
**POST** `/url/shorten`
- **Body**: `{ "redirectUrl": "https://example.com" }`
- **Response**: Returns the shortened URL data

### 4. Get Analytics
**POST** `/url/analytics`
- **Body**: `{ "shortId": "abc123" }`
- **Response**: Returns visit history and statistics for the short URL

## Home Page
Access the web interface at:
- **GET** `/` - Main home page to create short URLs
- **GET** `/demo` - Demo endpoint returning API information

## Project Structure

```
url_shortner/
├── index.js                 # Entry point of the application
├── package.json             # Project dependencies and scripts
├── .env                     # Environment configuration (create this file)
├── controllers/
│   └── short_url.js        # Business logic for URL operations
├── routes/
│   └── short_url.js        # API route definitions
├── models/
│   └── url_model.js        # MongoDB schema for URLs
├── middleware/             # Custom middleware (if any)
├── utils/
│   ├── logger.js           # Logging utility
│   └── mongoose.js         # MongoDB connection setup
└── views/
    └── home.ejs            # Home page template
```

## Database Schema

### URL Model
```javascript
{
  shortId: String (unique, required),
  redirectUrl: String (required),
  visitedHistory: [{
    timestamp: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## Technologies Used

- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: MongoDB ODM
- **EJS**: Templating engine
- **short-id**: Short ID generation
- **dotenv**: Environment variable management
- **nodemon**: Development tool for auto-reloading

## Example Usage

### Creating a Short URL via cURL
```bash
curl -X POST http://localhost:3000/url \
  -H "Content-Type: application/json" \
  -d '{"redirectUrl":"https://www.example.com/very/long/url"}'
```

### Accessing a Short URL
```bash
# Navigate to or access via browser
http://localhost:3000/url/abc123
# This will redirect to the original URL and log the visit
```

## License

MIT License - Created by Prince Soni

## Future Enhancements

- User authentication and authorization
- Custom short URL aliases
- URL expiration dates
- Advanced analytics dashboard
- Rate limiting and security measures
- API key management
