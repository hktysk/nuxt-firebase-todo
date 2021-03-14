<template>
  <div>
    <IndexTemplate :user-name="userName" :add-todo-item="addTodoItem" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { userStore } from '@/store'
import IndexTemplate from '../components/templates/Index.vue'

@Component({
  components: {
    IndexTemplate,
  },
})
export default class Index extends Vue {
  userName: string = userStore.userName

  addTodoItem() {}
}
</script>
