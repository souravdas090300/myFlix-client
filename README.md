# myFlix-Client

A modern React-based single-page application for browsing and managing your favorite movies. This client-side application connects to the myFlix REST API to provide a comprehensive movie discovery experience.

## 🎬 Features

- **User Authentication**: Secure user registration and login system
- **Movie Discovery**: Browse an extensive collection of movies with detailed information
- **Advanced Search**: Filter movies by title, genre, or director in real-time
- **Favorites Management**: Add/remove movies to your personal favorites list
- **Detailed Movie Views**: Access comprehensive movie information including cast, director, and plot
- **User Profile**: Manage your account information and view your favorite movies
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🚀 Live Demo

**[View Live Application](https://my-flix-clients.netlify.app/)**

## 🛠 Technologies Used

### Frontend Framework
- **React 18** - Modern frontend library with hooks
- **React Router** - Client-side routing and navigation
- **React Bootstrap** - Responsive UI components

### Styling & Design
- **Bootstrap 5** - CSS framework for responsive design
- **SCSS** - Enhanced CSS with variables and mixins
- **Bootstrap Icons** - Icon library for UI elements

### Development Tools
- **Parcel** - Modern build tool and dev server
- **npm** - Package management
- **Git** - Version control

### Deployment
- **Netlify** - Hosting and continuous deployment

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm package manager
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/souravdas090300/myFlix-client.git
   cd myFlix-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:1234`

### Build for Production

```bash
npm run build
```

### Run tests

Run the unit tests with:

```bash
npm test
```

## 📱 Usage

### Getting Started
1. Register for a new account or login with existing credentials
2. Browse the movie collection on the main page
3. Use the search bar to filter movies by title, genre, or director
4. Click on any movie card to view detailed information
5. Add movies to your favorites using the heart icon
6. Manage your profile and view favorites in the Profile section

### Navigation
- **Movies**: Main page displaying all available movies
- **Profile**: User account management and favorites
- **Movie Details**: Comprehensive information about individual movies

## 🏗 Component Architecture

```
src/
├── components/
│   ├── login-view/          # User authentication
│   ├── main-view/           # Main application layout & routing
│   ├── movie-card/          # Movie display cards
│   ├── movie-view/          # Detailed movie information
│   ├── navigation-bar/      # Application navigation
│   ├── profile-view/        # User profile management
│   └── signup-view/         # User registration
├── index.html              # Main HTML template
├── index.jsx               # Application entry point
└── index.scss              # Global styles and theme
```

## 🔗 API Integration

This application connects to the myFlix REST API (server) for:
- User authentication and management
- Movie data retrieval
- Favorites management
- User profile operations

Update the API base URL in the client if your server is hosted at a different address. The server code (Achievement 2) should be in a separate repository — update the link below to point to that repo.

**API Repository (server)**: replace with your server repo URL

## 🌟 Key Features Implementation

### Search & Filtering
Real-time search functionality that filters movies by:
- Movie title
- Genre name
- Director name

### Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Flexible layouts for all screen sizes

### User Experience
- Smooth animations and transitions
- Loading states and error handling
- Intuitive navigation and feedback

## 🚀 Deployment

The application is deployed on Netlify with automatic deployments from the main branch.

### Deployment Configuration
- Build command: `npm run build`
- Publish directory: `dist`
- Redirects configured for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Sourav Das**
- GitHub: [@souravdas090300](https://github.com/souravdas090300)

## 🙏 Acknowledgments

- Created as part of the CareerFoundry Full-Stack Web Development Program
- Built with modern React patterns and best practices
- Deployed with Netlify's continuous deployment

