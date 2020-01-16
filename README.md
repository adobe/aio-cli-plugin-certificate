[![Version](https://img.shields.io/npm/v/@adobe/aio-cli-plugin-certificate.svg)](https://npmjs.org/package/@adobe/aio-cli-plugin-certificate)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aio-cli-plugin-certificate.svg)](https://npmjs.org/package/@adobe/aio-cli-plugin-certificate)
[![Build Status](https://travis-ci.com/adobe/aio-cli-plugin-certificate.svg?branch=master)](https://travis-ci.com/adobe/aio-cli-plugin-certificate)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-cli-plugin-certificate/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-cli-plugin-certificate/)
[![Greenkeeper badge](https://badges.greenkeeper.io/adobe/aio-cli-plugin-certificate.svg)](https://greenkeeper.io/)

## Usage

# aio-cli-plugin-certificate
Adobe I/O CLI commands to generate and validate private certs, and public key pairs for use with Adobe I/O Console

<!-- toc -->
* [aio-cli-plugin-certificate](#aio-cli-plugin-certificate)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @adobe/aio-cli-plugin-certificate
$ ./bin/run COMMAND
running command...
$ ./bin/run (-v|--version|version)
@adobe/aio-cli-plugin-certificate/0.1.0 darwin-x64 node-v10.16.1
$ ./bin/run --help [COMMAND]
USAGE
  $ ./bin/run COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`./bin/run certificate`](#binrun-certificate)
* [`./bin/run certificate:generate`](#binrun-certificategenerate)
* [`./bin/run certificate:verify FILE`](#binrun-certificateverify-file)

## `./bin/run certificate`

Generate or verify a certificate for use with Adobe I/O

```
USAGE
  $ ./bin/run certificate
```

_See code: [src/commands/certificate/index.js](https://github.com/adobe/aio-cli-plugin-certificate/blob/v0.1.0/src/commands/certificate/index.js)_

## `./bin/run certificate:generate`

Generate a new private/public key pair

```
USAGE
  $ ./bin/run certificate:generate

OPTIONS
  -c, --country=country            Country Name
  -l, --locality=locality          Locality, or city name
  -n, --name=name                  Common Name: typically a host domain name, like www.mysite.com
  -o, --organization=organization  Organization name
  -s, --state=state                State or Province
  -u, --unit=unit                  Organizational unit or department
  --days=days                      [default: 365] Number of days the certificate should be valid for. (Max 365)
  --keyout=keyout                  [default: private.key] file to send the key to
  --out=out                        [default: certificate_pub.crt] output file

DESCRIPTION
  Generate a self-signed certificate to enable https:// on localhost or signing jwt payloads for interacting with Adobe 
  services.
```

_See code: [src/commands/certificate/generate.js](https://github.com/adobe/aio-cli-plugin-certificate/blob/v0.1.0/src/commands/certificate/generate.js)_

## `./bin/run certificate:verify FILE`

Verify a certificate for use with Adobe I/O

```
USAGE
  $ ./bin/run certificate:verify FILE

ARGUMENTS
  FILE  file path to certificate to verify

OPTIONS
  --days=days  +- is certificate valid in --days

DESCRIPTION
  Verifies that the certificate is valid, and/or will not expire in [--days] days from now.
```

_See code: [src/commands/certificate/verify.js](https://github.com/adobe/aio-cli-plugin-certificate/blob/v0.1.0/src/commands/certificate/verify.js)_
<!-- commandsstop -->

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
