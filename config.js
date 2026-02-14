// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    valentineName: "Kannama",
    pageTitle: "Will You Be My Kattachi? 💝",

    // Stage 1 — Intro sequence (animated like valentine-day-special)
    intro: {
        greeting: "Hey Beauty cutiee",
        greetingEmoji: "💕",
        // These appear one by one, hold, then fade before the next one
        lines: [
            { text: "I was thinking to write you a valentine letter...", style: "normal" },
            { text: "And then I stopped.", style: "normal" },
            { text: "I realized, I want to do something special.", style: "emphasis", emphasisWord: "special" },
            { text: "Because,", style: "normal" },
            { text: "You are Special ✨", style: "big" }
        ],
        bigReveal: "SO"
    },

    // Stage 2 — First question
    firstQuestion: {
        image: "./photos/panda_shy.png",
        title: "Miee!",
        subtitle: "I want to ask you something?",
        question: "Can I?",
        yesBtn: "YES",
        noBtn: "NO"
    },

    // Stage 3 — Valentine question
    valentineQuestion: {
        image: "./photos/panda_happy.png",
        title: "Will you be my Kannama forever?",
        heart: "💕",
        options: [
            { label: "A", text: "Yes" },
            { label: "B", text: "A" },
            { label: "C", text: "B" },
            { label: "D", text: "C" }
        ],
        hint: ""
    },

    // Stage 4 — Love meter
    loveMeter: {
        title: "How much do you love me?",
        startText: "This much!",
        messages: {
            low: "Just getting started... 🥺",
            normal: "Aww! 🥰",
            high: "And way more than 10%! 🥰",
            veryHigh: "To infinity and beyond! 🚀💝",
            extreme: "WOOOOW You love me that much?? 🥰🚀💝"
        },
        nextBtn: "Next ❤️"
    },

    // Stage 5 — Celebration
    celebration: {
        title: "This is for you 😍 😄",
        languages: [
            { lang: "ENGLISH", text: "I Love You" },
            { lang: "URDU", text: "میں تم سے پیار کرتا ہوں" },
            { lang: "HINDI", text: "मैं तुमसे प्यार करता हूँ" },
            { lang: "FRENCH", text: "Je T'aime" },
            { lang: "SPANISH", text: "Te Amo" },
            { lang: "GERMAN", text: "Ich Liebe Dich" },
            { lang: "ITALIAN", text: "Ti Amo" },
            { lang: "JAPANESE", text: "愛してる" },
            { lang: "KOREAN", text: "사랑해" },
            { lang: "ARABIC", text: "أحبك" },
            { lang: "PORTUGUESE", text: "Eu Te Amo" },
            { lang: "TURKISH", text: "Seni Seviyorum" }
        ],
        withLove: "With Love! 💕",
        letterBtn: "A Letter For You 💌"
    },

    // Stage 6 — Love letter (EDIT YOUR PERSONAL MESSAGE HERE!)
    loveLetter: {
        title: "My Dearest Kannama💕",
        paragraphs: [
            "From the moment you walked into my life, everything became more beautiful like u katachi. Your smile lights up my dark days, and your love makes me feel like the luckiest person in the world.",
            "Even when you’re not physically with me, just knowing you’re there — believing in me, loving me — gives me strength, motivation, and hope. On my lowest days and in my quietest struggles, the thought of you keeps me going.",
            "Every moment with you is a treasure to my heart. You are my best friend, my safe place, my soulmate, and my forever love cutiee.",
            "On this Valentine’s Day, and every day after, I promise to cherish you, stand by you, and love you with all my heart , We become better together."
        ],
        closing: "Forever Yours Mutta ❤️"
    },

    // Music settings
    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "./music/song.mp3",
        startText: "🎵",
        stopText: "🔇",
        volume: 0.5
    }
};

window.VALENTINE_CONFIG = CONFIG;
