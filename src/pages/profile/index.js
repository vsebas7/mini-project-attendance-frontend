import { useDispatch, useSelector } from "react-redux"
import RenderProfileDetailCard from "../../components/profile"
import { useEffect } from "react"
import { employeeDetail } from "../../store/slices/employee/slices"

function ProfilePage () {

    const dispatch = useDispatch()

    const { profile,id } = useSelector(state => {
        return {
            profile : state.employee.detail,
            id : state.auth?.id,
        }
    })

    useEffect(()=>{
        dispatch(
            employeeDetail({
                employeeId : id
            })
        )
    },[])
    
    return (
        <div class="border w-[50%] h-full pt-5 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a className="text-[20pt] pl-5"> | Employee Details</a>
            <RenderProfileDetailCard profile={profile}/>
        </div>
    )
}

export default ProfilePage