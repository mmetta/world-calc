import { firebaseApp } from '../firebase'
import { getDatabase, ref, child, get } from 'firebase/database'

const db = getDatabase(firebaseApp)
const dbRef = ref(db)

const state = {
    user: {}
}

const getters = {
    user(state) {
        return state.user
    }
}

const actions = {
    loadUser({ commit }, uid) {
        get(child(dbRef, 'users/' + uid + '/user/')).then((snapshot) => {
            if (snapshot.exists()) {
                const user = {}
                const obj = snapshot.val()
                user.nome = obj.nome
                user.email = obj.email
                user.uid = uid
                commit('loadUser', obj)
            } else {
                console.log('No data available')
            }
        }).catch((error) => {
            console.error(error)
        })
    },
    setUser({ commit }, obj) {
        commit('setUser', obj)
    }
}

const mutations = {
    loadUser(state, payload) {
        state.user = payload
    },
    setUser(state, payload) {
        state.user = payload
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}