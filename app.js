// Import initialized Firebase modules
import { db, auth, analytics } from "./firebase-config.js";

// Import Firestore functions
import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  limit
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Import Auth functions
import {
  signInAnonymously,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  linkWithCredential,
  EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ==========================================
// PRESET SYSTEM FOODS & RECIPES
// ==========================================
const PRESET_FOODS = [
  {
    id: "system-1",
    name: "Harvest Grain Bowl",
    calories: 450,
    protein: 18,
    carbs: 52,
    fats: 24,
    fiber: 8,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCJGbWwOvB3asKI2TilP73MgUGkgmqEMdztC0b3nOEOHTVQzcj31jRLmWMQz1D7oQ5AbvDx7NxSkEdJi3KvdjjTHezB-QsGtp97Wte2OdhyCUV2aMMRrY6bZG03idfVZVeDQzVylirwBFeWfYtcPJMLGp9FJmBGP1OqlTyst0OshZYWl4TBFH1vKNad4Z1wIivA3Td2mZa88__IZxp51LbZKlbxkBQIH2PI12BrcbfQnv-wFFVum69uFNAjh2b49pvxhgYnlAdwuk",
    isCustom: false,
    rating: 4.8
  },
  {
    id: "system-2",
    name: "Artisan Pesto Pizza",
    calories: 680,
    protein: 24,
    carbs: 85,
    fats: 18,
    fiber: 4,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBD0STv1JVb7wsnZQzrHo9rSf6gkdpLnnH1t1CAQXQeYmuhfM3Q0nyhD0dqZE_t6cRyMUYo0CUhkCYf_ewrG13Tzx38BW8GN8SNUZyuqIq64NR-OVORYfZ6P8TZPLf4-VDzup5-DIC0Cs0WX38D43Ej8rm3Ura0o7qQA07So-UCIIQseVXM6G09c_GXFN5iBGbEfeSx7uf70BVJam5NzgWsQldiO62DkKvPobsPbmoTs-oDepdoAat6eTLKW_ry1WWzVMzMEkAWWCM",
    isCustom: false,
    rating: 4.7
  },
  {
    id: "system-3",
    name: "Salmon Avocado Toast",
    calories: 320,
    protein: 16,
    carbs: 22,
    fats: 19,
    fiber: 6,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVNra65avgD8Eub60a_VFm5_lgmaTPux7qSshSodqL0VfNWYjqHJ-nDcjMZGOA5JDxCs5ityoz4urI3uik2wM70SlVTcy2EEi1rpyamT_NDECKg6k_NfU3vuQ-ecap6yBBozQdjNrqof2-Oi04tu_PL63MH7WbXPN-OBRyzhDcvLvO237qd_Egr8A7UDD1Pq8IGqxgVBqVAACxebj7Tudj31IwU0KN2P4BM-3xwkURfzQ0U9HP3s4hfCkJM1yIlaV1zWYrCHvxKgU",
    isCustom: false,
    rating: 4.9
  },
  {
    id: "system-4",
    name: "Alex's Greek Classic",
    calories: 210,
    protein: 6,
    carbs: 14,
    fats: 15,
    fiber: 3,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFlpEgVR1uP8psrT_WsoZnIzvx0vH_khRS9iOQxSm3ukHABITeYeSrYIb1nJ59RWjjeXYNBaBH4i0Ogh2b8bI7wQ89lYm2Qo0HDDo_qnrCOe2tEyJPkKMVyBHGYCABgm598jVn5LuwfIComkAhyCpoaVvT-2gnLKiMTF9qhCggnJpWZZiMEIgaZuFLXTxGWC-b9mQxEcDOpnSIJi8bmuH5nVKPMNS1rNNreRd0OWA1XBOaJqiZOyOrswLmOgR13tbjRGQNpTcIt2A",
    isCustom: false,
    isMyRecipe: true,
    rating: 4.5
  },
  {
    id: "system-5",
    name: "Power Nut Mix",
    calories: 180,
    protein: 5,
    carbs: 12,
    fats: 14,
    fiber: 3,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoFx4OoOH7GPMDkop_ggfdqOxWrriplwXlnoxkNt-LTKOTbPkUBDu4GwdLN2FO9m3kujiw_usse-EfL1H2G1_sZE36v24pHLQRxdMjwHh3AgAS8bsdM8ZU9HiUu3ls_tyA_viiMKMmQ7hVJbEBA93F_V8tho_nz3VUO8GIRXstlTWOVv_f1cePwyxISrO3BYAznvVqaXU-c3L6n621PDVH6S8XnhfS_QcSbEpYXVQ6XDH1WGHfD17YLBpcgdkQmbuwOy43BvTB9I4",
    isCustom: false,
    rating: 4.6
  },
  {
    id: "system-6",
    name: "Red Lentil Comfort",
    calories: 380,
    protein: 22,
    carbs: 48,
    fats: 6,
    fiber: 12,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7Ft69tT5vlxk7BDp7Vw33zhUCtpeZAliF2AE2fICFprU9V8QB3guaquZZoZKU9PcPiouQlAibomomX4yon2Yoy8I4wVaFK6qknraZEDaYVJKG8RJMzAYXW20uL22nv2GugSj_nUvFl5YhaMcPyAKzNIw-U7gRYkWel7wV2sfobhfgqeExFvN9uhUTdgOPIn_rbFpnlD-CwHHroG8kCIjxTKMj51W6v9Nv7PDMCzmp78dJ1N8w9kQsvX9Wtw6KGjsSDzlhHZoMucw",
    isCustom: false,
    rating: 4.8
  }
];

// ==========================================
// APPLICATION STATE
// ==========================================
let state = {
  uid: null,
  activeDate: getLocalDateString(),
  foodFilter: "all", // 'all', 'custom', 'system'
  foodSearchQuery: "",
  taskSearchQuery: "",
  taskFilterTag: null,
  selectedFoodToLog: null,
  editingTaskId: null,
  editingHabitId: null,
  profile: {
    ownerName: "Alex Rivers",
    height: 175,
    weight: 70,
    targetCal: 2000,
    macroP: 30, // % protein
    macroC: 40, // % carbs
    macroF: 30, // % fats
    goalTitle: "Health maintenance",
    targetWeight: 70,
    goalDesc: "Maintain a stable BMI",
    dietStrategy: "Balanced nutrition"
  },
  meals: [],
  waterLogs: {},
  tasks: [],
  habits: [],
  transactions: [],
  customFoods: []
};

// Listeners unsubscribe cache
let activeListeners = [];

// ==========================================
// INIT APP & AUTHENTICATION
// ==========================================
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Authenticated as:", user.uid, "Email:", user.email || "Anonymous");
    state.uid = user.uid;
    
    // Update top bar connection indicators
    document.getElementById("sync-indicator").className = "w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse";
    document.getElementById("user-display-name").innerText = user.email ? user.email.split("@")[0] : "Guest User";
    document.getElementById("user-display-name").classList.remove("hidden");
    document.getElementById("storage-status-text").innerText = "Firebase Sync Active";
    
    // Check if profile exists; if not, initialize with default profile values
    const profileDocRef = doc(db, "users", user.uid, "profile", "config");
    const profileSnap = await getDoc(profileDocRef);
    if (!profileSnap.exists()) {
      await setDoc(profileDocRef, state.profile);
    }

    // Bind UI controls for auth state
    if (user.isAnonymous) {
      document.getElementById("auth-logged-out").classList.remove("hidden");
      document.getElementById("auth-logged-in").classList.add("hidden");
    } else {
      document.getElementById("auth-logged-out").classList.add("hidden");
      document.getElementById("auth-logged-in").classList.remove("hidden");
      document.getElementById("auth-user-email").innerText = user.email;
    }

    // Hide overlay
    document.getElementById("auth-overlay").classList.add("hidden");

    // Set up Firestore real-time snapshots
    setupRealtimeListeners(user.uid);

  } else {
    console.log("No authenticated user, showing auth overlay...");
    document.getElementById("sync-indicator").className = "w-2.5 h-2.5 rounded-full bg-rose-500";
    document.getElementById("storage-status-text").innerText = "Logged Out";
    
    // Show auth overlay
    document.getElementById("auth-overlay").classList.remove("hidden");
  }
});

// Clean up existing event subscriptions
function clearListeners() {
  activeListeners.forEach((unsub) => unsub());
  activeListeners = [];
}

// Subscribe to Firestore collections in real time
function setupRealtimeListeners(uid) {
  clearListeners();

  // 1. Profile listener
  const profileUnsub = onSnapshot(doc(db, "users", uid, "profile", "config"), (docSnap) => {
    if (docSnap.exists()) {
      state.profile = docSnap.data();
      renderProfileView();
      renderDietOverview();
      renderHomeView();
    }
  });
  activeListeners.push(profileUnsub);

  // 2. Meals log listener
  const mealsUnsub = onSnapshot(collection(db, "users", uid, "meals"), (querySnap) => {
    state.meals = [];
    querySnap.forEach((doc) => {
      state.meals.push({ id: doc.id, ...doc.data() });
    });
    renderDietOverview();
    renderHomeView();
  });
  activeListeners.push(mealsUnsub);

  // 3. Water logs listener
  const waterUnsub = onSnapshot(collection(db, "users", uid, "water"), (querySnap) => {
    state.waterLogs = {};
    querySnap.forEach((doc) => {
      state.waterLogs[doc.id] = doc.data().amount || 0;
    });
    renderWaterSection();
  });
  activeListeners.push(waterUnsub);

  // 4. Tasks listener
  const tasksUnsub = onSnapshot(collection(db, "users", uid, "tasks"), (querySnap) => {
    state.tasks = [];
    querySnap.forEach((doc) => {
      state.tasks.push({ id: doc.id, ...doc.data() });
    });
    renderTasksView();
    renderHomeView();
  });
  activeListeners.push(tasksUnsub);

  // 5. Habits listener
  const habitsUnsub = onSnapshot(collection(db, "users", uid, "habits"), (querySnap) => {
    state.habits = [];
    querySnap.forEach((doc) => {
      state.habits.push({ id: doc.id, ...doc.data() });
    });
    renderHabitsView();
    renderHomeView();
  });
  activeListeners.push(habitsUnsub);

  // 6. Transactions listener
  const walletUnsub = onSnapshot(collection(db, "users", uid, "transactions"), (querySnap) => {
    state.transactions = [];
    querySnap.forEach((doc) => {
      state.transactions.push({ id: doc.id, ...doc.data() });
    });
    renderWalletView();
    renderHomeView();
  });
  activeListeners.push(walletUnsub);

  // 7. Custom foods listener
  const foodsUnsub = onSnapshot(collection(db, "users", uid, "custom_foods"), (querySnap) => {
    state.customFoods = [];
    querySnap.forEach((doc) => {
      state.customFoods.push({ id: doc.id, ...doc.data() });
    });
    renderFoodsView();
  });
  activeListeners.push(foodsUnsub);
}

// ==========================================
// HELPERS
// ==========================================
function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseLocalDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

// ==========================================
// SINGLE-PAGE ROUTING
// ==========================================
function router(view) {
  console.log("Navigating to:", view);
  
  // Hide all sections
  document.querySelectorAll(".view-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Show active section
  const targetSection = document.getElementById(`${view}-view`);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // Update navigation styling
  updateNavigationStyles(view);

  // Scroll to top of body
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateNavigationStyles(view) {
  // Desktop Sidebar items
  const sidebarButtons = {
    home: "side-nav-home",
    diet: "side-nav-diet",
    recipes: "side-nav-diet", // highlights diet tab when on recipe catalog
    tasks: "side-nav-tasks",
    habits: "side-nav-habits",
    wallet: "side-nav-wallet",
    profile: "side-nav-profile"
  };

  Object.entries(sidebarButtons).forEach(([key, id]) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    if (key === view) {
      btn.className = "w-full flex items-center gap-3 px-4 py-3 rounded-full bg-primary/10 text-primary font-bold text-left transition-all";
    } else if (view === "recipes" && key === "diet") {
      btn.className = "w-full flex items-center gap-3 px-4 py-3 rounded-full bg-primary/10 text-primary font-bold text-left transition-all";
    } else {
      btn.className = "w-full flex items-center gap-3 px-4 py-3 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors font-medium text-left";
    }
  });

  // Mobile Bottom Nav items
  const bottomButtons = {
    home: "bottom-nav-home",
    diet: "bottom-nav-diet",
    recipes: "bottom-nav-diet",
    tasks: "bottom-nav-tasks",
    habits: "bottom-nav-habits",
    wallet: "bottom-nav-wallet"
  };

  Object.entries(bottomButtons).forEach(([key, id]) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    const icon = btn.querySelector(".material-symbols-outlined");
    if (key === view) {
      btn.className = "flex flex-col items-center justify-center text-primary font-bold flex-1 py-1 active:scale-90 transition-transform";
      if (icon) icon.style.fontVariationSettings = "'FILL' 1";
    } else if (view === "recipes" && key === "diet") {
      btn.className = "flex flex-col items-center justify-center text-primary font-bold flex-1 py-1 active:scale-90 transition-transform";
      if (icon) icon.style.fontVariationSettings = "'FILL' 1";
    } else {
      btn.className = "flex flex-col items-center justify-center text-on-surface-variant flex-1 py-1 active:scale-90 transition-transform";
      if (icon) icon.style.fontVariationSettings = "'FILL' 0";
    }
  });
}

// Expose routing globally
window.router = router;

// ==========================================
// DIET & CALORIE LOGS
// ==========================================
function renderDietTimeline() {
  const timeline = document.getElementById("diet-timeline");
  if (!timeline) return;
  timeline.innerHTML = "";

  // Render past 7 days timeline
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = getLocalDateString(d);
    const isActive = dateStr === state.activeDate;

    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = d.getDate();

    const element = document.createElement("button");
    element.onclick = () => {
      state.activeDate = dateStr;
      renderDietTimeline();
      renderDietOverview();
    };

    if (isActive) {
      element.className = "flex flex-col items-center justify-center w-12 h-16 rounded-xl bg-primary text-on-primary font-bold shadow-md transition-all scale-105";
    } else {
      element.className = "flex flex-col items-center justify-center w-12 h-16 rounded-xl bg-surface-container-lowest border border-outline-variant hover:bg-surface-container transition-all text-on-surface-variant";
    }

    element.innerHTML = `
      <span class="text-[9px] uppercase font-semibold">${dayName}</span>
      <span class="text-base font-extrabold mt-0.5">${dayNum}</span>
    `;
    timeline.appendChild(element);
  }
}

function renderDietOverview() {
  renderDietTimeline();

  // Filter meals logged for activeDate
  const activeMeals = state.meals.filter((m) => m.date === state.activeDate);

  let consumedKcal = 0;
  let protein = 0;
  let carbs = 0;
  let fats = 0;
  let fiber = 0;

  // Clear meal list containers
  const categories = ["breakfast", "lunch", "dinner", "snacks"];
  const listContainers = {};
  const kcalTotals = {};

  categories.forEach((cat) => {
    listContainers[cat] = document.getElementById(`meals-list-${cat}`);
    kcalTotals[cat] = 0;
    if (listContainers[cat]) {
      listContainers[cat].innerHTML = `<p class="text-body-sm italic text-on-surface-variant py-2">No items logged</p>`;
    }
  });

  // Calculate macro totals and render meal cards
  activeMeals.forEach((meal) => {
    consumedKcal += Number(meal.calories || 0);
    protein += Number(meal.protein || 0);
    carbs += Number(meal.carbs || 0);
    fats += Number(meal.fats || 0);
    fiber += Number(meal.fiber || 0);

    const cat = meal.mealType ? meal.mealType.toLowerCase() : "snacks";
    kcalTotals[cat] += Number(meal.calories || 0);

    const container = listContainers[cat];
    if (container) {
      // Clear placeholder on first item addition
      if (container.querySelector("p.italic")) {
        container.innerHTML = "";
      }

      const row = document.createElement("div");
      row.className = "flex items-center justify-between py-2 border-b border-outline-variant/30 last:border-b-0 hover:bg-surface-container-low/50 px-2 rounded-lg transition-colors group";
      row.innerHTML = `
        <div class="flex-grow">
          <p class="text-body-md font-bold text-on-surface">${meal.name}</p>
          <p class="text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
            <span class="font-bold text-primary">${meal.calories} kcal</span> • 
            <span class="data-font">P: ${meal.protein}g</span> • 
            <span class="data-font">C: ${meal.carbs}g</span> • 
            <span class="data-font">F: ${meal.fats}g</span>
            ${meal.fiber ? `• <span class="data-font">Fi: ${meal.fiber}g</span>` : ""}
          </p>
        </div>
        <button onclick="deleteMealLog('${meal.id}')" class="text-on-surface-variant hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-1 active:scale-90">
          <span class="material-symbols-outlined text-lg">delete</span>
        </button>
      `;
      container.appendChild(row);
    }
  });

  // Update meal category kcal labels
  categories.forEach((cat) => {
    const label = document.getElementById(`kcal-${cat}`);
    if (label) {
      label.innerText = `${kcalTotals[cat]} KCAL`;
    }
  });

  // Update calories circular progress
  const targetKcal = state.profile.targetCal || 2000;
  const remainingKcal = Math.max(0, targetKcal - consumedKcal);
  const kcalPercent = Math.min(1, consumedKcal / targetKcal);

  document.getElementById("diet-consumed-kcal").innerText = consumedKcal;
  document.getElementById("diet-target-kcal").innerText = targetKcal;
  document.getElementById("diet-remaining-kcal").innerText = remainingKcal;

  const circle = document.getElementById("diet-calorie-progress-circle");
  if (circle) {
    const radius = 42;
    const circ = 2 * Math.PI * radius; // 263.89
    const offset = circ - (kcalPercent * circ);
    circle.style.strokeDashoffset = offset;
  }

  // Calculate target macros in grams:
  // Protein: 4 kcal/g, Carbs: 4 kcal/g, Fats: 9 kcal/g
  const targetP = Math.round((targetKcal * (state.profile.macroP / 100)) / 4);
  const targetC = Math.round((targetKcal * (state.profile.macroC / 100)) / 4);
  const targetF = Math.round((targetKcal * (state.profile.macroF / 100)) / 9);
  const targetFi = 38; // Default daily value

  // Render macro targets and rings
  updateMacroRing("protein", protein, targetP);
  updateMacroRing("carbs", carbs, targetC);
  updateMacroRing("fats", fats, targetF);
  updateMacroRing("fiber", fiber, targetFi);

  // Render water section
  renderWaterSection();
}

function updateMacroRing(macro, current, target) {
  const percent = target > 0 ? Math.min(1, current / target) : 0;
  const percentText = Math.round(percent * 100);

  const ring = document.getElementById(`diet-${macro}-ring`);
  const pctLabel = document.getElementById(`diet-${macro}-pct`);
  const gLabel = document.getElementById(`diet-${macro}-g`);

  if (pctLabel) pctLabel.innerText = `${percentText}%`;
  if (gLabel) gLabel.innerText = `${current}g / ${target}g`;

  if (ring) {
    const radius = 16;
    const circ = 2 * Math.PI * radius; // 100.53
    const offset = circ - (percent * circ);
    ring.style.strokeDashoffset = offset;
  }
}

// Render Water Section
function renderWaterSection() {
  const waterGoal = 3.0; // 3 Liters default
  const activeAmount = state.waterLogs[state.activeDate] || 0.0;

  const textLabel = document.getElementById("diet-water-text");
  if (textLabel) {
    textLabel.innerText = `${activeAmount.toFixed(1)} / ${waterGoal.toFixed(1)} L`;
  }

  const barsContainer = document.getElementById("diet-water-bars");
  if (barsContainer) {
    const percent = Math.min(1, activeAmount / waterGoal);
    const barsCount = 5;
    const activeBars = Math.min(barsCount, Math.floor(percent * barsCount));

    barsContainer.innerHTML = "";
    for (let i = 0; i < barsCount; i++) {
      const bar = document.createElement("div");
      if (i < activeBars) {
        bar.className = "w-1.5 h-6 rounded-full bg-primary transition-all duration-300";
      } else {
        bar.className = "w-1.5 h-6 rounded-full bg-surface-container-highest transition-all duration-300";
      }
      barsContainer.appendChild(bar);
    }
  }
}

// Add water handler
async function addWaterLog() {
  if (!state.uid) return;
  const currentAmount = state.waterLogs[state.activeDate] || 0.0;
  const newAmount = parseFloat((currentAmount + 0.25).toFixed(2));

  try {
    const waterDocRef = doc(db, "users", state.uid, "water", state.activeDate);
    await setDoc(waterDocRef, {
      date: state.activeDate,
      amount: newAmount
    });
  } catch (error) {
    console.error("Failed to update water log:", error);
  }
}
window.addWaterLog = addWaterLog;

// Delete logged meal
async function deleteMealLog(docId) {
  if (!state.uid) return;
  try {
    await deleteDoc(doc(db, "users", state.uid, "meals", docId));
  } catch (error) {
    console.error("Failed to delete meal log:", error);
  }
}
window.deleteMealLog = deleteMealLog;

// Open Add Meal Modal
let activeMealTypeForModal = "breakfast";
function openAddMealModal(mealType) {
  activeMealTypeForModal = mealType;
  
  // Update header text based on meal type
  document.getElementById("meal-form-title").innerText = `Log Meal Entry`;
  document.getElementById("meal-form-subtype").innerText = mealType;

  // Clear inputs
  document.getElementById("meal-food-name").value = "";
  document.getElementById("meal-calories").value = "";
  document.getElementById("meal-protein").value = "";
  document.getElementById("meal-carbs").value = "";
  document.getElementById("meal-fats").value = "";
  document.getElementById("meal-fiber").value = "";

  openModal("modal-meal-form");
}
window.openAddMealModal = openAddMealModal;

// Save Meal Form submission
async function saveMealForm(event) {
  event.preventDefault();
  if (!state.uid) return;

  const mealData = {
    name: document.getElementById("meal-food-name").value.trim(),
    calories: Number(document.getElementById("meal-calories").value),
    protein: Number(document.getElementById("meal-protein").value),
    carbs: Number(document.getElementById("meal-carbs").value),
    fats: Number(document.getElementById("meal-fats").value),
    fiber: Number(document.getElementById("meal-fiber").value || 0),
    mealType: activeMealTypeForModal,
    date: state.activeDate,
    timestamp: new Date().toISOString()
  };

  try {
    await addDoc(collection(db, "users", state.uid, "meals"), mealData);
    closeModal();
  } catch (error) {
    console.error("Error logging meal:", error);
  }
}
window.saveMealForm = saveMealForm;

// ==========================================
// RECIPES & CUSTOM FOODS SUBVIEW
// ==========================================
function renderFoodsView() {
  const grid = document.getElementById("foods-grid");
  if (!grid) return;
  grid.innerHTML = "";

  // Combine custom foods and system foods
  const allFoods = [...state.customFoods, ...PRESET_FOODS];

  // Filter based on filter option and search query
  const queryText = state.foodSearchQuery.toLowerCase().trim();
  const filteredFoods = allFoods.filter((food) => {
    // Search matching
    const matchSearch = food.name.toLowerCase().includes(queryText);
    if (!matchSearch) return false;

    // Category matching
    if (state.foodFilter === "custom") {
      return food.isCustom === true;
    } else if (state.foodFilter === "system") {
      return food.isCustom === false;
    }
    return true; // 'all'
  });

  if (filteredFoods.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-body-lg text-on-surface-variant italic">No recipes or custom foods match your filter.</p>
      </div>
    `;
    return;
  }

  filteredFoods.forEach((food) => {
    const card = document.createElement("div");
    card.className = "group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300";

    const ratingHtml = food.rating ? `
      <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
        <span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">star</span>
        <span class="font-data-mono text-[11px] text-on-surface">${food.rating}</span>
      </div>
    ` : "";

    const typeLabel = food.isCustom ? "CUSTOM FOOD" : (food.isMyRecipe ? "MY RECIPE" : "PRESET RECIPE");
    const labelColor = food.isCustom ? "text-emerald-700 dark:text-emerald-300" : (food.isMyRecipe ? "text-primary" : "text-amber-700 dark:text-amber-300");

    card.innerHTML = `
      <div class="relative h-48 overflow-hidden bg-surface-container-low flex items-center justify-center">
        ${food.img ? `
          <img src="${food.img}" alt="${food.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        ` : `
          <span class="material-symbols-outlined text-4xl text-outline-variant">restaurant</span>
        `}
        ${ratingHtml}
        <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-outline-variant">
          <span class="font-label-caps text-[9px] ${labelColor} font-bold">${typeLabel}</span>
        </div>
      </div>
      <div class="p-4 space-y-3">
        <div>
          <span class="font-label-caps text-label-caps text-on-surface-variant mb-1 block">${food.calories} KCAL</span>
          <h3 class="font-headline-sm text-[16px] font-bold text-on-surface line-clamp-1">${food.name}</h3>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div class="bg-surface-container rounded-lg p-2 text-center">
            <span class="font-label-caps text-[9px] block text-on-surface-variant">PROTEIN</span>
            <span class="font-data-mono text-xs font-bold text-on-surface">${food.protein}g</span>
          </div>
          <div class="bg-surface-container rounded-lg p-2 text-center">
            <span class="font-label-caps text-[9px] block text-on-surface-variant">CARBS</span>
            <span class="font-data-mono text-xs font-bold text-on-surface">${food.carbs}g</span>
          </div>
          <div class="bg-surface-container rounded-lg p-2 text-center">
            <span class="font-label-caps text-[9px] block text-on-surface-variant">FAT</span>
            <span class="font-data-mono text-xs font-bold text-on-surface">${food.fats}g</span>
          </div>
        </div>
        <button onclick="openLogSelector('${food.id}', '${food.name.replace(/'/g, "\\'")}')" class="w-full py-2.5 bg-primary text-on-primary rounded-xl font-body-sm font-bold flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 transition-all">
          <span class="material-symbols-outlined text-lg">add_circle</span>
          Log Now
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Food list search listener
document.getElementById("food-search-input")?.addEventListener("input", (e) => {
  state.foodSearchQuery = e.target.value;
  renderFoodsView();
});

function filterFoods(category) {
  state.foodFilter = category;
  
  // Set tab buttons active status
  const tabs = {
    all: "food-tab-all",
    custom: "food-tab-custom",
    system: "food-tab-system"
  };

  Object.entries(tabs).forEach(([key, id]) => {
    const tab = document.getElementById(id);
    if (!tab) return;
    if (key === category) {
      tab.className = "whitespace-nowrap px-5 py-1.5 rounded-full bg-primary text-on-primary font-body-sm shadow-sm transition-all";
    } else {
      tab.className = "whitespace-nowrap px-5 py-1.5 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant font-body-sm hover:bg-surface-container-high transition-all";
    }
  });

  renderFoodsView();
}
window.filterFoods = filterFoods;

// Open Log selector popup
function openLogSelector(foodId, foodName) {
  state.selectedFoodToLog = foodId;
  document.getElementById("log-selector-food-name").innerText = foodName;
  openModal("modal-log-selector");
}
window.openLogSelector = openLogSelector;

// Log Food directly from selector
async function logSelectedFood(mealType) {
  if (!state.uid || !state.selectedFoodToLog) return;
  const foodId = state.selectedFoodToLog;

  // Find food item in custom or presets
  const allFoods = [...state.customFoods, ...PRESET_FOODS];
  const food = allFoods.find((f) => f.id === foodId);

  if (food) {
    const mealData = {
      name: food.name,
      calories: Number(food.calories),
      protein: Number(food.protein),
      carbs: Number(food.carbs),
      fats: Number(food.fats),
      fiber: Number(food.fiber || 0),
      mealType: mealType,
      date: state.activeDate,
      timestamp: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, "users", state.uid, "meals"), mealData);
      closeModal();
    } catch (error) {
      console.error("Failed to log food:", error);
    }
  }
}
window.logSelectedFood = logSelectedFood;

// Create Custom Food Modal trigger
function openCreateFoodModal() {
  document.getElementById("custom-food-name").value = "";
  document.getElementById("custom-food-calories").value = "";
  document.getElementById("custom-food-protein").value = "";
  document.getElementById("custom-food-carbs").value = "";
  document.getElementById("custom-food-fats").value = "";
  document.getElementById("custom-food-img").value = "";
  openModal("modal-create-food");
}
window.openCreateFoodModal = openCreateFoodModal;

// Save Custom Food Form Submission
async function saveCustomFoodForm(event) {
  event.preventDefault();
  if (!state.uid) return;

  const foodData = {
    name: document.getElementById("custom-food-name").value.trim(),
    calories: Number(document.getElementById("custom-food-calories").value),
    protein: Number(document.getElementById("custom-food-protein").value),
    carbs: Number(document.getElementById("custom-food-carbs").value),
    fats: Number(document.getElementById("custom-food-fats").value),
    img: document.getElementById("custom-food-img").value.trim(),
    isCustom: true,
    createdAt: new Date().toISOString()
  };

  try {
    await addDoc(collection(db, "users", state.uid, "custom_foods"), foodData);
    closeModal();
  } catch (error) {
    console.error("Failed to create custom food:", error);
  }
}
window.saveCustomFoodForm = saveCustomFoodForm;

// ==========================================
// TASKS KANBAN BOARD
// ==========================================
function renderTasksView() {
  const todoList = document.getElementById("kanban-todo-list");
  const progressList = document.getElementById("kanban-progress-list");
  const doneList = document.getElementById("kanban-done-list");

  if (!todoList || !progressList || !doneList) return;

  // Clear lists
  todoList.innerHTML = "";
  progressList.innerHTML = "";
  doneList.innerHTML = "";

  let countTodo = 0;
  let countProgress = 0;
  let countDone = 0;

  // Get unique tags for filtering UI
  const allTags = new Set();
  state.tasks.forEach((t) => {
    if (t.tag) allTags.add(t.tag.toUpperCase());
  });
  renderTaskFilters(Array.from(allTags));

  // Filter tasks based on Search query & selected tag
  const queryText = state.taskSearchQuery.toLowerCase().trim();
  const filteredTasks = state.tasks.filter((t) => {
    const titleMatch = t.title.toLowerCase().includes(queryText) || (t.description && t.description.toLowerCase().includes(queryText));
    const tagMatch = !state.taskFilterTag || (t.tag && t.tag.toUpperCase() === state.taskFilterTag);
    return titleMatch && tagMatch;
  });

  filteredTasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = "bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer relative group";
    
    // Clicking card opens edit modal, except when clicking action buttons
    card.onclick = (e) => {
      if (e.target.closest("button")) return;
      openEditTaskModal(task);
    };

    let priorityColor = "bg-outline/10 text-outline";
    if (task.priority === "high") priorityColor = "bg-error/10 text-error";
    if (task.priority === "medium") priorityColor = "bg-primary/10 text-primary";

    card.innerHTML = `
      <div class="flex justify-between items-start gap-2 mb-2">
        <span class="px-2 py-0.5 ${priorityColor} text-[9px] font-bold rounded-full uppercase tracking-wider">${task.priority || "low"}</span>
        <div class="flex items-center gap-1">
          ${task.status !== "todo" ? `<button onclick="updateTaskStatus('${task.id}', '${task.status === "progress" ? "todo" : "progress"}')" class="p-1 hover:bg-surface-container rounded text-on-surface-variant hover:text-primary active:scale-90" title="Move Left"><span class="material-symbols-outlined text-[16px]">arrow_back</span></button>` : ""}
          ${task.status !== "done" ? `<button onclick="updateTaskStatus('${task.id}', '${task.status === "todo" ? "progress" : "done"}')" class="p-1 hover:bg-surface-container rounded text-on-surface-variant hover:text-primary active:scale-90" title="Move Right"><span class="material-symbols-outlined text-[16px]">arrow_forward</span></button>` : ""}
        </div>
      </div>
      <h4 class="font-bold text-body-md text-on-surface mb-1">${task.title}</h4>
      ${task.description ? `<p class="text-xs text-on-surface-variant line-clamp-2 mb-3 leading-relaxed">${task.description}</p>` : ""}
      <div class="flex items-center justify-between pt-2.5 border-t border-outline-variant/30 text-[10px] text-on-surface-variant font-semibold">
        <span class="flex items-center gap-1">${task.tag ? `<span class="px-1.5 py-0.5 bg-surface-container rounded uppercase text-[8px] font-extrabold border border-outline-variant/30">${task.tag}</span>` : ""}</span>
        ${task.dueDate ? `<span class="flex items-center gap-0.5"><span class="material-symbols-outlined text-[12px]">calendar_today</span>${task.dueDate}</span>` : ""}
      </div>
    `;

    // Append to correct list
    if (task.status === "todo") {
      todoList.appendChild(card);
      countTodo++;
    } else if (task.status === "progress") {
      progressList.appendChild(card);
      countProgress++;
    } else {
      doneList.appendChild(card);
      countDone++;
    }
  });

  // Render counters
  document.getElementById("task-count-todo").innerText = countTodo;
  document.getElementById("task-count-progress").innerText = countProgress;
  document.getElementById("task-count-done").innerText = countDone;
}

// Render dynamic tag filters on board
function renderTaskFilters(tags) {
  const container = document.getElementById("task-tag-filters");
  if (!container) return;
  container.innerHTML = "";

  // 'All' Filter option
  const allBtn = document.createElement("button");
  allBtn.onclick = () => {
    state.taskFilterTag = null;
    renderTasksView();
  };
  if (!state.taskFilterTag) {
    allBtn.className = "whitespace-nowrap px-3.5 py-1 rounded-full bg-primary text-on-primary font-body-sm font-bold shadow-sm transition-all";
  } else {
    allBtn.className = "whitespace-nowrap px-3.5 py-1 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant font-body-sm hover:bg-surface-container-high transition-all";
  }
  allBtn.innerText = "All Tasks";
  container.appendChild(allBtn);

  // Individual tag filters
  tags.forEach((tag) => {
    const btn = document.createElement("button");
    btn.onclick = () => {
      state.taskFilterTag = tag;
      renderTasksView();
    };
    if (state.taskFilterTag === tag) {
      btn.className = "whitespace-nowrap px-3.5 py-1 rounded-full bg-primary text-on-primary font-body-sm font-bold shadow-sm transition-all";
    } else {
      btn.className = "whitespace-nowrap px-3.5 py-1 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant font-body-sm hover:bg-surface-container-high transition-all";
    }
    btn.innerText = tag;
    container.appendChild(btn);
  });
}

// Move task helper
async function updateTaskStatus(taskId, nextStatus) {
  if (!state.uid) return;
  try {
    await updateDoc(doc(db, "users", state.uid, "tasks", taskId), {
      status: nextStatus
    });
  } catch (error) {
    console.error("Failed to move task:", error);
  }
}
window.updateTaskStatus = updateTaskStatus;

// Task search input listener
document.getElementById("task-search-input")?.addEventListener("input", (e) => {
  state.taskSearchQuery = e.target.value;
  renderTasksView();
});

// Modal open handlers
function openAddTaskModal() {
  state.editingTaskId = null;
  document.getElementById("task-form-title").innerText = "Create Kanban Task";
  document.getElementById("task-id").value = "";
  document.getElementById("task-title").value = "";
  document.getElementById("task-description").value = "";
  document.getElementById("task-status").value = "todo";
  document.getElementById("task-priority").value = "low";
  document.getElementById("task-tag").value = "";
  document.getElementById("task-due-date").value = getLocalDateString();
  document.getElementById("task-delete-btn").classList.add("hidden");
  openModal("modal-task-form");
}
window.openAddTaskModal = openAddTaskModal;

function openEditTaskModal(task) {
  state.editingTaskId = task.id;
  document.getElementById("task-form-title").innerText = "Edit Kanban Task";
  document.getElementById("task-id").value = task.id;
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-description").value = task.description || "";
  document.getElementById("task-status").value = task.status;
  document.getElementById("task-priority").value = task.priority || "low";
  document.getElementById("task-tag").value = task.tag || "";
  document.getElementById("task-due-date").value = task.dueDate || "";
  document.getElementById("task-delete-btn").classList.remove("hidden");
  openModal("modal-task-form");
}

// Delete Active Task from Edit state
async function deleteActiveTask() {
  if (!state.uid || !state.editingTaskId) return;
  try {
    await deleteDoc(doc(db, "users", state.uid, "tasks", state.editingTaskId));
    closeModal();
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
}
window.deleteActiveTask = deleteActiveTask;

// Form Submit
async function saveTaskForm(event) {
  event.preventDefault();
  if (!state.uid) return;

  const taskData = {
    title: document.getElementById("task-title").value.trim(),
    description: document.getElementById("task-description").value.trim(),
    status: document.getElementById("task-status").value,
    priority: document.getElementById("task-priority").value,
    tag: document.getElementById("task-tag").value.trim().toUpperCase(),
    dueDate: document.getElementById("task-due-date").value
  };

  try {
    if (state.editingTaskId) {
      // Update existing task
      await updateDoc(doc(db, "users", state.uid, "tasks", state.editingTaskId), taskData);
    } else {
      // Add new task
      taskData.createdAt = new Date().toISOString();
      await addDoc(collection(db, "users", state.uid, "tasks"), taskData);
    }
    closeModal();
  } catch (error) {
    console.error("Failed to save task:", error);
  }
}
window.saveTaskForm = saveTaskForm;

// ==========================================
// HABITS TRACKER
// ==========================================
function renderHabitsView() {
  // Global Heatmap Rendering
  renderGlobalHeatmap();

  // Habit cards rendering
  const cardsContainer = document.getElementById("habits-cards-container");
  if (!cardsContainer) return;
  cardsContainer.innerHTML = "";

  if (state.habits.length === 0) {
    cardsContainer.innerHTML = `
      <div class="col-span-full text-center py-12 bg-surface-container-low rounded-xl border border-dashed border-outline-variant">
        <p class="text-body-lg text-on-surface-variant italic">No habits logged. Click Add Habit above to create your first goal!</p>
      </div>
    `;
    return;
  }

  const todayStr = getLocalDateString();

  state.habits.forEach((habit) => {
    const card = document.createElement("div");
    card.className = "bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col gap-4 hover:shadow-md transition-shadow group cursor-pointer";
    
    // Clicking card opens edit modal, except when clicking the switch/buttons
    card.onclick = (e) => {
      if (e.target.closest("button") || e.target.closest(".toggle-switch")) return;
      openEditHabitModal(habit);
    };

    const completions = habit.completions || [];
    const isCompletedToday = completions.includes(todayStr);
    const activeColorClass = getHabitColorClass(habit.icon);

    // Compute Streak
    const streak = calculateHabitStreak(completions);

    // Toggle button structure
    const toggleClass = isCompletedToday ? "bg-primary text-white" : "bg-surface-container";
    const dotTransformClass = isCompletedToday ? "translate-x-4" : "translate-x-0";

    card.innerHTML = `
      <div class="flex justify-between items-start">
        <div class="flex gap-4">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">${habit.icon || "auto_awesome"}</span>
          </div>
          <div>
            <h3 class="font-headline-sm font-bold text-[16px] text-on-surface group-hover:text-primary transition-colors leading-snug">${habit.title}</h3>
            <p class="text-xs text-on-surface-variant mt-0.5 font-medium">${habit.desc || "Daily routine"}</p>
          </div>
        </div>
        <div class="text-right flex flex-col items-end">
          <span class="font-data-mono text-[10px] text-tertiary-container bg-tertiary-fixed px-2 py-0.5 rounded font-extrabold">🔥 ${streak} DAYS</span>
          <div class="mt-2.5">
            <button onclick="toggleHabitLog('${habit.id}')" class="toggle-switch w-10 h-6 rounded-full relative transition-colors duration-200 ${toggleClass}">
              <span class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${dotTransformClass}"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="heatmap-grid pt-2 border-t border-outline-variant/30">
        ${renderMiniHeatmapHtml(completions, activeColorClass)}
      </div>
    `;

    cardsContainer.appendChild(card);
  });
}

function getHabitColorClass(icon) {
  if (icon === "water_drop") return "bg-primary";
  if (icon === "fitness_center") return "bg-secondary";
  if (icon === "book_2") return "bg-tertiary-container";
  return "bg-primary-container"; // default
}

function calculateHabitStreak(completions) {
  if (!completions || completions.length === 0) return 0;
  const sorted = [...completions].sort((a, b) => new Date(b) - new Date(a));
  
  let streak = 0;
  let checkDate = new Date();
  
  // Format checkDate as YYYY-MM-DD
  let checkDateStr = getLocalDateString(checkDate);

  // If not completed today, check if yesterday was completed to preserve streak
  if (!sorted.includes(checkDateStr)) {
    checkDate.setDate(checkDate.getDate() - 1);
    checkDateStr = getLocalDateString(checkDate);
    if (!sorted.includes(checkDateStr)) {
      return 0; // streak is broken
    }
  }

  // Iterate backwards and count consecutive completions
  while (true) {
    if (sorted.includes(checkDateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
      checkDateStr = getLocalDateString(checkDate);
    } else {
      break;
    }
  }
  return streak;
}

// Render last 20 days mini-cells inside Habit Card
function renderMiniHeatmapHtml(completions, activeClass) {
  let html = "";
  const today = new Date();
  for (let i = 19; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dStr = getLocalDateString(d);
    
    if (completions.includes(dStr)) {
      html += `<div class="heatmap-cell ${activeClass}" title="${dStr}: Completed"></div>`;
    } else {
      html += `<div class="heatmap-cell bg-surface-container" title="${dStr}: Not Completed"></div>`;
    }
  }
  return html;
}

// Generate the Annual/Yearly Density Heatmap on Habit section
function renderGlobalHeatmap() {
  const grid = document.getElementById("habits-heatmap-grid");
  if (!grid) return;
  grid.innerHTML = "";

  // Habit completions density math:
  // Render grid with 7 rows (representing Sun to Sat)
  // Let's create columns. Grid columns = 45 weeks
  const rows = 7;
  const cols = 45;
  const totalDays = rows * cols;

  const today = new Date();
  // Set to Sunday of the week containing the first date in our grid
  const startDate = new Date();
  startDate.setDate(today.getDate() - totalDays + 1);

  // Group completions by date across all habits
  const completionsCount = {};
  state.habits.forEach((habit) => {
    (habit.completions || []).forEach((dateStr) => {
      completionsCount[dateStr] = (completionsCount[dateStr] || 0) + 1;
    });
  });

  const totalHabitsCount = state.habits.length;

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const dStr = getLocalDateString(d);

    const cell = document.createElement("div");
    cell.className = "w-3 h-3 rounded-[2px]";
    
    const count = completionsCount[dStr] || 0;
    const completionRate = totalHabitsCount > 0 ? count / totalHabitsCount : 0;

    // Density color mapping
    if (totalHabitsCount === 0 || count === 0) {
      cell.className += " bg-surface-container";
      cell.title = `${dStr}: 0% Completed (0/${totalHabitsCount} habits)`;
    } else if (completionRate <= 0.33) {
      cell.className += " bg-primary/30";
      cell.title = `${dStr}: ${Math.round(completionRate * 100)}% Completed (${count}/${totalHabitsCount} habits)`;
    } else if (completionRate <= 0.66) {
      cell.className += " bg-primary/60";
      cell.title = `${dStr}: ${Math.round(completionRate * 100)}% Completed (${count}/${totalHabitsCount} habits)`;
    } else {
      cell.className += " bg-primary";
      cell.title = `${dStr}: ${Math.round(completionRate * 100)}% Completed (${count}/${totalHabitsCount} habits)`;
    }

    grid.appendChild(cell);
  }
}

// Toggle habit completion log
async function toggleHabitLog(habitId) {
  if (!state.uid) return;
  const todayStr = getLocalDateString();
  const habit = state.habits.find((h) => h.id === habitId);
  if (!habit) return;

  let completions = [...(habit.completions || [])];
  if (completions.includes(todayStr)) {
    // Remove completion
    completions = completions.filter((c) => c !== todayStr);
  } else {
    // Add completion
    completions.push(todayStr);
  }

  try {
    await updateDoc(doc(db, "users", state.uid, "habits", habitId), {
      completions: completions
    });
  } catch (error) {
    console.error("Failed to toggle habit log:", error);
  }
}
window.toggleHabitLog = toggleHabitLog;

// Modals
function openAddHabitModal() {
  state.editingHabitId = null;
  document.getElementById("habit-form-title").innerText = "Add Habit Routine";
  document.getElementById("habit-id").value = "";
  document.getElementById("habit-title").value = "";
  document.getElementById("habit-desc").value = "";
  document.getElementById("habit-icon").value = "auto_awesome";
  document.getElementById("habit-delete-btn").classList.add("hidden");
  openModal("modal-habit-form");
}
window.openAddHabitModal = openAddHabitModal;

function openEditHabitModal(habit) {
  state.editingHabitId = habit.id;
  document.getElementById("habit-form-title").innerText = "Edit Habit Routine";
  document.getElementById("habit-id").value = habit.id;
  document.getElementById("habit-title").value = habit.title;
  document.getElementById("habit-desc").value = habit.desc || "";
  document.getElementById("habit-icon").value = habit.icon || "auto_awesome";
  document.getElementById("habit-delete-btn").classList.remove("hidden");
  openModal("modal-habit-form");
}

// Delete Habit
async function deleteActiveHabit() {
  if (!state.uid || !state.editingHabitId) return;
  try {
    await deleteDoc(doc(db, "users", state.uid, "habits", state.editingHabitId));
    closeModal();
  } catch (error) {
    console.error("Failed to delete habit:", error);
  }
}
window.deleteActiveHabit = deleteActiveHabit;

// Save Habit submit
async function saveHabitForm(event) {
  event.preventDefault();
  if (!state.uid) return;

  const habitData = {
    title: document.getElementById("habit-title").value.trim(),
    desc: document.getElementById("habit-desc").value.trim(),
    icon: document.getElementById("habit-icon").value
  };

  try {
    if (state.editingHabitId) {
      await updateDoc(doc(db, "users", state.uid, "habits", state.editingHabitId), habitData);
    } else {
      habitData.completions = [];
      habitData.createdAt = new Date().toISOString();
      await addDoc(collection(db, "users", state.uid, "habits"), habitData);
    }
    closeModal();
  } catch (error) {
    console.error("Failed to save habit:", error);
  }
}
window.saveHabitForm = saveHabitForm;

// ==========================================
// WALLET & TRANSACTION LEDGER
// ==========================================
function renderWalletView() {
  let netBalance = 0;
  let totalIncome = 0;
  let totalExpense = 0;

  const ledgerList = document.getElementById("wallet-transactions-list");
  if (!ledgerList) return;
  ledgerList.innerHTML = "";

  // Sort transactions by date descending, then by creation timestamp
  const sortedTxs = [...state.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  let foodExpenses = 0;
  let housingExpenses = 0;
  let lifestyleExpenses = 0;
  let otherExpenses = 0;

  sortedTxs.forEach((tx) => {
    const amount = Number(tx.amount || 0);
    const isIncome = tx.type === "income";

    if (isIncome) {
      netBalance += amount;
      totalIncome += amount;
    } else {
      netBalance -= amount;
      totalExpense += amount;

      // Group by category for pie chart metrics
      if (tx.category === "Food") foodExpenses += amount;
      else if (tx.category === "Housing") housingExpenses += amount;
      else if (tx.category === "Lifestyle") lifestyleExpenses += amount;
      else otherExpenses += amount;
    }

    // Render Ledger Entry row
    const row = document.createElement("div");
    row.className = "px-5 py-3.5 hover:bg-surface-container-low flex justify-between items-center transition-colors group";
    
    let flowSign = isIncome ? "+" : "-";
    let colorClass = isIncome ? "text-secondary" : "text-on-surface";
    let catIcon = "payments";
    if (tx.category === "Food") catIcon = "restaurant";
    if (tx.category === "Housing") catIcon = "home";
    if (tx.category === "Lifestyle") catIcon = "sports_esports";

    row.innerHTML = `
      <div class="flex items-center gap-3.5">
        <div class="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/30">
          <span class="material-symbols-outlined text-[18px]">${catIcon}</span>
        </div>
        <div>
          <p class="font-bold text-body-md text-on-surface leading-tight">${tx.payee}</p>
          <div class="flex items-center gap-1.5 mt-0.5">
            <span class="text-[9px] font-extrabold uppercase bg-surface-container px-1 rounded text-outline">${tx.category}</span>
            <span class="text-[10px] text-on-surface-variant font-semibold">${tx.date}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span class="font-data-mono font-extrabold text-body-md ${colorClass}">${flowSign}${formatCurrency(amount)}</span>
        <button onclick="deleteTransaction('${tx.id}')" class="text-on-surface-variant hover:text-error opacity-0 group-hover:opacity-100 transition-opacity active:scale-90 p-1">
          <span class="material-symbols-outlined text-base">delete</span>
        </button>
      </div>
    `;
    ledgerList.appendChild(row);
  });

  if (sortedTxs.length === 0) {
    ledgerList.innerHTML = `<p class="text-body-sm italic text-on-surface-variant text-center py-8">No transaction ledger entries recorded.</p>`;
  }

  // Update card balances
  document.getElementById("wallet-net-balance").innerText = formatCurrency(netBalance);
  document.getElementById("wallet-total-income").innerText = `+${formatCurrency(totalIncome)}`;
  document.getElementById("wallet-total-expense").innerText = `-${formatCurrency(totalExpense)}`;

  // Category summary calculations
  const totalCatExpenses = foodExpenses + housingExpenses + lifestyleExpenses + otherExpenses;
  const foodPct = totalCatExpenses > 0 ? Math.round((foodExpenses / totalCatExpenses) * 100) : 0;
  const housingPct = totalCatExpenses > 0 ? Math.round((housingExpenses / totalCatExpenses) * 100) : 0;
  const lifestylePct = totalCatExpenses > 0 ? Math.round((lifestyleExpenses / totalCatExpenses) * 100) : 0;
  const otherPct = totalCatExpenses > 0 ? Math.round((otherExpenses / totalCatExpenses) * 100) : 0;

  // Render category percentages in wallet sub-legend
  const categoryLedger = document.getElementById("wallet-category-ledger");
  if (categoryLedger) {
    categoryLedger.innerHTML = `
      <div class="flex justify-between items-center text-xs font-semibold">
        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-primary"></span>Food / Groceries</span>
        <span class="data-font text-on-surface-variant">${foodPct}% (${formatCurrency(foodExpenses)})</span>
      </div>
      <div class="flex justify-between items-center text-xs font-semibold mt-1">
        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-secondary"></span>Housing / Rent</span>
        <span class="data-font text-on-surface-variant">${housingPct}% (${formatCurrency(housingExpenses)})</span>
      </div>
      <div class="flex justify-between items-center text-xs font-semibold mt-1">
        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-tertiary-container"></span>Lifestyle</span>
        <span class="data-font text-on-surface-variant">${lifestylePct}% (${formatCurrency(lifestyleExpenses)})</span>
      </div>
      <div class="flex justify-between items-center text-xs font-semibold mt-1">
        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-outline"></span>Other</span>
        <span class="data-font text-on-surface-variant">${otherPct}% (${formatCurrency(otherExpenses)})</span>
      </div>
    `;
  }

  // Update total expense in circular pie chart
  const pieTotal = document.getElementById("wallet-pie-total");
  if (pieTotal) {
    pieTotal.innerText = formatCurrency(totalCatExpenses);
  }
}

// Delete transaction
async function deleteTransaction(txId) {
  if (!state.uid) return;
  try {
    await deleteDoc(doc(db, "users", state.uid, "transactions", txId));
  } catch (error) {
    console.error("Failed to delete transaction:", error);
  }
}
window.deleteTransaction = deleteTransaction;

// Form / Modal Actions
function openAddTransactionModal() {
  document.getElementById("tx-payee").value = "";
  document.getElementById("tx-amount").value = "";
  document.getElementById("tx-type").value = "expense";
  document.getElementById("tx-category").value = "Food";
  document.getElementById("tx-date").value = getLocalDateString();
  openModal("modal-transaction-form");
}
window.openAddTransactionModal = openAddTransactionModal;

async function saveTransactionForm(event) {
  event.preventDefault();
  if (!state.uid) return;

  const txData = {
    payee: document.getElementById("tx-payee").value.trim(),
    amount: Number(document.getElementById("tx-amount").value),
    type: document.getElementById("tx-type").value,
    category: document.getElementById("tx-category").value,
    date: document.getElementById("tx-date").value,
    createdAt: new Date().toISOString()
  };

  try {
    await addDoc(collection(db, "users", state.uid, "transactions"), txData);
    closeModal();
  } catch (error) {
    console.error("Failed to log transaction:", error);
  }
}
window.saveTransactionForm = saveTransactionForm;

// ==========================================
// PROFILE GOALS VIEW
// ==========================================
function renderProfileView() {
  const prof = state.profile;
  const bmi = calculateBMI(prof.weight, prof.height);

  // Text values
  document.getElementById("profile-height").innerText = prof.height;
  document.getElementById("profile-weight").innerText = prof.weight;
  document.getElementById("profile-bmi").innerText = `BMI: ${bmi.value} (${bmi.category})`;

  const profileUserName = document.getElementById("profile-user-name");
  if (profileUserName) {
    profileUserName.innerText = prof.ownerName || "Alex Rivers";
  }

  const userDisplayName = document.getElementById("user-display-name");
  if (userDisplayName) {
    userDisplayName.innerText = prof.ownerName || (auth.currentUser?.email ? auth.currentUser.email.split("@")[0] : "Guest User");
  }

  const userMembership = document.getElementById("profile-user-membership");
  if (userMembership) {
    const isPremium = !auth.currentUser?.isAnonymous;
    userMembership.innerText = isPremium ? "Premium Account Sync Active" : "Guest Mode • Local Storage Cache";
  }

  // Target Goal Summary card
  const goalTitle = document.getElementById("profile-goal-title");
  if (goalTitle) goalTitle.innerText = prof.goalTitle || "Health mantenimiento";
  const targetWeight = document.getElementById("profile-target-weight");
  if (targetWeight) targetWeight.innerText = prof.targetWeight || prof.weight;
  const goalDesc = document.getElementById("profile-goal-desc");
  if (goalDesc) goalDesc.innerText = prof.goalDesc || "General health";
  const dietStrategy = document.getElementById("profile-diet-strategy");
  if (dietStrategy) dietStrategy.innerText = prof.dietStrategy || "Balanced Plan";

  // Calorie & macros cards
  const targetCal = document.getElementById("profile-target-cal");
  if (targetCal) targetCal.innerText = prof.targetCal || 2000;

  // Macros split percentages
  document.getElementById("profile-pct-p-text").innerText = `${prof.macroP}%`;
  document.getElementById("profile-bar-p").style.width = `${prof.macroP}%`;

  document.getElementById("profile-pct-c-text").innerText = `${prof.macroC}%`;
  document.getElementById("profile-bar-c").style.width = `${prof.macroC}%`;

  document.getElementById("profile-pct-f-text").innerText = `${prof.macroF}%`;
  document.getElementById("profile-bar-f").style.width = `${prof.macroF}%`;
}

function calculateBMI(weight, height) {
  if (!weight || !height) return { value: "0.0", category: "Uncalculated" };
  const hMeters = height / 100;
  const val = parseFloat((weight / (hMeters * hMeters)).toFixed(1));
  
  let cat = "Normal Weight";
  if (val < 18.5) cat = "Underweight";
  else if (val >= 25 && val < 29.9) cat = "Overweight";
  else if (val >= 30) cat = "Obese";

  return { value: val, category: cat };
}

// Modal Form controls
function openEditProfileModal() {
  const prof = state.profile;

  document.getElementById("p-owner-name").value = prof.ownerName || "Alex Rivers";
  document.getElementById("p-height").value = prof.height || 175;
  document.getElementById("p-weight").value = prof.weight || 70;
  document.getElementById("p-goal-title").value = prof.goalTitle || "";
  document.getElementById("p-target-weight").value = prof.targetWeight || 70;
  document.getElementById("p-goal-desc").value = prof.goalDesc || "";
  document.getElementById("p-diet-strategy").value = prof.dietStrategy || "";
  document.getElementById("p-target-cal").value = prof.targetCal || 2000;
  document.getElementById("p-macro-p").value = prof.macroP || 30;
  document.getElementById("p-macro-c").value = prof.macroC || 40;
  document.getElementById("p-macro-f").value = prof.macroF || 30;

  updateMacroPercentageLabel();
  openModal("modal-profile-form");
}
window.openEditProfileModal = openEditProfileModal;

// Live sum check for macro inputs
function updateMacroPercentageLabel() {
  const p = Number(document.getElementById("p-macro-p").value || 0);
  const c = Number(document.getElementById("p-macro-c").value || 0);
  const f = Number(document.getElementById("p-macro-f").value || 0);
  const total = p + c + f;
  
  const label = document.getElementById("p-macro-total");
  if (label) {
    label.innerText = `Total: ${total}%`;
    if (total === 100) {
      label.className = "block text-[10px] mt-1.5 font-bold text-emerald-600";
    } else {
      label.className = "block text-[10px] mt-1.5 font-bold text-error";
    }
  }
}
document.getElementById("p-macro-p")?.addEventListener("input", updateMacroPercentageLabel);
document.getElementById("p-macro-c")?.addEventListener("input", updateMacroPercentageLabel);
document.getElementById("p-macro-f")?.addEventListener("input", updateMacroPercentageLabel);

async function saveProfileForm(event) {
  event.preventDefault();
  if (!state.uid) return;

  const p = Number(document.getElementById("p-macro-p").value);
  const c = Number(document.getElementById("p-macro-c").value);
  const f = Number(document.getElementById("p-macro-f").value);

  if (p + c + f !== 100) {
    alert("Macro targets percentage must total exactly 100%. Current sum: " + (p + c + f) + "%");
    return;
  }

  const profileData = {
    ownerName: document.getElementById("p-owner-name").value.trim(),
    height: Number(document.getElementById("p-height").value),
    weight: Number(document.getElementById("p-weight").value),
    goalTitle: document.getElementById("p-goal-title").value.trim(),
    targetWeight: Number(document.getElementById("p-target-weight").value),
    goalDesc: document.getElementById("p-goal-desc").value.trim(),
    dietStrategy: document.getElementById("p-diet-strategy").value.trim(),
    targetCal: Number(document.getElementById("p-target-cal").value),
    macroP: p,
    macroC: c,
    macroF: f
  };

  try {
    await setDoc(doc(db, "users", state.uid, "profile", "config"), profileData);
    closeModal();
  } catch (error) {
    console.error("Failed to update profile config:", error);
  }
}
window.saveProfileForm = saveProfileForm;

// ==========================================
// HOME VIEW DASHBOARD
// ==========================================
function renderHomeView() {
  const todayStr = getLocalDateString();
  const greetingName = state.profile.ownerName || (auth.currentUser?.email ? auth.currentUser.email.split("@")[0] : "Guest");
  
  const dObj = new Date();
  const dateFormatted = dObj.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  
  // Greeting headers
  const homeGreeting = document.getElementById("home-greeting");
  if (homeGreeting) homeGreeting.innerText = `Hello ${greetingName}`;
  const homeDate = document.getElementById("home-today-date");
  if (homeDate) homeDate.innerText = dateFormatted;

  // Calories Progress Summary
  const consumedKcal = state.meals
    .filter((m) => m.date === todayStr)
    .reduce((sum, m) => sum + Number(m.calories || 0), 0);

  const targetKcal = state.profile.targetCal || 2000;
  const calPercent = Math.min(1, consumedKcal / targetKcal);

  document.getElementById("home-consumed-calories").innerText = consumedKcal;
  document.getElementById("home-target-calories").innerText = targetKcal;
  document.getElementById("home-calories-bar").style.width = `${calPercent * 100}%`;

  // Weekly Spending Calculate
  // Sum expenses logged in past 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const weeklyExpenses = state.transactions
    .filter((t) => t.type === "expense" && new Date(t.date) >= oneWeekAgo)
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  document.getElementById("home-weekly-spending").innerText = formatCurrency(weeklyExpenses);

  // Priority Tasks
  const priorityList = document.getElementById("home-priority-tasks-list");
  if (priorityList) {
    priorityList.innerHTML = "";
    const pendingHighPriority = state.tasks.filter((t) => t.priority === "high" && t.status !== "done");

    document.getElementById("home-pending-tasks-count").innerText = pendingHighPriority.length;

    if (pendingHighPriority.length === 0) {
      priorityList.innerHTML = `<p class="text-body-sm italic text-on-surface-variant">No pending high priority tasks today.</p>`;
    } else {
      pendingHighPriority.slice(0, 3).forEach((task) => {
        const item = document.createElement("div");
        item.className = "flex justify-between items-center py-1.5 border-b border-outline-variant/30 last:border-0";
        item.innerHTML = `
          <span class="text-body-sm font-semibold text-on-surface line-clamp-1">${task.title}</span>
          <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-error/10 text-error uppercase">${task.status === "todo" ? "To Do" : "In Progress"}</span>
        `;
        priorityList.appendChild(item);
      });
    }
  }

  // Home Habits Tracker Checklist
  const habitsContainer = document.getElementById("home-habits-container");
  if (habitsContainer) {
    habitsContainer.innerHTML = "";
    
    const completedCount = state.habits.filter((h) => (h.completions || []).includes(todayStr)).length;
    document.getElementById("home-habits-progress").innerText = `${completedCount}/${state.habits.length} Completed`;

    if (state.habits.length === 0) {
      habitsContainer.innerHTML = `
        <div class="col-span-full text-center py-6">
          <p class="text-body-sm text-on-surface-variant italic">No habits configured. Create habits in the Habits tab!</p>
        </div>
      `;
    } else {
      state.habits.forEach((habit) => {
        const completions = habit.completions || [];
        const isCompleted = completions.includes(todayStr);
        const card = document.createElement("div");
        card.className = "bg-surface-container-lowest border border-outline-variant p-3.5 rounded-xl flex justify-between items-center hover:bg-surface-container/50 transition-all cursor-pointer";
        
        card.onclick = () => toggleHabitLog(habit.id);

        card.innerHTML = `
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary">${habit.icon || "auto_awesome"}</span>
            <span class="text-body-sm font-bold text-on-surface">${habit.title}</span>
          </div>
          <span class="material-symbols-outlined text-2xl transition-colors ${isCompleted ? "text-emerald-500" : "text-outline-variant"}">
            ${isCompleted ? "check_box" : "check_box_outline_blank"}
          </span>
        `;
        habitsContainer.appendChild(card);
      });
    }
  }
}

// ==========================================
// EMAIL AUTHENTICATION ACTIONS
// ==========================================
async function handleLogin() {
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value.trim();
  if (!email || !password) return alert("Please fill out both email and password.");

  try {
    // If user is currently anonymous, sign in under credentials
    if (auth.currentUser?.isAnonymous) {
      // Link anonymous account to email/password
      const credential = EmailAuthProvider.credential(email, password);
      try {
        await linkWithCredential(auth.currentUser, credential);
        alert("Account linked successfully!");
      } catch (err) {
        if (err.code === "auth/email-already-in-use" || err.code === "auth/credential-already-in-use") {
          // If already registered, sign in directly (data will merge on Firestore depending on rules/ids, typically user switches to pre-existing UID)
          await signInWithEmailAndPassword(auth, email, password);
          alert("Signed in successfully!");
        } else {
          throw err;
        }
      }
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully!");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Authentication failed: " + error.message);
  }
}
window.handleLogin = handleLogin;

async function handleSignUp() {
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value.trim();
  if (!email || !password) return alert("Please fill out both email and password.");

  try {
    if (auth.currentUser?.isAnonymous) {
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(auth.currentUser, credential);
      alert("Anonymous account successfully converted to permanent email account!");
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account registered successfully!");
    }
  } catch (error) {
    console.error("Registration failed:", error);
    if (error.code === "auth/email-already-in-use" || error.code === "auth/credential-already-in-use") {
      const confirmSignIn = confirm("This email is already registered. Would you like to Sign In instead?");
      if (confirmSignIn) {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          alert("Signed in successfully!");
        } catch (loginErr) {
          alert("Authentication failed: " + loginErr.message);
        }
        return;
      }
    }
    alert("Registration failed: " + error.message);
  }
}
window.handleSignUp = handleSignUp;

async function handleSignOut() {
  try {
    await signOut(auth);
    alert("Signed out successfully!");
  } catch (error) {
    console.error("Sign out failed:", error);
  }
}
window.handleSignOut = handleSignOut;

async function handleOverlayLogin() {
  const email = document.getElementById("overlay-email").value.trim();
  const password = document.getElementById("overlay-password").value.trim();
  if (!email || !password) return alert("Please fill out both email and password.");

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login failed:", error);
    alert("Authentication failed: " + error.message);
  }
}
window.handleOverlayLogin = handleOverlayLogin;

async function handleOverlaySignUp() {
  const email = document.getElementById("overlay-email").value.trim();
  const password = document.getElementById("overlay-password").value.trim();
  if (!email || !password) return alert("Please fill out both email and password.");

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account registered successfully!");
  } catch (error) {
    console.error("Registration failed:", error);
    if (error.code === "auth/email-already-in-use" || error.code === "auth/credential-already-in-use") {
      const confirmSignIn = confirm("This email is already registered. Would you like to Sign In instead?");
      if (confirmSignIn) {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (loginErr) {
          alert("Authentication failed: " + loginErr.message);
        }
        return;
      }
    }
    alert("Registration failed: " + error.message);
  }
}
window.handleOverlaySignUp = handleOverlaySignUp;

async function handleOverlayGuest() {
  const guestBtn = document.getElementById("overlay-guest-btn");
  if (guestBtn) guestBtn.innerText = "Connecting...";
  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.error("Anonymous authentication failed:", error);
    alert("Guest Mode (Anonymous Sign-In) is currently disabled. Please Register or Sign In with an Email/Password account.");
    if (guestBtn) guestBtn.innerText = "Continue as Guest";
  }
}
window.handleOverlayGuest = handleOverlayGuest;

// ==========================================
// MODAL CONTROLLER
// ==========================================
function openModal(modalId) {
  const portal = document.getElementById("modal-portal");
  const modalContent = document.getElementById("modal-content");
  if (!portal || !modalContent) return;

  // Hide all inner forms first
  document.getElementById("modal-meal-form").classList.add("hidden");
  document.getElementById("modal-create-food").classList.add("hidden");
  document.getElementById("modal-log-selector").classList.add("hidden");
  document.getElementById("modal-task-form").classList.add("hidden");
  document.getElementById("modal-habit-form").classList.add("hidden");
  document.getElementById("modal-transaction-form").classList.add("hidden");
  document.getElementById("modal-profile-form").classList.add("hidden");

  // Show selected form
  document.getElementById(modalId).classList.remove("hidden");

  // Open with transition animations
  portal.classList.remove("hidden");
  portal.offsetHeight; // trigger reflow
  portal.classList.remove("opacity-0");
  modalContent.classList.remove("scale-90");
  modalContent.classList.add("scale-100");
}

function closeModal() {
  const portal = document.getElementById("modal-portal");
  const modalContent = document.getElementById("modal-content");
  if (!portal || !modalContent) return;

  portal.classList.add("opacity-0");
  modalContent.classList.remove("scale-100");
  modalContent.classList.add("scale-90");

  setTimeout(() => {
    portal.classList.add("hidden");
  }, 300);
}
window.closePortal = closeModal;

// Modal portal backdrop close click handler
document.getElementById("modal-portal")?.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
});

// ==========================================
// PROGRESSIVE WEB APP (PWA) INSTALL CONTROLLER
// ==========================================
let deferredPrompt = null;
const installBanner = document.getElementById("pwa-install-banner");

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent default Chrome 67- behavior
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Show the install banner UI
  if (installBanner) {
    installBanner.classList.remove("hidden");
  }
});

function hidePwaInstallBanner() {
  if (installBanner) {
    installBanner.classList.add("hidden");
  }
}
window.hidePwaInstallBanner = hidePwaInstallBanner;

function triggerPwaInstall() {
  if (!deferredPrompt) return;
  // Hide the PWA banner
  hidePwaInstallBanner();
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    deferredPrompt = null;
  });
}
window.triggerPwaInstall = triggerPwaInstall;

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => {
        console.log("Service Worker registered successfully with scope:", reg.scope);
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  });
}

// Initial state updates
renderDietTimeline();
renderFoodsView();
