[![Version](https://img.shields.io/npm/v/@adobe/aio-cli-plugin-certificate.svg)](https://npmjs.org/package/@adobe/aio-cli-plugin-certificate)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aio-cli-plugin-certificate.svg)](https://npmjs.org/package/@adobe/aio-cli-plugin-certificate)
[![Node.js CI](https://github.com/adobe/aio-cli-plugin-certificate/actions/workflows/node.js.yml/badge.svg)](https://github.com/adobe/aio-cli-plugin-certificate/actions/workflows/node.js.yml)
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
* [`aio certificate fingerprint FILE`](#aio-certificate-fingerprint-file)
* [`aio certificate generate`](#aio-certificate-generate)
* [`aio certificate verify FILE`](#aio-certificate-verify-file)

## `aio certificate`

Generate, fingerprint, or verify a certificate for use with Adobe I/O

```
USAGE
  $ aio certificate

DESCRIPTION
  Generate, fingerprint, or verify a certificate for use with Adobe I/O
```

_See code: [src/commands/certificate/index.ts](https://github.com/adobe/aio-cli-plugin-certificate/blob/2.0.0/src/commands/certificate/index.ts)_

## `aio certificate fingerprint FILE`

Compute the fingerprint of a public key certificate for use with Adobe I/O

```
USAGE
  $ aio certificate fingerprint FILE

ARGUMENTS
  FILE  file path to certificate to fingerprint

DESCRIPTION
  Compute the fingerprint of a public key certificate for use with Adobe I/O
```

_See code: [src/commands/certificate/fingerprint.ts](https://github.com/adobe/aio-cli-plugin-certificate/blob/2.0.0/src/commands/certificate/fingerprint.ts)_

## `aio certificate generate`

Generate a new private/public key pair

```
USAGE
  $ aio certificate generate [--keyout <value>] [--out <value>] [-n <value>] [-c <value>] [-s <value>] [-l <value>] [-o
    <value>] [-u <value>] [--days <value>]

FLAGS
  -c, --country=<value>       Country Name
  -l, --locality=<value>      Locality, or city name
  -n, --name=<value>          [default: selfsign.localhost] Common Name: typically a host domain name, like
                              www.mysite.com
  -o, --organization=<value>  Organization name
  -s, --state=<value>         State or Province
  -u, --unit=<value>          Organizational unit or department
  --days=<value>              [default: 365] Number of days the certificate should be valid for. (Max 365)
  --keyout=<value>            [default: private.key] file to send the key to
  --out=<value>               [default: certificate_pub.crt] output file

DESCRIPTION
  Generate a new private/public key pair
  Generate a self-signed certificate to enable https:// on localhost or signing jwt payloads for interacting with Adobe
  services.
```

_See code: [src/commands/certificate/generate.ts](https://github.com/adobe/aio-cli-plugin-certificate/blob/2.0.0/src/commands/certificate/generate.ts)_

## `aio certificate verify FILE`

Verify a certificate for use with Adobe I/O

```
USAGE
  $ aio certificate verify FILE [--days <value>]

ARGUMENTS
  FILE  file path to certificate to verify

FLAGS
  --days=<value>  +- is certificate valid in --days

DESCRIPTION
  Verify a certificate for use with Adobe I/O
  Verifies that the certificate is valid, and/or will not expire in [--days] days from now.
```

_See code: [src/commands/certificate/verify.ts](https://github.com/adobe/aio-cli-plugin-certificate/blob/2.0.0/src/commands/certificate/verify.ts)_
<!-- commandsstop -->

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
