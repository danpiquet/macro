import logo from "./logo.svg";
import "./App.css";
import Auth from "./components/Auth";
import Home from "./components/Home";
import AddRecipe from "./components/AddRecipe";
import RecipeDetails from "./components/RecipeDetails";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
