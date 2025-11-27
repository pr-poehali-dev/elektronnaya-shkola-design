import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

interface GradebookProps {
  className: string;
  onBack: () => void;
}

const Gradebook = ({ className, onBack }: GradebookProps) => {
  const [selectedSubject, setSelectedSubject] = useState("Математика");
  const [currentWeek, setCurrentWeek] = useState(0);

  const subjects = ["Математика", "Русский язык", "Литература", "Физика", "Химия"];
  
  const students = [
    { id: 1, name: "Алексеев Дмитрий" },
    { id: 2, name: "Белова Анна" },
    { id: 3, name: "Васильев Иван" },
    { id: 4, name: "Григорьева Мария" },
    { id: 5, name: "Дмитриев Петр" },
    { id: 6, name: "Егорова Елена" },
    { id: 7, name: "Жданов Александр" },
    { id: 8, name: "Зайцева Ольга" },
  ];

  const dates = ["Пн 25.11", "Вт 26.11", "Ср 27.11", "Чт 28.11", "Пт 29.11"];
  
  const [grades, setGrades] = useState<Record<string, string>>({});

  const handleGradeClick = (studentId: number, dateIndex: number) => {
    const key = `${studentId}-${dateIndex}`;
    const currentGrade = grades[key] || "";
    const grade = prompt("Введите оценку (1-5) или 'н' для отсутствия:", currentGrade);
    
    if (grade !== null) {
      if (grade === "" || grade === "н" || (Number(grade) >= 1 && Number(grade) <= 5)) {
        setGrades({ ...grades, [key]: grade });
      }
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade === "5") return "bg-green-500 text-white";
    if (grade === "4") return "bg-blue-500 text-white";
    if (grade === "3") return "bg-yellow-500 text-white";
    if (grade === "2") return "bg-red-500 text-white";
    if (grade === "н") return "bg-gray-400 text-white";
    return "bg-transparent";
  };

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="GraduationCap" size={20} className="text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">Школа</span>
        </div>

        <nav className="space-y-2">
          <Button variant="default" className="w-full justify-start">
            <Icon name="BookOpen" size={18} className="mr-3" />
            Журнал
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="Calendar" size={18} className="mr-3" />
            Расписание
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="FileText" size={18} className="mr-3" />
            Домашние задания
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="MessageSquare" size={18} className="mr-3" />
            Сообщения
          </Button>
        </nav>
      </aside>

      <main className="ml-64 p-8">
        <div className="mb-6 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Электронный журнал</h1>
              <p className="text-muted-foreground">Класс {className}</p>
            </div>
          </div>
        </div>

        <Card className="p-6 animate-fade-in">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Предмет:</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentWeek(currentWeek - 1)}
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>
              <span className="text-sm font-medium px-4">Текущая неделя</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentWeek(currentWeek + 1)}
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>

            <div className="ml-auto">
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить домашнее задание
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold bg-muted sticky left-0 z-10 min-w-[220px]">
                    ФИО Ученика
                  </th>
                  {dates.map((date, index) => (
                    <th
                      key={index}
                      className="text-center p-3 font-semibold min-w-[80px] bg-muted"
                    >
                      {date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-3 font-medium sticky left-0 bg-card">
                      {student.name}
                    </td>
                    {dates.map((_, dateIndex) => {
                      const key = `${student.id}-${dateIndex}`;
                      const grade = grades[key] || "";
                      return (
                        <td
                          key={dateIndex}
                          className="text-center p-2"
                        >
                          <button
                            onClick={() => handleGradeClick(student.id, dateIndex)}
                            className={`w-10 h-10 rounded-lg font-semibold transition-all hover:scale-110 ${getGradeColor(
                              grade
                            )} ${!grade ? "border-2 border-dashed border-muted-foreground/30 hover:border-primary" : ""}`}
                          >
                            {grade}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-green-500"></div>
              <span>Отлично (5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-500"></div>
              <span>Хорошо (4)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-yellow-500"></div>
              <span>Удовл. (3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500"></div>
              <span>Неудовл. (2)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gray-400"></div>
              <span>Отсутствие (н)</span>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Gradebook;