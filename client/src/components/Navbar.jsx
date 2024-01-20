import React from 'react'
import Logo from './Logo'
import { Button } from './ui/button'
import { MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="py-4 px-14 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-[10px]">
        <Button asChild variant="ghost">
          <Link to={"/login"}>Login</Link>
        </Button>
        <Button asChild>
          <Link to={"/signup"}>
            <MoveRight className="h-4 w-4 mr-2" />
            Sign up
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Navbar