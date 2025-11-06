'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Smartphone, Download, QrCode, Shield, Users, Zap, ArrowRight, CheckCircle } from 'lucide-react'
import { WalletConnectButton } from '@/components/wallet/WalletConnectButton'
import Image from 'next/image'

export default function AppPage() {
  const [showQR, setShowQR] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl">
              Access the <span className="text-primary-600 dark:text-primary-400">DRP App</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
              Connect your wallet, verify your status, and participate in the Decentralized Rights Protocol ecosystem.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/app/dashboard"
                className="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Open in Browser
              </Link>
              <button
                onClick={() => setShowQR(!showQR)}
                className="rounded-md bg-white dark:bg-neutral-800 px-6 py-3 text-sm font-semibold text-neutral-900 dark:text-white shadow-sm border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                <Download className="inline h-4 w-4 mr-2" />
                Download APK
              </button>
            </div>
            {showQR && (
              <div className="mt-8 flex justify-center">
                <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <QrCode className="h-32 w-32 text-neutral-400" />
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Scan to download</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Wallet Connect Section */}
      <section className="py-16 bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
              Connect Your Wallet
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
              Securely connect your wallet to access DRP features and manage your account.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="[&_*:where(button)]:bg-primary-600 [&_*:where(button)]:text-white [&_*:where(button)]:hover:bg-primary-500 [&_*:where(button)]:transition-colors">
                <WalletConnectButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Everything you need in one app
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-900 dark:text-white">
                  <Users className="h-5 w-5 flex-none text-primary-600 dark:text-primary-400" />
                  Account Types
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-600 dark:text-neutral-300">
                  <p className="flex-auto">
                    Choose between Personal or Organization account types. Each account type has specific 
                    features and verification requirements tailored to your needs.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-900 dark:text-white">
                  <Shield className="h-5 w-5 flex-none text-primary-600 dark:text-primary-400" />
                  PoST/PoAT Verification
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-600 dark:text-neutral-300">
                  <p className="flex-auto">
                    Complete Proof of Status (PoST) and Proof of Activity (PoAT) verification flows. 
                    Verify your identity and track your contributions to the network.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-900 dark:text-white">
                  <Zap className="h-5 w-5 flex-none text-primary-600 dark:text-primary-400" />
                  DRP Credits
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-600 dark:text-neutral-300">
                  <p className="flex-auto">
                    Manage your $DeRi and $RIGHTS tokens. View balances, transfer funds, and participate 
                    in governance through the integrated wallet interface.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Account Types Section */}
      <section className="bg-neutral-50 dark:bg-neutral-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">Account Types</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Choose Your Account Type
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Personal Account */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Personal Account</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                  Perfect for individuals who want to participate in the DRP ecosystem.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Identity verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Activity tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Token management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Governance participation</span>
                  </li>
                </ul>
                <Link
                  href="/app/login?type=personal"
                  className="mt-6 inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  Create Personal Account <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Organization Account */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Organization Account</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                  Designed for businesses, NGOs, and institutions participating in DRP.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Multi-user management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Advanced verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Bulk operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Enterprise features</span>
                  </li>
                </ul>
                <Link
                  href="/app/login?type=organization"
                  className="mt-6 inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  Create Organization Account <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">Privacy First</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Your Data, Your Control
            </p>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
              DRP App is built with privacy at its core. All data is encrypted, stored locally when possible, 
              and never shared without your explicit consent.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              &copy; {new Date().getFullYear()} Decentralized Rights Protocol. All rights reserved.
            </p>
            <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
              Powered by DRP
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

