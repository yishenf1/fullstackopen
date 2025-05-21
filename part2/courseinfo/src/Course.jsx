const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
    <div>
        {props.parts.map(part => <Part part={part} key={part.id } />)}
    </div>
)

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
)

const Total = (props) => <p>Number of exercises {props.total}</p>


const Course = (props) => {
    return (
        <div>
            {props.courses.map(course => 
                <div key={course.id}>
                    <Header course={course.name} />
                    <Content parts={course.parts} />
                    <Total total={course.parts.reduce((s, p) =>
                        s + p.exercises, 0
                    )} />
                </div>)
             }
        </div>
            
       
    )
}

export default Course