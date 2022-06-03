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

const { Command } = require('@oclif/command')
const fs = require('fs-extra')
const debug = require('debug')('aio-cli-plugin-certificate:fingerprint')

const cert = require('../../certificate')

class FingerprintCommand extends Command {
  async run () {
    const { args } = this.parse(FingerprintCommand)

    if (!fs.existsSync(args.file)) {
      this.error('input file does not exist: ' + args.file)
    }

    try {
      const pemCert = fs.readFileSync(args.file).toString()
      debug('fingerprinting cert from pem: ', pemCert)
      // this will throw if file is not a valid pem content
      const res = cert.fingerprint(pemCert)

      this.log(res.certificateFingerprint)
      return res.certificateFingerprint
    } catch (err) {
      debug('error fingerprinting certificate: ', err)
      this.error(err.message)
    }
  }
}

FingerprintCommand.description = 'Compute the fingerprint of a public key certificate for use with Adobe I/O'

FingerprintCommand.args = [
  {
    name: 'file',
    required: true,
    description: 'file path to certificate to fingerprint'
  }
]

module.exports = FingerprintCommand
