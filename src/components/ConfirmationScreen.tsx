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
  const [userIP, setUserIP] = useState<string>("192.168.1.100");

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get user IP or generate random one
    const generateRandomIP = () => {
      const randomIP = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      setUserIP(randomIP);
    };

    // Try to get real IP, fallback to random
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setUserIP(data.ip))
      .catch(() => generateRandomIP());

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            {/* Main Content Card */}
            <div className="bg-gradient-entry text-success-foreground p-6">
              <div className="text-center mb-6">
                <h1 className="text-xl font-bold mb-4">Late Entry Recorded</h1>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 mb-4 backdrop-blur-sm">
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Entry Time: </span>
                    <span>{formatDateTime(currentTime)}</span>
                  </div>
                  <div>
                    <span className="font-medium">Device: </span>
                    <span>{formData.device}</span>
                  </div>
                  <div>
                    <span className="font-medium">Student: </span>
                    <span>{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-xs opacity-90">({formData.rollNumber})</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-center">
                  <div className="font-bold text-sm mb-2">FOR SECURITY GUARD</div>
                  <div className="text-xs leading-relaxed">
                    This is a valid late entry confirmation. Student has been authorized for entry.
                  </div>
                  <div className="text-xs mt-3 opacity-80 italic">
                    To make a new entry, scan the QR code again.
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="bg-card p-6 text-center">
              <div className="text-xs text-muted-foreground mb-4 font-medium">
                THAPAR UNIVERSITY - AUTHORIZED SYSTEM
              </div>
              <div className="text-xs text-muted-foreground mb-4">
                UNDER SUPERVISION OF ANANTAN HALL MANAGEMENT TEAM
              </div>
              
              {/* Developer Profiles */}
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-entry rounded-full mx-auto mb-2 flex items-center justify-center text-success-foreground font-bold text-sm">
                    RG
                  </div>
                  <div className="text-xs font-medium text-foreground">Ratn Govindam</div>
                  <div className="text-xs text-muted-foreground">Full Stack Developer</div>
                  <div className="flex justify-center gap-1 mt-1">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-entry rounded-full mx-auto mb-2 flex items-center justify-center text-success-foreground font-bold text-sm">
                    JS
                  </div>
                  <div className="text-xs font-medium text-foreground">Jaskaran Singh</div>
                  <div className="text-xs text-muted-foreground">Frontend Developer</div>
                  <div className="flex justify-center gap-1 mt-1">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* IP Address Display */}
              <div className="text-xs text-muted-foreground mt-4 opacity-60">
                IP: {userIP}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmationScreen;