import type { Locale, Localized } from "@/i18n/config";

export type Category = "kitchens" | "shelving" | "wardrobes" | "living" | "bathrooms";

export const categories: { id: Category; label: Localized; dot: "bronze" | "slate" }[] = [
  { id: "kitchens", label: { ka: "სამზარეულოები", en: "Kitchens" }, dot: "bronze" },
  { id: "shelving", label: { ka: "თაროები", en: "Shelving" }, dot: "slate" },
  { id: "wardrobes", label: { ka: "კარადები", en: "Wardrobes" }, dot: "bronze" },
  { id: "living", label: { ka: "მისაღები ოთახი", en: "Living" }, dot: "slate" },
  { id: "bathrooms", label: { ka: "სააბაზანო", en: "Bathrooms" }, dot: "bronze" },
];

type ProjectData = {
  slug: string;
  category: Category;
  year: number;
  /** Paths under /public, e.g. "/projects/oak-kitchen/1.jpg". The first one is the cover. Empty → placeholder tiles. */
  images: string[];
  title: Localized;
  location: Localized;
  duration: Localized;
  materials: Localized<string[]>;
  summary: Localized;
  brief: Localized;
  quote?: { text: Localized; author: Localized };
};

/** A project with all text resolved to one language — what components render. */
export type Project = {
  slug: string;
  category: Category;
  year: number;
  images: string[];
  title: string;
  location: string;
  duration: string;
  materials: string[];
  summary: string;
  brief: string;
  quote?: { text: string; author: string };
};

const data: ProjectData[] = [
  {
    slug: "oak-galley-kitchen",
    category: "kitchens",
    year: 2026,
    images: ["/projects/oak-galley-kitchen/2.jpg", "/projects/oak-galley-kitchen/1.jpg", "/projects/oak-galley-kitchen/3.jpg", "/projects/oak-galley-kitchen/4.jpg"],
    title: { ka: "მუხის ვიწრო სამზარეულო", en: "Oak galley kitchen" },
    location: { ka: "ვაკე, თბილისი", en: "Vake, Tbilisi" },
    duration: { ka: "6 კვირა", en: "6 weeks" },
    materials: {
      ka: ["მუხის შპონი ზეთის დაფარვით", "კვარცის სამუშაო ზედაპირი", "თითბრის სახელურები"],
      en: ["Oiled oak veneer", "Quartz worktop", "Brushed brass handles"],
    },
    summary: {
      ka: "ვიწრო სამზარეულო ჭერამდე კარადებით და მეტი სათავსოთი.",
      en: "A narrow apartment kitchen reworked into a calm, full-height galley.",
    },
    brief: {
      ka: "კლიენტებს მეტი სათავსო სჭირდებოდათ, ოთახი კი არ უნდა დაპატარავებულიყო. ერთ კედელზე მუხის მაღალი კარადები ჭერამდე ავიყვანეთ, მეორე მხარე დაბალი და ღია დავტოვეთ. მაცივარი და ჭურჭლის სარეცხი მანქანა ფასადების მიღმა დავმალეთ.",
      en: "The clients wanted more storage without the room feeling smaller. We ran tall oak units to the ceiling on one side, kept the opposite run low and open, and hid the fridge and dishwasher behind matching fronts.",
    },
    quote: {
      text: {
        ka: "ახლა ორჯერ უფრო დიდი ჩანს და ყველაფერს თავისი ადგილი აქვს.",
        en: "It feels twice the size it was, and everything finally has a place.",
      },
      author: { ka: "ნინო და გიორგი", en: "Nino & Giorgi" },
    },
  },
  {
    slug: "library-wall",
    category: "shelving",
    year: 2026,
    images: ["/projects/library-wall/1.jpg", "/projects/library-wall/2.jpg", "/projects/library-wall/3.jpg", "/projects/library-wall/4.jpg"],
    title: { ka: "ბიბლიოთეკა იატაკიდან ჭერამდე", en: "Floor-to-ceiling library wall" },
    location: { ka: "სოლოლაკი, თბილისი", en: "Sololaki, Tbilisi" },
    duration: { ka: "3 კვირა", en: "3 weeks" },
    materials: {
      ka: ["შეღებილი MDF", "იფნის მასიური კიდეები", "ჩაშენებული LED განათება"],
      en: ["Painted MDF", "Solid ash edging", "Integrated LED strips"],
    },
    summary: {
      ka: "5-მეტრიანი წიგნის თარო მოძრავი კიბით და სკამით კითხვისთვის.",
      en: "A 5-metre bookshelf with a rolling ladder and a built-in reading bench.",
    },
    brief: {
      ka: "ძველ ბინაში ჭერი 3,4 მეტრია, კედლები კი არასწორი. ყველა თარო ადგილზე მოვარგეთ კედელს, ქვემოთ კი რბილი სკამი და უჯრები მოვაწყვეთ.",
      en: "An old apartment with 3.4 m ceilings and uneven walls. Every shelf was scribed to the wall on site, with a cushioned bench and drawers at the base.",
    },
  },
  {
    slug: "walk-in-wardrobe",
    category: "wardrobes",
    year: 2025,
    images: ["/projects/walk-in-wardrobe/2.jpg", "/projects/walk-in-wardrobe/3.jpg", "/projects/walk-in-wardrobe/4.jpg"],
    title: { ka: "საძინებლის კარადები და რბილი საზურგე", en: "Bedroom wardrobes & headboard wall" },
    location: { ka: "საბურთალო, თბილისი", en: "Saburtalo, Tbilisi" },
    duration: { ka: "4 კვირა", en: "4 weeks" },
    materials: {
      ka: ["შებოლილი მუხა", "ხავერდის პანელები", "ტყავის სახელურები"],
      en: ["Smoked oak", "Velvet panels", "Leather pulls"],
    },
    summary: {
      ka: "ჩაშენებული კარადები და რბილი საზურგე საძინებლისთვის.",
      en: "Built-in wardrobes and an upholstered headboard wall for a main bedroom.",
    },
    brief: {
      ka: "საწოლის ორივე მხარეს ჭერამდე კარადებია მოხერხებული შიგთავსით. მათ ხავერდის საზურგე აერთიანებს, ამიტომ ყველაფერი ერთ მშვიდ კომპოზიციად აღიქმება.",
      en: "Full-height wardrobes either side of the bed with fitted interiors, joined by a panelled headboard wall in velvet — storage that reads as one calm piece of furniture.",
    },
  },
  {
    slug: "white-family-kitchen",
    category: "kitchens",
    year: 2025,
    images: ["/projects/white-family-kitchen/1.jpg", "/projects/white-family-kitchen/2.jpg", "/projects/white-family-kitchen/3.jpg", "/projects/white-family-kitchen/4.jpg"],
    title: { ka: "საოჯახო სამზარეულო კუნძულით", en: "Family kitchen with island" },
    location: { ka: "წყნეთი", en: "Tskneti" },
    duration: { ka: "8 კვირა", en: "8 weeks" },
    materials: {
      ka: ["მქრქალი ლაქი", "ტრავერტინი", "კაკლის ზედაპირი"],
      en: ["Matte lacquer", "Travertine", "Walnut island top"],
    },
    summary: {
      ka: "დიდი სამზარეულო საგარეუბნო სახლში, 3-მეტრიანი კუნძულით.",
      en: "A large country-house kitchen built around a 3-metre island.",
    },
    brief: {
      ka: "სამზარეულო ექვსსულიანი ოჯახისთვის. კუნძულს ერთ მხარეს სკამები აქვს, მეორე მხარეს — კარადები. კაკლის ზედაპირი დროთა განმავლობაში კიდევ უფრო ლამაზი გახდება.",
      en: "A busy family kitchen that has to work for six people. The island has seating on one side, storage on the other, and a walnut top that will age with the house.",
    },
    quote: {
      text: {
        ka: "ორჯერ გაზომეს, ერთხელ დაამზადეს და ორ დღეში დაამონტაჟეს.",
        en: "They measured twice, built once, and installed in two days.",
      },
      author: { ka: "თამარ კ.", en: "Tamar K." },
    },
  },
  {
    slug: "media-wall",
    category: "living",
    year: 2025,
    images: ["/projects/media-wall/1.jpg", "/projects/media-wall/2.jpg", "/projects/media-wall/3.jpg", "/projects/media-wall/4.jpg"],
    title: { ka: "დაბალი ტელევიზორის ტუმბო", en: "Low media wall" },
    location: { ka: "ვერა, თბილისი", en: "Vera, Tbilisi" },
    duration: { ka: "2 კვირა", en: "2 weeks" },
    materials: {
      ka: ["კაკლის შპონი", "უსახელურო ფასადები"],
      en: ["Walnut veneer", "Push-to-open fronts"],
    },
    summary: {
      ka: "კიდული ტელევიზორის ტუმბო დამალული კაბელებით.",
      en: "A floating TV unit with hidden cable runs and record storage.",
    },
    brief: {
      ka: "გრძელი, დაბალი ტუმბო მალავს როუტერს, კონსოლებს და კაბელებს. ღია ნიშებში ფირფიტები და დეკორი ეტევა.",
      en: "A long, low unit that hides the router, consoles and cables, with open niches for records and a few objects.",
    },
  },
  {
    slug: "bathroom-vanity",
    category: "bathrooms",
    year: 2024,
    images: ["/projects/bathroom-vanity/2.jpg", "/projects/bathroom-vanity/3.jpg", "/projects/bathroom-vanity/1.jpg"],
    title: { ka: "ტუმბო ორი ნიჟარით და სარკიანი კარადა", en: "Double vanity & mirror cabinet" },
    location: { ka: "მთაწმინდა, თბილისი", en: "Mtatsminda, Tbilisi" },
    duration: { ka: "2 კვირა", en: "2 weeks" },
    materials: {
      ka: ["ტენგამძლე მუხა", "ტერაცოს ზედაპირი", "თითბრის ონკანები"],
      en: ["Moisture-resistant oak", "Terrazzo top", "Brass taps"],
    },
    summary: {
      ka: "კედელზე დაკიდებული ტუმბო და ზემოთ ჩაშენებული სარკიანი კარადა.",
      en: "A wall-hung vanity with a recessed mirror cabinet above.",
    },
    brief: {
      ka: "ტუმბო კედელზეა დაკიდებული, ამიტომ იატაკი თავისუფალია. თითოეულს საკუთარი ღრმა უჯრა აქვს, ზემოთ კი განათებული სარკიანი კარადაა.",
      en: "Wall-hung to keep the floor clear, with deep drawers split for each person and a recessed mirror cabinet with lighting.",
    },
  },
  {
    slug: "hallway-storage",
    category: "shelving",
    year: 2024,
    images: ["/projects/hallway-storage/1.jpg", "/projects/hallway-storage/2.jpg", "/projects/hallway-storage/3.jpg"],
    title: { ka: "დერეფნის კარადა და სკამი", en: "Hallway storage & bench" },
    location: { ka: "დიდუბე, თბილისი", en: "Didube, Tbilisi" },
    duration: { ka: "10 დღე", en: "10 days" },
    materials: {
      ka: ["არყის ფანერა", "სელის ბალიში"],
      en: ["Birch plywood", "Linen-covered cushion"],
    },
    summary: {
      ka: "ფეხსაცმლის თარო, საკიდები და სკამი 40 სმ სიღრმის დერეფანში.",
      en: "Shoe storage, coat hooks and a seat in a 40 cm deep entrance.",
    },
    brief: {
      ka: "დერეფანი ძალიან ვიწროა. ფეხსაცმლის დახრილი უჯრები, თხელი სკამი და ღია საკიდები 40 სმ სიღრმეში ეტევა.",
      en: "A very shallow hallway. Angled shoe drawers, a slim bench and open hooks fit everything into 40 cm of depth.",
    },
  },
  {
    slug: "studio-kitchen",
    category: "kitchens",
    year: 2024,
    images: ["/projects/studio-kitchen/1.jpg", "/projects/studio-kitchen/2.jpg", "/projects/studio-kitchen/3.jpg"],
    title: { ka: "პატარა სამზარეულო სტუდიოში", en: "Compact studio kitchen" },
    location: { ka: "ძველი თბილისი", en: "Old Tbilisi" },
    duration: { ka: "4 კვირა", en: "4 weeks" },
    materials: {
      ka: ["სალბისფერი ლაქი", "უჟანგავი ფოლადის ზედაპირი"],
      en: ["Sage lacquer", "Stainless steel worktop"],
    },
    summary: {
      ka: "სრული სამზარეულო 2,4 მეტრ კედელზე.",
      en: "A full kitchen fitted into 2.4 metres of wall in a studio flat.",
    },
    brief: {
      ka: "სრული ზომის ტექნიკა 2,4-მეტრიან კედელზე, დასაკეცი მაგიდა და გამოსაწევი საკუჭნაო მაღალ კარადაში.",
      en: "Full-size appliances in a 2.4 m run, with a fold-down table and a pantry pull-out in the tall unit.",
    },
  },
];

function localize(p: ProjectData, lang: Locale): Project {
  return {
    slug: p.slug,
    category: p.category,
    year: p.year,
    images: p.images,
    title: p.title[lang],
    location: p.location[lang],
    duration: p.duration[lang],
    materials: p.materials[lang],
    summary: p.summary[lang],
    brief: p.brief[lang],
    quote: p.quote && { text: p.quote.text[lang], author: p.quote.author[lang] },
  };
}

export const projectSlugs = data.map((p) => p.slug);

export function getProjects(lang: Locale) {
  return data.map((p) => localize(p, lang));
}

export function getProject(slug: string, lang: Locale) {
  const p = data.find((d) => d.slug === slug);
  return p && localize(p, lang);
}

export function getCategories(lang: Locale) {
  return categories.map((c) => ({ id: c.id, label: c.label[lang], dot: c.dot }));
}

export function categoryLabel(id: Category, lang: Locale) {
  return categories.find((c) => c.id === id)?.label[lang] ?? id;
}

export function categoryDot(id: Category) {
  return categories.find((c) => c.id === id)?.dot ?? "bronze";
}
