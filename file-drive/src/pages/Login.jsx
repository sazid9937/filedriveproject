/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserRound } from 'lucide-react';
import { X } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContent";

export default function Login({ onClose }) {

  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(true)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { login } = useAuth();

  const validateForm = () => {
    if (!email) {
      setErrorMessage("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Invalid email address");
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("https://filedriveproject.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User created:", result);
        alert("Account created successfully");
        setShowSignup(false);
        setShowLogin(true);
        
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Error creating account");
      }
    } catch (error) {
      setErrorMessage("Error creating account: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    setError(''); // Reset error state

    try {
      const response = await fetch("https://filedriveproject.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setShowLogin(false)
      localStorage.setItem('id',data.userId)
      // setIsAuthenticated(true);
      login(data.userId); 
      navigate("/dashboard/files");
      console.log(data.message); 

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (

    <>
      {showSignup && (
        <section className="py-32 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="container relative">
            <div className="flex flex-col gap-4">
              <Card className="mx-auto w-full max-w-md relative">
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
                <CardHeader className="items-center">
                  <UserRound className="size-10 rounded-full bg-accent p-2.5 text-muted-foreground" />
                  <CardTitle className="text-xl">Sign Up</CardTitle>
                  <CardDescription>
                    Enter your information to create an account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirmpassword">Confirm Password</Label>
                        <Input
                          id="confirmpassword"
                          type="password"
                          placeholder="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                      )}
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? "Creating Account..." : "Create an account"}
                      </Button>
                    </div>
                  </form>
                  <div className="mx-auto flex gap-1 text-sm mt-2">
                    <p className="">Already have an account?</p>
                    <a
                      onClick={() => {
                        setShowLogin(true);
                        setShowSignup(false);
                      }}
                      className="underline text-blue-600 cursor-pointer"
                    >
                      Log in
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>)
      }

{showLogin && (
        <section className="py-32 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="container relative">
            <div className="flex flex-col gap-4">
              <Card className="mx-auto w-full max-w-md relative">
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
                <CardHeader className="items-center">
                  <UserRound className="size-10 rounded-full bg-accent p-2.5 text-muted-foreground" />
                  <CardTitle className="text-xl">Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to login to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {error && <p className="text-red-500">{error}</p>} {/* Error message display */}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </form>
                  <div className="mx-auto flex gap-1 text-sm mt-2">
                    <p className="">Don't have an account?</p>
                    <a className="underline text-blue-600 cursor-pointer" onClick={() => { setShowLogin(false), setShowSignup(true) }}>
                      Sign Up
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>)}
    </>
  )

}

