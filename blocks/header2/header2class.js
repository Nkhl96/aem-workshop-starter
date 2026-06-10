export default class HeaderMenu2 extends HTMLElement {
  constructor() {
    super();
    this.enableV2 = true;
    this.variation = 'transparent';
    this.teqLogo = {
      src: 'https://www.queensland.com/content/dam/teq/consumer/global/logos/26Queensland_dark teal.svg',
      alt: null,
      link: null,
      quality: 0.0,
    };
    this.teqLogoWhite = {
      src: 'https://www.queensland.com/content/dam/teq/consumer/global/logos/26Queensland_white.svg',
      alt: null,
      link: null,
      quality: 0.0,
    };
    this.searchResultsPage = 'https://www.queensland.com/au/en/info/search';
    this.backText = 'Back';
    this.cancelText = 'Cancel';
    this.suggestedText = 'Suggested';
    this.popularSearchesText = 'Popular search topics';
    this.searchForText = 'Search For';
    this.menuItems = [
      {
        link: {
          href: 'https://www.queensland.com/au/en/places-to-see',
          target: '_self',
        },
        title: 'Places to Go',
        hasChildren: false,
        isActive: false,
        isMainHeading: false,
        imageGrid: {
          gridTitle: 'Hotspots',
          imageRatio: '3x2',
          enlargeFirstImage: false,
          grid: [
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/brisbane/blog-images/2018_BNE_NewFarmPark_139224.jpg',
              imageTitle: 'Best places to see Jacarandas',
              imageLink: 'https://www.queensland.com/au/en/places-to-see/experiences/nature-and-wildlife/these-are-the-best-places-to-see-jacarandas-in-queensland',
              imageDescription: 'The jacarandas are out to steal the show (and your camera roll).',
            },
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/tropical-north-queensland/blog-images/2024_TNQ_GBR_PortDouglas_MackayC-155084.jpg',
              imageTitle: 'Secret Queensland beaches',
              imageLink: 'https://www.queensland.com/au/en/places-to-see/experiences/beaches/secret-queensland-beaches',
              imageDescription: 'These beaches are too good to gatekeep.',
            },
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/southern-queensland-country/blog-images/2024_QC_CarnarvonGorge_JesseLindemann_155471.jpg',
              imageTitle: 'How to do Carnarvon National Park',
              imageLink: 'https://www.queensland.com/au/en/places-to-see/experiences/nature-and-wildlife/national-parks/how-to-do-carnarvon-national-park',
              imageDescription: "It isn't just a walk in the park — it’s a full-blown adventure playground carved by nature. ",
            },
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/tropical-north-queensland/blog-images/2024_TNQ_PortDouglas_Sailaway_Sailing_JesseLindemann_155098.jpg',
              imageTitle: 'Things to do Port Douglas',
              imageLink: 'https://www.queensland.com/au/en/places-to-see/destinations/cairns-and-great-barrier-reef/things-to-do-port-douglas',
              imageDescription: 'Sip, swim, sail, repeat… it’s basically paradise with a postcode.',
            },
          ],
        },
        children: [
          {
            title: 'Explore Destinations',
            hasChildren: true,
            isActive: false,
            isMainHeading: true,
            children: [
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/destinations/brisbane',
                  target: '',
                },
                title: 'Brisbane ',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/destinations/gold-coast',
                  target: '',
                },
                title: 'Gold Coast',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/destinations/cairns-and-great-barrier-reef',
                  target: '',
                },
                title: 'Cairns & Great Barrier Reef',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/destinations/sunshine-coast',
                  target: '',
                },
                title: 'Sunshine Coast',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/destinations/the-whitsundays',
                  target: '',
                },
                title: 'The Whitsundays',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/destinations/southern-great-barrier-reef',
                  target: '',
                },
                title: 'Southern Great Barrier Reef',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/destinations/townsville',
                  target: '',
                },
                title: 'Townsville',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/destinations/mackay',
                  target: '',
                },
                title: 'Mackay Isaac',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/destinations/southern-queensland-country',
                  target: '',
                },
                title: 'Queensland Country',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/destinations/fraser-coast',
                  target: '',
                },
                title: 'Fraser Coast',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/destinations/outback-queensland',
                  target: '',
                },
                title: 'Outback Queensland',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
            ],
          },
          {
            title: 'Destination Type',
            hasChildren: true,
            isActive: false,
            isMainHeading: true,
            children: [
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/experiences/beaches',
                  target: '',
                },
                title: 'Beaches',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Beaches_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Beaches_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/experiences/city',
                  target: '',
                },
                title: 'Cities',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_City_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_City_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/experiences/country-and-outback',
                  target: '',
                },
                title: 'Country and Outback',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_OutbackCountry_Charcoal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_OutbackCountry_Charcoal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/experiences/great-barrier-reef',
                  target: '',
                },
                title: 'Great Barrier Reef',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_GreatBarrierReef_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_GreatBarrierReef_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/experiences/islands',
                  target: '',
                },
                title: 'Islands',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Islands_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Islands_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/experiences/nature-and-wildlife/national-parks',
                  target: '',
                },
                title: 'National Parks and Rainforests',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/nationsl-parks.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/nationsl-parks.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
            ],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/places-to-see/experiences/city',
              target: '',
            },
            title: 'City',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_City_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_City_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/places-to-see/experiences/country-and-outback',
              target: '',
            },
            title: 'Country and Outback',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_OutbackCountry_Charcoal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_OutbackCountry_Charcoal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/places-to-see/experiences/great-barrier-reef',
              target: '',
            },
            title: 'The Great Barrier Reef',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_GreatBarrierReef_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_GreatBarrierReef_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/places-to-see/experiences/islands',
              target: '',
            },
            title: 'Islands',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Islands_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Islands_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/places-to-see/experiences/nature-and-wildlife',
              target: '',
            },
            title: 'Nature and Wildlife',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_NatureWildlife_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_NatureWildlife_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
        ],
      },
      {
        link: {
          href: 'https://www.queensland.com/au/en/things-to-do',
          target: '_self',
        },
        title: 'Things to Do',
        hasChildren: false,
        isActive: false,
        isMainHeading: false,
        imageGrid: {
          gridTitle: 'Insider Picks',
          imageRatio: '3x2',
          enlargeFirstImage: false,
          grid: [
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/gladstone/blog-images/2022_GLD_HeronIsland_DescentProductions_154196.jpg',
              imageTitle: "Queensland's Wildlife Calendar",
              imageLink: 'https://www.queensland.com/au/en/places-to-see/experiences/nature-and-wildlife/queensland-seasonal-nature-wildlife-calendar',
              imageDescription: 'Plan your trip around nature’s best shows (front-row seats guaranteed).',
            },
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/brisbane/blog-images/BNE_BrisbaneInternational_189816.jpg',
              imageTitle: 'Summer sports events',
              imageLink: 'https://www.queensland.com/au/en/things-to-do/events/sports-events/summer-sports-events-queensland',
              imageDescription: 'From surf comps to stadium showdowns, it’s game on in the Sunshine State.',
            },
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/gold-coast/blog-images/154042-154042-8.jpg',
              imageTitle: 'Best restaurants with a view',
              imageLink: 'https://www.queensland.com/au/en/things-to-do/food-and-drink/restaurants-and-cafes/best-queensland-restaurants-with-views',
              imageDescription: 'These restaurants prove scenery is the ultimate seasoning.',
            },
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/gold-coast/blog-images/2021_CG_ParadiseCountry_Farm_TheEditSuite_144922.jpg',
              imageTitle: 'Best Farm Stays Queensland',
              imageLink: 'https://www.queensland.com/au/en/places-to-see/experiences/country-and-outback/best-farm-stays-in-queensland',
              imageDescription: 'Trade city lights for starry nights and fresh air for days',
            },
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/the-whitsundays/blog-imges/2022_WYS_CruiseWhitsundays_ReefSleep_GreatBarrierReef_Riptide_149842.jpg',
              imageTitle: 'Unique Queensland Accommodation',
              imageLink: 'https://www.queensland.com/au/en/plan-your-holiday/accommodation/unique-queensland-accommodation',
              imageDescription: 'Queensland’s unique stays turn your holiday into a story worth bragging about.',
            },
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/gladstone/blog-images/2023_GLD_HeronIsland_DescentProductions_154254.jpg',
              imageTitle: 'Turtles on the Southern Great Barrier Reef',
              imageLink: 'https://www.queensland.com/au/en/places-to-see/experiences/nature-and-wildlife/turtles/turtles-on-the-southern-great-barrier-reef',
              imageDescription: 'Watch these locals hatch, splash, and steal the spotlight year after year.',
            },
          ],
        },
        children: [
          {
            title: 'Experiences',
            hasChildren: true,
            isActive: false,
            isMainHeading: true,
            children: [
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/food-and-drink',
                  target: '',
                },
                title: 'Food and Drink',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_FoodDrink_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_FoodDrink_Teal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/adventure',
                  target: '',
                },
                title: 'Outdoor Adventure',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Adventure_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_Adventure_Teal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/experiences/nature-and-wildlife',
                  target: '',
                },
                title: 'Wildlife Experiences',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_NatureWildlife_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_NatureWildlife_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/arts-and-culture',
                  target: '',
                },
                title: 'Arts, Culture and Heritage',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_ArtsCulture_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_ArtsCulture_Teal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/health-and-wellness',
                  target: '',
                },
                title: 'Health and Wellbeing',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_HealthWellbeing_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_HealthWellbeing_Teal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/indigenous',
                  target: '',
                },
                title: 'Indigenous Experiences',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Indigenous_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_Indigenous_Teal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/adventure/water-activities',
                  target: '',
                },
                title: 'Water Activities',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/queensland-tours',
                  target: '',
                },
                title: 'Queensland tours and attractions',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
            ],
          },
          {
            title: "What's Trending",
            hasChildren: true,
            isActive: false,
            isMainHeading: true,
            children: [
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/adventure/diving-and-snorkelling',
                  target: '',
                },
                title: 'Diving and Snorkelling',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/food-and-drink/restaurants-and-cafes',
                  target: '',
                },
                title: 'Restaurants and Cafes',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/places-to-see/experiences/nature-and-wildlife/waterfalls',
                  target: '',
                },
                title: 'Waterfalls and Swimming Holes',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/road-trips/queensland-drive',
                  target: '',
                },
                title: 'Drive Holidays',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
            ],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/things-to-do/arts-and-culture',
              target: '',
            },
            title: 'Arts and Culture',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_ArtsCulture_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_ArtsCulture_Teal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/things-to-do/dinosaurs',
              target: '',
            },
            title: 'Dinosaurs',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Dinosaurs_Grey.png',
              alt: 'Small Grey Dinosaur Icon',
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_Dinosaurs_Teal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/things-to-do/eco-experiences',
              target: '',
            },
            title: 'Eco - Tourism',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_EcoExperiences_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_EcoExperiences_Teal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/things-to-do/health-and-wellness',
              target: '',
            },
            title: 'Health and Wellness',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_HealthWellbeing_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_HealthWellbeing_Teal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/things-to-do/indigenous',
              target: '',
            },
            title: 'Indigenous Experiences',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Indigenous_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_Indigenous_Teal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/things-to-do/theme-parks',
              target: '',
            },
            title: 'Theme Parks',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_ThemeParks_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_ThemeParks_Teal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            title: 'Traveller Type',
            hasChildren: true,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/illustrated-icons/png-icons-grey/Icon_Family_New.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/illustrated-icons/Resized_Teal_Family.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/families',
                  target: '',
                },
                title: 'Family holidays',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/partner-and-kids.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/partner-and-kids.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/couples',
                  target: '',
                },
                title: 'Couples Holidays',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/partner.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/partner.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/pet-friendly',
                  target: '',
                },
                title: 'Pet-Friendly Holidays',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/in-laws.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/in-laws.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/groups',
                  target: '',
                },
                title: 'Group Holidays',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/group.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/group.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/solo',
                  target: '',
                },
                title: 'Solo Holidays',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/lone-traveler.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/lone-traveler.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/first-time-visitor',
                  target: '',
                },
                title: 'First-Time Visitors',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/wedding-and-honeymoon',
                  target: '',
                },
                title: 'Wedding and Honeymoon',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/lgbtiq',
                  target: '',
                },
                title: 'LGBTIQ+',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/accessibility',
                  target: '',
                },
                title: 'Accessible Travel Hub',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/accessible.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/accessible.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
            ],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/things-to-do/food-and-drink',
              target: '',
            },
            title: 'Food and Drink',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_FoodDrink_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_FoodDrink_Teal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
        ],
      },
      {
        link: {
          href: 'https://www.queensland.com/au/en/plan-your-holiday',
          target: '_self',
        },
        title: 'Plan Your Holiday',
        hasChildren: false,
        isActive: false,
        isMainHeading: false,
        imageGrid: {
          gridTitle: 'Trending Activities',
          imageRatio: '3x2',
          enlargeFirstImage: false,
          grid: [
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/tropical-north-queensland/blog-images/155539-155539-8.jpg',
              imageTitle: 'Freshwater Swimming spots Cairns',
              imageLink: 'https://www.queensland.com/au/en/places-to-see/experiences/nature-and-wildlife/best-freshwater-swimming-spots-cairns',
              imageDescription: 'Dive into rainforest pools, chase hidden waterfalls, and find freshwater spots that outshine the beach.',
            },
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/gold-coast/blog-images/Dave Galvin supplied by his team.jpg',
              imageTitle: 'Live like a Gold Coast Local',
              imageLink: 'https://www.queensland.com/au/en/places-to-see/destinations/gold-coast/live-like-a-gold-coast-local',
              imageDescription: 'Surf at sunrise, sip coffee barefoot, and chase golden hours that last all day.',
            },
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/gladstone/blog-images/2024_GLD_SGBR_HeronIslandResort_TomParkFilms_156708.jpg',
              imageTitle: 'Best Snorkel Sites',
              imageLink: 'https://www.queensland.com/au/en/things-to-do/adventure/diving-and-snorkelling/best-snorkelling-sites-queensland',
              imageDescription: 'Mask up and dive in — Queensland’s underwater world is pure magic',
            },
            {
              image: 'https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/sunshine-coast/blog-images/2020_SC_MooloolabaBeach_JesseLindemann_143362.jpg',
              imageTitle: 'Best Sunshine Coast Beaches',
              imageLink: 'https://www.queensland.com/au/en/places-to-see/experiences/beaches/best-beaches-sunshine-coast',
              imageDescription: 'From hidden coves to surfy stretches, these sandy spots are sunshine perfection.',
            },
          ],
        },
        children: [
          {
            title: 'Trip Planning Tools',
            hasChildren: true,
            isActive: false,
            isMainHeading: true,
            children: [
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/accommodation',
                  target: '',
                },
                title: 'Where to Stay',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/illustrated-icons/eps-icon-files/Icon Files_Accommodation_Grey.eps',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/illustrated-icons/eps-icon-files/Icon Files_Accommodation_Grey.eps',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/itineraries',
                  target: '',
                },
                title: 'Itineraries',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Itinerary_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_Itinerary_Teal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/road-trips',
                  target: '',
                },
                title: 'Road Trips',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Weather2_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_Weather2_Teal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/eco-experiences',
                  target: '',
                },
                title: 'Sustainability',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_EcoExperiences_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_EcoExperiences_Teal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/travel-information',
                  target: '',
                },
                title: 'Travel Information',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_TraveInfo_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_TravelInfo_Teal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-by-budget',
                  target: '',
                },
                title: 'Holiday By Budget',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/news-and-articles',
                  target: '',
                },
                title: 'News and Articles',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_EditorialNews_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_EditorialNews_Teal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
            ],
          },
          {
            title: 'Traveller Type',
            hasChildren: true,
            isActive: false,
            isMainHeading: true,
            children: [
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/couples',
                  target: '',
                },
                title: 'Couples Holidays',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/partner.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/partner.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/families',
                  target: '',
                },
                title: 'Family holidays',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/partner-and-kids.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/partner-and-kids.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/solo',
                  target: '',
                },
                title: 'Solo Holidays',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/lone-traveler.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/lone-traveler.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/groups',
                  target: '',
                },
                title: 'Group Holidays',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/group.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/group.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/pet-friendly',
                  target: '',
                },
                title: 'Pet-Friendly Holidays',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/in-laws.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/in-laws.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/traveller/accessibility',
                  target: '',
                },
                title: 'Accessible Travel Hub',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/accessible.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/accessible.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
            ],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/plan-your-holiday/news-and-articles',
              target: '',
            },
            title: 'News and Articles',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_EditorialNews_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_EditorialNews_Teal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals',
              target: '',
            },
            title: 'Holiday Deals',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Deals_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_Deals_Teal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/plan-your-holiday/itineraries',
              target: '',
            },
            title: 'Itineraries',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Itinerary_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_Itinerary_Teal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/plan-your-holiday/road-trips',
              target: '',
            },
            title: 'Road Trips',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Weather2_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_Weather2_Teal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
          {
            link: {
              href: 'https://www.queensland.com/au/en/plan-your-holiday/travel-information',
              target: '',
            },
            title: 'Travel Information',
            hasChildren: false,
            isActive: false,
            icon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_TraveInfo_Grey.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            activeIcon: {
              src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_TravelInfo_Teal.png',
              alt: null,
              link: null,
              quality: 0.0,
            },
            isMainHeading: false,
            children: [],
          },
        ],
      },
      {
        link: {
          href: 'https://www.queensland.com/au/en/whats-on',
          target: '_self',
        },
        title: "What's on",
        hasChildren: false,
        isActive: false,
        isMainHeading: false,
        comingUp: {
          comingUpTitle: 'COMING UP',
          today: 'TODAY',
          thisWeekend: 'THIS WEEKEND',
          thisMonth: 'THIS MONTH',
          nextMonth: 'NEXT MONTH',
          comingUpBaseUrl: 'https://www.queensland.com/au/en/things-to-do/events/queensland-events?category=events&dateType=custom&destination=all-queensland&destinationType=region&dateFrom=1736427600000&dateTo=1736686799999',
        },
        children: [
          {
            title: 'All Events',
            hasChildren: true,
            isActive: false,
            isMainHeading: true,
            children: [
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events',
                  target: '',
                },
                title: 'All Queensland Events',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Events_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_Events_Teal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/brisbane-events',
                  target: '',
                },
                title: 'Brisbane Events',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/gold-coast-events',
                  target: '',
                },
                title: 'Gold Coast Events',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/tropical-north-queensland-events',
                  target: '',
                },
                title: 'Cairns & Great Barrier Reef Events',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/whitsundays-events',
                  target: '',
                },
                title: 'The Whitsundays Events',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/sunshine-coast-events',
                  target: '',
                },
                title: 'Sunshine Coast Events',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/southern-great-barrier-reef-events',
                  target: '',
                },
                title: 'Southern Great Barrier Reef Events',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/mackay-events',
                  target: '',
                },
                title: 'Mackay Events',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/townsville-events',
                  target: '',
                },
                title: 'Townsville Events',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/fraser-coast-events',
                  target: '',
                },
                title: 'Fraser Coast Events',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/southern-queensland-country-events',
                  target: '',
                },
                title: 'Queensland Country Events',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/outback-events',
                  target: '',
                },
                title: 'Outback Queensland Events',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
            ],
          },
          {
            title: 'Event Types',
            hasChildren: true,
            isActive: false,
            isMainHeading: true,
            children: [
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/arts-and-culture',
                  target: '',
                },
                title: 'Arts and Culture Events',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/arts-and-culture.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/arts-and-culture.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/food-and-drink',
                  target: '',
                },
                title: 'Food and Drink Events',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/food-and-drink.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/food-and-drink.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/markets',
                  target: '',
                },
                title: 'Markets',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/markets-shopping.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/markets-shopping.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/music-and-festivals',
                  target: '',
                },
                title: 'Music and Festivals',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/music.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/music.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/endurance-events',
                  target: '',
                },
                title: 'Endurance Events',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/endurance.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/endurance.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/things-to-do/events/sports-events',
                  target: '',
                },
                title: 'Sports Events',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/sports.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/sports.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
            ],
          },
        ],
      },
      {
        link: {
          href: 'https://www.queensland.com/au/en/deals',
          target: '_self',
        },
        title: 'Deals',
        hasChildren: false,
        isActive: false,
        isMainHeading: false,
        imageGrid: {
          gridTitle: 'Featured Deals',
          imageRatio: '5x4',
          enlargeFirstImage: false,
          grid: [
            {
              image: 'https://assets.atdw-online.com.au/images/03eeaa68133cf965d7f599d07b80ef0e.jpeg?q=eyJ0eXBlIjoibGlzdGluZyIsImxpc3RpbmdJZCI6IjU2YjI1ZDI5YWVlZWFhZjc3M2NlZWY5NyIsImRpc3RyaWJ1dG9ySWQiOiI1NmIxZWI5MzQ0ZmVjYTNkZjJlMzIwY2IiLCJhcGlrZXlJZCI6IjU2YjFlZmVlMGNmMjEzYWQyMGRkMjE3MCJ9&rect=0%2C0%2C1600%2C1200&rot=360&w=975',
              imageTitle: 'Kingfisher Bay Resort',
              imageLink: 'https://www.queensland.com/au/en/plan-your-holiday/accommodation/p-56b25d29aeeeaaf773ceef97-kingfisher-bay-resort#promo-1',
              imageDescription: '2 For 1, Twice the fun!',
              bannerText: 'DEAL',
            },
            {
              image: 'https://assets.atdw-online.com.au/images/e350067abd95e7a26bacac725e77ffa6.jpeg?q=eyJ0eXBlIjoibGlzdGluZyIsImxpc3RpbmdJZCI6IjYwYmQ2ZTk1NTFlZTdjYjM2ZGQ0YTNlZiIsImRpc3RyaWJ1dG9ySWQiOiI1NmIxZWI5MzQ0ZmVjYTNkZjJlMzIwY2IiLCJhcGlrZXlJZCI6IjU2YjFlZmVlMGNmMjEzYWQyMGRkMjE3MCJ9&rect=0%2C430%2C8256%2C4644&rot=360&w=975',
              imageTitle: 'Crystalbrook Vincent ',
              imageLink: 'https://www.queensland.com/au/en/plan-your-holiday/accommodation/p-60bd6e9551ee7cb36dd4a3ef-crystalbrook-vincent#promo-0',
              imageDescription: 'Summer getaways, free breakfast stays',
              bannerText: 'DEAL',
            },
            {
              image: 'https://assets.atdw-online.com.au/images/9c325bae917f4c3222e82a2345c15545.jpeg?q=eyJ0eXBlIjoibGlzdGluZyIsImxpc3RpbmdJZCI6IjU3MDc4YWQyMWQxYTQzZTUzZmJmN2Y0MiIsImRpc3RyaWJ1dG9ySWQiOiI1NmIxZWI5MzQ0ZmVjYTNkZjJlMzIwY2IiLCJhcGlrZXlJZCI6IjU2YjFlZmVlMGNmMjEzYWQyMGRkMjE3MCJ9&rect=0%2C378%2C4032%2C2268&rot=360&w=1200',
              imageTitle: 'Eromanga Natural History Museum',
              imageLink: 'https://www.queensland.com/au/en/things-to-do/attractions/p-57078ad21d1a43e53fbf7f42-eromanga-natural-history-museum#promo-1',
              imageDescription: '1 Night Dinosaur Insiders',
              bannerText: 'DEAL',
            },
            {
              image: 'https://assets.atdw-online.com.au/images/a432d4ad3c7beb56f73ea12e59f862ff.jpeg?q=eyJ0eXBlIjoibGlzdGluZyIsImxpc3RpbmdJZCI6IjU2YjI1ZDYzZDVmMTU2NTA0NWQ5ZmMwZiIsImRpc3RyaWJ1dG9ySWQiOiI1NmIxZWI5MzQ0ZmVjYTNkZjJlMzIwY2IiLCJhcGlrZXlJZCI6IjU2YjFlZmVlMGNmMjEzYWQyMGRkMjE3MCJ9&rect=0%2C131%2C2500%2C1406&rot=360&w=1200',
              imageTitle: 'Sheraton Grand Mirage Resort',
              imageLink: 'https://www.queensland.com/au/en/plan-your-holiday/accommodation/p-56b25d63d5f1565045d9fc0f-sheraton-grand-mirage-resort-port-douglas#promo-1',
              imageDescription: "Couple's Coastal Retreat",
              bannerText: 'DEAL',
            },
          ],
        },
        children: [
          {
            title: 'Holiday Deals',
            hasChildren: true,
            isActive: false,
            isMainHeading: true,
            children: [
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals',
                  target: '',
                },
                title: 'Holiday Deals in Queensland',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/grey-icons/Icon Files_Deals_Grey.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/nav-icons/teal-icons/Icon Files_Deals_Teal.png',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals/brisbane-holiday-deals',
                  target: '',
                },
                title: 'Brisbane Holiday Deals',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals/gold-coast-holiday-deals',
                  target: '',
                },
                title: 'Gold Coast Holiday Deals',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals/cairns-and-great-barrier-reef-holiday-deals',
                  target: '',
                },
                title: 'Cairns and Great Barrier Reef Holiday Deals',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals/sunshine-coast-holiday-deals',
                  target: '',
                },
                title: 'Sunshine Coast Holiday Deals',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals/the-whitsundays-holiday-deals',
                  target: '',
                },
                title: 'The Whitsundays Holiday Deals',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals/southern-great-barrier-reef-deals',
                  target: '',
                },
                title: 'Southern Great Barrier Reef Deals',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals/mackay-holiday-deals',
                  target: '',
                },
                title: 'Mackay Holiday Deals',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals/townsville-holiday-deals',
                  target: '',
                },
                title: 'Townsville Holiday Deals',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals/fraser-coast-holiday-deals',
                  target: '',
                },
                title: 'Fraser Coast Holiday Deals',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals/southern-queensland-country-holiday-deals',
                  target: '',
                },
                title: 'Queensland Country Holiday Deals',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals/outback-queensland-holiday-deals',
                  target: '',
                },
                title: 'Outback Queensland Holiday Deals',
                hasChildren: false,
                isActive: false,
                isMainHeading: false,
                children: [],
              },
            ],
          },
          {
            title: 'Other Deals',
            hasChildren: true,
            isActive: false,
            isMainHeading: true,
            children: [
              {
                link: {
                  href: 'https://www.queensland.com/au/en/deals/all-deals',
                  target: '',
                },
                title: 'All Deals',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/all.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/all.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals/beach-holiday-deals',
                  target: '',
                },
                title: 'Beach Holiday Deals',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/beaches.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/beaches.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/deals/city-deals',
                  target: '',
                },
                title: 'City Holiday Deals',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/beach-deals.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/beach-deals.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
              {
                link: {
                  href: 'https://www.queensland.com/au/en/plan-your-holiday/holiday-deals/great-barrier-reef-holiday-deals',
                  target: '',
                },
                title: 'Great Barrier Reef Holiday Deals',
                hasChildren: false,
                isActive: false,
                icon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/great-barrier-reef.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                activeIcon: {
                  src: 'https://www.queensland.com/content/dam/teq/consumer/global/navigation-icons-and-images/icons/charcoal/great-barrier-reef.svg',
                  alt: null,
                  link: null,
                  quality: 0.0,
                },
                isMainHeading: false,
                children: [],
              },
            ],
          },
        ],
      },
    ];
    this.popularSearchTerms = [
      "Bluey's World ",
      'Deals',
      'Events',
    ];
    this.bookmarksLink = {
      href: 'https://www.queensland.com/au/en/info/my-bookmarks',
      target: '_self',
      title: '',
    };
    this.activateLogIn = false;
    this[':type'] = 'teq/components/navigation/header-menu';
    this.headerHeight = 80;
    this.maxItemsToShow = 5;

    // State management
    this.state = {
      homeUrl: '/au/en/home',
      isScrolled: true,
      isMenuOpen: false,
      openAccordion: null,
      hoveredIndex: null,
      activeIndex: null,
      showAllIndexes: {},
      activeSearchBar: false,
      isSearchModalOpen: false,
      hasBookmarks: false,
      isMobile: false,
      isTransparentVariation: false,
    };

    // Refs
    this.accordionRefs = [];
    this.dialogRefs = [];
    this.firstItemRef = null;
    this.hamburgerRef = null;
    this.mobileSearchTriggerRef = null;
    this.lastDesktopTriggerRef = null;
    this.wasMenuOpenRef = false;

    // Throttle for scroll
    this.scrollTimeout = null;
  }

  connectedCallback() {
    this.initializeComponent();
    this.render();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  initializeComponent() {
    this.setupScrollListener();
    this.setupKeyboardListeners();
    this.setupMediaQueryListener();
    this.updateBodySpacing();
  }

  cleanup() {
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
    if (this.keydownHandler) window.removeEventListener('keydown', this.keydownHandler);
    if (this.mediaQueryListener) this.mediaQuery?.removeListener(this.mediaQueryListener);
  }

  /**
   * Setup scroll listener with throttling
   */
  setupScrollListener() {
    this.scrollHandler = () => {
      if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        const scrollTopPosition = document.documentElement.scrollTop;
        const newIsScrolled = scrollTopPosition <= this.headerHeight;
        if (this.state.isScrolled !== newIsScrolled) {
          this.state.isScrolled = newIsScrolled;
          this.updateTransparentVariation();
          this.render();
        }
      }, 300);
    };

    window.addEventListener('scroll', this.scrollHandler);
  }

  /**
   * Setup keyboard listeners for navigation
   */
  setupKeyboardListeners() {
    this.keydownHandler = (event) => {
      this.handleEscapePress(event);
      this.handleArrowKeys(event);
      this.handleTabKey(event);
    };

    window.addEventListener('keydown', this.keydownHandler);
  }

  /**
   * Setup media query listener for responsive behavior
   */
  setupMediaQueryListener() {
    this.mediaQuery = window.matchMedia('(max-width: 1024px)');
    this.mediaQueryListener = (e) => {
      const wasMobile = this.state.isMobile;
      this.state.isMobile = e.matches;
      if (wasMobile !== this.state.isMobile) {
        this.state.isMenuOpen = false;
        this.state.activeIndex = null;
        this.render();
      }
    };

    this.mediaQuery.addListener(this.mediaQueryListener);
    this.state.isMobile = this.mediaQuery.matches;
  }

  /**
   * Update transparent variation based on scroll and menu state
   */
  updateTransparentVariation() {
    const isTransparent = !this.state.isMenuOpen && ['transparent', 'fully-transparent'].includes(this.variation) && this.state.isScrolled;
    this.state.isTransparentVariation = isTransparent;
  }

  /**
   * Update body spacing for fixed header
   */
  updateBodySpacing() {
    if (this.variation === 'white') {
      // const header = this.shadowRoot?.querySelector('header') || this;
      const spacing = this.headerHeight + 16; // 16px gap
      document.body.style.paddingTop = `${spacing}px`;
    }
  }

  /**
   * Handle scroll escape key
   */
  handleEscapePress(event) {
    if (event.key === 'Escape') {
      this.state.isMenuOpen = false;
      this.state.activeIndex = null;
      this.render();
    }
  }

  /**
   * Handle arrow key navigation
   */
  handleArrowKeys(event) {
    const focusedElement = this.document.activeElement;
    const columnElement = focusedElement?.closest('.col');

    if (columnElement) {
      const columns = document.querySelectorAll('.col');
      const columnIndex = Array.from(columns).indexOf(columnElement);

      if (event.key === 'ArrowLeft' && columnIndex > 0) {
        const previousColumn = columns[columnIndex - 1];
        const firstFocusable = previousColumn?.querySelector(
          'a, button, [tabindex]:not([tabindex="-1"]), [contenteditable]',
        );
        firstFocusable?.focus();
      }

      if (event.key === 'ArrowRight' && columnIndex >= 0 && columnIndex < columns.length - 1) {
        const nextColumn = columns[columnIndex + 1];
        const firstFocusable = nextColumn?.querySelector(
          'a, button, [tabindex]:not([tabindex="-1"]), [contenteditable]',
        );
        firstFocusable?.focus();
      }
    }
  }

  /**
   * Handle tab key for focus trap (mobile)
   */
  handleTabKey(event) {
    if (event.key !== 'Tab' || !this.state.isMenuOpen || this.state.isSearchModalOpen || !this.state.isMobile) {
      return;
    }

    const menuEl = document.getElementById('mobile-header-menu');
    if (!menuEl) return;

    const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])';
    const elements = Array.from(menuEl.querySelectorAll(selector))
      .filter((el) => el.offsetParent !== null);

    if (this.hamburgerRef) {
      elements.unshift(this.hamburgerRef);
    }

    if (elements.length === 0) return;

    const first = elements[0];
    const last = elements[elements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /**
   * Handle navigation click
   */
  handleNavClick(index, event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.state.activeIndex === index && this.state.isMenuOpen) {
      this.state.isMenuOpen = false;
      this.state.activeIndex = null;
    } else {
      this.lastDesktopTriggerRef = event.currentTarget;
      this.state.isMenuOpen = true;
      this.state.activeIndex = index;
      this.handleLinkClick(event, '', this.menuItems?.[index]?.title, '');
    }

    this.updateTransparentVariation();
    this.render();
  }

  /**
   * Handle link click for analytics
   */
  handleLinkClick(event, label, mainHeading, subHeading) {
    const eventLabel = label ? label.toLowerCase() : null;
    const eventMainHeading = mainHeading ? `main_heading|${mainHeading}`.toLowerCase() : null;
    const eventSubHeading = subHeading ? `sub_heading|${subHeading}`.toLowerCase() : null;

    const navigationEventData = {
      label: eventLabel,
      mainHeading: eventMainHeading,
      subHeading: eventSubHeading,
    };

    this.dispatchEvent(new CustomEvent('navigation', {
      detail: navigationEventData,
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Handle nav link click
   */
  handleNavLinkClick(event, label, mainHeading, subHeading) {
    event.stopPropagation();
    this.handleLinkClick(event, label, mainHeading, subHeading);
  }

  /**
   * Handle close modal click
   */
  handleCloseModalClick(event) {
    event.preventDefault();
    this.state.isMenuOpen = false;
    this.state.activeIndex = null;
    this.render();
  }

  /**
   * Handle hamburger menu click
   */
  handleHamburgerClick() {
    this.state.isMenuOpen = !this.state.isMenuOpen;
    this.state.activeSearchBar = false;
    if (!this.state.isMenuOpen) {
      this.state.openAccordion = null;
    }
    this.updateTransparentVariation();
    this.render();
  }

  /**
   * Handle mobile search click
   */
  handleMobileSearchClick() {
    this.state.isMenuOpen = !this.state.isMenuOpen;
    this.state.activeSearchBar = true;
    this.render();
  }

  /**
   * Handle accordion click
   */
  handleAccordionClick(index) {
    if (this.state.openAccordion !== index) {
      this.handleLinkClick(null, '', this.menuItems?.[index]?.title, '');
    }
    this.state.openAccordion = this.state.openAccordion === index ? null : index;
    this.render();
  }

  /**
   * Handle mouse enter on menu item
   */
  handleMouseEnter(parentIndex, childIndex) {
    this.state.hoveredIndex = `${parentIndex}-${childIndex}`;
    this.render();
  }

  /**
   * Handle mouse leave on menu item
   */
  handleMouseLeave() {
    this.state.hoveredIndex = null;
    this.render();
  }

  /**
   * Toggle show all items
   */
  toggleShowAll(childIndex, mainHeading) {
    this.state.showAllIndexes[childIndex] = !this.state.showAllIndexes[childIndex];
    if (!this.state.showAllIndexes[childIndex]) {
      this.handleLinkClick(null, '', mainHeading, 'show_all');
    }
    this.render();
  }

  /**
   * Update page z-index to prevent overlap with popups
   */
  updatePageZIndex(flag) {
    const bodyDOM = this.document.querySelector('#page');
    if (!bodyDOM) return;

    if (flag === true) {
      bodyDOM.style.position = 'relative';
      bodyDOM.style.zIndex = '1000';
    } else {
      bodyDOM.style.position = 'static';
      bodyDOM.style.zIndex = '1';
    }
  }

  /**
   * Render the component
   */
  render() {
    // Clear existing content
    this.innerHTML = '';

    const logoClass = this.state.isTransparentVariation ? 'logo-white' : 'logo-teal';
    const navLinkClass = this.state.isTransparentVariation ? 'color-white' : 'color-charcoal';

    // Set data attributes
    this.setAttribute('role', 'banner');
    this.setAttribute('id', 'header-menu2');
    this.setAttribute('data-variation', this.variation);
    this.setAttribute('data-scrolled', this.state.isScrolled);
    this.setAttribute('data-menu-open', this.state.isMenuOpen);

    // Create preloaded nav
    const preloadedNav = document.createElement('nav');
    preloadedNav.className = 'preloaded-nav-links';
    preloadedNav.setAttribute('aria-label', 'Main navigation');
    preloadedNav.innerHTML = HeaderMenu2.getNestedNavItemsHTML(this.menuItems || []);
    this.appendChild(preloadedNav);

    // Create header inner wrapper
    const headerInnerWrapper = document.createElement('div');
    headerInnerWrapper.className = 'header-inner-wrapper';

    // Create logo
    const logoDiv = document.createElement('div');
    logoDiv.className = `logo ${logoClass}`;
    const logoLink = document.createElement('a');
    logoLink.href = this.state.homeUrl;
    logoLink.setAttribute('aria-label', 'Home');
    const logoSvg = document.createElement('svg');
    logoSvg.className = 'teq-logo';
    logoSvg.setAttribute('width', '145');
    logoSvg.setAttribute('height', '40');
    logoLink.appendChild(logoSvg);
    logoDiv.appendChild(logoLink);
    headerInnerWrapper.appendChild(logoDiv);

    // Create navigation wrapper
    const navigationWrapper = document.createElement('div');
    navigationWrapper.className = 'navigation-wrapper';

    // Add desktop nav links if not mobile
    if (!this.state.isMobile) {
      const navList = document.createElement('ul');
      navList.className = 'nav-links';
      navList.setAttribute('role', 'menubar');

      (this.menuItems || []).forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'nav-link-item';
        li.setAttribute('role', 'none');

        const button = document.createElement('button');
        button.className = `nav-link ${navLinkClass} ${this.state.activeIndex === index ? 'is-active' : ''}`;
        button.setAttribute('aria-controls', `menu-item-${index}`);
        button.setAttribute('aria-haspopup', 'true');
        button.setAttribute('aria-expanded', (this.state.activeIndex === index && this.state.isMenuOpen).toString());
        button.setAttribute('role', 'menuitem');
        button.textContent = item.title;
        button.addEventListener('click', (e) => this.handleNavClick(index, e));

        li.appendChild(button);

        const dialog = document.createElement('dialog');
        dialog.className = 'header-menu-modal';
        dialog.setAttribute('id', `menu-item-${index}`);
        dialog.setAttribute('aria-label', `${item.title} navigation`);
        dialog.setAttribute('aria-labelledby', `desktop-menu-title-${index}-0`);

        const isActiveDialog = this.state.activeIndex === index && this.state.isMenuOpen;

        if (isActiveDialog) {
          dialog.setAttribute('open', '');
        } else {
          dialog.removeAttribute('open');
        }

        dialog.addEventListener('click', (e) => this.handleCloseModalClick(e));

        const innerWrapper = document.createElement('div');
        innerWrapper.className = 'header-menu-inner-wrapper';
        HeaderMenu2.renderDesktopMenuContent(item, index, innerWrapper);
        dialog.appendChild(innerWrapper);

        li.appendChild(dialog);
        navList.appendChild(li);
      });

      navigationWrapper.appendChild(navList);
    }

    // Create icon group
    const iconGroup = document.createElement('div');
    iconGroup.className = 'icon-group';

    // Add bookmarks link if desktop and bookmarksLink exists
    if (!this.state.isMobile && this.bookmarksLink) {
      const bookmarkLink = document.createElement('a');
      bookmarkLink.setAttribute('aria-label', this.state.hasBookmarks ? 'Bookmarked items' : 'No bookmarks');
      bookmarkLink.className = this.state.hasBookmarks ? 'heart-icon-checked' : 'heart-icon-unchecked';
      bookmarkLink.href = this.bookmarksLink.href || '#';
      const bookmarkSvg = document.createElement('svg');
      bookmarkSvg.setAttribute('width', '24');
      bookmarkSvg.setAttribute('height', '24');
      bookmarkLink.appendChild(bookmarkSvg);
      iconGroup.appendChild(bookmarkLink);
    }

    // Add search wrapper if desktop
    if (!this.state.isMobile) {
      const searchWrapper = document.createElement('div');
      searchWrapper.className = `search-wrapper ${this.state.isTransparentVariation ? 'icon-white' : 'icon-charcoal'}`;
      const searchComponent = document.createElement('search-component');
      searchComponent.id = 'nav-search';
      searchComponent.popularSearchTerms = this.popularSearchTerms;
      searchComponent.searchResultsPage = this.searchResultsPage;
      searchWrapper.appendChild(searchComponent);
      iconGroup.appendChild(searchWrapper);
    }

    // Add mobile controls
    if (this.state.isMobile) {
      if (!this.state.isMenuOpen) {
        const mobileSearchBtn = document.createElement('button');
        mobileSearchBtn.className = 'mobile-search-trigger';
        const mobileSvg = document.createElement('svg');
        mobileSvg.setAttribute('width', '24');
        mobileSvg.setAttribute('height', '24');
        mobileSearchBtn.appendChild(mobileSvg);
        mobileSearchBtn.addEventListener('click', () => this.handleMobileSearchClick());
        iconGroup.appendChild(mobileSearchBtn);
      }

      const hamburgerBtn = document.createElement('button');
      hamburgerBtn.className = 'hamburger-menu';
      hamburgerBtn.setAttribute('aria-label', 'Toggle menu');
      hamburgerBtn.setAttribute('aria-expanded', this.state.isMenuOpen.toString());
      const hamburgerSpan = document.createElement('span');
      hamburgerBtn.appendChild(hamburgerSpan);
      hamburgerBtn.addEventListener('click', () => this.handleHamburgerClick());
      this.hamburgerRef = hamburgerBtn;
      iconGroup.appendChild(hamburgerBtn);
    }

    navigationWrapper.appendChild(iconGroup);
    headerInnerWrapper.appendChild(navigationWrapper);
    this.appendChild(headerInnerWrapper);

    // Add mobile menu dialog
    if (this.state.isMobile && this.state.isMenuOpen) {
      const dialog = document.createElement('dialog');
      dialog.id = 'mobile-header-menu';
      dialog.className = 'mobile-header-menu-modal';
      dialog.setAttribute('open', '');
      dialog.setAttribute('aria-label', 'Main navigation');
      dialog.setAttribute('aria-modal', 'true');
      dialog.setAttribute('role', 'dialog');

      const innerWrapper = document.createElement('div');
      innerWrapper.className = 'mobile-header-menu-inner-wrapper';

      const searchWrapper = document.createElement('div');
      searchWrapper.className = 'mobile-search-wrapper';
      const mobileSearch = document.createElement('mobile-search');
      mobileSearch.id = 'mobile-search';
      mobileSearch.popularSearchTerms = this.popularSearchTerms;
      mobileSearch.searchResultsPage = this.searchResultsPage;
      searchWrapper.appendChild(mobileSearch);
      innerWrapper.appendChild(searchWrapper);

      // Add accordions for menu items
      (this.menuItems || []).forEach((item, index) => {
        const accordion = document.createElement('div');
        accordion.className = 'accordion';

        const heading = document.createElement('h3');
        heading.className = `accordion-heading ${this.state.openAccordion === index ? 'is-expanded' : ''}`;
        heading.textContent = item.title;
        const svg = document.createElement('svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        heading.appendChild(svg);
        heading.addEventListener('click', () => this.handleAccordionClick(index));

        accordion.appendChild(heading);

        if (this.state.openAccordion === index) {
          const content = document.createElement('div');
          content.className = 'accordion-content';
          this.renderMobileMenuContent(item, index, content);
          accordion.appendChild(content);
        }

        innerWrapper.appendChild(accordion);
      });

      // Add bookmarks if mobile
      if (this.state.isMobile && this.bookmarksLink) {
        const bookmarkDiv = document.createElement('div');
        bookmarkDiv.className = `mobile-header-menu-bookmark ${this.state.openAccordion !== null ? 'relative' : 'fixed'}`;
        const bookmarkLink = document.createElement('a');
        bookmarkLink.href = this.bookmarksLink.href || '#';
        bookmarkLink.setAttribute('aria-label', 'My Bookmarks');
        const bookmarkSvg = document.createElement('svg');
        bookmarkSvg.setAttribute('width', '24');
        bookmarkSvg.setAttribute('height', '24');
        bookmarkLink.appendChild(bookmarkSvg);
        const bookmarkText = document.createTextNode('My Bookmarks');
        bookmarkLink.appendChild(bookmarkText);
        bookmarkDiv.appendChild(bookmarkLink);
        innerWrapper.appendChild(bookmarkDiv);
      }

      dialog.appendChild(innerWrapper);
      this.appendChild(dialog);
    }
  }

  /**
   * Get nested navigation items as HTML
   */
  static getNestedNavItemsHTML(items) {
    return items.map((item) => {
      let html = `<div class="navigation-wrapper" aria-label="${item.title}">`;

      // Add image grid if exists
      if (item.imageGrid?.grid?.length > 0) {
        html += `<div class="navigation-wrapper" aria-label="${item.imageGrid.gridTitle}">`;
        item.imageGrid.grid.forEach((imageGridChild) => {
          html += `<a href="${imageGridChild.imageLink}" aria-label="${imageGridChild.imageTitle}">${imageGridChild.imageTitle}</a>`;
        });
        html += '</div>';
      }

      // Add children
      if (item.children) {
        item.children.forEach((menuItemChild) => {
          if (menuItemChild.children?.length > 0) {
            html += `<div class="navigation-wrapper" aria-label="${menuItemChild.title}">`;
            menuItemChild.children.forEach((subChild) => {
              html += `<a href="${subChild.link?.href || '#'}" aria-label="${subChild.title}">${subChild.title}</a>`;
            });
            html += '</div>';
          }
        });
      }

      html += '</div>';
      return html;
    }).join('');
  }

  /**
   * Render desktop menu content
   */
  static renderDesktopMenuContent(item, index, container) {
    if (!item.children) return;

    item.children.forEach((child, childIndex) => {
      if (child.children && child.children.length > 0) {
        const col = document.createElement('div');
        col.className = 'col';

        const heading = document.createElement('h4');
        heading.id = `desktop-menu-title-${index}-${childIndex}`;
        heading.className = 'desktop-menu-title';
        heading.textContent = child.title;
        col.appendChild(heading);

        const list = document.createElement('ul');
        list.className = 'desktop-menu-items';
        child.children.forEach((subChild) => {
          const li = document.createElement('li');
          const link = document.createElement('a');
          link.href = subChild.link?.href || '#';
          link.setAttribute('aria-label', subChild.title);
          link.textContent = subChild.title;
          li.appendChild(link);
          list.appendChild(li);
        });
        col.appendChild(list);
        container.appendChild(col);
      }
    });
  }

  /**
   * Render mobile menu content
   */
  renderMobileMenuContent(item, index, container) {
    if (!item.children) return;

    item.children.forEach((child) => {
      if (child.children && child.children.length > 0) {
        const wrapper = document.createElement('div');

        const heading = document.createElement('h4');
        heading.className = 'mobile-accordion-menu-heading';
        heading.textContent = child.title;
        wrapper.appendChild(heading);

        const visibleItems = this.state.showAllIndexes[index]
          ? child.children
          : child.children.slice(0, this.maxItemsToShow);

        const list = document.createElement('ul');
        list.className = 'item-list';
        visibleItems.forEach((subChild) => {
          const li = document.createElement('li');
          const link = document.createElement('a');
          link.href = subChild.link?.href || '#';
          link.setAttribute('aria-label', subChild.title);
          link.textContent = subChild.title;
          li.appendChild(link);
          list.appendChild(li);
        });
        wrapper.appendChild(list);

        // Add show more/less button if needed
        if (child.children.length > this.maxItemsToShow) {
          const button = document.createElement('button');
          button.className = this.state.showAllIndexes[index] ? 'mobile-show-less' : 'mobile-show-all';
          const buttonSvg = document.createElement('svg');
          buttonSvg.setAttribute('width', '16');
          buttonSvg.setAttribute('height', '16');
          const buttonSpan = document.createElement('span');
          buttonSpan.textContent = this.state.showAllIndexes[index] ? 'Show Less' : 'Show More';
          button.appendChild(buttonSvg);
          button.appendChild(buttonSpan);
          button.addEventListener('click', () => this.toggleShowAll(index, child.title));
          wrapper.appendChild(button);
        }

        container.appendChild(wrapper);
      }
    });
  }
}
