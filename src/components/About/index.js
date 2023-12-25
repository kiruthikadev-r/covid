import {Component} from 'react'
import {FiTwitter} from 'react-icons/fi'
import {FaInstagram} from 'react-icons/fa'
import {VscGithubAlt} from 'react-icons/vsc'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

// Replace your code here
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {
    travelList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAbout()
  }

  getAbout = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/covid19-timelines-data/'

    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.faq
      this.setState({
        travelList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We could seem to find the page you are looking for.
      </p>
      <button type="button">Retry</button>
    </div>
  )

  renderTravelListView = () => {
    const {travelList} = this.state

    return (
      <div>
        <Header />

        <div className="success-container">
          <div className="about-top">
            <h1 className="about-heading">About</h1>
            <p className="updation-date">Last update on march 28th 2021</p>
            <h1 className="vaccine-status">
              COVID-19 vaccines be ready for distribution
            </h1>
          </div>

          <ul className="qs-and-ans">
            {travelList.map(each => (
              <li key={each.qno}>
                <p className="question">{each.question}</p>
                <p className="answer">{each.answer}</p>
              </li>
            ))}
          </ul>
          <div className="down-container-home">
            <img
              className="home-down-img"
              src="https://res.cloudinary.com/dk2gfawgg/image/upload/v1703428770/COVID19INDIA_cmn8e5.png"
              alt="website-logo"
            />
            <p className="down-para">
              We stand with everyone fighting on the front line
            </p>
            <div className="down-icons">
              <FaInstagram className="home-down-icon" />
              <FiTwitter className="home-down-icon" />
              <VscGithubAlt className="home-down-icon" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTravelListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="">{this.renderAllJobs()}</div>
  }
}

export default About
