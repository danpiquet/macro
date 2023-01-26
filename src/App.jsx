import logo from "./logo.svg";
import "./App.css";
import AuthContext from "./store/authContext";
import Auth from "./components/Auth";
import Home from "./components/Home";
import AddRecipe from "./components/AddRecipe";
import RecipeDetails from "./components/RecipeDetails";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/home" element={authCtx.token ? <Home /> : <Auth />} />
        <Route
          path="/recipe/:id"
          element={authCtx.token ? <RecipeDetails /> : <Auth />}
        />
        <Route
          path="/addrecipe"
          element={authCtx.token ? <AddRecipe /> : <Auth />}
        />
      </Routes>
    </div>
  );
}

export default App;
