// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {eachTeam} = props
  const {id, name, teamLogo} = eachTeam
  return (
    <Link to={`/team-matches/${id}`}>
      <li className="each-team-container">
        <div className="each-team-logo-container">
          <img src={teamLogo} alt={name} className="each-team-logo" />
        </div>
        <p className="each-team-name">{name}</p>
      </li>
    </Link>
  )
}
export default TeamCard
