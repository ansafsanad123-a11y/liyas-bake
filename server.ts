import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  writeBatch
} from "firebase/firestore";

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "server_db.json");

// Firebase Firestore Setup
let firestoreDb: any = null;
let firestoreConfig: any = null;

try {
  const configPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(configPath)) {
    firestoreConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
    const fbApp = !getApps().length ? initializeApp(firestoreConfig) : getApp();
    const dbId = firestoreConfig.firestoreDatabaseId || "(default)";
    firestoreDb = getFirestore(fbApp, dbId);
    console.log(`[Firebase Firestore] Connected to database: ${dbId} (project: ${firestoreConfig.projectId})`);
  }
} catch (err) {
  console.error("[Firebase Firestore] Error initializing Firebase:", err);
}

// Helper to hash password
function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

// Initial Seed Data for Liya's Bake
function getInitialSeedData() {
  const defaultAdminPassword = hashPassword("8431126242");

  return {
    admin: {
      username: "admin",
      passwordHash: defaultAdminPassword,
      isFirstLogin: false,
    },
    tokens: {} as Record<string, { username: string; expiresAt: number }>,
    settings: {
      siteName: "Liya's Bake",
      tagline: "Freshly Baked Happiness Every Day",
      logoUrl: "/logo.png",
      faviconUrl: "/logo.png",
      phone: "+91 8431126242",
      email: "hello@liyasbake.com",
      address: "jolly mohalla masjid road pvr road bengaluru karnataka 560053",
      googleMapsUrl: "https://maps.google.com/?q=jolly+mohalla+masjid+road+pvr+road+bengaluru+karnataka+560053",
      instagramUrl: "https://instagram.com",
      facebookUrl: "https://facebook.com",
      pinterestUrl: "https://pinterest.com",
      seoTitle: "Liya's Bake | Luxury Artisanal Bakery & Custom Cakes",
      seoDescription: "Indulge in artisanal cakes, handcrafted pastries, warm breads, and custom special order cakes crafted with gold leaf and organic ingredients.",
      seoKeywords: "luxury bakery, custom cakes, wedding cakes, artisanal pastries, Liya's Bake, gourmet cookies",
      maintenanceMode: false,
      visitCount: 1500,
      pickupNotice: "THE FOOD WILL NOT GET TO YOUR HOME IT SHOULD COME AND COLLECT FROM GIVEN ADDRESS"
    },
    homepage: {
      heroImage: "/src/assets/images/hero_bakery_banner_1785843789202.jpg",
      heroTitle: "Liya's Bake",
      tagline: "Freshly Baked Happiness Every Day",
      welcomeTitle: "Artisanal Craftsmanship & Pure Passion",
      welcomeSubtitle: "Where Every Creation Tells A Celebration Story",
      welcomeStory: "Founded in the heart of the culinary district, Liya's Bake brings timeless Parisian pastry techniques together with modern flavor palettes. We handcraft every batch using 100% organic French butter, Madagascar bourbon vanilla, and locally harvested berries.",
      ctaText1: "Explore Our Bakes",
      ctaText2: "Special Order Inquiry",
      featuredSectionTitle: "Our Signature Creations",
    },
    about: {
      storyTitle: "Our Journey & Philosophy",
      storyParagraphs: [
        "What began as a quiet kitchen experiment in 2018 has blossomed into a beloved sanctuary for pastry lovers and celebration seekers alike.",
        "At Liya's Bake, we believe that baking is a harmony of chemistry and soul. We never compromise on ingredients — using single-origin Valrhona chocolate, farm-fresh pasture eggs, and slow-fermented starters.",
        "Whether you are marking an intimate milestone or celebrating a grand wedding, our bakers put meticulous care into every crumb."
      ],
      mission: "To elevate life's everyday and monumental moments through extraordinary, handcrafted baked delights.",
      vision: "To be recognized globally as a benchmark of artisanal bakery excellence and sustainable luxury patisserie.",
      bakers: [
        {
          id: "b1",
          name: "Liya Vance",
          role: "Founder & Master Pastry Chef",
          bio: "Trained at Le Cordon Bleu Paris, Chef Liya has over 15 years of experience crafting award-winning wedding cakes and viennoiserie.",
          image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600"
        },
        {
          id: "b2",
          name: "Mateo Rossi",
          role: "Head Artisan Chocolatier",
          bio: "Specializing in bean-to-bar ganache and delicate chocolate sculptures that adorn our luxury celebration line.",
          image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600"
        },
        {
          id: "b3",
          name: "Aria Chen",
          role: "Senior Viennoiserie Specialist",
          bio: "Pioneer of our signature 72-hour lamination croissant dough that achieves unmatched flakiness and buttery richness.",
          image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=600"
        }
      ],
      qualityPromises: [
        {
          id: "qp1",
          title: "100% Organic Butter",
          description: "Sourced directly from grass-fed Normandy dairies for unmatched creaminess.",
          iconName: "Award"
        },
        {
          id: "qp2",
          title: "Baked Fresh Daily",
          description: "Our ovens fire before sunrise so every loaf and pastry is served at peak warmth.",
          iconName: "Sun"
        },
        {
          id: "qp3",
          title: "Zero Preservatives",
          description: "Pure, wholesome ingredients crafted without artificial additives or fillers.",
          iconName: "Heart"
        },
        {
          id: "qp4",
          title: "Custom Artistry",
          description: "Hand-sculpted sugar flowers and edible gold leaf tailored precisely to your vision.",
          iconName: "Sparkles"
        }
      ],
      timeline: [
        { year: "2018", title: "The First Oven", description: "Chef Liya opens a boutique micro-bakery offering artisan sourdough and macarons." },
        { year: "2020", title: "Luxury Wedding Line", description: "Launched our bespoke multi-tiered custom cake design service." },
        { year: "2022", title: "Gourmet Bakery Guild Award", description: "Honored with the National Patisserie Gold Award for Best Viennoiserie." },
        { year: "2024", title: "Expanding Our Craft", description: "Opened our current flagship store featuring an interactive open pastry atelier." }
      ]
    },
    products: [
      {
        id: "p1",
        name: "Rosé Velvet Celebration Cake",
        category: "Birthday Cakes",
        description: "Delicate pink velvet sponge layers infused with raspberry reduction and whipped Swiss meringue buttercream.",
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=800",
        availabilityBadge: "Made to Order",
        isFeatured: true,
        isHidden: false,
        orderIndex: 1,
        ingredients: ["Organic Flour", "Pasture Eggs", "Raspberry Puree", "Valrhona White Chocolate"],
        allergens: ["Gluten", "Dairy", "Eggs"],
        priceEstimate: "Bespoke Quote"
      },
      {
        id: "p2",
        name: "Gold Leaf Wedding Symphony",
        category: "Wedding Cakes",
        description: "A 4-tiered masterpiece featuring Earl Grey infused chiffon, blackberry compote, and 24k edible gold leaf gilding.",
        image: "/src/assets/images/about_bakery_story_1785843803396.jpg",
        availabilityBadge: "Made to Order",
        isFeatured: true,
        isHidden: false,
        orderIndex: 2,
        ingredients: ["Earl Grey Tea", "Organic Milk", "24K Gold Leaf", "Blackberries"],
        allergens: ["Gluten", "Dairy", "Eggs"],
        priceEstimate: "Custom Order"
      },
      {
        id: "p3",
        name: "Pistachio Raspberry Macaron Tower",
        category: "Pastries",
        description: "Handcrafted Sicilian pistachio ganache sandwiched in delicate almond shells with fresh raspberry centers.",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=800",
        availabilityBadge: "In Stock",
        isFeatured: true,
        isHidden: false,
        orderIndex: 3,
        ingredients: ["Almond Flour", "Egg Whites", "Sicilian Pistachio Paste", "Organic Sugar"],
        allergens: ["Nuts (Almond, Pistachio)", "Eggs", "Dairy"],
        priceEstimate: "Artisanal Selection"
      },
      {
        id: "p4",
        name: "Classic Honeycomb Croissant",
        category: "Pastries",
        description: "72-hour fermented laminated dough baked to golden perfection with crisp honeycomb layers.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800",
        availabilityBadge: "In Stock",
        isFeatured: true,
        isHidden: false,
        orderIndex: 4,
        ingredients: ["French Normandy Butter", "Unbleached Wheat Flour", "Sea Salt", "Active Yeast"],
        allergens: ["Gluten", "Dairy"],
        priceEstimate: "Fresh Daily"
      },
      {
        id: "p5",
        name: "Valrhona Dark Chocolate Hazelnut Cookie",
        category: "Cookies",
        description: "Thick, soft-baked cookies loaded with 70% dark chocolate chunks and roasted Piedmont hazelnuts.",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800",
        availabilityBadge: "In Stock",
        isFeatured: true,
        isHidden: false,
        orderIndex: 5,
        ingredients: ["Valrhona Chocolate", "Roasted Hazelnuts", "Brown Sugar", "Sea Salt"],
        allergens: ["Gluten", "Dairy", "Tree Nuts", "Eggs"],
        priceEstimate: "Box Selection"
      },
      {
        id: "p6",
        name: "Artisan Sourdough Boule",
        category: "Bread",
        description: "Naturally leavened sourdough with a blistered golden crust and chewy, open crumb.",
        image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=800",
        availabilityBadge: "In Stock",
        isFeatured: false,
        isHidden: false,
        orderIndex: 6,
        ingredients: ["Stone-ground Rye Flour", "Wheat Flour", "Filtered Water", "Sea Salt"],
        allergens: ["Gluten"],
        priceEstimate: "Daily Oven Batch"
      },
      {
        id: "p7",
        name: "Vanilla Bean Cloud Cupcakes",
        category: "Cupcakes",
        description: "Fluffy Madagascar bourbon vanilla cake crowned with silky swirl frosting and edible pearls.",
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800",
        availabilityBadge: "In Stock",
        isFeatured: true,
        isHidden: false,
        orderIndex: 7,
        ingredients: ["Bourbon Vanilla Beans", "Pasture Eggs", "Cake Flour", "Organic Butter"],
        allergens: ["Gluten", "Dairy", "Eggs"],
        priceEstimate: "Individual / Dozen"
      },
      {
        id: "p8",
        name: "Autumn Spiced Pecan Tart",
        category: "Seasonal Specials",
        description: "Crisp butter shortcrust filled with caramelized maple pecans and spiced dark rum cream.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
        availabilityBadge: "Seasonal",
        isFeatured: false,
        isHidden: false,
        orderIndex: 8,
        ingredients: ["Pecans", "Pure Maple Syrup", "Cinnamon", "Shortcrust Pastry"],
        allergens: ["Gluten", "Dairy", "Tree Nuts", "Eggs"],
        priceEstimate: "Seasonal Reserve"
      }
    ],
    gallery: [
      {
        id: "g1",
        title: "Grand Botanical Wedding Tier",
        category: "Cakes",
        imageUrl: "/src/assets/images/about_bakery_story_1785843803396.jpg",
        description: "Custom four-tier wedding cake adorned with sugar peonies and gold leaf gilding.",
        uploadDate: "2026-06-12"
      },
      {
        id: "g2",
        title: "Morning Viennoiserie Display",
        category: "Pastries",
        imageUrl: "/src/assets/images/hero_bakery_banner_1785843789202.jpg",
        description: "Freshly baked croissants, pain au chocolat, and fruit danishes resting on marble.",
        uploadDate: "2026-06-15"
      },
      {
        id: "g3",
        title: "Gourmet Macaron Palette",
        category: "Pastries",
        imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=800",
        description: "Pastel macaron assortment featuring lavender honey, pistachio, and salted caramel.",
        uploadDate: "2026-07-01"
      },
      {
        id: "g4",
        title: "Private Gala Dessert Banquet",
        category: "Events",
        imageUrl: "/src/assets/images/special_orders_cake_1785843816163.jpg",
        description: "Full dessert table styling for a high-profile anniversary gala.",
        uploadDate: "2026-07-10"
      },
      {
        id: "g5",
        title: "Artisan Bread Oven Release",
        category: "Bread",
        imageUrl: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=800",
        description: "Steaming sourdough loaves straight from our hearth oven.",
        uploadDate: "2026-07-18"
      },
      {
        id: "g6",
        title: "Double Chocolate Hazelnut Harvest",
        category: "Cookies",
        imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800",
        description: "Freshly cooled chewy hazelnut chocolate cookies.",
        uploadDate: "2026-07-22"
      }
    ],
    testimonials: [
      {
        id: "t1",
        name: "Evelyn & Thomas Sterling",
        rating: 5,
        comment: "Liya's Bake crafted our dream wedding cake. Not only was it a breathtaking work of art with real gold leaf, but the Earl Grey and blackberry flavors had all our guests talking for weeks!",
        occasion: "Wedding Celebration",
        date: "2026-06-20",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
        isApproved: true
      },
      {
        id: "t2",
        name: "Marcus Dupont",
        rating: 5,
        comment: "As someone who lived in Paris for 8 years, finding croissants of this caliber in the city seemed impossible — until I tried Liya's Bake. Unbelievably flaky, buttery, and divine.",
        occasion: "Daily Customer",
        date: "2026-07-04",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        isApproved: true
      },
      {
        id: "t3",
        name: "Sophia Martinez",
        rating: 5,
        comment: "Ordered a custom Rosé Velvet cake for my daughter's 21st birthday. The attention to detail, delicate sweetness, and stunning presentation exceeded all expectations!",
        occasion: "Milestone Birthday",
        date: "2026-07-19",
        avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
        isApproved: true
      }
    ],
    specialOrders: [
      {
        id: "so1",
        customerName: "Camilla Vance",
        phone: "+1 (555) 234-5678",
        email: "camilla.vance@example.com",
        occasion: "30th Birthday Soirée",
        preferredDate: "2026-08-25",
        servingSize: "40 - 50 Guests",
        message: "We would love a 3-tier cake matching our emerald and gold theme. Interested in pistachio raspberry or salted caramel crunch flavors.",
        specialRequirements: "Nut allergen warning for 2 guests - separate gluten-free cupcakes requested.",
        status: "Pending",
        createdAt: "2026-08-01T10:15:00Z"
      }
    ],
    businessHours: [
      { day: "Monday", openTime: "07:00 AM", closeTime: "08:00 PM", isClosed: false },
      { day: "Tuesday", openTime: "07:00 AM", closeTime: "08:00 PM", isClosed: false },
      { day: "Wednesday", openTime: "07:00 AM", closeTime: "08:00 PM", isClosed: false },
      { day: "Thursday", openTime: "07:00 AM", closeTime: "08:00 PM", isClosed: false },
      { day: "Friday", openTime: "07:00 AM", closeTime: "09:00 PM", isClosed: false },
      { day: "Saturday", openTime: "08:00 AM", closeTime: "09:00 PM", isClosed: false },
      { day: "Sunday", openTime: "08:00 AM", closeTime: "06:00 PM", isClosed: false }
    ]
  };
}

// Load or initialize database
function loadDb() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(content);
    } catch (e) {
      console.error("Error reading database file, reinitializing...", e);
    }
  }
  const seed = getInitialSeedData();
  fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2));
  return seed;
}

let db = loadDb();

async function syncFirestoreFromMemory() {
  if (!firestoreDb) return;
  try {
    await setDoc(doc(firestoreDb, "settings", "main"), db.settings || {});
    await setDoc(doc(firestoreDb, "homepage", "main"), db.homepage || {});
    await setDoc(doc(firestoreDb, "about", "main"), db.about || {});
    await setDoc(doc(firestoreDb, "businessHours", "main"), { hours: db.businessHours || [] });
    await setDoc(doc(firestoreDb, "admin", "credentials"), db.admin || {});
  } catch (err) {
    console.error("[Firebase Firestore] Error syncing settings to Firestore:", err);
  }
}

async function saveProductToFirestore(product: any) {
  if (!firestoreDb) return;
  try {
    await setDoc(doc(firestoreDb, "products", product.id), product);
  } catch (e) {
    console.error("[Firebase Firestore] Error saving product:", e);
  }
}

async function deleteProductFromFirestore(id: string) {
  if (!firestoreDb) return;
  try {
    await deleteDoc(doc(firestoreDb, "products", id));
  } catch (e) {
    console.error("[Firebase Firestore] Error deleting product:", e);
  }
}

async function deleteAllProductsFromFirestore() {
  if (!firestoreDb) return;
  try {
    const snap = await getDocs(collection(firestoreDb, "products"));
    const batch = writeBatch(firestoreDb);
    snap.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  } catch (e) {
    console.error("[Firebase Firestore] Error deleting all products:", e);
  }
}

async function saveGalleryToFirestore(item: any) {
  if (!firestoreDb) return;
  try {
    await setDoc(doc(firestoreDb, "gallery", item.id), item);
  } catch (e) {
    console.error("[Firebase Firestore] Error saving gallery item:", e);
  }
}

async function deleteGalleryFromFirestore(id: string) {
  if (!firestoreDb) return;
  try {
    await deleteDoc(doc(firestoreDb, "gallery", id));
  } catch (e) {
    console.error("[Firebase Firestore] Error deleting gallery item:", e);
  }
}

async function deleteAllGalleryFromFirestore() {
  if (!firestoreDb) return;
  try {
    const snap = await getDocs(collection(firestoreDb, "gallery"));
    const batch = writeBatch(firestoreDb);
    snap.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  } catch (e) {
    console.error("[Firebase Firestore] Error deleting all gallery items:", e);
  }
}

async function saveSpecialOrderToFirestore(so: any) {
  if (!firestoreDb) return;
  try {
    await setDoc(doc(firestoreDb, "specialOrders", so.id), so);
  } catch (e) {
    console.error("[Firebase Firestore] Error saving special order:", e);
  }
}

async function deleteSpecialOrderFromFirestore(id: string) {
  if (!firestoreDb) return;
  try {
    await deleteDoc(doc(firestoreDb, "specialOrders", id));
  } catch (e) {
    console.error("[Firebase Firestore] Error deleting special order:", e);
  }
}

async function deleteAllSpecialOrdersFromFirestore() {
  if (!firestoreDb) return;
  try {
    const snap = await getDocs(collection(firestoreDb, "specialOrders"));
    const batch = writeBatch(firestoreDb);
    snap.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  } catch (e) {
    console.error("[Firebase Firestore] Error deleting all special orders:", e);
  }
}

async function saveTestimonialToFirestore(testimonial: any) {
  if (!firestoreDb) return;
  try {
    await setDoc(doc(firestoreDb, "testimonials", testimonial.id), testimonial);
  } catch (e) {
    console.error("[Firebase Firestore] Error saving testimonial:", e);
  }
}

async function deleteTestimonialFromFirestore(id: string) {
  if (!firestoreDb) return;
  try {
    await deleteDoc(doc(firestoreDb, "testimonials", id));
  } catch (e) {
    console.error("[Firebase Firestore] Error deleting testimonial:", e);
  }
}

async function deleteAllTestimonialsFromFirestore() {
  if (!firestoreDb) return;
  try {
    const snap = await getDocs(collection(firestoreDb, "testimonials"));
    const batch = writeBatch(firestoreDb);
    snap.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  } catch (e) {
    console.error("[Firebase Firestore] Error deleting all testimonials:", e);
  }
}

async function loadFromFirestoreOrSeed() {
  if (!firestoreDb) return;
  try {
    const productsSnap = await getDocs(collection(firestoreDb, "products"));
    if (productsSnap.empty) {
      console.log("[Firebase Firestore] Seeding Firestore with initial bakery catalog data...");
      for (const p of db.products || []) {
        await setDoc(doc(firestoreDb, "products", p.id), p);
      }
      for (const g of db.gallery || []) {
        await setDoc(doc(firestoreDb, "gallery", g.id), g);
      }
      for (const t of db.testimonials || []) {
        await setDoc(doc(firestoreDb, "testimonials", t.id), t);
      }
      for (const so of db.specialOrders || []) {
        await setDoc(doc(firestoreDb, "specialOrders", so.id), so);
      }
      await syncFirestoreFromMemory();
      console.log("[Firebase Firestore] Initial seeding to Firestore database completed!");
    } else {
      console.log("[Firebase Firestore] Loading live data from Firestore database...");
      const pList: any[] = [];
      productsSnap.forEach((d) => pList.push(d.data()));
      db.products = pList;

      const gSnap = await getDocs(collection(firestoreDb, "gallery"));
      const gList: any[] = [];
      gSnap.forEach((d) => gList.push(d.data()));
      db.gallery = gList;

      const tSnap = await getDocs(collection(firestoreDb, "testimonials"));
      const tList: any[] = [];
      tSnap.forEach((d) => tList.push(d.data()));
      db.testimonials = tList;

      const soSnap = await getDocs(collection(firestoreDb, "specialOrders"));
      const soList: any[] = [];
      soSnap.forEach((d) => soList.push(d.data()));
      db.specialOrders = soList;

      const settingsDoc = await getDoc(doc(firestoreDb, "settings", "main"));
      if (settingsDoc.exists()) {
        const firestoreSettings = settingsDoc.data();
        db.settings = { ...db.settings, ...firestoreSettings };
      }

      // Ensure logoUrl is updated from stale bread images to official logo
      if (!db.settings.logoUrl || db.settings.logoUrl.includes("photo-1509440159596") || db.settings.logoUrl.includes("unsplash.com")) {
        db.settings.logoUrl = "/logo.png";
        db.settings.faviconUrl = "/logo.png";
      }

      // Always set the requested admin password hash for 8431126242
      db.admin.passwordHash = hashPassword("8431126242");
      db.admin.isFirstLogin = false;

      const homepageDoc = await getDoc(doc(firestoreDb, "homepage", "main"));
      if (homepageDoc.exists()) db.homepage = homepageDoc.data();

      const aboutDoc = await getDoc(doc(firestoreDb, "about", "main"));
      if (aboutDoc.exists()) db.about = aboutDoc.data();

      const hoursDoc = await getDoc(doc(firestoreDb, "businessHours", "main"));
      if (hoursDoc.exists() && hoursDoc.data().hours) db.businessHours = hoursDoc.data().hours;

      // Sync sanitized values back to Firestore
      await syncFirestoreFromMemory();

      console.log("[Firebase Firestore] Loaded all collections successfully from Firestore database!");
    }
  } catch (err) {
    console.error("[Firebase Firestore] Error reading/seeding Firestore:", err);
  }
}

function saveDb(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  if (firestoreDb) {
    syncFirestoreFromMemory().catch((err) => console.error("[Firebase Firestore] Background sync error:", err));
  }
}

async function startServer() {
  const app = express();

  // Load from Firestore database or seed if empty
  await loadFromFirestoreOrSeed();

  app.use(express.json({ limit: "20mb" }));
  app.use(express.urlencoded({ extended: true, limit: "20mb" }));

  // Middleware: Auth Token Verification
  function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized. Admin token required." });
    }
    const token = authHeader.split(" ")[1];
    const session = db.tokens[token];
    if (!session || session.expiresAt < Date.now()) {
      return res.status(401).json({ error: "Session expired or invalid. Please login again." });
    }
    (req as any).adminUser = session.username;
    next();
  }

  // ==========================================
  // PUBLIC API ENDPOINTS
  // ==========================================

  // Get public site data
  app.get("/api/site-data", (req, res) => {
    // Increment visit count once
    db.settings.visitCount = (db.settings.visitCount || 0) + 1;
    saveDb(db);

    const publicProducts = db.products.filter((p: any) => !p.isHidden);
    const approvedTestimonials = db.testimonials.filter((t: any) => t.isApproved);

    res.json({
      settings: db.settings,
      homepage: db.homepage,
      about: db.about,
      products: publicProducts,
      gallery: db.gallery,
      testimonials: approvedTestimonials,
      businessHours: db.businessHours,
    });
  });

  // Admin Login
  app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    if (username !== db.admin.username) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const isPasswordValid = bcrypt.compareSync(password, db.admin.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    db.tokens[token] = {
      username: db.admin.username,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
    saveDb(db);

    res.json({
      token,
      admin: {
        username: db.admin.username,
        isFirstLogin: db.admin.isFirstLogin,
      },
    });
  });

  // Change Admin Username/Password (Forces password change)
  app.post("/api/auth/change-password", requireAdminAuth, (req, res) => {
    const { newUsername, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters long." });
    }

    if (newUsername && newUsername.trim()) {
      db.admin.username = newUsername.trim();
    }

    db.admin.passwordHash = hashPassword(newPassword);
    db.admin.isFirstLogin = false; // Flag cleared on successful change!
    saveDb(db);

    res.json({
      message: "Credentials updated successfully.",
      admin: {
        username: db.admin.username,
        isFirstLogin: false,
      },
    });
  });

  // Public submission of Special Order Inquiry
  app.post("/api/special-orders", (req, res) => {
    const { customerName, phone, email, occasion, preferredDate, servingSize, message, specialRequirements } = req.body;

    if (!customerName || !phone || !occasion || !message) {
      return res.status(400).json({ error: "Please fill in all required enquiry fields." });
    }

    const newRequest = {
      id: "so_" + Date.now(),
      customerName,
      phone,
      email: email || "",
      occasion,
      preferredDate: preferredDate || "TBD",
      servingSize: servingSize || "Flexible",
      message,
      specialRequirements: specialRequirements || "",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    if (!db.specialOrders) db.specialOrders = [];
    db.specialOrders.unshift(newRequest);
    saveDb(db);
    saveSpecialOrderToFirestore(newRequest);

    res.json({ message: "Special order inquiry submitted successfully!", request: newRequest });
  });

  // Public Testimonial Submission (Pending approval)
  app.post("/api/testimonials", (req, res) => {
    const { name, rating, comment, occasion } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ error: "Name, rating, and comment are required." });
    }

    const newTestimonial = {
      id: "t_" + Date.now(),
      name,
      rating: Number(rating) || 5,
      comment,
      occasion: occasion || "Special Memory",
      date: new Date().toISOString().split("T")[0],
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150`,
      isApproved: false, // Requires admin approval
    };

    db.testimonials.unshift(newTestimonial);
    saveDb(db);
    saveTestimonialToFirestore(newTestimonial);

    res.json({ message: "Thank you for your review! It will be published after admin verification.", testimonial: newTestimonial });
  });

  // ==========================================
  // ADMIN API ENDPOINTS (Protected)
  // ==========================================

  // Admin Dashboard Overview Stats & Complete Data
  app.get("/api/admin/dashboard", requireAdminAuth, (req, res) => {
    res.json({
      stats: {
        totalProducts: db.products.length,
        totalGalleryImages: db.gallery.length,
        totalTestimonials: db.testimonials.length,
        pendingSpecialOrders: (db.specialOrders || []).filter((so: any) => so.status === "Pending").length,
        totalSpecialOrders: (db.specialOrders || []).length,
        websiteVisits: db.settings.visitCount,
      },
      products: db.products,
      gallery: db.gallery,
      testimonials: db.testimonials,
      specialOrders: db.specialOrders || [],
      homepage: db.homepage,
      about: db.about,
      businessHours: db.businessHours,
      settings: db.settings,
      adminInfo: {
        username: db.admin.username,
        isFirstLogin: db.admin.isFirstLogin,
      },
    });
  });

  // PRODUCT MANAGEMENT
  app.post("/api/admin/products", requireAdminAuth, (req, res) => {
    const { name, category, description, image, availabilityBadge, isFeatured, isHidden, ingredients, allergens, priceEstimate } = req.body;

    if (!name || !category || !description) {
      return res.status(400).json({ error: "Product name, category, and description are required." });
    }

    const newProduct = {
      id: "p_" + Date.now(),
      name,
      category,
      description,
      image: image || "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
      availabilityBadge: availabilityBadge || "In Stock",
      isFeatured: !!isFeatured,
      isHidden: !!isHidden,
      orderIndex: db.products.length + 1,
      ingredients: Array.isArray(ingredients) ? ingredients : [],
      allergens: Array.isArray(allergens) ? allergens : [],
      priceEstimate: priceEstimate || "",
    };

    db.products.push(newProduct);
    saveDb(db);
    saveProductToFirestore(newProduct);
    res.json({ message: "Product created successfully.", product: newProduct });
  });

  app.put("/api/admin/products/:id", requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const index = db.products.findIndex((p: any) => p.id === id);
    if (index === -1) return res.status(404).json({ error: "Product not found." });

    db.products[index] = {
      ...db.products[index],
      ...req.body,
      id, // Preserve ID
    };
    saveDb(db);
    saveProductToFirestore(db.products[index]);
    res.json({ message: "Product updated successfully.", product: db.products[index] });
  });

  app.delete("/api/admin/products/:id", requireAdminAuth, (req, res) => {
    const { id } = req.params;
    db.products = db.products.filter((p: any) => p.id !== id);
    saveDb(db);
    deleteProductFromFirestore(id);
    res.json({ message: "Product deleted successfully." });
  });

  // DELETE ALL PRODUCTS
  app.delete("/api/admin/products", requireAdminAuth, (req, res) => {
    db.products = [];
    saveDb(db);
    deleteAllProductsFromFirestore();
    res.json({ message: "All products deleted successfully." });
  });

  app.patch("/api/admin/products/reorder", requireAdminAuth, (req, res) => {
    const { orderedIds } = req.body;
    if (Array.isArray(orderedIds)) {
      db.products.sort((a: any, b: any) => {
        const indexA = orderedIds.indexOf(a.id);
        const indexB = orderedIds.indexOf(b.id);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
      });
      db.products.forEach((p: any, idx: number) => {
        p.orderIndex = idx + 1;
        saveProductToFirestore(p);
      });
      saveDb(db);
    }
    res.json({ message: "Product order saved." });
  });

  // GALLERY MANAGEMENT
  app.post("/api/admin/gallery", requireAdminAuth, (req, res) => {
    const { title, category, imageUrl, description } = req.body;
    if (!title || !imageUrl) {
      return res.status(400).json({ error: "Title and Image URL are required." });
    }

    const newItem = {
      id: "g_" + Date.now(),
      title,
      category: category || "Cakes",
      imageUrl,
      description: description || "",
      uploadDate: new Date().toISOString().split("T")[0],
    };

    db.gallery.unshift(newItem);
    saveDb(db);
    saveGalleryToFirestore(newItem);
    res.json({ message: "Gallery image uploaded successfully.", item: newItem });
  });

  app.put("/api/admin/gallery/:id", requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const index = db.gallery.findIndex((g: any) => g.id === id);
    if (index === -1) return res.status(404).json({ error: "Gallery item not found." });

    db.gallery[index] = { ...db.gallery[index], ...req.body, id };
    saveDb(db);
    saveGalleryToFirestore(db.gallery[index]);
    res.json({ message: "Gallery item updated successfully.", item: db.gallery[index] });
  });

  app.delete("/api/admin/gallery/:id", requireAdminAuth, (req, res) => {
    const { id } = req.params;
    db.gallery = db.gallery.filter((g: any) => g.id !== id);
    saveDb(db);
    deleteGalleryFromFirestore(id);
    res.json({ message: "Gallery item deleted." });
  });

  // DELETE ALL GALLERY ITEMS
  app.delete("/api/admin/gallery", requireAdminAuth, (req, res) => {
    db.gallery = [];
    saveDb(db);
    deleteAllGalleryFromFirestore();
    res.json({ message: "All gallery items deleted." });
  });

  // SPECIAL ORDER MANAGEMENT
  app.patch("/api/admin/special-orders/:id/status", requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const item = (db.specialOrders || []).find((so: any) => so.id === id);
    if (!item) return res.status(404).json({ error: "Order request not found." });

    item.status = status;
    saveDb(db);
    saveSpecialOrderToFirestore(item);
    res.json({ message: "Order status updated.", request: item });
  });

  app.delete("/api/admin/special-orders/:id", requireAdminAuth, (req, res) => {
    const { id } = req.params;
    db.specialOrders = (db.specialOrders || []).filter((so: any) => so.id !== id);
    saveDb(db);
    deleteSpecialOrderFromFirestore(id);
    res.json({ message: "Order request deleted." });
  });

  // DELETE ALL SPECIAL ORDERS
  app.delete("/api/admin/special-orders", requireAdminAuth, (req, res) => {
    db.specialOrders = [];
    saveDb(db);
    deleteAllSpecialOrdersFromFirestore();
    res.json({ message: "All special orders deleted." });
  });

  // TESTIMONIAL MANAGEMENT
  app.put("/api/admin/testimonials/:id", requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const index = db.testimonials.findIndex((t: any) => t.id === id);
    if (index === -1) return res.status(404).json({ error: "Testimonial not found." });

    db.testimonials[index] = { ...db.testimonials[index], ...req.body, id };
    saveDb(db);
    saveTestimonialToFirestore(db.testimonials[index]);
    res.json({ message: "Testimonial updated.", testimonial: db.testimonials[index] });
  });

  app.delete("/api/admin/testimonials/:id", requireAdminAuth, (req, res) => {
    const { id } = req.params;
    db.testimonials = db.testimonials.filter((t: any) => t.id !== id);
    saveDb(db);
    deleteTestimonialFromFirestore(id);
    res.json({ message: "Testimonial deleted." });
  });

  // DELETE ALL TESTIMONIALS
  app.delete("/api/admin/testimonials", requireAdminAuth, (req, res) => {
    db.testimonials = [];
    saveDb(db);
    deleteAllTestimonialsFromFirestore();
    res.json({ message: "All testimonials deleted." });
  });

  // DELETE ALL DATA (Wipe products, gallery, special orders, and testimonials)
  app.delete("/api/admin/all-data", requireAdminAuth, (req, res) => {
    db.products = [];
    db.gallery = [];
    db.specialOrders = [];
    db.testimonials = [];
    saveDb(db);
    deleteAllProductsFromFirestore();
    deleteAllGalleryFromFirestore();
    deleteAllSpecialOrdersFromFirestore();
    deleteAllTestimonialsFromFirestore();
    res.json({ message: "All catalog products, gallery photos, reviews, and inquiries have been wiped successfully." });
  });

  // HOMEPAGE & ABOUT CONTENT MANAGEMENT
  app.put("/api/admin/homepage", requireAdminAuth, (req, res) => {
    db.homepage = { ...db.homepage, ...req.body };
    saveDb(db);
    res.json({ message: "Homepage content updated.", homepage: db.homepage });
  });

  app.put("/api/admin/about", requireAdminAuth, (req, res) => {
    db.about = { ...db.about, ...req.body };
    saveDb(db);
    res.json({ message: "About page content updated.", about: db.about });
  });

  // BUSINESS HOURS MANAGEMENT
  app.put("/api/admin/business-hours", requireAdminAuth, (req, res) => {
    if (Array.isArray(req.body.hours)) {
      db.businessHours = req.body.hours;
      saveDb(db);
    }
    res.json({ message: "Business hours updated.", businessHours: db.businessHours });
  });

  // SETTINGS MANAGEMENT
  app.put("/api/admin/settings", requireAdminAuth, (req, res) => {
    db.settings = { ...db.settings, ...req.body };
    saveDb(db);
    res.json({ message: "Site settings updated.", settings: db.settings });
  });

  // MEDIA UPLOAD SIMULATOR (Base64 / URL Image Manager)
  app.post("/api/admin/media/upload", requireAdminAuth, (req, res) => {
    const { imageUrl, fileName } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL or data is required." });
    }
    // Return processed media URL
    res.json({
      message: "Media uploaded successfully.",
      mediaUrl: imageUrl,
      fileName: fileName || "baked_asset_" + Date.now() + ".jpg",
    });
  });

  // VITE DEV OR PRODUCTION STATIC SERVER
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Liya's Bake server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
