import React, { Component } from 'react';

const key = 'gaJGz4L6d7qtCcT4E404L0zi7sX9QNWL';


class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapData: null,
        };
    }

    async componentDidMount() {
        try {
            const mapData = await this.GetMap();
            this.setState({ mapData });
        }
        catch (error) {
            console.error('Error fetching map data:', error);
        }
    }

    async GetMap() {
        return await fetch(`https://www.mapquestapi.com/search/v2/radius?key=${key}&maxMatches=4&origin=39.750307,-104.999472`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((response) =>  {
            console.log(response);
            return response;
        });
    }
    
    render() {
        const { mapData } = this.state;
        return (
            <div>
                {mapData ? (
                    <div>
                        {mapData.searchResults.map(result => (
                            <h1>
                                {result.name}
                            </h1>
                        ))}
                    </div>
                ) : (
                    <p>Farting...</p>
                )}
            </div>
        );
    }

}

export default Map;