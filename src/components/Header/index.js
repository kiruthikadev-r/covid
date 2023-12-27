import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="navbar">
    <div>
      {' '}
      <Link to="/">
        <h1>COVID19INDIA</h1>
      </Link>
      <ul className="listItems" data-testid="faqsUnorderedList">
        <Link to="/">
          <li className="home-text ">
            <button type="button">Home</button>
          </li>
        </Link>
        <Link to="/about">
          <li className="about ">
            <button type="button">About</button>
          </li>
        </Link>{' '}
        <Link to="/">
          <li>
            <p>Exit</p>
          </li>
        </Link>
      </ul>
    </div>
  </nav>
)
export default Header
