export interface ServiceItem {
  id: string;
  title: string;
  tamilTitle?: string;
  description: string;
  longDescription: string;
  image: string;
  category: 'childhood-rites' | 'weddings-unions';
  tagline: string;
}

export interface PackageItem {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  duration: string;
  photographers: string;
  deliverables: string;
  album: string;
  recommended: boolean;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  ceremonyType: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface StudioInfo {
  name: string;
  tagline: string;
  photographer: string;
  experience: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  location: string;
  address: string;
  operationalHours: string;
  email: string;
  socialLinks: {
    instagram: string;
    whatsapp: string;
    phone: string;
  };
}

export const studioInfo: StudioInfo = {
  name: "Bright to Bride",
  tagline: "From Little Beginnings to Forever Moments.",
  photographer: "Arisiva S",
  experience: "5+ Years",
  phone: "+919500264840",
  whatsapp: "9500264840",
  instagram: "https://www.instagram.com/bright_to_bride_photography?igsh=NXAyajB4cmVzeGw5",
  location: "All Over Tamil Nadu, India",
  address: "Serving All Over Tamil Nadu, India (H.O: Trichy)",
  operationalHours: "Monday - Sunday: 9:00 AM - 9:00 PM",
  email: "brighttobride16@gmail.com",
  socialLinks: {
    instagram: "https://www.instagram.com/bright_to_bride_photography?igsh=NXAyajB4cmVzeGw5",
    whatsapp: "https://wa.me/919500264840",
    phone: "tel:+919500264840"
  }
};

export const servicesData: ServiceItem[] = [
  // Category 1: Childhood & Rites of Passage
  {
    id: "seemantham",
    title: "Seemantham",
    tamilTitle: "சீமந்தம் / வளைகாப்பு",
    description: "Celebrate the beautiful journey into motherhood with emotional maternity and traditional ceremony photography.",
    longDescription: "The transition to motherhood is sacred. We capture the gentle clang of glass bangles, the warm smiles of elders blessing the mother-to-be, and the intimate emotional bond between the couple as they prepare for the new addition to their family.",
    image: "/images/seemantham_ceremony.png",
    category: "childhood-rites",
    tagline: "Honoring Motherhood & New Beginnings"
  },
  {
    id: "thottil-vizha",
    title: "Thottil Vizha",
    tamilTitle: "தொட்டில் விழா",
    description: "Capture the joy, blessings, family emotions, and precious moments of the baby's cradle ceremony.",
    longDescription: "The baby's first introduction to the family circle is filled with soft whispers, tiny smiles, and traditional lullabies. We frame the beautifully decorated cradle, family elders placing the baby, and the surrounding warmth of a home filled with new life.",
    image: "/images/portfolio_baby_cradle.png",
    category: "childhood-rites",
    tagline: "Cradle of Joy & Soft Whispers"
  },
  {
    id: "peyarsutu-vizha",
    title: "Peyarsutu Vizha",
    tamilTitle: "பெயர்சூட்டு விழா",
    description: "Preserve the beautiful memories of your child's naming ceremony with elegant and emotional storytelling.",
    longDescription: "A child's name is their first identity. We capture the sacred moment of whispering the name in the baby's ear, the lighting of the traditional kuthuvilakku, and the expressions of joy as relatives hear the name proclaimed.",
    image: "/images/portfolio_naming_ceremony.png",
    category: "childhood-rites",
    tagline: "The Sacred Proclamation of Identity"
  },
  {
    id: "kaathukuthal",
    title: "Kaathukuthal",
    tamilTitle: "காதுகுத்தல் விழா",
    description: "Capture the traditions, blessings, family gatherings, and cultural emotions of the ear-piercing ceremony.",
    longDescription: "A traditional milestone deep-rooted in Tamil custom. We capture the lively temple gatherings, the comforting embrace of maternal uncles (Thaai Maaman), the teary eyes, and the subsequent celebratory feasts that bring extended families together.",
    image: "/images/portfolio_ear_piercing.png",
    category: "childhood-rites",
    tagline: "Traditional Rites & Festive Family Bonds"
  },
  // Category 2: Weddings & Unions
  {
    id: "nichayathartham",
    title: "Nichayathartham",
    tamilTitle: "நிச்சயதார்த்தம்",
    description: "Capture the joy, excitement, and beginning of your wedding journey.",
    longDescription: "The formal promise of union. We focus on the vibrant plate exchange, the glittering rings, the shy glances between the couple, and the initial meeting of two families uniting as one.",
    image: "/images/portfolio_nichayathartham.png",
    category: "weddings-unions",
    tagline: "The Promise of a Lifetime"
  },
  {
    id: "penn-paarkkum-padalam",
    title: "Penn Paarkkum Padalam",
    tamilTitle: "பெண் பார்க்கும் படலம்",
    description: "Preserve the warmth and emotions of this important family tradition.",
    longDescription: "A subtle, deeply intimate family event. We capture the beautiful domestic aesthetics, the gentle passing of coffee cups, the nervous smiles, and the authentic first interactions of families finding common ground.",
    image: "/images/seemantham_ceremony.png", // Will use a suitable visual
    category: "weddings-unions",
    tagline: "Where Stories Intersect & Begin"
  },
  {
    id: "muhurtham",
    title: "Muhurtham",
    tamilTitle: "முகூர்த்தம்",
    description: "Capture every sacred detail, ritual, emotion, and meaningful moment.",
    longDescription: "The ultimate focal point of a Tamil wedding. From the early morning Kasi Yatrai to the sacred tying of the Mangalsutra (Thaali) under the chants of priests, we capture the raw intensity, cultural depth, and pure magic of the union.",
    image: "/images/muhurtham_couple.png",
    category: "weddings-unions",
    tagline: "Sacred Threads & Timeless Promises"
  },
  {
    id: "thirumanam",
    title: "Thirumanam",
    tamilTitle: "திருமணம் / வரவேற்பு",
    description: "Tell the complete story of your wedding day through cinematic photography and storytelling.",
    longDescription: "Comprehensive editorial coverage of your wedding day and reception. We paint a vivid cinematic tapestry of the grand setups, the couple's modern portraits, and the joyful greetings of thousands of guests.",
    image: "/images/hero_wedding.png",
    category: "weddings-unions",
    tagline: "The Grand Cinematic Celebration"
  },
  {
    id: "kalyana-virundhu",
    title: "Kalyana Virundhu",
    tamilTitle: "கல்யாண விருந்து",
    description: "Capture the happiness, family connections, celebration, food, laughter, and unforgettable moments of the wedding feast.",
    longDescription: "No Tamil wedding is complete without the feast. We photograph the traditional serving on banana leaves, the steam rising from local Trichy delicacies, the laughter shared across tables, and the simple joy of breaking bread together.",
    image: "/images/portfolio_kalyana_virundhu.png",
    category: "weddings-unions",
    tagline: "Feasts, Flavors & Shared Laughter"
  }
];

export const portfolioData = [
  { id: "p1", title: "A Sacred Union", category: "Muhurtham", image: "/images/muhurtham_couple.png", description: "Sacred Mangalsutra ceremony captured in Tamil Nadu." },
  { id: "p2", title: "The Cradle Blessing", category: "Thottil Vizha", image: "/images/portfolio_baby_cradle.png", description: "First cradle ceremony captured with family warmth." },
  { id: "p3", title: "Maternity Warmth", category: "Seemantham", image: "/images/portfolio_seemantham_1.png", description: "Bangles ceremony highlighting family blessing." },
  { id: "p4", title: "Ring Exchange", category: "Nichayathartham", image: "/images/portfolio_nichayathartham.png", description: "Vibrant engagement shoot." },
  { id: "p5", title: "The Thaali Ritual", category: "Weddings", image: "/images/hero_wedding.png", description: "Cinematic close-up of a wedding milestone." },
  { id: "p6", title: "Whispering the Name", category: "Peyarsutu Vizha", image: "/images/portfolio_naming_ceremony.png", description: "Intimate family naming ceremony details." },
  { id: "p7", title: "Blessings of Uncles", category: "Kaathukuthal", image: "/images/portfolio_ear_piercing.png", description: "Ear piercing ceremony and family gather." },
  { id: "p8", title: "Traditional Feast", category: "Family Celebrations", image: "/images/portfolio_kalyana_virundhu.png", description: "Laughter over banana leaves in Tamil Nadu." }
];

export const packagesData: PackageItem[] = [
  {
    id: "essential",
    name: "Essential Story",
    tagline: "Perfect for intimate family ceremonies and small gatherings.",
    features: [
      "1 Principal Photographer (Arisiva S)",
      "4 Hours of Continuous Coverage",
      "120+ High-Resolution Edited Images",
      "Digital Gallery Delivery (2-3 Weeks)",
      "1 Traditional Soft-cover Keepsake Album (30 Pages)",
      "Standard Color Correction & Fine Arts Touch-ups"
    ],
    duration: "4 Hours",
    photographers: "1 Photographer",
    deliverables: "120+ High-Res Images",
    album: "Soft-cover Album (30 Pages)",
    recommended: false
  },
  {
    id: "signature",
    name: "Signature Story",
    tagline: "Our most popular package. Complete coverage with cinematic details.",
    features: [
      "2 Photographers (Arisiva S + Candid Assistant)",
      "Full Day Coverage (Up to 8 Hours)",
      "250+ High-Resolution Edited Images",
      "Digital Gallery Delivery (14-20 Days)",
      "1 Luxury Hardcover Matte Album (40 Pages with Case)",
      "Premium Cinematic Color Grading",
      "Complimentary Mini-Pre-shoot or Family Session"
    ],
    duration: "Full Day (8 Hours)",
    photographers: "2 Photographers (Candid + Traditional)",
    deliverables: "250+ High-Res Images",
    album: "Luxury Hardcover Album (40 Pages)",
    recommended: true
  },
  {
    id: "luxury",
    name: "Luxury Story",
    tagline: "For grand multi-event weddings and elite ceremonies.",
    features: [
      "3 Photographers (Arisiva S + Candid Specialist + Traditional Specialist)",
      "Multi-day Event Coverage (Up to 16 Hours Total)",
      "500+ High-Resolution Custom Edited Images",
      "Express Delivery (7-10 Days Private Web Gallery)",
      "1 Premium Royal Glossy Album (60 Pages in Wooden Box)",
      "2 Mini Parent Duplicate Albums",
      "Complete Fine-Art Portrait Retouching",
      "Custom framed 24x36 Signature Print for your Home"
    ],
    duration: "Multi-Day (Up to 16 Hours)",
    photographers: "3 Photographers",
    deliverables: "500+ High-Res Images",
    album: "Royal Album in Wooden Box + 2 Mini Albums",
    recommended: false
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "t1",
    author: "Ramesh & Swetha",
    role: "Bride & Groom",
    text: "Arisiva captured our Muhurtham beautifully. He understood the timing of every ritual and did not miss a single emotion. The album is a treasure that our family looks at constantly. Highly recommended!",
    rating: 5,
    date: "May 2026",
    ceremonyType: "Wedding"
  },
  {
    id: "t2",
    author: "Priya Karthik",
    role: "Mother of Baby Rohan",
    text: "For baby Rohan's Thottil Vizha and Peyarsutu Vizha, we wanted someone who could capture the genuine smiles without stressing the baby. Bright to Bride was amazing. Extremely patient and professional.",
    rating: 5,
    date: "April 2026",
    ceremonyType: "Thottil Vizha"
  },
  {
    id: "t3",
    author: "Anbarasan M",
    role: "Father of Meera",
    text: "We booked the Signature package for our daughter's Kaathukuthal ceremony in Mannachanallur temple. Arisiva was there before time, captured the chaotic family joy and traditional rituals perfectly. The color edits are premium.",
    rating: 5,
    date: "June 2026",
    ceremonyType: "Kaathukuthal"
  },
  {
    id: "t4",
    author: "Dharshini & Vijay",
    role: "Parents-to-be",
    text: "Our Seemantham pictures are absolutely magical. The warm lighting, the laughter, and the details of the bangles—everything looks so editorial. They focus on the feelings, not just poses.",
    rating: 5,
    date: "March 2026",
    ceremonyType: "Seemantham"
  }
];

export const faqsData: FaqItem[] = [
  {
    id: "f1",
    question: "How early should I book my photographer?",
    answer: "We recommend booking as early as possible. For traditional wedding dates (Muhurtham dates) and wedding seasons, we are often booked 6 to 12 months in advance. For childhood ceremonies like Kaathukuthal or Thottil Vizha, booking 3-4 weeks prior is usually sufficient."
  },
  {
    id: "f2",
    question: "Do you cover events outside Mannachanallur and Trichy?",
    answer: "Yes, we love to travel! While we are based in Mannachanallur, Trichy, we regularly cover ceremonies across Tamil Nadu. Outstation bookings may incur nominal travel and lodging charges which we discuss transparently upfront."
  },
  {
    id: "f3",
    question: "Do you cover traditional Tamil family ceremonies?",
    answer: "Absolutely. Bright to Bride specializes in traditional Tamil ceremonies. We have extensive experience with Seemantham, Thottil Vizha, Peyarsutu Vizha, Kaathukuthal, Nichayathartham, and Muhurtham, ensuring every ritual is shot with cultural respect and accuracy."
  },
  {
    id: "f4",
    question: "Can I customize my photography package?",
    answer: "Yes, definitely. We believe every family's requirements are unique. We can tailor the duration, number of photographers, type of albums, and event count to fit your specific vision and budget."
  },
  {
    id: "f5",
    question: "Do you provide premium photo albums?",
    answer: "Yes, all our packages offer options for high-end printed photo albums. We offer premium matte, glossy, and metallic finishes with customized layouts, elegant custom storage cases, andParent duplicate albums."
  },
  {
    id: "f6",
    question: "How long does it take to receive the final photographs?",
    answer: "You will receive a sneak-peek set of 15-20 edited images within 3 days of the event. The full edited digital gallery will be delivered online within 14-21 days. Printed albums are delivered within 4-6 weeks after you approve the layout."
  },
  {
    id: "f7",
    question: "Do you provide both photography and videography?",
    answer: "Yes! While we are primarily known for fine-art storytelling photography, we have a curated team of cinematic videographers. We offer high-definition video coverage, cinematic wedding reels, and full traditional event videos as an add-on."
  },
  {
    id: "f8",
    question: "Is advance payment required to book a date?",
    answer: "Yes, we require a 30% advance payment along with a signed booking agreement to secure your date. The remaining 50% is due on the event day, and the final 20% balance is payable upon delivery of the digital gallery before album printing."
  }
];

// Helper to construct WhatsApp link with prefilled messages
export const getWhatsAppLink = (type: 'general' | 'wedding' | 'ceremony' | 'booking', detail?: string): string => {
  const phone = studioInfo.whatsapp;
  let text = "";

  switch (type) {
    case 'wedding':
      text = "Hello Bright to Bride, I would like to enquire about wedding photography. My event date is ______.";
      break;
    case 'ceremony':
      text = `Hello Bright to Bride, I would like to enquire about photography for my ${detail || "______"} ceremony.`;
      break;
    case 'booking':
      text = `Hello Bright to Bride, I would like to check availability for my event on ${detail || "______"}.`;
      break;
    default:
      text = "Hello Bright to Bride, I would like to enquire about your premium photography services.";
  }

  return `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`;
};
