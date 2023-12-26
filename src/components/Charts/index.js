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
    chartsList: [],
    chartsO: [],
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

  renderLineChart = (cl, color) => {
    const {chartsO} = this.state
    console.log(color)
    console.log(cl)
    return (
      <div>
        <div className="App">
          <LineChart
            width={730}
            height={250}
            data={chartsO}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="eachDate"
              style={{
                fontFamily: 'Roboto',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
              dy={5}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={cl} stroke={color} />
          </LineChart>
        </div>
      </div>
    )
  }

  renderBarChart = () => {
    const {chartsList} = this.state
    const {category} = this.props
    const barChart = category.toLowerCase()
    const maxBarChart = chartsList.slice(Math.max(chartsList.length - 10, 0))
    let barColor = '#9A0E31'
    if (barChart === 'confirmed') {
      barColor = '#9A0E31'
    } else if (barChart === 'active') {
      barColor = '#132240;'
    } else if (barChart === 'recovered') {
      barColor = '#182829'
    } else if (barChart === 'deceased') {
      barColor = '#1C1C2B'
    }

    return (
      <div>
        <div>
          <BarChart
            width={800}
            height={450}
            data={maxBarChart}
            margin={{top: 5, right: 30, left: 20, botton: 5}}
          >
            <XAxis
              dataKey="eachDate"
              stroke={`${barColor}`}
              interval={0}
              axisLine={false}
              fontSize={10}
              tickLine={0}
              strokeWidth={1}
              style={{
                fontWeight: 500,
                fontFamily: 'Roboto',
                textTransform: 'upperCase',
              }}
              dy={10}
            />

            <Tooltip />
            <Legend />
            <Bar
              dataKey={barChart}
              fill={`${barColor}`}
              className="bar"
              label={{position: 'top', fill: `${barColor}`, color: 'white'}}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </div>
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

  renderGChart = () => (
    <div>
      <h1>Daily Spread Threads</h1>
      <div>{this.renderLineChart('confirmed', '#9A0E31')}</div>
      <div>{this.renderLineChart('active', '#132240')}</div>
      <div>{this.renderLineChart('recovered', '#182829')}</div>
      <div>{this.renderLineChart('deceased', '#1C1C2B')}</div>
      <div>{this.renderLineChart('tested', '#230F41;')}</div>
    </div>
  )

  render() {
    return (
      <div>
        {this.renderBarChart()}

        {this.renderGChart()}
      </div>
    )
  }
}
export default Charts
