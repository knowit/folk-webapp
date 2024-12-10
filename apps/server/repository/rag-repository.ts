// A basic RAG contract to quickly iterate on different RAG systems
export abstract class RAGRepository<INPUT, OUTPUT> {
  // Adds a collection with given name. If it already exists, nothing will happen
  abstract addCollection(name: string): Promise<Record<string, any>>

  // Removes a collection with given name
  abstract removeCollection(name: string): Promise<void>

  // Returns a collection with a given name. If it does not exist, null is returned
  abstract getCollection(name: string): Promise<Record<string, any> | null>

  /*
  Fetches a set of values from a vector storage based on given embeddings
  Args:
    collection (string): data set to retrieve from
    embeddings (number[]): the embeddings to compare against. Text must be embedded before searching using LLMClient
    kTop (number): The number of results to return
    threshold (number): Optional - a value to set on how similar result needs to be to be included. Below and it will be excluded if used
    filters (Record<string, any>): Optional - if you need some way to filter the results, this can be used
  Returns:
    A list of OUTPUT objects ordered from most relevant to least or empty if no matching is found
  */
  abstract similaritySearch(
    collection: string,
    embeddings: number[],
    kTop: number,
    threshold?: number,
    filters?: Record<string, any>
  ): Promise<OUTPUT[]>

  /*
  Adds data to a given collection with its embedding
  Args:
    collection (string): data set to add embeddings to
    ids (string[]): list of strings for inputs
    input (INPUT[]): A list of objects to add
    embedding (Array<number[]>): The corresponding embedding array for each input
    metadata (Record<string, string | number | boolean>[]): Possible metadata connected to each data added
  */
  abstract addEmbeddings(
    collection: string,
    ids: string[],
    input: INPUT[],
    embeddings: Array<number[]>,
    metadata?: Record<string, string | number | boolean>[]
  ): Promise<void>

  /*
  Removes data from a given collection based on a set of ids
  Args:
    collection (string): data set to remove from
    ids (string[]): The ids of the objects to remove
  */
  abstract removeEmbeddings(collection: string, ids: string[]): Promise<void>

  // Check to see if vector storage is running/available
  abstract isRunning(): Promise<boolean>

  // Lets you clear the entire vector storage. Use with care
  abstract reset(): Promise<boolean>
}
