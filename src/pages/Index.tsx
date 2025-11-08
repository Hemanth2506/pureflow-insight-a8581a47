import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { StatsCards } from "@/components/Dashboard/StatsCards";
import { RemovalRate } from "@/components/Dashboard/RemovalRate";
import { LayerChart } from "@/components/Dashboard/LayerChart";
import { PurifierLevel } from "@/components/Dashboard/PurifierLevel";
import { FeedbackForm } from "@/components/Dashboard/FeedbackForm";
import { ChatInterface } from "@/components/Chatbot/ChatInterface";
import { ProfileModal } from "@/components/ProfileModal";
import { Button } from "@/components/ui/button";
import { Download, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [bottled, setBottled] = useState(94);
  const [tap] = useState(5);
  const [filtered, setFiltered] = useState(2);
  const [removalRate, setRemovalRate] = useState(80);
  const [showAlert, setShowAlert] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [layerData, setLayerData] = useState([
    { name: "Activated Carbon", efficiency: 30 },
    { name: "Coconut Fiber", efficiency: 50 },
    { name: "Cotton-Aluminum", efficiency: 60 },
    { name: "Pumice Stone", efficiency: 70 },
    { name: "Root Layer", efficiency: 80 },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/auth");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  useEffect(() => {
    setShowAlert(bottled > 100);
  }, [bottled]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleSimulate = () => {
    setFiltered(1);
    setRemovalRate(85);
    setLayerData([
      { name: "Activated Carbon", efficiency: 40 },
      { name: "Coconut Fiber", efficiency: 60 },
      { name: "Cotton-Aluminum", efficiency: 75 },
      { name: "Pumice Stone", efficiency: 85 },
      { name: "Root Layer", efficiency: 85 },
    ]);
    toast({
      title: "Simulation Complete",
      description: "Filtration efficiency improved to 85%!",
    });
  };

  const handleDownload = () => {
    const csvContent = `Category,Particles Per Liter\nBottled Water,${bottled}\nTap Water,${tap}\nFiltered Water,${filtered}\n\nRemoval Rate,${removalRate}%\n`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "microplastics_report.csv";
    link.click();
    toast({
      title: "Report Downloaded",
      description: "Microplastics report saved as CSV.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsProfileOpen(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        onThemeToggle={() => setIsDark(!isDark)}
        isDark={isDark}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      {showAlert && (
        <div className="bg-warning text-warning-foreground text-center py-4 px-4 font-bold">
          ⚠️ High Microplastics Detected in Bottled Water!
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-8">
        <StatsCards bottled={bottled} tap={tap} filtered={filtered} />
        <RemovalRate removalRate={removalRate} onSimulate={handleSimulate} />
        <LayerChart data={layerData} />
        <PurifierLevel />

        <div className="text-center my-8">
          <Button onClick={handleDownload} className="bg-primary hover:bg-secondary shadow-lg">
            <Download className="h-4 w-4 mr-2" />
            Download Microplastic Report
          </Button>
        </div>

        <FeedbackForm />
      </main>

      <footer className="text-center py-6 border-t border-border text-muted-foreground">
        &copy; 2025 PureFlow
      </footer>

      <ChatInterface />
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={handleLogout}
        user={user}
      />
      
      {/* Simulation Link Button */}
      <a
        href="https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/fc3c9c7c4a6aa151ba41f18e7e4c1feb/51ea10cf-9f58-4f3d-a054-3a22a958b947/index.html"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-4 bottom-4 z-50 w-14 h-14 bg-primary hover:bg-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Open Simulation Dashboard"
      >
        <Target className="h-7 w-7 text-primary-foreground group-hover:rotate-90 transition-transform duration-300" />
      </a>
    </div>
  );
};

export default Index;
