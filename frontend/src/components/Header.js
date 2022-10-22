import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого" />
      <div className="header__info">
        <p className='header__email'>{props.children}</p>
        <Link className='header__link' to={props.headerLink} onClick={props.onClick}>{props.buttonName}</Link>
      </div>
    </header>
  )
} 

export default Header;