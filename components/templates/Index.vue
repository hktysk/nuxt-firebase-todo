<template>
  <div class="Index">
    <header class="Index__header">
      <input type="text" class="Index__search" placeholder="アイテム検索" />
    </header>

    <main class="Index__main">
      <div class="Index__title">
        {{ userName }}のTodoアプリ

        <div class="Index__logout">ログアウト</div>
      </div>

      <div class="Index__todoBody">
        <!-- Todoを登録するフォーム -->
        <div class="Index__form">
          <TodoForm :add-todo-item="addTodoItem" />
        </div>

        <!-- Todoに登録したアイテムの表示 -->
        <div class="Index__items">
          <div
            v-for="(item, index) in items"
            :key="`${item.content}-${index}`"
            class="Index__item"
          >
            <TodoItem
              :content="item.content"
              :limit="item.limit"
              :created-at="item.createdAt"
              :delete-todo-item="() => deleteTodoItem(item.documentId)"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Item as TodoItemType } from '../../types/todo.type'
import TodoForm from '../organisms/TodoForm.vue'
import TodoItem from '../organisms/TodoItem.vue'

@Component({
  components: {
    TodoForm,
    TodoItem,
  },
})
export default class Index extends Vue {
  @Prop({
    type: String,
    required: true,
    default: '',
  })
  userName!: string

  @Prop({
    type: Array,
    required: true,
    default: () => [],
  })
  items!: TodoItemType[]

  @Prop({
    type: Function,
    required: true,
    default: () => {},
  })
  addTodoItem!: (content: string, limit: string) => void

  @Prop({
    type: Function,
    required: true,
    default: () => {},
  })
  deleteTodoItem!: (documentId: string) => void
}
</script>

<style scoped lang="sass">
.Index

  $contentWidth: 900px

  &__header
    width: 100%
    height: 48px
    background-color: #313131
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 24px

  &__search
    width: $contentWidth
    height: 70%
    color: white
    font-size: 1.8rem
    background-color: #4C4C4C
    border: none
    border-radius: 0
    outline: none
    padding: 8px
    box-sizing: border-box


    &::placeholder
      color: #383838
      transform: translateY(-12%)

  &__main
    width: $contentWidth
    margin: 0 auto

  &__title
    position: relative
    font-size: 1.6rem
    border-bottom: 1px #B9B9B9 dashed
    display: flex
    align-items: center
    padding-bottom: 12px
    margin-bottom: 24px

  &__logout
    position: absolute
    right: 0
    color: #9E9E9E
    font-size: 1.4rem
    cursor: pointer

  &__todoBody
    display: flex

  &__form
    width: 60%
    margin: 16px 0

  &__items
    width: 40%

  &__item
    margin-bottom: 24px
</style>
