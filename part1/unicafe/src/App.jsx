import { useState } from 'react'

const Header = (app) => { 
  return (<h1>{app.header}</h1>)
}

const Button = (props) => {
  return (
    <div>
      <button onClick = {props.good}> good </button>
      <button onClick = {props.neutral}> neutral </button>
      <button onClick = {props.bad}> bad </button>
    </div>
  )
}

const StatisticsLine = (props) => {
  if (props.name === "positive") return (
    <tr>
      <td> {props.name} </td>  
      <td> {props.calc} % </td>
    </tr>
  )
  return (
    <tr>
      <td> {props.name} </td>  
      <td> {props.calc} </td>
    </tr>
    )
}

const Statistics = (props) => {
  const total = (props.good+props.neutral+props.bad)
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
  <table>
    <tbody>
      <StatisticsLine name = "good" calc = {props.good} />
      <StatisticsLine name = "neutral" calc = {props.neutral}/>
      <StatisticsLine name = "bad" calc = {props.bad}/>
      <StatisticsLine name = "all" calc = {total}/>
      <StatisticsLine name = "average" calc = {(props.good-props.bad)/(total)}/>
      <StatisticsLine name = "positive" calc = {((props.good / total)*100)}/>
    </tbody>
  </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Header header = "give feedback"/>
      <Button good = {() => setGood(good+1)} neutral = {() => setNeutral(neutral+1)} bad = {() => setBad(bad+1)}/>
      <Header header = "statistics"/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App