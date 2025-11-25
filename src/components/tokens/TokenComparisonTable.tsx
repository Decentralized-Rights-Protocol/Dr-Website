'use client'

export function TokenComparisonTable() {
  const rows = [
    {
      category: 'Purpose',
      deri: 'Utility token for on-chain actions and transactions',
      rights: 'Governance token representing six core pillars',
    },
    {
      category: 'Earned By',
      deri: 'Verified work, clean energy usage, learning proofs, community contributions',
      rights: 'Participating in governance, community panels, protocol contributions',
    },
    {
      category: 'Used For',
      deri: 'Transaction fees, accessing DRP Apps, PoA/PoAT participation, third-party integrations',
      rights: 'Voting on proposals, protocol upgrades, Elder selection, AI governance alignment',
    },
    {
      category: 'Supply Model',
      deri: 'Earned through activity and contributions',
      rights: 'Fixed or deflationary, distributed via governance participation',
    },
    {
      category: 'Security',
      deri: 'Protected by QRSP (Quantum-Resistant Signature Protocol)',
      rights: 'Protected by QRSP (Quantum-Resistant Signature Protocol)',
    },
    {
      category: 'Role in PoA/PoAT',
      deri: 'Staking and transaction fees for Proof of Activity/Proof of Activity Time',
      rights: 'Governance over consensus parameters and validation rules',
    },
    {
      category: 'Role in Governance',
      deri: 'Limited - mainly for fee payment and app access',
      rights: 'Full voting rights, proposal creation, community panels, Elder decisions',
    },
  ]

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-neutral-800">
          <thead>
            <tr className="bg-neutral-900/50">
              <th
                scope="col"
                className="py-4 px-6 text-left text-sm font-semibold text-neutral-300 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-left text-sm font-semibold text-blue-400 uppercase tracking-wider"
              >
                $DeRi
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-left text-sm font-semibold text-amber-400 uppercase tracking-wider"
              >
                $RIGHTS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/50">
            {rows.map((row, index) => (
              <tr
                key={index}
                className="bg-neutral-900/30 hover:bg-neutral-900/50 transition-colors duration-200"
              >
                <td className="py-4 px-6 text-sm font-medium text-white whitespace-nowrap">
                  {row.category}
                </td>
                <td className="py-4 px-6 text-sm text-neutral-300">
                  {row.deri}
                </td>
                <td className="py-4 px-6 text-sm text-neutral-300">
                  {row.rights}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

