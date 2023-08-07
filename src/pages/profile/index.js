import { useSelector } from "react-redux"
import RenderProfileDetailCard from "../../components/profile"

function ProfilePage () {

    const { profile } = useSelector(state => {
        return {
            profile : state.auth.detail,
        }
    })
    
    return (
        <div class="border w-[80%] h-[200px] pt-5 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a className="text-[20pt] pl-5"> | Employee Details</a>
            <RenderProfileDetailCard profile={profile}/>
        </div>
    )
}

export default ProfilePage