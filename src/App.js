import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        {isLogin && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        {isLogin && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
