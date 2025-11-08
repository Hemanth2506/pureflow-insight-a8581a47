import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        if (userData.email === email && userData.pass === password) {
          toast({
            title: "Login Successful!",
            description: "Welcome back to PureFlow Dashboard.",
          });
          navigate("/");
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid credentials. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "No Account Found",
          description: "Please sign up first.",
          variant: "destructive",
        });
      }
    } else {
      if (name && email && phone && password) {
        localStorage.setItem("user", JSON.stringify({ name, email, phone, pass: password }));
        toast({
          title: "Signup Successful!",
          description: "Your account has been created. Please login.",
        });
        setIsLogin(true);
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
      } else {
        toast({
          title: "Incomplete Form",
          description: "Please fill all fields.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-primary flex items-center justify-center p-4">
      <div className="absolute top-6 left-6 text-white text-2xl font-bold">
        MINDMELD MAVERICKS
      </div>

      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary">
            {isLogin ? "Login" : "Sign Up"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {!isLogin && (
              <Input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={!isLogin}
              />
            )}
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full bg-secondary hover:bg-primary">
              {isLogin ? "Login" : "Create Account"}
            </Button>
          </form>

          <p className="text-center mt-4 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
