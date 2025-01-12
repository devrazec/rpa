# rpa
Exploring and Understanding the Use of Robotic Process Automation (RPA) in Enterprise Systems.

This research investigates the challenges of using RPA, which often do not meet the unique requirements of specific industries.
A case study of the company Desion GmbH, a German company specializing in AI solutions, which faces difficulties in obtaining data for its computer vision models. 

Desion needs customized RPA solutions to meet specific industry demands.
The findings of this research provide information on how to improve the adaptability of RPA to industry needs and improve its role in optimizing Enterprise Systems to drive Digital Transformation with the use of Automation Technologies.

npm i -S puppeteer puppeteer-extra puppeteer-extra-plugin-adblocker puppeteer-extra-plugin-anonymize-ua puppeteer-extra-plugin-stealth puppeteer-extra-plugin-user-preferences

npm i -S express cors body-parser

Generate Certificate
openssl genrsa -out private.key 2048
openssl x509 -req -days 365 -in certificate.csr -signkey private.key -out certificate.crt

openssl req -x509 -out localhost.crt -keyout localhost.key \
    -newkey rsa:2048 -nodes -sha256 \
    -subj '/CN=localhost' -extensions EXT -config <( \
    printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost,IP:127.0.0.1\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")


"proxy": "http://192.168.1.100:5000"


node ./express/index.js
node ./json-server/index.js