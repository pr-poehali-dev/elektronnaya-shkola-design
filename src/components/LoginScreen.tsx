import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface LoginScreenProps {
  onLogin: (role: "teacher" | "parent") => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      email: !email || !email.includes("@"),
      password: password.length < 3,
    };
    
    setErrors(newErrors);
    
    if (!newErrors.email && !newErrors.password) {
      if (email.includes("teacher") || email.includes("учитель")) {
        onLogin("teacher");
      } else {
        onLogin("parent");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name="GraduationCap" size={32} className="text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Электронная Школа</h1>
          <p className="text-muted-foreground mt-2">Войдите в систему</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@school.ru"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: false });
              }}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">Введите корректный email</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: false });
                }}
                className={errors.password ? "border-destructive" : ""}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">Пароль должен быть не менее 3 символов</p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg">
            Войти
          </Button>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
            >
              Забыли пароль?
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-4">Демо-доступ:</p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onLogin("teacher")}
              className="flex-1"
            >
              <Icon name="UserCog" size={16} className="mr-2" />
              Учитель
            </Button>
            <Button
              variant="outline"
              onClick={() => onLogin("parent")}
              className="flex-1"
            >
              <Icon name="Users" size={16} className="mr-2" />
              Родитель
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
