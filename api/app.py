from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import time
import secrets
import base58

app = Flask(__name__)
CORS(app, origins="*")  # Allow all origins for development

# Solana configuration
DEVNET_RPC = "https://api.devnet.solana.com"
MAINNET_RPC = "https://api.mainnet-beta.solana.com"

class TokenCreator:
    def __init__(self, network="devnet"):
        self.network = network
        self.rpc_url = DEVNET_RPC if network == "devnet" else MAINNET_RPC
    
    def create_wallet(self):
        """Create a new Solana wallet"""
        try:
            # Generate a mock keypair for demo
            private_key = secrets.token_bytes(32)
            public_key = secrets.token_bytes(32)
            
            return {
                "success": True,
                "publicKey": base58.b58encode(public_key).decode(),
                "privateKey": base58.b58encode(private_key).decode(),
                "network": self.network
            }
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def create_token(self, token_data, private_key=None):
        """Create a new SPL token"""
        try:
            # For demo purposes, we'll simulate token creation
            # In production, you would use the actual Solana SDK
            
            # Generate a mock mint address
            mock_mint = secrets.token_bytes(32)
            mint_address = base58.b58encode(mock_mint).decode()
            
            # Simulate processing time
            time.sleep(2)
            
            # Create mock transaction signature
            mock_signature = base58.b58encode(secrets.token_bytes(64)).decode()
            
            explorer_url = f"https://explorer.solana.com/address/{mint_address}"
            if self.network == "devnet":
                explorer_url += "?cluster=devnet"
            
            return {
                "success": True,
                "mintAddress": mint_address,
                "signature": mock_signature,
                "explorerUrl": explorer_url,
                "network": self.network,
                "tokenData": token_data
            }
            
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def get_token_info(self, mint_address):
        """Get token information"""
        try:
            # Mock token info for demo
            return {
                "success": True,
                "mintAddress": mint_address,
                "supply": "1000000000",
                "decimals": 9,
                "network": self.network
            }
        except Exception as e:
            return {"success": False, "error": str(e)}

# Initialize token creator
token_creator = TokenCreator()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "timestamp": time.time()})

@app.route('/api/wallet/create', methods=['POST'])
def create_wallet():
    """Create a new Solana wallet"""
    try:
        data = request.get_json() or {}
        network = data.get('network', 'devnet')
        
        creator = TokenCreator(network)
        result = creator.create_wallet()
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/token/create', methods=['POST'])
def create_token():
    """Create a new SPL token"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "error": "No data provided"}), 400
        
        # Validate required fields
        required_fields = ['name', 'symbol', 'description']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"success": False, "error": f"Missing required field: {field}"}), 400
        
        network = data.get('network', 'devnet')
        private_key = data.get('privateKey')
        
        # Extract token data
        token_data = {
            'name': data['name'],
            'symbol': data['symbol'],
            'description': data['description'],
            'supply': data.get('supply', '1000000000'),
            'decimals': int(data.get('decimals', 9)),
            'theme': data.get('theme', 'custom'),
            'viralFeatures': data.get('viralFeatures', []),
            'socialLinks': {
                'website': data.get('website', ''),
                'twitter': data.get('twitter', ''),
                'telegram': data.get('telegram', ''),
                'discord': data.get('discord', '')
            }
        }
        
        creator = TokenCreator(network)
        result = creator.create_token(token_data, private_key)
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/networks', methods=['GET'])
def get_networks():
    """Get available networks"""
    return jsonify({
        "success": True,
        "networks": [
            {
                "id": "devnet",
                "name": "Devnet",
                "description": "Test network - FREE",
                "cost": "FREE",
                "rpc": DEVNET_RPC
            },
            {
                "id": "mainnet",
                "name": "Mainnet",
                "description": "Production network",
                "cost": "~0.01 SOL",
                "rpc": MAINNET_RPC
            }
        ]
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

