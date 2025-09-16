import { 
    Connection, 
    Keypair, 
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import {
    createInitializeMintInstruction,
    createAssociatedTokenAccountInstruction,
    createMintToInstruction,
    getMinimumBalanceForRentExemptMint,
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress
} from '@solana/spl-token';

/**
 * Create a new SPL token using the connected wallet
 */
export async function createToken(connection, wallet, tokenData) {
    try {
        if (!wallet.publicKey) {
            throw new Error('Wallet not connected');
        }

        // Generate a new keypair for the mint
        const mintKeypair = Keypair.generate();
        const mintPublicKey = mintKeypair.publicKey;

        // Get the minimum balance for rent exemption
        const rentExemption = await getMinimumBalanceForRentExemptMint(connection);

        // Create the mint account instruction
        const createMintAccountInstruction = SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintPublicKey,
            space: MINT_SIZE,
            lamports: rentExemption,
            programId: TOKEN_PROGRAM_ID,
        });

        // Initialize the mint instruction
        const initializeMintInstruction = createInitializeMintInstruction(
            mintPublicKey,
            parseInt(tokenData.decimals),
            wallet.publicKey, // mint authority
            wallet.publicKey  // freeze authority
        );

        // Get associated token account address
        const associatedTokenAccount = await getAssociatedTokenAddress(
            mintPublicKey,
            wallet.publicKey
        );

        // Create associated token account instruction
        const createAssociatedTokenAccountInstruction = createAssociatedTokenAccountInstruction(
            wallet.publicKey, // payer
            associatedTokenAccount,
            wallet.publicKey, // owner
            mintPublicKey
        );

        // Calculate initial supply in smallest units
        const initialSupply = BigInt(tokenData.supply) * BigInt(10 ** parseInt(tokenData.decimals));

        // Create mint to instruction
        const mintToInstruction = createMintToInstruction(
            mintPublicKey,
            associatedTokenAccount,
            wallet.publicKey, // mint authority
            initialSupply
        );

        // Create transaction
        const transaction = new Transaction().add(
            createMintAccountInstruction,
            initializeMintInstruction,
            createAssociatedTokenAccountInstruction,
            mintToInstruction
        );

        // Get recent blockhash
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = wallet.publicKey;

        // Partially sign with mint keypair
        transaction.partialSign(mintKeypair);

        // Sign and send transaction
        const signedTransaction = await wallet.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());

        // Confirm transaction
        await connection.confirmTransaction(signature, 'confirmed');

        return {
            success: true,
            mintAddress: mintPublicKey.toString(),
            signature: signature,
            associatedTokenAccount: associatedTokenAccount.toString(),
            explorerUrl: `https://explorer.solana.com/address/${mintPublicKey.toString()}`,
            tokenData: tokenData
        };

    } catch (error) {
        console.error('Token creation error:', error);
        return {
            success: false,
            error: error.message || 'Failed to create token'
        };
    }
}

/**
 * Get connection based on network
 */
export function getConnection(network = 'devnet') {
    const endpoint = network === 'mainnet' 
        ? 'https://api.mainnet-beta.solana.com'
        : 'https://api.devnet.solana.com';
    
    return new Connection(endpoint, 'confirmed');
}

/**
 * Check wallet balance
 */
export async function checkWalletBalance(connection, publicKey) {
    try {
        const balance = await connection.getBalance(publicKey);
        return {
            success: true,
            balance: balance / LAMPORTS_PER_SOL,
            lamports: balance
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Estimate transaction cost
 */
export async function estimateTransactionCost(connection) {
    try {
        // Get recent blockhash to estimate fees
        const { feeCalculator } = await connection.getRecentBlockhash();
        
        // Estimate based on typical token creation transaction
        // Usually requires 4-5 instructions, so multiply by estimated instruction count
        const estimatedCost = feeCalculator.lamportsPerSignature * 5;
        
        return {
            success: true,
            estimatedCost: estimatedCost,
            estimatedCostSOL: estimatedCost / LAMPORTS_PER_SOL
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            estimatedCostSOL: 0.01 // fallback estimate
        };
    }
}

