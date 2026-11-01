export interface EnglishSongSubtitleCue {
  id: string;
  startSec: number;
  endSec: number;
  en: string;
  vi: string;
}

export interface EnglishSongVocabCard {
  id: string;
  english: string;
  vietnamese: string;
  phonetic: string;
  emoji: string;
  imageUrl: string;
  startSec: number;
  endSec: number;
}

export interface EnglishSongQuizOption {
  id: string;
  english: string;
  vietnamese: string;
  emoji: string;
  imageUrl: string;
}

export interface EnglishSongQuizRound {
  id: string;
  questionEn: string;
  questionVi: string;
  correctOptionId: string;
  hintVi: string;
  options: EnglishSongQuizOption[];
}

export interface EnglishSongLessonPlan {
  filenameKey: string;
  orderLabel: string;
  displayTitle: string;
  vietnameseTitle: string;
  categoryBadge: string;
  topicTag: string;
  icon: string;
  clipType: "song" | "story";
  subtitles: EnglishSongSubtitleCue[];
  vocabCards: EnglishSongVocabCard[];
  quizRounds: EnglishSongQuizRound[];
}

export const ENGLISH_SONG_LESSONS: EnglishSongLessonPlan[] = [
  // =========================================================================
  // 01 - Bài hát Monsters Vui Nhộn.mp4 ("I See Your Monsters" - Fox & Bunny)
  // =========================================================================
  {
    filenameKey: "01 - Bài hát Monsters Vui Nhộn.mp4",
    orderLabel: "01",
    displayTitle: "I See Your Monsters",
    vietnameseTitle: "Tình Bạn Dũng Cảm (Cáo & Thỏ)",
    categoryBadge: "🎵 Bài hát · Tình bạn",
    topicTag: "Cảm xúc & Động viên",
    icon: "🦊",
    clipType: "song",
    subtitles: [
      {
        id: "m1-s1",
        startSec: 0,
        endSec: 2.8,
        en: "I see your monsters",
        vi: "Mình thấy những con quái vật của bạn",
      },
      {
        id: "m1-s2",
        startSec: 2.8,
        endSec: 5.5,
        en: "I see your pain",
        vi: "Mình thấy nỗi buồn của bạn",
      },
      {
        id: "m1-s3",
        startSec: 5.5,
        endSec: 7.8,
        en: "Tell me your problems",
        vi: "Hãy kể cho mình nghe nỗi lo của bạn",
      },
      {
        id: "m1-s4",
        startSec: 7.8,
        endSec: 10.6,
        en: "I'll chase them away",
        vi: "Mình sẽ đuổi chúng đi thật xa",
      },
      {
        id: "m1-s5",
        startSec: 10.6,
        endSec: 13.5,
        en: "I'll be your lighthouse",
        vi: "Mình sẽ là ngọn hải đăng soi sáng cho bạn",
      },
      {
        id: "m1-s6",
        startSec: 13.5,
        endSec: 15.8,
        en: "I'll make it okay",
        vi: "Mình sẽ làm mọi thứ ổn thôi",
      },
      {
        id: "m1-s7",
        startSec: 15.8,
        endSec: 18.8,
        en: "When I see your monsters",
        vi: "Khi mình nhìn thấy quái vật của bạn",
      },
      {
        id: "m1-s8",
        startSec: 18.8,
        endSec: 25,
        en: "I'll stand there so brave and chase them all away",
        vi: "Mình sẽ đứng đó thật dũng cảm và đuổi hết đi",
      },
    ],
    vocabCards: [
      {
        id: "m1-v1",
        english: "Monsters",
        vietnamese: "Quái vật bóng đêm",
        phonetic: "/ˈmɑːn.stərz/",
        emoji: "👾",
        imageUrl: "/assets/english/items/animal_05_cat.webp",
        startSec: 0,
        endSec: 2.8,
      },
      {
        id: "m1-v2",
        english: "Tell me",
        vietnamese: "Kể cho mình nghe",
        phonetic: "/tel miː/",
        emoji: "💬",
        imageUrl: "/assets/pochacco/state-listen-duo.webp",
        startSec: 5.5,
        endSec: 7.8,
      },
      {
        id: "m1-v3",
        english: "Chase away",
        vietnamese: "Đuổi đi thật xa",
        phonetic: "/tʃeɪs əˈweɪ/",
        emoji: "🏃",
        imageUrl: "/assets/english/items/act_04_run.webp",
        startSec: 7.8,
        endSec: 10.6,
      },
      {
        id: "m1-v4",
        english: "Lighthouse",
        vietnamese: "Ngọn hải đăng chiếu sáng",
        phonetic: "/ˈlaɪt.haʊs/",
        emoji: "🏮",
        imageUrl: "/assets/items/home/home_01.webp",
        startSec: 10.6,
        endSec: 13.5,
      },
      {
        id: "m1-v5",
        english: "Make it okay",
        vietnamese: "Làm mọi thứ ổn thỏa",
        phonetic: "/meɪk ɪt oʊˈkeɪ/",
        emoji: "🤝",
        imageUrl: "/assets/nam-stickers/nam-hug-pochacco.webp",
        startSec: 13.5,
        endSec: 15.8,
      },
      {
        id: "m1-v6",
        english: "So brave",
        vietnamese: "Thật dũng cảm",
        phonetic: "/soʊ breɪv/",
        emoji: "🦁",
        imageUrl: "/assets/pochacco/action-strong-fists.webp",
        startSec: 18.8,
        endSec: 24.5,
      },
    ],
    quizRounds: [
      {
        id: "m1-q1",
        questionEn: "I'll be your lighthouse!",
        questionVi:
          "Trong bài hát, bạn Cáo đứng trên đỉnh tháp cầm đèn làm 'ngọn hải đăng' soi sáng. Đâu là 'Lighthouse'?",
        correctOptionId: "opt-lighthouse",
        hintVi: "Nấm tìm hình chiếc đèn chiếu sáng ấm áp nhé!",
        options: [
          {
            id: "opt-lighthouse",
            english: "Lighthouse",
            vietnamese: "Ngọn hải đăng chiếu sáng",
            emoji: "🏮",
            imageUrl: "/assets/items/home/home_01.webp",
          },
          {
            id: "opt-car",
            english: "Red Car",
            vietnamese: "Ô tô đỏ",
            emoji: "🚗",
            imageUrl: "/assets/items/vehicles/vehicle_01.webp",
          },
          {
            id: "opt-apple",
            english: "Red Apple",
            vietnamese: "Quả táo đỏ",
            emoji: "🍎",
            imageUrl: "/assets/items/fruits/fruit_02.webp",
          },
        ],
      },
      {
        id: "m1-q2",
        questionEn: "I'll stand there so brave!",
        questionVi:
          "Bạn Cáo nắm tay bạn Thỏ thật dũng cảm để đuổi bóng đen đi. Từ nào có nghĩa là 'Thật dũng cảm'?",
        correctOptionId: "opt-brave",
        hintVi: "Nấm chạm vào hình nắm tay mạnh mẽ 'So brave' nhé!",
        options: [
          {
            id: "opt-brave",
            english: "So brave",
            vietnamese: "Thật dũng cảm",
            emoji: "💪",
            imageUrl: "/assets/pochacco/action-strong-fists.webp",
          },
          {
            id: "opt-sleep",
            english: "Sleeping",
            vietnamese: "Đang ngủ say",
            emoji: "😴",
            imageUrl: "/assets/pochacco/sticker-sleep.webp",
          },
          {
            id: "opt-broom",
            english: "Broom",
            vietnamese: "Cây chổi quét nhà",
            emoji: "🧹",
            imageUrl: "/assets/items/home/home_14.webp",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 02 - Bài hát I Love You Mommy.mp4 (Bunny singing & giving flowers to Mommy)
  // =========================================================================
  {
    filenameKey: "02 - Bài hát I Love You Mommy.mp4",
    orderLabel: "02",
    displayTitle: "I Love You Mommy",
    vietnameseTitle: "Con Yêu Mẹ Ngọt Ngào",
    categoryBadge: "🎵 Bài hát · Gia đình",
    topicTag: "Tình cảm yêu thương",
    icon: "🐰",
    clipType: "song",
    subtitles: [
      {
        id: "m2-s1",
        startSec: 0,
        endSec: 3.6,
        en: "I love you mommy",
        vi: "Con yêu mẹ, mẹ ơi",
      },
      {
        id: "m2-s2",
        startSec: 3.6,
        endSec: 6.8,
        en: "My sweet, sweet mommy",
        vi: "Mẹ yêu ngọt ngào của con",
      },
      {
        id: "m2-s3",
        startSec: 6.8,
        endSec: 10.8,
        en: "You make me happy",
        vi: "Mẹ làm con vui",
      },
      {
        id: "m2-s4",
        startSec: 10.8,
        endSec: 14.5,
        en: "When I am sad",
        vi: "Mỗi khi con buồn",
      },
      {
        id: "m2-s5",
        startSec: 14.5,
        endSec: 18.6,
        en: "I always have you",
        vi: "Con luôn có mẹ",
      },
      {
        id: "m2-s6",
        startSec: 18.6,
        endSec: 22.5,
        en: "Inside my heart",
        vi: "Ở trong trái tim con",
      },
      {
        id: "m2-s7",
        startSec: 22.5,
        endSec: 26.5,
        en: "When I am here with you",
        vi: "Khi con ở đây bên mẹ",
      },
      {
        id: "m2-s8",
        startSec: 26.5,
        endSec: 29.5,
        en: "I feel happy",
        vi: "Con cảm thấy thật hạnh phúc",
      },
    ],
    vocabCards: [
      {
        id: "m2-v1",
        english: "I love you Mommy",
        vietnamese: "Con yêu mẹ",
        phonetic: "/aɪ lʌv juː ˈmɑː.mi/",
        emoji: "💝",
        imageUrl: "/assets/nam-stickers/nam-hug-kitty.webp",
        startSec: 0,
        endSec: 3.6,
      },
      {
        id: "m2-v2",
        english: "Sweet Mommy",
        vietnamese: "Mẹ ngọt ngào",
        phonetic: "/swiːt ˈmɑː.mi/",
        emoji: "🍪",
        imageUrl: "/assets/math/pastries16/pastry16_12.webp",
        startSec: 3.6,
        endSec: 6.8,
      },
      {
        id: "m2-v3",
        english: "Happy",
        vietnamese: "Vui vẻ, hạnh phúc",
        phonetic: "/ˈhæp.i/",
        emoji: "😊",
        imageUrl: "/assets/pochacco/action-big-smile.webp",
        startSec: 6.8,
        endSec: 10.8,
      },
      {
        id: "m2-v4",
        english: "When I am sad",
        vietnamese: "Mỗi khi con buồn",
        phonetic: "/wen aɪ æm sæd/",
        emoji: "🥺",
        imageUrl: "/assets/pochacco/action-tilt-head.webp",
        startSec: 10.8,
        endSec: 14.5,
      },
      {
        id: "m2-v5",
        english: "Inside my heart",
        vietnamese: "Trong trái tim con",
        phonetic: "/ɪnˈsaɪd maɪ hɑːrt/",
        emoji: "❤️",
        imageUrl: "/assets/nam-stickers/nam-hug-purin.webp",
        startSec: 18.6,
        endSec: 22.5,
      },
      {
        id: "m2-v6",
        english: "Flowers for Mom",
        vietnamese: "Bó hoa tặng mẹ",
        phonetic: "/ˈflaʊ.ərz/",
        emoji: "💐",
        imageUrl: "/assets/nam-stickers/nam-study-water.webp",
        startSec: 26.5,
        endSec: 29.5,
      },
    ],
    quizRounds: [
      {
        id: "m2-q1",
        questionEn: "You make me happy!",
        questionVi:
          "Khi ở bên mẹ, bạn Thỏ cảm thấy 'Happy'. Hình nào thể hiện khuôn mặt vui vẻ 'Happy'?",
        correctOptionId: "opt-happy",
        hintVi: "Nấm chọn nụ cười tươi rói 'Happy' nhé!",
        options: [
          {
            id: "opt-happy",
            english: "Happy",
            vietnamese: "Vui vẻ, hạnh phúc",
            emoji: "😄",
            imageUrl: "/assets/pochacco/action-big-smile.webp",
          },
          {
            id: "opt-sad",
            english: "Sad",
            vietnamese: "Buồn bã",
            emoji: "🥺",
            imageUrl: "/assets/pochacco/action-tilt-head.webp",
          },
          {
            id: "opt-sleepy",
            english: "Sleepy",
            vietnamese: "Buồn ngủ",
            emoji: "😴",
            imageUrl: "/assets/pochacco/sticker-sleep.webp",
          },
        ],
      },
      {
        id: "m2-q2",
        questionEn: "I always have you inside my heart!",
        questionVi:
          "Con luôn có mẹ ở đâu nhỉ? ('Inside my heart' nghĩa là gì?)",
        correctOptionId: "opt-heart",
        hintVi: "'Heart' là trái tim yêu thương đó Nấm ơi!",
        options: [
          {
            id: "opt-heart",
            english: "Inside my heart",
            vietnamese: "Trong trái tim con",
            emoji: "💖",
            imageUrl: "/assets/math/pastries16/pastry16_12.webp",
          },
          {
            id: "opt-bag",
            english: "School Bag",
            vietnamese: "Trong cặp sách",
            emoji: "🎒",
            imageUrl: "/assets/items/school/school_01.webp",
          },
          {
            id: "opt-fridge",
            english: "In the fridge",
            vietnamese: "Trong tủ lạnh",
            emoji: "🧊",
            imageUrl: "/assets/items/home/home_12.webp",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 03 - Bài hát Đếm Ngón Tay Xinh.mp4 ("Ten Little Fingers")
  // =========================================================================
  {
    filenameKey: "03 - Bài hát Đếm Ngón Tay Xinh.mp4",
    orderLabel: "03",
    displayTitle: "Ten Little Fingers",
    vietnameseTitle: "Đếm 10 Ngón Tay Xinh (1–10)",
    categoryBadge: "🎵 Bài hát · Số đếm",
    topicTag: "Đếm từ 1 đến 10",
    icon: "🖐️",
    clipType: "song",
    subtitles: [
      {
        id: "m3-s1",
        startSec: 0,
        endSec: 2.6,
        en: "Ten little fingers",
        vi: "Mười ngón tay xinh",
      },
      {
        id: "m3-s2",
        startSec: 2.6,
        endSec: 4.8,
        en: "One little, two little",
        vi: "Một ngón xinh, hai ngón xinh",
      },
      {
        id: "m3-s3",
        startSec: 4.8,
        endSec: 6.8,
        en: "Three little fingers",
        vi: "Ba ngón tay xinh",
      },
      {
        id: "m3-s4",
        startSec: 6.8,
        endSec: 8.8,
        en: "Four little, five little",
        vi: "Bốn ngón xinh, năm ngón xinh",
      },
      {
        id: "m3-s5",
        startSec: 8.8,
        endSec: 10.8,
        en: "Six little fingers",
        vi: "Sáu ngón tay xinh",
      },
      {
        id: "m3-s6",
        startSec: 10.8,
        endSec: 13.8,
        en: "Seven little, eight little, nine little fingers",
        vi: "Bảy ngón, tám ngón, chín ngón tay xinh",
      },
      {
        id: "m3-s7",
        startSec: 13.8,
        endSec: 18,
        en: "I have ten little fingers!",
        vi: "Mình có mười ngón tay xinh!",
      },
    ],
    vocabCards: [
      {
        id: "m3-v1",
        english: "One, two, three",
        vietnamese: "Một, hai, ba (1, 2, 3)",
        phonetic: "/wʌn, tuː, θriː/",
        emoji: "3️⃣",
        imageUrl: "/assets/pochacco/action-clap-two.webp",
        startSec: 2.6,
        endSec: 6.8,
      },
      {
        id: "m3-v2",
        english: "Four, five, six",
        vietnamese: "Bốn, năm, sáu (4, 5, 6)",
        phonetic: "/fɔːr, faɪv, sɪks/",
        emoji: "6️⃣",
        imageUrl: "/assets/nam-stickers/nam-stage-star.webp",
        startSec: 6.8,
        endSec: 10.8,
      },
      {
        id: "m3-v3",
        english: "Seven, eight, nine",
        vietnamese: "Bảy, tám, chín (7, 8, 9)",
        phonetic: "/ˈsev.ən, eɪt, naɪn/",
        emoji: "9️⃣",
        imageUrl: "/assets/items/school/school_13.webp",
        startSec: 10.8,
        endSec: 13.8,
      },
      {
        id: "m3-v4",
        english: "Ten little fingers",
        vietnamese: "Mười ngón tay xinh (10)",
        phonetic: "/ten ˈlɪt.əl ˈfɪŋ.ɡərz/",
        emoji: "👐",
        imageUrl: "/assets/english/items/act_12_wash_hands.webp",
        startSec: 13.8,
        endSec: 18,
      },
    ],
    quizRounds: [
      {
        id: "m3-q1",
        questionEn: "I have ten little fingers!",
        questionVi:
          "Hai bàn tay của Nấm có tất cả bao nhiêu ngón tay xinh nhỉ?",
        correctOptionId: "opt-ten",
        hintVi: "'Ten little fingers' là 10 ngón tay xinh đó Nấm!",
        options: [
          {
            id: "opt-ten",
            english: "Ten fingers (10)",
            vietnamese: "Mười ngón tay xinh",
            emoji: "👐",
            imageUrl: "/assets/english/items/act_12_wash_hands.webp",
          },
          {
            id: "opt-two",
            english: "Two fingers (2)",
            vietnamese: "Hai ngón tay",
            emoji: "✌️",
            imageUrl: "/assets/pochacco/action-clap-two.webp",
          },
          {
            id: "opt-shoes",
            english: "Two shoes",
            vietnamese: "Đôi giày nhỏ",
            emoji: "👟",
            imageUrl: "/assets/english/items/toy_02_shoes.webp",
          },
        ],
      },
      {
        id: "m3-q2",
        questionEn: "One little, two little, three little fingers!",
        questionVi: "Sau 'One little, two little' là mấy ngón tay nhỉ?",
        correctOptionId: "opt-three",
        hintVi: "One (1), Two (2) rồi đến Three (3) nhé!",
        options: [
          {
            id: "opt-three",
            english: "Three little fingers (3)",
            vietnamese: "Ba ngón tay xinh",
            emoji: "3️⃣",
            imageUrl: "/assets/nam-stickers/nam-stage-star.webp",
          },
          {
            id: "opt-eight",
            english: "Eight fingers (8)",
            vietnamese: "Tám ngón tay",
            emoji: "8️⃣",
            imageUrl: "/assets/items/school/school_13.webp",
          },
          {
            id: "opt-apple",
            english: "One Apple",
            vietnamese: "Một quả táo",
            emoji: "🍎",
            imageUrl: "/assets/items/fruits/fruit_02.webp",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 04 - Bài hát Tiếng Anh Vui Nhộn (Tập 1).mp4 ("What Can You Do?" - 6 Action Verbs)
  // =========================================================================
  {
    filenameKey: "04 - Bài hát Tiếng Anh Vui Nhộn (Tập 1).mp4",
    orderLabel: "04",
    displayTitle: "What Can You Do?",
    vietnameseTitle: "Bạn Làm Được Gì? (6 Động Từ)",
    categoryBadge: "🎵 Bài hát · Động từ",
    topicTag: "Mẫu câu I can...",
    icon: "🏃",
    clipType: "song",
    subtitles: [
      {
        id: "m4-s1",
        startSec: 0,
        endSec: 2.6,
        en: "I can jump, jump, jump!",
        vi: "Nhà Thỏ hát: Tôi có thể nhảy cao!",
      },
      {
        id: "m4-s2",
        startSec: 2.6,
        endSec: 4.8,
        en: "I can walk, walk, walk!",
        vi: "Nhà Vịt hát: Tôi có thể đi bộ!",
      },
      {
        id: "m4-s3",
        startSec: 4.8,
        endSec: 6.8,
        en: "I can swim, swim, swim!",
        vi: "Thiên Nga hát: Tôi có thể bơi lội!",
      },
      {
        id: "m4-s4",
        startSec: 6.8,
        endSec: 8.8,
        en: "I can run, run, run!",
        vi: "Capybara hát: Tôi có thể chạy nhanh!",
      },
      {
        id: "m4-s5",
        startSec: 8.8,
        endSec: 11.5,
        en: "I can sing, sing, sing!",
        vi: "Đàn Chim hát: Tôi có thể ca hát!",
      },
      {
        id: "m4-s6",
        startSec: 11.5,
        endSec: 13.8,
        en: "I can fly, fly, fly!",
        vi: "Bươm Bướm hát: Tôi có thể bay lượn!",
      },
      {
        id: "m4-s7",
        startSec: 13.8,
        endSec: 18.5,
        en: "What can you do?",
        vi: "Còn bạn có thể làm gì?",
      },
    ],
    vocabCards: [
      {
        id: "m4-v1",
        english: "I can jump",
        vietnamese: "Tôi có thể nhảy (Thỏ)",
        phonetic: "/aɪ kæn dʒʌmp/",
        emoji: "🐰",
        imageUrl: "/assets/english/items/act_02_jump.webp",
        startSec: 0,
        endSec: 2.6,
      },
      {
        id: "m4-v2",
        english: "I can walk",
        vietnamese: "Tôi có thể đi bộ (Vịt)",
        phonetic: "/aɪ kæn wɔːk/",
        emoji: "🦆",
        imageUrl: "/assets/english/items/animal_08_duck.webp",
        startSec: 2.6,
        endSec: 4.8,
      },
      {
        id: "m4-v3",
        english: "I can swim",
        vietnamese: "Tôi có thể bơi (Thiên nga)",
        phonetic: "/aɪ kæn swɪm/",
        emoji: "🦢",
        imageUrl: "/assets/english/items/act_08_swim.webp",
        startSec: 4.8,
        endSec: 6.8,
      },
      {
        id: "m4-v4",
        english: "I can run",
        vietnamese: "Tôi có thể chạy (Chuột lang)",
        phonetic: "/aɪ kæn rʌn/",
        emoji: "🐹",
        imageUrl: "/assets/english/items/act_04_run.webp",
        startSec: 6.8,
        endSec: 8.8,
      },
      {
        id: "m4-v5",
        english: "I can sing",
        vietnamese: "Tôi có thể hát (Chim nhỏ)",
        phonetic: "/aɪ kæn sɪŋ/",
        emoji: "🐦",
        imageUrl: "/assets/english/items/act_09_sing.webp",
        startSec: 8.8,
        endSec: 11.5,
      },
      {
        id: "m4-v6",
        english: "I can fly",
        vietnamese: "Tôi có thể bay (Bươm bướm)",
        phonetic: "/aɪ kæn flaɪ/",
        emoji: "🦋",
        imageUrl: "/assets/pochacco/action-hands-up.webp",
        startSec: 11.5,
        endSec: 13.8,
      },
    ],
    quizRounds: [
      {
        id: "m4-q1",
        questionEn: "I can jump, jump, jump!",
        questionVi:
          "Đầu video, gia đình bạn Thỏ cùng làm hành động gì? ('I can jump, jump, jump!')",
        correctOptionId: "opt-jump",
        hintVi: "'Jump' là bật nhảy lên cao đó Nấm!",
        options: [
          {
            id: "opt-jump",
            english: "I can jump",
            vietnamese: "Tôi có thể nhảy cao",
            emoji: "🐰",
            imageUrl: "/assets/english/items/act_02_jump.webp",
          },
          {
            id: "opt-swim",
            english: "I can swim",
            vietnamese: "Tôi có thể bơi lội",
            emoji: "🏊",
            imageUrl: "/assets/english/items/act_08_swim.webp",
          },
          {
            id: "opt-sleep",
            english: "I can sleep",
            vietnamese: "Tôi đang ngủ",
            emoji: "😴",
            imageUrl: "/assets/english/items/act_03_sleep.webp",
          },
        ],
      },
      {
        id: "m4-q2",
        questionEn: "I can swim, swim, swim!",
        questionVi:
          "Khi đàn Thiên Nga lướt trên mặt hồ, câu hát vang lên là 'I can swim!'. Hình nào là 'Swim'?",
        correctOptionId: "opt-swim2",
        hintVi: "'Swim' là bơi dưới nước mát nhé!",
        options: [
          {
            id: "opt-swim2",
            english: "I can swim",
            vietnamese: "Bơi dưới nước",
            emoji: "🦢",
            imageUrl: "/assets/english/items/act_08_swim.webp",
          },
          {
            id: "opt-run",
            english: "I can run",
            vietnamese: "Chạy thật nhanh",
            emoji: "🏃",
            imageUrl: "/assets/english/items/act_04_run.webp",
          },
          {
            id: "opt-sing",
            english: "I can sing",
            vietnamese: "Cầm mic ca hát",
            emoji: "🎤",
            imageUrl: "/assets/english/items/act_09_sing.webp",
          },
        ],
      },
      {
        id: "m4-q3",
        questionEn: "I can sing, sing, sing!",
        questionVi:
          "Đàn chim đậu trên cành cây cùng cất tiếng hót. Đâu là thẻ 'I can sing'?",
        correctOptionId: "opt-sing3",
        hintVi: "'Sing' là ca hát vui vẻ nhé Nấm!",
        options: [
          {
            id: "opt-sing3",
            english: "I can sing",
            vietnamese: "Tôi có thể ca hát",
            emoji: "🎵",
            imageUrl: "/assets/english/items/act_09_sing.webp",
          },
          {
            id: "opt-walk",
            english: "I can walk",
            vietnamese: "Đi bộ lạch bạch",
            emoji: "🦆",
            imageUrl: "/assets/english/items/animal_08_duck.webp",
          },
          {
            id: "opt-sit",
            english: "Sit down",
            vietnamese: "Ngồi xuống ghế",
            emoji: "🪑",
            imageUrl: "/assets/english/items/act_05_sit.webp",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 05 - Bài hát Lemon Tree (Cây Chanh).mp4
  // =========================================================================
  {
    filenameKey: "05 - Bài hát Lemon Tree (Cây Chanh).mp4",
    orderLabel: "05",
    displayTitle: "Yellow Lemon Tree",
    vietnameseTitle: "Cây Chanh Vàng & Bầu Trời Xanh",
    categoryBadge: "🎵 Bài hát · Màu sắc",
    topicTag: "Màu sắc & Quan sát",
    icon: "🍋",
    clipType: "song",
    subtitles: [
      {
        id: "m5-s1",
        startSec: 0,
        endSec: 3.6,
        en: "I wonder how, I wonder why",
        vi: "Mình tự hỏi làm thế nào và vì sao",
      },
      {
        id: "m5-s2",
        startSec: 3.6,
        endSec: 6.8,
        en: "Yesterday you told me about the blue, blue sky",
        vi: "Hôm qua bạn kể mình nghe về bầu trời xanh tươi đẹp",
      },
      {
        id: "m5-s3",
        startSec: 6.8,
        endSec: 14.5,
        en: "And all that I can see is just a yellow lemon tree",
        vi: "Và tất cả những gì mình thấy chỉ là cây chanh màu vàng",
      },
      {
        id: "m5-s4",
        startSec: 14.5,
        endSec: 19.5,
        en: "I'm turning my head up and down",
        vi: "Mình nghiêng đầu nhìn lên rồi nhìn xuống",
      },
      {
        id: "m5-s5",
        startSec: 19.5,
        endSec: 22.8,
        en: "I'm turning, turning, turning around",
        vi: "Mình cứ xoay qua xoay lại mãi",
      },
      {
        id: "m5-s6",
        startSec: 22.8,
        endSec: 31,
        en: "And all that I can see is just another lemon tree",
        vi: "Và tất cả những gì mình thấy chỉ là một cây chanh khác mà thôi",
      },
    ],
    vocabCards: [
      {
        id: "m5-v1",
        english: "Blue sky",
        vietnamese: "Bầu trời màu xanh dương",
        phonetic: "/bluː skaɪ/",
        emoji: "🌤️",
        imageUrl: "/assets/english/items/color_16_ball_blue.webp",
        startSec: 3.6,
        endSec: 6.8,
      },
      {
        id: "m5-v2",
        english: "Yellow lemon",
        vietnamese: "Quả chanh màu vàng",
        phonetic: "/ˈjel.oʊ ˈlem.ən/",
        emoji: "🍋",
        imageUrl: "/assets/items/fruits/fruit_09.webp",
        startSec: 6.8,
        endSec: 14.5,
      },
      {
        id: "m5-v3",
        english: "I can see",
        vietnamese: "Mình có thể nhìn thấy",
        phonetic: "/aɪ kæn siː/",
        emoji: "👀",
        imageUrl: "/assets/nam-stickers/nam-study-read.webp",
        startSec: 7.0,
        endSec: 11.0,
      },
      {
        id: "m5-v4",
        english: "Up and down",
        vietnamese: "Nhìn lên và nhìn xuống",
        phonetic: "/ʌp ænd daʊn/",
        emoji: "↕️",
        imageUrl: "/assets/pochacco/action-tilt-head.webp",
        startSec: 14.5,
        endSec: 19.5,
      },
      {
        id: "m5-v5",
        english: "Turn around",
        vietnamese: "Xoay vòng quanh",
        phonetic: "/tɝːn əˈraʊnd/",
        emoji: "🔄",
        imageUrl: "/assets/english/items/act_07_dance.webp",
        startSec: 19.5,
        endSec: 22.8,
      },
    ],
    quizRounds: [
      {
        id: "m5-q1",
        questionEn: "All that I can see is just a yellow lemon tree!",
        questionVi:
          "Em bé và bạn Thỏ ngồi trên cành cây hái quả gì màu vàng ('Yellow lemon') để pha nước uống?",
        correctOptionId: "opt-lemon",
        hintVi: "'Yellow lemon' là quả chanh vàng tươi đó Nấm!",
        options: [
          {
            id: "opt-lemon",
            english: "Yellow Lemon",
            vietnamese: "Quả chanh vàng",
            emoji: "🍋",
            imageUrl: "/assets/items/fruits/fruit_09.webp",
          },
          {
            id: "opt-straw",
            english: "Red Strawberry",
            vietnamese: "Quả dâu tây đỏ",
            emoji: "🍓",
            imageUrl: "/assets/items/fruits/fruit_01.webp",
          },
          {
            id: "opt-grape",
            english: "Purple Grapes",
            vietnamese: "Chùm nho tím",
            emoji: "🍇",
            imageUrl: "/assets/items/fruits/fruit_06.webp",
          },
        ],
      },
      {
        id: "m5-q2",
        questionEn: "Yesterday you told me about the blue, blue sky!",
        questionVi:
          "Trong bài hát, bầu trời ('Sky') có màu gì nhỉ? ('Blue, blue sky')",
        correctOptionId: "opt-blue-sky",
        hintVi: "'Blue' là màu xanh da trời nhé!",
        options: [
          {
            id: "opt-blue-sky",
            english: "Blue Sky",
            vietnamese: "Màu xanh da trời",
            emoji: "🌤️",
            imageUrl: "/assets/english/items/color_16_ball_blue.webp",
          },
          {
            id: "opt-red-apple",
            english: "Red",
            vietnamese: "Màu đỏ",
            emoji: "🍎",
            imageUrl: "/assets/items/fruits/fruit_02.webp",
          },
          {
            id: "opt-pink-dress",
            english: "Pink",
            vietnamese: "Màu hồng",
            emoji: "👗",
            imageUrl: "/assets/english/items/shop_13_dress_pink.webp",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 06 - Bài hát Tiếng Anh Vui Nhộn (Tập 2).mp4 ("Brush Your Teeth")
  // =========================================================================
  {
    filenameKey: "06 - Bài hát Tiếng Anh Vui Nhộn (Tập 2).mp4",
    orderLabel: "06",
    displayTitle: "Brush Your Teeth",
    vietnameseTitle: "Đánh Răng Sáng & Tối Cùng Muôn Thú",
    categoryBadge: "🎵 Bài hát · Thói quen tốt",
    topicTag: "Vệ sinh răng miệng",
    icon: "🪥",
    clipType: "song",
    subtitles: [
      {
        id: "m6-s1",
        startSec: 0,
        endSec: 1.8,
        en: "Brush your teeth",
        vi: "Đánh sạch hàm răng của bạn",
      },
      {
        id: "m6-s2",
        startSec: 1.8,
        endSec: 3.8,
        en: "Up and down",
        vi: "Chải lên rồi chải xuống",
      },
      {
        id: "m6-s3",
        startSec: 3.8,
        endSec: 5.6,
        en: "Brush your teeth",
        vi: "Đánh sạch hàm răng của bạn",
      },
      {
        id: "m6-s4",
        startSec: 5.6,
        endSec: 7.0,
        en: "Round and round",
        vi: "Chải xoay vòng tròn",
      },
      {
        id: "m6-s5",
        startSec: 7.0,
        endSec: 10.6,
        en: "Brush your teeth from left to right",
        vi: "Đánh răng từ trái qua phải",
      },
      {
        id: "m6-s6",
        startSec: 10.6,
        endSec: 14.6,
        en: "Brush your teeth in the morning and night",
        vi: "Đánh răng vào buổi sáng và buổi tối",
      },
      {
        id: "m6-s7",
        startSec: 14.6,
        endSec: 17.5,
        en: "Brush, brush, brush!",
        vi: "Chải, chải, chải đều nào!",
      },
      {
        id: "m6-s8",
        startSec: 17.5,
        endSec: 22,
        en: "Brush your teeth in the morning and night!",
        vi: "Đánh răng vào buổi sáng và buổi tối!",
      },
    ],
    vocabCards: [
      {
        id: "m6-v1",
        english: "Brush your teeth",
        vietnamese: "Đánh răng sạch bóng",
        phonetic: "/brʌʃ jʊr tiːθ/",
        emoji: "🪥",
        imageUrl: "/assets/nam-stickers/nam-study-brush.webp",
        startSec: 0,
        endSec: 1.8,
      },
      {
        id: "m6-v2",
        english: "Up and down",
        vietnamese: "Chải lên và xuống",
        phonetic: "/ʌp ænd daʊn/",
        emoji: "⬆️",
        imageUrl: "/assets/pochacco/action-stretch-high.webp",
        startSec: 1.8,
        endSec: 3.8,
      },
      {
        id: "m6-v3",
        english: "Round and round",
        vietnamese: "Chải xoay vòng tròn",
        phonetic: "/raʊnd ænd raʊnd/",
        emoji: "🔄",
        imageUrl: "/assets/items/home/home_05.webp",
        startSec: 5.6,
        endSec: 7.0,
      },
      {
        id: "m6-v4",
        english: "Left to right",
        vietnamese: "Chải từ trái sang phải",
        phonetic: "/left tuː raɪt/",
        emoji: "↔️",
        imageUrl: "/assets/pochacco/action-wave-hello.webp",
        startSec: 7.0,
        endSec: 10.6,
      },
      {
        id: "m6-v5",
        english: "Morning and night",
        vietnamese: "Buổi sáng và buổi tối",
        phonetic: "/ˈmɔːr.nɪŋ ænd naɪt/",
        emoji: "🌞",
        imageUrl: "/assets/items/home/home_01.webp",
        startSec: 10.6,
        endSec: 14.6,
      },
    ],
    quizRounds: [
      {
        id: "m6-q1",
        questionEn: "Brush your teeth in the morning and night!",
        questionVi:
          "Các bạn Ngựa Vằn, Cá Mập, Hổ và Gấu Trúc cùng làm thói quen tốt gì mỗi sáng và tối?",
        correctOptionId: "opt-brush",
        hintVi: "'Brush your teeth' là đánh răng trắng xinh đó Nấm!",
        options: [
          {
            id: "opt-brush",
            english: "Brush your teeth",
            vietnamese: "Đánh răng sạch bóng",
            emoji: "🪥",
            imageUrl: "/assets/nam-stickers/nam-study-brush.webp",
          },
          {
            id: "opt-ride",
            english: "Ride a bike",
            vietnamese: "Đạp xe đạp",
            emoji: "🚲",
            imageUrl: "/assets/english/items/act_13_ride_bike.webp",
          },
          {
            id: "opt-eat-cake",
            english: "Eat cake",
            vietnamese: "Ăn bánh kem",
            emoji: "🎂",
            imageUrl: "/assets/items/sweets/sweet_07.webp",
          },
        ],
      },
      {
        id: "m6-q2",
        questionEn: "Brush your teeth from left to right!",
        questionVi:
          "Ngoài chải lên xuống ('Up and down') và xoay tròn ('Round and round'), chúng mình còn chải răng theo hướng nào?",
        correctOptionId: "opt-left-right",
        hintVi: "'From left to right' là chải từ trái sang phải nhé!",
        options: [
          {
            id: "opt-left-right",
            english: "Left to right",
            vietnamese: "Từ trái qua phải",
            emoji: "↔️",
            imageUrl: "/assets/pochacco/action-wave-hello.webp",
          },
          {
            id: "opt-sleep",
            english: "Go to sleep",
            vietnamese: "Đi ngủ",
            emoji: "🛌",
            imageUrl: "/assets/items/home/home_07.webp",
          },
          {
            id: "opt-read",
            english: "Read a book",
            vietnamese: "Đọc sách",
            emoji: "📖",
            imageUrl: "/assets/items/school/school_03.webp",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 07 - Bài hát Tiếng Anh Vui Nhộn (Tập 3).mp4 (Story: Wolf & Goat "Open the door!")
  // =========================================================================
  {
    filenameKey: "07 - Bài hát Tiếng Anh Vui Nhộn (Tập 3).mp4",
    orderLabel: "07",
    displayTitle: "Truyện: Open The Door!",
    vietnameseTitle: "Chó Sói & Dê Con Thông Minh",
    categoryBadge: "📖 Truyện ngắn · Hội thoại",
    topicTag: "Phản xạ & Cảnh giác",
    icon: "🐺",
    clipType: "story",
    subtitles: [
      {
        id: "m7-s1",
        startSec: 0,
        endSec: 2.6,
        en: "Wolf: Open the door!",
        vi: "Sói gõ cửa: Mở cửa ra!",
      },
      {
        id: "m7-s2",
        startSec: 2.6,
        endSec: 5.6,
        en: "Goat: No, no, no! I won't open!",
        vi: "Dê con đáp: Không, không! Tôi không mở đâu!",
      },
      {
        id: "m7-s3",
        startSec: 5.6,
        endSec: 9.6,
        en: "Wolf: I brought you yummy oranges!",
        vi: "Sói dụ dỗ: Tôi mang cho bạn những quả cam ngon đây!",
      },
      {
        id: "m7-s4",
        startSec: 9.6,
        endSec: 12.6,
        en: "Goat: Really? Are you telling the truth?",
        vi: "Dê con hỏi: Thật sao? Bạn đang nói thật chứ?",
      },
      {
        id: "m7-s5",
        startSec: 12.6,
        endSec: 15.8,
        en: "Wolf: Open the door and see!",
        vi: "Sói cười: Mở cửa ra và nhìn này!",
      },
      {
        id: "m7-s6",
        startSec: 15.8,
        endSec: 17.8,
        en: "Splash!! (Water bucket)",
        vi: "Ào!! (Dê con hất xô nước vào Sói)",
      },
      {
        id: "m7-s7",
        startSec: 17.8,
        endSec: 21.5,
        en: "Wolf: Oh no! I'm all wet now!",
        vi: "Sói kêu: Ôi không! Mình bị ướt hết rồi!",
      },
      {
        id: "m7-s8",
        startSec: 21.5,
        endSec: 25,
        en: "Goat: Hahaha! Serves you right!",
        vi: "Dê con cười: Haha! Đáng đời Sói nhé!",
      },
    ],
    vocabCards: [
      {
        id: "m7-v1",
        english: "Open the door!",
        vietnamese: "Mở cửa ra!",
        phonetic: "/ˈoʊ.pən ðə dɔːr/",
        emoji: "🚪",
        imageUrl: "/assets/items/home/home_12.webp",
        startSec: 0,
        endSec: 2.6,
      },
      {
        id: "m7-v2",
        english: "No! I won't open!",
        vietnamese: "Không! Tôi không mở đâu!",
        phonetic: "/noʊ aɪ woʊnt ˈoʊ.pən/",
        emoji: "🙅",
        imageUrl: "/assets/pochacco/action-strong-fists.webp",
        startSec: 2.6,
        endSec: 5.6,
      },
      {
        id: "m7-v3",
        english: "Yummy oranges",
        vietnamese: "Những quả cam thơm ngon",
        phonetic: "/ˈjʌm.i ˈɔːr.ɪn.dʒɪz/",
        emoji: "🍊",
        imageUrl: "/assets/items/fruits/fruit_04.webp",
        startSec: 5.6,
        endSec: 9.6,
      },
      {
        id: "m7-v4",
        english: "Telling the truth?",
        vietnamese: "Bạn có nói thật không?",
        phonetic: "/ˈtel.ɪŋ ðə truːθ/",
        emoji: "🤔",
        imageUrl: "/assets/pochacco/action-tilt-head.webp",
        startSec: 9.6,
        endSec: 12.6,
      },
      {
        id: "m7-v5",
        english: "I'm all wet now!",
        vietnamese: "Mình bị ướt sũng rồi!",
        phonetic: "/aɪm ɔːl wet naʊ/",
        emoji: "💦",
        imageUrl: "/assets/items/home/home_08.webp",
        startSec: 17.8,
        endSec: 21.5,
      },
    ],
    quizRounds: [
      {
        id: "m7-q1",
        questionEn: "I brought you yummy oranges!",
        questionVi:
          "Để dụ bạn Dê Con mở cửa, Chó Sói đã cầm quả gì trên tay và nói 'I brought you yummy oranges!'?",
        correctOptionId: "opt-oranges",
        hintVi: "'Yummy oranges' là những quả cam tươi ngon đó Nấm!",
        options: [
          {
            id: "opt-oranges",
            english: "Yummy Oranges",
            vietnamese: "Những quả cam ngon",
            emoji: "🍊",
            imageUrl: "/assets/items/fruits/fruit_04.webp",
          },
          {
            id: "opt-bananas",
            english: "Yellow Bananas",
            vietnamese: "Quả chuối vàng",
            emoji: "🍌",
            imageUrl: "/assets/items/fruits/fruit_03.webp",
          },
          {
            id: "opt-watermelon",
            english: "Watermelon",
            vietnamese: "Miếng dưa hấu",
            emoji: "🍉",
            imageUrl: "/assets/items/fruits/fruit_05.webp",
          },
        ],
      },
      {
        id: "m7-q2",
        questionEn: "Oh no! I'm all wet now!",
        questionVi:
          "Khi mở cửa, bạn Dê Con hất xô nước khiến Chó Sói kêu lên 'I'm all wet now!'. Câu đó có nghĩa là gì?",
        correctOptionId: "opt-wet",
        hintVi: "Bị hất nguyên xô nước vào người nên Sói bị ướt sũng đó!",
        options: [
          {
            id: "opt-wet",
            english: "I'm all wet!",
            vietnamese: "Mình bị ướt sũng rồi!",
            emoji: "💦",
            imageUrl: "/assets/items/home/home_08.webp",
          },
          {
            id: "opt-hungry",
            english: "I'm hungry!",
            vietnamese: "Mình đói bụng quá!",
            emoji: "🍱",
            imageUrl: "/assets/nam-stickers/nam-eat-bento.webp",
          },
          {
            id: "opt-sleepy",
            english: "I'm sleepy!",
            vietnamese: "Mình buồn ngủ quá!",
            emoji: "😴",
            imageUrl: "/assets/pochacco/sticker-sleep.webp",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 08 - Kể chuyện Tiếng Anh Hay Cho Bé.mp4 (Story: Wolf & Sheep "Do you like...?")
  // =========================================================================
  {
    filenameKey: "08 - Kể chuyện Tiếng Anh Hay Cho Bé.mp4",
    orderLabel: "08",
    displayTitle: "Truyện: Do You Like Carrots?",
    vietnameseTitle: "Chó Sói & Cừu Nhỏ (Mẫu câu Do you like...?)",
    categoryBadge: "📖 Truyện ngắn · Mẫu câu",
    topicTag: "Do you like...? / Yes, I do",
    icon: "🐑",
    clipType: "story",
    subtitles: [
      {
        id: "m8-s1",
        startSec: 0,
        endSec: 1.8,
        en: "Wolf: I want to eat you!",
        vi: "Sói đuổi theo: Ta muốn ăn thịt ngươi!",
      },
      {
        id: "m8-s2",
        startSec: 1.8,
        endSec: 3.8,
        en: "Sheep: Help! Help!",
        vi: "Cừu nhỏ chạy: Cứu tôi với! Cứu tôi với!",
      },
      {
        id: "m8-s3",
        startSec: 3.8,
        endSec: 5.6,
        en: "Wolf: Wait for me!",
        vi: "Sói gọi: Đợi ta với!",
      },
      {
        id: "m8-s4",
        startSec: 5.6,
        endSec: 8.5,
        en: "Wolf: Do you like grass?",
        vi: "Sói hỏi: Ngươi có thích ăn cỏ không?",
      },
      {
        id: "m8-s5",
        startSec: 8.5,
        endSec: 9.8,
        en: "Sheep: Yes, I do.",
        vi: "Cừu nhỏ đáp: Có, tôi thích!",
      },
      {
        id: "m8-s6",
        startSec: 9.8,
        endSec: 12.5,
        en: "Wolf: Do you like carrots?",
        vi: "Sói hỏi tiếp: Ngươi có thích cà rốt không?",
      },
      {
        id: "m8-s7",
        startSec: 12.5,
        endSec: 13.8,
        en: "Sheep: Yes, I do.",
        vi: "Cừu nhỏ đáp: Có, tôi thích!",
      },
      {
        id: "m8-s8",
        startSec: 13.8,
        endSec: 15.6,
        en: "Wolf: I catch you!",
        vi: "Sói chộp: Ta bắt được ngươi rồi!",
      },
      {
        id: "m8-s9",
        startSec: 15.6,
        endSec: 20,
        en: "Sheep: Help! Help! — Wolf: I want to eat you!",
        vi: "Cừu kêu: Cứu với! — Sói: Ta muốn ăn thịt ngươi!",
      },
    ],
    vocabCards: [
      {
        id: "m8-v1",
        english: "Help! Help!",
        vietnamese: "Cứu tôi với!",
        phonetic: "/help help/",
        emoji: "🏃",
        imageUrl: "/assets/english/items/act_04_run.webp",
        startSec: 1.8,
        endSec: 3.8,
      },
      {
        id: "m8-v2",
        english: "Wait for me!",
        vietnamese: "Đợi tôi với!",
        phonetic: "/weɪt fɔːr miː/",
        emoji: "✋",
        imageUrl: "/assets/pochacco/action-wave-hello.webp",
        startSec: 3.8,
        endSec: 5.6,
      },
      {
        id: "m8-v3",
        english: "Do you like grass?",
        vietnamese: "Bạn có thích cỏ xanh không?",
        phonetic: "/duː juː laɪk ɡræs/",
        emoji: "🌿",
        imageUrl: "/assets/items/home/home_11.webp",
        startSec: 5.6,
        endSec: 8.5,
      },
      {
        id: "m8-v4",
        english: "Do you like carrots?",
        vietnamese: "Bạn có thích cà rốt không?",
        phonetic: "/duː juː laɪk ˈkær.əts/",
        emoji: "🥕",
        imageUrl: "/assets/items/lifeskills/lifeskills_06.webp",
        startSec: 9.8,
        endSec: 12.5,
      },
      {
        id: "m8-v5",
        english: "Yes, I do!",
        vietnamese: "Có, mình rất thích!",
        phonetic: "/jes aɪ duː/",
        emoji: "👍",
        imageUrl: "/assets/nam-stickers/nam-eat-bento.webp",
        startSec: 8.5,
        endSec: 9.8,
      },
    ],
    quizRounds: [
      {
        id: "m8-q1",
        questionEn: "Do you like carrots?",
        questionVi:
          "Trong truyện, ngoài cỏ xanh ('Grass'), Chó Sói còn giơ củ gì ra hỏi bạn Cừu Nhỏ 'Do you like carrots?'?",
        correctOptionId: "opt-carrots",
        hintVi: "'Carrots' là củ cà rốt màu cam giòn ngọt trong rổ rau củ đó Nấm!",
        options: [
          {
            id: "opt-carrots",
            english: "Carrots",
            vietnamese: "Củ cà rốt & rau củ",
            emoji: "🥕",
            imageUrl: "/assets/items/lifeskills/lifeskills_06.webp",
          },
          {
            id: "opt-icecream",
            english: "Ice cream",
            vietnamese: "Cây kem ốc quế",
            emoji: "🍦",
            imageUrl: "/assets/items/sweets/sweet_09.webp",
          },
          {
            id: "opt-milk",
            english: "Fresh Milk",
            vietnamese: "Hộp sữa tươi",
            emoji: "🥛",
            imageUrl: "/assets/items/lifeskills/lifeskills_03.webp",
          },
        ],
      },
      {
        id: "m8-q2",
        questionEn: "Do you like grass? — Yes, I do!",
        questionVi:
          "Khi được hỏi 'Do you like grass?' (Bạn có thích cỏ không?), bạn Cừu Nhỏ gật đầu trả lời thế nào?",
        correctOptionId: "opt-yes-i-do",
        hintVi: "Khi thích món gì đó, mình trả lời 'Yes, I do!' nhé!",
        options: [
          {
            id: "opt-yes-i-do",
            english: "Yes, I do!",
            vietnamese: "Có, mình thích lắm!",
            emoji: "👍",
            imageUrl: "/assets/nam-stickers/nam-eat-bento.webp",
          },
          {
            id: "opt-no-open",
            english: "No, I won't open!",
            vietnamese: "Không mở cửa đâu!",
            emoji: "🙅",
            imageUrl: "/assets/pochacco/action-strong-fists.webp",
          },
          {
            id: "opt-goodnight",
            english: "Good night!",
            vietnamese: "Chúc ngủ ngon!",
            emoji: "🌙",
            imageUrl: "/assets/pochacco/sticker-sleep.webp",
          },
        ],
      },
    ],
  },
  // =========================================================================
  // 09 - Bài hát Sunny Sunny Vui Nhộn.mp3 ("Sunny, Sunny - Come Play Outside")
  // =========================================================================
  {
    filenameKey: "09 - Bài hát Sunny Sunny Vui Nhộn.mp3",
    orderLabel: "09",
    displayTitle: "Sunny, Sunny!",
    vietnameseTitle: "Vui Chơi Ngoài Trời Cùng Nắng Ấm",
    categoryBadge: "🎵 Bài hát · Vận động",
    topicTag: "Động từ & Đếm số ngoài trời",
    icon: "☀️",
    clipType: "song",
    subtitles: [
      {
        id: "m9-s1",
        startSec: 0,
        endSec: 8.5,
        en: "Sunny, Sunny! Let's play outside!",
        vi: "Trời nắng đẹp quá! Cùng ra sân chơi nào!",
      },
      {
        id: "m9-s2",
        startSec: 8.5,
        endSec: 15.5,
        en: "Sun on my nose, shoes on my feet — Come outside, come play with me!",
        vi: "Nắng đậu trên mũi xinh, đi giày vào chân — Ra ngoài chơi cùng mình nhé!",
      },
      {
        id: "m9-s3",
        startSec: 15.5,
        endSec: 23.0,
        en: "Hop to the garden, run to the tree — You and me, one, two, three!",
        vi: "Nhảy lò cò ra vườn, chạy tới gốc cây — Bạn và mình, một, hai, ba!",
      },
      {
        id: "m9-s4",
        startSec: 23.0,
        endSec: 37.0,
        en: "Sunny, sunny, hey, hey, hey! Hands up high, head in the clouds!",
        vi: "Nắng ấm ơi, giơ cao hai tay chạm tới mây xanh nào!",
      },
      {
        id: "m9-s5",
        startSec: 37.0,
        endSec: 51.5,
        en: "Clap-clap, jump-jump, no slow moves — Sunny, sunny, we got grooves!",
        vi: "Vỗ tay bốp bốp, bật nhảy cao nào — Mình cùng nhún nhảy dưới nắng!",
      },
      {
        id: "m9-s6",
        startSec: 51.5,
        endSec: 67.5,
        en: "Hey now, sunny, sunny! Kick it up, we don't sit still, we play!",
        vi: "Nắng ấm ơi! Tung tăng chạy nhảy, mình cùng vui chơi thỏa thích!",
      },
      {
        id: "m9-s7",
        startSec: 67.5,
        endSec: 82.0,
        en: "Sun on my nose, sun on your toes — Skip to the gate, hop to the tree!",
        vi: "Nắng trên mũi mình, nắng trên ngón chân bạn — Nhảy chân sáo ra cổng, nhảy tới gốc cây!",
      },
      {
        id: "m9-s8",
        startSec: 82.0,
        endSec: 97.5,
        en: "Sunny, sunny, clap your hands! Sunny, sunny, spin and dance!",
        vi: "Nắng ấm ơi, vỗ tay nào! Nắng ấm ơi, xoay vòng và nhảy múa!",
      },
      {
        id: "m9-s9",
        startSec: 97.5,
        endSec: 112.0,
        en: "Bird in the blue cloud drifting by — We make a big kite, chase the sky!",
        vi: "Chú chim bay qua đám mây xanh — Mình làm cánh diều lớn bay lên bầu trời!",
      },
      {
        id: "m9-s10",
        startSec: 112.0,
        endSec: 138.0,
        en: "One, two, three, come out and play — Sunny, sunny, hooray, hooray!",
        vi: "Một, hai, ba, cùng ra ngoài chơi — Nắng ấm ơi, hoan hô, hoan hô!",
      },
    ],
    vocabCards: [
      {
        id: "m9-v1",
        english: "Sun on my nose",
        vietnamese: "Nắng trên mũi xinh",
        phonetic: "/sʌn ɑːn maɪ noʊz/",
        emoji: "☀️",
        imageUrl: "/assets/pochacco/action-touch-nose.webp",
        startSec: 8.5,
        endSec: 15.5,
      },
      {
        id: "m9-v2",
        english: "Run to the tree",
        vietnamese: "Chạy tới gốc cây",
        phonetic: "/rʌn tuː ðə triː/",
        emoji: "🏃",
        imageUrl: "/assets/english/items/act_04_run.webp",
        startSec: 15.5,
        endSec: 23.0,
      },
      {
        id: "m9-v3",
        english: "Hands up high",
        vietnamese: "Giơ tay thật cao",
        phonetic: "/hændz ʌp haɪ/",
        emoji: "🙌",
        imageUrl: "/assets/pochacco/action-wave-hello.webp",
        startSec: 23.0,
        endSec: 40.0,
      },
      {
        id: "m9-v4",
        english: "Clap your hands",
        vietnamese: "Vỗ hai bàn tay",
        phonetic: "/klæp jʊr hændz/",
        emoji: "👏",
        imageUrl: "/assets/pochacco/action-clap-two.webp",
        startSec: 40.0,
        endSec: 86.0,
      },
      {
        id: "m9-v5",
        english: "Spin and dance",
        vietnamese: "Xoay vòng & nhảy múa",
        phonetic: "/spɪn ænd dæns/",
        emoji: "💃",
        imageUrl: "/assets/english/items/act_07_dance.webp",
        startSec: 86.0,
        endSec: 98.0,
      },
      {
        id: "m9-v6",
        english: "Big kite",
        vietnamese: "Cánh diều lớn",
        phonetic: "/bɪɡ kaɪt/",
        emoji: "🪁",
        imageUrl: "/assets/english/shapes/shape_08_diamond_blue.webp",
        startSec: 98.0,
        endSec: 138.0,
      },
    ],
    quizRounds: [
      {
        id: "m9-q1",
        questionEn: "Sunny, sunny, clap your hands!",
        questionVi:
          "Trong điệp khúc bài hát, khi nghe câu 'Sunny, sunny, clap your hands!', Nấm làm động tác gì nhỉ?",
        correctOptionId: "opt-sunny-clap",
        hintVi: "'Clap your hands' là Vỗ hai bàn tay đấy!",
        options: [
          {
            id: "opt-sunny-clap",
            english: "Clap your hands",
            vietnamese: "Vỗ hai bàn tay",
            emoji: "👏",
            imageUrl: "/assets/pochacco/action-clap-two.webp",
          },
          {
            id: "opt-sunny-sleep",
            english: "Go to sleep",
            vietnamese: "Đi ngủ",
            emoji: "😴",
            imageUrl: "/assets/pochacco/sticker-sleep.webp",
          },
          {
            id: "opt-sunny-read",
            english: "Read a book",
            vietnamese: "Đọc sách",
            emoji: "📖",
            imageUrl: "/assets/nam-stickers/nam-study-read.webp",
          },
        ],
      },
      {
        id: "m9-q2",
        questionEn: "Sunny, sunny, spin and dance!",
        questionVi:
          "Tiếp theo câu vỗ tay là câu 'Sunny, sunny, spin and dance!' — Đâu là thẻ Xoay vòng & nhảy múa?",
        correctOptionId: "opt-sunny-dance",
        hintVi: "'Spin and dance' nghĩa là Xoay vòng và nhảy múa!",
        options: [
          {
            id: "opt-sunny-dance",
            english: "Spin and dance",
            vietnamese: "Xoay vòng & nhảy múa",
            emoji: "💃",
            imageUrl: "/assets/english/items/act_07_dance.webp",
          },
          {
            id: "opt-sunny-sit",
            english: "Sit down",
            vietnamese: "Ngồi xuống",
            emoji: "🪑",
            imageUrl: "/assets/english/items/act_05_sit.webp",
          },
          {
            id: "opt-sunny-milk",
            english: "Drink milk",
            vietnamese: "Uống sữa",
            emoji: "🥛",
            imageUrl: "/assets/nam-stickers/nam-eat-milk.webp",
          },
        ],
      },
      {
        id: "m9-q3",
        questionEn: "We make a big kite, chase the sky!",
        questionVi:
          "Ở đoạn cuối bài hát, các bạn nhỏ làm món đồ chơi gì hình thoi để thả bay lên bầu trời xanh ('make a big kite')?",
        correctOptionId: "opt-sunny-kite",
        hintVi: "'Big kite' là Cánh diều lớn bay trên bầu trời!",
        options: [
          {
            id: "opt-sunny-kite",
            english: "Big kite",
            vietnamese: "Cánh diều lớn",
            emoji: "🪁",
            imageUrl: "/assets/english/shapes/shape_08_diamond_blue.webp",
          },
          {
            id: "opt-sunny-car",
            english: "Toy car",
            vietnamese: "Xe ô tô đồ chơi",
            emoji: "🚗",
            imageUrl: "/assets/items/vehicles/vehicle_01.webp",
          },
          {
            id: "opt-sunny-cake",
            english: "Sweet cake",
            vietnamese: "Bánh kem ngọt",
            emoji: "🎂",
            imageUrl: "/assets/items/sweets/sweet_01.webp",
          },
        ],
      },
    ],
  },
];

const LESSON_BY_FILENAME_MAP = new Map<string, EnglishSongLessonPlan>(
  ENGLISH_SONG_LESSONS.map((lesson) => [
    lesson.filenameKey.toLowerCase(),
    lesson,
  ]),
);

/**
 * Tìm bài học tương tác khớp với file video trong D:\Nấm học\Nhạc tiếng anh.
 * Nếu ba mẹ tải thêm video mới ngoài 9 clip gốc, tự động tạo bộ thẻ học & câu hỏi dự phòng thông minh.
 */
export function getEnglishSongLessonForClip(
  filename: string,
  fallbackTitle: string,
  index: number,
): EnglishSongLessonPlan {
  const exact = LESSON_BY_FILENAME_MAP.get(filename.trim().toLowerCase());
  if (exact) return exact;

  // Khớp theo tiền tố số thứ tự (01..09) nếu tên file bị đổi nhẹ
  const prefixMatch = filename.trim().match(/^(0[1-9])\b/);
  if (prefixMatch) {
    const byOrder = ENGLISH_SONG_LESSONS.find(
      (item) => item.orderLabel === prefixMatch[1],
    );
    if (byOrder) return byOrder;
  }

  const cleanTitle = fallbackTitle
    .replace(/^[🎵🎬]\s*/, "")
    .replace(/^\d+\s*/, "")
    .trim();

  return {
    filenameKey: filename,
    orderLabel: String(index + 1).padStart(2, "0"),
    displayTitle: cleanTitle || "English Fun Song",
    vietnameseTitle: "Nghe Nhạc & Nhại Giọng Cùng Kuromi",
    categoryBadge: "🎵 Bài hát mở rộng",
    topicTag: "Phản xạ nghe & hát",
    icon: "🎵",
    clipType: "song",
    subtitles: [
      {
        id: `custom-${index}-s1`,
        startSec: 0,
        endSec: 8,
        en: "Let's listen and sing along!",
        vi: "Cùng lắng nghe và hát theo giai điệu vui nhộn nhé!",
      },
      {
        id: `custom-${index}-s2`,
        startSec: 8,
        endSec: 60,
        en: "I love singing English songs!",
        vi: "Mình rất thích hát nhạc tiếng Anh!",
      },
    ],
    vocabCards: [
      {
        id: `custom-${index}-v1`,
        english: "Sing a song",
        vietnamese: "Ca hát vui vẻ",
        phonetic: "/sɪŋ ə sɔːŋ/",
        emoji: "🎤",
        imageUrl: "/assets/english/items/act_09_sing.webp",
        startSec: 0,
        endSec: 10,
      },
      {
        id: `custom-${index}-v2`,
        english: "Dance together",
        vietnamese: "Nhảy múa cùng nhau",
        phonetic: "/dæns təˈɡeð.ər/",
        emoji: "💃",
        imageUrl: "/assets/english/items/act_07_dance.webp",
        startSec: 10,
        endSec: 20,
      },
      {
        id: `custom-${index}-v3`,
        english: "Listen carefully",
        vietnamese: "Lắng nghe thật kỹ",
        phonetic: "/ˈlɪs.ən/",
        emoji: "🎧",
        imageUrl: "/assets/pochacco/state-listen-duo.webp",
        startSec: 20,
        endSec: 30,
      },
      {
        id: `custom-${index}-v4`,
        english: "Awesome job!",
        vietnamese: "Nấm giỏi lắm!",
        phonetic: "/ˈɔː.səm dʒɑːb/",
        emoji: "🌟",
        imageUrl: "/assets/nam-stickers/nam-stage-star.webp",
        startSec: 30,
        endSec: 60,
      },
    ],
    quizRounds: [
      {
        id: `custom-${index}-q1`,
        questionEn: "I love singing English songs!",
        questionVi: "Sau khi xem xong clip, Nấm hãy chạm vào thẻ 'Sing a song' (Ca hát) để nhận Sao nhé!",
        correctOptionId: "opt-custom-sing",
        hintVi: "Chọn hình cầm micro ca hát 'Sing a song' nhé!",
        options: [
          {
            id: "opt-custom-sing",
            english: "Sing a song",
            vietnamese: "Ca hát vui vẻ",
            emoji: "🎤",
            imageUrl: "/assets/english/items/act_09_sing.webp",
          },
          {
            id: "opt-custom-sleep",
            english: "Go to sleep",
            vietnamese: "Đi ngủ",
            emoji: "😴",
            imageUrl: "/assets/pochacco/sticker-sleep.webp",
          },
        ],
      },
    ],
  };
}
