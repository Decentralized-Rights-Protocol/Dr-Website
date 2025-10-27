import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">DRP</h3>
            <p className="text-gray-400 text-sm">
              Decentralized Rights Protocol - Building a secure, transparent, and equitable blockchain ecosystem.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('common.resources', 'Resources')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/learn" className="hover:text-white transition">
                  {t('common.learn', 'Learn')}
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="hover:text-white transition">
                  {t('common.explorer', 'Explorer')}
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="hover:text-white transition">
                  {t('common.whitepaper', 'Whitepaper')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('common.community', 'Community')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="https://discord.gg/drp" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://twitter.com/DRProtocol" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://github.com/Decentralized-Rights-Protocol" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('common.legal', 'Legal')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  {t('common.privacy', 'Privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  {t('common.terms', 'Terms')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  {t('common.contact', 'Contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Decentralized Rights Protocol. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://github.com/Decentralized-Rights-Protocol" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              GitHub
            </a>
            <a href="https://discord.gg/drp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
