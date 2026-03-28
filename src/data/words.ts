export type ListKey = "starwars" | "alphabet" | "dinosaurs" | "short" | "colors" | "animals" | "fruits" | "countries" | "programming" | "space" | "magic";

export const lists: Record<ListKey, { label: string; items: string[] }> = {
  short: {
    label: "Short",
    items: [
      "cat", "dog", "sun", "run", "jump", "play", "blue", "fire",
      "wind", "snow", "rain", "bird", "fish", "tree", "leaf", "rose",
      "wave", "moon", "star", "lake", "hill", "road", "door", "ring",
      "drum", "bell", "bone", "coin", "dust", "foam", "frog", "glow",
      "hive", "iris", "jade", "knot", "lime", "mist", "newt", "oak",
    ]
  },
  dinosaurs: {
    label: "Dinosaurs",
    items: [
      "Tyrannosaurus", "Velociraptor", "Triceratops", "Brachiosaurus", "Ankylosaurus",
      "Stegosaurus", "Diplodocus", "Parasaurolophus", "Pterodactyl", "Spinosaurus",
      "Iguanodon", "Allosaurus", "Pachycephalosaurus", "Carnotaurus", "Archaeopteryx",
      "Dilophosaurus", "Gallimimus", "Compsognathus", "Deinonychus", "Baryonyx",
      "Ceratosaurus", "Edmontosaurus", "Maiasaura", "Oviraptor", "Protoceratops",
      "Therizinosaurus", "Microraptor", "Styracosaurus", "Corythosaurus", "Megaraptor",
    ]
  },
  alphabet: {
    label: "Alphabet",
    items: [
      "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Å",
      "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä",
      "Z", "X", "C", "V", "B", "N", "M",
    ]
  },
  starwars: {
    label: "Star Wars",
    items: [
      "Jedi", "Sith", "Lightsaber", "Force", "Tatooine", "Millennium Falcon",
      "Darth Vader", "Yoda", "Chewbacca", "Stormtrooper", "Leia", "Han Solo",
      "Obi-Wan", "Death Star", "R2-D2", "C-3PO", "Boba Fett", "Padmé Amidala",
      "Anakin Skywalker", "Kylo Ren", "Rey", "Finn", "Poe Dameron", "BB-8",
      "Snoke", "General Hux", "Captain Phasma", "Maz Kanata", "Supreme Leader Snoke",
      "Rose Tico", "DJ", "Lando Calrissian", "Jannah", "Ahsoka Tano", "Mace Windu",
      "Qui-Gon Jinn", "Count Dooku", "General Grievous", "Darth Maul", "Jar Jar Binks",
      "Nute Gunray", "Jango Fett", "Wedge Antilles", "Mon Mothma", "Admiral Ackbar",
      "Wicket", "Jabba the Hutt", "Greedo", "IG-88", "Bossk", "Dengar",
      "The Mandalorian", "Grogu", "Moff Gideon", "Bo-Katan", "Cara Dune",
      "Greef Karga", "The Client", "Kuiil", "Fennec Shand", "Bix Caleen",
      "Cassian Andor", "Jyn Erso", "Orson Krennic", "Chirrut Îmwe", "Baze Malbus",
      "K-2SO", "Saw Gerrera"
    ]
  },
  colors: {
    label: "Colors",
    items: [
      "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", 
      "Black", "White", "Gray", "Cyan", "Magenta", "Maroon", "Olive", "Teal", "Navy"
    ]
  },
  animals: {
    label: "Animals",
    items: [
      "Lion", "Tiger", "Bear", "Elephant", "Giraffe", "Zebra", "Monkey", "Kangaroo", 
      "Penguin", "Dolphin", "Whale", "Shark", "Octopus", "Eagle", "Owl", "Snake", 
      "Crocodile", "Turtle", "Frog", "Toad", "Rabbit", "Mouse", "Rat", "Squirrel", "Bat"
    ]
  },
  fruits: {
    label: "Fruits",
    items: [
      "Apple", "Banana", "Orange", "Mango", "Strawberry", "Grape", "Pineapple", "Watermelon",
      "Blueberry", "Raspberry", "Blackberry", "Kiwi", "Peach", "Plum", "Cherry", "Pear",
      "Papaya", "Lemon", "Lime", "Coconut", "Pomegranate", "Apricot", "Fig", "Guava"
    ]
  },
  countries: {
    label: "Countries",
    items: [
      "Argentina", "Australia", "Brazil", "Canada", "China", "Egypt", "France", "Germany",
      "India", "Indonesia", "Italy", "Japan", "Mexico", "Nigeria", "Pakistan", "Russia",
      "South Africa", "South Korea", "Spain", "Sweden", "Turkey", "United Kingdom", "United States"
    ]
  },
  programming: {
    label: "Programming",
    items: [
      "JavaScript", "Python", "Java", "C++", "C#", "Ruby", "PHP", "Swift", "Go", "Rust",
      "TypeScript", "Kotlin", "Scala", "Dart", "Haskell", "Lua", "Perl", "R", "SQL", "Assembly"
    ]
  },
  space: {
    label: "Space",
    items: [
      "Galaxy", "Nebula", "Black Hole", "Supernova", "Asteroid", "Comet", "Meteor",
      "Constellation", "Orbit", "Gravity", "Eclipse", "Telescope", "Satellite", "Astronaut",
      "Cosmos", "Universe", "Milky Way", "Solar System", "Planet", "Star", "Moon"
    ]
  },
  magic: {
    label: "Magic",
    items: [
      "Spell", "Wand", "Wizard", "Witch", "Dragon", "Unicorn", "Potion", "Scroll",
      "Crystal", "Amulet", "Charm", "Enchantment", "Curse", "Illusion", "Alchemy",
      "Grimoire", "Familiar", "Sorcerer", "Talisman", "Incantation", "Mana"
    ]
  }
};
