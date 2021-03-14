<template>
  <div>
    <IndexTemplate
      :user-name="userName"
      :items="items"
      :add-todo-item="addTodoItem"
      :delete-todo-item="deleteTodoItem"
      :logout="logout"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import firebase from '@/plugins/firebase'
import { userStore, todoStore } from '@/store'
import { Item as TodoItemType } from '../types/todo.type'
import IndexTemplate from '../components/templates/Index.vue'

@Component({
  components: {
    IndexTemplate,
  },
})
export default class Index extends Vue {
  userName: string = userStore.userName
  addTodoItem(content: string, limit: string) {
    todoStore.add({ content, limit })
  }

  deleteTodoItem(documentId: string) {
    todoStore.delete(documentId)
  }

  async created() {
    await todoStore.fetch()
  }

  get items(): TodoItemType[] {
    return todoStore.displayItems
  }

  async logout() {
    await firebase.auth().signOut()
    userStore.init()
    this.$router.push('/login')
  }
}
</script>
