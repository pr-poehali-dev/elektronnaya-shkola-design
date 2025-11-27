import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface TeacherDashboardProps {
  onClassSelect: (className: string) => void;
  onLogout: () => void;
}

const TeacherDashboard = ({ onClassSelect, onLogout }: TeacherDashboardProps) => {
  const schedule = [
    { time: "09:00 - 09:45", class: "5А", subject: "Математика" },
    { time: "10:00 - 10:45", class: "6Б", subject: "Математика" },
    { time: "11:00 - 11:45", class: "7В", subject: "Алгебра" },
    { time: "12:00 - 12:45", class: "8Г", subject: "Геометрия" },
  ];

  const classes = [
    { name: "5А", students: 28, subject: "Математика" },
    { name: "6Б", students: 25, subject: "Математика" },
    { name: "7В", students: 27, subject: "Алгебра" },
    { name: "8Г", students: 24, subject: "Геометрия" },
  ];

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

        <div className="absolute bottom-6 left-6 right-6">
          <Button variant="outline" className="w-full justify-start" onClick={onLogout}>
            <Icon name="LogOut" size={18} className="mr-3" />
            Выход
          </Button>
        </div>
      </aside>

      <main className="ml-64 p-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Добрый день, Мария Ивановна!</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Clock" size={20} />
                Расписание на сегодня
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schedule.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium text-muted-foreground min-w-[110px]">
                        {lesson.time}
                      </div>
                      <div>
                        <div className="font-semibold">{lesson.subject}</div>
                        <div className="text-sm text-muted-foreground">Класс {lesson.class}</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onClassSelect(lesson.class)}
                    >
                      <Icon name="ArrowRight" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingUp" size={20} />
                Статистика
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">87%</div>
                <div className="text-sm text-muted-foreground">Средняя посещаемость</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">4.2</div>
                <div className="text-sm text-muted-foreground">Средний балл</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">12</div>
                <div className="text-sm text-muted-foreground">Непроверенных работ</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 animate-fade-in">Мои классы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {classes.map((classItem, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-all hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => onClassSelect(classItem.name)}
              >
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-center text-primary">
                    {classItem.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <p className="text-lg font-medium">{classItem.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    <Icon name="Users" size={14} className="inline mr-1" />
                    {classItem.students} учеников
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;