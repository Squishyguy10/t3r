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
        // SEND THE SURVEY DATA (sender.data) TO MONGO OR SOMETHING
        window.location.href = '/post-survey'
    }, []);

    survey.onComplete.add(surveyComplete);




    
    return (
        <Survey model={survey} />
    );
}

export default SurveyPage;
