import React, { useState, useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { SolanaWalletProvider } from './components/WalletProvider.jsx'
import { WalletConnection } from './components/WalletConnection.jsx'
import { createToken, getConnection, checkWalletBalance } from './utils/tokenCreation.js'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Coins,
  TrendingUp,
  Users,
  Rocket,
  CheckCircle,
  Copy,
  ExternalLink,
  DollarSign,
  Wallet,
  AlertTriangle,
  Check,
  Sparkles,
  Globe,
  Twitter,
  MessageCircle
} from 'lucide-react'
import './App.css'

function AppContent() {
  const { wallet, publicKey, connected, signTransaction } = useWallet()
  const { connection } = useConnection()
  const [currentStep, setCurrentStep] = useState(0)
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    description: '',
    supply: '1000000000',
    decimals: '9',
    theme: 'custom',
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
    viralFeatures: []
  })
  const [isCreating, setIsCreating] = useState(false)
  const [createdToken, setCreatedToken] = useState(null)
  const [network, setNetwork] = useState('devnet')
  const [walletInfo, setWalletInfo] = useState(null)
  const [walletBalance, setWalletBalance] = useState(null)

  const steps = [
    { id: 0, title: 'Token Details', icon: Coins },
    { id: 1, title: 'Viral Features', icon: TrendingUp },
    { id: 2, title: 'Social Links', icon: Users },
    { id: 3, title: 'Deploy', icon: Rocket }
  ]

  const themes = [
    { value: 'dog', label: '🐕 Dog Meme', description: 'Classic dog-themed meme coin' },
    { value: 'cat', label: '🐱 Cat Meme', description: 'Feline-focused community token' },
    { value: 'frog', label: '🐸 Frog Meme', description: 'Amphibian-inspired viral coin' },
    { value: 'ai', label: '🤖 AI Theme', description: 'Artificial intelligence focused' },
    { value: 'political', label: '🗳️ Political', description: 'Political commentary token' },
    { value: 'custom', label: '✨ Custom', description: 'Your unique concept' }
  ]

  const viralFeatureOptions = [
    'Community-driven growth',
    'Meme-powered marketing',
    'Influencer partnerships',
    'Gaming utility',
    'NFT integration',
    'DeFi yield farming',
    'Viral social media campaigns',
    'Decentralized governance'
  ]

  // Check wallet balance when connected
  useEffect(() => {
    if (connected && publicKey) {
      const networkConnection = getConnection(network)
      checkWalletBalance(networkConnection, publicKey).then(result => {
        if (result.success) {
          setWalletBalance(result.balance)
        }
      })
    } else {
      setWalletBalance(null)
    }
  }, [connected, publicKey, network])

  const handleInputChange = (field, value) => {
    setTokenData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const toggleViralFeature = (feature) => {
    setTokenData(prev => ({
      ...prev,
      viralFeatures: prev.viralFeatures.includes(feature)
        ? prev.viralFeatures.filter(f => f !== feature)
        : [...prev.viralFeatures, feature]
    }))
  }

  const handleWalletConnected = (walletInfo) => {
    setWalletInfo(walletInfo)
  }

  const handleCreateToken = async () => {
    if (!connected || !publicKey || !signTransaction) {
      alert('Please connect your wallet first')
      return
    }

    if (walletBalance !== null && walletBalance < 0.01) {
      alert('Insufficient SOL balance. You need at least 0.01 SOL for transaction fees.')
      return
    }

    setIsCreating(true)
    
    try {
      // Use the network-specific connection
      const networkConnection = getConnection(network)
      
      // Create wallet object for token creation
      const walletAdapter = {
        publicKey,
        signTransaction
      }

      const result = await createToken(networkConnection, walletAdapter, tokenData)
      
      if (result.success) {
        // Add network and explorer URL with correct cluster
        const explorerUrl = network === 'devnet' 
          ? `${result.explorerUrl}?cluster=devnet`
          : result.explorerUrl
          
        setCreatedToken({
          ...result,
          explorerUrl,
          network
        })
      } else {
        alert(`Token creation failed: ${result.error}`)
      }
    } catch (error) {
      console.error('Token creation error:', error)
      alert(`Token creation failed: ${error.message}`)
    }
    
    setIsCreating(false)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return tokenData.name && tokenData.symbol && tokenData.description
      case 1:
        return tokenData.viralFeatures.length > 0
      case 2:
        return true // Social links are optional
      case 3:
        return connected && publicKey
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Viral Token Creator
                </h1>
                <p className="text-sm text-muted-foreground">Launch your meme coin on Solana</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={network} onValueChange={setNetwork}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="devnet">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Devnet</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="mainnet">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Mainnet</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!createdToken ? (
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-2 ${
                      index <= currentStep ? 'text-purple-600' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        index <= currentStep
                          ? 'bg-purple-500 border-purple-500 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium hidden sm:block">{step.title}</span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Coins className="w-6 h-6" />
                        <span>Token Details</span>
                      </CardTitle>
                      <CardDescription>
                        Configure your viral token's basic information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Token Name *</Label>
                          <Input
                            id="name"
                            placeholder="e.g., Doge Killer"
                            value={tokenData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="symbol">Symbol *</Label>
                          <Input
                            id="symbol"
                            placeholder="e.g., DOGEK"
                            value={tokenData.symbol}
                            onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your token's purpose and viral potential..."
                          value={tokenData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="supply">Total Supply</Label>
                          <Input
                            id="supply"
                            type="number"
                            value={tokenData.supply}
                            onChange={(e) => handleInputChange('supply', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="decimals">Decimals</Label>
                          <Input
                            id="decimals"
                            type="number"
                            value={tokenData.decimals}
                            onChange={(e) => handleInputChange('decimals', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {themes.map((theme) => (
                            <div
                              key={theme.value}
                              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                tokenData.theme === theme.value
                                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => handleInputChange('theme', theme.value)}
                            >
                              <div className="font-medium">{theme.label}</div>
                              <div className="text-sm text-muted-foreground">{theme.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {currentStep === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-6 h-6" />
                        <span>Viral Features</span>
                      </CardTitle>
                      <CardDescription>
                        Select features that will make your token go viral
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {viralFeatureOptions.map((feature) => (
                          <div
                            key={feature}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              tokenData.viralFeatures.includes(feature)
                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => toggleViralFeature(feature)}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                  tokenData.viralFeatures.includes(feature)
                                    ? 'bg-purple-500 border-purple-500'
                                    : 'border-gray-300'
                                }`}
                              >
                                {tokenData.viralFeatures.includes(feature) && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <span className="font-medium">{feature}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {currentStep === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-6 h-6" />
                        <span>Social Links</span>
                      </CardTitle>
                      <CardDescription>
                        Add social media links to build your community
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="website" className="flex items-center space-x-2">
                            <Globe className="w-4 h-4" />
                            <span>Website</span>
                          </Label>
                          <Input
                            id="website"
                            placeholder="https://yourtoken.com"
                            value={tokenData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="twitter" className="flex items-center space-x-2">
                            <Twitter className="w-4 h-4" />
                            <span>Twitter</span>
                          </Label>
                          <Input
                            id="twitter"
                            placeholder="https://twitter.com/yourtoken"
                            value={tokenData.twitter}
                            onChange={(e) => handleInputChange('twitter', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telegram" className="flex items-center space-x-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>Telegram</span>
                          </Label>
                          <Input
                            id="telegram"
                            placeholder="https://t.me/yourtoken"
                            value={tokenData.telegram}
                            onChange={(e) => handleInputChange('telegram', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="discord" className="flex items-center space-x-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>Discord</span>
                          </Label>
                          <Input
                            id="discord"
                            placeholder="https://discord.gg/yourtoken"
                            value={tokenData.discord}
                            onChange={(e) => handleInputChange('discord', e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {currentStep === 3 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Rocket className="w-6 h-6" />
                        <span>Deploy Your Token</span>
                      </CardTitle>
                      <CardDescription>
                        Review your configuration and deploy to Solana
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Token Summary */}
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                        <h3 className="font-semibold mb-4">Token Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Name:</span>
                            <span className="ml-2 font-medium">{tokenData.name}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Symbol:</span>
                            <span className="ml-2 font-medium">{tokenData.symbol}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Supply:</span>
                            <span className="ml-2 font-medium">{parseInt(tokenData.supply).toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Network:</span>
                            <span className="ml-2 font-medium capitalize">{network}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <span className="text-muted-foreground">Viral Features:</span>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {tokenData.viralFeatures.map(feature => (
                              <Badge key={feature} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Cost Information */}
                      <Alert>
                        <DollarSign className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Deployment Cost:</strong> {network === 'devnet' ? 'FREE (using devnet SOL)' : '~0.01 SOL (~$2-4 USD)'}
                          {connected && walletBalance !== null && (
                            <div className="mt-2">
                              <strong>Your Balance:</strong> {walletBalance.toFixed(4)} SOL
                              {walletBalance < 0.01 && (
                                <span className="text-red-500 ml-2">⚠️ Insufficient balance</span>
                              )}
                            </div>
                          )}
                        </AlertDescription>
                      </Alert>

                      {/* Wallet Connection */}
                      <WalletConnection 
                        network={network}
                        onWalletConnected={handleWalletConnected}
                      />

                      {/* Deploy Button */}
                      <div className="space-y-4">
                        {/* Debug info - remove in production */}
                        <div className="text-xs text-gray-500 p-2 bg-gray-100 rounded">
                          Debug: connected={connected ? 'true' : 'false'}, publicKey={publicKey ? 'exists' : 'null'}, balance={walletBalance}
                        </div>
                        
                        <Button 
                          onClick={handleCreateToken}
                          disabled={isCreating || !connected || !publicKey}
                          className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          {isCreating ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Creating Token...</span>
                            </div>
                          ) : !connected || !publicKey ? (
                            <div className="flex items-center space-x-2">
                              <Wallet className="w-5 h-5" />
                              <span>Connect Wallet First</span>
                            </div>
                          ) : walletBalance !== null && walletBalance < 0.01 ? (
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="w-5 h-5" />
                              <span>Insufficient SOL Balance</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <Rocket className="w-5 h-5" />
                              <span>Deploy Token</span>
                            </div>
                          )}
                        </Button>

                        {network === 'devnet' && (
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-2">
                              Need devnet SOL for testing?
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open('https://faucet.solana.com', '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Get Free Devnet SOL
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              {currentStep < steps.length - 1 && (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        ) : (
          /* Success Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Token Created Successfully! 🎉</h2>
              <p className="text-muted-foreground">
                Your viral token has been deployed to Solana {network}
              </p>
            </div>

            <Card className="text-left">
              <CardHeader>
                <CardTitle>Token Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <span className="ml-2 font-medium">{createdToken.tokenData.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Symbol:</span>
                    <span className="ml-2 font-medium">{createdToken.tokenData.symbol}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Network:</span>
                    <span className="ml-2 font-medium capitalize">{createdToken.network}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Supply:</span>
                    <span className="ml-2 font-medium">{parseInt(createdToken.tokenData.supply).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Mint Address</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={createdToken.mintAddress}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(createdToken.mintAddress)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Transaction Signature</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={createdToken.signature}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(createdToken.signature)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => window.open(createdToken.explorerUrl, '_blank')}
                    className="flex-1"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Explorer
                  </Button>
                  <Button
                    onClick={() => copyToClipboard(createdToken.explorerUrl)}
                    variant="outline"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => {
                setCreatedToken(null)
                setCurrentStep(0)
                setTokenData({
                  name: '',
                  symbol: '',
                  description: '',
                  supply: '1000000000',
                  decimals: '9',
                  theme: 'custom',
                  website: '',
                  twitter: '',
                  telegram: '',
                  discord: '',
                  viralFeatures: []
                })
              }}
              variant="outline"
              className="mt-6"
            >
              Create Another Token
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  )
}

function App() {
  const [network, setNetwork] = useState('devnet')
  
  return (
    <SolanaWalletProvider network={network}>
      <AppContent />
    </SolanaWalletProvider>
  )
}

export default App

