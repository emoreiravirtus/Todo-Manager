import firebase from "firebase"

const state = {
  tasks: [],
  unsubscriber: null
}

const mutations = {

  setUnsubscriber: (state, unsub) => state.unsubscriber = unsub,

  addTask: (state, task) => {
    let already_in_list = false
    state.tasks.forEach(element => {
      if(element.id == task.id){
        already_in_list = true
      }
  })
  if(!already_in_list){
    state.tasks.push(task)
  }

},

  updateTask: (state, task) => {
    state.tasks = state.tasks.map(element => {
      if(element.id == task.id){
        return task
      }
      else{
        return element
      }
    })
  },
  deleteTask: (state, task) => {
    state.tasks = state.tasks.filter(element => {
      if(element.id != task.id){
        return element
      }
    })
  },
  clear: state => {
    state.tasks = []
    state.unsubscriber = null
  }

}

const getters = {
  tasks: state => state.tasks,
}

const actions = {
  async startListen({
    commit,
    rootState
  }) {
    const db = firebase.firestore()
    const user_id = rootState.user.user.uid
    
    let ref = await db.collection('users').doc(user_id).collection("tasks")

    const unsubscriber = ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const task = change.doc.data()
          task.id = change.doc.id

          if (change.type == "added") {
            commit('addTask', task)
          }
          if (change.type == "modified") {
            commit('updateTask', task)
          }
          if (change.type == "removed") {
            commit('deleteTask', task)
          }
        })
      })
      commit('setUnsubscriber', unsubscriber)
  },
  async sendTask({
    rootState
  }, task) {

    const db = firebase.firestore()
    const user_id = rootState.user.user.uid
    await db.collection('users').doc(user_id).collection('tasks').doc(task.id).set({
        name: task.name,
        description: task.description,
        deadline: task.deadline.toString(),
      })
      .catch(err => {
        return err
      })
  },
  async deleteTask({
    rootState
  }, task) {

    const db = firebase.firestore()
    const user_id = rootState.user.user.uid

    await db.collection('users').doc(user_id).collection('tasks').doc(task.id).delete()
      .catch(err => {
        return err
      })
  },
  async updateTask({
    rootState
  }, task) {

    const db = firebase.firestore()
    const user_id = rootState.user.user.uid

    await db.collection('users').doc(user_id).collection('tasks').doc(task.id).update({
      name: task.name,
      deadline: task.deadline.toString(),
      description: task.description
    })
      .catch(err => {
        return err
      })
  },
  stopListen({commit}){
    if (state.unsubscriber){
      state.unsubscriber()
    } 
    commit('clear')
  }
}

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
}
