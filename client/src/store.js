import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})
//let boardDictionary = {
//   Board: "this.board",
//    boardId: "this.boardId",
//  List:"this.list",
//  listId:"this.listId",
//    Task:"this.task",
//  taskId:"this.taskId",
//  Comment:"this.comment",
// commentId:"this.commentId"
// };

// FUNCTION TO CREATE A DICTIONARY?

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: {},
    tasks: {},
    comments: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, lists) {
      state.lists = lists
    },
    //state.tasks[payload.listId] = payload.tasks
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks)

      // THIS WILL ONLY WORK IF YOU ARE RETURNING ALL TASKS FOR THE BOARD
      // let tasksObj = {}
      // payload.tasks.forEach(task => {
      //   if(!tasksObj[task.listId]){
      //     tasksObj[task.listId]= []
      //   }
      //   tasksObj[task.listId].push(task)
      // });
    },
    //state.comments[payload.taskId] = payload.comments
    setComments(state, payload) {
      Vue.set(state.comments, payload.taskId, payload.comments)
    }
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },

    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },

    //LISTS
    getLists({ commit, dispatch }, boardId) {
      api.get('lists')
        .then(res => {
          commit('setLists', res.data)
        })
    },
    addList({ commit, dispatch }, listData) { //boardData?
      api.post('lists', listData)
        .then(serverList => {
          dispatch('getLists')
        })
    },
    deleteList({ commit, dispatch }, listId) {
      api.delete('lists/' + listId)
        .then(res => {
          dispatch('getLists')
        })
    },
    // TASKS
    getTasks({ commit, dispatch }, listId) {
      api.get('lists/' + listId + '/tasks')
        .then(res => {
          commit('setTasks', { listId, tasks: res.data })
        })
    },
    addTask({ commit, dispatch }, newTask) { //boardData?
      api.post('tasks', newTask)
        .then(res => {
          dispatch('getTasks', newTask.listId)
        })
    },
    editTask({ commit, dispatch }, payload) {
      api.put('tasks/' + payload.taskId, { listId: payload.newListId })
        .then(res => {
          dispatch('getTasks', payload.newListId)
          dispatch('getTasks', payload.oldListId)
        })
    },
    deleteTask({ commit, dispatch }, taskData) {
      api.delete('tasks/' + taskData._id)
        .then(res => {
          dispatch('getTasks', taskData.listId)
        })
    },
    //COMMENTS
    getComments({ commit, dispatch }, taskId) {
      api.get('comments/' + taskId)
        .then(res => {
          commit('setComments', { taskId, comments: res.data })
        })
    },
    addComment({ commit, dispatch }, commentData) { //boardData?
      api.post('comments', commentData)
        .then(res => {
          dispatch('getComments', commentData.taskId)
        })
    },
    deleteComment({ commit, dispatch }, commentData) {
      api.delete('comments/' + commentData._id)
        .then(res => {
          dispatch('getComments', commentData.taskId)
        })
    }
  }
})
