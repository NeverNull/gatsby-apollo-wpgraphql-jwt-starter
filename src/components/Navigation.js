import React from "react"
import { Link } from "gatsby"

const style = {
  display: 'inline-block',
  marginRight: 16
}

const Navigation = () => {
  return (
    <nav>
      <div>
        Navigation:
      </div>
      <ul style={{marginLeft: 0}}>
        <li style={style}><Link to={"/dashboard/login/"} >Login</Link></li>
        <li style={style}><Link to={"/dashboard/signup/"} >SignUp</Link></li>
        <li style={style}><Link to={"/dashboard/"} >Dashboard</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation
