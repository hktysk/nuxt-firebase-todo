<template>
  <div class="Login">
    <h1 class="Login__title">
      Welcome to<br />
      SampleTodo
    </h1>

    <div class="Login__main">
      <div
        v-for="button in buttons"
        :key="button.text"
        class="Login__button"
        @click="button.onClick"
      >
        <img class="Login__icon" :src="button.icon" />
        {{ button.text }}

        <span class="material-icons">chevron_right</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Button as LoginButton } from '../../types/login.type'

@Component
export default class Login extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: () => [],
  })
  buttons!: LoginButton[]
}
</script>

<style scoped lang="sass">
.Login
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center

  &__title
    display: block
    font-size: 2.9rem
    line-height: 1.6
    margin-right: 24px

  &__main
    width: 240px
    height: auto

  &__button
    position: relative
    color: gray
    font-size: 1.9rem
    display: flex
    align-items: center
    padding: 8px;
    margin-bottom: 32px

    &:last-child
      margin-bottom: 0

    &:hover
      box-shadow: 0 0 5px 1px #E4E4E4
      cursor: pointer

    img
      width: 28px
      margin-right: 8px

    .material-icons
      position: absolute
      right: 4%
      font-size: 1.8rem
</style>
