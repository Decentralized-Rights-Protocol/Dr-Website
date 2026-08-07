"use client";

import { useState } from "react";
import { usePoST } from "@/hooks/usepost";
import {
  User,
  GraduationCap,
  Heart,
  Tractor,
  Building2,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  Database,
  Cpu,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/app-store";

const CATEGORIES = [
  {
    id: "citizen",
    label: "Citizen / Resident",
    icon: User,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    description: "Government-issued ID verification",
  },
  {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    description: "Educational institution verification",
  },
  {
    id: "farmer",
    label: "Farmer",
    icon: Tractor,
    color: "text-green-500",
    bg: "bg-green-500/10",
    description: "Agricultural cooperative membership",
  },
  {
    id: "ngo",
    label: "NGO Partner",
    icon: Heart,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    description: "Non-governmental organization affiliation",
  },
  {
    id: "cooperative",
    label: "Cooperative Member",
    icon: Building2,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    description: "Worker cooperative membership",
  },
];

const VERIFICATION_STEPS = [
  { step: 1, label: "Select Verification Path", status: "active" },
  { step: 2, label: "Upload Credential Proof", status: "pending" },
  { step: 3, label: "AI-Assisted Review", status: "pending" },
  { step: 4, label: "Eligible for $RIGHTS", status: "pending" },
];

export default function StatusPage() {
  const address = useAppStore((state) => state.address);
  const [selectedCategory, setSelectedCategory] = useState("citizen");
  const [issuingOrganization, setIssuingOrganization] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const { mutateAsync: submitStatus, isPending, isSuccess, error } = usePoST();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }
    if (!file) {
      alert("Please upload a credential file");
      return;
    }
    if (!issuingOrganization) {
      alert("Please enter the issuing organization");
      return;
    }

    setIsSubmitting(true);
    setCurrentStep(2);

    try {
      const result = await submitStatus({
        category: selectedCategory,
        issuer: issuingOrganization,
        credentialFile: file,
        referenceCode: referenceCode || undefined,
      });
      setSubmissionResult(result);
      setCurrentStep(3);
      
      // Simulate AI review progress
      setTimeout(() => {
        setCurrentStep(4);
        setTimeout(() => {
          setSubmissionResult({ ...result, status: "completed" });
        }, 2000);
      }, 3000);
    } catch (err) {
      console.error("Submission failed:", err);
      setCurrentStep(1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryDescription = () => {
    const category = CATEGORIES.find((c) => c.id === selectedCategory);
    return category?.description || "";
  };

  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-neutral-200/80 bg-white/90 p-8 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <p className="text-sm font-semibold text-primary-600 dark:text-primary-300">
          Identity Verification Engine
        </p>
        <h1 className="mt-3 text-3xl font-bold text-neutral-900 dark:text-neutral-50">
          Proof of Status (PoST)
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          Verify your identity or organizational credentials to earn governance rights and access DRP council proposals.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[0.6fr_0.4fr]">
        <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Verification Process
          </h3>

          {/* Progress Steps */}
          <div className="mt-6 flex items-center justify-between">
            {VERIFICATION_STEPS.map((step, index) => (
              <div key={step.step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${currentStep >= step.step
                      ? "bg-primary-600 text-white"
                      : "bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500"
                      }`}
                  >
                    {currentStep > step.step ? <CheckCircle2 className="h-5 w-5" /> : step.step}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${currentStep >= step.step ? "text-primary-600 dark:text-primary-300" : "text-neutral-400"}`}>
                    {step.label}
                  </span>
                </div>
                {index < VERIFICATION_STEPS.length - 1 && (
                  <div className={`mx-2 h-1 w-12 rounded ${currentStep > step.step ? "bg-primary-600" : "bg-neutral-200 dark:bg-neutral-700"}`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Verification Category
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${selectedCategory === cat.id
                          ? "border-primary-500 bg-primary-500/10 text-primary-600 dark:text-primary-300"
                          : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400"
                          }`}
                      >
                        <cat.icon className={`h-4 w-4 ${selectedCategory === cat.id ? cat.color : ""}`} />
                        {cat.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    {getCategoryDescription()}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Issuing Organisation
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Name of the institution or organization"
                    value={issuingOrganization}
                    onChange={(e) => setIssuingOrganization(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Partner Reference Code <span className="text-neutral-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter reference code for accelerated verification"
                    value={referenceCode}
                    onChange={(e) => setReferenceCode(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-950"
                  />
                  <p className="text-xs text-neutral-500">
                    Optional partner reference code for accelerated AI verification
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Upload Credential Proof
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      required
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png,.heic"
                      className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm dark:border-neutral-800 dark:bg-neutral-950 opacity-0 absolute inset-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
                      <div className="flex items-center gap-3">
                        <Upload className="h-5 w-5 text-neutral-400" />
                        <div>
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                            {file ? file.name : "Upload your credential scan"}
                          </p>
                          <p className="text-xs text-neutral-500">
                            Clear scans with legible institutional insignia or QR codes
                          </p>
                        </div>
                      </div>
                      <FileText className="h-5 w-5 text-neutral-400" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !address || isPending}
                  className="w-full rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-foreground transition hover:bg-primary-700 disabled:opacity-50"
                >
                  {!address
                    ? "Connect Wallet to Continue"
                    : isSubmitting || isPending
                      ? "Processing..."
                      : "Begin Verification"}
                </button>
              </>
            )}

            {currentStep >= 2 && currentStep <= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center rounded-full bg-primary-500/10 p-8">
                  <Clock className="h-12 w-12 animate-spin text-primary-600" style={{ animationDuration: '2s' }} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                  {currentStep === 2 ? "Uploading Credential" : "AI Review in Progress"}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                  {currentStep === 2 
                    ? "Securely uploading your credential to DRP verification service..."
                    : "Elder AI cross-checks authenticity with DRP partners and risk models."}
                </p>
              </motion.div>
            )}

            {currentStep === 4 && submissionResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <AnimatePresence>
                  {submissionResult.status === "completed" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <div className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 p-8">
                        <Award className="h-12 w-12 text-emerald-500" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                        Verification Successful!
                      </h3>
                      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                        Upon success: governance weight and council proposal access.
                        You are now eligible to receive $RIGHTS governance tokens.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <div className="inline-flex items-center justify-center rounded-full bg-amber-500/10 p-8">
                        <Clock className="h-12 w-12 text-amber-500" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                        Verification Processing
                      </h3>
                      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                        Your submission is being processed. This may take a few minutes.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-2xl border border-rose-500/50 bg-rose-500/10 p-4 text-rose-700 dark:text-rose-300"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <p className="font-bold">Verification Error</p>
                    <p className="text-sm opacity-90">{error.message}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </form>

          {/* Verification Checklist */}
          <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="font-semibold text-sm text-neutral-700 dark:text-neutral-300 mb-3">
              Verification Checklist
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Clear scans with legible institutional insignia or QR codes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Optional partner reference code for accelerated AI verification
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Convex tracks app review state
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Protocol-side attestations mirrored by sync bridge
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              About Proof of Status
            </h3>
            <div className="mt-4 space-y-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Proof of Status (PoST) verification allows individuals and organizations to establish their identity and credentials on the DRP network.
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Upon successful verification, you receive governance weight and access to create council proposals, enabling you to participate in DRP governance.
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                All verifications are subject to AI-assisted review and cross-validation with DRP partner organizations.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-primary-600 to-indigo-700 p-6 text-foreground shadow-lg">
            <h4 className="font-bold">AI Verification System</h4>
            <p className="mt-2 text-sm opacity-90">
              Elder AI performs comprehensive verification using:
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-xs">
                <Cpu className="h-3 w-3" />
                NVIDIA NIM Models
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-xs">
                <Database className="h-3 w-3" />
                Partner Database
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-xs">
                <Shield className="h-3 w-3" />
                Risk Assessment
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Import Shield for JSX
