
const { stdout } = require('stdout-stderr')

beforeAll(() => stdout.start())
afterAll(() => stdout.stop())

jest.setTimeout(30000)
