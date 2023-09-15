import { useAuthContext } from "./useAuthContext"
import { useBooksContext } from "./useBooksContext"
import { useComputersContext } from "./useComputersContext"
import { useMagazinesContext } from "./useMagazinesContext"
import { useNewspapersContext } from "./useNewspapersContext"
 
export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: BookDispatch } = useBooksContext()
    const { dispatch: ComputerDispatch } = useComputersContext()
    const { dispatch: MagazineDispatch } = useMagazinesContext()
    const { dispatch: NewspaperDispatch } = useNewspapersContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch ({type: 'LOGOUT'})
        BookDispatch({type: 'SET_BOOKS', payload: null})
        ComputerDispatch({type: 'SET_COMPUTERS', payload: null})
        MagazineDispatch({type: 'SET_MAGAZINES', payload: null})
        NewspaperDispatch({type: 'SET_NEWSPAPERS', payload: null})

    }

    return { logout }
    
}