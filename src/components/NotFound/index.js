import './index.css'

const NotFound = props => {
  const notFoundRedirect = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not-found-pic"
        className="not-found-image"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-paragraph">
        we are sorry, the page you requested could not be found
      </p>
      <button
        type="button"
        onClick={notFoundRedirect}
        className="not-found-button"
      >
        Home
      </button>
    </div>
  )
}

export default NotFound
