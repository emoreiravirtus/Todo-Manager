import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import User from './modules/user'
import Task from './modules/task'

export const store = new Vuex.Store({
    modules: {
        user: User,
        task: Task
    }
})