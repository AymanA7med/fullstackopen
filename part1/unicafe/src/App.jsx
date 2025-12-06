import { useState } from 'react'
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine  = ({value, text}) => <tr><td>{text}</td><td>{value}</td></tr>
function Statistics({good, neutral, bad}) {
  let sum = good + neutral + bad
  return (
  <>
    {
    sum === 0 ? 
    <h3>No feedback given</h3> : 
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
        <StatisticLine  value={good} text="good" />
        <StatisticLine  value={neutral} text="neutral" />
        <StatisticLine  value={bad} text="bad" />
        <StatisticLine  value={sum} text="all" />
        <StatisticLine  value={(good - bad) / (sum ? sum : 1)} text="average" />
        <StatisticLine  value={good / (sum ? sum : 1)} text="positive" />
        </tbody>
      </table>
    </div>
    }
  </>
  )
}
function Anecdote({anecdote, votes, header}) {
  return (
    <div> 
      <h1>{header}</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}
function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [indexMaxVotes, setIndexMaxVotes] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const IncreaseGood = () => setGood(good + 1)
  const IncreaseNeutral = () => setNeutral(neutral + 1)
  const IncreaseBad = () => setBad(bad + 1)
  const randomAnecdote = () => {
    const rand = Math.floor(Math.random() * anecdotes.length)
    setSelected(rand)
  }
  const voteAnecdote = () => {
    if (votes[selected] + 1 > votes[indexMaxVotes]) {
      setIndexMaxVotes(selected)
    }
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button onClick={IncreaseGood} text="good" />
        <Button onClick={IncreaseNeutral} text="neutral" />
        <Button onClick={IncreaseBad} text="bad" />
        <Statistics good={good} neutral={neutral} bad={bad} />
        <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} header="Anecdote of the day" />
        <Button onClick={voteAnecdote} text="vote" />
        <Button onClick={randomAnecdote} text="next anecdote" />
        <Anecdote anecdote={anecdotes[indexMaxVotes]} votes={votes[indexMaxVotes]} header="Anecdote with most votes" />
      </div>
      
    </>
  )
}

export default App
