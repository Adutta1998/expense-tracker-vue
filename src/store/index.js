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
        loading: false
    },
    mutations: {
        fetch_income(state, payload) {
            state.income = payload
        },
        fetch_expense(state, payload) {
            state.expense = payload
        }
    },
    actions: {
        async fetch_income({ commit, state }) {
            state.loading = true
            await fetch("http://localhost/expensetrackerbackend/fetch.php?type=income")
                .then(raw => (raw).json())
                .then(res => {
                    commit("fetch_income", res)
                    state.loading = false
                })
        },
        async fetch_expense({ commit, state }) {
            state.loading = true
            await fetch("http://localhost/expensetrackerbackend/fetch.php?type=expense")
                .then(raw => (raw).json())
                .then(res => {
                    state.loading = false
                    commit("fetch_expense", res)
                })
        },
        save({ commit, dispatch, state }, payload) {
            state.loading = true
            fetch("http://localhost/expensetrackerbackend/insert.php", {
                    method: "post",
                    body: getFormData(payload)
                })
                .then(raw => raw.json())
                .then(res => {
                    console.log(res)
                    dispatch("fetch_income")
                    dispatch("fetch_expense")
                })
        }
    },
    modules: {}
})