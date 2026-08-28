# 🎬 NepShow Backend - Complete Movie Streaming Platform

A production-ready MERN backend for an online movie streaming platform with comprehensive features for user management, movie administration, payments, and more.

## ⚡ Quick Links

- 📖 [API Documentation](./API_DOCUMENTATION.md) - Complete API endpoints reference
- 🛠️ [Setup & Admin Guide](./SETUP_AND_ADMIN_GUIDE.md) - Detailed setup and admin operations
- 🧪 [API Testing](./API_TESTING.md) - cURL examples for all endpoints

## ✨ Key Features

### 🔐 Authentication & Authorization
- User registration with email validation
- JWT-based authentication
- Role-based access control (User, Admin, Moderator)
- Password hashing with bcryptjs
- Token expiration management

### 🎥 Movie Management
- Complete CRUD operations for movies
- File uploads to Cloudinary (images & videos)
- Advanced filtering by genre, language, status
- Trending movies calculation
- Movie activation/deactivation
- Metadata management (cast, director, ratings)

### 👥 User Management
- User profile management
- Subscription plans (Free, Premium, Pro)
- User statistics and analytics
- Subscription expiry tracking
- User activation/deactivation

### 💳 Payment Processing
- Payment recording and tracking
- Multiple payment methods support
- Refund processing with reason tracking
- Revenue analytics and reports
- Monthly revenue tracking

### 🎤 Review System
- User reviews and ratings (1-5 stars)
- Review approval system
- Helpful/not helpful voting
- Review moderation

### 📖 User Experience
- Watchlist management
- Watch history tracking
- Movie recommendations based on genre
- User preferences (language, subtitles, quality)

### 📧 Email Notifications
- Payment confirmations
- Subscription expiry alerts
- New movie announcements
- Payment failure notifications
- Customizable email templates

### 🔔 Notification System
- Real-time notifications
- Unread notification tracking
- Notification categorization
- Bulk notification management

## 📁 Project Structure

```
backend/
├── 📁 config/
│   ├── db.js                  # MongoDB connection
│   ├── cloudinary.js          # Cloudinary SDK setup
│   └── email.js               # Nodemailer configuration
├── 📁 controllers/
│   ├── authController.js      # Auth endpoints
│   ├── movieController.js     # Movie CRUD & features
│   ├── userController.js      # User management
│   ├── paymentController.js   # Payment operations
│   ├── reviewController.js    # Review management
│   └── notificationController.js
├── 📁 models/
│   ├── user.js               # User schema
│   ├── movie.js              # Movie schema
│   ├── payment.js            # Payment schema
│   ├── review.js             # Review schema
│   └── notification.js       # Notification schema
├── 📁 routes/
│   ├── authRoutes.js         # Auth endpoints
│   ├── movieRoutes.js        # Movie endpoints
│   ├── userRoutes.js         # User endpoints
│   ├── paymentRoutes.js      # Payment endpoints
│   ├── reviewRoutes.js       # Review endpoints
│   └── notificationRoutes.js
├── 📁 middleware/
│   ├── auth.js               # JWT & role validation
│   └── errorHandler.js       # Global error handler
├── 📁 utils/
│   └── helpers.js            # Utility functions
├── server.js                 # Express app entry point
├── package.json              # Dependencies
├── .env.example              # Environment template
├── API_DOCUMENTATION.md      # Full API reference
├── SETUP_AND_ADMIN_GUIDE.md  # Setup instructions
└── API_TESTING.md            # Testing examples
```

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ 
- MongoDB (local or Atlas)
- Cloudinary Account
- Email Service (Gmail, SendGrid, AWS SES)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your credentials

# 3. Start server
npm run dev
# Server runs on http://localhost:5000
```

## 🔑 Environment Setup

### Essential Variables

```env
# Database
MONGO_URI=mongodb://localhost:27017/nepshow

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# Cloudinary (for images/videos)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Gmail with App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Frontend
FRONTEND_URL=http://localhost:3000
```

See [.env.example](./.env.example) for complete configuration.

## 📊 Core Models

### User Model
```
- Basic Info: name, email, password, phone
- Authentication: emailVerified, resetToken
- Role: user | admin | moderator
- Subscription: plan, dates, autoRenew
- Content: watchlist, watchHistory, preferences
- Metadata: lastLogin, createdAt, updatedAt
```

### Movie Model
```
- Details: title, description, genre[], language[]
- Media: posterImage (Cloudinary), videoUrl (Cloudinary)
- Info: duration, rating, airedDate, releaseYear
- Properties: status, quality, contentType, ageRating
- Metadata: director, cast[], tags[], viewCount, likes
- Management: createdBy, updatedBy, isActive
```

### Payment Model
```
- Details: user, plan, amount, currency
- Payment: paymentMethod, transactionId, status
- Subscription: startDate, endDate, durationType
- Refund: isRefunded, refundAmount, refundReason
- Timestamps: createdAt, updatedAt
```

### Review Model
```
- Details: movie, user, rating (1-5), comment
- Meta: title, helpful, notHelpful
- Moderation: isApproved
- Timestamps: createdAt, updatedAt
```

### Notification Model
```
- Details: user, type, title, message
- Links: relatedMovie, relatedPayment, actionUrl
- Status: isRead
- Timestamps: createdAt
```

## 🔐 API Security

### Authentication Flow
1. User registers/logs in
2. Receives JWT token (valid for 7 days)
3. Includes token in Authorization header: `Bearer <token>`
4. Server validates token on protected routes

### Authorization Levels
- **Public**: Available without authentication
- **User**: Requires valid token
- **Admin/Moderator**: Requires admin role token

### Security Features
- Password hashing with bcryptjs
- SQL injection prevention (Mongoose)
- CORS protection
- Input validation
- Error message masking
- Rate limiting ready

## 📡 API Endpoints Summary

### Authentication (5 endpoints)
```
POST   /api/auth/register          Register user
POST   /api/auth/login             Login user
GET    /api/auth/me                Get current user
PUT    /api/auth/profile           Update profile
PUT    /api/auth/change-password   Change password
```

### Movies (13 endpoints)
```
GET    /api/movies                 Get all (paginated, filtered)
GET    /api/movies/:id             Get single movie
GET    /api/movies/trending        Get trending movies
GET    /api/movies/genre/:genre    Get by genre
POST   /api/movies                 Create (admin)
PUT    /api/movies/:id             Update (admin)
DELETE /api/movies/:id             Delete (admin)
POST   /api/movies/:id/like        Like movie
POST   /api/movies/watchlist/add   Add to watchlist
POST   /api/movies/watchlist/remove Remove from watchlist
GET    /api/movies/watchlist/my-list Get watchlist
POST   /api/movies/history/add     Add to history
GET    /api/movies/history/my-history Get history
```

### Users (8 endpoints)
```
GET    /api/users                  Get all (admin)
GET    /api/users/:id              Get user (admin)
GET    /api/users/stats            Get statistics (admin)
PUT    /api/users/:id/role         Update role (admin)
PATCH  /api/users/:id/toggle-status Toggle status (admin)
PATCH  /api/users/:id/subscription Update subscription (admin)
GET    /api/users/expiring-subscriptions Expiring subs (admin)
DELETE /api/users/:id              Delete user (admin)
```

### Payments (7 endpoints)
```
POST   /api/payments                Create payment
POST   /api/payments/failure        Record failure
GET    /api/payments/my-payments   Get user payments
GET    /api/payments                Get all (admin)
GET    /api/payments/:id            Get one (admin)
GET    /api/payments/stats          Get statistics (admin)
POST   /api/payments/:id/refund    Process refund (admin)
```

### Reviews (6 endpoints)
```
POST   /api/reviews                 Create review
GET    /api/reviews/movie/:id      Get movie reviews
GET    /api/reviews/pending        Get pending (admin)
PATCH  /api/reviews/:id/approve    Approve (admin)
PATCH  /api/reviews/:id/helpful    Mark helpful
DELETE /api/reviews/:id            Delete review
```

### Notifications (7 endpoints)
```
GET    /api/notifications           Get notifications
GET    /api/notifications/unread-count Get unread count
PATCH  /api/notifications/:id/read  Mark as read
PATCH  /api/notifications/read-all  Mark all read
DELETE /api/notifications/:id       Delete notification
DELETE /api/notifications/delete-all Delete all
POST   /api/notifications           Create (admin)
```

## 🔄 Data Flow Examples

### User Registration & Login
```
1. User registers with email/password
2. Server hashes password (bcryptjs)
3. User created in MongoDB
4. JWT token generated
5. Token sent to frontend
6. Frontend stores in localStorage
```

### Movie Upload (Admin)
```
1. Admin fills movie details
2. Uploads poster image
3. Uploads movie video
4. Form data sent to backend
5. Images/videos uploaded to Cloudinary
6. Movie document created with Cloudinary URLs
7. Email notification sent to all active users
```

### Subscription Payment
```
1. User initiates payment
2. Payment gateway processes (Stripe, Razorpay)
3. Backend records payment
4. User subscription updated
5. Confirmation email sent
6. Subscription plan activated
```

## 📊 Admin Dashboard Features

### Movies Management
- ✅ Create, read, update, delete movies
- ✅ Bulk upload capabilities
- ✅ View analytics (views, likes, ratings)
- ✅ Activate/deactivate content
- ✅ Manage genres and categories

### User Management
- ✅ View all users and their details
- ✅ Change user roles
- ✅ View subscription status
- ✅ Manage user accounts
- ✅ Track subscription expiry

### Payment Tracking
- ✅ View all payments
- ✅ Process refunds
- ✅ Revenue analytics
- ✅ Payment method statistics
- ✅ Monthly revenue reports

### Content Moderation
- ✅ Approve/reject reviews
- ✅ Manage user reports
- ✅ Content visibility control

## 🧪 Testing

### Using cURL
See [API_TESTING.md](./API_TESTING.md) for complete examples.

### Using Postman
1. Import endpoints from API_TESTING.md
2. Set variables for TOKEN, USER_ID, MOVIE_ID
3. Run requests in sequence

### Using Automated Tests
```bash
# Future: Jest/Mocha test suite
npm test
```

## 🚀 Deployment

### Using PM2
```bash
npm install -g pm2
pm2 start server.js --name nepshow
pm2 save
pm2 startup
```

### Using Docker
```bash
docker build -t nepshow-backend .
docker run -p 5000:5000 nepshow-backend
```

### Environment-Specific Config
```
Development:  .env.development
Staging:      .env.staging
Production:   .env.production
```

## 📈 Performance Optimization

1. **Pagination**: All list endpoints support pagination
2. **Indexing**: Database indexes on frequently queried fields
3. **Cloudinary**: CDN delivery for images/videos
4. **Caching**: Redis setup ready (future enhancement)
5. **Compression**: gzip middleware enabled

## 🔒 Production Checklist

- [ ] Change all credentials and secrets
- [ ] Enable HTTPS/SSL
- [ ] Set NODE_ENV=production
- [ ] Configure MongoDB backups
- [ ] Enable API rate limiting
- [ ] Set up monitoring & logging
- [ ] Configure CORS for specific domains
- [ ] Enable database authentication
- [ ] Set up cloudinary security policies
- [ ] Configure email service security

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | Complete API reference with examples |
| [SETUP_AND_ADMIN_GUIDE.md](./SETUP_AND_ADMIN_GUIDE.md) | Setup instructions and admin operations |
| [API_TESTING.md](./API_TESTING.md) | cURL testing examples for all endpoints |
| [.env.example](./.env.example) | Environment variables template |

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Make changes and test thoroughly
3. Commit with clear messages: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature/feature-name`
5. Submit pull request

## 🐛 Troubleshooting

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED
Solution: Ensure mongod is running or check MONGO_URI
```

### Cloudinary Upload Error
```
Error: Invalid credentials
Solution: Verify CLOUDINARY_* env variables
```

### Email Not Sending
```
Error: SMTP error
Solution: Check SMTP credentials and Gmail App Password
```

See [SETUP_AND_ADMIN_GUIDE.md](./SETUP_AND_ADMIN_GUIDE.md#troubleshooting) for more troubleshooting.

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review API_TESTING.md for examples
3. Check server logs: `npm run dev`
4. Verify environment variables

## 📄 License

ISC License - See LICENSE file for details

## 🎯 Future Enhancements

- [ ] Redis caching layer
- [ ] WebSocket for real-time notifications
- [ ] Advanced search with Elasticsearch
- [ ] Video streaming quality adaptation
- [ ] Recommendation engine (ML)
- [ ] Multi-language support
- [ ] Geographic content restriction
- [ ] Advanced analytics dashboard
- [ ] Mobile API optimization
- [ ] Payment gateway integration (Stripe, Razorpay)

## 🎉 Getting Started Today

```bash
# 1. Clone and install
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your credentials

# 3. Start server
npm run dev

# 4. Check API
curl http://localhost:5000

# 5. Read docs
# See API_DOCUMENTATION.md for endpoints
```

---

**Built with ❤️ for the NepShow Community**

*A comprehensive, scalable, and production-ready MERN backend for modern streaming platforms.*

Last Updated: 2024
