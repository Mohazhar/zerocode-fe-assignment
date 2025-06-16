# ChatBot AI - React TypeScript Chatbot App

A modern, production-ready chatbot web application built with React, TypeScript, and Tailwind CSS. Features authentication, real-time messaging simulation, voice input, and chat export capabilities.

## 🚀 Live Demo

**Deployed URL**: [https://your-chatbot-app.vercel.app](https://your-chatbot-app.vercel.app)

**GitHub Repository**: [https://github.com/your-handle/zerocode-fe-assignment](https://github.com/your-handle/zerocode-fe-assignment)

## ✨ Features

### 🔐 Authentication (Supabase-based)

- User registration and login
- Secure session management
- Protected routes
- Email confirmation workflow

### 💬 Chat Interface

- Real-time message simulation
- Auto-scroll to latest messages
- Message history navigation (↑↓ arrow keys)
- Loading indicators and typing animations
- Responsive design for mobile and desktop

### 🎨 Modern UI/UX

- Light and dark mode toggle
- Tailwind CSS for styling
- Smooth animations and transitions
- Professional, modern design
- Fully responsive layout

### 🎙️ Voice Input (Bonus)

- Web Speech API integration
- Microphone button with visual feedback
- Real-time voice-to-text conversion
- Cross-browser compatibility

### 📤 Chat Export (Bonus)

- Export chat history as text files
- Export as JSON for data analysis
- Downloadable conversation logs

## 🏗️ Architecture

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatMessage.tsx     # Individual message component
│   │   ├── ChatInput.tsx       # Message input with history
│   │   └── VoiceInput.tsx      # Voice recording component
│   ├── ui/                     # Reusable UI components
│   │   └── ThemeToggle.tsx     # Dark mode toggle
│   └── ProtectedRoute.tsx      # Route protection wrapper
├── context/
│   └── AuthContext.tsx         # Authentication state management
├── pages/
│   ├── Login.tsx              # Login page
│   ├── Register.tsx           # Registration page
│   ├── Chat.tsx               # Main chat interface
│   └── NotFound.tsx           # 404 page
├── utils/
│   ├── chatApi.ts             # Chat API simulation
│   ├── speechRecognition.ts   # Voice input utilities
│   └── exportChat.ts          # Chat export functionality
└── lib/
    └── supabase.ts            # Supabase client configuration
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: Supabase Auth
- **Routing**: React Router 6
- **Voice Input**: Web Speech API
- **State Management**: React Context API
- **File Export**: Blob API
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### 1. Clone and Install

```bash
git clone https://github.com/your-handle/zerocode-fe-assignment.git
cd zerocode-fe-assignment
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Update `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Supabase Configuration

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Enable email authentication in Authentication > Settings
4. (Optional) Configure email templates and SMTP

### 4. Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### 5. Production Build

```bash
npm run build
npm run preview
```

## 📱 Usage

### Getting Started

1. **Register**: Create a new account with email/password
2. **Email Verification**: Check your email for confirmation link
3. **Login**: Sign in with your credentials
4. **Chat**: Start conversations with the AI chatbot

### Features

- **Voice Input**: Click the microphone button to speak your message
- **Message History**: Use ↑↓ arrow keys to navigate previous messages
- **Export Chat**: Use the menu to download conversation history
- **Dark Mode**: Toggle between light and dark themes
- **Responsive**: Works seamlessly on mobile and desktop

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**:

   ```bash
   vercel login
   vercel --prod
   ```

2. **Environment Variables**:

   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel dashboard
   - Set build command: `npm run build`
   - Set output directory: `dist`

3. **Custom Domain** (Optional):
   - Configure custom domain in Vercel settings

### Other Platforms

The app can be deployed to any static hosting service:

- **Netlify**: Drag and drop `dist` folder after `npm run build`
- **GitHub Pages**: Configure GitHub Actions for automated deployment
- **Firebase Hosting**: Use Firebase CLI to deploy

## 🧪 Testing

```bash
# Run type checking
npm run typecheck

# Run unit tests
npm test

# Format code
npm run format.fix
```

## 🔧 Configuration

### Tailwind Customization

Update `tailwind.config.ts` to modify:

- Color schemes
- Typography scales
- Spacing system
- Custom animations

### Chat Bot Responses

Modify `src/utils/chatApi.ts` to:

- Add new response patterns
- Integrate real AI APIs (OpenAI, etc.)
- Customize response timing

### Voice Input Settings

Configure `src/utils/speechRecognition.ts` for:

- Language preferences
- Recognition accuracy
- Timeout settings

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the documentation and examples
- Review common setup problems below

### Common Issues

**Supabase Connection Issues**:

- Verify environment variables are correctly set
- Check Supabase project is active and properly configured
- Ensure authentication is enabled in Supabase dashboard

**Voice Input Not Working**:

- Ensure HTTPS is enabled (required for voice input)
- Check browser permissions for microphone access
- Test in supported browsers (Chrome, Firefox, Safari)

**Build Errors**:

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify TypeScript configuration

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
