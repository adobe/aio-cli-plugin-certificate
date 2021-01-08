[![Version](https://img.shields.io/npm/v/@adobe/aio-cli-plugin-certificate.svg)](https://npmjs.org/package/@adobe/aio-cli-plugin-certificate)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aio-cli-plugin-certificate.svg)](https://npmjs.org/package/@adobe/aio-cli-plugin-certificate)
[![Build Status](https://travis-ci.com/adobe/aio-cli-plugin-certificate.svg?branch=master)](https://travis-ci.com/adobe/aio-cli-plugin-certificate)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-cli-plugin-certificate/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-cli-plugin-certificate/)


## Usage

# aio-cli-plugin-certificate
Adobe I/O CLI commands to generate and validate private certs, and public key pairs for use with Adobe I/O Console

<!-- toc -->
* [aio-cli-plugin-certificate](#aio-cli-plugin-certificate)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
```sh-session
$ aio plugins:install -g @adobe/aio-cli-plugin-certificate
$ # OR
$ aio discover -i
$ aio certificate --help
```

# Commands
<!-- commands -->
* [`aio certificate`](#aio-certificate)
* [`aio certificate:generate`](#aio-certificategenerate)
* [`aio certificate:verify FILE`](#aio-certificateverify-file)

## `aio certificate`

Generate or verify a certificate for use with Adobe I/O

```
Generate or verify a certificate for use with Adobe I/O

USAGE
  $ aio certificate
```

_See code: [src/commands/certificate/index.js](https://github.com/adobe/aio-cli-plugin-certificate/blob/0.2.1/src/commands/certificate/index.js)_

## `aio certificate:generate`

Generate a new private/public key pair

```
Generate a new private/public key pair
Generate a self-signed certificate to enable https:// on localhost or signing jwt payloads for interacting with Adobe services.


USAGE
  $ aio certificate:generate

OPTIONS
  -c, --country=country            Country Name
  -l, --locality=locality          Locality, or city name

  -n, --name=name                  [default: selfsign.localhost] Common Name: typically a host domain name, like
                                   www.mysite.com

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

_See code: [src/commands/certificate/generate.js](https://github.com/adobe/aio-cli-plugin-certificate/blob/0.2.1/src/commands/certificate/generate.js)_

## `aio certificate:verify FILE`

Verify a certificate for use with Adobe I/O

```
Verify a certificate for use with Adobe I/O
Verifies that the certificate is valid, and/or will not expire in [--days] days from now.


USAGE
  $ aio certificate:verify FILE

ARGUMENTS
  FILE  file path to certificate to verify

OPTIONS
  --days=days  +- is certificate valid in --days

DESCRIPTION
  Verifies that the certificate is valid, and/or will not expire in [--days] days from now.
```

_See code: [src/commands/certificate/verify.js](https://github.com/adobe/aio-cli-plugin-certificate/blob/0.2.1/src/commands/certificate/verify.js)_
<!-- commandsstop -->

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
