import "./App.css";
import AuthContext from "./store/authContext";
import Auth from "./components/Auth";
import Home from "./components/Home";
import AddRecipe from "./components/AddRecipe";
import RecipeDetails from "./components/RecipeDetails";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import SearchAppBar from "./components/SearchAppBar";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      {authCtx.token && <SearchAppBar />}
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/home" element={authCtx.token ? <Home /> : <Auth />} />
        <Route
          path="/recipes/:id"
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
