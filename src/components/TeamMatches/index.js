// Write your code here
import './index.css'

const TeamMatches = props => {
  const {each} = props
  const {matchStatus, result, competingTeamLogo, competingTeam} = each
  const active = matchStatus === 'Won' ? 'won' : 'lost'
  return (
    <li className="card">
      <img src={competingTeamLogo} alt={{competingTeam}} className="card-log" />
      <p>{competingTeam}</p>
      <p id="results">{result}</p>
      <p id={active}>{matchStatus}</p>
    </li>
  )
}
export default TeamMatches
