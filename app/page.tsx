"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "@/firebase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        router.push("/dashboard");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleCreateUser = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("/dashboard");
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("/dashboard");
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        router.push("/dashboard");
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        router.push("/");
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <BackgroundBeamsWithCollision>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="z-10 border-1 border-white shadow-lg w-full max-w-md">
          <div className="transition-opacity duration-300 ease-in-out">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="lg:h-20 lg:w-20 text-primary sm:h-12 sm:w-12" />
              </div>
              <CardTitle className="lg:text-3xl text-center md:text-2xl">
                Welcome to Learn Loom
              </CardTitle>
              <CardDescription className="text-center">
                {user
                  ? `Welcome, ${user.email}`
                  : isLogin
                  ? "Enter your credentials to access your account"
                  : "Create a new account"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {!user ? (
                <form className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2 transition-all duration-300 ease-in-out">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Your username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {!isLogin && (
                    <div className="space-y-2 transition-all duration-300 ease-in-out">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  )}
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                  <Button
                    onClick={() =>
                      isLogin ? handleLogin() : handleCreateUser()
                    }
                    className="w-full"
                  >
                    {isLogin ? "Log in" : "Sign up"}
                  </Button>
                  <Button onClick={handleGoogleSignIn} className="w-full">
                    Sign In with Google
                  </Button>
                </form>
              ) : (
                <div className="text-center">
                  <p>Welcome back, {user.email}!</p>
                  <Button onClick={handleLogout} className="w-full mt-4">
                    Log out
                  </Button>
                </div>
              )}
            </CardContent>

            {!user && (
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <Button
                    variant="link"
                    className="text-primary hover:underline"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Sign up" : "Log in"}
                  </Button>
                </p>
              </CardFooter>
            )}
          </div>
        </Card>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
