import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import TeacherDashboard from "@/components/TeacherDashboard";
import Gradebook from "@/components/Gradebook";
import ParentMobile from "@/components/ParentMobile";

type View = "login" | "teacher-dashboard" | "gradebook" | "parent-mobile";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("login");
  const [selectedClass, setSelectedClass] = useState<string>("");

  const handleLogin = (role: "teacher" | "parent") => {
    if (role === "teacher") {
      setCurrentView("teacher-dashboard");
    } else {
      setCurrentView("parent-mobile");
    }
  };

  const handleClassSelect = (className: string) => {
    setSelectedClass(className);
    setCurrentView("gradebook");
  };

  const handleBack = () => {
    setCurrentView("teacher-dashboard");
  };

  const handleLogout = () => {
    setCurrentView("login");
  };

  return (
    <div className="min-h-screen">
      {currentView === "login" && <LoginScreen onLogin={handleLogin} />}
      {currentView === "teacher-dashboard" && (
        <TeacherDashboard onClassSelect={handleClassSelect} onLogout={handleLogout} />
      )}
      {currentView === "gradebook" && (
        <Gradebook className={selectedClass} onBack={handleBack} />
      )}
      {currentView === "parent-mobile" && <ParentMobile onLogout={handleLogout} />}
    </div>
  );
};

export default Index;