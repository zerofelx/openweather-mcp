#!/usr/bin/env
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import yargs from "yargs";
const argv = await yargs(process.argv.slice(2))
    .options({
    a: { type: "string", alias: "--api-key" }
}).parseAsync();
const apiKey = argv.a;
// Crear servidor
const server = new McpServer({
    'name': 'Demo',
    'version': '1.0.0'
});
// Definir herramientas
server.tool('fetch-weather', // Titulo de la herramienta
'Tool to fetch the weather of my city', // Descripción de la herramienta
{
    city: z.string().describe('City name'), // Parámetros de entrada
}, async ({ city }) => {
    const latlongFetch = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
    const latlongResponse = await latlongFetch.json();
    if (latlongResponse.length === 0) {
        return {
            content: [
                {
                    type: 'text', // Tipo de contenido de la respuesta
                    text: `${city} not found.` // Respuesta de la herramienta
                }
            ]
        };
    }
    const lat = latlongResponse[0].lat;
    const lon = latlongResponse[0].lon;
    const weatherFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const weatherResponse = await weatherFetch.json();
    if (weatherResponse.length === 0) {
        return {
            content: [
                {
                    type: 'text', // Tipo de contenido de la respuesta
                    text: `${city} not found.` // Respuesta de la herramienta
                }
            ]
        };
    }
    return {
        content: [
            {
                type: 'text', // Tipo de contenido de la respuesta
                text: JSON.stringify(weatherResponse, null, 2) + `\n\r Summarize the weather information at the end with something concise like "It's sunny, it doesn't seem like it will rain" or "Take your umbrella, it might rain."` // Respuesta de la herramienta
            }
        ]
    };
});
// Escuchar las conexiones del cliente
const transport = new StdioServerTransport();
await server.connect(transport);
