import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const SignUpLoginToggle = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const response = await axios.post("http://localhost:3002/login", {
          Email: formData.email,
          Password: formData.password,
        });
        alert(response.data.message);
      } catch (err) {
        console.error("Login error:", err);
        alert("Login failed. Please try again.");
      }
    } else {
      try {
        const response = await axios.post("http://localhost:3002/signup", {
          FirstName: formData.name.split(" ")[0] || "",
          LastName: formData.name.split(" ")[1] || "",
          Email: formData.email,
          Password: formData.password,
        });
        alert(response.data);
      } catch (err) {
        console.error("Signup error:", err);
        alert("Signup failed. Please try again.");
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.5 } },
  };

  const slideVariants = {
    enter: { x: isLogin ? "100%" : "-100%", opacity: 0 },
    center: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: isLogin ? "-100%" : "100%", opacity: 0, transition: { duration: 0.5 } },
  };

  const gradientVariants = {
    login: { background: "linear-gradient(135deg, #004d4d, #ffd700)" },
    signup: { background: "linear-gradient(135deg, #ffd700, #004d4d)" },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      variants={gradientVariants}
      initial={isLogin ? "login" : "signup"}
      animate={isLogin ? "login" : "signup"}
      transition={{ duration: 0.8 }}
    >
      <Card className="w-full max-w-lg p-8 shadow-2xl rounded-3xl">
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <h2 className="text-3xl font-extrabold text-center text-white mb-6">
                  {isLogin ? "Welcome Back!" : "Join Us Today!"}
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-md border-gray-300"
                      />
                    </div>
                  )}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md border-gray-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-white">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md border-gray-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-white text-blue-600 font-bold py-2 px-4 rounded-full hover:bg-gray-100 transition duration-300"
                  >
                    {isLogin ? "Login" : "Sign Up"}
                  </Button>
                </form>
                <div className="text-center mt-6">
                  <p className="text-white text-sm">
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}
                    <button
                      onClick={toggleForm}
                      className="text-yellow-400 font-bold ml-1 hover:underline"
                    >
                      {isLogin ? "Sign Up" : "Login"}
                    </button>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SignUpLoginToggle;
