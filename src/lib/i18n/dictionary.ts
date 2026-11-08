export type Locale = "en" | "ar";

export const defaultLocale: Locale = "en";

export const locales: Locale[] = ["en", "ar"];

export const dirByLocale: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

export const labels: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

type Dictionary = Record<string, string>;

export const dictionary: Record<Locale, Dictionary> = {
  en: {
    home: "Home",
    collections: "Collections",
    showroom: "360° Showroom",
    projects: "Projects",
    gallery: "Gallery",
    about: "About",
    contact: "Contact",
    bookVisit: "Book a Visit",
    signIn: "Sign In",
    signOut: "Sign Out",
    admin: "Admin",
    account: "Account",
    cart: "Cart",
    wishlist: "Wishlist",
    search: "Search",
    menu: "Menu",
    close: "Close",
    luxuryShowroom: "Luxury Interior Showroom",
    explore: "Explore",
    exploreCollections: "Explore Collections",
    bookShowroom: "Book Showroom Visit",
    viewIn360: "View in 360°",
    shop: "Shop",
    readMore: "Read More",
    learnMore: "Learn More",
    submit: "Submit",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    loading: "Loading",
    noResults: "No results found",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyright: "All rights reserved",
    footerTagline:
      "Curated luxury interiors, complete room concepts, and an immersive digital showroom. Designed for those who live beautifully.",

    // Home
    heroTagline: "Immersive Luxury Interiors",
    heroTitle1: "Live in a",
    heroTitle2: "work of art.",
    heroDescription:
      "Explore complete room concepts in 360°, curate every finish, and book a private showroom visit with our design team.",
    scroll: "Scroll",
    lamsaPhilosophy: "The Lamsa Philosophy",
    introTitle1: "Every room is a",
    introTitle2: "complete story.",
    introBody:
      "We do not sell individual pieces. We compose environments where proportion, material, light and texture exist in quiet dialogue. Each collection is a turnkey vision — from architectural furniture to the last accent — designed to be experienced before it is installed.",
    ourAtelier: "Our atelier",
    curatedCollections: "Curated Collections",
    roomConcepts: "Room concepts",
    viewAllCollections: "View All Collections",
    threeSixtyExperience: "360° Experience",
    showroomHeroTitle:
      "Walk through your future room before a single piece arrives.",
    showroomHeroDescription:
      "Explore every collection in real-time 3D. Change finishes, wall colors and lighting. Click furniture to shop the piece.",
    launch360Showroom: "Launch 360° Showroom",
    signaturePieces: "Signature Pieces",
    shopIndividualWorks: "Shop individual works",
    browseCollections: "Browse Collections",
    clientVoices: "Client Voices",
    testimonialsHeading: "Designed for discerning lives",
    privateAppointments: "Private Appointments",
    showroomVisitTitle:
      "Visit our showroom and let the room speak for itself.",
    showroomVisitDescription:
      "Schedule a one-on-one consultation with our design team to experience materials, configure finishes, and plan your space.",

    // Collections
    roomCollections: "Room Collections",
    completeEnvironments: "Complete environments",
    collectionsIntro:
      "Each collection is a fully resolved room concept — furniture, materials, lighting and atmosphere designed as one coherent vision.",
    storyLabel: "The Story",
    designerNotes: "Designer Notes",
    colorPalette: "Color Palette",
    materials: "Materials",
    dimensions: "Dimensions",
    estimatedCollectionPrice: "Estimated Collection Price",
    includesAll: "Includes all furniture, materials, and finishes shown.",
    exploreIn360: "Explore in 360°",
    bookConsultation: "Book Consultation",
    furnitureIncluded: "Furniture Included",
    shopTheRoom: "Shop the room",
    experience360Showroom: "Experience 360° Showroom",

    // Projects
    portfolio: "Portfolio",
    curatedSpaces: "Curated spaces",
    projectsIntro:
      "A selection of private residences and luxury hospitality projects where Lamsa collections were composed into complete living experiences.",

    // About
    aboutLamsa: "About Lamsa",
    aboutTitle1: "The art of",
    aboutTitle2: "living well.",
    aboutBody1:
      "Founded on the belief that a room should feel like a private sanctuary, Lamsa brings together Italian craftsmanship, architectural rigor, and a deep respect for materials. Every collection is conceived as a complete environment — not a catalog of objects.",
    aboutBody2:
      "Our ateliers in Milan and our digital showroom work in harmony to let clients walk through their future home before a single piece is made.",
    yearsOfCraft: "Years of Craft",
    atelierArtisans: "Atelier Artisans",
    countriesServed: "Countries Served",
    roomConceptsLabel: "Room Concepts",
    materialsFirst: "Materials first.",
    designFollows: "Design follows.",
    materialsBody:
      "From Statuario marble to vegetable-tanned leather, we select every surface for how it ages, how it feels, and how it catches light. Sustainability is not a feature — it is the natural result of choosing things made to last generations.",

    // Contact
    contactTitle1: "Let's create",
    contactTitle2: "something lasting.",
    contactIntro:
      "Whether you are planning a full residence, a single room, or a private showroom visit, our design team is here to guide every decision.",
    lamsaAtelier: "Lamsa Atelier",
    phone: "Phone",
    email: "Email",
    showroomHours: "Showroom Hours",
    name: "Name",
    subject: "Subject",
    message: "Message",
    sendMessage: "Send Message",
    messageSent: "Your message has been sent. Our team will reply shortly.",
    messageFailed: "Failed to send message.",
    messageError: "Something went wrong. Please try again.",

    // Gallery
    galleryTitle: "A world of refined detail",

    // Booking
    bookingTitle: "Book your experience",
    bookingDescription:
      "Choose a showroom visit to experience our collections, or a design consultation to plan your space.",
    showroomVisit: "Showroom Visit",
    designConsultation: "Design Consultation",
    fullName: "Full Name",
    preferredDate: "Preferred Date",
    preferredTime: "Preferred Time",
    notes: "Notes",
    notesPlaceholder:
      "Tell us about your project, preferred collection, or any accessibility needs...",
    confirmBookingRequest: "Confirm Booking Request",
    bookingSuccessShowroom:
      "Your showroom visit request has been received. We will confirm shortly.",
    bookingSuccessConsultation:
      "Your consultation request has been received. We will confirm shortly.",
    bookingFailed: "Failed to submit booking.",
    bookingError: "Something went wrong. Please try again.",

    // Cart / Checkout
    shoppingCart: "Shopping Cart",
    cartEmpty: "Your cart is empty.",
    continueShopping: "Continue Shopping",
    remove: "Remove",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    taxes: "Taxes",
    calculatedAtCheckout: "Calculated at checkout",
    estimatedTotal: "Estimated Total",
    proceedToCheckout: "Proceed to Checkout",
    checkout: "Checkout",
    stepCart: "Cart",
    stepShippingPayment: "Shipping & Payment",
    stepConfirmation: "Confirmation",
    orderItems: "Order Items",
    qty: "Qty: {qty}",
    continueToPayment: "Continue to Payment",
    firstName: "First Name",
    lastName: "Last Name",
    address: "Address",
    city: "City",
    postalCode: "Postal Code",
    payment: "Payment",
    cardNumber: "Card Number",
    expiry: "Expiry",
    cvc: "CVC",
    payAndPlaceOrder: "Pay & Place Order",
    processing: "Processing...",
    thankYouForOrder: "Thank you for your order",
    orderConfirmationBody:
      "Your confirmation has been sent to your email. Our concierge team will contact you within 24 hours.",
    total: "Total",
    complimentary: "Complimentary",
    included: "Included",
    unableToStartCheckout: "Unable to start checkout",
    checkoutFailed: "Checkout failed",

    // Login
    welcomeBack: "Welcome back",
    loginSubtitle: "Sign in to access your account and saved designs.",
    demoAccounts:
      "Demo accounts: admin@lamsa.com / admin123 or user@lamsa.com / user123",
    password: "Password",
    signingIn: "Signing in...",
    invalidCredentials: "Invalid email or password",

    // Product detail
    finish: "Finish",
    color: "Color",
    addToCart: "Add to Cart",
    whiteGloveDelivery: "White-glove delivery",
    tenYearWarranty: "10-year warranty",
    specifications: "Specifications",
    relatedPieces: "Related Pieces",
    addedToCart: "Added {name} to cart",

    // Testimonials
    previous: "Previous testimonial",
    next: "Next testimonial",
    goToTestimonial: "Go to testimonial {n}",

    // Misc
    notFound: "Not found",
  },
  ar: {
    home: "الرئيسية",
    collections: "المجموعات",
    showroom: "العرض ثلاثي الأبعاد",
    projects: "المشاريع",
    gallery: "المعرض",
    about: "من نحن",
    contact: "تواصل معنا",
    bookVisit: "حجز زيارة",
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    admin: "الإدارة",
    account: "حسابي",
    cart: "سلة التسوق",
    wishlist: "المفضلة",
    search: "بحث",
    menu: "القائمة",
    close: "إغلاق",
    luxuryShowroom: "صالون الديكور الفاخر",
    explore: "استكشاف",
    exploreCollections: "استكشاف المجموعات",
    bookShowroom: "حجز زيارة الصالون",
    viewIn360: "المشاهدة بزاوية 360°",
    shop: "تسوق",
    readMore: "اقرأ المزيد",
    learnMore: "اكتشف المزيد",
    submit: "إرسال",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    add: "إضافة",
    loading: "جاري التحميل",
    noResults: "لا توجد نتائج",
    privacy: "سياسة الخصوصية",
    terms: "شروط الاستخدام",
    copyright: "جميع الحقوق محفوظة",
    footerTagline:
      "ديكورات فاخرة مختارة، ومفاهيم غرف كاملة، وصالون رقمي غامر. مصمم لأولئك الذين يعيشون بجمال.",

    // Home
    heroTagline: "تجارب داخلية فاخرة غامرة",
    heroTitle1: "عش في",
    heroTitle2: "تحفة فنية.",
    heroDescription:
      "استكشف مفاهيم الغرف الكاملة بزاوية 360°، واختر كل تشطيب، واحجز زيارة صالون خاصة مع فريق التصميم لدينا.",
    scroll: "تمرير",
    lamsaPhilosophy: "فلسفة لامسا",
    introTitle1: "كل غرفة هي",
    introTitle2: "قصة كاملة.",
    introBody:
      "لا نبيع قطعاً فردية. نؤلف بيئات يتعايش فيها النسب والمواد والضوء والملمس في حوار هادئ. كل مجموعة هي رؤية جاهزة — من الأثاث المعماري إلى أدق التفاصيل — صُممت لتُختبر قبل تركيبها.",
    ourAtelier: "أتيليهنا",
    curatedCollections: "مجموعات مختارة",
    roomConcepts: "مفاهيم الغرف",
    viewAllCollections: "عرض كل المجموعات",
    threeSixtyExperience: "تجربة 360°",
    showroomHeroTitle: "تجول في غرفتك المستقبلية قبل وصول أول قطعة.",
    showroomHeroDescription:
      "استكشف كل مجموعة بتقنية 3D الفورية. غيّر التشطيبات وألوان الجدران والإضاءة. اضغط على الأثاث للتسوق من القطعة.",
    launch360Showroom: "تشغيل صالون 360°",
    signaturePieces: "قطع مميزة",
    shopIndividualWorks: "تسوق قطع فردية",
    browseCollections: "تصفح المجموعات",
    clientVoices: "آراء العملاء",
    testimonialsHeading: "صُممت لحياة الرقيّ",
    privateAppointments: "مواعيد خاصة",
    showroomVisitTitle: "زُر صالوننا واترك الغرفة تتحدث عن نفسها.",
    showroomVisitDescription:
      "حدّد موعد استشارة فردية مع فريق التصميم لدينا لتجربة المواد وتهيئة التشطيبات وتخطيط مساحتك.",

    // Collections
    roomCollections: "مجموعات الغرف",
    completeEnvironments: "بيئات متكاملة",
    collectionsIntro:
      "كل مجموعة هي مفهوم غرف متكامل — أثاث ومواد وإضاءة وأجواء صُممت كرؤية متناسقة واحدة.",
    storyLabel: "القصة",
    designerNotes: "ملاحظات المصمم",
    colorPalette: "لوحة الألوان",
    materials: "المواد",
    dimensions: "الأبعاد",
    estimatedCollectionPrice: "السعر التقريبي للمجموعة",
    includesAll: "يشمل جميع الأثاث والمواد والتشطيبات المعروضة.",
    exploreIn360: "استكشاف بزاوية 360°",
    bookConsultation: "حجز استشارة",
    furnitureIncluded: "الأثاث المضمن",
    shopTheRoom: "تسوق الغرفة",
    experience360Showroom: "جرب صالون 360°",

    // Projects
    portfolio: "المحفظة",
    curatedSpaces: "مساحات مختارة",
    projectsIntro:
      "مجموعة من المنازل الخاصة ومشاريع الضيافة الفاخرة حيث تم تأليف مجموعات لامسا في تجارب معيشية متكاملة.",

    // About
    aboutLamsa: "عن لامسا",
    aboutTitle1: "فن",
    aboutTitle2: "العيش بجمال.",
    aboutBody1:
      "انطلاقاً من الإيمان بأن الغرفة يجب أن تشعرك كملاذ خاص، تجمع لامسا بين الحرفية الإيطالية والدقة المعمارية واحترام عميق للمواد. تُصمم كل مجموعة كبيئة كاملة — لا ككتالوج من الأشياء.",
    aboutBody2:
      "يعمل أتيليهاتنا في ميلانو وصالوننا الرقمي بتناغم ليتمكن عملاؤنا من التجوال في منزلهم المستقبلي قبل صنع أول قطعة.",
    yearsOfCraft: "سنوات من الحرفية",
    atelierArtisans: "حرفيو الأتيليه",
    countriesServed: "الدول المخدّمة",
    roomConceptsLabel: "مفاهيم الغرف",
    materialsFirst: "المواد أولاً.",
    designFollows: "التصميم يتبع.",
    materialsBody:
      "من رخام ستاتواريو إلى الجلد المُدبّر نباتياً، نختار كل سطحٍ وفقاً لعمره وملمسه وكيفية انعكاس الضوء عليه. الاستدامة ليست ميزة — بل نتيجة طبيعية لاختيار أشياء صُنعت لتدوم أجيالاً.",

    // Contact
    contactTitle1: "لنصنع",
    contactTitle2: "شيئاً يدوم.",
    contactIntro:
      "سواء كنت تخطط لمنزل كامل أو غرفة واحدة أو زيارة صالون خاصة، فريق التصميم لدينا موجود لإرشادك في كل قرار.",
    lamsaAtelier: "أتيليه لامسا",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    showroomHours: "ساعات العرض",
    name: "الاسم",
    subject: "الموضوع",
    message: "الرسالة",
    sendMessage: "إرسال الرسالة",
    messageSent: "تم إرسال رسالتك. سيرد فريقنا عليك قريباً.",
    messageFailed: "فشل إرسال الرسالة.",
    messageError: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",

    // Gallery
    galleryTitle: "عالم من التفاصيل الراقية",

    // Booking
    bookingTitle: "احجز تجربتك",
    bookingDescription:
      "اختر زيارة الصالون لتجربة مجموعاتنا، أو استشارة تصميم لتخطيط مساحتك.",
    showroomVisit: "زيارة الصالون",
    designConsultation: "استشارة تصميم",
    fullName: "الاسم الكامل",
    preferredDate: "التاريخ المفضل",
    preferredTime: "الوقت المفضل",
    notes: "ملاحظات",
    notesPlaceholder:
      "اخبرنا عن مشروعك، أو المجموعة المفضلة، أو أي احتياجات خاصة...",
    confirmBookingRequest: "تأكيد طلب الحجز",
    bookingSuccessShowroom:
      "تم استلام طلب زيارة الصالون. سنؤكد لك قريباً.",
    bookingSuccessConsultation:
      "تم استلام طلب الاستشارة. سنؤكد لك قريباً.",
    bookingFailed: "فشل إرسال طلب الحجز.",
    bookingError: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",

    // Cart / Checkout
    shoppingCart: "عربة التسوق",
    cartEmpty: "عربة التسوق فارغة.",
    continueShopping: "مواصلة التسوق",
    remove: "إزالة",
    orderSummary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    taxes: "الضرائب",
    calculatedAtCheckout: "تحسب عند الدفع",
    estimatedTotal: "المجموع التقريبي",
    proceedToCheckout: "المتابعة إلى الدفع",
    checkout: "الدفع",
    stepCart: "العربة",
    stepShippingPayment: "الشحن والدفع",
    stepConfirmation: "التأكيد",
    orderItems: "عناصر الطلب",
    qty: "الكمية: {qty}",
    continueToPayment: "المتابعة إلى الدفع",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    address: "العنوان",
    city: "المدينة",
    postalCode: "الرمز البريدي",
    payment: "الدفع",
    cardNumber: "رقم البطاقة",
    expiry: "تاريخ الانتهاء",
    cvc: "رمز الأمان",
    payAndPlaceOrder: "ادفع وأرسل الطلب",
    processing: "جاري المعالجة...",
    thankYouForOrder: "شكراً لطلبك",
    orderConfirmationBody:
      "تم إرسال تأكيد الطلب إلى بريدك الإلكتروني. سيتواصل معك فريق الاستقبال خلال 24 ساعة.",
    total: "الإجمالي",
    complimentary: "مجاني",
    included: "متضمن",
    unableToStartCheckout: "تعذّر بدء الدفع",
    checkoutFailed: "فشل الدفع",

    // Login
    welcomeBack: "مرحباً بعودتك",
    loginSubtitle: "سجّل الدخول للوصول إلى حسابك وتصاميمك المحفوظة.",
    demoAccounts:
      "حسابات تجريبية: admin@lamsa.com / admin123 أو user@lamsa.com / user123",
    password: "كلمة المرور",
    signingIn: "جاري تسجيل الدخول...",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",

    // Product detail
    finish: "التشطيب",
    color: "اللون",
    addToCart: "أضف إلى العربة",
    whiteGloveDelivery: "تواصل مميز",
    tenYearWarranty: "ضمان 10 سنوات",
    specifications: "المواصفات",
    relatedPieces: "قطع ذات صلة",
    addedToCart: "تمت إضافة {name} إلى العربة",

    // Testimonials
    previous: "الشهادة السابقة",
    next: "الشهادة التالية",
    goToTestimonial: "الانتقال إلى الشهادة {n}",

    // Misc
    notFound: "غير موجود",
  },
};

export function t(locale: Locale, key: string): string {
  return dictionary[locale]?.[key] ?? key;
}
