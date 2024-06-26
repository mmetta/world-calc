import { firebaseApp } from "../firebase"
import { getDatabase, ref, get, child, update } from "firebase/database"

const state = {
    calcs: [],
}

const getters = {
    calcs(state) {
        return state.calcs
    }
}

const actions = {
    loadCalcs({ commit }) {
        const db = getDatabase(firebaseApp)
        const dbRef = ref(db)
        get(child(dbRef, 'calcs/')).then((snapshot) => {
            if (snapshot.exists()) {
                const calcs = []
                const obj = snapshot.val()
                for (const key in obj) {
                    calcs.push({
                        id: key,
                        data: obj[key].data,
                        clienteEmail: obj[key].clienteEmail,
                        tipo: obj[key].tipo,
                        capa: obj[key].capa,
                        laminacao: obj[key].laminacao,
                        acessorios: obj[key].acessorios,
                        tamanho: obj[key].tamanho,
                        laminas: obj[key].laminas,
                        extras: obj[key].extras,
                        valor: obj[key].valor
                    })
                }
                commit('setCalcs', calcs)
            } else {
                console.log("Dados não encontrados.")
            }
        }).catch((error) => {
            console.error(error)
        })
    },
    deleteCalc({ commit }, id) {
        const db = getDatabase(firebaseApp)
        const updates = {};
        updates['calcs/' + id] = null;
        update(ref(db), updates);
        commit('deleteCalc', true)
    }
}

const mutations = {
    setCalcs(state, obj) {
        state.calcs = obj
    },
    deleteCalc(obj) {
        console.log(obj)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
