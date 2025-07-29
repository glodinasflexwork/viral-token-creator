import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Alert, AlertDescription } from '@/components/ui/alert.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Wallet, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

export const WalletConnection = ({ network, onWalletConnected }) => {
    const { wallet, publicKey, connected, connecting, disconnect } = useWallet();

    const handleWalletConnected = () => {
        if (connected && publicKey && onWalletConnected) {
            onWalletConnected({
                publicKey: publicKey.toString(),
                walletName: wallet?.adapter?.name || 'Unknown',
                connected: true
            });
        }
    };

    React.useEffect(() => {
        if (connected && publicKey) {
            handleWalletConnected();
        }
    }, [connected, publicKey]);

    if (network === 'devnet') {
        return (
            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    <strong>Devnet Mode:</strong> No wallet connection needed. Using free devnet SOL for testing.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Wallet className="w-5 h-5" />
                    <span>Connect Solana Wallet</span>
                </CardTitle>
                <CardDescription>
                    Connect your Phantom or other Solana wallet to deploy on mainnet
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {!connected ? (
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <WalletMultiButton className="!bg-purple-500 hover:!bg-purple-600 !rounded-lg !px-6 !py-3 !text-white !font-medium !transition-colors" />
                        </div>
                        
                        <div className="text-center text-sm text-muted-foreground">
                            <p>Supported wallets:</p>
                            <div className="flex justify-center space-x-2 mt-2">
                                <Badge variant="outline">Phantom</Badge>
                                <Badge variant="outline">Solflare</Badge>
                                <Badge variant="outline">Torus</Badge>
                                <Badge variant="outline">Ledger</Badge>
                            </div>
                        </div>

                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                <strong>Mainnet Deployment:</strong> You'll need ~0.01 SOL (~$2-4 USD) in your wallet to cover transaction fees.
                            </AlertDescription>
                        </Alert>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <div>
                                    <p className="font-medium text-green-800 dark:text-green-200">
                                        Wallet Connected
                                    </p>
                                    <p className="text-sm text-green-600 dark:text-green-300">
                                        {wallet?.adapter?.name} • {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={() => {
                                    const explorerUrl = `https://explorer.solana.com/address/${publicKey?.toString()}`;
                                    window.open(explorerUrl, '_blank');
                                }}
                                variant="outline"
                                size="sm"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View
                            </Button>
                        </div>

                        <div className="flex justify-center">
                            <WalletDisconnectButton className="!bg-gray-500 hover:!bg-gray-600 !rounded-lg !px-4 !py-2 !text-white !font-medium !transition-colors" />
                        </div>
                    </div>
                )}

                {connecting && (
                    <div className="text-center">
                        <div className="inline-flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm text-muted-foreground">Connecting wallet...</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

