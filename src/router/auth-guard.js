import { store } from '../store/index'

export default (to, from, next) => {
    const user = store.getters.user
    // console.log(user.uid)
    if (user.uid !== undefined && user.uid !== null) {
        next()
    } else {
        next('/')
    }
}
