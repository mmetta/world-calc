import { firebaseApp } from "../firebase"
import { getDatabase, ref, get, child } from 'firebase/database'

const state = {
    produtos: [],
    precos: []
}

const getters = {
    produtos(state) {
        return state.produtos
    },
    precos(state) {
        return state.precos
    }
}

const actions = {
    loadProdutos({ commit }) {
        const db = getDatabase(firebaseApp)
        const dbRef = ref(db)
        get(child(dbRef, 'produtos/')).then((snapshot) => {
            if (snapshot.exists()) {
                const produtos = snapshot.val()
                commit('setProdutos', produtos)
            } else {
                console.log("Dados não encontrados.")
            }
        }).catch((error) => {
            console.error(error)
        })
    },
    loadPrecos({ commit }) {
        const db = getDatabase(firebaseApp)
        const dbRef = ref(db)
        get(child(dbRef, 'precos/')).then((snapshot) => {
            if (snapshot.exists()) {
                const precos = snapshot.val()
                commit('setPrecos', precos)
            } else {
                console.log("Dados não encontrados.")
            }
        }).catch((error) => {
            console.error(error)
        })
    },
}

const mutations = {
    setProdutos(state, obj) {
        state.produtos = obj
    },
    setPrecos(state, obj) {
        state.precos = obj
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
