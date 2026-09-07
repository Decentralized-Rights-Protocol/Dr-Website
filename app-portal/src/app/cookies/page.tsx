export const metadata = { title: 'Cookie Policy | DRP Portal', description: 'Information about cookies and similar technologies used by the DRP Portal.' }

export default function CookiesPage() {
  return <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
    <p className="text-xs font-bold uppercase tracking-[.2em] text-[#00e5cc]">Legal</p>
    <h1 className="mt-3 text-4xl font-black tracking-tight">Cookie Policy</h1>
    <p className="mt-3 text-sm text-white/50">Last updated: 7 September 2026</p>
    <div className="mt-10 space-y-8 text-sm leading-7 text-white/75">
      <section><h2 className="text-xl font-bold text-white">1. What we use</h2><p className="mt-3">The DRP Portal is intended to minimise cookies and similar tracking technologies. The current application does not intentionally deploy advertising cookies, behavioural tracking pixels, or third-party analytics cookies.</p></section>
      <section><h2 className="text-xl font-bold text-white">2. Strictly necessary storage</h2><p className="mt-3">Some browser storage may be required for authentication, security, wallet connection state, theme preferences, routing, or other core functionality. These technologies are not used for advertising or cross-site behavioural profiling.</p></section>
      <section><h2 className="text-xl font-bold text-white">3. Analytics and consent</h2><p className="mt-3">No non-essential analytics service was identified in the Portal source during this review. If DRP later adds analytics, advertising, social tracking, or another non-essential technology that requires consent, it must be configured so that the technology does not activate before the required consent is obtained and users can withdraw consent as easily as they give it.</p></section>
      <section><h2 className="text-xl font-bold text-white">4. Third-party content</h2><p className="mt-3">Links to external services may take you to sites with their own cookies and privacy practices. DRP does not control those practices. The Portal should avoid embedding third-party tracking content unless it is necessary and appropriately disclosed.</p></section>
      <section><h2 className="text-xl font-bold text-white">5. Managing storage</h2><p className="mt-3">You can manage or delete browser cookies and local storage through your browser settings. Removing necessary storage may prevent some Portal features from working.</p></section>
      <section><h2 className="text-xl font-bold text-white">6. Contact</h2><p className="mt-3">Questions about cookies or similar technologies can be sent to <a className="text-[#00e5cc] underline" href="mailto:contact@decentralizedrights.com">contact@decentralizedrights.com</a>.</p></section>
    </div>
  </article>
}
