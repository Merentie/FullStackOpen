import Part from './Part'

const Content = ({ parts }) => {
    const sum = parts.reduce((acc, cur) => acc + cur.exercises, 0)
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part}/>
            )}
            <b>total of {sum} exercises</b>
        </div>
    )
}

export default Content