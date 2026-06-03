import { vi } from 'vitest'
import TheCommand from '../../../src/commands/certificate/index.js'
import { Help } from '@oclif/core'

describe('index', () => {
  let showHelpSpy

  beforeEach(() => {
    showHelpSpy = vi.spyOn(Help.prototype, 'showHelp').mockResolvedValue(undefined)
  })

  afterEach(() => {
    showHelpSpy.mockRestore()
  })

  test('description', async () => {
    expect(TheCommand.description).toEqual('Generate, fingerprint, or verify a certificate for use with Adobe I/O')
  })

  test('run Help command', async () => {
    const command = new TheCommand([], { runHook: vi.fn().mockResolvedValue({ successes: [], failures: [] }) })
    await command.run()
    expect(showHelpSpy).toHaveBeenCalledWith(['certificate', '--help'])
  })
})
