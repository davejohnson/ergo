# Ergo

## Development

First, clone the repo and install dependencies:

```
git clone git@github.com:davejohnson/ergo.git
cd ergo
yarn
```

Then, make the `ergo` command available globally by linking the package:

```
yarn link
```

### Development scripts (package.json)

```
Print contents of arc-file and object representation:
  $ yarn inspect <arc project directory>

Run ESLint on entire project:
  $ yarn lint

Run Prettier on entire project
  $ yarn format
```

## Commands

- [Initialization](#ergo-init)
- Pragmas
  - [@app](#ergo-add-app)
  - [@aws](#ergo-add-aws)
  - [@events](#ergo-add-events)
  - [@http](#ergo-add-http)
  - [@indexes](#ergo-add-indexes)
  - [@queues](#ergo-add-queues)
  - [@scheduled](#ergo-add-scheduled)
  - [@static](#ergo-add-static)
  - [@tables](#ergo-add-tables)
  - [@ws](#ergo-add-ws)

### ergo-init

```
$ ergo init -h
Usage: ergo-init [options] [appName]

Options:
  -h, --help  display help for command
```

### ergo-add-app

```
$ ergo add app -h
Usage: ergo-add-app <app-name>

Options:
  -h, --help  display help for command

Example:
  $ ergo add app my-app
```

### ergo-add-aws

```
$ ergo add aws -h
Usage: ergo-add-aws [runtime <runtime>] [region <region>] [profile <profile>]

Options:
  -h, --help  display help for command

Available runtimes:
  nodejs12.x, nodejs10.x, deno, python3.7, python3.6, ruby2.5

Available regions:
  us-east-2, us-east-1, us-west-1, us-west-2, af-south-1, ap-east-1, ap-south-1, ap-northeast-3, ap-northeast-2, ap-southeast-1, ap-southeast-2, ap-northeast-1, ca-central-1, cn-north-1, cn-northwest-1, eu-central-1, eu-west-1, eu-west-2, eu-south-1, eu-west-3, eu-north-1, me-south-1, sa-east-1

Example:
  $ ergo add aws runtime nodejs10.x region eu-west-1
```

### ergo-add-events

```
$ ergo add events -h
Usage: ergo-add-events [event names...]

Options:
  -h, --help  display help for command

Example:
  $ ergo add events hit-counter likes
```

### ergo-add-http

```
$ ergo add http -h
Usage: ergo-add-http <http-verb> <route-path>

Options:
  -h, --help  display help for command

Examples:
  $ ergo add http get /pages/:dateID
  $ ergo add http get /contact
  $ ergo add http post /contact
```

### ergo-add-indexes

```
$ ergo add indexes -h
Usage: ergo-add-indexes <table> <field> [additional fields...]

Options:
  -h, --help  display help for command

Examples:
  $ ergo add indexes accounts accountID*String
  $ ergo add indexes accounts email*String
  $ ergo add indexes accounts email*String created**String
```

### ergo-add-queues

```
$ ergo add queues queue-1 queue-2
```

### ergo-add-scheduled

```
$ ergo add scheduled -h
Usage: ergo-add-scheduled <job-name> <rate expression or cron>

Options:
  -h, --help  display help for command

Rate expresion examples:
  Every 5 minutes
    rate(5 minutes)

  Every hour
    rate(1 hour)

  Every seven days
    rate(7 days)

Cron expression examples:
  10:15 AM (UTC) every day
    cron(15 10 * * ? *)

  6:00 PM Monday through Friday
    cron(0 18 ? * MON-FRI *)

  8:00 AM on the first day of the month
    cron(0 8 1 * ? *)

  Every 10 min on weekdays
    cron(0/10 * ? * MON-FRI *)

  Every 5 minutes between 8:00 AM and 5:55 PM weekdays
    cron(0/5 8-17 ? * MON-FRI *)

  9:00 AM on the first Monday of each month
    cron(0 9 ? * 2#1 *)

Tip:
  Use double-quotes to prevent your shell from parsing paranthesis `()` and stars `*`

Example:
  $ ergo add scheduled "daily-update-buddy rate(1 day)"
```

### ergo-add-static

```
$ ergo add static -h
Usage: ergo-add-static [fingerprint]

Options:
  -h, --help  display help for command

Example:
  $ ergo add static fingerprint
```

### ergo-add-tables

```
$ ergo add tables -h
Usage: ergo-add-tables <table> <field> [additional fields...] [stream]

Options:
  -h, --help  display help for command

Examples:
  $ ergo add tables people pplID*String stream
  $ ergo add tables accounts email*String
  $ ergo add tables cats pplID*String catID**String
```

### ergo-add-ws

```
$ ergo add ws -h
Usage: ergo-add-ws [options]

Options:
  -h, --help  display help for command

Example:
  $ ergo add ws
```
