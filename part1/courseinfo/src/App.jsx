const Header = (app) => { 
  return (<h1>{app.header}</h1>
  )
}

const Content = (app) => {
  return (
  <div>
   <Part part={app.content[0]}/>
   <Part part={app.content[1]}/>
   <Part part={app.content[2]}/>
  </div>

  )
}

const Part = (course) => {
  return (
    <p>{course.part.name} {course.part.exercises}</p>
  )
}

const Total = (numbers) => { 
  return (
  <p>Number of exercises {numbers.course[0].exercises + numbers.course[1].exercises + numbers.course[2].exercises}</p>
  ) 
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header header={course.name} />
      <Content content={course.parts}/>
      <Total course={course.parts}/>
    </div>
  )
}
export default App