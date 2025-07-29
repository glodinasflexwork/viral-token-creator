# 🚀 Deployment Guide

This guide will help you deploy the Viral Token Creator to Vercel for public access.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier available)
- Basic knowledge of Git

## 🌐 Deploy to Vercel (Recommended)

### Option 1: One-Click Deploy

1. **Click the deploy button** in the README
2. **Connect your GitHub** account to Vercel
3. **Configure the repository** name and settings
4. **Deploy** - Your app will be live in minutes!

### Option 2: Manual Deployment

#### Step 1: Fork the Repository

1. Go to the [GitHub repository](https://github.com/yourusername/viral-token-creator)
2. Click the "Fork" button in the top-right corner
3. Choose your GitHub account as the destination

#### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your forked repository
4. Vercel will automatically detect it's a React + Python project

#### Step 3: Configure Deployment

Vercel will automatically:
- ✅ Detect the React frontend
- ✅ Set up the Flask API
- ✅ Configure build settings
- ✅ Set up routing

No manual configuration needed!

#### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (2-3 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

## 🔧 Configuration

### Build Settings (Automatic)

Vercel automatically detects:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

### API Configuration (Automatic)

The `vercel.json` file configures:
- React frontend serving
- Flask API endpoints
- Proper routing between frontend and backend

## 🌍 Custom Domain (Optional)

### Add Your Domain

1. In your Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

### SSL Certificate

Vercel automatically provides SSL certificates for all domains.

## 📊 Monitoring & Analytics

### Built-in Analytics

Vercel provides:
- Page views and unique visitors
- Performance metrics
- Error tracking
- Geographic distribution

### Access Analytics

1. Go to your project dashboard
2. Click the "Analytics" tab
3. View detailed metrics

## 🔄 Continuous Deployment

### Automatic Updates

Once connected to GitHub:
- ✅ Push to `main` branch → Automatic deployment
- ✅ Pull requests → Preview deployments
- ✅ Rollback capabilities

### Manual Deployment

You can also trigger deployments manually:
1. Go to your Vercel dashboard
2. Click "Deployments"
3. Click "Redeploy"

## 🐛 Troubleshooting

### Common Issues

#### Build Failures

**Issue**: Build fails during npm install
**Solution**: 
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Python dependencies fail
**Solution**: Check `api/requirements.txt` for compatibility

#### API Endpoints Not Working

**Issue**: 404 errors on `/api/*` routes
**Solution**: Verify `vercel.json` configuration is present

#### Wallet Connection Issues

**Issue**: Wallet doesn't connect on deployed site
**Solution**: Ensure HTTPS is enabled (Vercel provides this automatically)

### Getting Help

1. **Check Vercel logs**: Go to your project → "Functions" → View logs
2. **GitHub Issues**: Report bugs in the repository
3. **Vercel Support**: Use Vercel's support for platform issues

## 🔒 Security Considerations

### Environment Variables

- No sensitive data is stored in the frontend
- API keys (if added) should be configured in Vercel's environment variables
- Never commit `.env` files to Git

### Wallet Security

- Wallet connections are handled client-side
- Private keys never leave the user's browser
- All transactions require user approval

## 📈 Scaling

### Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Edge functions
- ✅ Automatic caching
- ✅ Image optimization

### Usage Limits

Free tier includes:
- 100GB bandwidth
- 1000 serverless function invocations
- Unlimited static requests

## 🎯 Next Steps

After deployment:

1. **Test thoroughly** on both devnet and mainnet
2. **Share your URL** with the community
3. **Monitor usage** through Vercel analytics
4. **Collect feedback** and iterate

## 📞 Support

Need help with deployment?

- **Documentation**: [Vercel Docs](https://vercel.com/docs)
- **Community**: [GitHub Discussions](https://github.com/yourusername/viral-token-creator/discussions)
- **Issues**: [GitHub Issues](https://github.com/yourusername/viral-token-creator/issues)

---

**Happy deploying! 🚀**

