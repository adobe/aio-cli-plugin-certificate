import stdout from 'stdout-stderr'

beforeAll(() => stdout.start())
afterAll(() => stdout.stop())

jest.setTimeout(30000)

// dont touch the real fs
jest.mock('fs-extra')
