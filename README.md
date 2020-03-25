# Covid-19 HUB API

COVID-19 HUB API provides endpoints provides data that support Covid-19 related data, especially in Indonesia. Data provided in COVID-19 HUB API right now are local news related to Covid-19, Covid-19 data by national, and Covid-19 data by states.

COVID-19 HUB API can be accessed from anywhere without any limitations, it's free and open source. But the database access wouldn't distributed, because it's personal privacy and might break the rules in term of data. So I only can provide necessary data such as mentioned above.

Notes, this app is using [Now](https://zeit.co/home) environment, make sure you are following the step.
and actually there is no point cloning this app on your environment, since you didn't have any database access towards it. I'm trying to publish this as open source hoping some technical improvements on this layer.

## Available Endpoints

* / => return a general text, proving the app is running well
* /api/nasional/today => return summary of latest day, based on national data
* /api/nasional/data => return overall data ordered by the day, based on national data
* /api/provinsi/Nama Provinsi/today => return summary of latest day, based on selected state/province
* /api/provinsi/Nama Provinsi/data => return overall data ordered by the day, based on selected state/province
* /api/news => return 10 newest news related to Covid-19 in Indonesia
* /api/news/Page => return 10 news based on selected page, and stil related to Covid-19 in Indonesia

Notes, Nama Provinsi for example [DKI Jakarta](https://covid19hub-api.now.sh/api/provinsi/DKI%20Jakarta/today), [Jawa Timur](https://covid19hub-api.now.sh/api/provinsi/Jawa%20Timur/today).
and yes, using a whitespace!

Page for example [first page](https://covid19hub-api.now.sh/api/news/1) and [second page](https://covid19hub-api.now.sh/api/news/2).
Parsing 0 as value of Page will return an error!

## Getting Started
Use the node package manager [NPM](https://www.npmjs.com/) to install depedencies used on Covid-19 HUB API

### Installation

After cloning / copying this app to your local, run npm install to install depedencies used here.

```bash
npm install --save
```

### Running the App

To run the app, we are going to use Now CLI. Make sure you to find the tutorial on Zeit Now official page.

Run locally

```bash
now dev
```

Deploy

```bash
now
```

## Built With

* [Nodejs](https://nodejs.org/en/)
* [Now](https://zeit.co/home)
* [MongoDB](https://www.mongodb.com/)

## Contributing

Pull requests are welcome. Any ideas are welcome too. Feel free to open an issue to discuss anything.

## License

[MIT](https://choosealicense.com/licenses/mit/)
