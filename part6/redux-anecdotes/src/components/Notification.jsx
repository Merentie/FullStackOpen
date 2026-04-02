import { useSelector } from 'react-redux'

const Notification = () => {
  const currentNotification = useSelector(state => {
    if (state.notification !== null) {
      return state.notification
    }
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  
  if (currentNotification) {
    return <div style={style}> {currentNotification} </div>
  }
}

export default Notification
