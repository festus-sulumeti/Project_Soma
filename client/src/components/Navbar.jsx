import { UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div className="py-4 px-14 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-[10px]">
        <Button asChild variant="ghost">
          <Link to={"/login"}>
            <UserOutlined className='h-4 w-4 mr-2'/>
            Login
        </Link>
        </Button>
        <Button asChild>
          <Link to={"/signup"}>
            <UserAddOutlined className="h-4 w-4 mr-2" />
            Sign up
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Navbar