// Next Imports
import Link from 'next/link';
import { useContext } from 'react';
import dynamic from 'next/dynamic';

// Styles and CSS
import { NavBarItems, Logo, Item, NavBarContainer } from './Navbar.styles';

// Components
const Button = dynamic(() => import('../Button'));
const UserProfile = dynamic(() => import('./UserProfile'));

// Stores
import { CurrentUserContext } from '../../utils/stores/CurrentUserContext';

const NavBar = () => {
  const { user, setUser } = useContext(CurrentUserContext);

  return (
    <>
      <Container>
        <Logo>
          <Link href="/" passHref prefetch={false}>
            <div>Quanty</div>
          </Link>
        </Logo>
        <NavBarItems>
          <div className="navBarLinks">
            <NavItemWrapper text="Features" url="/features" />
            <NavItemWrapper text="Dashboard" url="/dashboard" />
            <NavItemWrapper
              text="Support"
              url="https://discord.com/oauth2/authorize?client_id=824106276404854844&scope=bot&permissions=8"
            />
          </div>
          {user ? <UserProfile user={user} /> : <LoginButton />}
        </NavBarItems>
      </Container>
    </>
  );
};

interface NavItemProps {
  text: string;
  url: string;
}

const NavItemWrapper = ({ url, text }: NavItemProps) => {
  return (
    <Link href={`${url}`} passHref prefetch={false}>
      <Item>{text}</Item>
    </Link>
  );
};

interface NavBarWrapperProps {
  children: React.ReactNode;
}

const Container = ({ children }: NavBarWrapperProps) => {
  return (
    <>
      <NavBarContainer>{children}</NavBarContainer>
    </>
  );
};

const LoginButton = () => {
  const login = () => {
    window.location.assign('http://localhost:3001/api/auth/login');
  };

  return (
    <Button
      text="Login"
      onClick={() => {
        login();
      }}
    />
  );
};

export default NavBar;
