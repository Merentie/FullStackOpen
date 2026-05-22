import {
  useNotificationMessage,
  useNotificationStyle,
} from '../stores/notificationStore'

const Notification = () => {
  const message = useNotificationMessage()
  const style = useNotificationStyle()
  if (message !== '') {
    return <div className={style}>{message}</div>
  }
}

export default Notification
