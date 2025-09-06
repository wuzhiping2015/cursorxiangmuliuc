import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 用户信息
        userInfo: null,
        // 习惯列表
        habits: [],
        // 主题设置
        theme: 'light',
        // 通知设置
        notifications: {
            enabled: true,
            sound: true,
            vibrate: true
        }
    },
    mutations: {
        // 设置用户信息
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo
        },
        // 设置习惯列表
        SET_HABITS(state, habits) {
            state.habits = habits
        },
        // 添加新习惯
        ADD_HABIT(state, habit) {
            state.habits.push(habit)
        },
        // 更新习惯
        UPDATE_HABIT(state, { index, habit }) {
            state.habits.splice(index, 1, habit)
        },
        // 删除习惯
        DELETE_HABIT(state, index) {
            state.habits.splice(index, 1)
        },
        // 设置主题
        SET_THEME(state, theme) {
            state.theme = theme
        },
        // 更新通知设置
        UPDATE_NOTIFICATIONS(state, settings) {
            state.notifications = {...state.notifications, ...settings }
        }
    },
    actions: {
        // 登录
        async login({ commit }, credentials) {
            try {
                // TODO: 实现登录逻辑
                const userInfo = { /* 用户信息 */ }
                commit('SET_USER_INFO', userInfo)
                return userInfo
            } catch (error) {
                throw error
            }
        },
        // 登出
        async logout({ commit }) {
            try {
                // TODO: 实现登出逻辑
                commit('SET_USER_INFO', null)
            } catch (error) {
                throw error
            }
        },
        // 获取习惯列表
        async fetchHabits({ commit }) {
            try {
                // TODO: 从API获取习惯列表
                const habits = []
                commit('SET_HABITS', habits)
                return habits
            } catch (error) {
                throw error
            }
        },
        // 创建新习惯
        async createHabit({ commit }, habitData) {
            try {
                // TODO: 调用API创建习惯
                commit('ADD_HABIT', habitData)
                return habitData
            } catch (error) {
                throw error
            }
        },
        // 更新习惯
        async updateHabit({ commit, state }, { habitId, habitData }) {
            try {
                // TODO: 调用API更新习惯
                const index = state.habits.findIndex(h => h.id === habitId)
                if (index !== -1) {
                    commit('UPDATE_HABIT', { index, habit: habitData })
                }
                return habitData
            } catch (error) {
                throw error
            }
        },
        // 删除习惯
        async deleteHabit({ commit, state }, habitId) {
            try {
                // TODO: 调用API删除习惯
                const index = state.habits.findIndex(h => h.id === habitId)
                if (index !== -1) {
                    commit('DELETE_HABIT', index)
                }
            } catch (error) {
                throw error
            }
        }
    },
    getters: {
        // 获取用户信息
        userInfo: state => state.userInfo,
        // 获取习惯列表
        habits: state => state.habits,
        // 获取今日待完成的习惯
        todayHabits: state => {
            const today = new Date()
            return state.habits.filter(habit => {
                // TODO: 实现今日习惯的筛选逻辑
                return true
            })
        },
        // 获取主题设置
        theme: state => state.theme,
        // 获取通知设置
        notifications: state => state.notifications
    }
})