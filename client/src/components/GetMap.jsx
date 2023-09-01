const key = 'gaJGz4L6d7qtCcT4E404L0zi7sX9QNWL';

async function GetMap() {
    return await fetch(`https://www.mapquestapi.com/search/v2/radius?key=${key}&maxMatches=4&origin=39.750307,-104.999472`, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((response) =>  {
        return response;
    });
}

export default GetMap;
