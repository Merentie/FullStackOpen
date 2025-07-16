const Notification = ({ message, style }) => {
    if (message != "") {
        return (
            <div className={style}>
                {message}
            </div>
        )
    }
}

export default Notification