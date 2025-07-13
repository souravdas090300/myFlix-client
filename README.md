# myFlix Client

A modern React-based movie application that provides a comprehensive movie browsing experience with user authentication, advanced filtering, and personalized favorites management.

## 🎬 Features

- **User Authentication**: Secure registration and login functionality with form validation
- **Movie Browsing**: View a curated collection of movies with detailed information cards
- **Advanced Movie Filter**: Real-time search and filter movies by title, genre, or director name
- **Movie Details**: Comprehensive movie view with cast, genre, director information, and plot
- **Favorites Management**: Add/remove movies from personal favorites with instant feedback
- **User Profile**: View and update user information including username, email, and password
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations and transitions

## 🛠 Technologies Used

- **Frontend Framework**: React 18 with Hooks
- **Routing**: React Router DOM for single-page application navigation
- **UI Components**: React Bootstrap for responsive components
- **Styling**: Bootstrap 5 + Custom SCSS for modern styling
- **Build Tool**: Parcel for fast bundling and development
- **Icons**: React Icons + Bootstrap Icons for enhanced UI
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API for REST API communication
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher recommended)
- npm (version 7 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/souravdas090300/myFlix-client.git
   cd myFlix-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:1234`

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🌐 Live Demo

- **Production URL**: [https://my-flix-clients.netlify.app/](https://my-flix-clients.netlify.app/)
- **API Backend**: [https://movie-flix-fb6c35ebba0a.herokuapp.com](https://movie-flix-fb6c35ebba0a.herokuapp.com)

## 📡 API Integration

This frontend application integrates with a custom REST API backend that provides:
- User authentication and registration
- Movie data with detailed information
- User favorites management
- Profile management capabilities

**API Base URL**: `https://movie-flix-fb6c35ebba0a.herokuapp.com`

## 📂 Project Structure

```
myFlix-client/
├── src/
│   ├── components/
│   │   ├── login-view/          # User authentication
│   │   ├── main-view/           # Main application layout & routing
│   │   ├── movie-card/          # Movie display cards
│   │   ├── movie-view/          # Detailed movie information
│   │   ├── navigation-bar/      # Application navigation
│   │   ├── profile-view/        # User profile management
│   │   └── signup-view/         # User registration
│   ├── index.html              # Main HTML template
│   ├── index.jsx               # Application entry point
│   └── index.scss              # Global styles and theme
├── redux-todo-exercise/        # Redux learning exercise
├── dist/                       # Production build output
├── package.json               # Project dependencies and scripts
├── netlify.toml              # Netlify deployment configuration
└── README.md                 # Project documentation
```

## ✨ Key Features in Detail

### Movie Filtering
- Real-time search as you type
- Filter by movie title, genre, or director name
- Instant results with no page refresh

### User Management
- Secure registration with form validation
- Login with persistent sessions
- Profile updates including password changes
- Account deletion with confirmation

### Favorites System
- One-click favorite/unfavorite functionality
- Visual indicators for favorited movies
- Dedicated favorites view in user profile

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interfaces

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow React best practices and hooks patterns
- Maintain consistent code formatting
- Write descriptive commit messages
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Known Issues

- Sass deprecation warnings during build (Bootstrap compatibility)
- These warnings don't affect functionality and will be resolved in future updates

## 🔮 Future Enhancements

- Redux state management integration
- Advanced filtering options (year, rating, etc.)
- Movie recommendations system
- User reviews and ratings
- Social features (sharing, following users)
- Offline functionality with service workers

## 📱 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers on iOS and Android

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sourav Das**
- GitHub: [@souravdas090300](https://github.com/souravdas090300)
- Repository: [myFlix-client](https://github.com/souravdas090300/myFlix-client)

## 🙏 Acknowledgments

- CareerFoundry for the project requirements and guidance
- React and Bootstrap communities for excellent documentation
- Movie database providers for content inspiration

---

**Note**: This is a student project created as part of the CareerFoundry Full-Stack Web Development program. It demonstrates proficiency in React, frontend development, and modern web application architecture.

## Contact

For questions or support, please contact the repository owner.