# Task Forse

> Nel dubbio... task forse!

"Task Forse" is an independent project for monitoring of public task forces' activity during COVID-19 emergency in 2020 in Italy: https://www.taskforse.it/.

It's a no-profit and community-driven initiative supported by [Ondata](https://ondata.it) and based on a shared database hosted by [Google Sheets](https://www.google.com/intl/it/sheets/about/) and [Google Form](https://www.google.it/intl/it/forms/about/) and a web application built on top of [NextJS](https://nextjs.org/).

The name "Task Forse" is a joke in Italian language: _force_ in English and _forse_ in Italian (_maybe_ in English) sound similar, so in Italy the word _task forse_ suggests some amount of uncertainty in the management of emergency using task forces appointed by the government and local public institutions.

## Database

Shared database: [15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8](https://docs.google.com/spreadsheets/d/15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8/edit?usp=sharing).

Sheets:
- [Meta](https://docs.google.com/spreadsheets/d/15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8/edit#gid=0): database metadata with tables and fields descriptions.
- [Task forses](https://docs.google.com/spreadsheets/d/15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8/edit#gid=1428144440) (task forces): table with all monitored task forces
- [Membri](https://docs.google.com/spreadsheets/d/15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8/edit#gid=886519616) (members): table with all known members which are part of at least one task force
- [Verbali](https://docs.google.com/spreadsheets/d/15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8/edit#gid=939478784) (minutes): table with all official minutes produced and pyblished by task forces
- [Risorse](https://docs.google.com/spreadsheets/d/15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8/edit#gid=369768687) (resources): table with all sort of external resources related to task forces' activity

You can freely access the shared database, download it in all formats supported by Google Sheet and reuse it in agreement with a [Creative Commons Attribution (CC-BY)](https://creativecommons.org/licenses/by/4.0/deed.it) license.

## Web application

Running instance: https://www.taskforse.it/.

### Source code

Public repository: https://github.com/ondata/taskforse.it.

Source code is released under a [MIT](https://opensource.org/licenses/MIT) license on Github. Contributions are welcome. Feel free to open issues and submit a pull request at any time!

### Software architecture

This application is composed by three services:
- a reverse proxy with caching as a middleware between client and nextjs application and between nextjs application and remote google sheet
- a nextjs application with SSR enabled
- an interactive API documentation

The remote database is a simple Google Sheet with public visibility accessed by nextjs application only on server-side.

### Production

You can deploy and run the application in a production environment using [Docker](https://www.docker.com/). A `docker-compose.yml` is provided to simplify deploy using [Docker Compose](https://docs.docker.com/compose/) utility.

The application is composed by 3 containers based on images hosted by [Github Packages](https://github.com/features/packages): https://github.com/ondata/taskforse.it/packages.
- [app:latest](https://github.com/ondata/taskforse.it/packages/233171): nextjs application
- [proxy:latest](https://github.com/ondata/taskforse.it/packages/233169): nginx reverse proxy with caching
- [osa:latest](https://github.com/ondata/taskforse.it/packages/233918): swagger ui for API documentation

You can simply copy and paste the [docker-compose.yml file](https://github.com/ondata/taskforse.it/blob/master/docker-compose.yml) provided and run `docker-compose up`. Then you can open `http://localhost:8080` using your favourite browser.

You can set environment variables using a `.env` file:
- PROXY_URL - URL of nginx server with path for proxied Google Sheet, default: http://proxy/db
- APP_URL - URL of nextjs application, default: http://app:3000
- OAS_URL - URL of swagger ui service, default: http://oas-ui:8080
- PROD_PORT - Port exposed on host, default: 8080

### Development

If you want to contribute to the development, you can fork and clone this repository, make your changes and finally send a pull request.

NextJS is a node application, so after cloning you must install dependencies running `npm install`.

Main dependencies:
- [Font Aawesome icons for react](https://fortawesome.com/)
- [Material-UI](https://material-ui.com/)
- [Axios](https://github.com/axios/axios)
- [Lodash](https://lodash.com/)
- [NextJS](https://nextjs.org/)
- [React](https://reactjs.org/)

You can start development server with hot reloading running `npm run dev`. You can also test the production instance running `npm run start`. Then you can open `http://localhost:3000` using your favourite browser. Note that reverse proxy and caching are unavailable outside docker containers.

### API

All data are available on a REST API (only GET verb is supported): https://www.taskforse.it/api/v1. There is also an interactive documentation powered by [Swagger UI](https://swagger.io/tools/swagger-ui/) and compliant to [OpenAPI Specification v3](http://spec.openapis.org/oas/v3.0.3): https://www.taskforse.it/oas/.

If you want to contribute to the API documentation, you can run [Swagger Editor](https://swagger.io/tools/swagger-editor/) using the docker-compose.yml file in `oas/` folder.

> Warning: [CORS](https://developer.mozilla.org/it/docs/Web/HTTP/CORS) is disabled by default for all origins, if you need to access API from a client-side application feel free to open an issue.

## License

The source code is released under the [MIT License](https://opensource.org/licenses/MIT).

The database is released under the [Creative Commons Attribution License](https://creativecommons.org/licenses/by/4.0/deed.it).
