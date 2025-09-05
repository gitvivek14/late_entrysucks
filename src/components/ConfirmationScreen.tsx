import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface FormData {
  name: string;
  rollNumber: string;
  device: string;
}

const ConfirmationScreen = () => {
  const location = useLocation();
  const formData = location.state as FormData;
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Redirect if no form data
  if (!formData) {
    return <Navigate to="/" replace />;
  }

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return date.toLocaleDateString('en-US', options).replace(',', ',');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Green Section */}
          <div className="bg-gradient-entry p-8 text-white">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">Late Entry Recorded</h1>
            </div>
            
            <div className="bg-white/15 rounded-2xl p-6 mb-6 backdrop-blur-sm border border-white/20">
              <div className="space-y-3">
                <div className="text-base">
                  <span className="font-semibold">Entry Time: </span>
                  <span>{formatDateTime(currentTime)}</span>
                </div>
                <div className="text-base">
                  <span className="font-semibold">Device: </span>
                  <span>{formData.device}</span>
                </div>
                <div className="text-base">
                  <span className="font-semibold">Student: </span>
                  <span>{formData.name}</span>
                </div>
                <div className="text-sm opacity-90">
                  ({formData.rollNumber})
                </div>
              </div>
            </div>

            <div className="bg-white/15 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
              <div className="text-center">
                <div className="font-bold text-base mb-3">FOR SECURITY GUARD</div>
                <div className="text-sm leading-relaxed mb-4">
                  This is a valid late entry confirmation. Student has been authorized for entry.
                </div>
                <div className="text-sm opacity-80 italic">
                  To make a new entry, scan the QR code again.
                </div>
              </div>
            </div>
          </div>

          {/* White Footer Section */}
          <div className="bg-white p-6 text-center">
            <div className="text-sm text-gray-600 mb-3 font-semibold">
              THAPAR UNIVERSITY - AUTHORIZED SYSTEM
            </div>
            <div className="text-sm text-gray-600 mb-6">
              UNDER SUPERVISION OF ANANTAN HALL MANAGEMENT TEAM
            </div>
            
            {/* Developer Profiles */}
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-entry rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  RG
                </div>
                <div className="text-sm font-semibold text-gray-800">Ratn Govindam</div>
                <div className="text-xs text-gray-600">Full Stack Developer</div>
                <div className="flex justify-center gap-1 mt-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-entry rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  JS
                </div>
                <div className="text-sm font-semibold text-gray-800">Jaskaran Singh</div>
                <div className="text-xs text-gray-600">Frontend Developer</div>
                <div className="flex justify-center gap-1 mt-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;