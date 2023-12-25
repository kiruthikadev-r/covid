import './index.css'

const Header = () => (
  <nav className="navbar">
    <div>
      <img
        className="website-logo"
        src="https://res.cloudinary.com/dk2gfawgg/image/upload/v1703428770/COVID19INDIA_cmn8e5.png"
        alt="website-logo"
      />
    </div>
    <div>
      <ul className="listItems">
        <li className="home-text ">Home</li>
        <li className="about ">About</li>
      </ul>
    </div>
  </nav>
)
export default Header
