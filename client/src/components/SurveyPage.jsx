import React, { useCallback } from 'react';
import 'survey-core/defaultV2.min.css';
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { surveyJson } from './SurveyJson';
import { surveyThemeJson } from './SurveyThemeJson';

function SurveyPage() {
	const survey = new Model(surveyJson);

	survey.applyTheme(surveyThemeJson);
	
	const surveyComplete = useCallback((sender) => {
		fetch('http://localhost:3001/submit_survey', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({response: sender.data}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.user_id) {
					console.log('Survey data sent successfully. UUID:', data.user_id);
					window.location.href = "/post-survey?uuid="+data.user_id;
				}
				else {
					console.error('Failed to send survey data.');
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}, []);

	survey.onComplete.add(surveyComplete);
	
	return (
		<Survey model={survey} />
	);
}

export default SurveyPage;
