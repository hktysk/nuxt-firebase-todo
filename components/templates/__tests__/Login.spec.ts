import { shallowMount, Wrapper } from '@vue/test-utils'
import Login from '../Login.vue'

const commonProps = {
  icon: '',
  onClick: () => {},
}

const propsData = {
  buttons: [
    { ...commonProps, text: 'Google' },
    { ...commonProps, text: 'Github' },
    { ...commonProps, text: 'Twitter' },
  ],
}

describe('ログインページ', () => {
  let dom: Wrapper<Login>
  beforeEach(() => {
    dom = shallowMount(Login, {
      propsData,
    })
  })

  it('ボタンの表示数が正しいか', () => {
    const button = dom.findAll('.Login__button')
    expect(button).toHaveLength(propsData.buttons.length)
  })

  it('ボタンのテキストは正しいか', () => {
    const button = dom.findAll('.Login__button')

    for (let i = 0; i < propsData.buttons.length; i++) {
      const text = button.at(i).text()
      expect(text.includes(propsData.buttons[i].text)).toBeTruthy()
    }
  })
})
