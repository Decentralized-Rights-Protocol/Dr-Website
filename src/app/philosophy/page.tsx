import { buildPageMetadata } from "@/lib/seo/seo";
import Link from "next/link";
import {
  Compass,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  EyeOff,
  Scale,
  Network,
  Brain,
  CircleCheck,
  ArrowRight,
} from "lucide-react";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  PremiumPage,
  PremiumHero,
  PremiumSection,
} from "@/components/site/PremiumPage";

export const metadata = buildPageMetadata({
  title: "DRP Philosophy | Rights-First Verification Infrastructure",
  description:
    "DRP is built on a simple premise: rights are inherent, evidence should be verifiable, privacy should survive verification, and technology must serve human dignity.",
  canonical: "/philosophy",
});

const principles = [
  {
    title: "Rights Before Power",
    body: "Fundamental rights are not granted by reputation, wealth, contribution, or protocol status. A person does not have to earn their dignity.",
  },
  {
    title: "Proof Before Authority",
    body: "Trust should be grounded in verifiable evidence rather than institutional or social power alone. Authority may attest; evidence must remain inspectable.",
  },
  {
    title: "Contribution Is Not Human Worth",
    body: "DRP can recognize meaningful contribution without turning human beings into scores. Children, caregivers, elders, disabled people, and people doing unpaid work retain the same fundamental rights.",
  },
  {
    title: "Evidence Before Certainty",
    body: "DRP does not claim omniscience. It evaluates whether a claim is sufficiently supported under a defined verification policy and makes uncertainty, provenance, and limitations visible.",
  },
  {
    title: "Privacy Before Surveillance",
    body: "Prove the claim, not the person's entire life. Verification should minimize collection and prefer commitments, selective disclosure, local processing, and zero-knowledge techniques where appropriate.",
  },
  {
    title: "Human Agency Before Automation",
    body: "AI may interpret evidence, detect patterns, and assist verification. It must not become the ultimate authority over human worth, rights, or reality.",
  },
  {
    title: "Contestability Before Permanence",
    body: "Consequential claims must be challengeable, correctable, and revocable. A mistaken verification should never become an irreversible digital destiny.",
  },
  {
    title: "Plurality Before Monopolies",
    body: "No single sensor, AI model, institution, validator, or authority should automatically define reality. Strong verification can emerge from independent evidence and attestations.",
  },
  {
    title: "Accessibility Before Complexity",
    body: "Verification infrastructure must accommodate people who lack advanced devices, constant connectivity, money, or technical expertise. Technology must adapt to humanity.",
  },
  {
    title: "The Right to Opacity",
    body: "Not everything about a human being needs to be measured, recorded, scored, or verified. DRP should verify only what is necessary for a legitimate purpose.",
  },
  {
    title: "Open Verification",
    body: "A DRP proof should be independently verifiable. Applications should not have to blindly trust DRP merely because DRP produced the result.",
  },
];

export default function PhilosophyPage() {
  return (
    <>
      <StructuredData type="philosophy" />
      <PremiumPage>
        <PremiumHero
          badge="DRP Philosophy"
          title="Rights Before Power, Proof Before Authority"
          description="A human-centered philosophy for building verification infrastructure in the AI and blockchain era."
        />

        <PremiumSection
          eyebrow="The Foundational Idea"
          title="DRP is not a machine for judging humanity."
          description="DRP is infrastructure for making claims more trustworthy. We do not believe every human action should be measured, every person should be scored, or algorithms should decide human worth."
        >
          <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.06] p-7 md:p-9">
            <p className="text-lg leading-8 text-slate-200 md:text-xl">
              We believe that when a claim matters, its evidence should be
              discoverable, its provenance should be understandable, its
              verification should be challengeable, and its proof should be
              independently verifiable.
            </p>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Rights should never have to be earned. Truth should never have to
              depend on authority alone. Technology should never require
              humanity to surrender its privacy in exchange for trust.
            </p>
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="From Blockchain to Protocol"
          title="A protocol for verifiable reality"
          description="The Internet made information transferable. DRP seeks to make claims about events, identities, activities, and rights independently verifiable."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-foreground/10 bg-white/[0.03] p-6">
              <Network className="h-5 w-5 text-cyan-200" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Information networks
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Traditional Internet protocols answer how systems communicate
                and exchange information.
              </p>
            </article>
            <article className="rounded-2xl border border-foreground/10 bg-white/[0.03] p-6">
              <CircleCheck className="h-5 w-5 text-cyan-200" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Verification networks
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                DRP aims to provide infrastructure through which systems can
                request verification, evaluate evidence, and exchange
                cryptographically verifiable proofs.
              </p>
            </article>
          </div>

          <div className="mt-5 rounded-2xl border border-foreground/10 bg-black/25 p-6">
            <div className="grid gap-3 text-center text-sm text-slate-300 md:grid-cols-5 md:items-center">
              <span>Claim</span>
              <span className="hidden md:block">→</span>
              <span>Evidence</span>
              <span className="hidden md:block">→</span>
              <span className="font-semibold text-cyan-100">
                Verification → Proof
              </span>
            </div>
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Definition-first"
          title="Why proofs replace power"
          description="DRP's philosophy begins with a distinction: a proof does not mean absolute knowledge. It means that a claim satisfies a defined verification policy using evidence whose integrity and provenance can be assessed."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-foreground/10 bg-white/[0.03] p-5">
              <h3 className="text-base font-semibold text-foreground">
                PoST: verified status
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Status and credentials can be represented through evidence and
                attestations rather than relying solely on institutional
                authority.
              </p>
            </article>
            <article className="rounded-2xl border border-foreground/10 bg-white/[0.03] p-5">
              <h3 className="text-base font-semibold text-foreground">
                PoAT: verified activity
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Meaningful activity can be recognized through evidence without
                making economic productivity a measure of human value.
              </p>
            </article>
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Principles"
          title="The Operating Ethics of DRP"
          description="These principles guide protocol design, verification, governance, incentives, and the treatment of human data."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {principles.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-foreground/10 bg-black/25 p-5"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Verification Without Surveillance"
          title="Prove the claim, not the person's entire life."
          description="Real-world verification should not require turning everyday life into a permanent sensor feed."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: EyeOff,
                title: "Minimal disclosure",
                body: "Reveal only what a verifier needs to establish a legitimate claim.",
              },
              {
                icon: ShieldCheck,
                title: "Privacy-preserving proofs",
                body: "Use commitments, selective disclosure, and zero-knowledge techniques where they provide real value.",
              },
              {
                icon: Brain,
                title: "AI as an assistant",
                body: "AI can analyze evidence and surface uncertainty, but verification remains challengeable and policy-bound.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-foreground/10 bg-white/[0.03] p-5"
              >
                <item.icon className="h-5 w-5 text-cyan-200" />
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Human Reality"
          title="Technology must accommodate humanity."
          description="Not every meaningful contribution is economically visible or easily measured. DRP must account for the people and activities conventional systems overlook."
        >
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Care", "Parenting, caregiving, and support work."],
              ["Knowledge", "Teaching, mentoring, research, and cultural memory."],
              ["Community", "Volunteering, mutual aid, and local stewardship."],
              ["Learning", "Education, apprenticeship, experimentation, and growth."],
            ].map(([title, body]) => (
              <article
                key={title}
                className="rounded-2xl border border-foreground/10 bg-black/25 p-5"
              >
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 flex items-start gap-4 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] p-5">
            <HeartHandshake className="mt-1 h-5 w-5 shrink-0 text-cyan-200" />
            <p className="text-sm leading-6 text-slate-200">
              A person should never lose fundamental rights because their
              contribution is difficult to measure. Verification exists to
              support legitimate claims, not to decide who deserves to exist,
              participate, or belong.
            </p>
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Accountability"
          title="Verification must remain contestable."
          description="A decentralized verification network must have ways to challenge mistakes, surface conflicting evidence, and revoke or supersede claims when circumstances change."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Challenge", "Question a consequential claim."],
              ["Reassess", "Review new or conflicting evidence."],
              ["Revoke", "Correct proofs that are no longer valid."],
            ].map(([title, body]) => (
              <article
                key={title}
                className="rounded-2xl border border-foreground/10 bg-white/[0.03] p-5"
              >
                <Scale className="h-5 w-5 text-cyan-200" />
                <h3 className="mt-3 font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
              </article>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Why DRP Exists"
          title="Technology Must Protect Dignity"
          description="DRP is built to counter extraction-first systems by embedding fairness, contribution, privacy, and transparent accountability into protocol behavior."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: HeartHandshake,
                title: "Human Dignity",
                body: "Rights are foundational, not optional product features.",
              },
              {
                icon: ShieldCheck,
                title: "Verifiable Trust",
                body: "Evidence, provenance, and cryptographic proofs move trust beyond unsupported claims.",
              },
              {
                icon: Compass,
                title: "Stewardship Governance",
                body: "Governance serves long-term communities, not short-term extraction.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-foreground/10 bg-black/25 p-5"
              >
                <item.icon className="h-5 w-5 text-cyan-200" />
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Global Foundations"
          title="Grounded in International Frameworks"
          description="DRP translates globally recognized rights and sustainability principles into programmable protocol logic without claiming that code can replace law, culture, or human judgment."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Universal Declaration of Human Rights",
              "UN Sustainable Development Goals",
              "Ecological and regenerative economics",
              "AI ethics and privacy-by-design frameworks",
            ].map((item) => (
              <article
                key={item}
                className="rounded-2xl border border-foreground/10 bg-black/25 p-5"
              >
                <Sparkles className="h-5 w-5 text-cyan-200" />
                <p className="mt-3 text-sm text-slate-300">{item}</p>
              </article>
            ))}
          </div>
        </PremiumSection>

        <section className="pb-20 pt-8">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/15 via-blue-300/10 to-indigo-300/10 p-8 text-center">
              <h2 className="text-3xl font-semibold text-foreground">
                Explore the Mission in Action
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Move from philosophy to architecture, economics, governance,
                and the emerging DRP verification network.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                >
                  About DRP
                </Link>
                <Link
                  href="/economics"
                  className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-white/10"
                >
                  Explore Economics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PremiumPage>
    </>
  );
}
