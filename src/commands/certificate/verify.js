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

const { Command, Flags } = require('@oclif/core')
const fs = require('fs-extra')
const debug = require('debug')('aio-cli-plugin-certificate:verify')

const cert = require('../../certificate')

class VerifyCommand extends Command {
  async run () {
    const { flags, args } = await this.parse(VerifyCommand)

    if (!fs.existsSync(args.file)) {
      this.error('input file does not exist: ' + args.file)
    }

    try {
      const pemCert = fs.readFileSync(args.file).toString()
      debug('verifying cert from pem: ', pemCert)
      // this will throw if file is not a valid pem content
      const res = cert.verify(pemCert)

      if (flags.days) {
        const dateToCheck = new Date()
        const dayString = (Math.abs(flags.days) === 1) ? 'day' : 'days'
        dateToCheck.setDate(dateToCheck.getDate() + flags.days)

        if (res.validUntil > dateToCheck && res.validSince < dateToCheck) {
          if (flags.days >= 0) {
            this.log(`certificate will be valid in ${flags.days} ${dayString}`)
          } else {
            this.log(`certificate was valid ${-flags.days} ${dayString} ago`)
          }
          return true
        }
        if (flags.days >= 0) {
          this.log(`certificate will NOT be valid in ${flags.days} ${dayString}`)
        } else {
          this.log(`certificate was NOT valid ${-flags.days} ${dayString} ago`)
        }
        return false
      }

      this.log((res.verified) ? 'Verified' : 'Not Verified')
      return res.verified
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
  days: Flags.integer({
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
