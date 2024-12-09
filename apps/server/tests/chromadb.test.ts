import { ChromaDBRepository } from '../implementations/chroma-rag-repository-impl'

let chromaDB: ChromaDBRepository

beforeAll(() => {
  chromaDB = new ChromaDBRepository('http://localhost:8000')
})

afterAll(async () => {
  await chromaDB.reset()
})

test('Test running ChromaDB database up and running', async () => {
  expect(await chromaDB.isRunning())
})

test('Test that adding data works along with similarity search', async () => {
  await chromaDB.addEmbeddings(
    'test',
    ['1', '2'],
    ['test', 'hopp'],
    [
      [0.1, 0.2, 0.3],
      [0.7, 0.8, 0.9],
    ]
  )
  const result = await chromaDB.similaritySearch('test', [0.1, 0.2, 0.3], 1)
  expect(result[0] == 'test')

  const result2 = await chromaDB.similaritySearch('test', [0.7, 0.8, 0.9], 1)
  expect(result2[0] == 'hopp')
})

test('Test that removal of embeddings works as intended', async () => {
  await chromaDB.addEmbeddings(
    'test',
    ['1', '2'],
    ['test', 'hopp'],
    [
      [0.1, 0.2, 0.3],
      [0.7, 0.8, 0.9],
    ]
  )
  // Expect that the most similar is found
  const result = await chromaDB.similaritySearch('test', [0.1, 0.2, 0.3], 1)
  expect(result[0] == 'test')
  await chromaDB.removeEmbeddings('test', ['1'])
  // Expect that after the most similar is removed, the other one shows up
  const after = await chromaDB.similaritySearch('test', [0.1, 0.2, 0.3], 1)
  expect(after[0] == 'hopp')
})

test('Adding a collection works as intended', async () => {
  expect((await chromaDB.getCollection('test')) == null)
  const added = await chromaDB.addCollection('test')
  expect(added['name'] == 'test')
  expect((await chromaDB.getCollection('test')) != null)
})

test('Removing a collection works as intended', async () => {
  await chromaDB.addCollection('test')
  expect((await chromaDB.getCollection('test')) != null)
  await chromaDB.removeCollection('test')
  expect((await chromaDB.getCollection('test')) == null)
})
