import { firebaseApp } from "../firebase"
import { getDatabase, ref, push, get, child } from "firebase/database"

const state = {
    produtos: [],
    precos: [],
    version: ''
}

const getters = {
    produtos(state) {
        return state.produtos
    },
    precos(state) {
        return state.precos
    },
    version(state) {
        return state.version
    }
}

const actions = {
    loadVersion({ commit }) {
        let manifest = document.querySelector('link[rel="manifest"]')
        let file = manifest.href
        let v = ''
        fetch(file)
            .then(response => response.json())
            .then(data => {
                v = data
                commit('setVersion', v.version)
            })
    },
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
    saveCalc({ commit }, obj) {
        const db = getDatabase(firebaseApp)
        let key
        push(ref(db, 'calcs/'), obj)
            .then((data) => {
                key = data.key
                return key
            })
            .then(key => {
                commit('saveCalc', key)
            })
    },
}

const mutations = {
    setProdutos(state, obj) {
        state.produtos = obj
    },
    setPrecos(state, obj) {
        state.precos = obj
    },
    setVersion(state, n) {
        state.version = 'v - ' + n
    },
    saveCalc(obj) {
        console.log(obj)
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
