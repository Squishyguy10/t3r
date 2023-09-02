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
                            "value": 1,
                            "text": "Never"
                        },
                        {
                            "value": 2,
                            "text": "A few times per year"
                        },
                        {
                            "value": 3,
                            "text": "A few times per month"
                        },
                        {
                            "value": 4,
                            "text": "A few times per week"
                        },
                        {
                            "value": 5,
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
                            "value": "Item 1",
                            "text": "Work"
                        },
                        {
                            "value": "Item 2",
                            "text": "School"
                        },
                        {
                            "value": "Item 3",
                            "text": "Errands"
                        },
                        {
                            "value": "Item 4",
                            "text": "Friends' Homes"
                        },
                        {
                            "value": "Item 5",
                            "text": "Appointments"
                        },
                        {
                            "value": "Item 6",
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
                            "value": "Item 1",
                            "text": "Natural Gas"
                        },
                        {
                            "value": "Item 2",
                            "text": "Grid Electricity"
                        },
                        {
                            "value": "Item 3",
                            "text": "Oil"
                        },
                        {
                            "value": "Item 4",
                            "text": "Propane"
                        },
                        {
                            "value": "Item 5",
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
                            "value": 1,
                            "text": "No"
                        },
                        {
                            "value": 2,
                            "text": "Some of them"
                        },
                        {
                            "value": 3,
                            "text": "Most of them"
                        },
                        {
                            "value": 4,
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
                            "value": 1,
                            "text": "No"
                        },
                        {
                            "value": 2,
                            "text": "Sometimes"
                        },
                        {
                            "value": 3,
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
                            "value": 1,
                            "text": "No"
                        },
                        {
                            "value": 2,
                            "text": "Sometimes"
                        },
                        {
                            "value": 3,
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
                            "value": 1,
                            "text": "0%"
                        },
                        {
                            "value": 2,
                            "text": "1-25%"
                        },
                        {
                            "value": 3,
                            "text": "26-50%"
                        },
                        {
                            "value": 4,
                            "text": "51-75%"
                        },
                        {
                            "value": 5,
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
                            "value": 1,
                            "text": "Annually or longer"
                        },
                        {
                            "value": 2,
                            "text": "Semi-Annually"
                        },
                        {
                            "value": 3,
                            "text": "Monthly"
                        },
                        {
                            "value": 4,
                            "text": "Weekly"
                        },
                        {
                            "value": 5,
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
                            "value": 1,
                            "text": "Quadrennially"
                        },
                        {
                            "value": 2,
                            "text": "Bi-annually"
                        },
                        {
                            "value": 3,
                            "text": "Annually"
                        },
                        {
                            "value": 4,
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
                            "value": "Item 1",
                            "text": "Disposable Plastic Bottled Water"
                        },
                        {
                            "value": "Item 2",
                            "text": "Reusing Disposable Bottles"
                        },
                        {
                            "value": "Item 3",
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