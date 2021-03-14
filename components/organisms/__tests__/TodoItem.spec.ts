import { shallowMount, Wrapper } from '@vue/test-utils'
import { format } from 'date-fns'
import TodoItem from '../TodoItem.vue'

const propsData = {
  content: 'あいうえお',
  limit: format(new Date(), 'yyyy-MM-dd HH:mm'),
  createdAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
  deleteTodoItem: (documentId: string) => {}
}

describe('TodoItem', () => {
  let dom: Wrapper<TodoItem>
  beforeEach(() => {
    dom = shallowMount(TodoItem, {
      propsData
    })
  })

  it('表示されているテキストが正しいか', () => {
    expect(dom.find('.TodoItem__content').text()).toBe(propsData.content)
  })

  it('期限が表記されているか', () => {
    const text = dom.find('.TodoItem__limit').text()
    expect(text.includes(propsData.limit)).toBeTruthy()
  })

  it('何分前など現在時刻から求めている表記が正しいか', () => {
    /*
     * テストを開始した時刻によって,
     * 若干の差でどちらかの表記になる.
     */
    const text = dom.find('.TodoItem__fromNow').text()
    const isInclude = text.includes('1分未満前') || text.includes('1分前')

    expect(isInclude).toBeTruthy()
  })
})
