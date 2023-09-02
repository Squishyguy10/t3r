export const surveyJson = {
    customSubmit: "handleSubmit",
    "logoPosition": "right",
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "rating",
                    "name": "question1",
                    "title": "How often do you drive?",
                    "isRequired": true,
                    "autoGenerate": false,
                    "rateValues": [
                        {
                            "value": 0,
                            "text": "Never"
                        },
                        {
                            "value": 1,
                            "text": "A few times per year"
                        },
                        {
                            "value": 2,
                            "text": "A few times per month"
                        },
                        {
                            "value": 3,
                            "text": "A few times per week"
                        },
                        {
                            "value": 4,
                            "text": "Every day"
                        }
                    ]
                },
                {
                    "type": "checkbox",
                    "name": "question2",
                    "visibleIf": "{question1} > 2",
                    "title": "Where do you drive to?",
                    "choices": [
                        {
                            "value": 0,
                            "text": "Work"
                        },
                        {
                            "value": 1,
                            "text": "School"
                        },
                        {
                            "value": 2,
                            "text": "Errands"
                        },
                        {
                            "value": 3,
                            "text": "Friends' Homes"
                        },
                        {
                            "value": 4,
                            "text": "Appointments"
                        },
                        {
                            "value": 5,
                            "text": "Stores"
                        }
                    ],
                    "showOtherItem": true,
                    "showSelectAllItem": true
                },
                {
                    "type": "text",
                    "name": "question3",
                    "visibleIf": "{question1} > 2",
                    "title": "How much fuel does your car use? (in L/100km)",
                    "isRequired": true
                },
                {
                    "type": "radiogroup",
                    "name": "question4",
                    "title": "What energy is your home mostly powered by?",
                    "isRequired": true,
                    "choices": [
                        {
                            "value": 0,
                            "text": "Natural Gas"
                        },
                        {
                            "value": 1,
                            "text": "Grid Electricity"
                        },
                        {
                            "value": 2,
                            "text": "Oil"
                        },
                        {
                            "value": 3,
                            "text": "Propane"
                        },
                        {
                            "value": 4,
                            "text": "Solar Electricity"
                        }
                    ],
                    "showOtherItem": true
                },
                {
                    "type": "boolean",
                    "name": "question14",
                    "title": "Is your home insulated well?",
                    "isRequired": true
                },
                {
                    "type": "rating",
                    "name": "question9",
                    "title": "Are your appliances energy efficient? (such as being Energy Star rated)",
                    "isRequired": true,
                    "autoGenerate": false,
                    "rateCount": 4,
                    "rateValues": [
                        {
                            "value": 0,
                            "text": "No"
                        },
                        {
                            "value": 1,
                            "text": "Some of them"
                        },
                        {
                            "value": 2,
                            "text": "Most of them"
                        },
                        {
                            "value": 3,
                            "text": "All of them"
                        }
                    ]
                },
                {
                    "type": "rating",
                    "name": "question5",
                    "title": "Do you recycle recyclable products?",
                    "isRequired": true,
                    "autoGenerate": false,
                    "rateCount": 3,
                    "rateValues": [
                        {
                            "value": 0,
                            "text": "No"
                        },
                        {
                            "value": 1,
                            "text": "Sometimes"
                        },
                        {
                            "value": 2,
                            "text": "Yes"
                        }
                    ],
                    "rateMax": 3
                },
                {
                    "type": "rating",
                    "name": "question6",
                    "title": "Do you compost organic waste?",
                    "isRequired": true,
                    "autoGenerate": false,
                    "rateCount": 3,
                    "rateValues": [
                        {
                            "value": 0,
                            "text": "No"
                        },
                        {
                            "value": 1,
                            "text": "Sometimes"
                        },
                        {
                            "value": 2,
                            "text": "Yes"
                        }
                    ],
                    "rateMax": 3
                },
                {
                    "type": "rating",
                    "name": "question7",
                    "title": "Around how much of your diet is locally grown/produced food?",
                    "isRequired": true,
                    "autoGenerate": false,
                    "rateValues": [
                        {
                            "value": 0,
                            "text": "0%"
                        },
                        {
                            "value": 1,
                            "text": "1-25%"
                        },
                        {
                            "value": 2,
                            "text": "26-50%"
                        },
                        {
                            "value": 3,
                            "text": "51-75%"
                        },
                        {
                            "value": 4,
                            "text": "75-100%"
                        }
                    ]
                },
                {
                    "type": "rating",
                    "name": "question8",
                    "title": "Around how often do you buy new clothing?",
                    "isRequired": true,
                    "autoGenerate": false,
                    "rateValues": [
                        {
                            "value": 0,
                            "text": "Annually or longer"
                        },
                        {
                            "value": 1,
                            "text": "Semi-Annually"
                        },
                        {
                            "value": 2,
                            "text": "Monthly"
                        },
                        {
                            "value": 3,
                            "text": "Weekly"
                        },
                        {
                            "value": 4,
                            "text": "Daily"
                        }
                    ]
                },
                {
                    "type": "text",
                    "name": "question10",
                    "title": "What do you do with your old clothes?",
                    "isRequired": true
                },
                {
                    "type": "rating",
                    "name": "question11",
                    "title": "Around how often do you upgrade your electronics? (for example buying a new phone)",
                    "isRequired": true,
                    "autoGenerate": false,
                    "rateCount": 4,
                    "rateValues": [
                        {
                            "value": 0,
                            "text": "Quadrennially"
                        },
                        {
                            "value": 1,
                            "text": "Bi-annually"
                        },
                        {
                            "value": 2,
                            "text": "Annually"
                        },
                        {
                            "value": 3,
                            "text": "Semi-annually"
                        }
                    ]
                },
                {
                    "type": "text",
                    "name": "question12",
                    "title": "What do you with your old electronics?",
                    "isRequired": true
                },
                {
                    "type": "boolean",
                    "name": "question13",
                    "title": "Do you ever buy used clothing or electronics?",
                    "isRequired": true
                },
                {
                    "type": "radiogroup",
                    "name": "question15",
                    "title": "What bottle do you drink water from the most?",
                    "isRequired": true,
                    "choices": [
                        {
                            "value": 0,
                            "text": "Disposable Plastic Bottled Water"
                        },
                        {
                            "value": 1,
                            "text": "Reusing Disposable Bottles"
                        },
                        {
                            "value": 2,
                            "text": "Reusable Water Bottles"
                        }
                    ]
                }
            ],
            "title": "Basic Information",
            "description": "Here you will be answering questions that will tell us a little bit about your lifestyle and the impact it has on the climate."
        }
    ]
}