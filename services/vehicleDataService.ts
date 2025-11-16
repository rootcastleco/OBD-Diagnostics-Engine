import { ModelProfile, SpecProfile } from '../types';

// --- INLINED VEHICLE DATA ---
// Data is inlined to prevent fetch errors on platforms with strict static file serving.

const allSpecsData: { [key: string]: ModelProfile[] } = {
    "acura": [
    {
        "model": "ILX",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2022,
                "body": "Sedan",
                "engine": "2.4L I4",
                "engine_displacement": "2356cc",
                "engine_hp": "201 HP",
                "engine_torque": "180 Nm",
                "transmission": "8-Speed DCT",
                "zero_to_100_kmh": "7.0s",
                "max_speed_kmh": "220km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "MDX",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2020,
                "body": "SUV",
                "engine": "3.5L V6",
                "engine_displacement": "3471cc",
                "engine_hp": "290 HP",
                "engine_torque": "267 Nm",
                "transmission": "9-Speed Automatic",
                "zero_to_100_kmh": "6.5s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "NSX",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2022,
                "body": "Coupe",
                "engine": "3.5L Twin-Turbo V6 Hybrid",
                "engine_displacement": "3493cc",
                "engine_hp": "573 HP",
                "engine_torque": "476 Nm",
                "transmission": "9-Speed DCT",
                "zero_to_100_kmh": "2.9s",
                "max_speed_kmh": "307km/h",
                "fuel": "Gasoline/Hybrid"
            }
        ]
    },
    {
        "model": "TLX",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2020,
                "body": "Sedan",
                "engine": "2.4L I4",
                "engine_displacement": "2356cc",
                "engine_hp": "206 HP",
                "engine_torque": "182 Nm",
                "transmission": "8-Speed DCT",
                "zero_to_100_kmh": "6.9s",
                "max_speed_kmh": "225km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "alfa-romeo": [
    {
        "model": "4C",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2016,
                "body": "Coupe",
                "engine": "1.7L Turbo",
                "engine_displacement": "1742cc",
                "engine_hp": "237 HP",
                "engine_torque": "258 Nm",
                "transmission": "6-speed auto-shift manual w/OD",
                "zero_to_100_kmh": "4.1s",
                "max_speed_kmh": "258km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2015,
                "endYear": 2016,
                "body": "Spider",
                "engine": "1.7L Turbo",
                "engine_displacement": "1742cc",
                "engine_hp": "237 HP",
                "engine_torque": "258 Nm",
                "transmission": "6-speed auto-shift manual w/OD",
                "zero_to_100_kmh": "4.1s",
                "max_speed_kmh": "258km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Giulia",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2019,
                "body": "Sedan",
                "engine": "2.0L Turbo",
                "engine_displacement": "1995cc",
                "engine_hp": "280 HP",
                "engine_torque": "306 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.1s",
                "max_speed_kmh": "240km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2017,
                "endYear": 2019,
                "body": "Quadrifoglio",
                "engine": "2.9L Twin-Turbo V6",
                "engine_displacement": "2891cc",
                "engine_hp": "505 HP",
                "engine_torque": "443 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "3.8s",
                "max_speed_kmh": "307km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Stelvio",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2019,
                "body": "SUV",
                "engine": "2.0L Turbo",
                "engine_displacement": "1995cc",
                "engine_hp": "280 HP",
                "engine_torque": "306 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.4s",
                "max_speed_kmh": "232km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2018,
                "endYear": 2019,
                "body": "Quadrifoglio",
                "engine": "2.9L Twin-Turbo V6",
                "engine_displacement": "2891cc",
                "engine_hp": "505 HP",
                "engine_torque": "443 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "3.6s",
                "max_speed_kmh": "283km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "aston-martin": [
    {
        "model": "DB9",
        "specs": [
            {
                "startYear": 2004,
                "endYear": 2016,
                "body": "Coupe",
                "engine": "6.0L V12",
                "engine_displacement": "5935cc",
                "engine_hp": "470 HP",
                "engine_torque": "600 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "4.6s",
                "max_speed_kmh": "306km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2004,
                "endYear": 2016,
                "body": "Volante (Convertible)",
                "engine": "6.0L V12",
                "engine_displacement": "5935cc",
                "engine_hp": "470 HP",
                "engine_torque": "600 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "4.8s",
                "max_speed_kmh": "300km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Vantage",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2022,
                "body": "Coupe",
                "engine": "4.0L Twin-Turbo V8",
                "engine_displacement": "3982cc",
                "engine_hp": "503 HP",
                "engine_torque": "685 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "3.6s",
                "max_speed_kmh": "314km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "DB11",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2022,
                "body": "Coupe",
                "engine": "5.2L Twin-Turbo V12",
                "engine_displacement": "5204cc",
                "engine_hp": "600 HP",
                "engine_torque": "700 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "3.9s",
                "max_speed_kmh": "322km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "audi": [
    {
        "model": "A3",
        "specs": [
            {
                "startYear": 2006,
                "endYear": 2013,
                "body": "Hatchback",
                "engine": "2.0L Turbo",
                "engine_displacement": "1984cc",
                "engine_hp": "200 HP",
                "engine_torque": "207 Nm",
                "transmission": "6-Speed A/T",
                "zero_to_100_kmh": "6.7s",
                "max_speed_kmh": "209km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2015,
                "endYear": 2016,
                "body": "Sedan",
                "engine": "1.8L Turbo",
                "engine_displacement": "1798cc",
                "engine_hp": "170 HP",
                "engine_torque": "200 Nm",
                "transmission": "6-Speed A/T",
                "zero_to_100_kmh": "7.2s",
                "max_speed_kmh": "209km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2017,
                "endYear": 2019,
                "body": "Sedan",
                "engine": "2.0L Turbo",
                "engine_displacement": "1984cc",
                "engine_hp": "220 HP",
                "engine_torque": "258 Nm",
                "transmission": "6-Speed A/T",
                "zero_to_100_kmh": "5.8s",
                "max_speed_kmh": "209km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2015,
                "endYear": 2016,
                "body": "Cabriolet",
                "engine": "2.0L Turbo",
                "engine_displacement": "1984cc",
                "engine_hp": "220 HP",
                "engine_torque": "258 Nm",
                "transmission": "6-Speed A/T",
                "zero_to_100_kmh": "5.9s",
                "max_speed_kmh": "209km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "A4",
        "specs": [
            {
                "startYear": 2002,
                "endYear": 2008,
                "body": "Sedan",
                "engine": "1.8L Turbo",
                "engine_displacement": "1781cc",
                "engine_hp": "170 HP",
                "engine_torque": "166 Nm",
                "transmission": "5-Speed M/T",
                "zero_to_100_kmh": "8.2s",
                "max_speed_kmh": "229km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2009,
                "endYear": 2016,
                "body": "Sedan",
                "engine": "2.0L Turbo",
                "engine_displacement": "1984cc",
                "engine_hp": "211 HP",
                "engine_torque": "258 Nm",
                "transmission": "6-Speed M/T",
                "zero_to_100_kmh": "6.6s",
                "max_speed_kmh": "209km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2017,
                "endYear": 2019,
                "body": "Sedan",
                "engine": "2.0L Turbo",
                "engine_displacement": "1984cc",
                "engine_hp": "252 HP",
                "engine_torque": "273 Nm",
                "transmission": "7-Speed A/T",
                "zero_to_100_kmh": "5.6s",
                "max_speed_kmh": "209km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "bentley": [
    {
        "model": "Continental GT",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "Coupe",
                "engine": "6.0L Twin-Turbo W12",
                "engine_displacement": "5950cc",
                "engine_hp": "626 HP",
                "engine_torque": "664 Nm",
                "transmission": "8-Speed DCT",
                "zero_to_100_kmh": "3.7s",
                "max_speed_kmh": "333km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Bentayga",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2023,
                "body": "SUV",
                "engine": "4.0L Twin-Turbo V8",
                "engine_displacement": "3996cc",
                "engine_hp": "542 HP",
                "engine_torque": "568 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "4.5s",
                "max_speed_kmh": "290km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Flying Spur",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "Sedan",
                "engine": "6.0L Twin-Turbo W12",
                "engine_displacement": "5950cc",
                "engine_hp": "626 HP",
                "engine_torque": "664 Nm",
                "transmission": "8-Speed DCT",
                "zero_to_100_kmh": "3.8s",
                "max_speed_kmh": "333km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "bmw": [
    {
        "model": "3 Series",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "Sedan (G20)",
                "engine": "2.0L Turbo I4 (330i)",
                "engine_displacement": "1998cc",
                "engine_hp": "255 HP",
                "engine_torque": "295 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.6s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "Sedan (G20)",
                "engine": "3.0L Turbo I6 (M340i)",
                "engine_displacement": "2998cc",
                "engine_hp": "382 HP",
                "engine_torque": "369 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "4.1s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "5 Series",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2023,
                "body": "Sedan (G30)",
                "engine": "2.0L Turbo I4 (530i)",
                "engine_displacement": "1998cc",
                "engine_hp": "248 HP",
                "engine_torque": "258 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "6.0s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "X5",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "SUV (G05)",
                "engine": "3.0L Turbo I6 (xDrive40i)",
                "engine_displacement": "2998cc",
                "engine_hp": "335 HP",
                "engine_torque": "330 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.3s",
                "max_speed_kmh": "243km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "M3",
        "specs": [
            {
                "startYear": 2021,
                "endYear": 2023,
                "body": "Sedan (G80)",
                "engine": "3.0L Twin-Turbo I6",
                "engine_displacement": "2993cc",
                "engine_hp": "473 HP",
                "engine_torque": "406 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "4.1s",
                "max_speed_kmh": "290km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "bugatti": [
    {
        "model": "Veyron",
        "specs": [
            {
                "startYear": 2005,
                "endYear": 2015,
                "body": "Coupe (16.4)",
                "engine": "8.0L Quad-Turbo W16",
                "engine_displacement": "7993cc",
                "engine_hp": "1001 HP",
                "engine_torque": "922 Nm",
                "transmission": "7-Speed DSG",
                "zero_to_100_kmh": "2.5s",
                "max_speed_kmh": "407km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Chiron",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2022,
                "body": "Coupe",
                "engine": "8.0L Quad-Turbo W16",
                "engine_displacement": "7993cc",
                "engine_hp": "1479 HP",
                "engine_torque": "1180 Nm",
                "transmission": "7-Speed DSG",
                "zero_to_100_kmh": "2.4s",
                "max_speed_kmh": "420km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "buick": [
    {
        "model": "Regal",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2020,
                "body": "Sportback",
                "engine": "2.0L Turbo",
                "engine_displacement": "1998cc",
                "engine_hp": "250 HP",
                "engine_torque": "260 Nm",
                "transmission": "9-Speed Automatic",
                "zero_to_100_kmh": "6.2s",
                "max_speed_kmh": "241km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2018,
                "endYear": 2020,
                "body": "TourX",
                "engine": "2.0L Turbo",
                "engine_displacement": "1998cc",
                "engine_hp": "250 HP",
                "engine_torque": "295 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "6.4s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Enclave",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2022,
                "body": "SUV",
                "engine": "3.6L V6",
                "engine_displacement": "3564cc",
                "engine_hp": "310 HP",
                "engine_torque": "266 Nm",
                "transmission": "9-Speed Automatic",
                "zero_to_100_kmh": "6.5s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Encore",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2022,
                "body": "SUV",
                "engine": "1.4L Turbo",
                "engine_displacement": "1364cc",
                "engine_hp": "153 HP",
                "engine_torque": "177 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "8.4s",
                "max_speed_kmh": "196km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "cadillac": [
    {
        "model": "CTS",
        "specs": [
            {
                "startYear": 2014,
                "endYear": 2019,
                "body": "Sedan",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1998cc",
                "engine_hp": "268 HP",
                "engine_torque": "295 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "6.6s",
                "max_speed_kmh": "240km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Escalade",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2020,
                "body": "SUV",
                "engine": "6.2L V8",
                "engine_displacement": "6162cc",
                "engine_hp": "420 HP",
                "engine_torque": "460 Nm",
                "transmission": "10-Speed Automatic",
                "zero_to_100_kmh": "5.9s",
                "max_speed_kmh": "180km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "ATS",
        "specs": [
            {
                "startYear": 2013,
                "endYear": 2019,
                "body": "Coupe",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1998cc",
                "engine_hp": "272 HP",
                "engine_torque": "295 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.7s",
                "max_speed_kmh": "240km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "chevrolet": [
    {
        "model": "Silverado",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2022,
                "body": "1500 Crew Cab",
                "engine": "5.3L V8",
                "engine_displacement": "5328cc",
                "engine_hp": "355 HP",
                "engine_torque": "383 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "6.1s",
                "max_speed_kmh": "180km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Camaro",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2023,
                "body": "Coupe SS",
                "engine": "6.2L V8",
                "engine_displacement": "6162cc",
                "engine_hp": "455 HP",
                "engine_torque": "455 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "4.0s",
                "max_speed_kmh": "290km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Corvette",
        "specs": [
            {
                "startYear": 2020,
                "endYear": 2023,
                "body": "Stingray (C8)",
                "engine": "6.2L V8",
                "engine_displacement": "6162cc",
                "engine_hp": "495 HP",
                "engine_torque": "470 Nm",
                "transmission": "8-Speed DCT",
                "zero_to_100_kmh": "2.9s",
                "max_speed_kmh": "312km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Equinox",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "SUV",
                "engine": "1.5L Turbo I4",
                "engine_displacement": "1490cc",
                "engine_hp": "170 HP",
                "engine_torque": "203 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "8.7s",
                "max_speed_kmh": "200km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "chrysler": [
    {
        "model": "300",
        "specs": [
            {
                "startYear": 2011,
                "endYear": 2023,
                "body": "Sedan",
                "engine": "3.6L V6",
                "engine_displacement": "3604cc",
                "engine_hp": "292 HP",
                "engine_torque": "260 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "6.3s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2011,
                "endYear": 2023,
                "body": "Sedan",
                "engine": "5.7L V8 HEMI",
                "engine_displacement": "5654cc",
                "engine_hp": "363 HP",
                "engine_torque": "394 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.3s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Pacifica",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2023,
                "body": "Minivan",
                "engine": "3.6L V6",
                "engine_displacement": "3604cc",
                "engine_hp": "287 HP",
                "engine_torque": "262 Nm",
                "transmission": "9-Speed Automatic",
                "zero_to_100_kmh": "7.3s",
                "max_speed_kmh": "190km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "citroen": [
    {
        "model": "C3",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2022,
                "body": "Hatchback",
                "engine": "1.2L PureTech",
                "engine_displacement": "1199cc",
                "engine_hp": "110 HP",
                "engine_torque": "205 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "10.9s",
                "max_speed_kmh": "194km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2016,
                "endYear": 2022,
                "body": "Hatchback",
                "engine": "1.5L BlueHDi",
                "engine_displacement": "1499cc",
                "engine_hp": "100 HP",
                "engine_torque": "250 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "11.3s",
                "max_speed_kmh": "188km/h",
                "fuel": "Diesel"
            }
        ]
    },
    {
        "model": "C4",
        "specs": [
            {
                "startYear": 2020,
                "endYear": 2023,
                "body": "Hatchback",
                "engine": "1.2L PureTech",
                "engine_displacement": "1199cc",
                "engine_hp": "130 HP",
                "engine_torque": "230 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "10.2s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "C5 Aircross",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "SUV",
                "engine": "1.6L PureTech",
                "engine_displacement": "1598cc",
                "engine_hp": "180 HP",
                "engine_torque": "250 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "8.2s",
                "max_speed_kmh": "219km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "dacia": [
    {
        "model": "Duster",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "SUV",
                "engine": "1.5L dCi Diesel",
                "engine_displacement": "1461cc",
                "engine_hp": "115 HP",
                "engine_torque": "260 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "10.5s",
                "max_speed_kmh": "179km/h",
                "fuel": "Diesel"
            },
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "SUV",
                "engine": "1.3L TCe Gasoline",
                "engine_displacement": "1332cc",
                "engine_hp": "150 HP",
                "engine_torque": "250 Nm",
                "transmission": "6-Speed EDC",
                "zero_to_100_kmh": "9.7s",
                "max_speed_kmh": "200km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Sandero",
        "specs": [
            {
                "startYear": 2020,
                "endYear": 2023,
                "body": "Hatchback",
                "engine": "1.0L TCe",
                "engine_displacement": "999cc",
                "engine_hp": "90 HP",
                "engine_torque": "160 Nm",
                "transmission": "CVT",
                "zero_to_100_kmh": "13.4s",
                "max_speed_kmh": "172km/h",
                "fuel": "Gasoline/LPG"
            }
        ]
    }
],
    "daewoo": [
    {
        "model": "Lanos",
        "specs": [
            {
                "startYear": 1997,
                "endYear": 2002,
                "body": "Sedan",
                "engine": "1.5L I4",
                "engine_displacement": "1498cc",
                "engine_hp": "86 HP",
                "engine_torque": "130 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "12.5s",
                "max_speed_kmh": "172km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Matiz",
        "specs": [
            {
                "startYear": 1998,
                "endYear": 2005,
                "body": "Hatchback",
                "engine": "0.8L I3",
                "engine_displacement": "796cc",
                "engine_hp": "51 HP",
                "engine_torque": "69 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "17.0s",
                "max_speed_kmh": "144km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "daihatsu": [
    {
        "model": "Terios",
        "specs": [
            {
                "startYear": 2006,
                "endYear": 2017,
                "body": "SUV",
                "engine": "1.5L I4",
                "engine_displacement": "1495cc",
                "engine_hp": "105 HP",
                "engine_torque": "140 Nm",
                "transmission": "4-Speed Automatic",
                "zero_to_100_kmh": "12.4s",
                "max_speed_kmh": "165km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Sirion",
        "specs": [
            {
                "startYear": 2004,
                "endYear": 2010,
                "body": "Hatchback",
                "engine": "1.3L I4",
                "engine_displacement": "1298cc",
                "engine_hp": "87 HP",
                "engine_torque": "120 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "11.3s",
                "max_speed_kmh": "170km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "dodge": [
    {
        "model": "Challenger",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2023,
                "body": "Coupe R/T",
                "engine": "5.7L V8 HEMI",
                "engine_displacement": "5654cc",
                "engine_hp": "375 HP",
                "engine_torque": "410 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "5.1s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2015,
                "endYear": 2023,
                "body": "SRT Hellcat",
                "engine": "6.2L Supercharged V8",
                "engine_displacement": "6166cc",
                "engine_hp": "717 HP",
                "engine_torque": "656 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "3.6s",
                "max_speed_kmh": "320km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Charger",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2023,
                "body": "Sedan Scat Pack",
                "engine": "6.4L V8 HEMI",
                "engine_displacement": "6417cc",
                "engine_hp": "485 HP",
                "engine_torque": "475 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "4.3s",
                "max_speed_kmh": "281km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "eagle": [
    {
        "model": "Talon",
        "specs": [
            {
                "startYear": 1995,
                "endYear": 1998,
                "body": "Coupe TSi AWD",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1997cc",
                "engine_hp": "210 HP",
                "engine_torque": "214 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "6.6s",
                "max_speed_kmh": "230km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "ferrari": [
    {
        "model": "488",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2019,
                "body": "GTB Coupe",
                "engine": "3.9L Twin-Turbo V8",
                "engine_displacement": "3902cc",
                "engine_hp": "661 HP",
                "engine_torque": "561 Nm",
                "transmission": "7-Speed DCT",
                "zero_to_100_kmh": "3.0s",
                "max_speed_kmh": "330km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "F8 Tributo",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2022,
                "body": "Coupe",
                "engine": "3.9L Twin-Turbo V8",
                "engine_displacement": "3902cc",
                "engine_hp": "710 HP",
                "engine_torque": "568 Nm",
                "transmission": "7-Speed DCT",
                "zero_to_100_kmh": "2.9s",
                "max_speed_kmh": "340km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "SF90 Stradale",
        "specs": [
            {
                "startYear": 2020,
                "endYear": 2023,
                "body": "Coupe",
                "engine": "4.0L Twin-Turbo V8 PHEV",
                "engine_displacement": "3990cc",
                "engine_hp": "986 HP",
                "engine_torque": "590 Nm",
                "transmission": "8-Speed DCT",
                "zero_to_100_kmh": "2.5s",
                "max_speed_kmh": "340km/h",
                "fuel": "Gasoline/Hybrid"
            }
        ]
    }
],
    "fiat": [
    {
        "model": "500",
        "specs": [
            {
                "startYear": 2007,
                "endYear": 2019,
                "body": "Hatchback",
                "engine": "1.2L I4",
                "engine_displacement": "1242cc",
                "engine_hp": "69 HP",
                "engine_torque": "102 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "12.9s",
                "max_speed_kmh": "160km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Egea",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2023,
                "body": "Sedan",
                "engine": "1.3L Multijet",
                "engine_displacement": "1248cc",
                "engine_hp": "95 HP",
                "engine_torque": "200 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "11.7s",
                "max_speed_kmh": "183km/h",
                "fuel": "Diesel"
            },
            {
                "startYear": 2015,
                "endYear": 2023,
                "body": "Sedan",
                "engine": "1.6L E-Torq",
                "engine_displacement": "1598cc",
                "engine_hp": "110 HP",
                "engine_torque": "152 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "11.2s",
                "max_speed_kmh": "192km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Punto",
        "specs": [
            {
                "startYear": 2005,
                "endYear": 2018,
                "body": "Hatchback",
                "engine": "1.4L Fire",
                "engine_displacement": "1368cc",
                "engine_hp": "77 HP",
                "engine_torque": "115 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "13.2s",
                "max_speed_kmh": "165km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "fisker": [
    {
        "model": "Karma",
        "specs": [
            {
                "startYear": 2011,
                "endYear": 2012,
                "body": "Sedan",
                "engine": "2.0L Turbo I4 PHEV",
                "engine_displacement": "1998cc",
                "engine_hp": "403 HP",
                "engine_torque": "960 Nm",
                "transmission": "1-Speed Direct Drive",
                "zero_to_100_kmh": "6.3s",
                "max_speed_kmh": "201km/h",
                "fuel": "Gasoline/Hybrid"
            }
        ]
    }
],
    "ford": [
    {
        "model": "F-150",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2020,
                "body": "SuperCrew",
                "engine": "3.5L EcoBoost V6",
                "engine_displacement": "3496cc",
                "engine_hp": "375 HP",
                "engine_torque": "470 Nm",
                "transmission": "10-Speed Automatic",
                "zero_to_100_kmh": "5.7s",
                "max_speed_kmh": "170km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Mustang",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "GT Coupe",
                "engine": "5.0L V8",
                "engine_displacement": "4951cc",
                "engine_hp": "460 HP",
                "engine_torque": "420 Nm",
                "transmission": "10-Speed Automatic",
                "zero_to_100_kmh": "3.9s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Focus",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2018,
                "body": "Hatchback",
                "engine": "1.0L EcoBoost I3",
                "engine_displacement": "999cc",
                "engine_hp": "123 HP",
                "engine_torque": "125 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "10.5s",
                "max_speed_kmh": "200km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Explorer",
        "specs": [
            {
                "startYear": 2020,
                "endYear": 2023,
                "body": "SUV",
                "engine": "2.3L EcoBoost I4",
                "engine_displacement": "2261cc",
                "engine_hp": "300 HP",
                "engine_torque": "310 Nm",
                "transmission": "10-Speed Automatic",
                "zero_to_100_kmh": "6.8s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "freightliner": [
    {
        "model": "Cascadia",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "Sleeper Cab",
                "engine": "14.8L Detroit DD15",
                "engine_displacement": "14800cc",
                "engine_hp": "505 HP",
                "engine_torque": "1750 Nm",
                "transmission": "12-Speed Automated Manual",
                "zero_to_100_kmh": "N/A",
                "max_speed_kmh": "120km/h",
                "fuel": "Diesel"
            }
        ]
    }
],
    "genesis": [
    {
        "model": "G70",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "Sedan",
                "engine": "3.3L Twin-Turbo V6",
                "engine_displacement": "3342cc",
                "engine_hp": "365 HP",
                "engine_torque": "376 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "4.5s",
                "max_speed_kmh": "270km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "G80",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2020,
                "body": "Sedan",
                "engine": "5.0L V8",
                "engine_displacement": "5038cc",
                "engine_hp": "420 HP",
                "engine_torque": "383 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.0s",
                "max_speed_kmh": "240km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "G90",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2022,
                "body": "Sedan",
                "engine": "5.0L V8",
                "engine_displacement": "5038cc",
                "engine_hp": "420 HP",
                "engine_torque": "383 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.1s",
                "max_speed_kmh": "240km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "geo": [
    {
        "model": "Metro",
        "specs": [
            {
                "startYear": 1995,
                "endYear": 2001,
                "body": "Hatchback",
                "engine": "1.0L I3",
                "engine_displacement": "993cc",
                "engine_hp": "55 HP",
                "engine_torque": "58 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "14.0s",
                "max_speed_kmh": "145km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Tracker",
        "specs": [
            {
                "startYear": 1989,
                "endYear": 1998,
                "body": "SUV",
                "engine": "1.6L I4",
                "engine_displacement": "1590cc",
                "engine_hp": "95 HP",
                "engine_torque": "98 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "13.5s",
                "max_speed_kmh": "150km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "gmc": [
    {
        "model": "Sierra",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2022,
                "body": "1500 Denali Crew Cab",
                "engine": "6.2L V8",
                "engine_displacement": "6162cc",
                "engine_hp": "420 HP",
                "engine_torque": "460 Nm",
                "transmission": "10-Speed Automatic",
                "zero_to_100_kmh": "5.4s",
                "max_speed_kmh": "180km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Yukon",
        "specs": [
            {
                "startYear": 2021,
                "endYear": 2023,
                "body": "Denali SUV",
                "engine": "6.2L V8",
                "engine_displacement": "6162cc",
                "engine_hp": "420 HP",
                "engine_torque": "460 Nm",
                "transmission": "10-Speed Automatic",
                "zero_to_100_kmh": "6.1s",
                "max_speed_kmh": "180km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "honda": [
    {
        "model": "Civic",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2021,
                "body": "Sedan",
                "engine": "1.5L Turbo I4",
                "engine_displacement": "1497cc",
                "engine_hp": "174 HP",
                "engine_torque": "162 Nm",
                "transmission": "CVT",
                "zero_to_100_kmh": "7.5s",
                "max_speed_kmh": "209km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2017,
                "endYear": 2021,
                "body": "Type R",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1996cc",
                "engine_hp": "306 HP",
                "engine_torque": "295 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "5.0s",
                "max_speed_kmh": "272km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Accord",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2022,
                "body": "Sedan",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1996cc",
                "engine_hp": "252 HP",
                "engine_torque": "273 Nm",
                "transmission": "10-Speed Automatic",
                "zero_to_100_kmh": "5.5s",
                "max_speed_kmh": "205km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "CR-V",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2022,
                "body": "SUV",
                "engine": "1.5L Turbo I4",
                "engine_displacement": "1498cc",
                "engine_hp": "190 HP",
                "engine_torque": "179 Nm",
                "transmission": "CVT",
                "zero_to_100_kmh": "7.9s",
                "max_speed_kmh": "200km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "hummer": [
    {
        "model": "H2",
        "specs": [
            {
                "startYear": 2003,
                "endYear": 2009,
                "body": "SUV",
                "engine": "6.2L V8",
                "engine_displacement": "6162cc",
                "engine_hp": "393 HP",
                "engine_torque": "415 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "9.1s",
                "max_speed_kmh": "160km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "H3",
        "specs": [
            {
                "startYear": 2006,
                "endYear": 2010,
                "body": "SUV",
                "engine": "3.7L I5",
                "engine_displacement": "3654cc",
                "engine_hp": "239 HP",
                "engine_torque": "241 Nm",
                "transmission": "4-Speed Automatic",
                "zero_to_100_kmh": "9.7s",
                "max_speed_kmh": "160km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "hyundai": [
    {
        "model": "Elantra",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2020,
                "body": "Sedan",
                "engine": "1.6L Gamma GDi",
                "engine_displacement": "1591cc",
                "engine_hp": "128 HP",
                "engine_torque": "155 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "11.6s",
                "max_speed_kmh": "195km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Sonata",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2019,
                "body": "Sedan",
                "engine": "2.0L Theta II Turbo",
                "engine_displacement": "1998cc",
                "engine_hp": "245 HP",
                "engine_torque": "260 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "7.0s",
                "max_speed_kmh": "240km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Tucson",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2021,
                "body": "SUV",
                "engine": "1.6L T-GDI",
                "engine_displacement": "1591cc",
                "engine_hp": "177 HP",
                "engine_torque": "265 Nm",
                "transmission": "7-Speed DCT",
                "zero_to_100_kmh": "9.1s",
                "max_speed_kmh": "201km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "infiniti": [
    {
        "model": "Q50",
        "specs": [
            {
                "startYear": 2014,
                "endYear": 2023,
                "body": "Sedan",
                "engine": "3.0L Twin-Turbo V6",
                "engine_displacement": "2997cc",
                "engine_hp": "300 HP",
                "engine_torque": "295 Nm",
                "transmission": "7-Speed Automatic",
                "zero_to_100_kmh": "5.4s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "QX60",
        "specs": [
            {
                "startYear": 2014,
                "endYear": 2020,
                "body": "SUV",
                "engine": "3.5L V6",
                "engine_displacement": "3498cc",
                "engine_hp": "295 HP",
                "engine_torque": "270 Nm",
                "transmission": "CVT",
                "zero_to_100_kmh": "7.1s",
                "max_speed_kmh": "190km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "isuzu": [
    {
        "model": "D-MAX",
        "specs": [
            {
                "startYear": 2012,
                "endYear": 2019,
                "body": "Pickup Truck",
                "engine": "2.5L Twin-Turbo Diesel",
                "engine_displacement": "2499cc",
                "engine_hp": "163 HP",
                "engine_torque": "400 Nm",
                "transmission": "5-Speed Automatic",
                "zero_to_100_kmh": "10.7s",
                "max_speed_kmh": "180km/h",
                "fuel": "Diesel"
            }
        ]
    },
    {
        "model": "Trooper",
        "specs": [
            {
                "startYear": 1998,
                "endYear": 2002,
                "body": "SUV",
                "engine": "3.5L V6",
                "engine_displacement": "3494cc",
                "engine_hp": "215 HP",
                "engine_torque": "230 Nm",
                "transmission": "4-Speed Automatic",
                "zero_to_100_kmh": "10.0s",
                "max_speed_kmh": "180km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "jaguar": [
    {
        "model": "F-Type",
        "specs": [
            {
                "startYear": 2014,
                "endYear": 2023,
                "body": "Coupe",
                "engine": "3.0L Supercharged V6",
                "engine_displacement": "2995cc",
                "engine_hp": "340 HP",
                "engine_torque": "332 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.1s",
                "max_speed_kmh": "260km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "XF",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2023,
                "body": "Sedan",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1999cc",
                "engine_hp": "247 HP",
                "engine_torque": "269 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "6.6s",
                "max_speed_kmh": "240km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "F-Pace",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2023,
                "body": "SUV",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1997cc",
                "engine_hp": "247 HP",
                "engine_torque": "269 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "6.4s",
                "max_speed_kmh": "217km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "jeep": [
    {
        "model": "Wrangler",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "Unlimited Rubicon (JL)",
                "engine": "3.6L V6",
                "engine_displacement": "3604cc",
                "engine_hp": "285 HP",
                "engine_torque": "260 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "7.0s",
                "max_speed_kmh": "180km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Grand Cherokee",
        "specs": [
            {
                "startYear": 2011,
                "endYear": 2021,
                "body": "SUV",
                "engine": "5.7L V8 HEMI",
                "engine_displacement": "5654cc",
                "engine_hp": "360 HP",
                "engine_torque": "390 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "6.8s",
                "max_speed_kmh": "225km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2018,
                "endYear": 2021,
                "body": "Trackhawk",
                "engine": "6.2L Supercharged V8",
                "engine_displacement": "6166cc",
                "engine_hp": "707 HP",
                "engine_torque": "645 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "3.5s",
                "max_speed_kmh": "290km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "karma": [
    {
        "model": "Revero",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2019,
                "body": "GT Sedan",
                "engine": "1.5L Turbo I3 PHEV (BMW)",
                "engine_displacement": "1499cc",
                "engine_hp": "536 HP",
                "engine_torque": "550 Nm",
                "transmission": "1-Speed Direct Drive",
                "zero_to_100_kmh": "4.5s",
                "max_speed_kmh": "201km/h",
                "fuel": "Gasoline/Hybrid"
            }
        ]
    }
],
    "kia": [
    {
        "model": "Sportage",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2022,
                "body": "SUV",
                "engine": "1.6L T-GDI",
                "engine_displacement": "1591cc",
                "engine_hp": "177 HP",
                "engine_torque": "265 Nm",
                "transmission": "7-Speed DCT",
                "zero_to_100_kmh": "9.1s",
                "max_speed_kmh": "201km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Sorento",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2020,
                "body": "SUV",
                "engine": "2.2L CRDi Diesel",
                "engine_displacement": "2199cc",
                "engine_hp": "200 HP",
                "engine_torque": "441 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "9.4s",
                "max_speed_kmh": "203km/h",
                "fuel": "Diesel"
            }
        ]
    },
    {
        "model": "Optima",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2020,
                "body": "Sedan",
                "engine": "2.0L Turbo GDI",
                "engine_displacement": "1998cc",
                "engine_hp": "245 HP",
                "engine_torque": "260 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "6.8s",
                "max_speed_kmh": "240km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "lamborghini": [
    {
        "model": "Aventador",
        "specs": [
            {
                "startYear": 2011,
                "endYear": 2021,
                "body": "LP 700-4 Coupe",
                "engine": "6.5L V12",
                "engine_displacement": "6498cc",
                "engine_hp": "691 HP",
                "engine_torque": "509 Nm",
                "transmission": "7-Speed ISR",
                "zero_to_100_kmh": "2.9s",
                "max_speed_kmh": "350km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Huracan",
        "specs": [
            {
                "startYear": 2014,
                "endYear": 2023,
                "body": "LP 610-4 Coupe",
                "engine": "5.2L V10",
                "engine_displacement": "5204cc",
                "engine_hp": "602 HP",
                "engine_torque": "413 Nm",
                "transmission": "7-Speed DCT",
                "zero_to_100_kmh": "3.2s",
                "max_speed_kmh": "325km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Urus",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "SUV",
                "engine": "4.0L Twin-Turbo V8",
                "engine_displacement": "3996cc",
                "engine_hp": "641 HP",
                "engine_torque": "627 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "3.6s",
                "max_speed_kmh": "305km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "lancia": [
    {
        "model": "Delta",
        "specs": [
            {
                "startYear": 2008,
                "endYear": 2014,
                "body": "Hatchback",
                "engine": "1.4L T-Jet",
                "engine_displacement": "1368cc",
                "engine_hp": "120 HP",
                "engine_torque": "206 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "9.8s",
                "max_speed_kmh": "195km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Ypsilon",
        "specs": [
            {
                "startYear": 2011,
                "endYear": 2023,
                "body": "Hatchback",
                "engine": "1.2L Fire",
                "engine_displacement": "1242cc",
                "engine_hp": "69 HP",
                "engine_torque": "102 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "14.5s",
                "max_speed_kmh": "163km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "land-rover": [
    {
        "model": "Range Rover",
        "specs": [
            {
                "startYear": 2013,
                "endYear": 2021,
                "body": "HSE",
                "engine": "3.0L Supercharged V6",
                "engine_displacement": "2995cc",
                "engine_hp": "340 HP",
                "engine_torque": "332 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "7.1s",
                "max_speed_kmh": "209km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2013,
                "endYear": 2021,
                "body": "SVAutobiography",
                "engine": "5.0L Supercharged V8",
                "engine_displacement": "5000cc",
                "engine_hp": "557 HP",
                "engine_torque": "516 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.1s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Defender",
        "specs": [
            {
                "startYear": 2020,
                "endYear": 2023,
                "body": "110",
                "engine": "3.0L Turbo I6 MHEV",
                "engine_displacement": "2996cc",
                "engine_hp": "395 HP",
                "engine_torque": "406 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.8s",
                "max_speed_kmh": "191km/h",
                "fuel": "Gasoline/Hybrid"
            }
        ]
    },
    {
        "model": "Discovery",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2020,
                "body": "SUV",
                "engine": "3.0L Supercharged V6",
                "engine_displacement": "2995cc",
                "engine_hp": "340 HP",
                "engine_torque": "332 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "6.9s",
                "max_speed_kmh": "209km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "lexus": [
    {
        "model": "IS",
        "specs": [
            {
                "startYear": 2014,
                "endYear": 2020,
                "body": "IS 350 Sedan",
                "engine": "3.5L V6",
                "engine_displacement": "3456cc",
                "engine_hp": "306 HP",
                "engine_torque": "277 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.6s",
                "max_speed_kmh": "230km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "ES",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "ES 350 Sedan",
                "engine": "3.5L V6",
                "engine_displacement": "3456cc",
                "engine_hp": "302 HP",
                "engine_torque": "267 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "6.6s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "RX",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2022,
                "body": "RX 350 SUV",
                "engine": "3.5L V6",
                "engine_displacement": "3456cc",
                "engine_hp": "295 HP",
                "engine_torque": "268 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "7.7s",
                "max_speed_kmh": "200km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "lincoln": [
    {
        "model": "Navigator",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "SUV",
                "engine": "3.5L Twin-Turbo V6",
                "engine_displacement": "3496cc",
                "engine_hp": "450 HP",
                "engine_torque": "510 Nm",
                "transmission": "10-Speed Automatic",
                "zero_to_100_kmh": "5.5s",
                "max_speed_kmh": "185km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Aviator",
        "specs": [
            {
                "startYear": 2020,
                "endYear": 2023,
                "body": "SUV",
                "engine": "3.0L Twin-Turbo V6",
                "engine_displacement": "2956cc",
                "engine_hp": "400 HP",
                "engine_torque": "415 Nm",
                "transmission": "10-Speed Automatic",
                "zero_to_100_kmh": "5.4s",
                "max_speed_kmh": "230km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "lotus": [
    {
        "model": "Elise",
        "specs": [
            {
                "startYear": 2011,
                "endYear": 2021,
                "body": "Sport 220",
                "engine": "1.8L Supercharged I4",
                "engine_displacement": "1798cc",
                "engine_hp": "217 HP",
                "engine_torque": "184 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "4.2s",
                "max_speed_kmh": "233km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Exige",
        "specs": [
            {
                "startYear": 2012,
                "endYear": 2021,
                "body": "Sport 410",
                "engine": "3.5L Supercharged V6",
                "engine_displacement": "3456cc",
                "engine_hp": "410 HP",
                "engine_torque": "310 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "3.3s",
                "max_speed_kmh": "290km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "maserati": [
    {
        "model": "Ghibli",
        "specs": [
            {
                "startYear": 2014,
                "endYear": 2023,
                "body": "S Q4 Sedan",
                "engine": "3.0L Twin-Turbo V6",
                "engine_displacement": "2979cc",
                "engine_hp": "424 HP",
                "engine_torque": "428 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "4.7s",
                "max_speed_kmh": "286km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Levante",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2023,
                "body": "SUV",
                "engine": "3.0L Twin-Turbo V6",
                "engine_displacement": "2979cc",
                "engine_hp": "345 HP",
                "engine_torque": "369 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.8s",
                "max_speed_kmh": "251km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "maybach": [
    {
        "model": "57",
        "specs": [
            {
                "startYear": 2002,
                "endYear": 2012,
                "body": "Sedan",
                "engine": "5.5L Twin-Turbo V12",
                "engine_displacement": "5513cc",
                "engine_hp": "543 HP",
                "engine_torque": "664 Nm",
                "transmission": "5-Speed Automatic",
                "zero_to_100_kmh": "5.2s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "62",
        "specs": [
            {
                "startYear": 2002,
                "endYear": 2012,
                "body": "Sedan",
                "engine": "6.0L Twin-Turbo V12",
                "engine_displacement": "5980cc",
                "engine_hp": "604 HP",
                "engine_torque": "738 Nm",
                "transmission": "5-Speed Automatic",
                "zero_to_100_kmh": "5.0s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "mazda": [
    {
        "model": "Mazda3",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "Hatchback",
                "engine": "2.5L Skyactiv-G I4",
                "engine_displacement": "2488cc",
                "engine_hp": "186 HP",
                "engine_torque": "186 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "7.9s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Mazda6",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2021,
                "body": "Sedan",
                "engine": "2.5L Skyactiv-G Turbo I4",
                "engine_displacement": "2488cc",
                "engine_hp": "250 HP",
                "engine_torque": "310 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "6.4s",
                "max_speed_kmh": "240km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "CX-5",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2023,
                "body": "SUV",
                "engine": "2.5L Skyactiv-G I4",
                "engine_displacement": "2488cc",
                "engine_hp": "187 HP",
                "engine_torque": "186 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "8.6s",
                "max_speed_kmh": "200km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "mclaren": [
    {
        "model": "720S",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2022,
                "body": "Coupe",
                "engine": "4.0L Twin-Turbo V8",
                "engine_displacement": "3994cc",
                "engine_hp": "710 HP",
                "engine_torque": "568 Nm",
                "transmission": "7-Speed DCT",
                "zero_to_100_kmh": "2.9s",
                "max_speed_kmh": "341km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "570S",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2021,
                "body": "Coupe",
                "engine": "3.8L Twin-Turbo V8",
                "engine_displacement": "3799cc",
                "engine_hp": "562 HP",
                "engine_torque": "443 Nm",
                "transmission": "7-Speed DCT",
                "zero_to_100_kmh": "3.2s",
                "max_speed_kmh": "328km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "mercedes-benz": [
    {
        "model": "C-Class",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2021,
                "body": "C 300 Sedan (W205)",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1991cc",
                "engine_hp": "255 HP",
                "engine_torque": "273 Nm",
                "transmission": "9-Speed Automatic",
                "zero_to_100_kmh": "5.9s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "E-Class",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2023,
                "body": "E 300 Sedan (W213)",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1991cc",
                "engine_hp": "241 HP",
                "engine_torque": "273 Nm",
                "transmission": "9-Speed Automatic",
                "zero_to_100_kmh": "6.2s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "S-Class",
        "specs": [
            {
                "startYear": 2014,
                "endYear": 2020,
                "body": "S 560 Sedan (W222)",
                "engine": "4.0L Twin-Turbo V8",
                "engine_displacement": "3982cc",
                "engine_hp": "463 HP",
                "engine_torque": "516 Nm",
                "transmission": "9-Speed Automatic",
                "zero_to_100_kmh": "4.6s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "G-Class",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "G 550 SUV (W463)",
                "engine": "4.0L Twin-Turbo V8",
                "engine_displacement": "3982cc",
                "engine_hp": "416 HP",
                "engine_torque": "450 Nm",
                "transmission": "9-Speed Automatic",
                "zero_to_100_kmh": "5.6s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "mercury": [
    {
        "model": "Grand Marquis",
        "specs": [
            {
                "startYear": 1998,
                "endYear": 2011,
                "body": "Sedan",
                "engine": "4.6L V8",
                "engine_displacement": "4601cc",
                "engine_hp": "224 HP",
                "engine_torque": "275 Nm",
                "transmission": "4-Speed Automatic",
                "zero_to_100_kmh": "8.5s",
                "max_speed_kmh": "180km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Sable",
        "specs": [
            {
                "startYear": 2000,
                "endYear": 2005,
                "body": "Sedan",
                "engine": "3.0L V6",
                "engine_displacement": "2986cc",
                "engine_hp": "200 HP",
                "engine_torque": "200 Nm",
                "transmission": "4-Speed Automatic",
                "zero_to_100_kmh": "8.7s",
                "max_speed_kmh": "180km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "merkur": [
    {
        "model": "XR4Ti",
        "specs": [
            {
                "startYear": 1985,
                "endYear": 1989,
                "body": "Hatchback",
                "engine": "2.3L Turbo I4",
                "engine_displacement": "2301cc",
                "engine_hp": "175 HP",
                "engine_torque": "200 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "7.8s",
                "max_speed_kmh": "217km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "mini": [
    {
        "model": "Cooper",
        "specs": [
            {
                "startYear": 2014,
                "endYear": 2023,
                "body": "Hardtop 2 Door S",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1998cc",
                "engine_hp": "189 HP",
                "engine_torque": "207 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "6.4s",
                "max_speed_kmh": "235km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Countryman",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2023,
                "body": "Cooper S ALL4",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1998cc",
                "engine_hp": "189 HP",
                "engine_torque": "207 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "7.0s",
                "max_speed_kmh": "222km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "mitsubishi": [
    {
        "model": "Lancer",
        "specs": [
            {
                "startYear": 2008,
                "endYear": 2015,
                "body": "Evolution X",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1998cc",
                "engine_hp": "291 HP",
                "engine_torque": "300 Nm",
                "transmission": "6-Speed TC-SST",
                "zero_to_100_kmh": "4.9s",
                "max_speed_kmh": "242km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Outlander",
        "specs": [
            {
                "startYear": 2014,
                "endYear": 2020,
                "body": "SUV",
                "engine": "2.4L I4",
                "engine_displacement": "2360cc",
                "engine_hp": "166 HP",
                "engine_torque": "162 Nm",
                "transmission": "CVT",
                "zero_to_100_kmh": "9.2s",
                "max_speed_kmh": "198km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Pajero",
        "specs": [
            {
                "startYear": 2006,
                "endYear": 2021,
                "body": "SUV",
                "engine": "3.2L DI-D Diesel",
                "engine_displacement": "3200cc",
                "engine_hp": "190 HP",
                "engine_torque": "441 Nm",
                "transmission": "5-Speed Automatic",
                "zero_to_100_kmh": "11.1s",
                "max_speed_kmh": "185km/h",
                "fuel": "Diesel"
            }
        ]
    }
],
    "nissan": [
    {
        "model": "Altima",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "Sedan",
                "engine": "2.5L I4",
                "engine_displacement": "2488cc",
                "engine_hp": "188 HP",
                "engine_torque": "180 Nm",
                "transmission": "CVT",
                "zero_to_100_kmh": "7.8s",
                "max_speed_kmh": "215km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Rogue",
        "specs": [
            {
                "startYear": 2014,
                "endYear": 2020,
                "body": "SUV",
                "engine": "2.5L I4",
                "engine_displacement": "2488cc",
                "engine_hp": "170 HP",
                "engine_torque": "175 Nm",
                "transmission": "CVT",
                "zero_to_100_kmh": "9.1s",
                "max_speed_kmh": "190km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "GT-R",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2023,
                "body": "Premium Coupe",
                "engine": "3.8L Twin-Turbo V6",
                "engine_displacement": "3799cc",
                "engine_hp": "565 HP",
                "engine_torque": "467 Nm",
                "transmission": "6-Speed DCT",
                "zero_to_100_kmh": "2.9s",
                "max_speed_kmh": "315km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "oldsmobile": [
    {
        "model": "Cutlass",
        "specs": [
            {
                "startYear": 1997,
                "endYear": 1999,
                "body": "Sedan",
                "engine": "3.1L V6",
                "engine_displacement": "3136cc",
                "engine_hp": "150 HP",
                "engine_torque": "185 Nm",
                "transmission": "4-Speed Automatic",
                "zero_to_100_kmh": "9.5s",
                "max_speed_kmh": "180km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Alero",
        "specs": [
            {
                "startYear": 1999,
                "endYear": 2004,
                "body": "Sedan",
                "engine": "3.4L V6",
                "engine_displacement": "3350cc",
                "engine_hp": "170 HP",
                "engine_torque": "200 Nm",
                "transmission": "4-Speed Automatic",
                "zero_to_100_kmh": "8.9s",
                "max_speed_kmh": "190km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "opel": [
    {
        "model": "Astra",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2021,
                "body": "Hatchback",
                "engine": "1.4L Turbo",
                "engine_displacement": "1399cc",
                "engine_hp": "150 HP",
                "engine_torque": "245 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "8.5s",
                "max_speed_kmh": "215km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Corsa",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "Hatchback",
                "engine": "1.2L Turbo",
                "engine_displacement": "1199cc",
                "engine_hp": "100 HP",
                "engine_torque": "205 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "9.9s",
                "max_speed_kmh": "192km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Insignia",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2022,
                "body": "Grand Sport",
                "engine": "1.6L Turbo D",
                "engine_displacement": "1598cc",
                "engine_hp": "136 HP",
                "engine_torque": "320 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "10.5s",
                "max_speed_kmh": "205km/h",
                "fuel": "Diesel"
            }
        ]
    }
],
    "panoz": [
    {
        "model": "Esperante",
        "specs": [
            {
                "startYear": 2000,
                "endYear": 2007,
                "body": "GTLM",
                "engine": "5.4L Supercharged V8",
                "engine_displacement": "5408cc",
                "engine_hp": "500 HP",
                "engine_torque": "480 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "4.0s",
                "max_speed_kmh": "290km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "peugeot": [
    {
        "model": "208",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "Hatchback",
                "engine": "1.2L PureTech",
                "engine_displacement": "1199cc",
                "engine_hp": "100 HP",
                "engine_torque": "205 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "10.8s",
                "max_speed_kmh": "188km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "308",
        "specs": [
            {
                "startYear": 2013,
                "endYear": 2021,
                "body": "Hatchback",
                "engine": "1.6L BlueHDi",
                "engine_displacement": "1560cc",
                "engine_hp": "120 HP",
                "engine_torque": "300 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "9.5s",
                "max_speed_kmh": "196km/h",
                "fuel": "Diesel"
            }
        ]
    },
    {
        "model": "3008",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2023,
                "body": "SUV",
                "engine": "1.6L THP",
                "engine_displacement": "1598cc",
                "engine_hp": "165 HP",
                "engine_torque": "240 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "8.9s",
                "max_speed_kmh": "206km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "508",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "Fastback",
                "engine": "1.6L PureTech",
                "engine_displacement": "1598cc",
                "engine_hp": "225 HP",
                "engine_torque": "300 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "7.3s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "plymouth": [
    {
        "model": "Prowler",
        "specs": [
            {
                "startYear": 1997,
                "endYear": 2002,
                "body": "Roadster",
                "engine": "3.5L V6",
                "engine_displacement": "3518cc",
                "engine_hp": "253 HP",
                "engine_torque": "255 Nm",
                "transmission": "4-Speed Autostick",
                "zero_to_100_kmh": "5.9s",
                "max_speed_kmh": "190km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Neon",
        "specs": [
            {
                "startYear": 1995,
                "endYear": 2001,
                "body": "Sedan",
                "engine": "2.0L I4",
                "engine_displacement": "1996cc",
                "engine_hp": "132 HP",
                "engine_torque": "130 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "8.5s",
                "max_speed_kmh": "200km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "pontiac": [
    {
        "model": "GTO",
        "specs": [
            {
                "startYear": 2004,
                "endYear": 2006,
                "body": "Coupe",
                "engine": "6.0L V8",
                "engine_displacement": "5967cc",
                "engine_hp": "400 HP",
                "engine_torque": "400 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "4.7s",
                "max_speed_kmh": "257km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Firebird",
        "specs": [
            {
                "startYear": 1993,
                "endYear": 2002,
                "body": "Trans Am",
                "engine": "5.7L V8 (LS1)",
                "engine_displacement": "5665cc",
                "engine_hp": "310 HP",
                "engine_torque": "340 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "5.2s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "porsche": [
    {
        "model": "911",
        "specs": [
            {
                "startYear": 2020,
                "endYear": 2023,
                "body": "Carrera S (992)",
                "engine": "3.0L Twin-Turbo Flat-6",
                "engine_displacement": "2981cc",
                "engine_hp": "443 HP",
                "engine_torque": "390 Nm",
                "transmission": "8-Speed PDK",
                "zero_to_100_kmh": "3.5s",
                "max_speed_kmh": "308km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2020,
                "endYear": 2023,
                "body": "Turbo S (992)",
                "engine": "3.8L Twin-Turbo Flat-6",
                "engine_displacement": "3745cc",
                "engine_hp": "640 HP",
                "engine_torque": "590 Nm",
                "transmission": "8-Speed PDK",
                "zero_to_100_kmh": "2.6s",
                "max_speed_kmh": "330km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Cayenne",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "SUV",
                "engine": "3.0L Turbo V6",
                "engine_displacement": "2995cc",
                "engine_hp": "335 HP",
                "engine_torque": "332 Nm",
                "transmission": "8-Speed Tiptronic S",
                "zero_to_100_kmh": "5.9s",
                "max_speed_kmh": "245km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Panamera",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2023,
                "body": "4S",
                "engine": "2.9L Twin-Turbo V6",
                "engine_displacement": "2894cc",
                "engine_hp": "440 HP",
                "engine_torque": "405 Nm",
                "transmission": "8-Speed PDK",
                "zero_to_100_kmh": "4.2s",
                "max_speed_kmh": "289km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "ram": [
    {
        "model": "1500",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "Crew Cab",
                "engine": "5.7L V8 HEMI",
                "engine_displacement": "5654cc",
                "engine_hp": "395 HP",
                "engine_torque": "410 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "6.1s",
                "max_speed_kmh": "170km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2021,
                "endYear": 2023,
                "body": "TRX",
                "engine": "6.2L Supercharged V8",
                "engine_displacement": "6166cc",
                "engine_hp": "702 HP",
                "engine_torque": "650 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "4.5s",
                "max_speed_kmh": "190km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "renault": [
    {
        "model": "Clio",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "Hatchback",
                "engine": "1.0L TCe",
                "engine_displacement": "999cc",
                "engine_hp": "100 HP",
                "engine_torque": "160 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "11.8s",
                "max_speed_kmh": "187km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Megane",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2022,
                "body": "Hatchback",
                "engine": "1.3L TCe",
                "engine_displacement": "1332cc",
                "engine_hp": "140 HP",
                "engine_torque": "240 Nm",
                "transmission": "7-Speed EDC",
                "zero_to_100_kmh": "9.2s",
                "max_speed_kmh": "205km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2016,
                "endYear": 2022,
                "body": "Sedan",
                "engine": "1.5L dCi",
                "engine_displacement": "1461cc",
                "engine_hp": "115 HP",
                "engine_torque": "260 Nm",
                "transmission": "7-Speed EDC",
                "zero_to_100_kmh": "11.1s",
                "max_speed_kmh": "190km/h",
                "fuel": "Diesel"
            }
        ]
    },
    {
        "model": "Captur",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "SUV",
                "engine": "1.3L TCe",
                "engine_displacement": "1333cc",
                "engine_hp": "130 HP",
                "engine_torque": "240 Nm",
                "transmission": "7-Speed EDC",
                "zero_to_100_kmh": "9.6s",
                "max_speed_kmh": "195km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "rolls-royce": [
    {
        "model": "Phantom",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2023,
                "body": "Sedan",
                "engine": "6.75L Twin-Turbo V12",
                "engine_displacement": "6749cc",
                "engine_hp": "563 HP",
                "engine_torque": "664 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.3s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Ghost",
        "specs": [
            {
                "startYear": 2020,
                "endYear": 2023,
                "body": "Sedan",
                "engine": "6.75L Twin-Turbo V12",
                "engine_displacement": "6749cc",
                "engine_hp": "563 HP",
                "engine_torque": "627 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "4.8s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Cullinan",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "SUV",
                "engine": "6.75L Twin-Turbo V12",
                "engine_displacement": "6749cc",
                "engine_hp": "563 HP",
                "engine_torque": "627 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.2s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "saab": [
    {
        "model": "9-3",
        "specs": [
            {
                "startYear": 2003,
                "endYear": 2011,
                "body": "Aero Sedan",
                "engine": "2.8L Turbo V6",
                "engine_displacement": "2792cc",
                "engine_hp": "250 HP",
                "engine_torque": "258 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "6.9s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "9-5",
        "specs": [
            {
                "startYear": 2010,
                "endYear": 2012,
                "body": "Aero Sedan",
                "engine": "2.8L Turbo V6",
                "engine_displacement": "2792cc",
                "engine_hp": "300 HP",
                "engine_torque": "295 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "6.9s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "saturn": [
    {
        "model": "Ion",
        "specs": [
            {
                "startYear": 2004,
                "endYear": 2007,
                "body": "Red Line Coupe",
                "engine": "2.0L Supercharged I4",
                "engine_displacement": "1998cc",
                "engine_hp": "205 HP",
                "engine_torque": "200 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "6.3s",
                "max_speed_kmh": "225km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Sky",
        "specs": [
            {
                "startYear": 2007,
                "endYear": 2010,
                "body": "Red Line Roadster",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1998cc",
                "engine_hp": "260 HP",
                "engine_torque": "260 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "5.5s",
                "max_speed_kmh": "227km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "scion": [
    {
        "model": "FR-S",
        "specs": [
            {
                "startYear": 2013,
                "endYear": 2016,
                "body": "Coupe",
                "engine": "2.0L Flat-4",
                "engine_displacement": "1998cc",
                "engine_hp": "200 HP",
                "engine_torque": "151 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "6.5s",
                "max_speed_kmh": "225km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "tC",
        "specs": [
            {
                "startYear": 2011,
                "endYear": 2016,
                "body": "Coupe",
                "engine": "2.5L I4",
                "engine_displacement": "2494cc",
                "engine_hp": "179 HP",
                "engine_torque": "172 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "7.3s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "seat": [
    {
        "model": "Ibiza",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2023,
                "body": "Hatchback",
                "engine": "1.0L TSI",
                "engine_displacement": "999cc",
                "engine_hp": "115 HP",
                "engine_torque": "200 Nm",
                "transmission": "7-Speed DSG",
                "zero_to_100_kmh": "9.5s",
                "max_speed_kmh": "193km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Leon",
        "specs": [
            {
                "startYear": 2020,
                "endYear": 2023,
                "body": "Hatchback",
                "engine": "1.5L TSI",
                "engine_displacement": "1498cc",
                "engine_hp": "150 HP",
                "engine_torque": "250 Nm",
                "transmission": "7-Speed DSG",
                "zero_to_100_kmh": "8.4s",
                "max_speed_kmh": "221km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "skoda": [
    {
        "model": "Citigo",
        "specs": [
            {
                "startYear": 2012,
                "endYear": 2020,
                "body": "Hatchback",
                "engine": "1.0L",
                "engine_displacement": "999cc",
                "engine_hp": "60 HP",
                "engine_torque": "95 Nm",
                "transmission": "5-Speed M/T",
                "zero_to_100_kmh": "14.4s",
                "max_speed_kmh": "162km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Fabia",
        "specs": [
            {
                "startYear": 2007,
                "endYear": 2014,
                "body": "Hatchback",
                "engine": "1.2L",
                "engine_displacement": "1198cc",
                "engine_hp": "70 HP",
                "engine_torque": "112 Nm",
                "transmission": "5-Speed M/T",
                "zero_to_100_kmh": "14.9s",
                "max_speed_kmh": "163km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2014,
                "endYear": 2021,
                "body": "Hatchback",
                "engine": "1.0L Turbo",
                "engine_displacement": "999cc",
                "engine_hp": "95 HP",
                "engine_torque": "160 Nm",
                "transmission": "5-Speed M/T",
                "zero_to_100_kmh": "10.8s",
                "max_speed_kmh": "187km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Octavia",
        "specs": [
            {
                "startYear": 2013,
                "endYear": 2020,
                "body": "Sedan",
                "engine": "1.0L Turbo",
                "engine_displacement": "999cc",
                "engine_hp": "115 HP",
                "engine_torque": "200 Nm",
                "transmission": "6-Speed M/T",
                "zero_to_100_kmh": "10s",
                "max_speed_kmh": "208km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2013,
                "endYear": 2020,
                "body": "Sedan",
                "engine": "1.6L Diesel",
                "engine_displacement": "1598cc",
                "engine_hp": "115 HP",
                "engine_torque": "250 Nm",
                "transmission": "5-Speed M/T",
                "zero_to_100_kmh": "10.2s",
                "max_speed_kmh": "206km/h",
                "fuel": "Diesel"
            }
        ]
    },
    {
        "model": "Superb",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2022,
                "body": "Sedan",
                "engine": "1.4L Turbo",
                "engine_displacement": "1395cc",
                "engine_hp": "150 HP",
                "engine_torque": "250 Nm",
                "transmission": "6-Speed M/T",
                "zero_to_100_kmh": "8.6s",
                "max_speed_kmh": "220km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2015,
                "endYear": 2022,
                "body": "Sedan",
                "engine": "2.0L Diesel",
                "engine_displacement": "1968cc",
                "engine_hp": "190 HP",
                "engine_torque": "400 Nm",
                "transmission": "6-Speed DSG",
                "zero_to_100_kmh": "7.7s",
                "max_speed_kmh": "235km/h",
                "fuel": "Diesel"
            }
        ]
    },
    {
        "model": "Yeti",
        "specs": [
            {
                "startYear": 2009,
                "endYear": 2017,
                "body": "SUV",
                "engine": "1.2L Turbo",
                "engine_displacement": "1197cc",
                "engine_hp": "110 HP",
                "engine_torque": "175 Nm",
                "transmission": "6-Speed M/T",
                "zero_to_100_kmh": "10.9s",
                "max_speed_kmh": "179km/h",
                "fuel": "Gasoline"
            },
            {
                "startYear": 2009,
                "endYear": 2017,
                "body": "SUV",
                "engine": "2.0L Diesel",
                "engine_displacement": "1968cc",
                "engine_hp": "150 HP",
                "engine_torque": "340 Nm",
                "transmission": "6-Speed M/T",
                "zero_to_100_kmh": "9.1s",
                "max_speed_kmh": "195km/h",
                "fuel": "Diesel"
            }
        ]
    }
],
    "smart": [
    {
        "model": "Fortwo",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2019,
                "body": "Coupe",
                "engine": "0.9L Turbo I3",
                "engine_displacement": "898cc",
                "engine_hp": "89 HP",
                "engine_torque": "100 Nm",
                "transmission": "6-Speed DCT",
                "zero_to_100_kmh": "10.4s",
                "max_speed_kmh": "155km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "spyker": [
    {
        "model": "C8",
        "specs": [
            {
                "startYear": 2000,
                "endYear": 2018,
                "body": "Aileron",
                "engine": "4.2L V8 (Audi)",
                "engine_displacement": "4163cc",
                "engine_hp": "400 HP",
                "engine_torque": "354 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "4.5s",
                "max_speed_kmh": "300km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "srt": [
    {
        "model": "Viper",
        "specs": [
            {
                "startYear": 2013,
                "endYear": 2017,
                "body": "GTS Coupe",
                "engine": "8.4L V10",
                "engine_displacement": "8390cc",
                "engine_hp": "640 HP",
                "engine_torque": "600 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "3.3s",
                "max_speed_kmh": "332km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "sterling": [
    {
        "model": "827",
        "specs": [
            {
                "startYear": 1989,
                "endYear": 1991,
                "body": "Sedan",
                "engine": "2.7L V6 (Honda)",
                "engine_displacement": "2675cc",
                "engine_hp": "160 HP",
                "engine_torque": "162 Nm",
                "transmission": "4-Speed Automatic",
                "zero_to_100_kmh": "9.0s",
                "max_speed_kmh": "205km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "subaru": [
    {
        "model": "Impreza",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2021,
                "body": "WRX STI",
                "engine": "2.5L Turbo Flat-4",
                "engine_displacement": "2457cc",
                "engine_hp": "305 HP",
                "engine_torque": "290 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "5.1s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Outback",
        "specs": [
            {
                "startYear": 2020,
                "endYear": 2023,
                "body": "Wagon",
                "engine": "2.4L Turbo Flat-4",
                "engine_displacement": "2387cc",
                "engine_hp": "260 HP",
                "engine_torque": "277 Nm",
                "transmission": "CVT",
                "zero_to_100_kmh": "6.1s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Forester",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "SUV",
                "engine": "2.5L Flat-4",
                "engine_displacement": "2498cc",
                "engine_hp": "182 HP",
                "engine_torque": "176 Nm",
                "transmission": "CVT",
                "zero_to_100_kmh": "8.5s",
                "max_speed_kmh": "200km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "suzuki": [
    {
        "model": "Swift",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2023,
                "body": "Sport",
                "engine": "1.4L Boosterjet Turbo",
                "engine_displacement": "1373cc",
                "engine_hp": "140 HP",
                "engine_torque": "230 Nm",
                "transmission": "6-Speed Manual",
                "zero_to_100_kmh": "8.1s",
                "max_speed_kmh": "210km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Vitara",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2023,
                "body": "SUV",
                "engine": "1.6L VVT",
                "engine_displacement": "1586cc",
                "engine_hp": "120 HP",
                "engine_torque": "156 Nm",
                "transmission": "5-Speed Manual",
                "zero_to_100_kmh": "11.5s",
                "max_speed_kmh": "180km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "tesla": [
    {
        "model": "Model S",
        "specs": [
            {
                "startYear": 2021,
                "endYear": 2023,
                "body": "Plaid",
                "engine": "Tri-Motor",
                "engine_displacement": "0cc",
                "engine_hp": "1020 HP",
                "engine_torque": "1050 Nm",
                "transmission": "1-Speed Direct Drive",
                "zero_to_100_kmh": "2.1s",
                "max_speed_kmh": "322km/h",
                "fuel": "Electric"
            }
        ]
    },
    {
        "model": "Model 3",
        "specs": [
            {
                "startYear": 2017,
                "endYear": 2023,
                "body": "Performance",
                "engine": "Dual-Motor",
                "engine_displacement": "0cc",
                "engine_hp": "450 HP",
                "engine_torque": "471 Nm",
                "transmission": "1-Speed Direct Drive",
                "zero_to_100_kmh": "3.3s",
                "max_speed_kmh": "261km/h",
                "fuel": "Electric"
            }
        ]
    },
    {
        "model": "Model X",
        "specs": [
            {
                "startYear": 2021,
                "endYear": 2023,
                "body": "Plaid",
                "engine": "Tri-Motor",
                "engine_displacement": "0cc",
                "engine_hp": "1020 HP",
                "engine_torque": "1050 Nm",
                "transmission": "1-Speed Direct Drive",
                "zero_to_100_kmh": "2.6s",
                "max_speed_kmh": "262km/h",
                "fuel": "Electric"
            }
        ]
    },
    {
        "model": "Model Y",
        "specs": [
            {
                "startYear": 2020,
                "endYear": 2023,
                "body": "Performance",
                "engine": "Dual-Motor",
                "engine_displacement": "0cc",
                "engine_hp": "456 HP",
                "engine_torque": "497 Nm",
                "transmission": "1-Speed Direct Drive",
                "zero_to_100_kmh": "3.7s",
                "max_speed_kmh": "250km/h",
                "fuel": "Electric"
            }
        ]
    }
],
    "toyota": [
    {
        "model": "Corolla",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "Sedan",
                "engine": "1.8L 2ZR-FAE I4",
                "engine_displacement": "1798cc",
                "engine_hp": "139 HP",
                "engine_torque": "126 Nm",
                "transmission": "CVT",
                "zero_to_100_kmh": "10.2s",
                "max_speed_kmh": "190km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Camry",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "Sedan",
                "engine": "3.5L V6",
                "engine_displacement": "3456cc",
                "engine_hp": "301 HP",
                "engine_torque": "267 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "5.8s",
                "max_speed_kmh": "220km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "RAV4",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "SUV",
                "engine": "2.5L I4",
                "engine_displacement": "2487cc",
                "engine_hp": "203 HP",
                "engine_torque": "184 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "8.2s",
                "max_speed_kmh": "200km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Hilux",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2023,
                "body": "Double Cab",
                "engine": "2.8L Diesel",
                "engine_displacement": "2755cc",
                "engine_hp": "201 HP",
                "engine_torque": "500 Nm",
                "transmission": "6-Speed Automatic",
                "zero_to_100_kmh": "10.7s",
                "max_speed_kmh": "175km/h",
                "fuel": "Diesel"
            }
        ]
    }
],
    "volkswagen": [
    {
        "model": "Golf",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2021,
                "body": "GTI (Mk7)",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1984cc",
                "engine_hp": "228 HP",
                "engine_torque": "258 Nm",
                "transmission": "7-Speed DSG",
                "zero_to_100_kmh": "5.9s",
                "max_speed_kmh": "250km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "Passat",
        "specs": [
            {
                "startYear": 2015,
                "endYear": 2022,
                "body": "Sedan (B8)",
                "engine": "2.0L TDI Diesel",
                "engine_displacement": "1968cc",
                "engine_hp": "190 HP",
                "engine_torque": "400 Nm",
                "transmission": "6-Speed DSG",
                "zero_to_100_kmh": "7.9s",
                "max_speed_kmh": "233km/h",
                "fuel": "Diesel"
            }
        ]
    },
    {
        "model": "Tiguan",
        "specs": [
            {
                "startYear": 2018,
                "endYear": 2023,
                "body": "SUV",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1984cc",
                "engine_hp": "184 HP",
                "engine_torque": "221 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "8.2s",
                "max_speed_kmh": "200km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "volvo": [
    {
        "model": "S60",
        "specs": [
            {
                "startYear": 2019,
                "endYear": 2023,
                "body": "T5 Sedan",
                "engine": "2.0L Turbo I4",
                "engine_displacement": "1969cc",
                "engine_hp": "250 HP",
                "engine_torque": "258 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "6.3s",
                "max_speed_kmh": "240km/h",
                "fuel": "Gasoline"
            }
        ]
    },
    {
        "model": "XC90",
        "specs": [
            {
                "startYear": 2016,
                "endYear": 2023,
                "body": "T6 SUV",
                "engine": "2.0L Supercharged & Turbo I4",
                "engine_displacement": "1969cc",
                "engine_hp": "316 HP",
                "engine_torque": "295 Nm",
                "transmission": "8-Speed Automatic",
                "zero_to_100_kmh": "6.1s",
                "max_speed_kmh": "230km/h",
                "fuel": "Gasoline"
            }
        ]
    }
],
    "yugo": [
    {
        "model": "GV",
        "specs": [
            {
                "startYear": 1985,
                "endYear": 1992,
                "body": "Hatchback",
                "engine": "1.1L I4",
                "engine_displacement": "1116cc",
                "engine_hp": "55 HP",
                "engine_torque": "52 Nm",
                "transmission": "4-Speed Manual",
                "zero_to_100_kmh": "16.0s",
                "max_speed_kmh": "145km/h",
                "fuel": "Gasoline"
            }
        ]
    }
]
};

const brandsData: string[] = [
    "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac",
    "Chevrolet", "Chrysler", "Citroen", "Dacia", "Daewoo", "Daihatsu", "Dodge", "Eagle", "Ferrari",
    "FIAT", "Fisker", "Ford", "Freightliner", "Genesis", "Geo", "GMC", "Honda", "HUMMER", "Hyundai",
    "Infiniti", "Isuzu", "Jaguar", "Jeep", "Karma", "Kia", "Lamborghini", "Lancia", "Land Rover",
    "Lexus", "Lincoln", "Lotus", "Maserati", "Maybach", "Mazda", "McLaren", "Mercedes-Benz", "Mercury",
    "Merkur", "MINI", "Mitsubishi", "Nissan", "Oldsmobile", "Opel", "Panoz", "Peugeot", "Plymouth",
    "Pontiac", "Porsche", "Ram", "Renault", "Rolls-Royce", "Saab", "Saturn", "Scion", "Seat", "Skoda",
    "smart", "Spyker", "SRT", "Sterling", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen",
    "Volvo", "Yugo"
].sort();


// --- API Functions for UI Dropdowns ---

export const getMakes = async (): Promise<string[]> => {
    return Promise.resolve(brandsData);
};

const getSpecsForMake = async (make: string): Promise<ModelProfile[]> => {
    const cacheKey = make.toLowerCase().replace(/ /g, '-');
    return Promise.resolve(allSpecsData[cacheKey] || []);
};

export const getModelsForMake = async (make: string): Promise<string[]> => {
    if (!make) return [];
    const specs = await getSpecsForMake(make);
    return [...new Set(specs.map(m => m.model))].sort();
};

export const getYearsForModel = async (make: string, model: string): Promise<number[]> => {
    if (!make || !model) return [];
    const specs = await getSpecsForMake(make);
    const modelData = specs.find(m => m.model === model);
    if (!modelData) return [];

    const years = new Set<number>();
    modelData.specs.forEach(spec => {
        for (let y = spec.startYear; y <= spec.endYear; y++) {
            years.add(y);
        }
    });

    return Array.from(years).sort((a, b) => b - a);
};

export const getSpecsForYear = async (make: string, model: string, year: number): Promise<SpecProfile[]> => {
    if (!make || !model || !year) return [];
    const specs = await getSpecsForMake(make);
    const modelData = specs.find(m => m.model === model);
    if (!modelData) return [];

    return modelData.specs.filter(spec => year >= spec.startYear && year <= spec.endYear);
};
