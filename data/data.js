// data.js
export const slides = [
    {
        image: "images/header-slider/pride-world-city-01.webp",
        subtitle:"Pride World City Pune",
        title: "Welcome to Pride World City",
        description:
            " Welcome to Pride World City – Where Life Comes Together"
    },
    {
        image: "images/header-slider/pride-world-city-02.webp",
        subtitle:"Luxury Apartments in Pune",
        title: "Modern Apartments",
        description:
            "Your Dream Home in Pune's Most Integrated Township"
    },
    {
        image: "images/header-slider/pride-world-city-03.webp",
        subtitle:"Township Projects in Pune",
        title: "Premium Residences",
        description:
            "Premium Residences in a Thriving Urban Community"
    },
];

// projects.js
export const projects = [
    {
        name: "Miami",
        subtitle: "Ultra Luxury Lifestyle",
        description:
            "Premium hill-facing apartments designed with elegance and modern comfort.",

        stats: [
            { label: "Acres",      value: "10" },
            { label: "Towers",     value: "9"  },
            { label: "Floors",     value: "23" },
            { label: "Apartments", value: "1200" }
        ],

        features: [
            "2BHK, 3BHK & 4.5BHK Apartments",
            "Hill-facing Apartments",
            "Smart Home Automation",
            "Wooden Flooring in Master Bedroom",
            "Designer Balconies with LED False-ceiling",
            "45+ Lifestyle Amenities"
        ],

        images: [
            "images/miami/miami-01.webp",
            "images/miami/miami-02.webp",
            "images/miami/miami-03.webp",
            "images/miami/miami-04.webp",
            "images/miami/miami-05.webp",
        ],

        tags: [
            "Smart Home",
            "40+ Amenities"
        ],

        qr:[
            { img: "images/miami/miami-qr-01.webp", number: "P52100077670" },
            { img: "images/miami/miami-qr-02.webp", number: "PR1260002502081" }
        ],
        
        link: "brochure/miami.pdf",
    },

    {
        name: "Montreal",
        subtitle: "Exclusive Duplex Living",
        description:
            "Exclusive duplex residences with premium specifications and double-height living.",

        stats: [
            { label: "Acres",      value: "10" },
            { label: "Towers",     value: "8"  },
            { label: "Floors",     value: "28" },
            { label: "Apartments", value: "900" }
        ],

        features: [
            "2BHK, 3BHK & 4BHK Duplex Apartments",
            "True Two-Floor Duplex Homes",
            "Double-height Living Area",
            "45+ Premium Amenities",
            "Smart Home Automation",
            "Superior Specifications"
        ],

        images: [
            "images/montreal/montreal-01.webp",
            "images/montreal/montreal-02.webp",
            "images/montreal/montreal-03.webp",
            "images/montreal/montreal-04.webp",
        ],

        qr:[
          {  img: "images/montreal/montreal-qr-01.webp",
             number:"P52100053279",
          },
          { img:"images/montreal/montreal-qr-02.webp", 
            number:"P52100077138"
          }
        ],
        
        tags: [
            "Duplex Homes",
            "Premium Design"
        ],

        link: "brochure/montreal.pdf",
    },

    {
        name: "Boston",
        subtitle: "Premium 2 BHK Residences",
        description:
            "Spacious residences crafted for modern urban lifestyles and skyline views.",

        stats: [
            { label: "Acres",      value: "8.5" },
            { label: "Towers",     value: "10"  },
            { label: "Floors",     value: "23"  },
            { label: "Apartments", value: "1800" }
        ],

        features: [
            "Two Podiums with Panoramic Views",
            "2BHK (S) and 2BHK (L) Apartments",
            "100% Covered Multilevel Parking",
            "L-Shaped Living-Dining",
            "Open Dry Balcony"
        ],

        images: [
            "images/boston/boston-01.webp",
            "images/boston/boston-02.webp",
            "images/boston/boston-03.webp",
            "images/boston/boston-04.webp",

        ],

        qr:[
            { img: "images/boston/boston-qr-01.webp", number: "P52100049648" },
            { img: "images/boston/boston-qr-02.webp", number: "P52100078307" }
        ],

        tags: [
            "Double Balcony",
            "Skyline Views"
        ],
        link: "brochure/boston.pdf",
    }
];


// Project Flat Data
export const projectFlats = {

    Miami: [
        {
            type: "2 BHK",
            price: "₹ 89 Lakhs",
            available: "Available"
        },
        {
            type: "3 BHK",
            price: "₹ 1.2 Cr",
            available: "Few Units Left"
        },
        {
            type: "4.5 BHK",
            price: "₹ 2.70 Cr",
            available: "Few Units Left"
        }
    ],

    Montreal: [
        {
            type: "Duplex 2 BHK",
            price: "₹ 1 Cr",
            available: "Available"
        },
        {
            type: "Duplex 3 BHK",
            price: "₹ 1.68 Cr",
            available: "Available"
        },
        {
            type: "Duplex 4 BHK",
            price: "₹ 2.30 Cr",
            available: "Available"
        }
    ],

    Boston: [
        {
            type: "2 BHK",
            price: "₹ 69.99 Lakhs",
            available: "Available"
        }
    ],
};

// amenities data
export const amenitiesData = [
    {
        title: "Global International School",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-slate-700">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>`
    },
    {
        title: "Banks",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-slate-700">
                <rect x="2" y="17" width="20" height="3" rx="1"/>
                <path d="M3 17V10M21 10v7M12 10v7M7 10v7M17 10v7"/>
                <path d="m2 10 10-6 10 6Z"/>
              </svg>`
    },
    {
        title: "Pcmc Electric Bus Station",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-slate-700">
                <path d="M4 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5"/>
                <path d="M4 18v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h10v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1"/>
                <rect x="4" y="11" width="16" height="7" rx="1"/>
                <path d="M6 15h2M16 15h2"/>
              </svg>`
    },
    {
        title: "Zudio Shopping Center",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-slate-700">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/>
                <path d="M14.5 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM9.5 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>
                <path d="M8 15s1.5 2 4 2 4-2 4-2"/>
              </svg>`
    },
    {
        title: "Town Plaza",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-slate-700">
                <path d="M3 9h18M3 12h18M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z"/>
                <path d="M7 15h2v3H7zM15 15h2v3h-2z"/>
              </svg>`
    },
    {
        title: "Club Charholi",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 text-slate-700">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>`
    }
];
