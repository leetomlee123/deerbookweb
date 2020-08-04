import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        cps: [],
        isLogin: false,
        token: '',
        fixBottom: false,
        ids: []
    },
    getters: {
        getCp: (state) => (idx) => {
            return state.cps[idx]
        },
        getIds: (state) => {
            return state.ids
        },
        getLen: (state) => {
            return state.cps.length
        },
        getFixBottomState: (state) => {
            return state.fixBottom
        },
        getLoginState: (state) => {
            return state.isLogin
        },
        getToken: (state) => {
            return state.token
        }

    },
    mutations: {
        setIds(state,ids){
            state.ids = ids
        },
        setCps(state, cps) {
            state.cps = cps
        }
        ,
        setToken(state, token) {
            state.token = token
        },
        setLoginState(state, isLogin) {
            state.isLogin = isLogin
        },
        fixBottom: (state, fix) => {
            state.fixBottom = fix
        }
    }
})
export default store;
