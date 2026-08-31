/**
 * Transfer Page
 * 
 * Page for transferring $DeRi tokens to another address.
 */

'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useWallet } from '@/hooks/useWallet';
import { useDeRi } from '@/hooks';
import { Loader2, Coins, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// ============================================================================
// TYPES
// ============================================================================

interface TransferFormData {
  to: string;
  amount: string;
  formattedAmount: string;
}

// ============================================================================
// COMPONENTS
// ============================================================================

/** Amount Input with conversion */
function AmountInput({
  value,
  onChange,
  label = 'Amount',
  placeholder = '0',
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="amount">{label}</Label>
      <div className="relative">
        <Input
          id="amount"
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-16"
          min="0"
          step="0.000001"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          DeRi
        </span>
      </div>
    </div>
  );
}

/** Address Input */
function AddressInput({
  value,
  onChange,
  label = 'Recipient Address',
  placeholder = '0x... or drp1...',
  disabled = false,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="address">{label}</Label>
      <Input
        id="address"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Transfer Summary */
function TransferSummary({
  from,
  to,
  amount,
  formattedAmount,
}: {
  from: string;
  to: string;
  amount: string;
  formattedAmount: string;
}) {
  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="text-lg">Transfer Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">From</span>
          <span className="font-mono text-sm">{from.slice(0, 12)}...</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">To</span>
          <span className="font-mono text-sm">{to.slice(0, 12)}...</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount</span>
          <span className="font-bold">
            {formattedAmount} DeRi ({amount} uderi)
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

/** Loading State */
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 animate-spin text-cyan-500 mb-4" />
      <p className="text-muted-foreground">Processing transfer...</p>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Transfer Page Component
 * 
 * Page for transferring $DeRi tokens.
 */
export default function TransferPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { address, connected } = useWallet();
  const {
    balance,
    formattedBalance,
    transfer,
    transferLoading,
    transferError,
    toUderi,
    toDeri,
    refreshBalance,
  } = useDeRi();

  // Form state
  const [formData, setFormData] = useState<TransferFormData>({
    to: '',
    amount: '',
    formattedAmount: '',
  });

  // Validation state
  const [errors, setErrors] = useState<{
    to?: string;
    amount?: string;
  }>({});

  // Success state
  const [success, setSuccess] = useState<{
    txHash: string;
    amount: string;
    to: string;
  } | null>(null);

  // Check if wallet is connected
  useCallback(() => {
    if (!connected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to transfer tokens',
        variant: 'destructive',
      });
      router.push('/tokens');
    }
  }, [connected, router, toast]);

  // Handle form changes
  const handleAmountChange = useCallback(
    (value: string) => {
      setFormData((prev) => ({
        ...prev,
        amount: value,
        formattedAmount: value,
      }));
      
      // Clear error when user types
      if (errors.amount) {
        setErrors((prev) => ({ ...prev, amount: undefined }));
      }
    },
    [errors.amount]
  );

  const handleToChange = useCallback(
    (value: string) => {
      setFormData((prev) => ({ ...prev, to: value }));
      
      // Clear error when user types
      if (errors.to) {
        setErrors((prev) => ({ ...prev, to: undefined }));
      }
    },
    [errors.to]
  );

  // Validate form
  const validateForm = useCallback((): boolean => {
    const newErrors: { to?: string; amount?: string } = {};
    let isValid = true;

    // Validate recipient address
    if (!formData.to.trim()) {
      newErrors.to = 'Recipient address is required';
      isValid = false;
    } else if (formData.to.length < 10) {
      newErrors.to = 'Please enter a valid address';
      isValid = false;
    }

    // Validate amount
    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
      isValid = false;
    } else {
      const numericAmount = parseFloat(formData.amount);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        newErrors.amount = 'Please enter a valid positive amount';
        isValid = false;
      } else {
        // Check if user has sufficient balance
        const amountInUderi = toUderi(formData.amount);
        if (BigInt(amountInUderi) > BigInt(balance)) {
          newErrors.amount = `Insufficient balance. You have ${formattedBalance} DeRi`;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [formData, balance, formattedBalance, toUderi]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      try {
        // Convert amount to uderi
        const amountInUderi = toUderi(formData.amount);

        // Submit transfer
        const response = await transfer({
          to: formData.to,
          amount: amountInUderi,
          formattedAmount: formData.amount,
        });

        if (response?.success) {
          // Show success
          setSuccess({
            txHash: response.tx_hash || '',
            amount: formData.amount,
            to: formData.to,
          });

          // Refresh balance
          refreshBalance();

          // Show toast
          toast({
            title: 'Transfer Successful',
            description: `Transferred ${formData.amount} DeRi to ${formData.to.slice(0, 8)}...`,
          });
        } else {
          toast({
            title: 'Transfer Failed',
            description: response?.error || 'Unknown error',
            variant: 'destructive',
          });
        }
      } catch (error) {
        toast({
          title: 'Transfer Error',
          description: error instanceof Error ? error.message : 'Unknown error',
          variant: 'destructive',
        });
      }
    },
    [formData, validateForm, toUderi, transfer, refreshBalance, toast]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      to: '',
      amount: '',
      formattedAmount: '',
    });
    setErrors({});
    setSuccess(null);
  }, []);

  // If not connected, show message
  if (!connected) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Wallet Not Connected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Please connect your wallet to transfer tokens
            </p>
            <Button asChild>
              <Link href="/tokens">
                <Coins className="h-4 w-4 mr-2" />
                Go to Tokens Page
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If transfer was successful, show success message
  if (success) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Coins className="h-8 w-8 text-green-500" />
              Transfer Successful
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your transfer has been successfully processed
            </p>
            <TransferSummary
              from={address!}
              to={success.to}
              amount={toUderi(success.amount)}
              formattedAmount={success.amount}
            />
            {success.txHash && (
              <div className="text-sm">
                <p className="text-muted-foreground">Transaction Hash</p>
                <p className="font-mono text-xs break-all">{success.txHash}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/tokens">
                View Tokens
              </Link>
            </Button>
            <Button onClick={resetForm} variant="outline">
              Make Another Transfer
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Main form
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <Coins className="h-8 w-8 text-cyan-500" />
          <div>
            <h1 className="text-3xl font-bold">Transfer $DeRi</h1>
            <p className="text-muted-foreground">
              Send $DeRi tokens to another address
            </p>
          </div>
        </div>

        {/* Current Balance */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Your Balance</p>
                <p className="text-2xl font-bold">
                  {formattedBalance} DeRi
                </p>
              </div>
              <Button onClick={refreshBalance} variant="ghost" size="sm">
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transfer Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Transfer Details</CardTitle>
            <CardDescription>
              Enter the recipient address and amount to transfer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <AddressInput
              value={formData.to}
              onChange={handleToChange}
              error={errors.to}
            />

            <AmountInput
              value={formData.formattedAmount}
              onChange={handleAmountChange}
              label="Amount (DeRi)"
            />
            {errors.amount && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.amount}
              </p>
            )}

            {/* Conversion Info */}
            {formData.amount && !errors.amount && (
              <div className="text-sm text-muted-foreground">
                = {toUderi(formData.amount)} uderi
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={transferLoading || !formData.to || !formData.amount}
              className="w-full"
            >
              {transferLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Transfer
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Transfer Summary Preview */}
        {formData.to && formData.amount && !errors.to && !errors.amount && (
          <TransferSummary
            from={address!}
            to={formData.to}
            amount={toUderi(formData.amount)}
            formattedAmount={formData.amount}
          />
        )}

        {/* Error Display */}
        {transferError && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {transferError.message}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Cancel Button */}
        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/tokens">Cancel</Link>
          </Button>
        </div>
      </form>

      {/* Loading State */}
      {transferLoading && <LoadingState />}
    </div>
  );
}
