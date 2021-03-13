import {
  Module,
  VuexModule,
  Mutation,
  Action
} from 'vuex-module-decorators'

export type User = {
  id: string
  name: string
  email: string
}

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class UserModule extends VuexModule {
  user: User | null = null

  @Mutation
  private set(data: User | null) {
    this.user = data
  }

  @Action({ rawError: true })
  public setUser({ id, name, email }: User) {
    this.set({ id, name, email })
  }

  @Action({ rawError: true })
  public init() {
    this.set(null)
  }

  get userId(): string {
    return this.user?.id ?? ''
  }

  get userName(): string {
    return this?.user?.name ?? ''
  }
}
