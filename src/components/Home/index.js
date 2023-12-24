import {Component} from 'react'

import Header from '../Header'
import './index.css'

const healthOption = [
  {
    id: 1,
    name: 'Confirmed',
    imageUrl:
      'https://res.cloudinary.com/dk2gfawgg/image/upload/v1703433725/check-mark_1_ca6kt1.png',
    count: '34285612',
  },
  {
    id: 2,
    name: 'Active',
    imageUrl:
      'https://res.cloudinary.com/dk2gfawgg/image/upload/v1703433861/protection_1_rrgqll.png',
    count: '165803',
  },
  {
    id: 3,
    name: 'Recovered',
    imageUrl:
      'https://res.cloudinary.com/dk2gfawgg/image/upload/v1703433980/recovered_1_qnr25o.png',
    count: '33661339',
  },
  {
    id: 4,
    name: 'Deceased',
    imageUrl:
      'https://res.cloudinary.com/dk2gfawgg/image/upload/v1703433916/breathing_1_dvanat.png',
    count: '458470',
  },
]

class Home extends Component {
  state = {
    searchInput: '',
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state
    return (
      <div>
        <Header />
        <div className="home">
          <div>
            <input
              className="input"
              type="search"
              value={searchInput}
              placeholder="Enter the state"
              onChange={this.updateSearchInput}
            />
          </div>

          <div>
            <ul>
              {healthOption.map(each => (
                <li key={each.id}>
                  <p>{each.name}</p>
                  <img src={each.imageUrl} alt={each.name} />
                  <p>{each.count}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
