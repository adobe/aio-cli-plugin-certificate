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
const commandPath = '../../../src/commands/certificate/fingerprint'
let TheCommand
jest.isolateModules(() => {
  TheCommand = require(commandPath)
})

const validCertPem = `
  -----BEGIN CERTIFICATE-----
MIIDMTCCAhmgAwIBAgIHAWVCcDJVYDANBgkqhkiG9w0BAQsFADAdMRswGQYDVQQD
ExJHZW5lcmF0ZWQgS2V5IFBhaXIwHhcNMjIwNjAzMTUzMjA1WhcNMjMwNjAzMTUz
MjA1WjAdMRswGQYDVQQDExJHZW5lcmF0ZWQgS2V5IFBhaXIwggEiMA0GCSqGSIb3
DQEBAQUAA4IBDwAwggEKAoIBAQC7vbn/WhI16mKvcYuox+NXOmlcXkieHZL2N6po
2f0Dv4WmtYNHxMbLzsP7zGeKm4DRGSs4Qwnk/NsD7KA9pILmT8aXHVfxrJhCawuz
WTUNjfp8sWGCjhOSHemN9BBo5TP4+Ht/xqE9ANG9mjHhaRUQVa8BAivDDibgC2cs
8AoA5JlDA515ShhnWFLG6wL3IObVzJIJip4chrh26r5La6l76D++LztSnDgYvfzY
J3iCdxaMh/507IVpqc5Vl4pfY5Kp9yF91Z7tD1OTyEpps9ySGiN+rHBJfvixdKUI
gLm5VkeR3hpl7g8+NJSlxo4e/9znQ45OytZHdLk/pVkEkUxXAgMBAAGjdjB0MAkG
A1UdEwQCMAAwCwYDVR0PBAQDAgL0MDsGA1UdJQQ0MDIGCCsGAQUFBwMBBggrBgEF
BQcDAgYIKwYBBQUHAwMGCCsGAQUFBwMEBggrBgEFBQcDCDAdBgNVHREEFjAUghJH
ZW5lcmF0ZWQgS2V5IFBhaXIwDQYJKoZIhvcNAQELBQADggEBAGdiHZP/SA/8ejgE
1ZbRmvRJMhYz17K5KzB/3wujhRKl2OBKjnv3PVk15Pc6IHabkPKV0PtUKXPfxSci
mwj+3s2R3pRW4S6OhpNYg5/3caPGWXIVmQWJQqo1LdEnD2tpblghVRiha25QBnsi
0wk7l9ebV683A+n6u0Xn9fjFnlT+j7lG36px03z1K+dOQj0+j0yrda9SUSBCYcJj
4+PE1kwOSDRpAnb7mO5BOoSR/x67bQU5kcKcE8kVIijWmuxoyQn6LQEZzKP5LT4F
6DZssT8ZOJuWr7d+BUapoVO1D5o4CrFwYjsHss77tgybTMXQjKsPnkhns8M8RxqW
B9+DCYg=
-----END CERTIFICATE-----
`
const validCertFingerprint = '38f65e26bd3869ec3ca029cc0b3df98de29172b9'

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

describe('instance methods - mock forge', () => {
  let CommandUnderTest, command, handleError, mockFS, mockForge
  jest.isolateModules(() => {
    CommandUnderTest = require(commandPath)
    mockFS = require('fs-extra')
    mockForge = require('node-forge')
    jest.mock('node-forge')
  })

  beforeEach(() => {
    command = new CommandUnderTest([])
    handleError = jest.spyOn(command, 'error')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('run missing args', async () => {
    expect(command.run).toBeDefined()
    command.argv = []
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
})

describe('instance methods - real forge', () => {
  let CommandUnderTest, command, handleError, mockFS
  jest.isolateModules(() => {
    mockFS = require('fs-extra')
    jest.unmock('node-forge')
    CommandUnderTest = require(commandPath)
  })

  beforeEach(() => {
    command = new CommandUnderTest([])
    handleError = jest.spyOn(command, 'error')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('run with valid cert pem', async () => {
    mockFS.existsSync.mockReturnValue(true)
    mockFS.readFileSync.mockReturnValue(Buffer.from(validCertPem))
    command.argv = ['file']
    await expect(command.run()).resolves.toBe(validCertFingerprint)
    expect(handleError).not.toHaveBeenCalled()
  })
})
