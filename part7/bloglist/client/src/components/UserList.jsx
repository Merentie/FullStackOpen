import { Link } from 'react-router-dom'
import { useUsers } from '../stores/userStore'
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Typography,
} from '@mui/material'

const UserList = () => {
  const users = useUsers()
  return (
    <div>
      <Typography variant='h4' sx={{ marginTop: 1 }}>
        Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant='h5'> Name </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='h5'> Username </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='h5'> Blogs created </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Typography variant='body1'>
                  <Link
                    to={`/users/${user.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {user.name}
                  </Link>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body1'> {user.username}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body1'>{user.blogs.length} </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UserList
