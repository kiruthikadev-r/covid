import React from 'react'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="down-container-home">
    <h1>COVID19INDIA</h1>
    <p className="down-para">
      we stand with everyone fighting on the front lines
    </p>
    <ul className="down-icons">
      <li>
        <FiInstagram className="home-down-icon" />
      </li>
      <li>
        <FaTwitter className="home-down-icon" />
      </li>
      <li>
        <VscGithubAlt className="home-down-icon" />
      </li>
    </ul>
  </div>
)

export default Footer
