# Haul Take Home | React - NodeJS

To run, simply run the following commands in the root directory of `client` and `server`:

```
yarn
yarn dev
```

Inspections, violations and vehicles are stored in `db.json` file. I used `json-server` to mock a REST API.

I also processed the JSON file to make it only 100 inspections instead of all of them, which had 30MB of data.

I used `https://vpic.nhtsa.dot.gov/` to get more information about the vehicles, such as make, model and year.