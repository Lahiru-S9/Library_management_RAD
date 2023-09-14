import { useAuthContext } from "./useAuthContext"
import { useBooksContext } from "./useBooksContext"
import { useComputerContext } from "./useComputersContext"
import { useMagazineContext } from "./useMagazinesContext"
import { useNewspaperContext } from "./useNewspapersContext"
 
export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: BookDispatch } = useBooksContext()
    const { dispatch: ComputerDispatch } = useComputerContext()
    const { dispatch: MagazineDispatch } = useMagazineContext()
    const { dispatch: NewspaperDispatch } = useNewspaperContext()

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