const PersonAdder = ({newname, setnewname, newnumber, setnewnumber, addPerson}) => {
    return (
        <div>
            <h2>Add a new</h2>
            <form onSubmit={addPerson}>
                <div> name: <input value={newname} onChange={(event) => setnewname(event.target.value)} /> </div>
                <div> number: <input value={newnumber} onChange={(event) => setnewnumber(event.target.value)} /> </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonAdder
