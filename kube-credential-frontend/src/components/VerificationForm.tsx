import { useState, useEffect } from "react";
import axios from "axios";
import { verifyCredential } from "../services/verificationService";
import { useCredential } from "../context/CredentialContext";
import type { Credential } from "../types/credentialTypes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  ShieldCheck,
  AlertCircle,
  Hash,
  Mail,
  User,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { formatDate } from "@/utils/formatDate";

type VerificationResponse = {
  verified: boolean;
  message: string;
  credential: Credential;
};

const VerificationForm = () => {
  const { lastIssued } = useCredential();

  const [formData, setFormData] = useState({ id: "", email: "" });

  const [result, setResult] = useState<VerificationResponse | null>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lastIssued?.id) {
      setFormData((prev) => ({ ...prev, id: lastIssued.id }));
    }
  }, [lastIssued]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setMessage(null);
    setIsError(false);
    setResult(null);

    try {
      const cached = localStorage.getItem("verifiedCredential");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (
          parsed.credential.id === formData.id &&
          parsed.credential.email === formData.email
        ) {
          console.log("✅ Loaded from localStorage (already verified)");
          setResult(parsed);
          setMessage(parsed.message || "Credential already verified");
          setIsError(!parsed.verified);
          setLoading(false);
          return;
        }
      }

      const response = await verifyCredential(formData.id, formData.email);
      setResult(response);
      setMessage(response.message);
      setIsError(!response.verified);

      if (!response.verified) {
        setMessage("Credential is invalid");
        setIsError(true);
      } else {
        setMessage(response.message || "Credential is valid");
        setIsError(false);

        localStorage.setItem("verifiedCredential", JSON.stringify(response));
      }
    } catch (err: unknown) {
      const errorMsg = axios.isAxiosError(err)
        ? err.response?.data?.message || "Verification failed"
        : err instanceof Error
        ? err.message
        : "Verification failed";

      setMessage(errorMsg);
      setIsError(true);
      setResult({
        verified: false,
        message: errorMsg,
        credential: {
          id: formData.id,
          name: "N/A",
          email: formData.email,
          verified: false,
          verifiedBy: "N/A",
          verifiedAt: undefined,
        },
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-full max-w-2xl mx-auto mt-14 mb-12 shadow-xl border-0 rounded-3xl bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-3">
          <div className="p-3 bg-green-50 rounded-2xl">
            <ShieldCheck className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Verify Credential
        </CardTitle>
        <p className="text-gray-500 mt-2 text-sm">
          Enter your credential ID and email to verify authenticity
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Credential ID
              </label>
              <Input
                id="id"
                type="text"
                name="id"
                placeholder="Enter your credential ID"
                value={formData.id}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 text-base border-2 border-gray-200 rounded-xl focus-visible:border-green-500 focus-visible:ring-2 focus:ring-green-200 transition-all duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 text-base border-2 border-gray-200 rounded-xl focus-visible:border-green-500 focus:ring-2 focus-visible:ring-green-200 transition-all duration-200"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying Credential...
              </>
            ) : (
              <>
                <ShieldCheck className="mr-2 h-5 w-5" />
                Verify Credential
              </>
            )}
          </Button>
        </form>

        {message && (
          <div
            className={`p-4 rounded-xl border-2 ${
              isError
                ? "bg-red-50 border-red-200"
                : "bg-green-50 border-green-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {isError ? (
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              ) : (
                <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
              )}
              <p
                className={`font-medium ${
                  isError ? "text-red-800" : "text-green-800"
                }`}
              >
                {message}
              </p>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-4 sm:mt-6 p-4 sm:p-6 border border-gray-200/60 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm shadow-lg shadow-gray-200/20">
            <div className="flex flex-col xs:flex-row xs:items-center gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl shadow-lg">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Verification Details
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                    Credential verification results
                  </p>
                </div>
              </div>
              <div className="ml-0 xs:ml-auto mt-2 xs:mt-0">
                <div
                  className={`px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm w-fit flex items-center gap-2 ${
                    result.verified
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-200"
                      : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-red-200"
                  }`}
                >
                  {result.verified ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-white" />
                      <span>Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-white" />
                      <span>Not Verified</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="group">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <div className="p-1 sm:p-1.5 bg-blue-100 rounded-md sm:rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Hash className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-600" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Credential ID
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-gray-50/80 border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-100/50 transition-colors">
                    <p className="text-xs sm:text-sm font-mono text-gray-800 break-all leading-relaxed">
                      {result?.credential?.id ?? "N/A"}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <div className="p-1 sm:p-1.5 bg-purple-100 rounded-md sm:rounded-lg group-hover:bg-purple-200 transition-colors">
                      <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-600" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Name
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 break-all">
                      {result.credential?.name ?? "N/A"}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <div className="p-1 sm:p-1.5 bg-purple-100 rounded-md sm:rounded-lg group-hover:bg-purple-200 transition-colors">
                      <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-600" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Email Address
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 break-all">
                      {result.credential?.email ?? "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="group">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <div className="p-1 sm:p-1.5 bg-green-100 rounded-md sm:rounded-lg group-hover:bg-green-200 transition-colors">
                      <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-600" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Verified By
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors">
                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                      {result.credential?.verifiedBy ?? "N/A"}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <div className="p-1 sm:p-1.5 bg-orange-100 rounded-md sm:rounded-lg group-hover:bg-orange-200 transition-colors">
                      <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-orange-600" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Verified At
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors">
                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                      {result.credential?.verifiedAt
                        ? formatDate(result.credential.verifiedAt)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationForm;
