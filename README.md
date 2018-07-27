<p align="center">
  <img src="https://zenroom.dyne.org/img/software_by_dyne.png" width="300" alt="zenroom studio">
</p>
<p align="center">
  <a href="https://dyne.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%9D%A4%20by-Dyne.org-blue.svg" alt="Dyne.org">
  </a>
</p>

# Validana dashboard

Validana dashboard is a first place to play with the validana infrastructure sandbox. It was born to test the [Client](https://github.com/Coinversable/validana-client/blob/master/src/client.ts#L36) API as a main purpose. It is a simple [React](https://reactjs.org/) app, where each component shows one interaction with some Client API call.

<details>
 <summary><strong>:triangular_flag_on_post: Table of Contents</strong> (click to expand)</summary>

* [Installation](#floppy_disk-installation)
* [Usage](#video_game-usage)
* [Configuration](#wrench-configuration)
* [Acknowledgements](#heart_eyes-acknowledgements)
* [License](#briefcase-license)
</details>

***
## :floppy_disk: Installation

For developers the easiest way to get up and running is:

### 1. Checkout and install validana

Before running the dashboard you need to setup all the validana infrastructure,
fortunately there is a docker configuration to setup a Sandbox infrastructure with all the mandatory components to setup the service; This includes the following:

* one validana-database
* one validana-node
* one validana-server
* one validana-processor

The main entry point is the validana-processor project where the `docker-compose.yml` should be personalized by filling at least the following variables:

```
VPROC_PRIVATEKEY
VPROC_DBPASSWORD
VPROC_SIGNPREFIX
VNODE_SIGNPREFIX
VNODE_DBPASSWORD
PROCESSORPASS
BACKENDPASS
POSTGRES_PASSWORD
VSERVER_DBPASSWORD
```

tl;dr a password, a prefix and a private key. More details [here](https://github.com/Coinversable/validana-processor/wiki/Config) 

```bash
git clone https://github.com/Coinversable/validana-processor
cd validana-processor
# edit the configuration file as per above
$EDITOR docker-compose.yml
docker-compose up
```

### 2. Checkout and install the dependencies

One of the main dependecies of the dashboard is the [validana-client](https://github.com/Coinversable/validana-client) but since is not published on the npm, you need to link it by hand

```bash
git clone https://github.com/Coinversable/validana-client.git
cd validana-client
yarn
yarn build
yarn link
```

This last command says that this project is available to the yarn registry as a dependency. Now you need to checkout the dashboard project and add validana-client as a dependency

```bash
git clone https://github.com/puria/validana-dashboard.git
yarn link 'validana-client'
yarn
```
### 3. Run the dashboard
```bash
yarn start
```

***
## :video_game: Usage

The dashboard should be fairly easy to understand, but the main purpose of the dashboard is to show how to use the public interface of the [Client](https://github.com/Coinversable/validana-client/blob/master/src/client.ts#L36)
As for now is possible to:

* connect (via websocket)
* get the time of the last transaction
* generate a PrivateKey and an address
* get the available smart contracts
* sign data with your key

***
## :wrench: Configuration
As for now the software has no configuration.

***
## :heart_eyes: Acknowledgements

Copyright (C) 2018 by [Dyne.org](https://www.dyne.org) foundation, Amsterdam
Designed, written and maintained by Puria Nafisi Azizi.

***
## :briefcase: License

    Validana Dashboard. Testing playground for Validana
    
    Copyright (C) 2018  Dyne.org foundation, Amsterdam

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
