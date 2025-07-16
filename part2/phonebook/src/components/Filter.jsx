const Filter = ({setfilter}) => {    
    return (
        <div> filter shown with <input onChange={(event) => setfilter(event.target.value.toLowerCase())}/> </div>
    )
}

export default Filter