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
        'collection': [
            {
                'firstLetter': 'T',
                'list': ['TV', 'TV Short'],
            },
            {
                'firstLetter': 'M',
                'list': ['Manga', 'Movie', 'Music'],
            },
            {
                'firstLetter': 'N',
                'list': ['Novel'],
            },
            {
                'firstLetter': 'O',
                'list': ['OVA', 'ONA', 'One Shot'],
            },
            {
                'firstLetter': 'S',
                'list': ['Special'],
            }
        ],
    },
    {
        'title': 'Genre',
        'default': 'None',
        'collection': [
            {
                'firstLetter': 'A',
                'list': ['Action', 'Adventure'],
            },
            {
                'firstLetter': 'C',
                'list': ['Comedy'],
            },
            {
                'firstLetter': 'D',
                'list': ['Drama'],
            },
            {
                'firstLetter': 'E',
                'list': ['Ecchi'],
            },
            {
                'firstLetter': 'F',
                'list': ['Fantasy'],
            },
            {
                'firstLetter': 'H',
                'list': ['Horror'],
            },
            {
                'firstLetter': 'M',
                'list': ['Mahou Shoujo', 'Mecha', 'Music', 'Mystery'],
            },
            {
                'firstLetter': 'P',
                'list': ['Psychological'],
            },
            {
                'firstLetter': 'R',
                'list': ['Romance'],
            },
            {
                'firstLetter': 'S',
                'list': ['Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural'],
            },
            {
                'firstLetter': 'T',
                'list': ['Thriller'],
            },
        ],
    },
    {
        'title': 'Tag',
        'default': 'None',
        'collection': [
            {
                'firstLetter': '#',
                'list': ['4-koma'],
            },
            {
                'firstLetter': 'A',
                'list': ['Achromatic', 'Achronological Order', 'Acting', 'Advertisement', 'Afterlife',
                    'Age Gap', 'Age Regression', 'Agender', 'Airsoft', 'Aliens', 'Alternate Universe', 'American Football',
                    'Amnesia', 'Anachronism', 'Animals', 'Anthology', 'Anti-Hero', 'Archery', 'Artificial Intelligence',
                    'Asexual', 'Assassins', 'Astronomy', 'Athletics', 'Augmented Reality', 'Autobiographical',
                    'Aviation'],
            },
            {
                'firstLetter': 'B',
                'list': ['Badminton', 'Band', 'Bar', 'Baseball', 'Basketball', 'Battle Royale', 'Biographical',
                    'Bisexual', 'Body Horror', 'Body Swapping', 'Boxing', 'Boys\' Love', 'Bullying', 'Butler'],
            },
            {
                'firstLetter': 'C',
                'list': ['Calligraphy',
                    'Cannibalism', 'Card Battle', 'Cars', 'Centaur', 'CGI', 'Cheerleading', 'Chibi', 'Chimera', 'Chuunibyou',
                    'Circus', 'Classic Literature', 'College', 'Coming of Age', 'Conspiracy', 'Cosmic Horror', 'Cosplay',
                    'Crime', 'Crossdressing', 'Crossover', 'Cult', 'Cultivation', 'Cute Girls Doing Cute Things', 'Cyberpunk',
                    'Cycling'],
            },
            {
                'firstLetter': 'D',
                'list': ['Dancing', 'Death Game', 'Delinquents', 'Demons', 'Denpa', 'Detective', 'Dinosaurs', 
                    'Dissociative Identities', 'Dragons', 'Drawing', 'Drugs', 'Dullahan', 'Dungeon', 'Dystopian'],
            },
            {
                'firstLetter': 'E',
                'list': ['Economics', 'Educational', 'Elf', 'Ensemble Cast', 'Environmental', 'Episodic', 'Ero Guro', 
                    'Espionage'],
            },
            {
                'firstLetter': 'F',
                'list': ['Fairy Tale', 'Family Life', 'Fashion', 'Female Protagonist', 'Firefighters', 'Fishing', 
                    'Fitness', 'Flash', 'Food', 'Football', 'Foreign', 'Fugitive', 'Full CGI', 'Full Color'],
            },
            {
                'firstLetter': 'G',
                'list': ['Gambling', 'Gangs', 'Gender Bending', 'Ghost', 'Go', 'Goblin', 'Gods', 'Golf', 'Gore', 'Guns', 'Gyaru'],
            },
            {
                'firstLetter': 'H',
                'list': ['Harem', 'Henshin', 'Hikikomori', 'Historical'],
            },
            {
                'firstLetter': 'I',
                'list': ['Ice Skating', 'Idol', 'Isekai', 'Iyashikei'],
            },
            {
                'firstLetter': 'J',
                'list': ['Josei'],
            },
            {
                'firstLetter': 'K',
                'list': ['Kaiju', 'Karuta', 'Kemonomimi', 'Kids', 'Kuudere'],
            },
            {
                'firstLetter': 'L',
                'list': ['Lacrosse', 'Language Barrier', 'LGBTQ+ Themes', 'Lost Civilization', 'Love Triangle'],
            },
            {
                'firstLetter': 'M',
                'list': ['Mafia', 'Magic', 'Mahjong', 'Maids', 'Male Protagonist', 'Martial Arts', 'Medicine', 'Memory Manipulation', 
                    'Mermaid', 'Meta', 'Military', 'Monster Girl', 'Mopeds', 'Motorcycles', 'Musical', 'Mythology'],
            },
            {
                'firstLetter': 'N',
                'list': ['Nekomimi', 'Ninja', 'No Dialogue', 'Noir', 'Nudity', 'Nun'],
            },
            {
                'firstLetter': 'O',
                'list': ['Office Lady', 'Oiran', 'Ojou-sama', 'Otaku Culture', 'Outdoor'],
            },
            {
                'firstLetter': 'P',
                'list': ['Pandemic', 'Parody',  'Philosophy', 'Photography', 'Pirates', 'Poker', 'Police', 'Politics', 'Post-Apocalyptic', 
                    'POV', 'Primarily Adult Cast', 'Primarily Child Cast', 'Primarily Female Cast', 'Primarily Male Cast', 'Puppetry'],
            },
            {
                'firstLetter': 'R',
                'list': ['Rakugo', 'Real Robot', 'Rehabilitation', 'Reincarnation', 'Revenge', 'Reverse Harem', 'Robots', 'Rotoscoping',
                    'Rugby', 'Rural'],
            },
            {
                'firstLetter': 'S',
                'list': ['Samurai', 'Satire', 'School', 'School Club', 'Scuba Diving', 'Seinen', 'Shapeshifting', 
                    'Ships', 'Shogi', 'Shoujo', 'Shounen', 'Shrine Maiden', 'Skateboarding', 'Skeleton', 'Slapstick', 'Slavery',
                    'Software Development', 'Space', 'Space Opera', 'Steampunk', 'Stop Motion', 'Succubus', 'Super Power', 
                    'Super Robot', 'Superhero', 'Surfing', 'Surreal Comedy', 'Survival', 'Swimming', 'Swordplay'],
            },
            {
                'firstLetter': 'T',
                'list': ['Table Tennis', 'Tanks', 'Tanned Skin', 'Teacher', 'Teens\' Love', 'Tennis', 'Terrorism', 'Time Manipulation', 
                    'Time Skip', 'Tokusatsu', 'Tomboy', 'Tragedy', 'Trains', 'Triads', 'Tsundere', 'Twins'],
            },
            {
                'firstLetter': 'U',
                'list': ['Urban', 'Urban Fantasy'],
            },
            {
                'firstLetter': 'V',
                'list': ['Urban', 'Urban Fantasy','Vampire', 'Video Games', 'Vikings', 'Villainess', 'Virtual World', 'Volleyball'],
            },
            {
                'firstLetter': 'W',
                'list': ['War', 'Werewolf', 'Witch', 'Work', 'Wrestling', 'Writing', 'Wuxia'],
            },
            {
                'firstLetter': 'Y',
                'list': ['Yakuza', 'Yandere', 'Youkai', 'Yuri'],
            },
            {
                'firstLetter': 'Z',
                'list': ['Zombie'],
            },
        ],
    },
    {
        'title': 'Sort By',
        'default': 'None',
        'collection': [
            {
                'firstLetter': 'T',
                'list': ['Title', 'Trending'],
            },
            {
                'firstLetter': 'S',
                'list': ['Score'],
            },
            {
                'firstLetter': 'P',
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