import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { 
  Rocket, 
  Coins, 
  Wallet, 
  Settings, 
  TrendingUp, 
  Users, 
  Globe, 
  Twitter, 
  MessageCircle,
  Zap,
  Star,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  Sparkles,
  Target,
  DollarSign,
  BarChart3
} from 'lucide-react'
import './App.css'

function App() {
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
    viralFeatures: [],
    network: 'devnet'
  })
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentResult, setDeploymentResult] = useState(null)
  const [walletInfo, setWalletInfo] = useState(null)

  const steps = [
    { id: 0, title: 'Token Details', icon: Coins, description: 'Basic token information' },
    { id: 1, title: 'Viral Features', icon: TrendingUp, description: 'Make it go viral' },
    { id: 2, title: 'Social Links', icon: Globe, description: 'Connect your community' },
    { id: 3, title: 'Deploy', icon: Rocket, description: 'Launch your token' }
  ]

  const themes = [
    { id: 'dog', name: 'Dog Theme', emoji: '🐕', description: 'Doge-inspired meme coin' },
    { id: 'cat', name: 'Cat Theme', emoji: '🐱', description: 'Feline-powered token' },
    { id: 'frog', name: 'Frog Theme', emoji: '🐸', description: 'Pepe-style meme coin' },
    { id: 'ai', name: 'AI Theme', emoji: '🤖', description: 'AI-powered future token' },
    { id: 'political', name: 'Political', emoji: '🗳️', description: 'Political meme coin' },
    { id: 'custom', name: 'Custom', emoji: '✨', description: 'Your unique concept' }
  ]

  const viralFeatures = [
    { id: 'community', name: 'Community-Driven', icon: Users, description: 'Built by the community, for the community' },
    { id: 'meme', name: 'Meme-Powered', icon: Sparkles, description: 'Viral meme potential with shareable content' },
    { id: 'influencer', name: 'Influencer Partnerships', icon: Star, description: 'Ready for influencer collaborations' },
    { id: 'gamified', name: 'Gamified Experience', icon: Target, description: 'Interactive features and rewards' },
    { id: 'deflationary', name: 'Deflationary Mechanics', icon: DollarSign, description: 'Token burning and scarcity features' },
    { id: 'analytics', name: 'Advanced Analytics', icon: BarChart3, description: 'Real-time tracking and insights' }
  ]

  const handleInputChange = (field, value) => {
    setTokenData(prev => ({ ...prev, [field]: value }))
  }

  const handleViralFeatureToggle = (featureId) => {
    setTokenData(prev => ({
      ...prev,
      viralFeatures: prev.viralFeatures.includes(featureId)
        ? prev.viralFeatures.filter(id => id !== featureId)
        : [...prev.viralFeatures, featureId]
    }))
  }

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return tokenData.name && tokenData.symbol && tokenData.description
      case 1:
        return tokenData.viralFeatures.length > 0
      case 2:
        return true // Social links are optional
      case 3:
        return tokenData.network === 'devnet' || walletInfo?.connected
      default:
        return false
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1 && validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDeploy = async () => {
    setIsDeploying(true)
    try {
      // Simulate deployment
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const mockResult = {
        success: true,
        mintAddress: '9Nx69waRJRQaxeroFBLZHvAbHxeLVrdxKxydM7Wre3VM',
        explorerUrl: `https://explorer.solana.com/address/9Nx69waRJRQaxeroFBLZHvAbHxeLVrdxKxydM7Wre3VM?cluster=${tokenData.network}`,
        network: tokenData.network,
        cost: tokenData.network === 'devnet' ? 'FREE' : '~0.01 SOL'
      }
      
      setDeploymentResult(mockResult)
    } catch (error) {
      setDeploymentResult({
        success: false,
        error: error.message
      })
    } finally {
      setIsDeploying(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Token Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Doge Moon Token"
                  value={tokenData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="symbol">Token Symbol *</Label>
                <Input
                  id="symbol"
                  placeholder="e.g., DMOON"
                  value={tokenData.symbol}
                  onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your viral token concept..."
                value={tokenData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <Card
                    key={theme.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      tokenData.theme === theme.id
                        ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => handleInputChange('theme', theme.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{theme.emoji}</div>
                      <div className="font-semibold text-sm">{theme.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{theme.description}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Make Your Token Go Viral</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select features that will help your token gain traction and build a strong community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {viralFeatures.map((feature) => {
                const Icon = feature.icon
                const isSelected = tokenData.viralFeatures.includes(feature.id)
                
                return (
                  <Card
                    key={feature.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      isSelected
                        ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => handleViralFeatureToggle(feature.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                          <Icon className={`h-5 w-5 ${isSelected ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{feature.name}</h4>
                            {isSelected && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {tokenData.viralFeatures.length > 0 && (
              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertDescription>
                  Great choice! You've selected {tokenData.viralFeatures.length} viral feature{tokenData.viralFeatures.length > 1 ? 's' : ''} that will help your token gain traction.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Connect Your Community</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add social links to build trust and enable community growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="website"
                    placeholder="https://yourtoken.com"
                    value={tokenData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter/X</Label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="twitter"
                    placeholder="https://twitter.com/yourtoken"
                    value={tokenData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telegram">Telegram</Label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="telegram"
                    placeholder="https://t.me/yourtoken"
                    value={tokenData.telegram}
                    onChange={(e) => handleInputChange('telegram', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discord">Discord</Label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="discord"
                    placeholder="https://discord.gg/yourtoken"
                    value={tokenData.discord}
                    onChange={(e) => handleInputChange('discord', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <Alert>
              <Globe className="h-4 w-4" />
              <AlertDescription>
                Social links are optional but highly recommended for building trust and community engagement.
              </AlertDescription>
            </Alert>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Deploy Your Viral Token</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose your deployment network and launch your token
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                className={`cursor-pointer transition-all hover:scale-105 ${
                  tokenData.network === 'devnet'
                    ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => handleInputChange('network', 'devnet')}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🧪</div>
                  <h4 className="font-bold text-lg mb-2">Devnet (Testing)</h4>
                  <Badge variant="secondary" className="mb-3">FREE</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Perfect for testing and learning. Uses fake SOL tokens.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all hover:scale-105 ${
                  tokenData.network === 'mainnet'
                    ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => handleInputChange('network', 'mainnet')}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🚀</div>
                  <h4 className="font-bold text-lg mb-2">Mainnet (Production)</h4>
                  <Badge variant="outline" className="mb-3">~$2-4 USD</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Real deployment with actual SOL. Requires wallet connection.
                  </p>
                </CardContent>
              </Card>
            </div>

            {tokenData.network === 'mainnet' && (
              <Alert>
                <Wallet className="h-4 w-4" />
                <AlertDescription>
                  Mainnet deployment requires connecting your Phantom wallet with sufficient SOL (~0.01 SOL).
                </AlertDescription>
              </Alert>
            )}

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Token Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><strong>Name:</strong> {tokenData.name || 'Not set'}</div>
                <div><strong>Symbol:</strong> {tokenData.symbol || 'Not set'}</div>
                <div><strong>Supply:</strong> {parseInt(tokenData.supply).toLocaleString()}</div>
                <div><strong>Network:</strong> {tokenData.network}</div>
                <div><strong>Features:</strong> {tokenData.viralFeatures.length}</div>
                <div><strong>Theme:</strong> {themes.find(t => t.id === tokenData.theme)?.name}</div>
              </div>
            </div>

            {deploymentResult && (
              <Alert className={deploymentResult.success ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}>
                {deploymentResult.success ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="font-semibold">🎉 Token deployed successfully!</div>
                        <div className="text-sm space-y-1">
                          <div><strong>Mint Address:</strong> {deploymentResult.mintAddress}</div>
                          <div><strong>Network:</strong> {deploymentResult.network}</div>
                          <div><strong>Cost:</strong> {deploymentResult.cost}</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(deploymentResult.explorerUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on Explorer
                        </Button>
                      </div>
                    </AlertDescription>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <AlertDescription>
                      <div className="font-semibold">Deployment failed</div>
                      <div className="text-sm mt-1">{deploymentResult.error}</div>
                    </AlertDescription>
                  </>
                )}
              </Alert>
            )}

            <Button
              onClick={handleDeploy}
              disabled={isDeploying || !validateStep(3)}
              className="w-full"
              size="lg"
            >
              {isDeploying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deploying Token...
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4 mr-2" />
                  Deploy Token
                </>
              )}
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Rocket className="mr-3 h-8 w-8" />
            Viral Token Creator
          </h1>
          <p className="text-xl text-purple-200">
            Create viral cryptocurrency tokens on Solana in minutes
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              const isValid = validateStep(index)

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      isActive
                        ? 'bg-purple-600 text-white ring-4 ring-purple-300'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  <div className="text-center">
                    <div className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-300'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-400">{step.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
        </div>

        {/* Main Content */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              {React.createElement(steps[currentStep].icon, { className: "mr-2 h-5 w-5" })}
              {steps[currentStep].title}
            </CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          <div className="text-sm text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </div>

          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1 || !validateStep(currentStep)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App

