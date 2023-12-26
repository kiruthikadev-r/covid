import Loader from 'react-loader-spinner'
import {Component} from 'react'

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

const data = [
  {date: '23-02-2017', count: 200},
  {date: '24-02-2017', count: 400},
  {date: '23-02-2017', count: 100},
  {date: '23-02-2017', count: 200},
  {date: '24-02-2017', count: 300},
  {date: '23-02-2017', count: 200},
  {date: '24-02-2017', count: 400},
  {date: '23-02-2017', count: 600},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Charts extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCharts()
  }

  getCharts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    console.log(this.props)
    const {category, id} = this.props

    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data`

    const response = await fetch(apiUrl)
    if (response.ok) {
      const chartItems = await response.json()
      const dataObject = Object.keys(chartItems[id].dates)
      const dataState = dataObject.map(eachDate => ({
        eachDate,
        confirmed: chartItems[id].dates[eachDate].total.confirmed,
        recovered: chartItems[id].dates[eachDate].total.recovered,
        deceased: chartItems[id].dates[eachDate].total.deceased,
        tested: chartItems[id].dates[eachDate].total.tested,
        active:
          chartItems[id].dates[eachDate].total.confirmed -
          (chartItems[id].dates[eachDate].total.recovered +
            chartItems[id].dates[eachDate].total.deceased),
      }))
      console.log(dataState)
      const dataCharts = dataObject.map(eachDate => ({
        eachDate,
        confirmed: chartItems[id].dates[eachDate].total.confirmed,
        recovered: chartItems[id].dates[eachDate].total.recovered,
        deceased: chartItems[id].dates[eachDate].total.deceased,
        tested: chartItems[id].dates[eachDate].total.tested,
        active:
          chartItems[id].dates[eachDate].total.confirmed -
          (chartItems[id].dates[eachDate].total.recovered +
            chartItems[id].dates[eachDate].total.deceased),
      }))

      this.setState({
        chartsList: dataState,
        chartsO: dataCharts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLineChart = () => (
    <div>
      <h1>Line Chart</h1>
      <div className="App">
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  )

  renderBarChart = () => {
    const {chartsList} = this.state
    return (
      <div>
        <h1>Bar Chart</h1>
        <div>
          <BarChart width={800} height={450} data={chartsList}>
            <CartesianGrid strokeDasharray="" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="count"
              fill="#8884d8"
              className="bar"
              label={{position: 'top', color: 'white'}}
            />
          </BarChart>
        </div>
      </div>
    )
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

  renderJobsListView = () => {
    const {jobsList} = this.state

    return (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-products-img"
          alt="no jobs"
        />
        <h1 className="no-products-heading">No Jobs Found</h1>
        <p className="no-products-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        {this.renderLineChart()} {this.renderBarChart()}
      </div>
    )
  }
}
export default Charts
