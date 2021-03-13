<template>
  <div>
    Index Page<br />
    {{ userId }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { userStore } from '@/store'

@Component
export default class Login extends Vue {
  get userId() {
    return userStore.userId
  }
}
</script>
