import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import user from '~/store/user'
import todo from '~/store/todo'

let userStore: user
let todoStore: todo

function initialiseStores(store: Store<any>): void {
  userStore = getModule(user, store)
  todoStore = getModule(todo, store)
}

export { initialiseStores, userStore, todoStore }
