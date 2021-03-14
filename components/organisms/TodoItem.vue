<template>
  <div class="TodoItem">
    <div class="TodoItem__fromNow">{{ fromNow }}前</div>

    <div>
      <div v-if="isOverLimit" class="TodoItem__limit TodoItem__limit--over">
        期限: {{ formatLimit }} - 終了
      </div>

      <div v-else class="TodoItem__limit">
        期限: {{ formatLimit }} - {{ remainderTime }}
      </div>

      <div class="TodoItem__content">{{ content }}</div>

      <div class="TodoItem__delete" @click="deleteTodoItem">
        <span class="material-icons">delete</span>
        予定を削除する
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { format, formatDistanceToNow, isAfter } from 'date-fns'
import { ja } from 'date-fns/locale'

@Component
export default class TodoItem extends Vue {
  @Prop({
    type: String,
    required: true,
    default: '',
  })
  content!: string

  @Prop({
    type: String,
    required: true,
    default: '',
  })
  limit!: string

  @Prop({
    type: String,
    required: true,
    default: '',
  })
  createdAt!: string

  @Prop({
    type: Function,
    required: true,
    default: () => {},
  })
  deleteTodoItem!: () => void

  get formatLimit() {
    return format(new Date(this.limit), 'yyyy-MM-dd HH:mm')
  }

  get fromNow() {
    const fromNow: string = formatDistanceToNow(new Date(this.createdAt), {
      locale: ja,
    })

    // '約'という先頭の文字を消して返却する
    return fromNow.replace('約', '')
  }

  get isOverLimit() {
    const limit = new Date(this.limit)
    return isAfter(new Date(), limit)
  }

  get remainderTime() {
    const limit = new Date(this.limit)
    return 'あと' + formatDistanceToNow(limit, { locale: ja })
  }
}
</script>

<style scoped lang="sass">
.TodoItem
  display: flex
  align-items: center

  &__fromNow
    color: #3A3A3A
    width: 80px
    font-size: 1.6rem
    text-align: right
    margin-right: 16px

  &__limit
    color: #101010
    font-size: 1.2rem
    border-left: 4px #72A2BD solid
    padding: 4px
    margin-bottom: 8px

    &--over
      border-left-color: crimson

  &__content
    font-size: 1.8rem
    white-space: pre-wrap
    word-wrap: break-word

  &__delete
    color: #404040
    font-size: 1.1rem
    margin-top: 8px
    display: flex
    align-items: center
    cursor: pointer

    .material-icons
      font-size: 1.6rem
</style>
