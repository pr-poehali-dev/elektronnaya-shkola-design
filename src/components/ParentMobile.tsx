import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ParentMobileProps {
  onLogout: () => void;
}

const ParentMobile = ({ onLogout }: ParentMobileProps) => {
  const [activeTab, setActiveTab] = useState("home");

  const recentGrades = [
    { subject: "Математика", grade: 5 },
    { subject: "Русский язык", grade: 4 },
    { subject: "Литература", grade: 5 },
    { subject: "Физика", grade: 4 },
    { subject: "Химия", grade: 5 },
  ];

  const homework = [
    { subject: "Математика", task: "§15, упр. 45-48" },
    { subject: "Русский язык", task: "Упр. 234, выучить правило" },
    { subject: "Физика", task: "§8 читать, задача 3" },
  ];

  const attendance = [
    { day: "Пн", present: true },
    { day: "Вт", present: true },
    { day: "Ср", present: true },
    { day: "Чт", present: false },
    { day: "Пт", present: true },
  ];

  const getGradeColor = (grade: number) => {
    if (grade === 5) return "bg-green-500";
    if (grade === 4) return "bg-blue-500";
    if (grade === 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-background pb-20 max-w-md mx-auto">
      <header className="bg-card border-b border-border p-4 sticky top-0 z-20 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg">Иванов Алексей</h2>
            <p className="text-sm text-muted-foreground">5А класс</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout}>
            <Icon name="LogOut" size={20} />
          </Button>
        </div>
      </header>

      <main className="p-4">
        {activeTab === "home" && (
          <div className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="Award" size={20} className="text-primary" />
                  Последние оценки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recentGrades.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.subject}</div>
                    </div>
                    <div className={`w-10 h-10 rounded-lg ${getGradeColor(item.grade)} flex items-center justify-center text-white font-bold`}>
                      {item.grade}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="BookOpen" size={20} className="text-primary" />
                  Домашние задания на завтра
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {homework.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-muted/50"
                  >
                    <div className="font-medium text-sm mb-1">{item.subject}</div>
                    <div className="text-sm text-muted-foreground">{item.task}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="Calendar" size={20} className="text-primary" />
                  Посещаемость за неделю
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between gap-2">
                  {attendance.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div className="text-xs font-medium text-muted-foreground">
                        {item.day}
                      </div>
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          item.present
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        <Icon
                          name={item.present ? "Check" : "X"}
                          size={20}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "grades" && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Все оценки</h2>
            <Card>
              <CardContent className="p-4 space-y-2">
                {recentGrades.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{item.subject}</div>
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${getGradeColor(item.grade)} flex items-center justify-center text-white font-bold text-lg`}>
                      {item.grade}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Расписание</h2>
            <Card>
              <CardContent className="p-4 space-y-3">
                {[
                  { time: "09:00", subject: "Математика" },
                  { time: "10:00", subject: "Русский язык" },
                  { time: "11:00", subject: "Литература" },
                  { time: "12:00", subject: "Физика" },
                  { time: "13:00", subject: "Химия" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="text-sm font-medium text-muted-foreground min-w-[50px]">
                      {item.time}
                    </div>
                    <div className="font-medium">{item.subject}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Чат с учителями</h2>
            <Card>
              <CardContent className="p-4">
                <div className="text-center text-muted-foreground py-8">
                  <Icon name="MessageSquare" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Новых сообщений нет</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("home")}
            className={`flex-col h-full gap-1 ${activeTab === "home" ? "text-primary" : "text-muted-foreground"}`}
          >
            <Icon name="Home" size={20} />
            <span className="text-xs">Главная</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("grades")}
            className={`flex-col h-full gap-1 ${activeTab === "grades" ? "text-primary" : "text-muted-foreground"}`}
          >
            <Icon name="Award" size={20} />
            <span className="text-xs">Оценки</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("schedule")}
            className={`flex-col h-full gap-1 ${activeTab === "schedule" ? "text-primary" : "text-muted-foreground"}`}
          >
            <Icon name="Calendar" size={20} />
            <span className="text-xs">Расписание</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("chat")}
            className={`flex-col h-full gap-1 ${activeTab === "chat" ? "text-primary" : "text-muted-foreground"}`}
          >
            <Icon name="MessageSquare" size={20} />
            <span className="text-xs">Чат</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default ParentMobile;