/*
Copyright 2019 Adobe Inc. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

// const { stdout } = require('stdout-stderr')
const TheCommand = require('../../../src/commands/certificate/verify')

const mockFS = require('fs-extra')
const mockForge = require('node-forge')

const distantFuture = new Date()
distantFuture.setFullYear(distantFuture.getFullYear() + 1)
const distantPast = new Date()
distantPast.setFullYear(distantPast.getFullYear() - 1)
const now = Date.now()

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
})

test('description', async () => {
  expect(TheCommand.description).toBeDefined()
})

test('args', async () => {
  const arg = TheCommand.args[0]
  expect(arg.name).toBeDefined()
})

describe('instance methods', () => {
  let command, handleError

  beforeEach(() => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'error')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('run missing args', async () => {
    expect(TheCommand.run).toBeDefined()
    expect(command.run).toBeDefined()
    command.argv = []
    await expect(command.run()).rejects.toThrow(/Missing 1 required arg/)
    command.argv = ['--days=30']
    await expect(command.run()).rejects.toThrow(/Missing 1 required arg/)
  })

  test('run -- input file not found', async () => {
    mockFS.existsSync.mockReturnValue(false)
    command.argv = ['file-not-found']
    await expect(command.run()).rejects.toThrow()
    expect(handleError).toHaveBeenCalledWith(expect.stringMatching(/input file does not exist/))
  })

  test('run with invalid file ( not a pem )', async () => {
    mockFS.existsSync.mockReturnValue(true)
    mockFS.readFileSync.mockReturnValue('not a pem')
    mockForge.pki.certificateFromPem.mockImplementation(() => { throw new Error('Not Verified') })
    command.argv = ['file']
    await expect(command.run()).rejects.toThrow(/Not Verified/)
    expect(handleError).toHaveBeenCalled()
  })

  test('run with invalid file ( false & true )', async () => {
    mockFS.existsSync.mockReturnValue(true)
    mockForge.pki.certificateFromPem.mockReturnValue({ verify: jest.fn(() => true) })
    mockForge.pki.verifyCertificateChain.mockReturnValue(true)
    command.argv = ['file']
    await expect(command.run()).resolves.toBe(true)
    expect(handleError).not.toHaveBeenCalled()
  })

  test('run with invalid file ( true & false )', async () => {
    mockFS.existsSync.mockReturnValue(true)
    mockForge.pki.certificateFromPem.mockReturnValue({ verify: jest.fn(() => true) })
    mockForge.pki.verifyCertificateChain.mockReturnValue(false)
    command.argv = ['file']
    await expect(command.run()).resolves.toBe(false)
    expect(handleError).not.toHaveBeenCalled()
  })

  test('run with valid file (date too late)', async () => {
    mockFS.existsSync.mockReturnValue(true)

    mockForge.pki.certificateFromPem.mockReturnValue({ verify: jest.fn(() => true),
      validity: {
        notAfter: now,
        notBefore: distantPast
      } })
    command.argv = ['file', '--days=12']
    await expect(command.run()).resolves.toBe(false)
    expect(handleError).not.toHaveBeenCalled()
  })

  test('run with valid file (date too early)', async () => {
    mockFS.existsSync.mockReturnValue(true)

    mockForge.pki.certificateFromPem.mockReturnValue({ verify: jest.fn(() => true),
      validity: {
        notAfter: distantFuture,
        notBefore: now
      } })
    command.argv = ['file', '--days=-12']
    await expect(command.run()).resolves.toBe(false)
    expect(handleError).not.toHaveBeenCalled()
  })

  test('run with valid file (date is good and in the future)', async () => {
    mockFS.existsSync.mockReturnValue(true)

    mockForge.pki.certificateFromPem.mockReturnValue({ verify: jest.fn(() => true),
      validity: {
        notAfter: distantFuture,
        notBefore: now
      } })
    command.argv = ['file', '--days=1']
    await expect(command.run()).resolves.toBe(true)
    expect(handleError).not.toHaveBeenCalled()
  })

  test('run with valid file (date is good and in the past)', async () => {
    mockFS.existsSync.mockReturnValue(true)

    mockForge.pki.certificateFromPem.mockReturnValue({ verify: jest.fn(() => true),
      validity: {
        notAfter: now,
        notBefore: distantPast
      } })
    command.argv = ['file', '--days=-1']
    await expect(command.run()).resolves.toBe(true)
    expect(handleError).not.toHaveBeenCalled()
  })

})
