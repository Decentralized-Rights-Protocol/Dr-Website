/**
 * Tokens Page
 * 
 * Main page for viewing and managing $DeRi and $RIGHTS tokens.
 * This page provides an overview of the dual-token economy.
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWallet } from '@/hooks/useWallet';
import { useDeRi, useRights } from '@/hooks';
import { formatTokenAmount } from '@/lib/api';
import Link from 'next/link';
import { Loader2, Coins, Users, BarChart3, Activity, ShieldCheck } from 'lucide-react';

// ============================================================================
// COMPONENTS
// ============================================================================

/** Token Balance Card */
function TokenBalanceCard({
  title,
  symbol,
  balance,
  formattedBalance,
  loading,
  description,
  icon: Icon,
}: {
  title: string;
  symbol: string;
  balance: string;
  formattedBalance: string;
  loading: boolean;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-20">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl font-bold text-foreground">
              {formattedBalance} {symbol}
            </div>
            <div className="text-sm text-muted-foreground">
              {balance} base units
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/** Action Button */
function ActionButton({
  label,
  href,
  icon: Icon,
  disabled = false,
}: {
  label: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
}) {
  return (
    <Button asChild variant="outline" disabled={disabled}>
      <Link href={href} className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}

/** Quick Actions Section */
function QuickActions() {
  const { connected } = useWallet();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Manage your tokens with these quick actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionButton
            label="Transfer"
            href="/tokens/transfer"
            icon={Coins}
            disabled={!connected}
          />
          <ActionButton
            label="Activities"
            href="/activities"
            icon={Activity}
            disabled={!connected}
          />
          <ActionButton
            label="Governance"
            href="/governance"
            icon={Users}
            disabled={!connected}
          />
          <ActionButton
            label="Rewards"
            href="/rewards"
            icon={ShieldCheck}
            disabled={!connected}
          />
        </div>
      </CardContent>
    </Card>
  );
}

/** Token Info Card */
function TokenInfoCard({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string; description?: string }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm font-mono">{item.value}</span>
              </div>
              {item.description && (
                <p className="text-xs text-muted-foreground">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/** Network Stats Card */
function NetworkStatsCard() {
  // In production, this would fetch from the API
  const stats = {
    totalUsers: '1,234',
    totalActivities: '5,678',
    totalRewards: '123,456',
    deriSupply: '1,000,000',
    rightsSupply: '500,000',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Statistics</CardTitle>
        <CardDescription>
          Overview of the DRP dual-token economy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Total Users', value: stats.totalUsers },
            { label: 'Total Activities', value: stats.totalActivities },
            { label: 'Total Rewards', value: stats.totalRewards },
            { label: '$DeRi Supply', value: stats.deriSupply },
            { label: '$RIGHTS Supply', value: stats.rightsSupply },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Tokens Page Component
 * 
 * Main page for the dual-token economy.
 */
export default function TokensPage() {
  const { address, connected, connect } = useWallet();
  const { balance: deriBalance, formattedBalance: formattedDeRi, loading: deriLoading } = useDeRi();
  const { balance: rightsBalance, formattedBalance: formattedRights, loading: rightsLoading } = useRights();

  // Check if loading
  const isLoading = deriLoading || rightsLoading;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
            <Coins className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Dual-Token Economy</h1>
            <p className="text-muted-foreground">
              Manage your $DeRi utility tokens and $RIGHTS governance tokens
            </p>
          </div>
        </div>

        {/* Connect Wallet Button */}
        {!connected && (
          <Button onClick={connect} className="mb-6">
            <Coins className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deri">$DeRi Token</TabsTrigger>
          <TabsTrigger value="rights">$RIGHTS Token</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TokenBalanceCard
              title="$DeRi (Utility Token)"
              symbol="DeRi"
              balance={deriBalance}
              formattedBalance={formattedDeRi}
              loading={isLoading}
              description="Used for transactions, rewards, and fees"
              icon={Coins}
            />
            <TokenBalanceCard
              title="$RIGHTS (Governance Token)"
              symbol="RIGHTS"
              balance={rightsBalance}
              formattedBalance={formattedRights}
              loading={isLoading}
              description="Used for voting, governance, and delegation"
              icon={BarChart3}
            />
          </div>

          <QuickActions />
          <NetworkStatsCard />
        </TabsContent>

        {/* $DeRi Token Tab */}
        <TabsContent value="deri" className="space-y-6">
          <TokenInfoCard
            title="$DeRi Token Information"
            items={[
              {
                label: 'Token Name',
                value: 'Decentralized Rights Token',
                description: 'Utility token for the DRP ecosystem',
              },
              {
                label: 'Symbol',
                value: 'DeRi',
              },
              {
                label: 'Denomination',
                value: 'uderi',
                description: '1 DeRi = 1,000,000 uderi',
              },
              {
                label: 'Purpose',
                value: 'Transactions, Rewards, Fees',
              },
              {
                label: 'Emission Limits',
                value: '1M/block, 100M/epoch',
                description: 'Maximum token emission rates',
              },
            ]}
          />

          <Card>
            <CardHeader>
              <CardTitle>$DeRi Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Deterministic reward calculations</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>AI Elder verified activities</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Policy Engine controlled operations</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Emission limits enforced</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button asChild>
              <Link href="/tokens/transfer">Transfer $DeRi</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/rewards">View Rewards</Link>
            </Button>
          </div>
        </TabsContent>

        {/* $RIGHTS Token Tab */}
        <TabsContent value="rights" className="space-y-6">
          <TokenInfoCard
            title="$RIGHTS Token Information"
            items={[
              {
                label: 'Token Name',
                value: 'Rights Governance Token',
                description: 'Governance token for the DRP ecosystem',
              },
              {
                label: 'Symbol',
                value: 'RIGHTS',
              },
              {
                label: 'Denomination',
                value: 'rights',
                description: 'Base unit for governance tokens',
              },
              {
                label: 'Purpose',
                value: 'Voting, Governance, Delegation',
              },
              {
                label: 'Governance',
                value: 'On-chain proposals',
                description: 'Create and vote on governance proposals',
              },
            ]}
          />

          <Card>
            <CardHeader>
              <CardTitle>$RIGHTS Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Create governance proposals</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Vote on proposals</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Delegate voting power</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Participate in DAO governance</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button asChild>
              <Link href="/governance">View Proposals</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/governance/delegate">Delegate Voting Power</Link>
            </Button>
          </div>
        </TabsContent>

        {/* Actions Tab */}
        <TabsContent value="actions" className="space-y-6">
          <QuickActions />

          <Card>
            <CardHeader>
              <CardTitle>Token Actions</CardTitle>
              <CardDescription>
                Perform actions with your tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Transfer $DeRi</h3>
                    <p className="text-sm text-muted-foreground">
                      Send $DeRi tokens to another address
                    </p>
                  </div>
                  <Button asChild>
                    <Link href="/tokens/transfer">Go to Transfer</Link>
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">View Activities</h3>
                    <p className="text-sm text-muted-foreground">
                      Track your submitted activities and rewards
                    </p>
                  </div>
                  <Button asChild variant="outline">
                    <Link href="/activities">View Activities</Link>
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Governance</h3>
                    <p className="text-sm text-muted-foreground">
                      Participate in $RIGHTS governance
                    </p>
                  </div>
                  <Button asChild variant="outline">
                    <Link href="/governance">Go to Governance</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Network Tab */}
        <TabsContent value="network" className="space-y-6">
          <NetworkStatsCard />

          <TokenInfoCard
            title="Emission Limits"
            items={[
              {
                label: 'Per Block',
                value: '1,000,000 uderi',
                description: 'Maximum $DeRi emission per block',
              },
              {
                label: 'Per Epoch',
                value: '100,000,000 uderi',
                description: 'Maximum $DeRi emission per epoch',
              },
              {
                label: 'Per Activity',
                value: '10,000 uderi',
                description: 'Maximum reward per activity',
              },
              {
                label: 'Per Identity',
                value: '1,000,000 uderi',
                description: 'Maximum reward per identity',
              },
            ]}
          />

          <Card>
            <CardHeader>
              <CardTitle>Network Security</CardTitle>
              <CardDescription>
                Security features protecting the dual-token economy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Policy Engine</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                      <span>Controls all AI operations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                      <span>Authorizes token minting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                      <span>Enforces emission limits</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">AI Elders</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                      <span>Verify activities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                      <span>Detect fraud and anomalies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                      <span>Consensus-based decisions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {!connected && !isLoading && (
        <div className="text-center py-12">
          <Coins className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-muted-foreground mb-4">
            Connect your wallet to view and manage your tokens
          </p>
          <Button onClick={connect}>
            <Coins className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      )}
    </div>
  );
}
