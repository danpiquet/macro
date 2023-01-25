import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <nav>
        <NavLink to="/">Landing</NavLink>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/addrecipe">Add Recipe</NavLink>
        
    </nav>
  )
}

export default Header