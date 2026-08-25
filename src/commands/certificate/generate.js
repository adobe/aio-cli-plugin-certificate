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
const debug = require('debug')('aio-cli-plugin-certificate:generate')

const cert = require('../../certificate')

class GenerateCommand extends Command {
  async run () {
    const { flags } = await this.parse(GenerateCommand)
    if (fs.existsSync(flags.keyout)) {
      this.error('--keyout file exists: ' + flags.keyout)
    }
    if (fs.existsSync(flags.out)) {
      this.error('--out file exists: ' + flags.out)
    }

    debug('generating certificate with flags', flags)

    const keyPair = cert.generate(flags.name, flags.days, { country: flags.country, state: flags.state, locality: flags.locality, organization: flags.organization, unit: flags.unit })
    fs.writeFileSync(flags.keyout, keyPair.privateKey)
    fs.writeFileSync(flags.out, keyPair.cert)
    this.log('success: generated certificate')
  }
}

GenerateCommand.description = `Generate a new private/public key pair
Generate a self-signed certificate to enable https:// on localhost or signing jwt payloads for interacting with Adobe services.
`

GenerateCommand.flags = {
  keyout: Flags.string({
    description: 'file to send the key to',
    default: 'private.key'
  }),
  out: Flags.string({
    description: 'output file',
    default: 'certificate_pub.crt'
  }),
  name: Flags.string({
    char: 'n',
    description: 'Common Name: typically a host domain name, like www.mysite.com',
    default: 'selfsign.localhost'
  }),
  country: Flags.string({
    char: 'c',
    description: 'Country Name'
  }),
  state: Flags.string({
    char: 's',
    description: 'State or Province'
  }),
  locality: Flags.string({
    char: 'l',
    description: 'Locality, or city name'
  }),
  organization: Flags.string({
    char: 'o',
    description: 'Organization name'
  }),
  unit: Flags.string({
    char: 'u',
    description: 'Organizational unit or department'
  }),
  days: Flags.integer({
    description: 'Number of days the certificate should be valid for. (Max 365)',
    default: 365
  })
}

module.exports = GenerateCommand
