import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
     <div>Logo</div>
     <ul>
<li><Link to='/home'>Home</Link></li>
<li><Link to='/about'>About Us</Link></li>
<li><Link to='/contact'>Contact Us</Link></li>
<li><Link to='/login'>Get started</Link></li>

     </ul>
    </div>
  )
}

export default Header
