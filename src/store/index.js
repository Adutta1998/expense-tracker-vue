import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

// const host = "localhost"
const host = "expense-tracker.avinab.in.net"
const getFormData = function(obj) {
    let fd = new FormData()
    for (let key in obj) {
        fd.append(key, obj[key])
    }
    return fd
}

export default new Vuex.Store({
    state: {
        income: null,
        expense: null,
        loading: false,
        credentials:null,
    },
    mutations: {
        fetch_income(state, payload) {
            state.income = payload
        },
        fetch_expense(state, payload) {
            state.expense = payload
        },
        login(state,payload){
            state.credentials = payload
            let cookie = `cred=${JSON.stringify(payload)};max-age=${60*24*60*60};path=/`
            state.loading = false
            document.cookie = cookie
        },
        checkLogin(state){
            let cookie = document.cookie
            if(cookie){
                cookie = cookie.split("=");
                cookie = cookie[1];
                cookie = JSON.parse(cookie)
                state.credentials = cookie
            }
        }
    },
    actions: {
        async fetch_income({ commit, state }) {
            state.loading = true
            await fetch(`http://${host}/expensetrackerbackend/fetch.php?type=income&user=${state.credentials.auth_id}`)
                .then(raw => (raw).json())
                .then(res => {
                    commit("fetch_income", res)
                    state.loading = false
                })
        },
        async fetch_expense({ commit, state }) {
            state.loading = true
            await fetch(`http://${host}/expensetrackerbackend/fetch.php?type=expense&user=${state.credentials.auth_id}`)
                .then(raw => (raw).json())
                .then(res => {
                    state.loading = false
                    commit("fetch_expense", res)
                })
        },
        save({ commit, dispatch, state }, payload) {
            state.loading = true
            fetch(`http://${host}/expensetrackerbackend/insert.php?user=${state.credentials.auth_id}`, {
                    method: "post",
                    body: getFormData(payload)
                })
                .then(raw => raw.json())
                .then(res => {
                    console.log(res)
                    dispatch("fetch_income")
                    dispatch("fetch_expense")
                })
        },
        async login({commit,state},payload){
            state.loading = true
            console.log(payload);
            let url = `http://${host}/expensetrackerbackend/auth_login.php?name=${payload.name}&pwd=${payload.password}`
            await fetch(url)
                .then(raw => (raw).json())
                .then(res => {
                    commit("login",res)
                })
        },
        async signup({commit,state},payload){
            state.loading = true
            fetch(`http://${host}/expensetrackerbackend/auth_signup.php`, {
                    method: "post",
                    body: getFormData(payload)
                })
                .then(raw => raw.json())
                .then(res => {
                    commit('login',payload)
                })
        }
    },
    modules: {}
})