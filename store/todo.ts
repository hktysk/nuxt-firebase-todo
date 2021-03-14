import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { format } from 'date-fns'
import firebase from '@/plugins/firebase'
import { userStore } from '@/store'
import { Item as TodoItem } from '../types/todo.type'

type Timestamp = firebase.firestore.Timestamp

type TodoDocument = {
  user_id: string
  content: string
  limit: string
  created_at: Timestamp
  updated_at: Timestamp
}

type DocItem = {
  documentId: string
} & TodoDocument

export type AddTodoItemArg = {
  content: string
  limit: string
}

const todoCollection = firebase.firestore().collection('todo')

@Module({
  name: 'todo',
  stateFactory: true,
  namespaced: true,
})
export default class TodoModule extends VuexModule {
  private docItems: DocItem[] = []

  @Mutation
  private set(docItems: DocItem[]) {
    this.docItems = docItems
  }

  @Action({ rawError: true })
  public async fetch() {
    const data = await todoCollection
      .where('user_id', '==', userStore.userId)
      .orderBy('created_at', 'desc')
      .get()

    const items: DocItem[] = data.docs.map((snapshot) => {
      const documentId = snapshot.id

      return {
        documentId,
        ...(snapshot.data() as TodoDocument),
      }
    })

    this.set(items)
  }

  @Action({ rawError: true })
  public async add({ content, limit }: AddTodoItemArg) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp() as Timestamp

    const data: TodoDocument = {
      user_id: userStore.userId,
      content,
      limit,
      created_at: timestamp,
      updated_at: timestamp,
    }

    await todoCollection.add(data)
    this.fetch()
  }

  @Action({ rawError: true })
  public async delete(documentId: string) {
    await todoCollection.doc(documentId).delete()

    this.fetch()
  }

  get displayItems(): TodoItem[] {
    return this.docItems.map((row) => {
      // 日付を文字列に整える
      const datetime = 'yyyy-MM-dd HH:mm:ss'
      const createdAt = format(new Date(row.created_at.toDate()), datetime)
      const updatedAt = format(new Date(row.updated_at.toDate()), datetime)

      return {
        documentId: row.documentId,
        content: row.content,
        limit: row.limit,
        createdAt,
        updatedAt,
      }
    })
  }
}
