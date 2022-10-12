import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async (event, context) => {
    const data = await fetch("http://api.geonames.org/countryInfoJSON?formatted=true&username=manyvilay").then(response => response.json());
    return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
      };
};

export { handler };
