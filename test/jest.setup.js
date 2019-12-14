const { stdout } = require('stdout-stderr')

beforeAll(() => stdout.start())
afterAll(() => stdout.stop())

jest.setTimeout(30000)

// dont touch the real fs
jest.mock('fs-extra')
jest.mock('node-forge')