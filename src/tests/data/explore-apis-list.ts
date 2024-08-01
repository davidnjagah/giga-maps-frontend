export const apiList = {
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 3,
      "code": "COUNTRY",
      "name": "Country",
      "category": "public",
      "description": "API to list countries information.",
      "country_filter_applicable": true,
      "school_filter_applicable": false,
      "giga_id_filter_applicable": false,
      "indicator_filter_applicable": false,
      "date_range_filter_applicable": false,
      "documentation_url": "https://uni-ooi-giga-maps-service.azurewebsites.net/api/v1/?open=true&api=Country&schemas=Country",
      "download_url": "/api/locations/countries-download/",
      "report_title": "Country_report_18-07-2024_14-13-27.csv",
      "default_filters": {
        "country_id": ""
      },
      "is_unlocked": false,
      "created": "03-05-2024 12:09:57",
      "last_modified_at": "10-05-2024 10:50:06"
    },
    {
      "id": 1,
      "code": "SCHOOL",
      "name": "School location",
      "category": "public",
      "description": "API to list school ID, name and location.",
      "country_filter_applicable": true,
      "school_filter_applicable": true,
      "giga_id_filter_applicable": true,
      "indicator_filter_applicable": false,
      "date_range_filter_applicable": false,
      "documentation_url": "https://uni-ooi-giga-maps-service.azurewebsites.net/api/v1/?open=true&api=SchoolLocation&schemas=SchoolLocation",
      "download_url": "/api/locations/schools-download/",
      "report_title": "School_report_18-07-2024_14-13-27.csv",
      "default_filters": {
        "country_id": "",
        "school_id": "",
        "giga_id_school": "",
        "country_has_schools": "true"
      },
      "is_unlocked": false,
      "created": "03-05-2024 12:09:57",
      "last_modified_at": "10-05-2024 10:50:06"
    },
    {
      "id": 2,
      "code": "DAILY_CHECK_APP",
      "name": "Daily Check App",
      "category": "private",
      "description": "API to query list schools and countries with Daily Check App installed and their raw measurements indicators like download speed, latency, upload speed etc.",
      "country_filter_applicable": false,
      "school_filter_applicable": false,
      "giga_id_filter_applicable": false,
      "indicator_filter_applicable": false,
      "date_range_filter_applicable": false,
      "documentation_url": "https://meter.giga.global/swagger/index.html?gigaUi=true",
      "download_url": "",
      "report_title": "",
      "default_filters": {},
      "is_unlocked": false,
      "created": "03-05-2024 12:09:57",
      "last_modified_at": "10-05-2024 10:50:06"
    },
    {
      "id": 5,
      "code": "SCHOOL_CONNECTIVITY",
      "name": "School profile",
      "category": "private",
      "description": "API to list connectivity, coverage and key infrastructure data about schools.",
      "country_filter_applicable": false,
      "school_filter_applicable": false,
      "giga_id_filter_applicable": false,
      "indicator_filter_applicable": false,
      "date_range_filter_applicable": false,
      "documentation_url": "https://uni-ooi-giga-maps-service.azurewebsites.net/api/v1/?open=true&api=SchoolProfile&schemas=SchoolProfile",
      "download_url": "",
      "report_title": "",
      "default_filters": {},
      "is_unlocked": false,
      "created": "03-05-2024 12:09:58",
      "last_modified_at": "10-05-2024 10:50:06"
    },
    {
      "id": 4,
      "code": "MEASUREMENT",
      "name": "School real-time internet quality",
      "category": "private",
      "description": "API to query list of schools and countries with real-time data and their daily average download speed, latency and other real-time data visible on the GigaMaps. It is powered by multiple data sources like GigaMeter App & chrome extension, nic.br, ISPs like Liquid, POA.",
      "country_filter_applicable": false,
      "school_filter_applicable": false,
      "giga_id_filter_applicable": false,
      "indicator_filter_applicable": false,
      "date_range_filter_applicable": false,
      "documentation_url": "https://uni-ooi-giga-maps-service.azurewebsites.net/api/v1/?open=true&api=Measurements (School Daily Realtime Connectivity Data)&schemas=AllMeasurements",
      "download_url": "",
      "report_title": "",
      "default_filters": {},
      "is_unlocked": false,
      "created": "03-05-2024 12:09:57",
      "last_modified_at": "10-05-2024 10:50:06"
    }
  ]
}

export const filterApiList = [
  {
    "id": 1,
    "code": "SCHOOL",
    "name": "School location",
    "category": "public",
    "description": "API to list school ID, name and location.",
    "country_filter_applicable": true,
    "school_filter_applicable": true,
    "giga_id_filter_applicable": true,
    "indicator_filter_applicable": false,
    "date_range_filter_applicable": false,
    "documentation_url": "http://localhost:8000/api/locations/schools-download/",
    "download_url": "/api/locations/schools-download/",
    "report_title": "School_report_26-03-2024_14-30-04.csv",
    "default_filters": {
      "country_id": "",
      "school_id": "",
      "giga_id_school": ""
    },
    "is_unlocked": true,
    "created": "26-02-2024 13:07:33",
    "last_modified_at": "28-02-2024 08:20:33"
  },
  {
    "id": 2,
    "code": "DAILY_CHECK_APP",
    "name": "Giga Meter",
    "category": "private",
    "description": "API to query list schools and countries with GigaMeter installed and their raw measurements indicators like download speed, latency, upload speed etc.",
    "country_filter_applicable": false,
    "school_filter_applicable": false,
    "giga_id_filter_applicable": false,
    "indicator_filter_applicable": false,
    "date_range_filter_applicable": false,
    "documentation_url": "",
    "download_url": "",
    "report_title": "",
    "default_filters": {},
    "is_unlocked": false,
    "created": "26-02-2024 13:07:33",
    "last_modified_at": "28-02-2024 08:20:33"
  },
]