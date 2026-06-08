import { useState } from "react";
import { issueCredential } from "../services/issuanceService";
import { useCredential } from "../context/CredentialContext";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  Copy,
  CheckCheck,
  BadgeCheck,
  User,
  Mail,
  AlertTriangle,
} from "lucide-react";
import { Hash, Calendar } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
const IssuanceForm = () => {
  const { lastIssued, setLastIssued } = useCredential();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { message, credential } = await issueCredential(name, email);

      if (credential) {
        setLastIssued(credential);
      }

      setMessage(message);
      setName("");
      setEmail("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;
        if (err.response?.status === 409 && data?.credential) {
          // setLastIssued(data.credential);
          setMessage(data.message || "A credential already exists.");
        } else {
          setMessage(data?.message || "Failed to issue credential");
        }
      } else if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Failed to issue credential");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyId = async () => {
    if (lastIssued) {
      try {
        await navigator.clipboard.writeText(lastIssued.id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-14 shadow-xl mb-12 border-0 rounded-3xl bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-3">
          <div className="p-3 bg-blue-50 rounded-2xl">
            <BadgeCheck className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Issue Credential
        </CardTitle>
        <p className="text-gray-500 mt-2 text-sm">
          Create a new verifiable credential for identity verification
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter  name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-12 pl-10 pr-4 text-base border-2 border-gray-200 rounded-xl focus-visible:border-blue-500 focus:ring-2 focus-visible:ring-blue-200 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 pl-10 pr-4 text-base border-2 border-gray-200 rounded-xl focus-visible:border-blue-500 focus:ring-2 focus-visible:ring-blue-200 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !name.trim() || !email.trim()}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Issuing Credential...
              </>
            ) : (
              <>
                <BadgeCheck className="mr-2 h-5 w-5" />
                Issue Credential
              </>
            )}
          </Button>
        </form>
        {message && (
          <div
            className={`p-4 rounded-xl border-2 ${
              message.includes("Failed")
                ? "bg-red-50 border-red-200"
                : message.includes("exists")
                ? "bg-yellow-50 border-yellow-200"
                : "bg-green-50 border-green-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {message.includes("Failed") ? (
                <div className="h-5 w-5 text-red-600 flex-shrink-0">⚠️</div>
              ) : message.includes("exists") ? (
                <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
              ) : (
                <CheckCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
              )}

              <p
                className={`font-medium ${
                  message.includes("Failed")
                    ? "text-red-800"
                    : message.includes("exists")
                    ? "text-yellow-700"
                    : "text-green-800"
                }`}
              >
                {message}
              </p>
            </div>
          </div>
        )}
        {lastIssued && (
          <div className="mt-4  sm:mt-6 p-4 sm:p-6 border border-blue-200/50 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 backdrop-blur-sm shadow-lg shadow-blue-200/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-blue-200/30">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl shadow-lg">
                  <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                    Credential Issued
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-600/80 mt-0.5 sm:mt-1">
                    Successfully created and ready for verification
                  </p>
                </div>
              </div>
              <Button
                onClick={copyId}
                size="sm"
                className="flex items-center gap-1.5 sm:gap-2 bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-800 shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start"
              >
                {copied ? (
                  <>
                    <CheckCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">Copy ID</span>
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="group">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <div className="p-1 sm:p-1.5 bg-blue-100 rounded-md sm:rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Hash className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-600" />
                    </div>
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                      Credential ID
                    </span>
                  </div>
                  <div
                    className="p-2.5 sm:p-3 bg-white/80 border border-blue-200/50 rounded-lg sm:rounded-xl hover:bg-white transition-colors group relative cursor-pointer"
                    onClick={copyId}
                  >
                    <p className="text-xs sm:text-sm font-mono text-gray-800 break-all leading-relaxed pr-6 sm:pr-8">
                      {lastIssued.id}
                    </p>
                    <div className="absolute right-1.5 sm:right-2 top-1.5 sm:top-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <div className="p-1 sm:p-1.5 bg-purple-100 rounded-md sm:rounded-lg group-hover:bg-purple-200 transition-colors">
                      <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-600" />
                    </div>
                    <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                      Email Address
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 break-all">
                      {lastIssued.email}
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
                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                      Issued By
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors">
                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                      {lastIssued.worker}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <div className="p-1 sm:p-1.5 bg-orange-100 rounded-md sm:rounded-lg group-hover:bg-orange-200 transition-colors">
                      <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-orange-600" />
                    </div>
                    <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
                      Timestamp
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors">
                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                      {formatDate(lastIssued.timestamp ?? "")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-blue-200/30">
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-0">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full">
                    <CheckCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">
                      Ready for verification
                    </p>
                    <p className="text-xs text-gray-500 hidden xs:block">
                      Use the credential ID to verify this credential
                    </p>
                  </div>
                </div>
                <div className="text-xs text-blue-400 font-medium flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>
        )}{" "}
      </CardContent>
    </Card>
  );
};

export default IssuanceForm;
