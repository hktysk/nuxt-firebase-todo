import firebase from '@/plugins/firebase'
import { Middleware } from '@nuxt/types'
import { userStore } from '@/store'

const authenticated: Middleware = async ({ route, redirect }) => {
  await new Promise<void>((resolve) => {
    firebase
      .auth()
      .onAuthStateChanged((user) => {
        const isLoginPage = (route.name === 'login')

        if (!user || !user?.email) {
          return isLoginPage ? resolve() : redirect('/login')
        }

        userStore.setUser({
          id: user.uid,
          name: user.displayName ?? '名無しさん',
          email: user.email
        })

        resolve()
      })
  })
}

export default authenticated
