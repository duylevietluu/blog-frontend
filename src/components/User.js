import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
    const id = useParams().id
    const user = useSelector(state => state.users).find(item => id === item.id)

    return user && (<>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
            {user.blogs.map(item => <li key={item.id}>{item.title}</li>)}
        </ul>
    </>)
}

export default User