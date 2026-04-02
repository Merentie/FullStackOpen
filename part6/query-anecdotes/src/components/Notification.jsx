import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = ({value}) => {

  const { notification } = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification !== null) 

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
