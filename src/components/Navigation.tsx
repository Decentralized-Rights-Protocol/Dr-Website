<<<<<<< HEAD
'use client';
=======
Request ID: b0799be4-2051-44c9-8644-52b0e4a73a0e
"{\"error\":\"ERROR_RATE_LIMITED_CHANGEABLE\",\"details\":{\"title\":\"You've hit your usage limit\",\"detail\":\"Get Cursor Pro for more Agent usage, unlimited Tab, and more.\",\"isRetryable\":false,\"showRequestId\":false,\"additionalInfo\":{\"fallbackModel\":\"\",\"spendLimitHit\":\"false\",\"chatMessage\":\"\",\"spendLimits\":\"[50,100,200]\"},\"buttons\":[{\"label\":\"Upgrade to Pro\",\"upgrade\":{\"membershipToUpgradeTo\":\"pro\",\"allowTrial\":false}}],\"planChoices\":[{\"label\":\"Pro\",\"sublabel\":\"$20/mo\",\"description\":\"$20 usage credits\",\"value\":\"pro\"},{\"label\":\"Pro+\",\"sublabel\":\"$60/mo\",\"description\":\"$70 usage credits\",\"value\":\"pro_plus\"},{\"label\":\"Ultra\",\"sublabel\":\"$200/mo\",\"description\":\"$400 usage credits\",\"value\":\"ultra\"}]},\"isExpected\":true}"
ConnectError: [resource_exhausted] Error
    at ZWl.$endAiConnectTransportReportError (vscode-file://vscode-app/Applications/Cursor.app/Contents/Resources/app/out/vs/workbench/workbench.desktop.main.js:7337:375028)
    at TMr._doInvokeHandler (vscode-file://vscode-app/Applications/Cursor.app/Contents/Resources/app/out/vs/workbench/workbench.desktop.main.js:489:35946)
    at TMr._invokeHandler (vscode-file://vscode-app/Applications/Cursor.app/Contents/Resources/app/out/vs/workbench/workbench.desktop.main.js:489:35688)
    at TMr._receiveRequest (vscode-file://vscode-app/Applications/Cursor.app/Contents/Resources/app/out/vs/workbench/workbench.desktop.main.js:489:34453)
    at TMr._receiveOneMessage (vscode-file://vscode-app/Applications/Cursor.app/Contents/Resources/app/out/vs/workbench/workbench.desktop.main.js:489:33275)
    at lEt.value (vscode-file://vscode-app/Applications/Cursor.app/Contents/Resources/app/out/vs/workbench/workbench.desktop.main.js:489:31369)
    at _e._deliver (vscode-file://vscode-app/Applications/Cursor.app/Contents/Resources/app/out/vs/workbench/workbench.desktop.main.js:49:2962)
    at _e.fire (vscode-file://vscode-app/Applications/Cursor.app/Contents/Resources/app/out/vs/workbench/workbench.desktop.main.js:49:3283)
    at ldt.fire (vscode-file://vscode-app/Applications/Cursor.app/Contents/Resources/app/out/vs/workbench/workbench.desktop.main.js:7322:12154)
    at MessagePort.<anonymous> (vscode-file://vscode-app/Applications/Cursor.app/Contents/Resources/app/out/vs/workbench/workbench.desktop.main.js:9402:18292)'use client'
>>>>>>> e5762fe4 (feat(legal): add DRP & ElderCore legal pages with MDX content, hero sections, cross-links, and SEO metadata)

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const navItems = [
    { href: '/learn', label: 'Learn' },
    { href: '/earn', label: 'Earn Rewards' },
    { href: '/explore', label: 'Explore' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              DRP
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
