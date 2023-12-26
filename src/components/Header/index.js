import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="navbar">
    <div>
      <ul className="listItems" data-testid="faqsUnorderedList">
        <li>
          <Link to="/">
            <h1>COVID19INDIA</h1>
          </Link>
        </li>
        <li className="home-text ">
          <Link to="/">
            <button type="button">Home</button>
          </Link>
        </li>{' '}
        <li className="about ">
          <Link to="/about">
            <button type="button">About</button>
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)
export default Header
