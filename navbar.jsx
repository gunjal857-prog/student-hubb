
import { useState } from "react";
import Stdlist from "./student-list";

function Nav() {

  const [dropdown, setDropdown] = useState(null);

  return(
    <>

    <div className="mean">
      <div className="headding">
        <nav>
          <ul>
        <a href=""><li>Home</li></a>
        <a href=""><li>Student-slip</li></a>
        <a href=""><li>Student-card</li></a>
        <a href=""><li>student-list</li></a>
          </ul>
        </nav>
      </div>
    <Stdlist/>
    
    
    
    
    </div>
    </>
  )

 
   
}

export default Nav;


