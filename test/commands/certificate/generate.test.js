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
const TheCommand = require('../../../src/commands/certificate/generate')

const mockFS = require('fs-extra')
const forge = require('node-forge')

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
})

test('description', async () => {
  expect(TheCommand.description).toBeDefined()
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

  test('run -- no flags', async () => {
    mockFS.existsSync.mockReturnValue(false)
    expect(TheCommand.run).toBeDefined()
    expect(command.run).toBeDefined()
    command.argv = []
    await command.run()
    expect(mockFS.existsSync).toHaveBeenCalledTimes(2)
    expect(mockFS.writeFileSync).toHaveBeenCalledTimes(2)
  })

  test('run -- all flags', async () => {
    mockFS.existsSync.mockReturnValue(false)
    expect(TheCommand.run).toBeDefined()
    expect(command.run).toBeDefined()
    command.argv = ['-n=a', '-c=b', '-s=c', '-l=d', '-u=e', '-o=f']
    await command.run()
    expect(mockFS.existsSync).toHaveBeenCalledTimes(2)
    expect(mockFS.writeFileSync).toHaveBeenCalledTimes(2)
  })

  test('run: has subject alt names', async () => {
    mockFS.existsSync.mockReturnValue(false)
    command.argv = ['-n=localhost', '-o=cert']
    await command.run()
    expect(mockFS.writeFileSync).toHaveBeenCalledTimes(2)
    const certSave = mockFS.writeFileSync.mock.calls.find(theCall => theCall[0] === 'certificate_pub.crt')
    expect(certSave).toBeTruthy()
    const pem = certSave[1]
    const cert = forge.pki.certificateFromPem(pem)
    const altnames = cert.getExtension('subjectAltName')
    expect(altnames).toHaveProperty('altNames', expect.arrayContaining([{
      type: 2, // DNS
      value: 'localhost'
    }]))
  })

  // throw error '--keyout file exists: ...'
  test('run : throw error --keyout exists', async () => {
    mockFS.existsSync.mockReturnValue(true)
    command.argv = []
    await expect(command.run())
      .rejects.toThrow(/--keyout file exists:/)
    expect(handleError).toHaveBeenCalledWith(expect.stringMatching(/--keyout file exists:/))
    expect(mockFS.writeFileSync).not.toHaveBeenCalled()
  })

  // throw error '--out file exists: ...'
  test('run : throw error --out exists', async () => {
    mockFS.existsSync.mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
    command.argv = []
    await expect(command.run())
      .rejects.toThrow(/--out file exists:/)
    expect(handleError).toHaveBeenCalledWith(expect.stringMatching(/--out file exists:/))
    expect(mockFS.existsSync).toHaveBeenCalledTimes(2)
    expect(mockFS.writeFileSync).not.toHaveBeenCalled()
  })
})
