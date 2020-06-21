import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


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
            await fetch(`http://localhost/expensetrackerbackend/fetch.php?type=income&user=${state.credentials.auth_id}`)
                .then(raw => (raw).json())
                .then(res => {
                    commit("fetch_income", res)
                    state.loading = false
                })
        },
        async fetch_expense({ commit, state }) {
            state.loading = true
            await fetch(`http://localhost/expensetrackerbackend/fetch.php?type=expense&user=${state.credentials.auth_id}`)
                .then(raw => (raw).json())
                .then(res => {
                    state.loading = false
                    commit("fetch_expense", res)
                })
        },
        save({ commit, dispatch, state }, payload) {
            state.loading = true
            fetch(`http://localhost/expensetrackerbackend/insert.php?user=${state.credentials.auth_id}`, {
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
        async login({commit},payload){
            console.log(payload);
            let url = `http://localhost/expensetrackerbackend/auth_login.php?name=${payload.name}&pwd=${payload.password}`
            await fetch(url)
                .then(raw => (raw).json())
                .then(res => {
                    commit("login",res)
                })
        },
        async signup({commit},payload){
            console.log(payload);
            
            fetch(`http://localhost/expensetrackerbackend/auth_signup.php`, {
                    method: "post",
                    body: getFormData(payload)
                })
                .then(raw => raw.json())
                .then(res => {
                    console.log(res)
                })
        }
    },
    modules: {}
})