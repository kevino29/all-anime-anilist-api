// Set the url endpoint for the API
const url = 'https://graphql.anilist.co';

// Set the query for the request
const query =
`
    query ($page: Int, $search: String, $format: MediaFormat, $genres: [String], 
        $tags: [String], $sort: [MediaSort], $isAdult: Boolean) {
        Page (page: $page) {
            pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
            }
            media (search: $search, format: $format, genre_in: $genres, 
                tag_in: $tags, sort: $sort, isAdult: $isAdult) {
                id
                type
                siteUrl
                tags {
                    name
                }
                title {
                    romaji
                    english
                    native
                }
                coverImage {
                    extraLarge
                    large
                    medium
                }
            }
        }
    }
`;

// Set the all the button texts
const buttonTexts = 
[
    {
        'title': 'Format',
        'default': 'All',
        'multi-select': false,
        'collection': [
            {
                'category': 'T',
                'list': ['TV', 'TV Short'],
            },
            {
                'category': 'M',
                'list': ['Manga', 'Movie', 'Music'],
            },
            {
                'category': 'N',
                'list': ['Novel'],
            },
            {
                'category': 'O',
                'list': ['OVA', 'ONA', 'One Shot'],
            },
            {
                'category': 'S',
                'list': ['Special'],
            }
        ],
    },
    {
        'title': 'Status',
        'default': 'All',
        'multi-select': false,
        'collection': [
            {
                'category': 'All Status',
                'list': ['Finished', 'Releasing', 'Not Yet Released', 'Cancelled', 'Hiatus'],
            }
        ]
    },
    {
        'title': 'Season',
        'default': 'All',
        'multi-select': false,
        'collection': [
            {
                'category': 'All Seasons',
                'list': ['Winter', 'Spring', 'Summer', 'Fall'],
            }
        ]
    },
    {
        'title': 'Year',
        'default': 'All',
        'multi-select': true,
        'collection': [
            {
                'category': '2020s',
                'list': ['2022','2021','2020'],
            },
            {
                'category': '2010s',
                'list': ['2019','2018','2017','2016','2015','2014','2013','2012','2011','2010'],
            },
            {
                'category': '2000s',
                'list': ['2009','2008','2007','2006','2005','2004','2003','2002','2001','2000'],
            },
            {
                'category': '1990s',
                'list': ['1999','1998','1997','1996','1995','1994','1993','1992','1991','1990'],
            },
            {
                'category': '1980s',
                'list': ['1989','1988','1987','1986','1985','1984','1983','1982','1981','1980'],
            },
            {
                'category': '1970s',
                'list': ['1979','1978','1977','1976','1975','1974','1973','1972','1971','1970'],
            },
            {
                'category': '1960s',
                'list': ['1969','1968','1967','1966','1965','1964','1963','1962','1961','1960'],
            },
            {
                'category': '1950s',
                'list': ['1959','1958','1957','1956','1955','1954','1953','1952','1951','1950'],
            },
            {
                'category': '1940s',
                'list': ['1949','1948','1947','1946','1945','1944','1943','1942','1941','1940'],
            },
            {
                'category': '1930s',
                'list': ['1939','1938','1937','1936','1935','1934','1933','1932','1931','1930'],
            },
            {
                'category': '1920s',
                'list': ['1929','1928','1927','1926','1925','1924','1923','1922','1921','1920'],
            },
            {
                'category': '1910s',
                'list': ['1919','1918','1917','1916','1915','1914','1913','1912','1911','1910'],
            },
            {
                'category': '1900s',
                'list': ['1909','1908','1907'],
            },
        ]
    },
    {
        'title': 'Genre',
        'default': 'None',
        'multi-select': true,
        'collection': [
            {
                'category': 'A',
                'list': ['Action', 'Adventure'],
            },
            {
                'category': 'C',
                'list': ['Comedy'],
            },
            {
                'category': 'D',
                'list': ['Drama'],
            },
            {
                'category': 'E',
                'list': ['Ecchi'],
            },
            {
                'category': 'F',
                'list': ['Fantasy'],
            },
            {
                'category': 'H',
                'list': ['Horror'],
            },
            {
                'category': 'M',
                'list': ['Mahou Shoujo', 'Mecha', 'Music', 'Mystery'],
            },
            {
                'category': 'P',
                'list': ['Psychological'],
            },
            {
                'category': 'R',
                'list': ['Romance'],
            },
            {
                'category': 'S',
                'list': ['Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural'],
            },
            {
                'category': 'T',
                'list': ['Thriller'],
            },
        ],
    },
    {
        'title': 'Tag',
        'default': 'None',
        'multi-select': true,
        'collection': [
            {
                'category': '#',
                'list': ['4-koma'],
            },
            {
                'category': 'A',
                'list': ['Achromatic', 'Achronological Order', 'Acting', 'Advertisement', 'Afterlife',
                    'Age Gap', 'Age Regression', 'Agender', 'Airsoft', 'Aliens', 'Alternate Universe', 'American Football',
                    'Amnesia', 'Anachronism', 'Animals', 'Anthology', 'Anti-Hero', 'Archery', 'Artificial Intelligence',
                    'Asexual', 'Assassins', 'Astronomy', 'Athletics', 'Augmented Reality', 'Autobiographical',
                    'Aviation'],
            },
            {
                'category': 'B',
                'list': ['Badminton', 'Band', 'Bar', 'Baseball', 'Basketball', 'Battle Royale', 'Biographical',
                    'Bisexual', 'Body Horror', 'Body Swapping', 'Boxing', 'Boys\' Love', 'Bullying', 'Butler'],
            },
            {
                'category': 'C',
                'list': ['Calligraphy',
                    'Cannibalism', 'Card Battle', 'Cars', 'Centaur', 'CGI', 'Cheerleading', 'Chibi', 'Chimera', 'Chuunibyou',
                    'Circus', 'Classic Literature', 'College', 'Coming of Age', 'Conspiracy', 'Cosmic Horror', 'Cosplay',
                    'Crime', 'Crossdressing', 'Crossover', 'Cult', 'Cultivation', 'Cute Girls Doing Cute Things', 'Cyberpunk',
                    'Cycling'],
            },
            {
                'category': 'D',
                'list': ['Dancing', 'Death Game', 'Delinquents', 'Demons', 'Denpa', 'Detective', 'Dinosaurs', 
                    'Dissociative Identities', 'Dragons', 'Drawing', 'Drugs', 'Dullahan', 'Dungeon', 'Dystopian'],
            },
            {
                'category': 'E',
                'list': ['Economics', 'Educational', 'Elf', 'Ensemble Cast', 'Environmental', 'Episodic', 'Ero Guro', 
                    'Espionage'],
            },
            {
                'category': 'F',
                'list': ['Fairy Tale', 'Family Life', 'Fashion', 'Female Protagonist', 'Firefighters', 'Fishing', 
                    'Fitness', 'Flash', 'Food', 'Football', 'Foreign', 'Fugitive', 'Full CGI', 'Full Color'],
            },
            {
                'category': 'G',
                'list': ['Gambling', 'Gangs', 'Gender Bending', 'Ghost', 'Go', 'Goblin', 'Gods', 'Golf', 'Gore', 'Guns', 'Gyaru'],
            },
            {
                'category': 'H',
                'list': ['Harem', 'Henshin', 'Hikikomori', 'Historical'],
            },
            {
                'category': 'I',
                'list': ['Ice Skating', 'Idol', 'Isekai', 'Iyashikei'],
            },
            {
                'category': 'J',
                'list': ['Josei'],
            },
            {
                'category': 'K',
                'list': ['Kaiju', 'Karuta', 'Kemonomimi', 'Kids', 'Kuudere'],
            },
            {
                'category': 'L',
                'list': ['Lacrosse', 'Language Barrier', 'LGBTQ+ Themes', 'Lost Civilization', 'Love Triangle'],
            },
            {
                'category': 'M',
                'list': ['Mafia', 'Magic', 'Mahjong', 'Maids', 'Male Protagonist', 'Martial Arts', 'Medicine', 'Memory Manipulation', 
                    'Mermaid', 'Meta', 'Military', 'Monster Girl', 'Mopeds', 'Motorcycles', 'Musical', 'Mythology'],
            },
            {
                'category': 'N',
                'list': ['Nekomimi', 'Ninja', 'No Dialogue', 'Noir', 'Nudity', 'Nun'],
            },
            {
                'category': 'O',
                'list': ['Office Lady', 'Oiran', 'Ojou-sama', 'Otaku Culture', 'Outdoor'],
            },
            {
                'category': 'P',
                'list': ['Pandemic', 'Parody',  'Philosophy', 'Photography', 'Pirates', 'Poker', 'Police', 'Politics', 'Post-Apocalyptic', 
                    'POV', 'Primarily Adult Cast', 'Primarily Child Cast', 'Primarily Female Cast', 'Primarily Male Cast', 'Puppetry'],
            },
            {
                'category': 'R',
                'list': ['Rakugo', 'Real Robot', 'Rehabilitation', 'Reincarnation', 'Revenge', 'Reverse Harem', 'Robots', 'Rotoscoping',
                    'Rugby', 'Rural'],
            },
            {
                'category': 'S',
                'list': ['Samurai', 'Satire', 'School', 'School Club', 'Scuba Diving', 'Seinen', 'Shapeshifting', 
                    'Ships', 'Shogi', 'Shoujo', 'Shounen', 'Shrine Maiden', 'Skateboarding', 'Skeleton', 'Slapstick', 'Slavery',
                    'Software Development', 'Space', 'Space Opera', 'Steampunk', 'Stop Motion', 'Succubus', 'Super Power', 
                    'Super Robot', 'Superhero', 'Surfing', 'Surreal Comedy', 'Survival', 'Swimming', 'Swordplay'],
            },
            {
                'category': 'T',
                'list': ['Table Tennis', 'Tanks', 'Tanned Skin', 'Teacher', 'Teens\' Love', 'Tennis', 'Terrorism', 'Time Manipulation', 
                    'Time Skip', 'Tokusatsu', 'Tomboy', 'Tragedy', 'Trains', 'Triads', 'Tsundere', 'Twins'],
            },
            {
                'category': 'U',
                'list': ['Urban', 'Urban Fantasy'],
            },
            {
                'category': 'V',
                'list': ['Urban', 'Urban Fantasy','Vampire', 'Video Games', 'Vikings', 'Villainess', 'Virtual World', 'Volleyball'],
            },
            {
                'category': 'W',
                'list': ['War', 'Werewolf', 'Witch', 'Work', 'Wrestling', 'Writing', 'Wuxia'],
            },
            {
                'category': 'Y',
                'list': ['Yakuza', 'Yandere', 'Youkai', 'Yuri'],
            },
            {
                'category': 'Z',
                'list': ['Zombie'],
            },
        ],
    },
    {
        'title': 'Sort By',
        'default': 'None',
        'multi-select': false,
        'collection': [
            {
                'category': 'T',
                'list': ['Title', 'Trending'],
            },
            {
                'category': 'S',
                'list': ['Score'],
            },
            {
                'category': 'P',
                'list': ['Popularity'],
            },
        ],
    }
];

// Set all the tooltip constants
const tooltips = [
    {
        'forLabel': 'OVA',
        'tooltip': 'Original Video Animation',
    },
    {
        'forLabel': 'ONA',
        'tooltip': 'Original Net Animation',
    },
    {
        'forLabel': 'Mahou Shoujo',
        'tooltip': 'English: Magical Girl'
    },
];