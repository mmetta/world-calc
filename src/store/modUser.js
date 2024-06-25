import { firebaseApp } from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
    onChanged({ commit }) {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, (userCredential) => {
            const uid = userCredential ? userCredential.uid : null
            const nome = userCredential ? userCredential.displayName : null
            const email = userCredential ? userCredential.email : null
            const phoneNumber = userCredential ? userCredential.phoneNumber : null
            if (uid) {
                const obj = {
                    uid: uid,
                    nome: nome,
                    email: email,
                    tel: phoneNumber
                }
                console.log(obj)
                commit('setLogado', uid)
                commit('setUser', obj)
            } else {
                // User is signed out
                commit('setLogado', false)
            }
        });
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