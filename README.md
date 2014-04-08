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

This will spawn a local mailserver on port 9025 which will accept all incoming mail. It will then open a connection to the specified relayserver,
authenticate with the specified user and password (which will be asked for interactively) and send the mail to the email address specified. 

mailwurst must be run as root if you use a port < 1024.

Note that mailwurst will rewrite the mail envelope. In other words: in the current version all cc and bcc recipients will be removed. 
