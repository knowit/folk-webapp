import { RAGRepository } from '../repository/rag-repository'
import { ChromaClient } from 'chromadb'

export class ChromaDBRepository extends RAGRepository<string, string> {
  constructor(baseUrl: string, tenant?: string, database?: string) {
    super()
    this.client = new ChromaClient({
      path: baseUrl,
      tenant: tenant,
      database: database,
    })
  }
  client: ChromaClient

  async addCollection(name: string): Promise<Record<string, any>> {
    const collection = this.client.getOrCreateCollection({ name: name })
    return collection
  }

  async getCollection(name: string): Promise<Record<string, any> | null> {
    try {
      const collection = await this.client.getCollection({
        name: name,
        embeddingFunction: null,
      })
      return collection
    } catch {
      return null
    }
  }

  async removeCollection(name: string): Promise<void> {
    return this.client.deleteCollection({ name: name })
  }

  async similaritySearch(
    collection: string,
    embeddings: number[],
    kTop: number,
    threshold?: number,
    filters?: Record<string, any>
  ): Promise<string[]> {
    const retrievedCollection = await this.client.getCollection({
      name: collection,
      embeddingFunction: null,
    })
    let whereClause: Record<string, any>
    if (threshold) {
      whereClause = {
        score: { $gte: threshold },
      }
    }
    const result = await retrievedCollection.query({
      nResults: kTop,
      queryEmbeddings: embeddings,
      whereDocument: filters,
      where: whereClause,
    })

    return result.documents[0]
  }

  async addEmbeddings(
    collection: string,
    ids: string[],
    input: string[],
    embeddings: Array<number[]>,
    metadata?: Record<string, string | number | boolean>[]
  ): Promise<void> {
    const retrievedCollection = await this.client.getOrCreateCollection({
      name: collection,
    })
    return retrievedCollection.add({
      ids: ids,
      embeddings: embeddings,
      metadatas: metadata,
      documents: input,
    })
  }

  async removeEmbeddings(collection: string, ids: string[]): Promise<void> {
    const retrievedCollection = await this.client.getOrCreateCollection({
      name: collection,
    })
    return retrievedCollection.delete({ ids: ids })
  }

  async isRunning(): Promise<boolean> {
    return (await this.client.heartbeat()) > 0
  }

  // TODO: Implement a failsafe to prevent this from wiping all data in production
  async reset(): Promise<boolean> {
    return this.client.reset()
  }
}
