import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "../components/Navigation";

const IssuancePage = lazy(() => import("../pages/IssuancePage"));
const VerificationPage = lazy(() => import("../pages/VerificationPage"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 md:pb-8 pt-4 md:pt-8">
          <Suspense
            fallback={<div className="text-center py-10">Loading...</div>}
          >
            <Routes>
              <Route path="/" element={<IssuancePage />} />
              <Route path="/verify" element={<VerificationPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
