<template>
  <div>
    <LoginTemplate :buttons="buttons" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import firebase from '@/plugins/firebase'
import { userStore } from '@/store'
import { Button as LoginButton } from '../types/login.type'
import LoginTemplate from '../components/templates/Login.vue'

const {
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
} = firebase.auth

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
        onClick: this.auth(new GoogleAuthProvider()),
      },
      {
        icon: require('@/assets/img/sns-icons/github.png'),
        text: 'Github',
        onClick: this.auth(new GithubAuthProvider()),
      },
      {
        icon: require('@/assets/img/sns-icons/twitter.png'),
        text: 'Twitter',
        onClick: this.auth(new TwitterAuthProvider()),
      },
    ]
  }

  asyncData({ redirect }: Context) {
    if (userStore.userId) redirect('/')
  }

  auth(provider: firebase.auth.AuthProvider) {
    return () => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          // Todoアプリへ移動する
          this.$router.push('/')
        })
        .catch(() => {
          alert('認証失敗しました')
        })
    }
  }
}
</script>
