import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => 
  <tr> 
    <td> {text} </td> 
    <td> {value} </td> 
  </tr>

const Statistics = ({good, neutral, bad}) => {
  const all = (good+neutral+bad)
  const avg = ((good)+(bad*-1))/all
  const pos = good/all + " %"
  if (all==0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={all}/>
            <StatisticLine text="average" value={avg}/>
            <StatisticLine text="positive" value={pos}/>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} onClick={() => (setGood(good+1))}/>
      <Button text={"neutral"} onClick={() => (setNeutral(neutral+1))}/>
      <Button text={"bad"} onClick={() => (setBad(bad+1))}/>

      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App


