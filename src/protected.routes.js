import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export function ProtectedRouteAdmin ({
    children
}) {
    const {role} = useSelector(state => {
        return {
            role : state.auth.role,
        }
    })

    return role===1 ? children : <Navigate to="/attendance" replace/>
}

export function ProtectedRouteEmployee ({
    children
}) {
    const {role} = useSelector(state => {
        return {
            role : state.auth.role,
        }
    })

    return role===2 ? children : <Navigate to="/employee" replace/>
}