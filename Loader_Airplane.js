{
    "services": [
        "Customizer"
    ],
        "name": "Airline home page",
        "title": "Convert Connections home page to airline look",
        "description": "Example of using Customizer to modify Connections' look and feel",
        "extensions": [
            {
                "name": "Airline home page theme",
                "type": "com.ibm.customizer.ui",
                "path": "homepage",
                "payload": {
                    "include-files": [
                        "scottgood/js/Airplane.user.js",
                        "scottgood/css/Homepage_Airplane.css"
                    ]
                }
            }
        ]
}