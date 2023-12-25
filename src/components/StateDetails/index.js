import {Component} from 'react'
import Loader from 'react-loader-spinner'

//  This is the list (static data) used in the application. You can move it to any component if needed.

const categoriesList = [
  {id: 'CONFIRMED', displayText: 'Confirmed'},
  {id: 'ACTIVE', displayText: 'Active'},
  {id: 'RECOVERED', displayText: 'Recovered'},
  {id: 'DECEASED', displayText: 'Deceased'},
]
// Replace your code here
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Replace your code here
class StateDetails extends Component {
  state = {
    activeId: categoriesList[0].id,
    apiStatus: apiStatusConstants.initial,
    travelList: [],
  }

  componentDidMount() {
    this.getTravels()
  }

  getTravels = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = 'https://apis.ccbp.in/covid19-timelines-data/'

    const response = await fetch(`${apiUrl}${id}`)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.projects.map(travel => ({
        id: travel.id,
        name: travel.name,
        imageUrl: travel.image_url,
      }))
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

  retryClicked = () => {
    this.getTravels()
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.retryClicked}>
        Retry
      </button>
    </div>
  )

  renderTravelListView = () => {
    const {travelList} = this.state

    return (
      <div className="all-products-container">
        <h1>Travel Guide</h1>
        <ul className="products-list">
          {travelList.map(each => (
            <li key={each.id}>
              <img src={each.imageUrl} alt={each.name} />
              <p>{each.name}</p>
              <p>{each.description}</p>
            </li>
          ))}
        </ul>
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

  selectedTag = event => {
    this.setState({activeId: event.target.value}, this.getTravels)
  }

  render() {
    const {activeId} = this.state

    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
          alt="website logo"
        />
        <select value={activeId} onChange={this.selectedTag}>
          {categoriesList.map(each => (
            <option value={each.id}>{each.displayText}</option>
          ))}
        </select>
        <div className="all-products-section">{this.renderAllJobs()}</div>
      </div>
    )
  }
}

export default StateDetails
