# DEADPANDR Frontend

React-based frontend for the DEADPANDR dark comedy generator.

## Setup

### Prerequisites
- Node.js 14+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
deadpandr-frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── favicon.ico          # Add your panda logo here
│   ├── logo192.png          # Add your panda logo here
│   └── logo512.png          # Add your panda logo here
├── src/
│   ├── App.js               # Main application component
│   ├── App.css              # App styling
│   ├── index.js             # Entry point
│   └── index.css            # Global styles with Tailwind
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Configuration

### API Endpoint

The frontend connects to the backend API. Update the API URL in `src/App.js`:

```javascript
const API_URL = 'https://deadpandr.onrender.com'; // Production
// const API_URL = 'http://localhost:5000'; // Local development
```

### Favicon

Replace the default React favicon with your DEADPANDR panda logo:

1. Place your logo files in the `public/` folder:
   - `favicon.ico` (32x32)
   - `logo192.png` (192x192)
   - `logo512.png` (512x512)

2. Clear browser cache and refresh

## Features

- **Multiple Comedy Styles**: Default, Absurdist, Cynical, Gallows, Nihilistic, Sarcastic, Surreal
- **Output Types**: One-liners, Routines, Punchlines, Random Jokes
- **Customizable Parameters**:
  - Madness level (creativity)
  - Darkness level
  - Number of jokes
  - Transition types (for routines)
- **Export Options**: Save as TXT or PDF

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Deployment

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## Available Scripts

- `npm start` - Run development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (irreversible)

## Troubleshooting

**Styles not loading:**
- Make sure Tailwind CSS is installed: `npm install -D tailwi6ndcss postcss autoprefixer`
- Check that `tailwind.config.js` and `postcss.config.js` exist

**API connection fails:**
- Verify the backend is running
- Check the API_URL in App.js
- Look for CORS errors in browser console

**Icons not showing:**
- Install lucide-react: `npm install lucide-react`

## License

MIT License
