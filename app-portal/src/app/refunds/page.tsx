export const metadata = { title: 'Refund Policy | DRP Portal', description: 'Refund and cancellation policy for DRP Portal services and transactions.' }

export default function RefundsPage() {
  return <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
    <p className="text-xs font-bold uppercase tracking-[.2em] text-[#00e5cc]">Legal</p>
    <h1 className="mt-3 text-4xl font-black tracking-tight">Refund & Cancellation Policy</h1>
    <p className="mt-3 text-sm text-white/50">Last updated: 7 September 2026</p>
    <div className="mt-10 space-y-8 text-sm leading-7 text-white/75">
      <section><h2 className="text-xl font-bold text-white">1. General rule</h2><p className="mt-3">The Portal currently does not promise a purchase, subscription, or paid service merely because a token, reward, proof, or blockchain feature is displayed. Any paid service will have its price and transaction terms shown before payment.</p></section>
      <section><h2 className="text-xl font-bold text-white">2. Blockchain transactions</h2><p className="mt-3">Blockchain network fees and completed on-chain transactions may be irreversible. DRP cannot reverse a transaction that has already been accepted by an independent blockchain network. Never sign a transaction you do not understand.</p></section>
      <section><h2 className="text-xl font-bold text-white">3. Eligible refunds</h2><p className="mt-3">Where DRP directly charges a fee for a service and applicable law or the displayed transaction terms provide a refund right, requests should be sent promptly to <a className="text-[#00e5cc] underline" href="mailto:contact@decentralizedrights.com">contact@decentralizedrights.com</a> with the relevant order or transaction reference. Nothing in this policy removes mandatory consumer rights.</p></section>
      <section><h2 className="text-xl font-bold text-white">4. Service failure</h2><p className="mt-3">If DRP receives payment for a service it does not provide within the agreed period, the customer may have cancellation or refund rights under applicable law. For Ghanaian electronic transactions, statutory cancellation and refund rules may apply in circumstances covered by the Electronic Transactions Act, 2008 (Act 772).</p></section>
      <section><h2 className="text-xl font-bold text-white">5. Tokens and rewards</h2><p className="mt-3">Rewards, utility tokens, governance tokens and protocol participation are not represented as refundable purchases by this policy. Token functionality and eligibility are subject to the applicable protocol rules and law. This policy is not investment advice.</p></section>
      <section><h2 className="text-xl font-bold text-white">6. Contact</h2><p className="mt-3">For a refund or cancellation question, email <a className="text-[#00e5cc] underline" href="mailto:contact@decentralizedrights.com">contact@decentralizedrights.com</a> and include enough information to identify the transaction without sending private keys or seed phrases.</p></section>
    </div>
  </article>
}
