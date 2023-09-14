import { useAuthContext } from "./useAuthContext"
import { useBooksContext } from "./useBooksContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: BookDispatch } = useBooksContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch ({type: 'LOGOUT'})
        BookDispatch({type: 'SET_BOOKS', payload: null})

    }

    return { logout }
    
}