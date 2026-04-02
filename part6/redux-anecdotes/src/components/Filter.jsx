import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const filterSelected = (event) => {
        event.preventDefault()
        const content = event.target.value
        dispatch(setFilter(content))
    }
    
    return (
        <div>
            filter
            <input
                type="text"
                name="filter"
                onChange={filterSelected}
            />
        </div>
    )

}

export default Filter