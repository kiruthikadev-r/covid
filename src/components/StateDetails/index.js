import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Charts from '../Charts'
import StateItemCategory from '../StateItemCategory'

//  This is the list (static data) used in the application. You can move it to any component if needed.

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

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

const healthOption = [
  {
    id: 1,
    name: 'Confirmed',
    imageUrl:
      'https://res.cloudinary.com/dk2gfawgg/image/upload/v1703433725/check-mark_1_ca6kt1.png',
    count: '34285612',
    color: 'red',
  },
  {
    id: 2,
    name: 'Active',
    imageUrl:
      'https://res.cloudinary.com/dk2gfawgg/image/upload/v1703433861/protection_1_rrgqll.png',
    count: '165803',
    color: 'blue',
  },
  {
    id: 3,
    name: 'Recovered',
    imageUrl:
      'https://res.cloudinary.com/dk2gfawgg/image/upload/v1703433980/recovered_1_qnr25o.png',
    count: '33661339',
    color: 'green',
  },
  {
    id: 4,
    name: 'Deceased',
    imageUrl:
      'https://res.cloudinary.com/dk2gfawgg/image/upload/v1703433916/breathing_1_dvanat.png',
    count: '458470',
    color: 'black',
  },
]
// Replace your code here

class StateDetails extends Component {
  state = {
    category: categoriesList[0].id,
    apiStatus: apiStatusConstants.initial,
    totalState: [],
    totalTested: 0,
    listStateName: '',
    stateCode: '',
    stateDate: '',
    localStoreData: [],
    id: '',
    isStateCard: true,
  }

  componentDidMount() {
    this.districtData()
  }

  districtData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'

    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()

      const stateTested = data[stateCode].total.tested
      const isStateCode = statesList.filter(
        eachItem => eachItem.state_code === stateCode,
      )
      const totalStateData = data[stateCode].total
      const stateName = isStateCode[0].state_name
      const newDate = new Date(data[stateCode].meta.last_updated)

      this.setState({
        totalState: totalStateData,
        listStateName: stateName,
        stateDate: newDate,
        localStoreData: data,
        id: stateCode,
        stateCode,
        totalTested: stateTested,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  stateData = () => {
    const {id, localStoreData, category} = this.state
    const listOfDistrict = localStoreData[id].districts
    const listOfDistrictName = Object.keys(listOfDistrict)

    const lowerCaseDis = category.toLowerCase()

    const dataElement = listOfDistrictName.map(eachItem => ({
      districtNameList: eachItem,
      districtValue: listOfDistrict[eachItem].total[lowerCaseDis]
        ? listOfDistrict[eachItem].total[lowerCaseDis]
        : 0,
    }))
    dataElement.sort((a, b) => b.districtValue - a.districtValue)
    const stateActiveCase = listOfDistrictName.map(eachItem => ({
      districtNameList: eachItem,
      districtValue:
        listOfDistrict[eachItem].total.confirmed -
        (listOfDistrict[eachItem].total.recovered +
          listOfDistrict[eachItem].total.deceased)
          ? listOfDistrict[eachItem].total.confirmed -
            (listOfDistrict[eachItem].total.deceased +
              listOfDistrict[eachItem].total.recovered)
          : 0,
    }))
    stateActiveCase.sort((a, b) => b.districtValue - a.districtValue)
    if (lowerCaseDis === 'active') {
      return stateActiveCase
    }
    return dataElement
  }

  retryClicked = () => {
    this.getTravels()
  }

  clickedCategory = id => {
    this.setState({category: id})
  }

  districtName = () => {
    const {
      listStateName,
      id,
      category,
      isStateCard,
      totalState,
      totalTested,
      stateDate,
    } = this.state
    const topDistricts = this.stateData()
    const months = [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'JUly',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    return (
      <div>
        <div>
          <h1>{listStateName}</h1>
          <div>
            <p>Tested</p>
            <p>{totalTested}</p>
          </div>
        </div>
        <div>
          <p>{`Last update on ${
            months[stateDate.getMonth()]
          } ${stateDate.getDate()} ${stateDate.getFullYear()}.`}</p>
        </div>
        <div>
          <p>list</p>
        </div>
        <div>
          <ul className="list-home">
            {healthOption.map(each => (
              <StateItemCategory
                each={each}
                key={each.id}
                clickedCategory={this.clickedCategory}
              />
            ))}
          </ul>
          <div>
            <div>
              <ul>
                {topDistricts.map(each => (
                  <li key={each.districtNameList}>
                    <p>{each.districtValue}</p>
                    <p>{each.districtNameList}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <Charts category={category} id={id} />
        </div>
      </div>
    )
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

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.districtName()
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
    return (
      <div>
        <div className="all-products-section">{this.renderAllJobs()}</div>
      </div>
    )
  }
}

export default StateDetails
