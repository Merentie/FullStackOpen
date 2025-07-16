const Numbers = ({persons, personRemover}) => {
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map((person) =>
                <p key={person.id}> {person.name} {person.number} <button onClick={()=>personRemover(person)}> delete</button></p>
            )}
        </div>
    )
}

export default Numbers