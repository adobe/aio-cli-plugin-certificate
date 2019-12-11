# aio-cli-plugin-certificate

[![Greenkeeper badge](https://badges.greenkeeper.io/adobe/aio-cli-plugin-certificate.svg)](https://greenkeeper.io/)

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
@adobe/aio-cli-plugin-certificate/0.0.0 darwin-x64 node-v10.16.1
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
* [`./bin/run certificate:validate`](#binrun-certificatevalidate)

## `./bin/run certificate`

Generate or validate a certificate private/public key pair for use with Adobe I/O Console

```
USAGE
  $ ./bin/run certificate
```

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

DESCRIPTION
```

## `./bin/run certificate:validate`

```
USAGE
  $ ./bin/run certificate:validate
```
<!-- commandsstop -->

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
