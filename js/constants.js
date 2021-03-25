// Set the url endpoint for the API
const url = 'https://graphql.anilist.co';

// Set the query for the request
const query =
`
    query ($page: Int, $search: String, $format: MediaFormat, $genres: [String], $tag: String, $sort: [MediaSort], $isAdult: Boolean) {
        Page (page: $page) {
            pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
            }
            media (search: $search, format: $format, genre_in: $genres, tag: $tag, sort: $sort, isAdult: $isAdult) {
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
        'list': ['TV', 'TV Short', 'Movie', 'Special', 'OVA',
            'ONA', 'Music', 'Manga', 'Novel', 'One Shot']
    },
    {
        'title': 'Genre',
        'default': 'All',
        'list': ['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror',
            'Mahou Shoujo', 'Mecha', 'Music', 'Mystery' , 'Psychological', 'Romance',
            'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller']
    },
    {
        'title': 'Tag',
        'default': 'None',
        'list': ["4-koma", "Achromatic", "Achronological Order", "Acting", "Advertisement", "Afterlife",
            "Age Gap", "Age Regression", "Agender", "Airsoft", "Aliens", "Alternate Universe", "American Football",
            "Amnesia", "Anachronism", "Animals", "Anthology", "Anti-Hero", "Archery", "Artificial Intelligence",
            "Asexual", "Assassins", "Astronomy", "Athletics", "Augmented Reality", "Autobiographical",
            "Aviation", "Badminton", "Band", "Bar", "Baseball", "Basketball", "Battle Royale", "Biographical",
            "Bisexual", "Body Horror", "Body Swapping", "Boxing", "Boys' Love", "Bullying", "Butler", "Calligraphy",
            "Cannibalism", "Card Battle", "Cars", "Centaur", "CGI", "Cheerleading", "Chibi", "Chimera", "Chuunibyou",
            "Circus", "Classic Literature", "College", "Coming of Age", "Conspiracy", "Cosmic Horror", "Cosplay",
            "Crime", "Crossdressing", "Crossover", "Cult", "Cultivation", "Cute Girls Doing Cute Things", "Cyberpunk",
            "Cycling", "Dancing", "Death Game", "Delinquents", "Demons", "Denpa", "Detective", "Dinosaurs", 
            "Dissociative Identities", "Dragons", "Drawing", "Drugs", "Dullahan", "Dungeon", "Dystopian", "Economics",
            "Educational", "Elf", "Ensemble Cast", "Environmental", "Episodic", "Ero Guro", "Espionage", "Fairy Tale",
            "Family Life", "Fashion", "Female Protagonist", "Firefighters", "Fishing", "Fitness", "Flash", "Food",
            "Football", "Foreign", "Fugitive", "Full CGI", "Full Color", "Gambling", "Gangs", "Gender Bending", 
            "Ghost", "Go", "Goblin", "Gods", "Golf", "Gore", "Guns", "Gyaru", "Harem", "Henshin", "Hikikomori", 
            "Historical", "Ice Skating", "Idol", "Isekai", "Iyashikei", "Josei", "Kaiju", "Karuta", "Kemonomimi", "Kids", 
            "Kuudere", "Lacrosse", "Language Barrier", "LGBTQ+ Themes", "Lost Civilization", "Love Triangle", "Mafia", 
            "Magic", "Mahjong", "Maids", "Male Protagonist", "Martial Arts", "Medicine", "Memory Manipulation", "Mermaid", 
            "Meta", "Military", "Monster Girl", "Mopeds", "Motorcycles", "Musical", "Mythology", "Nekomimi", "Ninja", 
            "No Dialogue", "Noir", "Nudity", "Nun", "Office Lady", "Oiran", "Ojou-sama", "Otaku Culture", "Outdoor",
            "Pandemic", "Parody",  "Philosophy", "Photography", "Pirates", "Poker", "Police", "Politics", "Post-Apocalyptic", 
            "POV", "Primarily Adult Cast", "Primarily Child Cast", "Primarily Female Cast", "Primarily Male Cast", "Puppetry",
            "Rakugo", "Real Robot", "Rehabilitation", "Reincarnation", "Revenge", "Reverse Harem", "Robots", "Rotoscoping",
            "Rugby", "Rural", "Samurai", "Satire", "School", "School Club", "Scuba Diving", "Seinen", "Shapeshifting", 
            "Ships", "Shogi", "Shoujo", "Shounen", "Shrine Maiden", "Skateboarding", "Skeleton", "Slapstick", "Slavery",
            "Software Development", "Space", "Space Opera", "Steampunk", "Stop Motion", "Succubus", "Super Power", 
            "Super Robot", "Superhero", "Surfing", "Surreal Comedy", "Survival", "Swimming", "Swordplay", "Table Tennis",
            "Tanks", "Tanned Skin", "Teacher", "Teens' Love", "Tennis", "Terrorism", "Time Manipulation", "Time Skip",
            "Tokusatsu", "Tomboy", "Tragedy", "Trains", "Triads", "Tsundere", "Twins", "Urban", "Urban Fantasy",
            "Vampire", "Video Games", "Vikings", "Villainess", "Virtual World", "Volleyball", "War", "Werewolf", 
            "Witch", "Work", "Wrestling", "Writing", "Wuxia","Yakuza", "Yandere", "Youkai", "Yuri", "Zombie"]
    },
    {
        'title': 'Sort By',
        'default': 'None',
        'list': ['Title', 'Score', 'Popularity', 'Trending']
    }
];