import { useUser } from "../contexts/userContext"

const Profile = () => {
    const {currentUser} = useUser()

    return (
        <div>
            <img src={currentUser.picture} alt={`${currentUser.username}'s photo`} />
            <h2>{currentUser.fullname}</h2>
            <h3>{currentUser.username}</h3>
            <p>Date de création du compte : {currentUser.createdAt}</p>
        </div>
    )
}

export default Profile
