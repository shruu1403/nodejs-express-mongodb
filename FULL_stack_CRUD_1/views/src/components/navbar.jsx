import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./navbar.module.css"

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div className={styles.links}>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/notes">Notes</Link>

      </div>
    </div>
  )
}

export default Navbar