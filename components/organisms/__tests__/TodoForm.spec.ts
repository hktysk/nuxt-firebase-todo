import { shallowMount, Wrapper } from '@vue/test-utils'
import TodoForm from '../TodoForm.vue'

const propsData = {
  addTodoItem: (content: string, limit: string) => {}
}

describe('TodoForm', () => {
  let dom: Wrapper<TodoForm>
  beforeEach(() => {
    dom = shallowMount(TodoForm, {
      propsData
    })
  })

  it('空の値を登録しようとしてアラートメッセージが表示されるか', async () => {
    // 最初はアラートが表示されてないことをテストする
    expect(dom.find('.TodoForm__alert').exists()).toBeFalsy()

    // 空データで登録しようとしてアラートが表示されているか
    const submit = dom.find('.TodoForm__submit')
    await submit.trigger('click')
    expect(dom.find('.TodoForm__alert').exists()).toBeTruthy()
  })
})
