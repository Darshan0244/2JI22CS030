# React URL Shortener

A frontend-only URL shortener application built with React and Material UI.
## Try Here 👉 https://url-shortner-orpin-seven-21.vercel.app/

## Features
- ✅ Shorten up to 5 URLs concurrently
- ✅ Custom shortcodes with uniqueness validation
- ✅ Configurable validity periods (default: 30 minutes)
- ✅ Click tracking and statistics
- ✅ Frontend-only redirection simulation
- ✅ Comprehensive logging
- ✅ Material UI design
- ✅ Robust error handling

## Setup Instructions
1. Install dependencies: `npm install`
2. Start the development server: `npm start`
3. Open http://localhost:3000 in your browser

## Usage
### URL Shortener Page (/)
- Enter original URL (required)
- Set validity period in minutes (optional, default: 30)
- Provide custom shortcode (optional, alphanumeric only)
- Click "Shorten URL" to generate short link

### Statistics Page (/statistics)
- View all shortened URLs from current session
- See click counts, expiry status, and timestamps

## Technical Implementation
- **Frontend**: React 18 with Material UI
- **Routing**: React Router v6
- **State Management**: React Context API
- **Validation**: Client-side URL and shortcode validation
- **Logging**: Console + localStorage persistence
- **Uniqueness**: In-memory state management

## System Design Document

### Architecture Overview
Client-side only architecture with React as the core framework. The design prioritizes simplicity, maintainability, and user experience while operating entirely within browser constraints.

### Key Design Decisions
1. **Frontend-Only Architecture**: Reduces deployment complexity, eliminates server costs, provides immediate feedback
2. **Component-Based Architecture**: Modular React components with clear separation of concerns
3. **State Management**: React Context API for global state management

### Technology Stack
- **React 18**: Latest stable version with improved performance
- **Material UI v5**: Comprehensive component library
- **React Router v6**: Modern routing solution

### Data Modeling
```javascript
{
  id: number,           // Unique identifier
  originalUrl: string,  // Source URL
  shortUrl: string,     // Generated shortened URL
  shortcode: string,    // Unique alphanumeric identifier
  expiryTime: string,   // ISO timestamp for expiration
  clicks: number,       // Redirect counter
  createdAt: string     // Creation timestamp
}
```

### Core Algorithms
- **Shortcode Generation**: Base36 encoding of random numbers (6 characters)
- **URL Validation**: Native URL constructor for robust validation
- **Expiry Management**: Client-side timestamp comparison

### Scalability Considerations
**Current Limitations**: 5 URL limit, session-based persistence, limited uniqueness scope
**Future Paths**: Local storage integration, IndexedDB implementation, service worker, backend integration

### Security Considerations
**Implemented**: Input sanitization, XSS prevention, client-side only architecture
**Limitations**: No HTTPS enforcement, no malware scanning, localStorage accessibility

### Performance Optimizations
- Component memoization
- Efficient state updates
- Comprehensive logging system
- Error boundaries and user feedback

### Assumptions
1. Modern browsers with ES6+ support
2. JavaScript enabled
3. Session-based usage acceptable
4. Network connectivity available
5. No malicious URL shortening attempts

### Future Enhancements
1. Analytics dashboard with charts
2. Bulk operations (import/export)
3. Custom domains
4. API integration (QR codes, link preview)
5. Progressive Web App features

This design balances simplicity with functionality, providing a solid foundation for future enhancements while meeting current requirements effectively.
