// Rich multi-category, multilingual word dataset for Imposter
export const CATEGORIES = [
  { id: 'all', name: 'Random Chaos', icon: '🎲', color: '#8b5cf6', desc: 'Mix of every category!' },
  { id: 'food', name: 'Food & Snacks', icon: '🍕', color: '#f59e0b', desc: 'Delicious dishes, street eats & drinks' },
  { id: 'college', name: 'College & Hostel', icon: '🎓', color: '#06b6d4', desc: 'Exams, canteen, arrears & campus life' },
  { id: 'kollywood', name: 'Tamil Cinema', icon: '🎬', color: '#ec4899', desc: 'Actors, blockbusters, iconic scenes' },
  { id: 'cricket', name: 'Cricket & Sports', icon: '🏏', color: '#10b981', desc: 'CSK, players, match moments' },
  { id: 'tech', name: 'Tech & Gadgets', icon: '💻', color: '#3b82f6', desc: 'Phones, apps, internet, AI & hardware' },
  { id: 'movies', name: 'Hollywood & Films', icon: '🍿', color: '#ef4444', desc: 'Global blockbuster films & pop culture' },
  { id: 'memes', name: 'Memes & Slang', icon: '🎭', color: '#a855f7', desc: 'Viral templates, dialogues & funny tropes' },
  { id: 'places', name: 'Places & Cities', icon: '🏛️', color: '#14b8a6', desc: 'Tamil Nadu, monuments & iconic places' },
  { id: 'animals', name: 'Animals & Birds', icon: '🐾', color: '#84cc16', desc: 'Wild creatures, pets & nature' },
  { id: 'gaming', name: 'Gaming & Anime', icon: '🎮', color: '#6366f1', desc: 'PUBG, GTA, Naruto, Minecraft & more' },
];

export const WORDS_DATA = {
  food: [
    { word: "Pizza", tamil: "பீட்சா", tanglish: "Pizza", hint: "Fast food with cheese & crust", decoys: ["Burger", "Sandwich", "Pasta"] },
    { word: "Biryani", tamil: "பிரியாணி", tanglish: "Briyani", hint: "Spiced fragrant rice favorite", decoys: ["Fried Rice", "Pulao", "Kothu Parotta"] },
    { word: "Dosa", tamil: "தோசை", tanglish: "Dosai", hint: "Crispy tawa pancake with chutney", decoys: ["Idli", "Poori", "Uttapam"] },
    { word: "Kothu Parotta", tamil: "கொத்து பரோட்டா", tanglish: "Kothu Parotta", hint: "Shredded flatbread roadside special", decoys: ["Biryani", "Shawarma", "Fried Rice"] },
    { word: "Filter Coffee", tamil: "ஃபில்டர் காபி", tanglish: "Filter Coffee", hint: "Frothy morning drink in dabarah set", decoys: ["Tea", "Horlicks", "Badam Milk"] },
    { word: "Pani Puri", tamil: "பானி பூரி", tanglish: "Pani Puri", hint: "Hollow crisp balls filled with tangy water", decoys: ["Bhel Puri", "Samosa", "Chaat"] },
    { word: "Shawarma", tamil: "ஷவர்மா", tanglish: "Shawarma", hint: "Meat rolled inside kuboos", decoys: ["Roll", "Burger", "Sandwich"] },
    { word: "Maggi", tamil: "மேகி", tanglish: "Maggi", hint: "2-minute hostel midnight savior", decoys: ["Noodles", "Pasta", "Soup"] },
    { word: "Jigarthanda", tamil: "ஜிகர்தண்டா", tanglish: "Jigarthanda", hint: "Cool sweet Madurai drink", decoys: ["Falooda", "Rose Milk", "Badam Milk"] },
    { word: "Burger", tamil: "பர்கர்", tanglish: "Burger", hint: "Patty inside rounded buns", decoys: ["Sandwich", "Pizza", "Hot Dog"] },
    { word: "Ice Cream", tamil: "ஐஸ்கிரீம்", tanglish: "Ice Cream", hint: "Frozen sweet scoop", decoys: ["Kulfi", "Cake", "Pudding"] },
    { word: "Vada Pav", tamil: "வடா பாவ்", tanglish: "Vada Pav", hint: "Spicy potato fritter inside bread bun", decoys: ["Samosa", "Bonda", "Bajji"] },
    { word: "Chicken 65", tamil: "சிக்கன் 65", tanglish: "Chicken 65", hint: "Crispy red deep-fried starter", decoys: ["Chicken Lollipop", "Fish Fry", "Tandoori"] },
    { word: "Idli Sambar", tamil: "இட்லி சாம்பார்", tanglish: "Idli Sambar", hint: "Steamed fluffy cakes soaked in lentil stew", decoys: ["Vada Sambar", "Pongal", "Poori Masala"] }
  ],

  college: [
    { word: "Semester Exam", tamil: "செமஸ்டர் தேர்வு", tanglish: "Semester Exam", hint: "End of term high pressure evaluation", decoys: ["Internal Exam", "Lab Viva", "Assignment"] },
    { word: "Canteen", tamil: "கேண்டீன்", tanglish: "Canteen", hint: "Campus spot where students chill instead of class", decoys: ["Library", "Auditorium", "Hostel Room"] },
    { word: "Arrear / Backlog", tamil: "அரியர்", tanglish: "Arrear", hint: "The feared un-cleared paper", decoys: ["O Grade", "Placement", "Detention"] },
    { word: "Proxy Attendance", tamil: "ப்ராக்ஸி அட்னன்ஸ்", tanglish: "Proxy Attendance", hint: "Calling present for an absent friend", decoys: ["OD Letter", "Medical Leave", "Bunk"] },
    { word: "Hostel Warden", tamil: "ஹாஸ்டல் வார்டன்", tanglish: "Hostel Warden", hint: "Strict authority monitoring evening roll call", decoys: ["HOD", "Lab Assistant", "Watchman"] },
    { word: "Record Notebook", tamil: "ரெக்கார்ட் நோட்", tanglish: "Record Note", hint: "Thick book with diagrams submitted before lab", decoys: ["Observation Note", "Assignment Sheet", "Rough Book"] },
    { word: "Campus Placement", tamil: "பிளேஸ்மென்ட்", tanglish: "Campus Placement", hint: "Aptitude, coding rounds, and dream job offer", decoys: ["Internship", "Higher Studies", "Final Project"] },
    { word: "Industrial Visit (IV)", tamil: "ஐவி (IV) டூர்", tanglish: "IV Tour", hint: "Official study trip that's actually a holiday", decoys: ["Symposium", "Sports Day", "College Culturals"] },
    { word: "Project Review", tamil: "புராஜெக்ட் ரிவியூ", tanglish: "Project Review", hint: "Explaining PPT and code to external examiners", decoys: ["Seminar", "Viva Voce", "Model Exam"] },
    { word: "Late Slip", tamil: "லேட் ஸ்லிப்", tanglish: "Late Slip", hint: "Permission slip for walking in after gate closed", decoys: ["Gate Pass", "Hall Ticket", "ID Card"] },
    { word: "College Bus", tamil: "காலேஜ் பஸ்", tanglish: "College Bus", hint: "Yellow transport where last row plays songs", decoys: ["Local Train", "Bike", "Hostel Van"] },
    { word: "Symposium", tamil: "சிம்போசியம்", tanglish: "Symposium", hint: "Inter-college event with paper presentation & gaming", decoys: ["Culturals", "Alumni Meet", "Sports Day"] }
  ],

  kollywood: [
    { word: "Thalapathy Vijay", tamil: "தளபதி விஜய்", tanglish: "Thalapathy Vijay", hint: "Box office king, Leo & Ghilli star", decoys: ["Thala Ajith", "Suriya", "Rajinikanth"] },
    { word: "Superstar Rajinikanth", tamil: "சூப்பர்ஸ்டார் ரஜினி", tanglish: "Superstar Rajini", hint: "Jailer, Baashha, iconic sunglasses flip", decoys: ["Kamal Haasan", "Vijayakanth", "Sathyaraj"] },
    { word: "Anirudh", tamil: "அனிருத்", tanglish: "Rockstar Anirudh", hint: "Hukum, Master, vibrant BGM composer", decoys: ["A.R. Rahman", "Yuvan Shankar Raja", "Harris Jayaraj"] },
    { word: "Vikram (LCU)", tamil: "விக்ரம்", tanglish: "Vikram LCU", hint: "Kamal, Rolex, agent mystery cinematic universe", decoys: ["Kaithi", "Leo", "Master"] },
    { word: "Vadivelu", tamil: "வடிவேலு", tanglish: "Vaigai Puyal Vadivelu", hint: "The undisputed king of Tamil comedy & memes", decoys: ["Goundamani", "Santhanam", "Vivek"] },
    { word: "Baashha", tamil: "பாட்ஷா", tanglish: "Baashha", hint: "Auto driver who is actually an underworld don", decoys: ["Padayappa", "Muthu", "Annamalai"] },
    { word: "Mankatha", tamil: "மங்காத்தா", tanglish: "Mankatha", hint: "No guts no glory heist movie with Vinayak Mahadev", decoys: ["Billa", "Vedalam", "Thunivu"] },
    { word: "A.R. Rahman", tamil: "ஏ.ஆர். ரஹ்மான்", tanglish: "AR Rahman", hint: "Isai Puyal, Oscar winning maestro", decoys: ["Ilaiyaraaja", "Anirudh", "Yuvan"] },
    { word: "Nayanthara", tamil: "நயன்தாரா", tanglish: "Lady Superstar Nayanthara", hint: "Lady Superstar of South Indian cinema", decoys: ["Trisha", "Samantha", "Keerthy Suresh"] },
    { word: "First Day First Show (FDFS)", tamil: "எப்.டி.எப்.எஸ் (FDFS)", tanglish: "FDFS", hint: "4 AM celebration, milk abishekam & crackers", decoys: ["Matinee", "Teaser Launch", "Audio Launch"] }
  ],

  cricket: [
    { word: "MS Dhoni", tamil: "எம்.எஸ். தோனி", tanglish: "Thala Dhoni", hint: "Captain Cool, legendary finisher #7", decoys: ["Virat Kohli", "Rohit Sharma", "Sachin Tendulkar"] },
    { word: "Virat Kohli", tamil: "விராட் கோலி", tanglish: "King Kohli", hint: "Run machine, aggressive chase master", decoys: ["MS Dhoni", "KL Rahul", "Shubman Gill"] },
    { word: "Chennai Super Kings (CSK)", tamil: "சிஎஸ்கே (CSK)", tanglish: "Whistle Podu CSK", hint: "Yellow jersey, Chepauk fortress team", decoys: ["Mumbai Indians", "RCB", "KKR"] },
    { word: "Helicopter Shot", tamil: "ஹெலிகாப்டர் ஷாட்", tanglish: "Helicopter Shot", hint: "Iconic flick of wrists hitting yorker for six", decoys: ["Cover Drive", "Scoop Shot", "Pull Shot"] },
    { word: "Super Over", tamil: "சூப்பர் ஓவர்", tanglish: "Super Over", hint: "Tied match one-over tiebreaker decider", decoys: ["Powerplay", "Death Overs", "DRS Review"] },
    { word: "Yorker", tamil: "யார்க்கர்", tanglish: "Yorker", hint: "Toe-crushing delivery aimed right at the crease", decoys: ["Bouncer", "Googly", "Slower Ball"] },
    { word: "DRS Review", tamil: "டி.ஆர்.எஸ் (DRS)", tanglish: "DRS Review", hint: "Third umpire ball-tracking and ultra-edge check", decoys: ["Free Hit", "No Ball", "Run Out"] },
    { word: "Chepauk Stadium", tamil: "சேப்பாக்கம் மைதானம்", tanglish: "Chepauk Stadium", hint: "Historic MA Chidambaram roar in Chennai", decoys: ["Wankhede", "Eden Gardens", "Chinnaswamy"] }
  ],

  tech: [
    { word: "Smartphone", tamil: "ஸ்மார்ட்போன்", tanglish: "Smartphone", hint: "Pocket screen device you're holding right now", decoys: ["Smartwatch", "Tablet", "Laptop"] },
    { word: "ChatGPT / AI", tamil: "செயற்கை நுண்ணறிவு", tanglish: "ChatGPT / AI", hint: "Conversational bot that solves code and questions", decoys: ["Google Search", "Siri", "Calculator"] },
    { word: "WiFi Router", tamil: "வைஃபை ரவுட்டர்", tanglish: "WiFi Router", hint: "Blinking box delivering wireless internet", decoys: ["Modem", "Hotspot", "Bluetooth"] },
    { word: "Bluetooth Earbuds", tamil: "இயர்பட்ஸ்", tanglish: "Earbuds / TWS", hint: "Small wireless music pods in charging case", decoys: ["Headphones", "Speaker", "Mic"] },
    { word: "Instagram", tamil: "இன்ஸ்டாகிராம்", tanglish: "Instagram", hint: "App for reels, stories & scrolling feed", decoys: ["Snapchat", "TikTok", "YouTube"] },
    { word: "WhatsApp", tamil: "வாட்ஸ்அப்", tanglish: "WhatsApp", hint: "Green chat app with blue ticks and status updates", decoys: ["Telegram", "Signal", "Discord"] },
    { word: "Laptop Charger", tamil: "சார்ஜர்", tanglish: "Laptop Charger", hint: "Heavy brick cable searched before battery dies", decoys: ["Power Bank", "USB Cable", "HDMI Cable"] },
    { word: "Hacker", tamil: "ஹேக்கர்", tanglish: "Hacker", hint: "Typing green text on black screen terminal", decoys: ["Programmer", "Gamer", "Cyber Cop"] },
    { word: "Smartwatch", tamil: "ஸ்மார்ட்வாட்ச்", tanglish: "Smartwatch", hint: "Wrist screen counting steps and heart rate", decoys: ["Fitness Band", "Wrist Watch", "Compass"] }
  ],

  movies: [
    { word: "Avatar", tamil: "அவதார்", tanglish: "Avatar", hint: "Blue Na'vi creatures on planet Pandora", decoys: ["Titanic", "Dune", "Interstellar"] },
    { word: "Avengers Endgame", tamil: "அவெஞ்சர்ஸ்", tanglish: "Avengers", hint: "Thanos snap, portal fight, assemble", decoys: ["Justice League", "Batman", "Spider-Man"] },
    { word: "Harry Potter", tamil: "ஹாரி பாட்டர்", tanglish: "Harry Potter", hint: "Boy wizard with scar and wand at Hogwarts", decoys: ["Lord of the Rings", "Percy Jackson", "Twilight"] },
    { word: "Spider-Man", tamil: "ஸ்பைடர்மேன்", tanglish: "Spider-Man", hint: "Web-slinging superhero swinging through skyscrapers", decoys: ["Batman", "Iron Man", "Superman"] },
    { word: "Titanic", tamil: "டைட்டானிக்", tanglish: "Titanic", hint: "Giant luxury ship that struck an iceberg", decoys: ["Poseidon", "Life of Pi", "Pirates of Caribbean"] },
    { word: "Inception", tamil: "இன்செப்ஷன்", tanglish: "Inception", hint: "Dreams inside dreams with a spinning top totem", decoys: ["Interstellar", "Tenet", "The Matrix"] },
    { word: "Joker", tamil: "ஜோக்கர்", tanglish: "Joker", hint: "Clown makeup villain of Gotham city", decoys: ["Riddler", "Penguin", "Harley Quinn"] },
    { word: "Oppenheimer", tamil: "ஓப்பன்ஹீமர்", tanglish: "Oppenheimer", hint: "Manhattan project scientist and atomic explosion", decoys: ["Barbie", "Dunkirk", "A Beautiful Mind"] }
  ],

  memes: [
    { word: "Nanba / Nanbi", tamil: "நண்பா", tanglish: "Nanba / Nanbi", hint: "Affectionate friend call popularized by Vijay", decoys: ["Machi", "Thala", "Bro"] },
    { word: "Thala for a Reason", tamil: "தல ஃபார் எ ரீசன்", tanglish: "Thala for a Reason", hint: "Anything that sums to number 7", decoys: ["7 Up", "Helicopter", "Finish in Style"] },
    { word: "Goundamani Senthil", tamil: "கவுண்டமணி செந்தில்", tanglish: "Goundamani Petromax", hint: "Petromax light and banana comedy duo", decoys: ["Vadivelu", "Vivek", "Santhanam"] },
    { word: "Aandavar", tamil: "ஆண்டவர்", tanglish: "Aandavar", hint: "Kamal Haasan's cinephile moniker", decoys: ["Thalaivar", "Thalapathy", "Ulaganayagan"] },
    { word: "Sigma Male", tamil: "சிக்மா மேல்", tanglish: "Sigma Male", hint: "Internet lone wolf rule meme", decoys: ["Alpha Male", "Gigachad", "Mewing"] },
    { word: "Machi / Bro", tamil: "மச்சி / ப்ரோ", tanglish: "Machi / Mappillai", hint: "Universal casual bro greeting", decoys: ["Boss", "Thala", "Nannba"] },
    { word: "Rickroll", tamil: "ரிக்ரோல்", tanglish: "Rickroll", hint: "Never Gonna Give You Up prank link", decoys: ["Clickbait", "Troll", "Brainrot"] }
  ],

  places: [
    { word: "Marina Beach", tamil: "மெரினா கடற்கரை", tanglish: "Marina Beach", hint: "Long sandy coastline with sundal stalls", decoys: ["Besant Nagar", "Covelong", "Pondicherry Beach"] },
    { word: "Ooty", tamil: "ஊட்டி", tanglish: "Ooty", hint: "Queen of hill stations with tea gardens and toy train", decoys: ["Kodaikanal", "Yercaud", "Valparai"] },
    { word: "Madurai Meenakshi Temple", tamil: "மதுரை மீனாட்சி அம்மன் கோயில்", tanglish: "Madurai Temple", hint: "Towering gopurams in the temple city", decoys: ["Thanjavur Periya Kovil", "Rameswaram", "Palani"] },
    { word: "Kodaikanal", tamil: "கொடைக்கானல்", tanglish: "Kodaikanal", hint: "Princess of hills with lake, pine forest & mist", decoys: ["Ooty", "Munnar", "Coonoor"] },
    { word: "Chennai Central Station", tamil: "சென்னை சென்ட்ரல்", tanglish: "Chennai Central", hint: "Grand red heritage railway junction", decoys: ["Egmore", "Coimbatore Junction", "Madurai Junction"] },
    { word: "Tea Kadai (Tea Stall)", tamil: "டீக்கடை", tanglish: "Tea Kadai Bench", hint: "Corner roadside spot with glass cups & vada", decoys: ["Bakery", "Juice Shop", "Tiffin Center"] },
    { word: "Kanyakumari", tamil: "கன்னியாகுமரி", tanglish: "Kanyakumari", hint: "Southernmost tip where three seas meet", decoys: ["Rameshwaram", "Dhanushkodi", "Tuticorin"] }
  ],

  animals: [
    { word: "Tiger", tamil: "புலி", tanglish: "Puli / Tiger", hint: "Striped majestic national apex predator", decoys: ["Lion", "Leopard", "Cheetah"] },
    { word: "Elephant", tamil: "யானை", tanglish: "Yaanai / Elephant", hint: "Gentle giant with trunk and tusks", decoys: ["Rhino", "Hippo", "Giraffe"] },
    { word: "Golden Retriever", tamil: "நாய் குட்டி", tanglish: "Golden Retriever", hint: "Fluffy friendly loyal pet dog", decoys: ["Pug", "German Shepherd", "Husky"] },
    { word: "Peacock", tamil: "மயில்", tanglish: "Mayil / Peacock", hint: "National bird showing off dancing feathers", decoys: ["Parrot", "Swan", "Flamingo"] },
    { word: "King Cobra", tamil: "ராஜநாகம்", tanglish: "King Cobra", hint: "Hooded venomous serpent", decoys: ["Python", "Viper", "Krait"] },
    { word: "Cat", tamil: "பூனை", tanglish: "Poonai / Cat", hint: "Purring house pet who demands food", decoys: ["Dog", "Rabbit", "Hamster"] },
    { word: "Monkey", tamil: "குரங்கு", tanglish: "Kurangu / Monkey", hint: "Tree swinger snatching snacks at temple steps", decoys: ["Chimpanzee", "Baboon", "Gorilla"] }
  ],

  gaming: [
    { word: "PUBG / BGMI", tamil: "பப்ஜி", tanglish: "PUBG / BGMI", hint: "Drop at Pochinki, Pochinki rush & Chicken Dinner", decoys: ["Free Fire", "Call of Duty", "Apex Legends"] },
    { word: "GTA San Andreas", tamil: "ஜிடிஏ சான் ஆண்ட்ரியாஸ்", tanglish: "GTA San Andreas", hint: "CJ, Grove Street, Ah shit here we go again", decoys: ["GTA V", "Vice City", "Red Dead"] },
    { word: "Free Fire", tamil: "ஃப்ரீ ஃபயர்", tanglish: "Free Fire", hint: "Fast mobile battle royale with DJ Alok", decoys: ["BGMI", "COD Mobile", "Fortnite"] },
    { word: "Minecraft", tamil: "மின்கிராஃப்ட்", tanglish: "Minecraft", hint: "Block building world with creepers and diamonds", decoys: ["Roblox", "Terraria", "Lego"] },
    { word: "Naruto", tamil: "நருடோ", tanglish: "Naruto", hint: "Orange tracksuit ninja dreaming to become Hokage", decoys: ["One Piece", "Bleach", "Dragon Ball"] },
    { word: "One Piece", tamil: "ஒன் பீஸ்", tanglish: "One Piece", hint: "Straw Hat Luffy sailing Grand Line for treasure", decoys: ["Naruto", "Dragon Ball Z", "Attack on Titan"] },
    { word: "Demon Slayer", tamil: "டெமான் ஸ்லேயர்", tanglish: "Demon Slayer", hint: "Tanjiro with water breathing sword protecting Nezuko", decoys: ["Jujutsu Kaisen", "Chainsaw Man", "Tokyo Ghoul"] },
    { word: "Among Us", tamil: "அமாங் அஸ்", tanglish: "Among Us", hint: "Spaceship crewmates finding the sus imposter", decoys: ["Fall Guys", "Goose Goose Duck", "Roblox"] }
  ]
};

// Helper to pick random word
export function getRandomWord(categoryId = 'all') {
  let pool = [];
  if (categoryId === 'all') {
    Object.values(WORDS_DATA).forEach(list => {
      pool.push(...list);
    });
  } else if (WORDS_DATA[categoryId]) {
    pool = WORDS_DATA[categoryId];
  } else {
    pool = WORDS_DATA.food;
  }

  const randomEntry = pool[Math.floor(Math.random() * pool.length)];
  return { ...randomEntry, categoryId: categoryId === 'all' ? findCategoryForWord(randomEntry.word) : categoryId };
}

function findCategoryForWord(wordName) {
  for (const [cat, list] of Object.entries(WORDS_DATA)) {
    if (list.some(item => item.word === wordName)) {
      return cat;
    }
  }
  return 'food';
}

// Generate Imposter assignment
export function assignRoles(playerNames, imposterCount = 1) {
  const total = playerNames.length;
  const count = Math.min(imposterCount, Math.floor(total / 2)); // Imposters can't exceed half players

  const indices = new Set();
  while (indices.size < count) {
    const r = Math.floor(Math.random() * total);
    indices.add(r);
  }

  return playerNames.map((name, idx) => ({
    id: idx + 1,
    name,
    isImposter: indices.has(idx),
  }));
}
