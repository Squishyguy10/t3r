import React, { Component, useState, useEffect } from 'react';
import OpenaiKey from './openai-api-key';
import OpenAI from 'openai'; // Make sure to install the 'openai' library

function Map() {
    const [completion, setCompletion] = useState('');

    const [isLoading, setIsLoading] = useState(false); // To track loading state

    const handleGenerateText = async () => {
        setIsLoading(true); // Set loading state to true while waiting for API response

        try {
            const gee = OpenaiKey; // Replace 'YOUR_API_KEY' with your actual OpenAI API key
            const openai = new OpenAI({ apiKey: gee, dangerouslyAllowBrowser: true });
            const response = await openai.completions.create({
                engine: 'text-davinci-003', // You can use the engine of your choice
                prompt: 'Say hello world',
                max_tokens: 50, // Adjust as needed
            });

            setCompletion(response.choices[0].text);
        } catch (error) {
            console.error('Error fetching completion:', error);
            setCompletion('Error occurred while generating text.');
        } finally {
            setIsLoading(false); // Set loading state back to false when the API call is complete
        }
    };

    return (
        <div>
            <h1>GPT-3 Text Completion</h1>
            <p>Original Prompt: "Say hello world"</p>
            <button onClick={handleGenerateText} disabled={isLoading}>
                Generate Text
            </button>
            {isLoading && <p>Loading...</p>}
            <h2>Generated Text:</h2>
            <p>{completion}</p>
        </div>
    );
}

export default Map;
