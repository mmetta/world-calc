import { firebaseApp } from "../firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const state = {
    logado: {},
    error: {}
}

const getters = {
    logado(state) {
        return state.logado
    },
    error(state) {
        return state.error
    }
}

const actions = {
    login({ commit }) {
        const auth = getAuth(firebaseApp);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                console.log(token)
                const user = result.user;
                commit("setLog", user)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                const obj = { errorCode, errorMessage, email, credential }
                commit("setError", obj)
            });
    },
    logOut({ commit }) {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            commit('logOut')
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    },

}

const mutations = {
    setLog(state, obj) {
        state.logado = obj
    },
    setError(state, obj) {
        state.error = obj
    },
    setLogado(state, payload) {
        state.logado = payload
    },
    logOut(state) {
        console.log('Saiu' + state.logado)
        state.logado = false
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
