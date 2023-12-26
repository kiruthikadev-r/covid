import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsFilterRight, BsFilterLeft} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import {FiInstagram} from 'react-icons/fi'
import {FaSearch, FaTwitter} from 'react-icons/fa'
import {VscGithubAlt} from 'react-icons/vsc'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

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

const constantActive = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    productSts: constantActive.initial,
    searchInput: '',
    covidList: [],
    isActive: false,
  }

  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({productSts: constantActive.initial})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()

      // Inside the getProducts method
      const extractedData = statesList.map(eachState => {
        const {total, meta} = data[eachState.state_code]
        const {confirmed, recovered, deceased} = total
        const active = confirmed - (recovered + deceased)
        const {population} = meta
        return {
          stateName: eachState.state_name,
          stateCode: eachState.state_code,
          confirmedD: confirmed,
          recoveredD: recovered,
          deceasedD: deceased,
          activeD: active,
          populationD: population,
        }
      })

      this.setState({covidList: extractedData})

      // Remove null values from the array
    } else {
      console.log('Error fetching data')
    }
  }

  loaderMethod = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  failureMethod = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value, isActive: true})
  }

  render() {
    const {searchInput, covidList, isActive} = this.state
    const filteredList = covidList.filter(eachItem =>
      eachItem.stateName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    console.log(covidList)
    return (
      <div>
        <Header />
        <div className="home">
          <div className="first-input-container">
            <div className="input-container">
              <FaSearch size={20} className="search-icon" />
              <input
                className="input"
                type="search"
                value={searchInput}
                placeholder="Enter the state"
                onChange={this.updateSearchInput}
              />
            </div>
          </div>
          {!isActive && (
            <div>
              <div>
                <ul className="list-home">
                  {healthOption.map(each => (
                    <li
                      key={each.id}
                      className={`list-item-home ${each.color}`}
                    >
                      <p className={`list-item-text ${each.color}`}>
                        {each.name}
                      </p>
                      <img
                        className={`list-item-image ${each.color}`}
                        src={each.imageUrl}
                        alt={each.name}
                      />
                      <p className={`list-item-count ${each.color}`}>
                        {each.count}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="list-box-container">
                <div className="list-box-container-two">
                  <ul className="list-box">
                    <li className="list-confirmed">
                      <p className="list-text state-text">States/UT</p>
                      <BsFilterLeft className="filter-icon" />
                      <BsFilterRight className="filter-icon" />
                    </li>
                    <li>
                      <p className="list-text">Confirmed</p>
                    </li>
                    <li>
                      <p className="list-text">Active</p>
                    </li>
                    <li>
                      <p className="list-text">Recovered</p>
                    </li>
                    <li>
                      <p className="list-text">Deceased</p>
                    </li>
                    <li className="list-text">
                      <p>Population</p>
                    </li>
                  </ul>
                  <hr />
                  <ul>
                    {covidList.map(each => (
                      <li key={each.stateCode} className="list-item-api">
                        <h1 className="state-name">{each.stateName}</h1>
                        <p className="api-item red">{each.confirmedD}</p>
                        <p className="api-item blue">{each.activeD}</p>
                        <p className="api-item green">{each.recoveredD}</p>
                        <p className="api-item black">{each.deceasedD}</p>
                        <p className="api-item black population">
                          {each.populationD}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="down-container-home">
                <img
                  className="home-down-img"
                  src="https://res.cloudinary.com/dk2gfawgg/image/upload/v1703428770/COVID19INDIA_cmn8e5.png"
                  alt="website-logo"
                />
                <p className="down-para">
                  we stand with everyone fighting on the front lines
                </p>
                <div className="down-icons">
                  <FiInstagram className="home-down-icon" />
                  <FaTwitter className="home-down-icon" />
                  <VscGithubAlt className="home-down-icon" />
                </div>
              </div>
            </div>
          )}

          {isActive && (
            <div>
              <ul>
                {filteredList.map(each => (
                  <li>
                    <p>{each.stateName}</p>
                    <div>
                      <p>{each.stateCode}</p>
                      <Link to={`/states/${each.stateCode}`}>
                        <BiChevronRightSquare />
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home
