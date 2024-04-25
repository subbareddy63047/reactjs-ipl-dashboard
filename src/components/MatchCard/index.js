// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import TeamMatches from '../TeamMatches'

import './index.css'

const colors = [
  'first',
  'second',
  'third',
  'fourth',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
]

class MatchCard extends Component {
  state = {isLoading: true, teamDetails: {}}

  componentDidMount() {
    this.getTeamData()
  }

  camelCaseObj = obj => ({
    date: obj.date,
    firstInnings: obj.first_innings,
    manOfTheMatch: obj.man_of_the_match,
    matchStatus: obj.match_status,
    id: obj.id,
    result: obj.result,
    secondInnings: obj.second_innings,
    umpires: obj.umpires,
    venue: obj.venue,
    competingTeamLogo: obj.competing_team_logo,
    competingTeam: obj.competing_team,
  })

  getTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const results = await response.json()
    const teamDetails = {
      teamBannerUrl: results.team_banner_url,
      latestMatchDetails: this.camelCaseObj(results.latest_match_details),
      recentMatches: results.recent_matches.map(each =>
        this.camelCaseObj(each),
      ),
    }
    this.setState({isLoading: false, teamDetails})
  }

  showLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="Oval" color="#fff" height={50} width={50} />
    </div>
  )

  showMatchCardDetails = () => {
    const {teamDetails} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamDetails
    return (
      <div className="match-card-inner-container">
        <div className="each-match-card-banner-container">
          <img src={teamBannerUrl} alt="team banner" />
        </div>
        <div className="latest-matches-container">
          <h1 className="latest-text">latestmatchdetails</h1>
          <LatestMatch latestMatchDetails={latestMatchDetails} />
        </div>
        <div className="composite-teams-container">
          <ul className="composite-teams-list">
            {recentMatches.map(eachCard => (
              <TeamMatches each={eachCard} key={eachCard.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    const randomNumber = Math.trunc(Math.random() * 10)
    return (
      <div className={`match-card-container ${colors[randomNumber]}`}>
        {isLoading ? this.showLoader() : this.showMatchCardDetails()}
      </div>
    )
  }
}

export default MatchCard
