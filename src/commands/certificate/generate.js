/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { Command, flags } = require('@oclif/command')
const forge = require('node-forge')
const pki = forge.pki

function generateCertificate (commonName, countryName, stateName, cityName, orgName, orgUnit) {
  // generate a keypair or use one you have already
  const keys = pki.rsa.generateKeyPair(2048)
  // create a new certificate
  const cert = pki.createCertificate()

  // fill the required fields
  cert.publicKey = keys.publicKey
  cert.serialNumber = '01'
  cert.validity.notBefore = new Date()
  cert.validity.notAfter = new Date()
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1)

  // use your own attributes here, or supply a csr (check the docs)
  const attrs = [{
    name: 'commonName',
    value: commonName
  }, {
    name: 'countryName',
    value: countryName
  }, {
    shortName: 'ST',
    value: stateName
  }, {
    name: 'localityName',
    value: cityName
  }, {
    name: 'organizationName',
    value: orgName
  }, {
    shortName: 'OU',
    value: orgUnit
  }]

  // here we set subject and issuer as the same one
  cert.setSubject(attrs)
  cert.setIssuer(attrs)

  // the actual certificate signing
  cert.sign(keys.privateKey)

  const pk = pki.privateKeyToPem(keys.privateKey)

  // var asn1Cert = pki.certificateToAsn1(cert)

  // now convert the Forge certificate to PEM format
  const pemCert = pki.certificateToPem(cert)
  return {
    privateKey: pk,
    cert: pemCert
  }
}

class GenerateCommand extends Command {
  async run () {
    const { flags } = this.parse(GenerateCommand)
    const name = flags.name || 'world'
    generateCertificate()
    this.log(`hello ${name} from /Repos/adobe/aio-cli-repos/aio-cli-plugin-certificate/src/commands/certificate/generate.js`)
  }
}

GenerateCommand.description = `Generate a new private/public key pair
...
Extra documentation goes here
`

GenerateCommand.flags = {
  name: flags.string({ char: 'n', description: 'name to print' })
}

module.exports = GenerateCommand
