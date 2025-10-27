'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col space-y-4">
            <div className="text-2xl font-bold text-blue-600">DRP</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Building a human-rights-centered blockchain protocol powered by Proof of Status and Proof of Activity.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/Decentralized-Rights-Protocol" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                GitHub
              </a>
              <a href="https://twitter.com/De_Rights" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                Twitter
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/learn" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Learn</Link></li>
              <li><Link href="/earn" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Earn</Link></li>
              <li><Link href="/explore" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Explore</Link></li>
              <li><Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Terms</Link></li>
              <li><Link href="/cookies" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Cookies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Community</h4>
            <ul className="space-y-2">
              <li><a href="https://discord.gg/decentralizedrights" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Discord</a></li>
              <li><a href="https://telegram.me/DeRightsProtocol" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Telegram</a></li>
              <li><a href="https://blog.decentralizedrights.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>© {currentYear} Decentralized Rights Protocol</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>Made with care for human rights</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  
)