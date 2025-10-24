# Contact List - React Application

A modern, responsive contact management application built with React, TypeScript, and Tailwind CSS. Features include contact viewing, searching, favorites, dark mode, and a clean, accessible interface.

## 🚀 Features

### Core Features
- **View Contacts**: Browse through your contact list with avatar, name, job title, company, email, and phone
- **Search**: Real-time search with debouncing (300ms) across names, emails, and companies
- **Favorites**: Mark contacts as favorites with visual star indicators
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Accessibility**: Full keyboard navigation, ARIA roles, and screen reader support

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Query**: Efficient data fetching, caching, and state management
- **MSW (Mock Service Worker)**: Realistic API mocking for development
- **Zustand**: Lightweight state management for theme and UI state
- **Tailwind CSS**: Utility-first styling with dark mode support
- **Optimistic Updates**: Instant UI feedback for favorite toggles

## 🛠 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **TanStack Query** - Data fetching and caching
- **Zustand** - State management
- **MSW** - API mocking
- **Axios** - HTTP client

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TopBar.tsx      # Header with search and actions
│   ├── ContactList.tsx # Contact list container
│   ├── ContactItem.tsx # Individual contact row
│   ├── ContactDetail.tsx # Contact detail modal
│   └── EmptyState.tsx  # Empty state component
├── pages/              # Page components
│   └── ContactsPage.tsx # Main contacts page
├── hooks/              # Custom React hooks
│   ├── useContacts.ts  # Contact data management
│   └── useDebounce.ts # Debounce utility hook
├── api/                # API layer
│   └── contacts.ts     # Contact API functions
├── mocks/              # Mock data and handlers
│   ├── data.ts         # Sample contact data
│   ├── handlers.ts     # MSW request handlers
│   └── browser.ts      # MSW browser setup
├── stores/             # State management
│   └── theme.ts        # Theme store (Zustand)
├── types/              # TypeScript type definitions
│   └── contact.ts      # Contact-related types
├── utils/              # Utility functions
│   ├── format.ts       # Text formatting utilities
│   └── validators.ts   # Form validation utilities
└── styles/             # Global styles
    └── tailwind.css    # Tailwind CSS imports
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd contact-list
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design Decisions

### Architecture
- **Component-based**: Modular, reusable components with clear separation of concerns
- **Custom Hooks**: Encapsulated business logic in custom hooks for reusability
- **Type Safety**: Comprehensive TypeScript types for all data structures
- **State Management**: Zustand for simple global state, React Query for server state

### UI/UX
- **Mobile-first**: Responsive design starting from mobile breakpoints
- **Accessibility**: WCAG AA compliant with proper ARIA labels and keyboard navigation
- **Dark Mode**: System preference detection with manual toggle
- **Loading States**: Skeleton screens and loading indicators for better UX
- **Error Handling**: Graceful error states with retry mechanisms

### Performance
- **Debounced Search**: 300ms debounce to prevent excessive API calls
- **Optimistic Updates**: Immediate UI feedback for favorite toggles
- **Query Caching**: 5-minute stale time for efficient data management
- **Code Splitting**: Lazy loading for better initial load times

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
- Component rendering and interaction
- API integration with MSW
- User interactions and state changes
- Accessibility compliance

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=/api
VITE_APP_TITLE=Contact List
```

### MSW Configuration
Mock Service Worker is automatically enabled in development mode. To disable:

```typescript
// In src/main.tsx
if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW !== 'false') {
  // MSW setup
}
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- [ ] Contact form for adding/editing contacts
- [ ] Bulk operations (select multiple, delete, export)
- [ ] Contact import/export (CSV, vCard)
- [ ] Advanced filtering (by tags, date ranges)
- [ ] Contact groups and categories
- [ ] Photo upload for avatars
- [ ] Offline support with service workers
- [ ] Real-time collaboration
- [ ] Contact sharing and permissions

## 🐛 Known Issues

- Contact editing functionality is placeholder (shows console log)
- Add contact functionality is placeholder (shows console log)
- No pagination for large contact lists (currently limited to 50)

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS