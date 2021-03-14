import { shallowMount, Wrapper } from '@vue/test-utils'
import Index from '../Index.vue'

const propsData = {
  userName: '孤軍奮闘',
  items: [],
  addTodoItem: (content: string, limit: string) => {},
  deleteTodoItem: (documentId: string) => {},
  logout: () => {}
}

describe('Todoトップページ', () => {
  let dom: Wrapper<Index>
  beforeEach(() => {
    dom = shallowMount(Index, {
      propsData
    })
  })

  it('ログアウトボタンが表示されているか', () => {
    expect(dom.find('.Index__logout').exists()).toBeTruthy()
  })

  it('ユーザー名が表記されているか', () => {
    const text = dom.find('.Index__title').text()
    expect(text.includes(propsData.userName)).toBeTruthy()
  })
})
