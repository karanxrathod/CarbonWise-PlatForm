export interface DetailBlock {
  explanation: string;
  implementationTips: string[];
  cost: string;
  savings: string;
  timeCommitment: string;
  feasibilityScore: number;
  resources: { name: string; url: string; description: string }[];
}

export const ACTION_DETAILS: Record<string, DetailBlock> = {
  // Transport Actions
  t1: {
    explanation: "Replacing high-emission automobile miles with fuel-free human energy immediately stops carbon combustion. Cycling or walking also reduces congestion-induced idling and local particulate matter (PM2.5) pollution, improving respiratory health.",
    implementationTips: [
      "Select one specific day of the week (e.g., 'Transit Tuesday') to formalize your cycle-commute.",
      "Use route planners to identify backstreets, bike paths, or green corridors that avoid high-speed vehicle lanes.",
      "Keep a changes of clothes at your destination to alleviate worries regarding morning perspiration."
    ],
    cost: "$0 (Immediate savings on fuel)",
    savings: "Est. $120+ USD annual savings on fuel and parking",
    timeCommitment: "15-30 extra minutes per trip depending on distance",
    feasibilityScore: 85,
    resources: [
      { name: "Google Maps Cycling Layer", url: "https://www.google.com/maps", description: "Navigate using dedicated bike lanes, tracks, and travel-times." },
      { name: "League of American Bicyclists Safety", url: "https://www.bikeleague.org", description: "Biking safety resources and commuter training tips." }
    ]
  },
  t2: {
    explanation: "Vehicular carpooling slices per-passenger transit emissions cleanly in half by concentrating trip demands. It minimizes active vehicle starts and takes passenger-less vehicles off the grid entirely.",
    implementationTips: [
      "Check with your school or workplace registry for dedicated regional carpooling interest lists.",
      "Establish clear rules regarding morning schedules, gas-splitting, and comfort preferences.",
      "Utilize commuter lanes (HOV lanes) to bypass rush-hour traffic gridlocks."
    ],
    cost: "Free to set up (Splits existing operational costs)",
    savings: "Est. $250 - $450 USD saved annually on fuel and tolls",
    timeCommitment: "10-15 extra minutes to coordinate pickups",
    feasibilityScore: 78,
    resources: [
      { name: "US EPA Carpool Guide", url: "https://www.epa.gov/transportation-air-pollution-and-climate-change", description: "Discover the federal guidance on co-travel benefits." },
      { name: "Waze Carpool Tips", url: "https://www.waze.com", description: "Intelligent ride matching and scheduling with nearby commuters." }
    ]
  },
  t3: {
    explanation: "Short-haul flights under 800 km exhibit the highest carbon intensity per kilometer flown due to the extreme fuel required during the takeoff/climb phase. Modern high-speed electric trains operate with approximately 90% lower carbon emissions per passenger-kilometer.",
    implementationTips: [
      "For regional business trips, compare the cumulative door-to-door transit time of trains (including security checks) to flights.",
      "Bring your laptop or a book to take advantage of quiet coaches with built-in Wi-Fi and direct power outlets.",
      "Book tickets at least 3 weeks in advance to secure optimal rates and promo tiers."
    ],
    cost: "Varies depending on booking time, usually comparable to flights",
    savings: "Est. $50+ USD saved on airport parking, transfers, and baggage fees",
    timeCommitment: "2-4 hours additional travel, offset by on-board productivity",
    feasibilityScore: 60,
    resources: [
      { name: "Intercity Train Timetables", url: "https://www.amtrak.com", description: "Check passenger rail routes, travel times, and discount rates." },
      { name: "Seat61 Train Travel Guide", url: "https://www.seat61.com", description: "A comprehensive handbook for switching from flight grids to trains worldwide." }
    ]
  },
  t4: {
    explanation: "Under-inflated tires increase rolling resistance coefficient on the road surface, forcing the vehicle's engine to work harder and burn up to 3% more fuel per trip. Proper inflation ensures optimal safety, long tire lifespans, and maximum mileage.",
    implementationTips: [
      "Locate the correct tire pressure rating for your vehicle on the placard inside the driver's door jam (not on the tire wall).",
      "Check tire pressure once a month when tires are 'cold' (i.e., driven less than 2 km).",
      "Purchase a small, inexpensive digital tire pressure gauge for your glove compartment."
    ],
    cost: "Under $10 USD for a gauge; gas station air pumps are free or $1.50",
    savings: "Est. 3% boost in total fuel efficiency; saves up to $60 USD on weekly commutes",
    timeCommitment: "5 minutes per month",
    feasibilityScore: 95,
    resources: [
      { name: "Fueleconomy.gov Maintenance Advice", url: "https://www.fueleconomy.gov", description: "Official EPA database on maintenance and fuel injection improvements." },
      { name: "Car Care Council Checks", url: "https://www.carcare.org", description: "Free routine inspection checklists for automotive efficiency." }
    ]
  },
  t5: {
    explanation: "Eliminating the physical grid travel of a commute removes vehicle emissions entirely. Telecommuting represents a major structural shift in daily energy consumption, freeing up commuter road capacity.",
    implementationTips: [
      "Present a formal, productivity-grounded proposal to your manager (highlighting quieter focused blocks of work).",
      "Set strict, physical boundaries between your working hours and relax hours at home to maintain mental wellness.",
      "Keep digital calendars updated with working availability indicators so cross-functional team collaborations stay aligned."
    ],
    cost: "$0 (Immediate cost reductions)",
    savings: "Est. $400 - $800 USD saved annually on gas, parking, and vehicle wear",
    timeCommitment: "Saves 40 to 90 minutes of daily travel time",
    feasibilityScore: 82,
    resources: [
      { name: "Global Workplace Analytics", url: "https://globalworkplaceanalytics.com", description: "Data on the environmental and economic value of remote workspaces." }
    ]
  },

  // Home Actions
  h1: {
    explanation: "ENERGY STAR certified LED lightbulbs use up to 75% less electricity than traditional incandescent bulbs and last up to 25 times longer. Because incandescents waste 90% of their energy generating heat, switching to LED reduces cooling loads as well.",
    implementationTips: [
      "Audit your home's most used lighting fixtures (kitchen, living room, and porch lights) and prioritize those for upgrades first.",
      "Match the color temperature of your new LEDs to your rooms (e.g., Warm White 2700K for bedrooms; Daylight 5000K for home offices).",
      "Dispose of any older compact fluorescent bulbs (CFLs) properly due to trace mercury elements."
    ],
    cost: "$15 - $30 USD (Upfront bulb pack)",
    savings: "Est. $80+ USD saved annually on utility bills (recovers cost in 3 months)",
    timeCommitment: "15-30 minutes to swap bulbs",
    feasibilityScore: 98,
    resources: [
      { name: "Energy Star Lighting Guide", url: "https://www.energystar.gov", description: "Official certification criteria and bulb recommendation tools." },
      { name: "US DOE Energy Saver Portal", url: "https://www.energy.gov/energysaver", description: "Federal guide to optimizing residential energy use." }
    ]
  },
  h2: {
    explanation: "Up to 90% of the electricity used by a washing machine goes toward heating the water. Washing clothes in cold water (ideal at 20-30°C) reduces thermal energy demand, preserves clothing fabric structures, and prevents colors from running.",
    implementationTips: [
      "Switch the dial on your washing machine control panel to 'Cold' or 'Eco-Cold'.",
      "Use modern liquid detergents, which are specially formulated with enzymes that activate efficiently in cold environments.",
      "Pre-treat stubborn grease spots or stains with stain-treatment formulas prior to cold washes."
    ],
    cost: "Free (Immediate switch)",
    savings: "Est. $40 - $70 USD saved annually on water-heating bills",
    timeCommitment: "None (zero changes to washing duration)",
    feasibilityScore: 95,
    resources: [
      { name: "American Cleaning Institute Study", url: "https://www.cleaninginstitute.org", description: "Scientific evidence showing cold water cleaning performance and energy drops." }
    ]
  },
  h3: {
    explanation: "Lowering your indoor heat setting in winter reduces the rate of temperature dissipation through windows and walls. Every 1°C reduction down to 18-19°C can shave around 5-10% off your overall heating energy consumption.",
    implementationTips: [
      "Dial the thermostat down at night and wear a comfortable, cozy sweater or flannel pajamas.",
      "Ensure thick wool rugs are placed on bare floors to interrupt drafts and retain heat.",
      "Use heavy insulating curtains over windows at dusk to prevent radiating warmth out."
    ],
    cost: "Free (Immediate adjustment)",
    savings: "Est. $75 - $120 USD saved on winter heating bills",
    timeCommitment: "Instant change",
    feasibilityScore: 90,
    resources: [
      { name: "US Dept of Energy Thermostat Advice", url: "https://www.energy.gov/energysaver/thermostats", description: "Energy guidelines for keeping warm while budgeting carbon output." }
    ]
  },
  h4: {
    explanation: "Traditional grids run on fossil fuels, creating considerable greenhouse gases. Choosing a utility option backed by 100% wind or solar redirects monthly bills toward financing renewable infrastructures and cleaning the electrical grid.",
    implementationTips: [
      "Examine your monthly retail utility bill for green energy surcharge option or alternative energy supplier disclosures.",
      "Look for community solar co-ops or green tariffs offered in your state that feed sun power straight to regional lines.",
      "Verify alternative providers are Green-e certified to ensure the validity and quality of the environmental claims."
    ],
    cost: "Ranges from $0 to a small surcharge ($5-10/month)",
    savings: "Extremely high carbon impact (up to 1.2 metric tons of CO2 offset annually)",
    timeCommitment: "15 minutes to switch online",
    feasibilityScore: 70,
    resources: [
      { name: "Green-e Certified Energy Directory", url: "https://www.green-e.org", description: "Search certified clean energy developers and green power products locally." },
      { name: "EPA Green Power Locator", url: "https://www.epa.gov/greenpower", description: "Interactive maps pointing to green grid providers around you." }
    ]
  },
  h5: {
    explanation: "Smart thermostats automate climate profiles by learning your daily occupancy schedules and dynamically adjusting temperatures. This eliminates heated or cooled air being wasted on an empty house.",
    implementationTips: [
      "Check with your local electric utility provider for instant mail-in rebates or discount codes first (often up to $100 off).",
      "Enable 'Geofencing' mode so the thermostat automatically turns on eco-efficiency settings when your phone leaves a 2 km radius.",
      "Verify compatibility with your home's central HVAC wiring before purchasing (checks for a 'C-wire' configuration)."
    ],
    cost: "$80 - $200 USD upfront (rebates often cover up to 50%)",
    savings: "Est. $100 - $180 USD saved on electricity annually (pays for itself in 1 year)",
    timeCommitment: "30-60 minutes for installation",
    feasibilityScore: 80,
    resources: [
      { name: "ENERGY STAR Connected Smart Thermostats", url: "https://www.energystar.gov/products/smart_thermostats", description: "List of certified models and utility savings projections." }
    ]
  },

  // Diet Actions
  d1: {
    explanation: "Animal agriculture, especially beef production, accounts for nearly 15% of annual global greenhouse emissions due to methane flatulence and deforestation for pasture. Swapping meat for plants for just one day a week is a simple, highly effective starting habit.",
    implementationTips: [
      "Choose Monday as your structured meat-free anchor to clean up your recovery after any weekend indulgences.",
      "Build satisfying dishes around rich plant-based protein complexes like lentils, black beans, chickpeas, and firm tofu.",
      "Incorporate umami flavors (using soy sauce, yeast flakes, and robust mushrooms) to satisfy any meat cravings."
    ],
    cost: "Saves money (plant proteins like beans are far cheaper than premium meats)",
    savings: "Est. $180+ USD saved annually on groceries",
    timeCommitment: "None (similar cooking prep time)",
    feasibilityScore: 92,
    resources: [
      { name: "Meatless Monday Global Campaign", url: "https://www.mondaycampaigns.org", description: "Inspirational vegan recipes, diet guides, and health studies." },
      { name: "EAT-Lancet Planetary Health Diet", url: "https://eatforum.org", description: "Scientific outlines for human nutrition that align perfectly with the biosphere." }
    ]
  },
  d2: {
    explanation: "Beef creates roughly 60 kg of greenhouse gases per kilogram of meat produced—nearly 10 times more than poultry or pork. Making a deliberate red-meat substitution drastically drops methane footprints without forcing a transition to full vegetarianism.",
    implementationTips: [
      "Switch out ground beef in spaghetti bolognese, lasagnas, or tacos for minced poultry or turkey.",
      "Explore high-quality plant-based meats (like pea-protein patties or soy-based links) as satisfying direct swaps.",
      "Prioritize red meat as an occasional celebratory food rather than a routine staple."
    ],
    cost: "$0 (Poultry and pork are generally more economical than beef)",
    savings: "Est. $100 - $220 USD saved on annual grocery bills",
    timeCommitment: "None",
    feasibilityScore: 85,
    resources: [
      { name: "Our World in Data Food Carbon", url: "https://ourworldindata.org/food-choice-vs-eating-local", description: "Visualized database showing detailed greenhouse intensity comparisons across food categories." }
    ]
  },
  d3: {
    explanation: "A fully plant-based diet represents the single most powerful individual dial you can turn to address land degradation, water usage, and carbon emissions in one go. Doing a trial week kickstarts gut-biome diversification and raises shopping literacy.",
    implementationTips: [
      "Plan your entire week's menu and pre-purchase healthy grains, greens, and plant milks before starting.",
      "Learn to cook two easily customizable plant recipes (like robust vegetable curries or loaded burrito bowls).",
      "Do not just eliminate meat—ensure you replace those calories with nutrient-dense legumes and nuts to maintain steady energy levels."
    ],
    cost: "Saves money if avoiding processed mock meats and cooking from whole foods",
    savings: "Est. $15 - $30 USD grocery savings in a single trial week",
    timeCommitment: "1-2 hours of meal planning and grocery scanning",
    feasibilityScore: 75,
    resources: [
      { name: "Vegan Society Starter Kit", url: "https://www.vegansociety.com", description: "Step-by-step guides for nutrition balance, replacements, and quick recipes." },
      { name: "Forks Over Knives Recipes", url: "https://www.forksoverknives.com", description: "Large database of delicious plant-based culinary inspirations." }
    ]
  },
  d4: {
    explanation: "Transporting food over long international shipping routes (generating massive 'food miles') accounts for a portion of total agricultural emissions. Sourcing from local farms supports family growers and provides denser nutrients due to immediate harvesting cycles.",
    implementationTips: [
      "Visit regional farmers markets or sign up for a local Community Supported Agriculture (CSA) box delivery program.",
      "Check food placards at grocery stores to prioritize produce grown in your home state or country.",
      "Familiarize yourself with what produce is naturally seasonal in your region (e.g., squashes in fall, berries in summer)."
    ],
    cost: "Comparable to standard stores; CSA boxes are often cheaper in peak seasons",
    savings: "Higher freshness and longer product shelf-life prevents spoilage",
    timeCommitment: "1-2 hours on weekends to visit a local market",
    feasibilityScore: 80,
    resources: [
      { name: "LocalHarvest Directory", url: "https://www.localharvest.org", description: "Find regional CSA farms, organic markets, and co-ops near your zip code." },
      { name: "USDA Seasonal Produce Guide", url: "https://www.usda.gov", description: "Check seasonality calendars to design low-emission shopping patterns." }
    ]
  },
  d5: {
    explanation: "Roughly one-third of all global food produced is lost or thrown away, ending up rotting in municipal landfills and generating potent methane gas. Perfect planning cuts down food spending, maximizes utility, and reduces processing waste.",
    implementationTips: [
      "Perform a quick inventory check of your refrigerator before writing your weekly shopping list to avoid duplicating ingredients.",
      "Incorporate an 'Eat Me First' storage bin in your fridge to group ingredients that are reaching expiration dates.",
      "Utilize your freezer proactively to extend the lifespan of surplus breads, ripe bananas, or leftovers."
    ],
    cost: "Free (Immediate savings)",
    savings: "Est. $300 - $600 USD saved annually on discarded, spoiled foods",
    timeCommitment: "15 minutes of kitchen planning per week",
    feasibilityScore: 88,
    resources: [
      { name: "Save The Food Campaign", url: "https://savethefood.com", description: "Interactive kitchen organizers, storage calculators, and waste reduction blueprints." }
    ]
  },

  // Shopping Actions
  s1: {
    explanation: "The fast-fashion textile loop burns vast groundwater resources and generates massive chemical run-offs, leading to landfills overflowing with polyester synthetic blends. Sourcing second-hand circumvents this manufacturing carbon cost entirely.",
    implementationTips: [
      "Visit consignment boutiques, thrift shops, and online pre-loved marketplaces first when seeking common outerwear or accessories.",
      "Focus on durable, classic vintage garments constructed from natural fibers like leather, cotton, or denim that outlive trend cycles.",
      "Participate in community clothing exchanges with friends to naturally switch up your wardrobe in a circular manner."
    ],
    cost: "Vastly cheaper (consignment clothes are often 70% cheaper than retail)",
    savings: "Est. $200 - $500 USD saved annually on apparel",
    timeCommitment: "Takes slightly longer to search and find specific sizes",
    feasibilityScore: 82,
    resources: [
      { name: "ThredUP Fashion Footprint Calculator", url: "https://www.thredup.com/fashionfootprintcalculator", description: "Determine the exact environmental conservation statistics of buying clothes second-hand." },
      { name: "Good On You Ethics Brand Index", url: "https://goodonyou.tech", description: "Check ethical scores and sustainability grades of leading global apparel brands." }
    ]
  },
  s2: {
    explanation: "Solo, rapid shipping options require courier trucks to make repetitive deliveries to your neighborhood, increasing fuel combustion. Consolidation into single orders enables carriers to design logical routes, maximizing delivery volume efficiency.",
    implementationTips: [
      "Select an offline delivery anchor (like an Amazon Locker or central pick-up point) to bundle drop-offs.",
      "Activate consolidation shipping options at checkout (e.g., 'Amazon Day Delivery') rather than choosing separate shipments.",
      "Keep items in your virtual cart until you've reached a bulk minimum of 3-4 items to trigger a single combined shipment."
    ],
    cost: "Free (Often saves on individual shipping fees)",
    savings: "Est. $30 - $80 USD saved on delivery feeds",
    timeCommitment: "Requires patience for some items to be consolidated",
    feasibilityScore: 90,
    resources: [
      { name: "EPA SmartWay Transportation Partners", url: "https://www.epa.gov/smartway", description: "Resources detailing green logistics and clean freight carrier operations." }
    ]
  },
  s3: {
    explanation: "Manufacturing advanced digital electronics releases massive amounts of industrial emissions (and mining precious elements like cobalt or lithium creates considerable ecological stress). Repairing devices extends critical lifecycle durability.",
    implementationTips: [
      "When a phone battery or glass screen fails, check local repair clinics or order DIY replacement hardware kits instead of purchasing a brand-new device.",
      "Perform simple software maintenance routines (clearing caches, upgrading OS) to keep computers running fast.",
      "Donate or recycle end-of-life electronics responsibly to specialized gold/rare-earth scrap processors."
    ],
    cost: "$20 - $80 USD for repair fixes, compared to $600 - $1000 USD for a new phone",
    savings: "Est. $300 - $700 USD saved on device replacement cycles",
    timeCommitment: "1-2 hours of local coordination or self-repair focus",
    feasibilityScore: 68,
    resources: [
      { name: "iFixit Repair Manuals", url: "https://www.ifixit.com", description: "Step-by-step diagnostic and hardware repair guides for thousands of electronic devices." },
      { name: "E-Stewards Certified Recycling", url: "https://e-stewards.org", description: "Locate verified, non-hazardous recycling centers for outdated technology near you." }
    ]
  },
  s4: {
    explanation: "Single-use cups, even paper ones, are lined with polyethylene plastic that renders them un-recyclable. This synthetic lining takes decades to break down in landfills. Reusable double-walled flasks preserve drink heat and prevent waste generation.",
    implementationTips: [
      "Place your favorite reusable stainless steel tumbler right beside your keys or backpack so you never walk out the door without it.",
      "Request cafe baristas to fill your own travel mug directly (many coffee houses award a small discount for bringing your own container).",
      "Keep a backup washable mug on your workplace desk or in your student locker."
    ],
    cost: "$15 - $25 USD (Initial high-quality travel flask)",
    savings: "Est. $20 - $40 USD saved annually from café reusable discounts",
    timeCommitment: "2 minutes of simple washing daily",
    feasibilityScore: 95,
    resources: [
      { name: "Carry Your Cup Campaign", url: "https://www.epa.gov", description: "Environmental studies highlighting paper-cup life cycle consumption rates." }
    ]
  },
  s5: {
    explanation: "Product packaging, particularly single-use thin films, consumes large volumes of petrochemical energy to manufacture and immediate generates massive residential waste. Sourcing dried foods in large bulk formats avoids packaging volume clean.",
    implementationTips: [
      "Equip yourself with a set of lightweight mesh bulk bags and clear glass jars when shopping.",
      "Head to bulk food aisles to dispense dried oats, rice, nuts, grains, and baking spices into your reusable containers.",
      "Transfer bulk ingredients into airtight storage jars in your house pantry to keep them fresh long-term."
    ],
    cost: "Saves money (bulk format ingredients are typically 20-30% cheaper since you aren't paying for marketing plastic)",
    savings: "Est. $120+ USD saved annually on pantry staples",
    timeCommitment: "10-15 extra minutes to fill glass jars at checkout",
    feasibilityScore: 78,
    resources: [
      { name: "Zero Waste International Alliance", url: "https://zwia.org", description: "Global resources, guidelines, and directories promoting circular zero-waste styles." }
    ]
  }
};
