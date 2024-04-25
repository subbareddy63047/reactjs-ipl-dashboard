// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {isLoading: true, teamsList: []}

  componentDidMount() {
    this.getIplTeamsData()
  }

  getIplTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const TeamsList = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamLogo: eachTeam.team_image_url,
    }))
    this.setState({isLoading: false, teamsList: TeamsList})
  }

  showLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  showTeams = () => {
    const {teamsList} = this.state
    return (
      <div className="home-container__inner-container">
        <div className="log-and-text-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
          </div>
          <h1 className="ipl-text-content">IPL Dashboard</h1>
        </div>
        <div className="teams-container">
          <ul className="ipl-list-container">
            {teamsList.map(each => (
              <TeamCard eachTeam={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-main-container">
        {isLoading ? this.showLoader() : this.showTeams()}
      </div>
    )
  }
}

export default Home
