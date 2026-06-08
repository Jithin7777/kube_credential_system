import { Link, useLocation } from "react-router-dom";
import { Plus, CheckCircle } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 py-3">
        <div className="text-center text-lg font-bold text-blue-600">
          Kube Credential
        </div>
      </div>

      <nav className="hidden md:block sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="flex items-center px-8 justify-between bg-white gap-10 bg-dark/50 backdrop-blur-md rounded-2xl p-2 border border-white/30">
            <div className="text-lg font-bold text-blue-600">Kube Credential</div>

            <div className="flex gap-4">
              <Link
                to="/"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === "/"
                    ? "bg-white/90 text-blue-600 shadow-lg shadow-blue-500/25 border border-white/50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-white/60 backdrop-blur-sm border border-transparent hover:border-white/50"
                }`}
              >
                <Plus className="w-5 h-5" /> Issue Credential
              </Link>

              <Link
                to="/verify"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === "/verify"
                    ? "bg-white/90 text-green-600 shadow-lg shadow-green-500/25 border border-white/50"
                    : "text-gray-700 hover:text-green-600 hover:bg-white/60 backdrop-blur-sm border border-transparent hover:border-white/50"
                }`}
              >
                <CheckCircle className="w-5 h-5" /> Verify Credential
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 py-2 px-4">
        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 ${
              location.pathname === "/" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:text-blue-500"
            }`}
          >
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Issue</span>
          </Link>

          <Link
            to="/verify"
            className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 ${
              location.pathname === "/verify" ? "bg-green-50 text-green-600" : "text-gray-500 hover:text-green-500"
            }`}
          >
            <CheckCircle className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Verify</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
