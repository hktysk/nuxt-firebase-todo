<template>
  <div>
    <IndexTemplate
      :user-name="userName"
      :items="items"
      :add-todo-item="addTodoItem"
      :delete-todo-item="deleteTodoItem"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { userStore } from '@/store'
import IndexTemplate from '../components/templates/Index.vue'
import { Item as TodoItemType } from '../types/todo.type'

@Component({
  components: {
    IndexTemplate,
  },
})
export default class Index extends Vue {
  userName: string = userStore.userName

  addTodoItem() {}

  deleteTodoItem() {}

  items: TodoItemType[] = [
    {
      documentId: 'xxxx',
      content: 'あいうえお',
      limit: '2021-03-14',
      createdAt: '2021-03-14',
      updatedAt: '2021-03-14',
    },
  ]
}
</script>
