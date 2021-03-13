<template>
  <div>
    <LoginTemplate :buttons="buttons" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Button as LoginButton } from '../types/login.type'
import LoginTemplate from '../components/templates/Login.vue'

@Component({
  components: {
    LoginTemplate,
  },
})
export default class Login extends Vue {
  get buttons(): LoginButton[] {
    return [
      {
        icon: require('@/assets/img/sns-icons/google.png'),
        text: 'Google',
        onClick: () => {},
      },
      {
        icon: require('@/assets/img/sns-icons/github.png'),
        text: 'Github',
        onClick: () => {},
      },
      {
        icon: require('@/assets/img/sns-icons/twitter.png'),
        text: 'Twitter',
        onClick: () => {},
      },
    ]
  }
}
</script>
