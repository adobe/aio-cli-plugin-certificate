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
const fs = require('fs-extra')
const debug = require('debug')('aio-cli-plugin-certificate:verify')
const forge = require('node-forge')
const pki = forge.pki

class VerifyCommand extends Command {
  async run () {
    const { flags, args } = this.parse(VerifyCommand)

    if (!fs.existsSync(args.file)) {
      this.error('input file does not exist: ' + flags.file)
    }

    try {
      // this will throw if file is not a valid pem
      const cert = pki.certificateFromPem(fs.readFileSync(args.file))
      // this following check does not seem to catch expired certificates
      /* const isVerified = */
      cert.verify(cert)
      if (flags.days) {
        const dateToCheck = new Date()
        dateToCheck.setDate(dateToCheck.getDate() + flags.days)
        if (cert.validity.notAfter > dateToCheck && cert.validity.notBefore < dateToCheck) {
          this.log(`certificate ${flags.days >= 0 ? 'will still be' : 'was'} valid in ${flags.days} days`)
          return true
        } else {
          this.log(`certificate ${flags.days >= 0 ? 'will NOT be' : 'was NOT'} valid in ${flags.days} days`)
          return false
        }
      } else {
        const caStore = pki.createCaStore([ cert ])
        const isPkiVerified = pki.verifyCertificateChain(caStore, [ cert ])
        debug('verifying certFromPem: ', cert)
        this.log((isPkiVerified) ? 'Verified' : 'Not Verified')
        return isPkiVerified
      }
    } catch (err) {
      debug('error verifying certificate: ', err)
      this.error(err.message)
    }
  }
}

VerifyCommand.description = `Verify a certificate for use with Adobe I/O
Verifies that the certificate is valid, and/or will not expire in [--days] days from now.
`

VerifyCommand.flags = {
  days: flags.integer({
    description: '+- is certificate valid in --days'
  })
}

VerifyCommand.args = [
  {
    name: 'file',
    required: true,
    description: 'file path to certificate to verify'
  }
]

module.exports = VerifyCommand
