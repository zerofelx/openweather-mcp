# Weather MCP Project

This project is a Model Context Protocol (MCP) server that fetches weather information using the OpenWeatherMap API.

## Prerequisites

1. **API Key**: You need an API key from [OpenWeatherMap](https://openweathermap.org/). Ensure you have access to the following APIs:
   - Geocoding API
   - Current Weather Data API

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Run the MCP server with the following command:
```bash
node main.ts --api-key <YOUR_API_KEY>
```
Replace `<YOUR_API_KEY>` with your OpenWeatherMap API key.

## Features

- Fetches weather information for a given city.
- Provides concise weather summaries.

## Notes

- Ensure your API key has access to both the Geocoding API and the Current Weather Data API from OpenWeatherMap.
- The server uses `yargs` for command-line argument parsing.

## License

This project is licensed under the MIT License.