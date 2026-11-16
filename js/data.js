/* ============================================================================
   BSH — SITE CONTENT
   ----------------------------------------------------------------------------
   This is the ONLY file you need to edit for day-to-day changes.
   Everything on the site is built from the object below.

   Quick map:
     SITE.identity ... logo, year, clock
     SITE.background. the looping video behind the home page
     SITE.nav ....... the five links on the home screen
     SITE.works ..... your portfolio pieces
     SITE.rates ..... your pricing page
     SITE.info ...... your bio, services and client list
     SITE.contact ... your links

   Rules of thumb:
     - Keep the commas between { } blocks. A missing comma breaks the page.
     - Use straight quotes "like this", never curly “smart quotes”.
     - Paths are relative to the site root: "media/works/my-film.jpg"
   ========================================================================== */

const SITE = {

  /* ------------------------------------------------------------------ */
  /*  IDENTITY                                                          */
  /* ------------------------------------------------------------------ */
  identity: {
    // Shown in the centre of the nav. Leave logoImage null to use the text.
    name: "BSH",
    // When your logo file is ready, drop it in media/ and put the path here:
    //   logoImage: "media/bsh-logo.svg",
    logoImage: null,
    // Alt text / browser tab title
    fullName: "Bayo says hi",
    tagline: "Videography & Film",
    // Bottom-right of the nav
    year: "2026",
    // Bottom-left of the nav — live clock. Any IANA timezone.
    timezone: "America/Vancouver"
  },

  /* ------------------------------------------------------------------ */
  /*  HOME BACKGROUND VIDEO                                             */
  /*  Swap these two paths for your own showreel and its still frame.   */
  /*  Keep the video under ~15 MB so the page loads fast.               */
  /* ------------------------------------------------------------------ */
  background: {
    video: "media/bg/reel.mp4",
    // Still image shown while the video loads, and on phones that block autoplay
    poster: "media/bg/reel.jpg",
    // 0 = video at full brightness, 0.6 = heavily darkened. Helps nav legibility.
    dim: 0.25
  },

  /* ------------------------------------------------------------------ */
  /*  NAVIGATION                                                        */
  /*  Five slots, in this order:                                        */
  /*    [0] far left (gets the clock)                                   */
  /*    [1] left-centre                                                 */
  /*        -- logo sits in the middle automatically --                 */
  /*    [2] right-centre                                                */
  /*    [3] far right (gets the year)                                   */
  /*                                                                    */
  /*  To ADD A NEW SECTION (e.g. ARCHIVE) see README.md — short version:*/
  /*  add an entry here and create a matching .html page.               */
  /* ------------------------------------------------------------------ */
  nav: [
    { label: "WORKS",   href: "works.html"   },
    { label: "RATES",   href: "rates.html"   },
    { label: "INFO",    href: "info.html"    },
    { label: "CONTACT", href: "contact.html" }
  ],

  /* ------------------------------------------------------------------ */
  /*  WORKS                                                             */
  /*  Each entry is one panel on the Works page.                        */
  /*                                                                    */
  /*  poster : REQUIRED. A still image. This is what shows by default,  */
  /*           and it is your placeholder until the video is ready.     */
  /*  video  : OPTIONAL. Leave as null and the still just sits there.   */
  /*           Add a path and the panel plays it on hover.              */
  /*  link   : OPTIONAL. Vimeo/YouTube/anywhere. Makes the panel        */
  /*           clickable. Leave null for no link.                       */
  /*                                                                    */
  /*  Newest work goes at the TOP of this list.                         */
  /* ------------------------------------------------------------------ */
  works: [
    {
      title:  "PLACEHOLDER ONE",
      client: "Client name",
      year:   "2026",
      role:   "Director / Editor",
      poster: "media/works/work-01.jpg",
      video:  null,
      link:   null
    },
    {
      title:  "PLACEHOLDER TWO",
      client: "Client name",
      year:   "2026",
      role:   "Camera / Edit",
      poster: "media/works/work-02.jpg",
      video:  null,
      link:   null
    },
    {
      title:  "PLACEHOLDER THREE",
      client: "Client name",
      year:   "2025",
      role:   "Director of Photography",
      poster: "media/works/work-03.jpg",
      video:  null,
      link:   null
    },
    {
      title:  "PLACEHOLDER FOUR",
      client: "Client name",
      year:   "2025",
      role:   "Editor",
      poster: "media/works/work-04.jpg",
      video:  null,
      link:   null
    },
    {
      title:  "PLACEHOLDER FIVE",
      client: "Client name",
      year:   "2025",
      role:   "Director / Editor",
      poster: "media/works/work-05.jpg",
      video:  null,
      link:   null
    },
    {
      title:  "PLACEHOLDER SIX",
      client: "Client name",
      year:   "2024",
      role:   "Camera",
      poster: "media/works/work-06.jpg",
      video:  null,
      link:   null
    },
    {
      title:  "PLACEHOLDER SEVEN",
      client: "Client name",
      year:   "2024",
      role:   "Director / Editor",
      poster: "media/works/work-07.jpg",
      video:  null,
      link:   null
    },
    {
      title:  "PLACEHOLDER EIGHT",
      client: "Client name",
      year:   "2024",
      role:   "Colour / Edit",
      poster: "media/works/work-08.jpg",
      video:  null,
      link:   null
    }
  ],

  /* ------------------------------------------------------------------ */
  /*  RATES                                                             */
  /*  intro    : one or two lines above the packages                    */
  /*  packages : each becomes a block. "items" is the bullet list.      */
  /*  notes    : small print under everything                           */
  /* ------------------------------------------------------------------ */
  rates: {
    intro: [
      "RATES ARE A STARTING POINT, NOT A CEILING OR A FLOOR.",
      "EVERY PROJECT GETS A QUOTE BUILT AROUND ITS SCOPE, CREW AND TURNAROUND."
    ],
    packages: [
      {
        name:  "HALF DAY",
        price: "FROM $———",
        meta:  "UP TO 4 HOURS",
        items: [
          "Solo shooter, own kit",
          "Single location",
          "Edited cut delivered in 7 days",
          "One round of revisions"
        ]
      },
      {
        name:  "FULL DAY",
        price: "FROM $———",
        meta:  "UP TO 9 HOURS",
        items: [
          "Solo shooter or small crew",
          "Multiple locations",
          "Edited cut delivered in 10 days",
          "Two rounds of revisions",
          "Colour grade included"
        ]
      },
      {
        name:  "EDIT ONLY",
        price: "FROM $———",
        meta:  "PER FINISHED MINUTE",
        items: [
          "You supply the footage",
          "Assembly, cut, sound and grade",
          "Two rounds of revisions",
          "Source files returned on request"
        ]
      },
      {
        name:  "EVENT COVERAGE",
        price: "FROM $———",
        meta:  "PER EVENT",
        items: [
          "Weddings, conferences, live sets",
          "Highlight reel plus full-length cut",
          "Second shooter available",
          "Delivered in 14 days"
        ]
      }
    ],
    notes: [
      "TRAVEL BEYOND METRO VANCOUVER BILLED SEPARATELY.",
      "50% DEPOSIT CONFIRMS THE DATE. BALANCE ON DELIVERY.",
      "RUSH TURNAROUND AVAILABLE AT +30%."
    ]
  },

  /* ------------------------------------------------------------------ */
  /*  INFO                                                              */
  /* ------------------------------------------------------------------ */
  info: {
    bio: [
      "HI — I AM BAYO, A FILMMAKER AND VIDEO EDITOR",
      "BASED IN METRO VANCOUVER, BRITISH COLUMBIA."
    ],
    servicesHeading: "HERE ARE THE SERVICES I PROVIDE:",
    services: [
      "DIRECTION",
      "CINEMATOGRAPHY",
      "VIDEO EDITING",
      "COLOUR GRADING",
      "EVENT COVERAGE",
      "SHORT FILM",
      "MUSIC VIDEO",
      "MOTION GRAPHICS"
    ],
    // Big image strip across the middle of the Info page.
    // Add as many as you like — they lay out in a row.
    strip: [
      "media/works/work-01.jpg",
      "media/works/work-02.jpg",
      "media/works/work-03.jpg",
      "media/works/work-04.jpg",
      "media/works/work-05.jpg",
      "media/works/work-06.jpg",
      "media/works/work-07.jpg",
      "media/works/work-08.jpg"
    ],
    clientsHeading: "CLIENTS/",
    clientGroups: [
      {
        name: "BRANDS",
        list: ["YOUR CLIENT", "YOUR CLIENT", "YOUR CLIENT", "YOUR CLIENT"]
      },
      {
        name: "INDEPENDENTS",
        list: ["YOUR CLIENT", "YOUR CLIENT", "YOUR CLIENT", "YOUR CLIENT"]
      }
    ],
    footer: [
      "© 2026 COPYRIGHT",
      "FILM AND CREATIVE DIRECTION",
      "ALL RIGHTS RESERVED BAYO SAYS HI®"
    ]
  },

  /* ------------------------------------------------------------------ */
  /*  CONTACT                                                           */
  /*  Links arrange themselves around the page, KARGO-style.            */
  /*  Delete one and the rest re-space automatically.                   */
  /* ------------------------------------------------------------------ */
  contact: {
    // Optional cut-out image in the centre. Set to null for type only.
    portrait: "media/bg/contact-still.jpg",
    links: [
      { label: "INSTAGRAM", href: "https://instagram.com/bayo_oj" },
      { label: "MAIL",      href: "mailto:bayosayshi@gmail.com"    },
      { label: "YOUTUBE",   href: "https://youtube.com/@Bayosayshi"  },
      { label: "LINKEDIN",  href: "https://linkedin.com/in/ojoadebayo" }
    ],
    // Shown small at the bottom. Leave as empty strings to hide.
    location: "METRO VANCOUVER, BC",
    availability: "AVAILABLE FOR COMMISSIONS"
  }

};
