import { stdout } from 'stdout-stderr'
import { beforeAll, afterAll, vi } from 'vitest'

beforeAll(() => stdout.start())
afterAll(() => stdout.stop())

// dont touch the real fs
vi.mock('fs-extra')
