<template>
  <div class="TodoForm">
    <div class="TodoForm__limit">
      <datetime v-model="limit" type="datetime" input-id="limitDate">
        <label slot="before" for="limitDate">
          <span class="material-icons">date_range</span>
          期限を設定する
        </label>
      </datetime>

      <!-- 期限を設定していない場合(アラートメッセージ) -->
      <div v-if="isShowLimitAlertMessage" class="TodoForm__alert">
        期限を設定してください
      </div>
    </div>

    <div class="TodoForm__textarea">
      <h4>タスクの内容</h4>
      <textarea v-model="content" />

      <!-- タスクが空文字の場合(アラートメッセージ) -->
      <div v-if="isShowContentAlertMessage" class="TodoForm__alert">
        タスクを入力してください
      </div>
    </div>

    <div class="TodoForm__submit" @click="addTodo">
      <span class="material-icons">add_circle</span>
      追加する
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { format } from 'date-fns'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

@Component({
  components: {
    datetime: Datetime,
  },
})
export default class TodoForm extends Vue {
  @Prop({
    type: Function,
    required: true,
    default: () => {},
  })
  addTodoItem!: (content: string, limit: string) => void

  addTodo() {
    if (this.limit === '') {
      this.isShowLimitAlertMessage = true
      return
    }

    if (this.content === '') {
      this.isShowContentAlertMessage = true
      return
    }

    const limit = format(new Date(this.limit), 'yyyy-MM-dd HH:mm')
    this.addTodoItem(this.content, limit)

    this.content = ''
    this.limit = ''
    this.isShowLimitAlertMessage = false
    this.isShowContentAlertMessage = false
  }

  @Watch('limit')
  onChangeLimit() {
    if (!this.isShowLimitAlertMessage) return

    this.isShowLimitAlertMessage = false
  }

  @Watch('content')
  onChangeContent() {
    if (!this.isShowContentAlertMessage) return

    this.isShowContentAlertMessage = false
  }

  content: string = ''
  limit: string = ''
  isShowLimitAlertMessage: boolean = false
  isShowContentAlertMessage: boolean = false
}
</script>

<style lang="sass">
/*
 * vue-datetimeが生成する要素にCSSが適用されないので,
 * このコンポーネントはscopedをつけません.
 */
.TodoForm

  &__limit
    label
      font-size: 1.6rem
      display: flex
      align-items: center
      margin-bottom: 8px

      .material-icons
        font-size: 2rem
        margin-right: 4px

    input
      display: block
      font-size: 1.4rem
      white-space: nowrap
      background-color: #EAEAEA
      border: none
      padding: 6px

  &__textarea
    margin: 16px 0

    h4
      font-size: 1.6rem
      font-weight: normal
      padding: 0
      margin: 0
      margin-bottom: 4px

    textarea
      width: 500px
      height: 100px
      font-size: 1.8rem
      background-color: #EAEAEA
      padding: 8px
      box-sizing: border-box
      border: none
      outline: none
      resize: none

  &__alert
    color: crimson
    font-size: 1.4rem
    margin: 8px 0

  &__submit
    width: 80px
    color: #313131
    font-size: 1.4rem
    border: 1px #797979 solid
    display: flex
    justify-content: center
    align-items: center
    padding: 6px
    margin-right: 16px
    margin-bottom: 24px
    cursor: pointer

    .material-icons
      font-size: 1.6rem
      margin-right: 4px
</style>
