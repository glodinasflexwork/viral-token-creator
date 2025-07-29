# 🚀 Viral Token Creator - Web Interface

A modern, user-friendly web application for creating viral cryptocurrency tokens on the Solana blockchain. Built with React, Flask, and integrated with Phantom wallet for seamless mainnet deployment.

![Viral Token Creator](https://img.shields.io/badge/Solana-Blockchain-purple)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Flask](https://img.shields.io/badge/Flask-API-green)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

## ✨ Features

### 🎯 **Token Creation**
- **Step-by-step wizard** for easy token configuration
- **Multiple themes** (Dog, Cat, Frog, AI, Political, Custom)
- **Viral features selection** (Community-driven, Meme-powered, etc.)
- **Social media integration** (Twitter, Telegram, Discord)
- **Real-time validation** and form feedback

### 💰 **Dual Network Support**
- **Devnet**: Free testing with mock SOL
- **Mainnet**: Production deployment with real SOL

### 👛 **Wallet Integration**
- **Phantom Wallet** primary support
- **Multi-wallet support** (Solflare, Torus, Ledger)
- **Automatic wallet detection**
- **Secure transaction signing**

### 🎨 **Modern UI/UX**
- **Responsive design** (mobile & desktop)
- **Dark/light mode** support
- **Smooth animations** with Framer Motion
- **Professional styling** with Tailwind CSS
- **Accessible components** with Radix UI

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.9+
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/viral-token-creator.git
   cd viral-token-creator
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install
   # or
   pnpm install
   
   # Backend dependencies
   pip install -r api/requirements.txt
   ```

3. **Start development servers**
   ```bash
   # Terminal 1: Start React frontend
   npm run dev
   
   # Terminal 2: Start Flask API
   cd api && python app.py
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🌐 Deploy to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/viral-token-creator)

### Manual Deployment

1. **Fork this repository** to your GitHub account

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your forked repository
   - Vercel will automatically detect the configuration

3. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

### Environment Variables

No environment variables required for basic functionality. The app works out of the box!

## 📁 Project Structure

```
viral-token-creator/
├── src/                          # React frontend
│   ├── components/
│   │   ├── WalletProvider.jsx    # Solana wallet context
│   │   └── WalletConnection.jsx  # Wallet connection UI
│   ├── App.jsx                   # Main application
│   └── main.jsx                  # React entry point
├── api/                          # Flask backend
│   ├── app.py                    # API endpoints
│   └── requirements.txt          # Python dependencies
├── public/                       # Static assets
├── vercel.json                   # Vercel configuration
├── package.json                  # Node.js dependencies
└── README.md                     # This file
```

## 🔧 API Endpoints

### Token Operations
- `POST /api/token/create` - Create new token
- `GET /api/token/info/:address` - Get token information
- `POST /api/wallet/create` - Generate wallet

### Utility
- `GET /api/health` - Health check
- `GET /api/networks` - Available networks
- `POST /api/marketing/generate` - Generate marketing kit

## 💡 Usage Guide

### Creating a Token

1. **Token Details**
   - Enter name, symbol, and description
   - Set total supply and decimals
   - Choose a theme

2. **Viral Features**
   - Select features that make your token viral
   - Community-driven growth, meme marketing, etc.

3. **Social Links**
   - Add your social media links (optional)
   - Twitter, Telegram, Discord, Website

4. **Deploy**
   - **Devnet**: Free testing, no wallet needed
   - **Mainnet**: Connect Phantom wallet, requires ~0.01 SOL

### Wallet Connection (Mainnet)

1. Click "Connect Wallet" on the deploy step
2. Select Phantom (or other supported wallet)
3. Approve the connection
4. Deploy your token with real SOL

## 🛠️ Development

### Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion
- **Backend**: Flask, Python 3.9
- **Blockchain**: Solana Web3.js, Wallet Adapter
- **Deployment**: Vercel, GitHub

### Adding New Features

1. **Frontend**: Add components in `src/components/`
2. **Backend**: Add endpoints in `api/app.py`
3. **Styling**: Use Tailwind CSS classes
4. **State**: Use React hooks for state management

### Testing

```bash
# Run frontend in development
npm run dev

# Test API endpoints
curl http://localhost:5000/api/health
```

## 📊 Cost Breakdown

| Network | Cost | Description |
|---------|------|-------------|
| **Devnet** | FREE | Testing with mock SOL |
| **Mainnet** | ~$2-4 USD | Real deployment (~0.01 SOL) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/viral-token-creator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/viral-token-creator/discussions)
- **Email**: support@yourdomain.com

## 🌟 Acknowledgments

- [Solana](https://solana.com) for the blockchain infrastructure
- [Phantom](https://phantom.app) for wallet integration
- [Vercel](https://vercel.com) for seamless deployment
- [React](https://react.dev) and [Tailwind CSS](https://tailwindcss.com) for the UI

---

**Made with ❤️ for the crypto community**

*Launch your viral token today! 🚀*

