import { useState } from 'react'

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text} </td>
            <td>{props.value} </td>

        </tr>
    )
}

const Button = (props) => {
    return (<button onClick={props.handler}>{props.text}</button>)
}

const Statistics = (props) => {
    if (props.all === 0) {
        return (
            <div>
            <h1> statistics </h1>
            <p> No feedbacks given</p>
            </div>)
    }
    return (
        <div>
            <h1> statistics </h1>
            <table>
                <tbody>
                    <StatisticLine text="good" value={props.good} />
                    <StatisticLine text="neutral" value={props.neutral} />
                    <StatisticLine text="bad" value={props.bad} />
                    <StatisticLine text="all" value={props.all} />
                    <StatisticLine text="average" value={props.average} />
                    <StatisticLine text="positive" value={props.positive + "%"} />
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [average, setAverage] = useState(0)
    const [positive, setPositive] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1);
        calcStats(good+1, neutral, bad);
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
        calcStats(good, neutral +1, bad);
    }
    const handleBadClick = () => {
        setBad(bad + 1);
        calcStats(good, neutral, bad+1);
    }

    const calcStats = (g,n,b) => {
        const total = g+n+b;
        setAll(total);
        setAverage((g-b) / total);
        setPositive(g / total * 100);
    }

    return (
        <div>
            <h1> give feedback </h1>
            <Button handler={handleGoodClick} text="good"/>
            <Button handler={handleNeutralClick} text="neutral"/>
            <Button handler={handleBadClick} text="bad"/>
            <Statistics good={good} neutral={neutral} bad={bad} average={average} all={all} positive={positive}/>

        </div>
    )
}

export default App