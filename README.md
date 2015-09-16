# Mailwurst

A forwarding SMTP Server useful for development purposes.

## Background

1. I am tired of configuring a local mail server for development purposes
2. I want to test if mails will look ok in REAL mail clients
3. I don't want mails to go out to a real mail address by accident
4. I don't want to add special mail debugging options to my application

## Installation

npm install -g mailwurst

## Usage

mailwurst --relayserver=smtp.mynormalsmtp.com --rewriteto=mynormalemail@mynormalsmtp.de --user=mysmtpuser --password --port=9025

This will spawn a local mailserver on port 9025 which will accept all incoming mail. Every received mail will then be rewritten (--rewriteto, --rewritefrom) and then sent via the specified mailserver.

mailwurst must be run as root if you use a port < 1024.

Note that mailwurst will rewrite the mail envelope. In other words: in the current version all cc and bcc recipients will be removed. 

### Real world example:

Given you are on your dev machine developing a standard "Send a mail to verify account" application which expects a locally running mail server on port 25 and have a google mail account:

    hans-guenther:~ mop$ sudo mailwurst --relayserver smtp.gmail.com --rewriteto #ACCOUNT#@gmail.com --user #ACCOUNT#@gmail.com --password

Register a new account with email "bla@bla.com". Check your gmail inbox :)
