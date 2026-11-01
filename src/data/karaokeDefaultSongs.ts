export interface KaraokeWord {
  word: string;
  start: number;
  end: number;
}

export interface KaraokeLine {
  id: number;
  startTime: number;
  endTime: number;
  nextLineTime: number;
  text: string;
  words: KaraokeWord[];
}

export interface KaraokeSong {
  id: string;
  filename: string;
  title: string;
  artist: string;
  duration: number;
  audioUrl: string;
  thumbUrl?: string;
  highlightMode?: "word" | "line";
  lines: KaraokeLine[];
}

export const DEFAULT_KARAOKE_SONGS: KaraokeSong[] = [
  {
    "id": "karaoke-nhung-ngay-troi-bao-la",
    "filename": "Những Ngày Trời Bao La.mp3",
    "title": "Những Ngày Trời Bao La",
    "artist": "Gia Đình Haha (Jun Phạm, Bùi Công Nam, Rhymastic, Duy Khánh, Ngọc Thanh Tâm)",
    "duration": 238.18,
    "audioUrl": "/karaoke/karaoke-nhung-ngay-troi-bao-la.mp3",
    "thumbUrl": "/karaoke/karaoke-nhung-ngay-troi-bao-la.jpg",
    "highlightMode": "line",
    "lines": [
      {
        "id": 0,
        "startTime": 14.5,
        "endTime": 17.4,
        "nextLineTime": 17.5,
        "text": "Let's go! Hôm nay mình lên rừng",
        "words": [
          {
            "word": "Let's",
            "start": 14.5,
            "end": 15.08
          },
          {
            "word": "go!",
            "start": 15.08,
            "end": 15.43
          },
          {
            "word": "Hôm",
            "start": 15.43,
            "end": 15.78
          },
          {
            "word": "nay",
            "start": 15.78,
            "end": 16.13
          },
          {
            "word": "mình",
            "start": 16.13,
            "end": 16.59
          },
          {
            "word": "lên",
            "start": 16.59,
            "end": 16.94
          },
          {
            "word": "rừng",
            "start": 16.94,
            "end": 17.4
          }
        ]
      },
      {
        "id": 1,
        "startTime": 17.5,
        "endTime": 19.8,
        "nextLineTime": 19.9,
        "text": "Băng qua nơi kia xa xa góc suối",
        "words": [
          {
            "word": "Băng",
            "start": 17.5,
            "end": 17.88
          },
          {
            "word": "qua",
            "start": 17.88,
            "end": 18.17
          },
          {
            "word": "nơi",
            "start": 18.17,
            "end": 18.46
          },
          {
            "word": "kia",
            "start": 18.46,
            "end": 18.75
          },
          {
            "word": "xa",
            "start": 18.75,
            "end": 18.94
          },
          {
            "word": "xa",
            "start": 18.94,
            "end": 19.13
          },
          {
            "word": "góc",
            "start": 19.13,
            "end": 19.42
          },
          {
            "word": "suối",
            "start": 19.42,
            "end": 19.8
          }
        ]
      },
      {
        "id": 2,
        "startTime": 19.9,
        "endTime": 21.7,
        "nextLineTime": 21.8,
        "text": "Leo cao tận trên đồi",
        "words": [
          {
            "word": "Leo",
            "start": 19.9,
            "end": 20.24
          },
          {
            "word": "cao",
            "start": 20.24,
            "end": 20.58
          },
          {
            "word": "tận",
            "start": 20.58,
            "end": 20.92
          },
          {
            "word": "trên",
            "start": 20.92,
            "end": 21.37
          },
          {
            "word": "đồi",
            "start": 21.37,
            "end": 21.71
          }
        ]
      },
      {
        "id": 3,
        "startTime": 21.8,
        "endTime": 24.0,
        "nextLineTime": 24.1,
        "text": "Nhanh em ơi chú Sáu gọi rồi",
        "words": [
          {
            "word": "Nhanh",
            "start": 21.8,
            "end": 22.32
          },
          {
            "word": "em",
            "start": 22.32,
            "end": 22.53
          },
          {
            "word": "ơi",
            "start": 22.53,
            "end": 22.74
          },
          {
            "word": "chú",
            "start": 22.74,
            "end": 23.05
          },
          {
            "word": "Sáu",
            "start": 23.05,
            "end": 23.36
          },
          {
            "word": "gọi",
            "start": 23.36,
            "end": 23.67
          },
          {
            "word": "rồi",
            "start": 23.67,
            "end": 23.98
          }
        ]
      },
      {
        "id": 4,
        "startTime": 24.1,
        "endTime": 26.2,
        "nextLineTime": 26.3,
        "text": "Bình thường thì cười cười nói nói",
        "words": [
          {
            "word": "Bình",
            "start": 24.1,
            "end": 24.41
          },
          {
            "word": "thường",
            "start": 24.41,
            "end": 24.88
          },
          {
            "word": "thì",
            "start": 24.88,
            "end": 25.11
          },
          {
            "word": "cười",
            "start": 25.11,
            "end": 25.42
          },
          {
            "word": "cười",
            "start": 25.42,
            "end": 25.73
          },
          {
            "word": "nói",
            "start": 25.73,
            "end": 25.96
          },
          {
            "word": "nói",
            "start": 25.96,
            "end": 26.19
          }
        ]
      },
      {
        "id": 5,
        "startTime": 26.3,
        "endTime": 28.4,
        "nextLineTime": 28.5,
        "text": "Nay xem ai nhiều mồ hôi rơi",
        "words": [
          {
            "word": "Nay",
            "start": 26.3,
            "end": 26.6
          },
          {
            "word": "xem",
            "start": 26.6,
            "end": 26.9
          },
          {
            "word": "ai",
            "start": 26.9,
            "end": 27.1
          },
          {
            "word": "nhiều",
            "start": 27.1,
            "end": 27.6
          },
          {
            "word": "mồ",
            "start": 27.6,
            "end": 27.8
          },
          {
            "word": "hôi",
            "start": 27.8,
            "end": 28.1
          },
          {
            "word": "rơi",
            "start": 28.1,
            "end": 28.4
          }
        ]
      },
      {
        "id": 6,
        "startTime": 28.5,
        "endTime": 30.5,
        "nextLineTime": 30.6,
        "text": "Nào cùng Gia đình Haha",
        "words": [
          {
            "word": "Nào",
            "start": 28.5,
            "end": 28.83
          },
          {
            "word": "cùng",
            "start": 28.83,
            "end": 29.27
          },
          {
            "word": "Gia",
            "start": 29.27,
            "end": 29.6
          },
          {
            "word": "đình",
            "start": 29.6,
            "end": 30.04
          },
          {
            "word": "Haha",
            "start": 30.04,
            "end": 30.48
          }
        ]
      },
      {
        "id": 7,
        "startTime": 30.6,
        "endTime": 32.7,
        "nextLineTime": 32.8,
        "text": "Mình làm nông dân nhá!",
        "words": [
          {
            "word": "Mình",
            "start": 30.6,
            "end": 31.07
          },
          {
            "word": "làm",
            "start": 31.07,
            "end": 31.42
          },
          {
            "word": "nông",
            "start": 31.42,
            "end": 31.89
          },
          {
            "word": "dân",
            "start": 31.89,
            "end": 32.24
          },
          {
            "word": "nhá!",
            "start": 32.24,
            "end": 32.71
          }
        ]
      },
      {
        "id": 8,
        "startTime": 32.8,
        "endTime": 34.8,
        "nextLineTime": 34.9,
        "text": "Ở đây ai cũng quen rồi",
        "words": [
          {
            "word": "Ở",
            "start": 32.8,
            "end": 33.02
          },
          {
            "word": "đây",
            "start": 33.02,
            "end": 33.35
          },
          {
            "word": "ai",
            "start": 33.35,
            "end": 33.57
          },
          {
            "word": "cũng",
            "start": 33.57,
            "end": 34.01
          },
          {
            "word": "quen",
            "start": 34.01,
            "end": 34.45
          },
          {
            "word": "rồi",
            "start": 34.45,
            "end": 34.78
          }
        ]
      },
      {
        "id": 9,
        "startTime": 34.9,
        "endTime": 37.0,
        "nextLineTime": 37.1,
        "text": "Mặt trời mọc là cất bước thôi",
        "words": [
          {
            "word": "Mặt",
            "start": 34.9,
            "end": 35.17
          },
          {
            "word": "trời",
            "start": 35.17,
            "end": 35.54
          },
          {
            "word": "mọc",
            "start": 35.54,
            "end": 35.81
          },
          {
            "word": "là",
            "start": 35.81,
            "end": 35.99
          },
          {
            "word": "cất",
            "start": 35.99,
            "end": 36.26
          },
          {
            "word": "bước",
            "start": 36.26,
            "end": 36.63
          },
          {
            "word": "thôi",
            "start": 36.63,
            "end": 37.0
          }
        ]
      },
      {
        "id": 10,
        "startTime": 37.1,
        "endTime": 39.1,
        "nextLineTime": 39.2,
        "text": "Ngân nga vài đôi lời",
        "words": [
          {
            "word": "Ngân",
            "start": 37.1,
            "end": 37.6
          },
          {
            "word": "nga",
            "start": 37.6,
            "end": 37.98
          },
          {
            "word": "vài",
            "start": 37.98,
            "end": 38.35
          },
          {
            "word": "đôi",
            "start": 38.35,
            "end": 38.73
          },
          {
            "word": "lời",
            "start": 38.73,
            "end": 39.1
          }
        ]
      },
      {
        "id": 11,
        "startTime": 39.2,
        "endTime": 41.3,
        "nextLineTime": 41.4,
        "text": "Bàn chân đi theo những áng mây trôi",
        "words": [
          {
            "word": "Bàn",
            "start": 39.2,
            "end": 39.43
          },
          {
            "word": "chân",
            "start": 39.43,
            "end": 39.73
          },
          {
            "word": "đi",
            "start": 39.73,
            "end": 39.88
          },
          {
            "word": "theo",
            "start": 39.88,
            "end": 40.18
          },
          {
            "word": "những",
            "start": 40.18,
            "end": 40.55
          },
          {
            "word": "áng",
            "start": 40.55,
            "end": 40.77
          },
          {
            "word": "mây",
            "start": 40.77,
            "end": 41.0
          },
          {
            "word": "trôi",
            "start": 41.0,
            "end": 41.3
          }
        ]
      },
      {
        "id": 12,
        "startTime": 41.4,
        "endTime": 43.4,
        "nextLineTime": 43.5,
        "text": "Vượt đèo vượt đồi vượt sóng lớn",
        "words": [
          {
            "word": "Vượt",
            "start": 41.4,
            "end": 41.72
          },
          {
            "word": "đèo",
            "start": 41.72,
            "end": 41.96
          },
          {
            "word": "vượt",
            "start": 41.96,
            "end": 42.28
          },
          {
            "word": "đồi",
            "start": 42.28,
            "end": 42.52
          },
          {
            "word": "vượt",
            "start": 42.52,
            "end": 42.84
          },
          {
            "word": "sóng",
            "start": 42.84,
            "end": 43.16
          },
          {
            "word": "lớn",
            "start": 43.16,
            "end": 43.4
          }
        ]
      },
      {
        "id": 13,
        "startTime": 43.5,
        "endTime": 47.7,
        "nextLineTime": 47.8,
        "text": "Người bình thường mà rất phi thường",
        "words": [
          {
            "word": "Người",
            "start": 43.5,
            "end": 44.22
          },
          {
            "word": "bình",
            "start": 44.22,
            "end": 44.8
          },
          {
            "word": "thường",
            "start": 44.8,
            "end": 45.67
          },
          {
            "word": "mà",
            "start": 45.67,
            "end": 45.96
          },
          {
            "word": "rất",
            "start": 45.96,
            "end": 46.39
          },
          {
            "word": "phi",
            "start": 46.39,
            "end": 46.82
          },
          {
            "word": "thường",
            "start": 46.82,
            "end": 47.69
          }
        ]
      },
      {
        "id": 14,
        "startTime": 47.8,
        "endTime": 49.8,
        "nextLineTime": 49.9,
        "text": "Và mình cùng hát, mình cùng ở",
        "words": [
          {
            "word": "Và",
            "start": 47.8,
            "end": 47.97
          },
          {
            "word": "mình",
            "start": 47.97,
            "end": 48.32
          },
          {
            "word": "cùng",
            "start": 48.32,
            "end": 48.67
          },
          {
            "word": "hát,",
            "start": 48.67,
            "end": 48.93
          },
          {
            "word": "mình",
            "start": 48.93,
            "end": 49.28
          },
          {
            "word": "cùng",
            "start": 49.28,
            "end": 49.63
          },
          {
            "word": "ở",
            "start": 49.63,
            "end": 49.8
          }
        ]
      },
      {
        "id": 15,
        "startTime": 49.9,
        "endTime": 52.0,
        "nextLineTime": 52.1,
        "text": "Cùng làm với những nông dân",
        "words": [
          {
            "word": "Cùng",
            "start": 49.9,
            "end": 50.28
          },
          {
            "word": "làm",
            "start": 50.28,
            "end": 50.57
          },
          {
            "word": "với",
            "start": 50.57,
            "end": 50.86
          },
          {
            "word": "những",
            "start": 50.86,
            "end": 51.34
          },
          {
            "word": "nông",
            "start": 51.34,
            "end": 51.72
          },
          {
            "word": "dân",
            "start": 51.72,
            "end": 52.01
          }
        ]
      },
      {
        "id": 16,
        "startTime": 52.1,
        "endTime": 54.1,
        "nextLineTime": 54.2,
        "text": "Cùng vui cùng sống, chung hơi thở",
        "words": [
          {
            "word": "Cùng",
            "start": 52.1,
            "end": 52.41
          },
          {
            "word": "vui",
            "start": 52.41,
            "end": 52.64
          },
          {
            "word": "cùng",
            "start": 52.64,
            "end": 52.95
          },
          {
            "word": "sống,",
            "start": 52.95,
            "end": 53.26
          },
          {
            "word": "chung",
            "start": 53.26,
            "end": 53.64
          },
          {
            "word": "hơi",
            "start": 53.64,
            "end": 53.87
          },
          {
            "word": "thở",
            "start": 53.87,
            "end": 54.1
          }
        ]
      },
      {
        "id": 17,
        "startTime": 54.2,
        "endTime": 56.3,
        "nextLineTime": 56.4,
        "text": "Từ miền xa đến nơi gần",
        "words": [
          {
            "word": "Từ",
            "start": 54.2,
            "end": 54.45
          },
          {
            "word": "miền",
            "start": 54.45,
            "end": 54.94
          },
          {
            "word": "xa",
            "start": 54.94,
            "end": 55.19
          },
          {
            "word": "đến",
            "start": 55.19,
            "end": 55.56
          },
          {
            "word": "nơi",
            "start": 55.56,
            "end": 55.93
          },
          {
            "word": "gần",
            "start": 55.93,
            "end": 56.3
          }
        ]
      },
      {
        "id": 18,
        "startTime": 56.4,
        "endTime": 58.4,
        "nextLineTime": 58.5,
        "text": "Ta sẽ được thấy, được hiểu những điều",
        "words": [
          {
            "word": "Ta",
            "start": 56.4,
            "end": 56.54
          },
          {
            "word": "sẽ",
            "start": 56.54,
            "end": 56.68
          },
          {
            "word": "được",
            "start": 56.68,
            "end": 56.96
          },
          {
            "word": "thấy,",
            "start": 56.96,
            "end": 57.24
          },
          {
            "word": "được",
            "start": 57.24,
            "end": 57.52
          },
          {
            "word": "hiểu",
            "start": 57.52,
            "end": 57.8
          },
          {
            "word": "những",
            "start": 57.8,
            "end": 58.14
          },
          {
            "word": "điều",
            "start": 58.14,
            "end": 58.42
          }
        ]
      },
      {
        "id": 19,
        "startTime": 58.5,
        "endTime": 60.1,
        "nextLineTime": 60.2,
        "text": "Bình thường mà lại rất phi thường",
        "words": [
          {
            "word": "Bình",
            "start": 58.5,
            "end": 58.74
          },
          {
            "word": "thường",
            "start": 58.74,
            "end": 59.1
          },
          {
            "word": "mà",
            "start": 59.1,
            "end": 59.22
          },
          {
            "word": "lại",
            "start": 59.22,
            "end": 59.4
          },
          {
            "word": "rất",
            "start": 59.4,
            "end": 59.58
          },
          {
            "word": "phi",
            "start": 59.58,
            "end": 59.76
          },
          {
            "word": "thường",
            "start": 59.76,
            "end": 60.12
          }
        ]
      },
      {
        "id": 20,
        "startTime": 60.2,
        "endTime": 61.7,
        "nextLineTime": 61.8,
        "text": "Gia đình Haha bắt đầu nha!",
        "words": [
          {
            "word": "Gia",
            "start": 60.2,
            "end": 60.41
          },
          {
            "word": "đình",
            "start": 60.41,
            "end": 60.7
          },
          {
            "word": "Haha",
            "start": 60.7,
            "end": 60.99
          },
          {
            "word": "bắt",
            "start": 60.99,
            "end": 61.2
          },
          {
            "word": "đầu",
            "start": 61.2,
            "end": 61.41
          },
          {
            "word": "nha!",
            "start": 61.41,
            "end": 61.7
          }
        ]
      },
      {
        "id": 21,
        "startTime": 61.8,
        "endTime": 62.7,
        "nextLineTime": 62.8,
        "text": "Sẵn sàng chưa?",
        "words": [
          {
            "word": "Sẵn",
            "start": 61.8,
            "end": 62.02
          },
          {
            "word": "sàng",
            "start": 62.02,
            "end": 62.32
          },
          {
            "word": "chưa?",
            "start": 62.32,
            "end": 62.7
          }
        ]
      },
      {
        "id": 22,
        "startTime": 62.8,
        "endTime": 67.0,
        "nextLineTime": 67.1,
        "text": "Đón lấy nắng sớm phía bên kia chân đồi",
        "words": [
          {
            "word": "Đón",
            "start": 62.8,
            "end": 63.22
          },
          {
            "word": "lấy",
            "start": 63.22,
            "end": 63.64
          },
          {
            "word": "nắng",
            "start": 63.64,
            "end": 64.2
          },
          {
            "word": "sớm",
            "start": 64.2,
            "end": 64.62
          },
          {
            "word": "phía",
            "start": 64.62,
            "end": 65.18
          },
          {
            "word": "bên",
            "start": 65.18,
            "end": 65.6
          },
          {
            "word": "kia",
            "start": 65.6,
            "end": 66.02
          },
          {
            "word": "chân",
            "start": 66.02,
            "end": 66.58
          },
          {
            "word": "đồi",
            "start": 66.58,
            "end": 67.0
          }
        ]
      },
      {
        "id": 23,
        "startTime": 67.1,
        "endTime": 69.1,
        "nextLineTime": 69.2,
        "text": "Từ từ thôi hít hết gió mát",
        "words": [
          {
            "word": "Từ",
            "start": 67.1,
            "end": 67.3
          },
          {
            "word": "từ",
            "start": 67.3,
            "end": 67.5
          },
          {
            "word": "thôi",
            "start": 67.5,
            "end": 67.9
          },
          {
            "word": "hít",
            "start": 67.9,
            "end": 68.2
          },
          {
            "word": "hết",
            "start": 68.2,
            "end": 68.5
          },
          {
            "word": "gió",
            "start": 68.5,
            "end": 68.8
          },
          {
            "word": "mát",
            "start": 68.8,
            "end": 69.1
          }
        ]
      },
      {
        "id": 24,
        "startTime": 69.2,
        "endTime": 71.3,
        "nextLineTime": 71.4,
        "text": "Ngay nơi ta ngồi",
        "words": [
          {
            "word": "Ngay",
            "start": 69.2,
            "end": 69.85
          },
          {
            "word": "nơi",
            "start": 69.85,
            "end": 70.33
          },
          {
            "word": "ta",
            "start": 70.33,
            "end": 70.65
          },
          {
            "word": "ngồi",
            "start": 70.65,
            "end": 71.3
          }
        ]
      },
      {
        "id": 25,
        "startTime": 71.4,
        "endTime": 73.6,
        "nextLineTime": 73.7,
        "text": "Xỏ giày vào chân ngay, xắn tay lên!",
        "words": [
          {
            "word": "Xỏ",
            "start": 71.4,
            "end": 71.56
          },
          {
            "word": "giày",
            "start": 71.56,
            "end": 71.89
          },
          {
            "word": "vào",
            "start": 71.89,
            "end": 72.13
          },
          {
            "word": "chân",
            "start": 72.13,
            "end": 72.46
          },
          {
            "word": "ngay,",
            "start": 72.46,
            "end": 72.79
          },
          {
            "word": "xắn",
            "start": 72.79,
            "end": 73.03
          },
          {
            "word": "tay",
            "start": 73.03,
            "end": 73.27
          },
          {
            "word": "lên!",
            "start": 73.27,
            "end": 73.6
          }
        ]
      },
      {
        "id": 26,
        "startTime": 73.7,
        "endTime": 75.8,
        "nextLineTime": 75.9,
        "text": "Theo nhau ta bắt đầu viết nên",
        "words": [
          {
            "word": "Theo",
            "start": 73.7,
            "end": 74.07
          },
          {
            "word": "nhau",
            "start": 74.07,
            "end": 74.44
          },
          {
            "word": "ta",
            "start": 74.44,
            "end": 74.62
          },
          {
            "word": "bắt",
            "start": 74.62,
            "end": 74.89
          },
          {
            "word": "đầu",
            "start": 74.89,
            "end": 75.16
          },
          {
            "word": "viết",
            "start": 75.16,
            "end": 75.53
          },
          {
            "word": "nên",
            "start": 75.53,
            "end": 75.8
          }
        ]
      },
      {
        "id": 27,
        "startTime": 75.9,
        "endTime": 77.8,
        "nextLineTime": 77.9,
        "text": "Hành trình ở đây! Nhìn kìa em!",
        "words": [
          {
            "word": "Hành",
            "start": 75.9,
            "end": 76.2
          },
          {
            "word": "trình",
            "start": 76.2,
            "end": 76.58
          },
          {
            "word": "ở",
            "start": 76.58,
            "end": 76.73
          },
          {
            "word": "đây!",
            "start": 76.73,
            "end": 77.03
          },
          {
            "word": "Nhìn",
            "start": 77.03,
            "end": 77.33
          },
          {
            "word": "kìa",
            "start": 77.33,
            "end": 77.56
          },
          {
            "word": "em!",
            "start": 77.56,
            "end": 77.79
          }
        ]
      },
      {
        "id": 28,
        "startTime": 77.9,
        "endTime": 82.0,
        "nextLineTime": 82.1,
        "text": "Bao nhiêu thân quen ở ngay nơi lạ",
        "words": [
          {
            "word": "Bao",
            "start": 77.9,
            "end": 78.36
          },
          {
            "word": "nhiêu",
            "start": 78.36,
            "end": 79.12
          },
          {
            "word": "thân",
            "start": 79.12,
            "end": 79.73
          },
          {
            "word": "quen",
            "start": 79.73,
            "end": 80.34
          },
          {
            "word": "ở",
            "start": 80.34,
            "end": 80.64
          },
          {
            "word": "ngay",
            "start": 80.64,
            "end": 81.25
          },
          {
            "word": "nơi",
            "start": 81.25,
            "end": 81.71
          },
          {
            "word": "lạ",
            "start": 81.71,
            "end": 82.01
          }
        ]
      },
      {
        "id": 29,
        "startTime": 82.1,
        "endTime": 84.1,
        "nextLineTime": 84.2,
        "text": "Chân thành giản đơn",
        "words": [
          {
            "word": "Chân",
            "start": 82.1,
            "end": 82.6
          },
          {
            "word": "thành",
            "start": 82.6,
            "end": 83.22
          },
          {
            "word": "giản",
            "start": 83.22,
            "end": 83.72
          },
          {
            "word": "đơn",
            "start": 83.72,
            "end": 84.09
          }
        ]
      },
      {
        "id": 30,
        "startTime": 84.2,
        "endTime": 86.3,
        "nextLineTime": 86.4,
        "text": "Mà vô vàn điều quý giá",
        "words": [
          {
            "word": "Mà",
            "start": 84.2,
            "end": 84.45
          },
          {
            "word": "vô",
            "start": 84.45,
            "end": 84.7
          },
          {
            "word": "vàn",
            "start": 84.7,
            "end": 85.07
          },
          {
            "word": "điều",
            "start": 85.07,
            "end": 85.56
          },
          {
            "word": "quý",
            "start": 85.56,
            "end": 85.93
          },
          {
            "word": "giá",
            "start": 85.93,
            "end": 86.3
          }
        ]
      },
      {
        "id": 31,
        "startTime": 86.4,
        "endTime": 89.1,
        "nextLineTime": 89.2,
        "text": "Thả hồn thơ ngây để ta bình yên",
        "words": [
          {
            "word": "Thả",
            "start": 86.4,
            "end": 86.74
          },
          {
            "word": "hồn",
            "start": 86.74,
            "end": 87.08
          },
          {
            "word": "thơ",
            "start": 87.08,
            "end": 87.42
          },
          {
            "word": "ngây",
            "start": 87.42,
            "end": 87.87
          },
          {
            "word": "để",
            "start": 87.87,
            "end": 88.09
          },
          {
            "word": "ta",
            "start": 88.09,
            "end": 88.31
          },
          {
            "word": "bình",
            "start": 88.31,
            "end": 88.76
          },
          {
            "word": "yên",
            "start": 88.76,
            "end": 89.1
          }
        ]
      },
      {
        "id": 32,
        "startTime": 89.2,
        "endTime": 93.1,
        "nextLineTime": 93.2,
        "text": "Cùng nhau sống những ngày trời bao la",
        "words": [
          {
            "word": "Cùng",
            "start": 89.2,
            "end": 89.72
          },
          {
            "word": "nhau",
            "start": 89.72,
            "end": 90.24
          },
          {
            "word": "sống",
            "start": 90.24,
            "end": 90.76
          },
          {
            "word": "những",
            "start": 90.76,
            "end": 91.41
          },
          {
            "word": "ngày",
            "start": 91.41,
            "end": 91.93
          },
          {
            "word": "trời",
            "start": 91.93,
            "end": 92.45
          },
          {
            "word": "bao",
            "start": 92.45,
            "end": 92.84
          },
          {
            "word": "la",
            "start": 92.84,
            "end": 93.1
          }
        ]
      },
      {
        "id": 33,
        "startTime": 93.2,
        "endTime": 95.3,
        "nextLineTime": 95.4,
        "text": "Và ta sẽ thấy người dân Việt Nam",
        "words": [
          {
            "word": "Và",
            "start": 93.2,
            "end": 93.37
          },
          {
            "word": "ta",
            "start": 93.37,
            "end": 93.54
          },
          {
            "word": "sẽ",
            "start": 93.54,
            "end": 93.71
          },
          {
            "word": "thấy",
            "start": 93.71,
            "end": 94.05
          },
          {
            "word": "người",
            "start": 94.05,
            "end": 94.47
          },
          {
            "word": "dân",
            "start": 94.47,
            "end": 94.72
          },
          {
            "word": "Việt",
            "start": 94.72,
            "end": 95.06
          },
          {
            "word": "Nam",
            "start": 95.06,
            "end": 95.31
          }
        ]
      },
      {
        "id": 34,
        "startTime": 95.4,
        "endTime": 97.4,
        "nextLineTime": 97.5,
        "text": "Ở muôn hướng",
        "words": [
          {
            "word": "Ở",
            "start": 95.4,
            "end": 95.76
          },
          {
            "word": "muôn",
            "start": 95.76,
            "end": 96.49
          },
          {
            "word": "hướng",
            "start": 96.49,
            "end": 97.4
          }
        ]
      },
      {
        "id": 35,
        "startTime": 97.5,
        "endTime": 101.6,
        "nextLineTime": 101.7,
        "text": "Bình thường mà rất phi thường",
        "words": [
          {
            "word": "Bình",
            "start": 97.5,
            "end": 98.18
          },
          {
            "word": "thường",
            "start": 98.18,
            "end": 99.21
          },
          {
            "word": "mà",
            "start": 99.21,
            "end": 99.55
          },
          {
            "word": "rất",
            "start": 99.55,
            "end": 100.06
          },
          {
            "word": "phi",
            "start": 100.06,
            "end": 100.57
          },
          {
            "word": "thường",
            "start": 100.57,
            "end": 101.59
          }
        ]
      },
      {
        "id": 36,
        "startTime": 101.7,
        "endTime": 103.7,
        "nextLineTime": 103.8,
        "text": "Bình thường mà phi thường",
        "words": [
          {
            "word": "Bình",
            "start": 101.7,
            "end": 102.08
          },
          {
            "word": "thường",
            "start": 102.08,
            "end": 102.65
          },
          {
            "word": "mà",
            "start": 102.65,
            "end": 102.84
          },
          {
            "word": "phi",
            "start": 102.84,
            "end": 103.13
          },
          {
            "word": "thường",
            "start": 103.13,
            "end": 103.7
          }
        ]
      },
      {
        "id": 37,
        "startTime": 103.8,
        "endTime": 105.9,
        "nextLineTime": 106.0,
        "text": "Người thường mà phi phàm",
        "words": [
          {
            "word": "Người",
            "start": 103.8,
            "end": 104.33
          },
          {
            "word": "thường",
            "start": 104.33,
            "end": 104.96
          },
          {
            "word": "mà",
            "start": 104.96,
            "end": 105.17
          },
          {
            "word": "phi",
            "start": 105.17,
            "end": 105.48
          },
          {
            "word": "phàm",
            "start": 105.48,
            "end": 105.9
          }
        ]
      },
      {
        "id": 38,
        "startTime": 106.0,
        "endTime": 108.0,
        "nextLineTime": 108.1,
        "text": "Nào cùng gia đình Haha",
        "words": [
          {
            "word": "Nào",
            "start": 106.0,
            "end": 106.33
          },
          {
            "word": "cùng",
            "start": 106.33,
            "end": 106.77
          },
          {
            "word": "gia",
            "start": 106.77,
            "end": 107.1
          },
          {
            "word": "đình",
            "start": 107.1,
            "end": 107.54
          },
          {
            "word": "Haha",
            "start": 107.54,
            "end": 107.98
          }
        ]
      },
      {
        "id": 39,
        "startTime": 108.1,
        "endTime": 110.1,
        "nextLineTime": 110.2,
        "text": "Mình làm nông dân nhá!",
        "words": [
          {
            "word": "Mình",
            "start": 108.1,
            "end": 108.54
          },
          {
            "word": "làm",
            "start": 108.54,
            "end": 108.87
          },
          {
            "word": "nông",
            "start": 108.87,
            "end": 109.31
          },
          {
            "word": "dân",
            "start": 109.31,
            "end": 109.64
          },
          {
            "word": "nhá!",
            "start": 109.64,
            "end": 110.08
          }
        ]
      },
      {
        "id": 40,
        "startTime": 110.2,
        "endTime": 112.0,
        "nextLineTime": 112.1,
        "text": "Yeah! Tối ngày tất bật",
        "words": [
          {
            "word": "Yeah!",
            "start": 110.2,
            "end": 110.7
          },
          {
            "word": "Tối",
            "start": 110.7,
            "end": 111.0
          },
          {
            "word": "ngày",
            "start": 111.0,
            "end": 111.4
          },
          {
            "word": "tất",
            "start": 111.4,
            "end": 111.7
          },
          {
            "word": "bật",
            "start": 111.7,
            "end": 112.0
          }
        ]
      },
      {
        "id": 41,
        "startTime": 112.1,
        "endTime": 114.2,
        "nextLineTime": 114.3,
        "text": "Cứ mài thân mình vào với gió sương",
        "words": [
          {
            "word": "Cứ",
            "start": 112.1,
            "end": 112.26
          },
          {
            "word": "mài",
            "start": 112.26,
            "end": 112.49
          },
          {
            "word": "thân",
            "start": 112.49,
            "end": 112.8
          },
          {
            "word": "mình",
            "start": 112.8,
            "end": 113.11
          },
          {
            "word": "vào",
            "start": 113.11,
            "end": 113.34
          },
          {
            "word": "với",
            "start": 113.34,
            "end": 113.57
          },
          {
            "word": "gió",
            "start": 113.57,
            "end": 113.8
          },
          {
            "word": "sương",
            "start": 113.8,
            "end": 114.19
          }
        ]
      },
      {
        "id": 42,
        "startTime": 114.3,
        "endTime": 116.4,
        "nextLineTime": 116.5,
        "text": "Vẫn kịp cảm nhận sắc đẹp hữu tình",
        "words": [
          {
            "word": "Vẫn",
            "start": 114.3,
            "end": 114.54
          },
          {
            "word": "kịp",
            "start": 114.54,
            "end": 114.78
          },
          {
            "word": "cảm",
            "start": 114.78,
            "end": 115.02
          },
          {
            "word": "nhận",
            "start": 115.02,
            "end": 115.34
          },
          {
            "word": "sắc",
            "start": 115.34,
            "end": 115.58
          },
          {
            "word": "đẹp",
            "start": 115.58,
            "end": 115.82
          },
          {
            "word": "hữu",
            "start": 115.82,
            "end": 116.06
          },
          {
            "word": "tình",
            "start": 116.06,
            "end": 116.38
          }
        ]
      },
      {
        "id": 43,
        "startTime": 116.5,
        "endTime": 118.5,
        "nextLineTime": 118.6,
        "text": "Của ba miền quê hương",
        "words": [
          {
            "word": "Của",
            "start": 116.5,
            "end": 116.85
          },
          {
            "word": "ba",
            "start": 116.85,
            "end": 117.09
          },
          {
            "word": "miền",
            "start": 117.09,
            "end": 117.56
          },
          {
            "word": "quê",
            "start": 117.56,
            "end": 117.91
          },
          {
            "word": "hương",
            "start": 117.91,
            "end": 118.5
          }
        ]
      },
      {
        "id": 44,
        "startTime": 118.6,
        "endTime": 120.7,
        "nextLineTime": 120.8,
        "text": "Ngắm đồng lúa vàng sẵn một khung trời",
        "words": [
          {
            "word": "Ngắm",
            "start": 118.6,
            "end": 118.88
          },
          {
            "word": "đồng",
            "start": 118.88,
            "end": 119.16
          },
          {
            "word": "lúa",
            "start": 119.16,
            "end": 119.37
          },
          {
            "word": "vàng",
            "start": 119.37,
            "end": 119.65
          },
          {
            "word": "sẵn",
            "start": 119.65,
            "end": 119.86
          },
          {
            "word": "một",
            "start": 119.86,
            "end": 120.07
          },
          {
            "word": "khung",
            "start": 120.07,
            "end": 120.42
          },
          {
            "word": "trời",
            "start": 120.42,
            "end": 120.7
          }
        ]
      },
      {
        "id": 45,
        "startTime": 120.8,
        "endTime": 122.7,
        "nextLineTime": 122.8,
        "text": "Rộng lớn để ươm",
        "words": [
          {
            "word": "Rộng",
            "start": 120.8,
            "end": 121.43
          },
          {
            "word": "lớn",
            "start": 121.43,
            "end": 121.91
          },
          {
            "word": "để",
            "start": 121.91,
            "end": 122.23
          },
          {
            "word": "ươm",
            "start": 122.23,
            "end": 122.7
          }
        ]
      },
      {
        "id": 46,
        "startTime": 122.8,
        "endTime": 124.9,
        "nextLineTime": 125.0,
        "text": "Nghe sự tất bật vào mỗi sáng sớm",
        "words": [
          {
            "word": "Nghe",
            "start": 122.8,
            "end": 123.14
          },
          {
            "word": "sự",
            "start": 123.14,
            "end": 123.31
          },
          {
            "word": "tất",
            "start": 123.31,
            "end": 123.56
          },
          {
            "word": "bật",
            "start": 123.56,
            "end": 123.81
          },
          {
            "word": "vào",
            "start": 123.81,
            "end": 124.06
          },
          {
            "word": "mỗi",
            "start": 124.06,
            "end": 124.31
          },
          {
            "word": "sáng",
            "start": 124.31,
            "end": 124.65
          },
          {
            "word": "sớm",
            "start": 124.65,
            "end": 124.9
          }
        ]
      },
      {
        "id": 47,
        "startTime": 125.0,
        "endTime": 127.0,
        "nextLineTime": 127.1,
        "text": "Những tiếng gắt gỏng chứa tình mến thương",
        "words": [
          {
            "word": "Những",
            "start": 125.0,
            "end": 125.29
          },
          {
            "word": "tiếng",
            "start": 125.29,
            "end": 125.58
          },
          {
            "word": "gắt",
            "start": 125.58,
            "end": 125.76
          },
          {
            "word": "gỏng",
            "start": 125.76,
            "end": 126.0
          },
          {
            "word": "chứa",
            "start": 126.0,
            "end": 126.24
          },
          {
            "word": "tình",
            "start": 126.24,
            "end": 126.48
          },
          {
            "word": "mến",
            "start": 126.48,
            "end": 126.66
          },
          {
            "word": "thương",
            "start": 126.66,
            "end": 127.01
          }
        ]
      },
      {
        "id": 48,
        "startTime": 127.1,
        "endTime": 129.2,
        "nextLineTime": 129.3,
        "text": "Những mâm cơm ngon từ anh cả Thuận",
        "words": [
          {
            "word": "Những",
            "start": 127.1,
            "end": 127.49
          },
          {
            "word": "mâm",
            "start": 127.49,
            "end": 127.72
          },
          {
            "word": "cơm",
            "start": 127.72,
            "end": 127.95
          },
          {
            "word": "ngon",
            "start": 127.95,
            "end": 128.26
          },
          {
            "word": "từ",
            "start": 128.26,
            "end": 128.42
          },
          {
            "word": "anh",
            "start": 128.42,
            "end": 128.65
          },
          {
            "word": "cả",
            "start": 128.65,
            "end": 128.81
          },
          {
            "word": "Thuận",
            "start": 128.81,
            "end": 129.2
          }
        ]
      },
      {
        "id": 49,
        "startTime": 129.3,
        "endTime": 131.3,
        "nextLineTime": 131.4,
        "text": "Sau một ngày lao động dãi nắng mưa dầm",
        "words": [
          {
            "word": "Sau",
            "start": 129.3,
            "end": 129.5
          },
          {
            "word": "một",
            "start": 129.5,
            "end": 129.7
          },
          {
            "word": "ngày",
            "start": 129.7,
            "end": 129.97
          },
          {
            "word": "lao",
            "start": 129.97,
            "end": 130.17
          },
          {
            "word": "động",
            "start": 130.17,
            "end": 130.44
          },
          {
            "word": "dãi",
            "start": 130.44,
            "end": 130.64
          },
          {
            "word": "nắng",
            "start": 130.64,
            "end": 130.91
          },
          {
            "word": "mưa",
            "start": 130.91,
            "end": 131.11
          },
          {
            "word": "dầm",
            "start": 131.11,
            "end": 131.31
          }
        ]
      },
      {
        "id": 50,
        "startTime": 131.4,
        "endTime": 132.4,
        "nextLineTime": 132.5,
        "text": "Hai Thiện và Ba Nam",
        "words": [
          {
            "word": "Hai",
            "start": 131.4,
            "end": 131.6
          },
          {
            "word": "Thiện",
            "start": 131.6,
            "end": 131.93
          },
          {
            "word": "và",
            "start": 131.93,
            "end": 132.06
          },
          {
            "word": "Ba",
            "start": 132.06,
            "end": 132.19
          },
          {
            "word": "Nam",
            "start": 132.19,
            "end": 132.39
          }
        ]
      },
      {
        "id": 51,
        "startTime": 132.5,
        "endTime": 133.5,
        "nextLineTime": 133.6,
        "text": "Cùng những màn tranh luận",
        "words": [
          {
            "word": "Cùng",
            "start": 132.5,
            "end": 132.69
          },
          {
            "word": "những",
            "start": 132.69,
            "end": 132.93
          },
          {
            "word": "màn",
            "start": 132.93,
            "end": 133.07
          },
          {
            "word": "tranh",
            "start": 133.07,
            "end": 133.31
          },
          {
            "word": "luận",
            "start": 133.31,
            "end": 133.5
          }
        ]
      },
      {
        "id": 52,
        "startTime": 133.6,
        "endTime": 135.6,
        "nextLineTime": 135.7,
        "text": "Xem ai phải rửa bát, Út Khánh hay Tư Tâm?",
        "words": [
          {
            "word": "Xem",
            "start": 133.6,
            "end": 133.79
          },
          {
            "word": "ai",
            "start": 133.79,
            "end": 133.92
          },
          {
            "word": "phải",
            "start": 133.92,
            "end": 134.18
          },
          {
            "word": "rửa",
            "start": 134.18,
            "end": 134.37
          },
          {
            "word": "bát,",
            "start": 134.37,
            "end": 134.56
          },
          {
            "word": "Út",
            "start": 134.56,
            "end": 134.69
          },
          {
            "word": "Khánh",
            "start": 134.69,
            "end": 135.01
          },
          {
            "word": "hay",
            "start": 135.01,
            "end": 135.2
          },
          {
            "word": "Tư",
            "start": 135.2,
            "end": 135.33
          },
          {
            "word": "Tâm?",
            "start": 135.33,
            "end": 135.59
          }
        ]
      },
      {
        "id": 53,
        "startTime": 135.7,
        "endTime": 137.8,
        "nextLineTime": 137.9,
        "text": "Việc nhỏ việc lớn có anh em đỡ đần",
        "words": [
          {
            "word": "Việc",
            "start": 135.7,
            "end": 136.02
          },
          {
            "word": "nhỏ",
            "start": 136.02,
            "end": 136.26
          },
          {
            "word": "việc",
            "start": 136.26,
            "end": 136.58
          },
          {
            "word": "lớn",
            "start": 136.58,
            "end": 136.82
          },
          {
            "word": "có",
            "start": 136.82,
            "end": 136.98
          },
          {
            "word": "anh",
            "start": 136.98,
            "end": 137.22
          },
          {
            "word": "em",
            "start": 137.22,
            "end": 137.38
          },
          {
            "word": "đỡ",
            "start": 137.38,
            "end": 137.54
          },
          {
            "word": "đần",
            "start": 137.54,
            "end": 137.78
          }
        ]
      },
      {
        "id": 54,
        "startTime": 137.9,
        "endTime": 138.8,
        "nextLineTime": 138.9,
        "text": "Nếu thấy gian nan",
        "words": [
          {
            "word": "Nếu",
            "start": 137.9,
            "end": 138.09
          },
          {
            "word": "thấy",
            "start": 138.09,
            "end": 138.35
          },
          {
            "word": "gian",
            "start": 138.35,
            "end": 138.61
          },
          {
            "word": "nan",
            "start": 138.61,
            "end": 138.8
          }
        ]
      },
      {
        "id": 55,
        "startTime": 138.9,
        "endTime": 139.9,
        "nextLineTime": 140.0,
        "text": "Mỗi người một tay một chân",
        "words": [
          {
            "word": "Mỗi",
            "start": 138.9,
            "end": 139.04
          },
          {
            "word": "người",
            "start": 139.04,
            "end": 139.28
          },
          {
            "word": "một",
            "start": 139.28,
            "end": 139.42
          },
          {
            "word": "tay",
            "start": 139.42,
            "end": 139.56
          },
          {
            "word": "một",
            "start": 139.56,
            "end": 139.7
          },
          {
            "word": "chân",
            "start": 139.7,
            "end": 139.89
          }
        ]
      },
      {
        "id": 56,
        "startTime": 140.0,
        "endTime": 142.1,
        "nextLineTime": 142.2,
        "text": "Thi nhau đón nắng ấm như cây con mọc mầm",
        "words": [
          {
            "word": "Thi",
            "start": 140.0,
            "end": 140.2
          },
          {
            "word": "nhau",
            "start": 140.2,
            "end": 140.47
          },
          {
            "word": "đón",
            "start": 140.47,
            "end": 140.67
          },
          {
            "word": "nắng",
            "start": 140.67,
            "end": 140.94
          },
          {
            "word": "ấm",
            "start": 140.94,
            "end": 141.08
          },
          {
            "word": "như",
            "start": 141.08,
            "end": 141.28
          },
          {
            "word": "cây",
            "start": 141.28,
            "end": 141.48
          },
          {
            "word": "con",
            "start": 141.48,
            "end": 141.68
          },
          {
            "word": "mọc",
            "start": 141.68,
            "end": 141.88
          },
          {
            "word": "mầm",
            "start": 141.88,
            "end": 142.08
          }
        ]
      },
      {
        "id": 57,
        "startTime": 142.2,
        "endTime": 144.2,
        "nextLineTime": 144.3,
        "text": "Cho nụ cười tươi tắn quanh năm",
        "words": [
          {
            "word": "Cho",
            "start": 142.2,
            "end": 142.45
          },
          {
            "word": "nụ",
            "start": 142.45,
            "end": 142.62
          },
          {
            "word": "cười",
            "start": 142.62,
            "end": 142.95
          },
          {
            "word": "tươi",
            "start": 142.95,
            "end": 143.28
          },
          {
            "word": "tắn",
            "start": 143.28,
            "end": 143.53
          },
          {
            "word": "quanh",
            "start": 143.53,
            "end": 143.95
          },
          {
            "word": "năm",
            "start": 143.95,
            "end": 144.2
          }
        ]
      },
      {
        "id": 58,
        "startTime": 144.3,
        "endTime": 146.3,
        "nextLineTime": 146.4,
        "text": "Và mình cùng hát, mình cùng ở",
        "words": [
          {
            "word": "Và",
            "start": 144.3,
            "end": 144.47
          },
          {
            "word": "mình",
            "start": 144.47,
            "end": 144.82
          },
          {
            "word": "cùng",
            "start": 144.82,
            "end": 145.17
          },
          {
            "word": "hát,",
            "start": 145.17,
            "end": 145.43
          },
          {
            "word": "mình",
            "start": 145.43,
            "end": 145.78
          },
          {
            "word": "cùng",
            "start": 145.78,
            "end": 146.13
          },
          {
            "word": "ở",
            "start": 146.13,
            "end": 146.3
          }
        ]
      },
      {
        "id": 59,
        "startTime": 146.4,
        "endTime": 148.5,
        "nextLineTime": 148.6,
        "text": "Cùng làm với những nông dân",
        "words": [
          {
            "word": "Cùng",
            "start": 146.4,
            "end": 146.78
          },
          {
            "word": "làm",
            "start": 146.78,
            "end": 147.07
          },
          {
            "word": "với",
            "start": 147.07,
            "end": 147.36
          },
          {
            "word": "những",
            "start": 147.36,
            "end": 147.84
          },
          {
            "word": "nông",
            "start": 147.84,
            "end": 148.22
          },
          {
            "word": "dân",
            "start": 148.22,
            "end": 148.51
          }
        ]
      },
      {
        "id": 60,
        "startTime": 148.6,
        "endTime": 150.6,
        "nextLineTime": 150.7,
        "text": "Cùng vui cùng sống, chung hơi thở",
        "words": [
          {
            "word": "Cùng",
            "start": 148.6,
            "end": 148.91
          },
          {
            "word": "vui",
            "start": 148.91,
            "end": 149.14
          },
          {
            "word": "cùng",
            "start": 149.14,
            "end": 149.45
          },
          {
            "word": "sống,",
            "start": 149.45,
            "end": 149.76
          },
          {
            "word": "chung",
            "start": 149.76,
            "end": 150.14
          },
          {
            "word": "hơi",
            "start": 150.14,
            "end": 150.37
          },
          {
            "word": "thở",
            "start": 150.37,
            "end": 150.6
          }
        ]
      },
      {
        "id": 61,
        "startTime": 150.7,
        "endTime": 152.7,
        "nextLineTime": 152.8,
        "text": "Từ miền xa đến nơi gần",
        "words": [
          {
            "word": "Từ",
            "start": 150.7,
            "end": 150.94
          },
          {
            "word": "miền",
            "start": 150.94,
            "end": 151.41
          },
          {
            "word": "xa",
            "start": 151.41,
            "end": 151.65
          },
          {
            "word": "đến",
            "start": 151.65,
            "end": 152.0
          },
          {
            "word": "nơi",
            "start": 152.0,
            "end": 152.35
          },
          {
            "word": "gần",
            "start": 152.35,
            "end": 152.7
          }
        ]
      },
      {
        "id": 62,
        "startTime": 152.8,
        "endTime": 154.9,
        "nextLineTime": 155.0,
        "text": "Ta sẽ được thấy, được hiểu những điều",
        "words": [
          {
            "word": "Ta",
            "start": 152.8,
            "end": 152.94
          },
          {
            "word": "sẽ",
            "start": 152.94,
            "end": 153.08
          },
          {
            "word": "được",
            "start": 153.08,
            "end": 153.37
          },
          {
            "word": "thấy,",
            "start": 153.37,
            "end": 153.66
          },
          {
            "word": "được",
            "start": 153.66,
            "end": 153.95
          },
          {
            "word": "hiểu",
            "start": 153.95,
            "end": 154.24
          },
          {
            "word": "những",
            "start": 154.24,
            "end": 154.6
          },
          {
            "word": "điều",
            "start": 154.6,
            "end": 154.89
          }
        ]
      },
      {
        "id": 63,
        "startTime": 155.0,
        "endTime": 156.8,
        "nextLineTime": 156.9,
        "text": "Bình thường mà lại rất phi thường",
        "words": [
          {
            "word": "Bình",
            "start": 155.0,
            "end": 155.27
          },
          {
            "word": "thường",
            "start": 155.27,
            "end": 155.67
          },
          {
            "word": "mà",
            "start": 155.67,
            "end": 155.8
          },
          {
            "word": "lại",
            "start": 155.8,
            "end": 156.0
          },
          {
            "word": "rất",
            "start": 156.0,
            "end": 156.2
          },
          {
            "word": "phi",
            "start": 156.2,
            "end": 156.4
          },
          {
            "word": "thường",
            "start": 156.4,
            "end": 156.8
          }
        ]
      },
      {
        "id": 64,
        "startTime": 156.9,
        "endTime": 158.2,
        "nextLineTime": 158.3,
        "text": "Gia đình Haha bắt đầu nha!",
        "words": [
          {
            "word": "Gia",
            "start": 156.9,
            "end": 157.09
          },
          {
            "word": "đình",
            "start": 157.09,
            "end": 157.34
          },
          {
            "word": "Haha",
            "start": 157.34,
            "end": 157.59
          },
          {
            "word": "bắt",
            "start": 157.59,
            "end": 157.78
          },
          {
            "word": "đầu",
            "start": 157.78,
            "end": 157.97
          },
          {
            "word": "nha!",
            "start": 157.97,
            "end": 158.22
          }
        ]
      },
      {
        "id": 65,
        "startTime": 158.3,
        "endTime": 159.2,
        "nextLineTime": 159.3,
        "text": "Sẵn sàng chưa?",
        "words": [
          {
            "word": "Sẵn",
            "start": 158.3,
            "end": 158.53
          },
          {
            "word": "sàng",
            "start": 158.53,
            "end": 158.83
          },
          {
            "word": "chưa?",
            "start": 158.83,
            "end": 159.21
          }
        ]
      },
      {
        "id": 66,
        "startTime": 159.3,
        "endTime": 163.5,
        "nextLineTime": 163.6,
        "text": "Đón lấy nắng sớm phía bên kia chân đồi",
        "words": [
          {
            "word": "Đón",
            "start": 159.3,
            "end": 159.72
          },
          {
            "word": "lấy",
            "start": 159.72,
            "end": 160.14
          },
          {
            "word": "nắng",
            "start": 160.14,
            "end": 160.7
          },
          {
            "word": "sớm",
            "start": 160.7,
            "end": 161.12
          },
          {
            "word": "phía",
            "start": 161.12,
            "end": 161.68
          },
          {
            "word": "bên",
            "start": 161.68,
            "end": 162.1
          },
          {
            "word": "kia",
            "start": 162.1,
            "end": 162.52
          },
          {
            "word": "chân",
            "start": 162.52,
            "end": 163.08
          },
          {
            "word": "đồi",
            "start": 163.08,
            "end": 163.5
          }
        ]
      },
      {
        "id": 67,
        "startTime": 163.6,
        "endTime": 165.6,
        "nextLineTime": 165.7,
        "text": "Từ từ thôi hít hết gió mát",
        "words": [
          {
            "word": "Từ",
            "start": 163.6,
            "end": 163.8
          },
          {
            "word": "từ",
            "start": 163.8,
            "end": 164.0
          },
          {
            "word": "thôi",
            "start": 164.0,
            "end": 164.4
          },
          {
            "word": "hít",
            "start": 164.4,
            "end": 164.7
          },
          {
            "word": "hết",
            "start": 164.7,
            "end": 165.0
          },
          {
            "word": "gió",
            "start": 165.0,
            "end": 165.3
          },
          {
            "word": "mát",
            "start": 165.3,
            "end": 165.6
          }
        ]
      },
      {
        "id": 68,
        "startTime": 165.7,
        "endTime": 167.7,
        "nextLineTime": 167.8,
        "text": "Ngay nơi ta ngồi",
        "words": [
          {
            "word": "Ngay",
            "start": 165.7,
            "end": 166.32
          },
          {
            "word": "nơi",
            "start": 166.32,
            "end": 166.78
          },
          {
            "word": "ta",
            "start": 166.78,
            "end": 167.09
          },
          {
            "word": "ngồi",
            "start": 167.09,
            "end": 167.71
          }
        ]
      },
      {
        "id": 69,
        "startTime": 167.8,
        "endTime": 170.1,
        "nextLineTime": 170.2,
        "text": "Xỏ giày vào chân ngay, xắn tay lên!",
        "words": [
          {
            "word": "Xỏ",
            "start": 167.8,
            "end": 167.97
          },
          {
            "word": "giày",
            "start": 167.97,
            "end": 168.31
          },
          {
            "word": "vào",
            "start": 168.31,
            "end": 168.57
          },
          {
            "word": "chân",
            "start": 168.57,
            "end": 168.91
          },
          {
            "word": "ngay,",
            "start": 168.91,
            "end": 169.25
          },
          {
            "word": "xắn",
            "start": 169.25,
            "end": 169.51
          },
          {
            "word": "tay",
            "start": 169.51,
            "end": 169.77
          },
          {
            "word": "lên!",
            "start": 169.77,
            "end": 170.11
          }
        ]
      },
      {
        "id": 70,
        "startTime": 170.2,
        "endTime": 172.3,
        "nextLineTime": 172.4,
        "text": "Theo nhau ta bắt đầu viết nên",
        "words": [
          {
            "word": "Theo",
            "start": 170.2,
            "end": 170.57
          },
          {
            "word": "nhau",
            "start": 170.57,
            "end": 170.94
          },
          {
            "word": "ta",
            "start": 170.94,
            "end": 171.12
          },
          {
            "word": "bắt",
            "start": 171.12,
            "end": 171.39
          },
          {
            "word": "đầu",
            "start": 171.39,
            "end": 171.66
          },
          {
            "word": "viết",
            "start": 171.66,
            "end": 172.03
          },
          {
            "word": "nên",
            "start": 172.03,
            "end": 172.3
          }
        ]
      },
      {
        "id": 71,
        "startTime": 172.4,
        "endTime": 174.3,
        "nextLineTime": 174.4,
        "text": "Hành trình ở đây! Nhìn kìa em!",
        "words": [
          {
            "word": "Hành",
            "start": 172.4,
            "end": 172.7
          },
          {
            "word": "trình",
            "start": 172.7,
            "end": 173.08
          },
          {
            "word": "ở",
            "start": 173.08,
            "end": 173.23
          },
          {
            "word": "đây!",
            "start": 173.23,
            "end": 173.53
          },
          {
            "word": "Nhìn",
            "start": 173.53,
            "end": 173.83
          },
          {
            "word": "kìa",
            "start": 173.83,
            "end": 174.06
          },
          {
            "word": "em!",
            "start": 174.06,
            "end": 174.29
          }
        ]
      },
      {
        "id": 72,
        "startTime": 174.4,
        "endTime": 178.5,
        "nextLineTime": 178.6,
        "text": "Bao nhiêu thân quen ở ngay nơi lạ",
        "words": [
          {
            "word": "Bao",
            "start": 174.4,
            "end": 174.86
          },
          {
            "word": "nhiêu",
            "start": 174.86,
            "end": 175.62
          },
          {
            "word": "thân",
            "start": 175.62,
            "end": 176.23
          },
          {
            "word": "quen",
            "start": 176.23,
            "end": 176.84
          },
          {
            "word": "ở",
            "start": 176.84,
            "end": 177.14
          },
          {
            "word": "ngay",
            "start": 177.14,
            "end": 177.75
          },
          {
            "word": "nơi",
            "start": 177.75,
            "end": 178.21
          },
          {
            "word": "lạ",
            "start": 178.21,
            "end": 178.51
          }
        ]
      },
      {
        "id": 73,
        "startTime": 178.6,
        "endTime": 180.6,
        "nextLineTime": 180.7,
        "text": "Chân thành giản đơn",
        "words": [
          {
            "word": "Chân",
            "start": 178.6,
            "end": 179.1
          },
          {
            "word": "thành",
            "start": 179.1,
            "end": 179.72
          },
          {
            "word": "giản",
            "start": 179.72,
            "end": 180.22
          },
          {
            "word": "đơn",
            "start": 180.22,
            "end": 180.59
          }
        ]
      },
      {
        "id": 74,
        "startTime": 180.7,
        "endTime": 182.7,
        "nextLineTime": 182.8,
        "text": "Mà vô vàn điều quý giá",
        "words": [
          {
            "word": "Mà",
            "start": 180.7,
            "end": 180.94
          },
          {
            "word": "vô",
            "start": 180.94,
            "end": 181.18
          },
          {
            "word": "vàn",
            "start": 181.18,
            "end": 181.53
          },
          {
            "word": "điều",
            "start": 181.53,
            "end": 182.0
          },
          {
            "word": "quý",
            "start": 182.0,
            "end": 182.35
          },
          {
            "word": "giá",
            "start": 182.35,
            "end": 182.7
          }
        ]
      },
      {
        "id": 75,
        "startTime": 182.8,
        "endTime": 185.4,
        "nextLineTime": 185.5,
        "text": "Thả hồn thơ ngây để ta bình yên",
        "words": [
          {
            "word": "Thả",
            "start": 182.8,
            "end": 183.12
          },
          {
            "word": "hồn",
            "start": 183.12,
            "end": 183.44
          },
          {
            "word": "thơ",
            "start": 183.44,
            "end": 183.76
          },
          {
            "word": "ngây",
            "start": 183.76,
            "end": 184.19
          },
          {
            "word": "để",
            "start": 184.19,
            "end": 184.41
          },
          {
            "word": "ta",
            "start": 184.41,
            "end": 184.63
          },
          {
            "word": "bình",
            "start": 184.63,
            "end": 185.06
          },
          {
            "word": "yên",
            "start": 185.06,
            "end": 185.38
          }
        ]
      },
      {
        "id": 76,
        "startTime": 185.5,
        "endTime": 188.1,
        "nextLineTime": 188.2,
        "text": "Cùng nhau sống những ngày trời bao la",
        "words": [
          {
            "word": "Cùng",
            "start": 185.5,
            "end": 185.85
          },
          {
            "word": "nhau",
            "start": 185.85,
            "end": 186.2
          },
          {
            "word": "sống",
            "start": 186.2,
            "end": 186.55
          },
          {
            "word": "những",
            "start": 186.55,
            "end": 186.98
          },
          {
            "word": "ngày",
            "start": 186.98,
            "end": 187.33
          },
          {
            "word": "trời",
            "start": 187.33,
            "end": 187.68
          },
          {
            "word": "bao",
            "start": 187.68,
            "end": 187.94
          },
          {
            "word": "la",
            "start": 187.94,
            "end": 188.11
          }
        ]
      },
      {
        "id": 77,
        "startTime": 188.2,
        "endTime": 189.2,
        "nextLineTime": 189.3,
        "text": "Let's go!",
        "words": [
          {
            "word": "Let's",
            "start": 188.2,
            "end": 188.82
          },
          {
            "word": "go!",
            "start": 188.82,
            "end": 189.19
          }
        ]
      },
      {
        "id": 78,
        "startTime": 189.3,
        "endTime": 193.5,
        "nextLineTime": 193.6,
        "text": "Đón lấy nắng sớm phía bên kia chân đồi",
        "words": [
          {
            "word": "Đón",
            "start": 189.3,
            "end": 189.72
          },
          {
            "word": "lấy",
            "start": 189.72,
            "end": 190.14
          },
          {
            "word": "nắng",
            "start": 190.14,
            "end": 190.7
          },
          {
            "word": "sớm",
            "start": 190.7,
            "end": 191.12
          },
          {
            "word": "phía",
            "start": 191.12,
            "end": 191.68
          },
          {
            "word": "bên",
            "start": 191.68,
            "end": 192.1
          },
          {
            "word": "kia",
            "start": 192.1,
            "end": 192.52
          },
          {
            "word": "chân",
            "start": 192.52,
            "end": 193.08
          },
          {
            "word": "đồi",
            "start": 193.08,
            "end": 193.5
          }
        ]
      },
      {
        "id": 79,
        "startTime": 193.6,
        "endTime": 195.6,
        "nextLineTime": 195.7,
        "text": "Từ từ thôi hít hết gió mát",
        "words": [
          {
            "word": "Từ",
            "start": 193.6,
            "end": 193.8
          },
          {
            "word": "từ",
            "start": 193.8,
            "end": 194.0
          },
          {
            "word": "thôi",
            "start": 194.0,
            "end": 194.4
          },
          {
            "word": "hít",
            "start": 194.4,
            "end": 194.7
          },
          {
            "word": "hết",
            "start": 194.7,
            "end": 195.0
          },
          {
            "word": "gió",
            "start": 195.0,
            "end": 195.3
          },
          {
            "word": "mát",
            "start": 195.3,
            "end": 195.6
          }
        ]
      },
      {
        "id": 80,
        "startTime": 195.7,
        "endTime": 197.7,
        "nextLineTime": 197.8,
        "text": "Ngay nơi ta ngồi",
        "words": [
          {
            "word": "Ngay",
            "start": 195.7,
            "end": 196.32
          },
          {
            "word": "nơi",
            "start": 196.32,
            "end": 196.78
          },
          {
            "word": "ta",
            "start": 196.78,
            "end": 197.09
          },
          {
            "word": "ngồi",
            "start": 197.09,
            "end": 197.71
          }
        ]
      },
      {
        "id": 81,
        "startTime": 197.8,
        "endTime": 200.1,
        "nextLineTime": 200.2,
        "text": "Xỏ giày vào chân ngay, xắn tay lên!",
        "words": [
          {
            "word": "Xỏ",
            "start": 197.8,
            "end": 197.97
          },
          {
            "word": "giày",
            "start": 197.97,
            "end": 198.31
          },
          {
            "word": "vào",
            "start": 198.31,
            "end": 198.57
          },
          {
            "word": "chân",
            "start": 198.57,
            "end": 198.91
          },
          {
            "word": "ngay,",
            "start": 198.91,
            "end": 199.25
          },
          {
            "word": "xắn",
            "start": 199.25,
            "end": 199.51
          },
          {
            "word": "tay",
            "start": 199.51,
            "end": 199.77
          },
          {
            "word": "lên!",
            "start": 199.77,
            "end": 200.11
          }
        ]
      },
      {
        "id": 82,
        "startTime": 200.2,
        "endTime": 202.3,
        "nextLineTime": 202.4,
        "text": "Theo nhau ta bắt đầu viết nên",
        "words": [
          {
            "word": "Theo",
            "start": 200.2,
            "end": 200.57
          },
          {
            "word": "nhau",
            "start": 200.57,
            "end": 200.94
          },
          {
            "word": "ta",
            "start": 200.94,
            "end": 201.12
          },
          {
            "word": "bắt",
            "start": 201.12,
            "end": 201.39
          },
          {
            "word": "đầu",
            "start": 201.39,
            "end": 201.66
          },
          {
            "word": "viết",
            "start": 201.66,
            "end": 202.03
          },
          {
            "word": "nên",
            "start": 202.03,
            "end": 202.3
          }
        ]
      },
      {
        "id": 83,
        "startTime": 202.4,
        "endTime": 204.3,
        "nextLineTime": 204.4,
        "text": "Hành trình ở đây! Nhìn kìa em!",
        "words": [
          {
            "word": "Hành",
            "start": 202.4,
            "end": 202.7
          },
          {
            "word": "trình",
            "start": 202.7,
            "end": 203.08
          },
          {
            "word": "ở",
            "start": 203.08,
            "end": 203.23
          },
          {
            "word": "đây!",
            "start": 203.23,
            "end": 203.53
          },
          {
            "word": "Nhìn",
            "start": 203.53,
            "end": 203.83
          },
          {
            "word": "kìa",
            "start": 203.83,
            "end": 204.06
          },
          {
            "word": "em!",
            "start": 204.06,
            "end": 204.29
          }
        ]
      },
      {
        "id": 84,
        "startTime": 204.4,
        "endTime": 208.5,
        "nextLineTime": 208.6,
        "text": "Bao nhiêu thân quen ở ngay nơi lạ",
        "words": [
          {
            "word": "Bao",
            "start": 204.4,
            "end": 204.86
          },
          {
            "word": "nhiêu",
            "start": 204.86,
            "end": 205.62
          },
          {
            "word": "thân",
            "start": 205.62,
            "end": 206.23
          },
          {
            "word": "quen",
            "start": 206.23,
            "end": 206.84
          },
          {
            "word": "ở",
            "start": 206.84,
            "end": 207.14
          },
          {
            "word": "ngay",
            "start": 207.14,
            "end": 207.75
          },
          {
            "word": "nơi",
            "start": 207.75,
            "end": 208.21
          },
          {
            "word": "lạ",
            "start": 208.21,
            "end": 208.51
          }
        ]
      },
      {
        "id": 85,
        "startTime": 208.6,
        "endTime": 210.6,
        "nextLineTime": 210.7,
        "text": "Chân thành giản đơn",
        "words": [
          {
            "word": "Chân",
            "start": 208.6,
            "end": 209.1
          },
          {
            "word": "thành",
            "start": 209.1,
            "end": 209.72
          },
          {
            "word": "giản",
            "start": 209.72,
            "end": 210.22
          },
          {
            "word": "đơn",
            "start": 210.22,
            "end": 210.59
          }
        ]
      },
      {
        "id": 86,
        "startTime": 210.7,
        "endTime": 212.7,
        "nextLineTime": 212.8,
        "text": "Mà vô vàn điều quý giá",
        "words": [
          {
            "word": "Mà",
            "start": 210.7,
            "end": 210.94
          },
          {
            "word": "vô",
            "start": 210.94,
            "end": 211.18
          },
          {
            "word": "vàn",
            "start": 211.18,
            "end": 211.53
          },
          {
            "word": "điều",
            "start": 211.53,
            "end": 212.0
          },
          {
            "word": "quý",
            "start": 212.0,
            "end": 212.35
          },
          {
            "word": "giá",
            "start": 212.35,
            "end": 212.7
          }
        ]
      },
      {
        "id": 87,
        "startTime": 212.8,
        "endTime": 215.1,
        "nextLineTime": 215.2,
        "text": "Thả hồn thơ ngây để ta bình yên",
        "words": [
          {
            "word": "Thả",
            "start": 212.8,
            "end": 213.09
          },
          {
            "word": "hồn",
            "start": 213.09,
            "end": 213.38
          },
          {
            "word": "thơ",
            "start": 213.38,
            "end": 213.67
          },
          {
            "word": "ngây",
            "start": 213.67,
            "end": 214.05
          },
          {
            "word": "để",
            "start": 214.05,
            "end": 214.24
          },
          {
            "word": "ta",
            "start": 214.24,
            "end": 214.43
          },
          {
            "word": "bình",
            "start": 214.43,
            "end": 214.81
          },
          {
            "word": "yên",
            "start": 214.81,
            "end": 215.1
          }
        ]
      },
      {
        "id": 88,
        "startTime": 215.2,
        "endTime": 217.6,
        "nextLineTime": 217.7,
        "text": "Cùng nhau sống những ngày trời bao la",
        "words": [
          {
            "word": "Cùng",
            "start": 215.2,
            "end": 215.52
          },
          {
            "word": "nhau",
            "start": 215.52,
            "end": 215.84
          },
          {
            "word": "sống",
            "start": 215.84,
            "end": 216.16
          },
          {
            "word": "những",
            "start": 216.16,
            "end": 216.56
          },
          {
            "word": "ngày",
            "start": 216.56,
            "end": 216.88
          },
          {
            "word": "trời",
            "start": 216.88,
            "end": 217.2
          },
          {
            "word": "bao",
            "start": 217.2,
            "end": 217.44
          },
          {
            "word": "la",
            "start": 217.44,
            "end": 217.6
          }
        ]
      },
      {
        "id": 89,
        "startTime": 217.7,
        "endTime": 219.0,
        "nextLineTime": 219.1,
        "text": "Và ta sẽ thấy người dân Việt Nam",
        "words": [
          {
            "word": "Và",
            "start": 217.7,
            "end": 217.8
          },
          {
            "word": "ta",
            "start": 217.8,
            "end": 217.9
          },
          {
            "word": "sẽ",
            "start": 217.9,
            "end": 218.0
          },
          {
            "word": "thấy",
            "start": 218.0,
            "end": 218.21
          },
          {
            "word": "người",
            "start": 218.21,
            "end": 218.47
          },
          {
            "word": "dân",
            "start": 218.47,
            "end": 218.63
          },
          {
            "word": "Việt",
            "start": 218.63,
            "end": 218.84
          },
          {
            "word": "Nam",
            "start": 218.84,
            "end": 219.0
          }
        ]
      },
      {
        "id": 90,
        "startTime": 219.1,
        "endTime": 220.2,
        "nextLineTime": 220.3,
        "text": "Ở muôn hướng",
        "words": [
          {
            "word": "Ở",
            "start": 219.1,
            "end": 219.3
          },
          {
            "word": "muôn",
            "start": 219.3,
            "end": 219.7
          },
          {
            "word": "hướng",
            "start": 219.7,
            "end": 220.2
          }
        ]
      },
      {
        "id": 91,
        "startTime": 220.3,
        "endTime": 222.1,
        "nextLineTime": 222.2,
        "text": "Bình thường mà rất phi thường",
        "words": [
          {
            "word": "Bình",
            "start": 220.3,
            "end": 220.6
          },
          {
            "word": "thường",
            "start": 220.6,
            "end": 221.05
          },
          {
            "word": "mà",
            "start": 221.05,
            "end": 221.2
          },
          {
            "word": "rất",
            "start": 221.2,
            "end": 221.42
          },
          {
            "word": "phi",
            "start": 221.42,
            "end": 221.64
          },
          {
            "word": "thường",
            "start": 221.64,
            "end": 222.09
          }
        ]
      },
      {
        "id": 92,
        "startTime": 222.2,
        "endTime": 223.4,
        "nextLineTime": 223.5,
        "text": "Bình thường mà phi thường",
        "words": [
          {
            "word": "Bình",
            "start": 222.2,
            "end": 222.43
          },
          {
            "word": "thường",
            "start": 222.43,
            "end": 222.77
          },
          {
            "word": "mà",
            "start": 222.77,
            "end": 222.88
          },
          {
            "word": "phi",
            "start": 222.88,
            "end": 223.05
          },
          {
            "word": "thường",
            "start": 223.05,
            "end": 223.39
          }
        ]
      },
      {
        "id": 93,
        "startTime": 223.5,
        "endTime": 224.7,
        "nextLineTime": 224.8,
        "text": "Người thường mà phi phàm",
        "words": [
          {
            "word": "Người",
            "start": 223.5,
            "end": 223.8
          },
          {
            "word": "thường",
            "start": 223.8,
            "end": 224.16
          },
          {
            "word": "mà",
            "start": 224.16,
            "end": 224.28
          },
          {
            "word": "phi",
            "start": 224.28,
            "end": 224.46
          },
          {
            "word": "phàm",
            "start": 224.46,
            "end": 224.7
          }
        ]
      },
      {
        "id": 94,
        "startTime": 224.8,
        "endTime": 226.0,
        "nextLineTime": 226.1,
        "text": "Nào cùng gia đình Haha",
        "words": [
          {
            "word": "Nào",
            "start": 224.8,
            "end": 225.0
          },
          {
            "word": "cùng",
            "start": 225.0,
            "end": 225.27
          },
          {
            "word": "gia",
            "start": 225.27,
            "end": 225.47
          },
          {
            "word": "đình",
            "start": 225.47,
            "end": 225.74
          },
          {
            "word": "Haha",
            "start": 225.74,
            "end": 226.01
          }
        ]
      },
      {
        "id": 95,
        "startTime": 226.1,
        "endTime": 227.2,
        "nextLineTime": 227.3,
        "text": "Mình làm nông dân nhá!",
        "words": [
          {
            "word": "Mình",
            "start": 226.1,
            "end": 226.34
          },
          {
            "word": "làm",
            "start": 226.34,
            "end": 226.52
          },
          {
            "word": "nông",
            "start": 226.52,
            "end": 226.76
          },
          {
            "word": "dân",
            "start": 226.76,
            "end": 226.94
          },
          {
            "word": "nhá!",
            "start": 226.94,
            "end": 227.18
          }
        ]
      },
      {
        "id": 96,
        "startTime": 227.3,
        "endTime": 228.4,
        "nextLineTime": 228.5,
        "text": "Bình thường mà phi thường",
        "words": [
          {
            "word": "Bình",
            "start": 227.3,
            "end": 227.51
          },
          {
            "word": "thường",
            "start": 227.51,
            "end": 227.82
          },
          {
            "word": "mà",
            "start": 227.82,
            "end": 227.92
          },
          {
            "word": "phi",
            "start": 227.92,
            "end": 228.08
          },
          {
            "word": "thường",
            "start": 228.08,
            "end": 228.39
          }
        ]
      },
      {
        "id": 97,
        "startTime": 228.5,
        "endTime": 229.5,
        "nextLineTime": 229.6,
        "text": "Người thường mà phi phàm",
        "words": [
          {
            "word": "Người",
            "start": 228.5,
            "end": 228.75
          },
          {
            "word": "thường",
            "start": 228.75,
            "end": 229.05
          },
          {
            "word": "mà",
            "start": 229.05,
            "end": 229.15
          },
          {
            "word": "phi",
            "start": 229.15,
            "end": 229.3
          },
          {
            "word": "phàm",
            "start": 229.3,
            "end": 229.5
          }
        ]
      },
      {
        "id": 98,
        "startTime": 229.6,
        "endTime": 230.9,
        "nextLineTime": 231.0,
        "text": "Nào cùng gia đình Haha",
        "words": [
          {
            "word": "Nào",
            "start": 229.6,
            "end": 229.82
          },
          {
            "word": "cùng",
            "start": 229.82,
            "end": 230.11
          },
          {
            "word": "gia",
            "start": 230.11,
            "end": 230.33
          },
          {
            "word": "đình",
            "start": 230.33,
            "end": 230.62
          },
          {
            "word": "Haha",
            "start": 230.62,
            "end": 230.91
          }
        ]
      },
      {
        "id": 99,
        "startTime": 231.0,
        "endTime": 236.6,
        "nextLineTime": 238.18,
        "text": "Mình làm nông dân nhá!",
        "words": [
          {
            "word": "Mình",
            "start": 231.0,
            "end": 232.24
          },
          {
            "word": "làm",
            "start": 232.24,
            "end": 233.17
          },
          {
            "word": "nông",
            "start": 233.17,
            "end": 234.41
          },
          {
            "word": "dân",
            "start": 234.41,
            "end": 235.34
          },
          {
            "word": "nhá!",
            "start": 235.34,
            "end": 236.58
          }
        ]
      }
    ]
  },
  {
    "id": "karaoke-sunny-sunny",
    "filename": "SUNNY SUNNY.mp3",
    "title": "Sunny, Sunny (Song Ca Tiếng Anh)",
    "artist": "Suno Studio · Song Ca & Hợp Xướng Thiếu Nhi",
    "duration": 137.16,
    "audioUrl": "/karaoke/karaoke-sunny-sunny.mp3",
    "thumbUrl": "/karaoke/karaoke-sunny-sunny.jpg",
    "lines": [
      {
        "id": 0,
        "startTime": 8.5,
        "endTime": 11.9,
        "nextLineTime": 12.0,
        "text": "Sun on my nose, shoes on my feet",
        "words": [
          {
            "word": "Sun",
            "start": 8.5,
            "end": 8.93
          },
          {
            "word": "on",
            "start": 8.93,
            "end": 9.21
          },
          {
            "word": "my",
            "start": 9.21,
            "end": 9.49
          },
          {
            "word": "nose,",
            "start": 9.49,
            "end": 10.06
          },
          {
            "word": "shoes",
            "start": 10.06,
            "end": 10.77
          },
          {
            "word": "on",
            "start": 10.77,
            "end": 11.05
          },
          {
            "word": "my",
            "start": 11.05,
            "end": 11.33
          },
          {
            "word": "feet",
            "start": 11.33,
            "end": 11.9
          }
        ]
      },
      {
        "id": 1,
        "startTime": 12.0,
        "endTime": 15.4,
        "nextLineTime": 15.5,
        "text": "Come outside, come play with me",
        "words": [
          {
            "word": "Come",
            "start": 12.0,
            "end": 12.54
          },
          {
            "word": "outside,",
            "start": 12.54,
            "end": 13.49
          },
          {
            "word": "come",
            "start": 13.49,
            "end": 14.03
          },
          {
            "word": "play",
            "start": 14.03,
            "end": 14.57
          },
          {
            "word": "with",
            "start": 14.57,
            "end": 15.11
          },
          {
            "word": "me",
            "start": 15.11,
            "end": 15.38
          }
        ]
      },
      {
        "id": 2,
        "startTime": 15.5,
        "endTime": 18.9,
        "nextLineTime": 19.0,
        "text": "Hop to the garden, run to the tree",
        "words": [
          {
            "word": "Hop",
            "start": 15.5,
            "end": 15.89
          },
          {
            "word": "to",
            "start": 15.89,
            "end": 16.15
          },
          {
            "word": "the",
            "start": 16.15,
            "end": 16.54
          },
          {
            "word": "garden,",
            "start": 16.54,
            "end": 17.32
          },
          {
            "word": "run",
            "start": 17.32,
            "end": 17.71
          },
          {
            "word": "to",
            "start": 17.71,
            "end": 17.97
          },
          {
            "word": "the",
            "start": 17.97,
            "end": 18.36
          },
          {
            "word": "tree",
            "start": 18.36,
            "end": 18.88
          }
        ]
      },
      {
        "id": 3,
        "startTime": 19.0,
        "endTime": 22.9,
        "nextLineTime": 23.0,
        "text": "You and me, one, two, three!",
        "words": [
          {
            "word": "You",
            "start": 19.0,
            "end": 19.59
          },
          {
            "word": "and",
            "start": 19.59,
            "end": 20.18
          },
          {
            "word": "me,",
            "start": 20.18,
            "end": 20.57
          },
          {
            "word": "one,",
            "start": 20.57,
            "end": 21.16
          },
          {
            "word": "two,",
            "start": 21.16,
            "end": 21.75
          },
          {
            "word": "three!",
            "start": 21.75,
            "end": 22.92
          }
        ]
      },
      {
        "id": 4,
        "startTime": 23.0,
        "endTime": 26.4,
        "nextLineTime": 26.5,
        "text": "Sunny, sunny, hey, hey, hey!",
        "words": [
          {
            "word": "Sunny,",
            "start": 23.0,
            "end": 23.85
          },
          {
            "word": "sunny,",
            "start": 23.85,
            "end": 24.7
          },
          {
            "word": "hey,",
            "start": 24.7,
            "end": 25.21
          },
          {
            "word": "hey,",
            "start": 25.21,
            "end": 25.72
          },
          {
            "word": "hey!",
            "start": 25.72,
            "end": 26.4
          }
        ]
      },
      {
        "id": 5,
        "startTime": 26.5,
        "endTime": 29.9,
        "nextLineTime": 30.0,
        "text": "Stomp the ground, we're on our way",
        "words": [
          {
            "word": "Stomp",
            "start": 26.5,
            "end": 27.13
          },
          {
            "word": "the",
            "start": 27.13,
            "end": 27.51
          },
          {
            "word": "ground,",
            "start": 27.51,
            "end": 28.27
          },
          {
            "word": "we're",
            "start": 28.27,
            "end": 28.9
          },
          {
            "word": "on",
            "start": 28.9,
            "end": 29.15
          },
          {
            "word": "our",
            "start": 29.15,
            "end": 29.53
          },
          {
            "word": "way",
            "start": 29.53,
            "end": 29.91
          }
        ]
      },
      {
        "id": 6,
        "startTime": 30.0,
        "endTime": 33.4,
        "nextLineTime": 33.5,
        "text": "Sunny, sunny, shout it loud",
        "words": [
          {
            "word": "Sunny,",
            "start": 30.0,
            "end": 30.81
          },
          {
            "word": "sunny,",
            "start": 30.81,
            "end": 31.62
          },
          {
            "word": "shout",
            "start": 31.62,
            "end": 32.43
          },
          {
            "word": "it",
            "start": 32.43,
            "end": 32.75
          },
          {
            "word": "loud",
            "start": 32.75,
            "end": 33.4
          }
        ]
      },
      {
        "id": 7,
        "startTime": 33.5,
        "endTime": 36.9,
        "nextLineTime": 37.0,
        "text": "Hands up high, head in the clouds",
        "words": [
          {
            "word": "Hands",
            "start": 33.5,
            "end": 34.15
          },
          {
            "word": "up",
            "start": 34.15,
            "end": 34.41
          },
          {
            "word": "high,",
            "start": 34.41,
            "end": 34.93
          },
          {
            "word": "head",
            "start": 34.93,
            "end": 35.45
          },
          {
            "word": "in",
            "start": 35.45,
            "end": 35.71
          },
          {
            "word": "the",
            "start": 35.71,
            "end": 36.1
          },
          {
            "word": "clouds",
            "start": 36.1,
            "end": 36.88
          }
        ]
      },
      {
        "id": 8,
        "startTime": 37.0,
        "endTime": 40.4,
        "nextLineTime": 40.5,
        "text": "Grass underfoot, blue overhead",
        "words": [
          {
            "word": "Grass",
            "start": 37.0,
            "end": 37.65
          },
          {
            "word": "underfoot,",
            "start": 37.65,
            "end": 38.83
          },
          {
            "word": "blue",
            "start": 38.83,
            "end": 39.35
          },
          {
            "word": "overhead",
            "start": 39.35,
            "end": 40.4
          }
        ]
      },
      {
        "id": 9,
        "startTime": 40.5,
        "endTime": 43.9,
        "nextLineTime": 44.0,
        "text": "Call it out now, go ahead",
        "words": [
          {
            "word": "Call",
            "start": 40.5,
            "end": 41.22
          },
          {
            "word": "it",
            "start": 41.22,
            "end": 41.58
          },
          {
            "word": "out",
            "start": 41.58,
            "end": 42.12
          },
          {
            "word": "now,",
            "start": 42.12,
            "end": 42.66
          },
          {
            "word": "go",
            "start": 42.66,
            "end": 43.02
          },
          {
            "word": "ahead",
            "start": 43.02,
            "end": 43.91
          }
        ]
      },
      {
        "id": 10,
        "startTime": 44.0,
        "endTime": 47.4,
        "nextLineTime": 47.5,
        "text": "Clap-clap, jump-jump, no slow moves",
        "words": [
          {
            "word": "Clap-clap,",
            "start": 44.0,
            "end": 45.06
          },
          {
            "word": "jump-jump,",
            "start": 45.06,
            "end": 46.12
          },
          {
            "word": "no",
            "start": 46.12,
            "end": 46.35
          },
          {
            "word": "slow",
            "start": 46.35,
            "end": 46.82
          },
          {
            "word": "moves",
            "start": 46.82,
            "end": 47.41
          }
        ]
      },
      {
        "id": 11,
        "startTime": 47.5,
        "endTime": 51.4,
        "nextLineTime": 51.5,
        "text": "Sunny, sunny, we got grooves!",
        "words": [
          {
            "word": "Sunny,",
            "start": 47.5,
            "end": 48.35
          },
          {
            "word": "sunny,",
            "start": 48.35,
            "end": 49.2
          },
          {
            "word": "we",
            "start": 49.2,
            "end": 49.54
          },
          {
            "word": "got",
            "start": 49.54,
            "end": 50.05
          },
          {
            "word": "grooves!",
            "start": 50.05,
            "end": 51.41
          }
        ]
      },
      {
        "id": 12,
        "startTime": 51.5,
        "endTime": 54.9,
        "nextLineTime": 55.0,
        "text": "Hey now, sunny, sunny, call your name",
        "words": [
          {
            "word": "Hey",
            "start": 51.5,
            "end": 51.86
          },
          {
            "word": "now,",
            "start": 51.86,
            "end": 52.22
          },
          {
            "word": "sunny,",
            "start": 52.22,
            "end": 52.83
          },
          {
            "word": "sunny,",
            "start": 52.83,
            "end": 53.44
          },
          {
            "word": "call",
            "start": 53.44,
            "end": 53.93
          },
          {
            "word": "your",
            "start": 53.93,
            "end": 54.42
          },
          {
            "word": "name",
            "start": 54.42,
            "end": 54.91
          }
        ]
      },
      {
        "id": 13,
        "startTime": 55.0,
        "endTime": 58.4,
        "nextLineTime": 58.5,
        "text": "Kick it up, we don't sit still, we play",
        "words": [
          {
            "word": "Kick",
            "start": 55.0,
            "end": 55.47
          },
          {
            "word": "it",
            "start": 55.47,
            "end": 55.7
          },
          {
            "word": "up,",
            "start": 55.7,
            "end": 55.93
          },
          {
            "word": "we",
            "start": 55.93,
            "end": 56.16
          },
          {
            "word": "don't",
            "start": 56.16,
            "end": 56.75
          },
          {
            "word": "sit",
            "start": 56.75,
            "end": 57.1
          },
          {
            "word": "still,",
            "start": 57.1,
            "end": 57.69
          },
          {
            "word": "we",
            "start": 57.69,
            "end": 57.92
          },
          {
            "word": "play",
            "start": 57.92,
            "end": 58.39
          }
        ]
      },
      {
        "id": 14,
        "startTime": 58.5,
        "endTime": 61.9,
        "nextLineTime": 62.0,
        "text": "Sunny, sunny, arms way high",
        "words": [
          {
            "word": "Sunny,",
            "start": 58.5,
            "end": 59.31
          },
          {
            "word": "sunny,",
            "start": 59.31,
            "end": 60.12
          },
          {
            "word": "arms",
            "start": 60.12,
            "end": 60.77
          },
          {
            "word": "way",
            "start": 60.77,
            "end": 61.26
          },
          {
            "word": "high",
            "start": 61.26,
            "end": 61.91
          }
        ]
      },
      {
        "id": 15,
        "startTime": 62.0,
        "endTime": 64.72,
        "nextLineTime": 64.82,
        "text": "Laughing till we're out",
        "words": [
          {
            "word": "Laughing",
            "start": 62.0,
            "end": 63.09
          },
          {
            "word": "till",
            "start": 63.09,
            "end": 63.63
          },
          {
            "word": "we're",
            "start": 63.63,
            "end": 64.31
          },
          {
            "word": "out",
            "start": 64.31,
            "end": 64.72
          }
        ]
      },
      {
        "id": 16,
        "startTime": 64.82,
        "endTime": 67.4,
        "nextLineTime": 67.5,
        "text": "of breath, eyes wide",
        "words": [
          {
            "word": "of",
            "start": 64.82,
            "end": 65.14
          },
          {
            "word": "breath,",
            "start": 65.14,
            "end": 66.11
          },
          {
            "word": "eyes",
            "start": 66.11,
            "end": 66.75
          },
          {
            "word": "wide",
            "start": 66.75,
            "end": 67.39
          }
        ]
      },
      {
        "id": 17,
        "startTime": 67.5,
        "endTime": 70.9,
        "nextLineTime": 71.0,
        "text": "Sun on my nose, sun on your toes",
        "words": [
          {
            "word": "Sun",
            "start": 67.5,
            "end": 67.92
          },
          {
            "word": "on",
            "start": 67.92,
            "end": 68.2
          },
          {
            "word": "my",
            "start": 68.2,
            "end": 68.48
          },
          {
            "word": "nose,",
            "start": 68.48,
            "end": 69.05
          },
          {
            "word": "sun",
            "start": 69.05,
            "end": 69.47
          },
          {
            "word": "on",
            "start": 69.47,
            "end": 69.75
          },
          {
            "word": "your",
            "start": 69.75,
            "end": 70.32
          },
          {
            "word": "toes",
            "start": 70.32,
            "end": 70.89
          }
        ]
      },
      {
        "id": 18,
        "startTime": 71.0,
        "endTime": 74.4,
        "nextLineTime": 74.5,
        "text": "Down the path where the buttercup grows",
        "words": [
          {
            "word": "Down",
            "start": 71.0,
            "end": 71.41
          },
          {
            "word": "the",
            "start": 71.41,
            "end": 71.72
          },
          {
            "word": "path",
            "start": 71.72,
            "end": 72.13
          },
          {
            "word": "where",
            "start": 72.13,
            "end": 72.65
          },
          {
            "word": "the",
            "start": 72.65,
            "end": 72.96
          },
          {
            "word": "buttercup",
            "start": 72.96,
            "end": 73.89
          },
          {
            "word": "grows",
            "start": 73.89,
            "end": 74.41
          }
        ]
      },
      {
        "id": 19,
        "startTime": 74.5,
        "endTime": 77.9,
        "nextLineTime": 78.0,
        "text": "Skip to the gate, hop to the tree",
        "words": [
          {
            "word": "Skip",
            "start": 74.5,
            "end": 75.04
          },
          {
            "word": "to",
            "start": 75.04,
            "end": 75.31
          },
          {
            "word": "the",
            "start": 75.31,
            "end": 75.72
          },
          {
            "word": "gate,",
            "start": 75.72,
            "end": 76.26
          },
          {
            "word": "hop",
            "start": 76.26,
            "end": 76.67
          },
          {
            "word": "to",
            "start": 76.67,
            "end": 76.94
          },
          {
            "word": "the",
            "start": 76.94,
            "end": 77.35
          },
          {
            "word": "tree",
            "start": 77.35,
            "end": 77.89
          }
        ]
      },
      {
        "id": 20,
        "startTime": 78.0,
        "endTime": 81.9,
        "nextLineTime": 82.0,
        "text": "Come play outside with me!",
        "words": [
          {
            "word": "Come",
            "start": 78.0,
            "end": 78.71
          },
          {
            "word": "play",
            "start": 78.71,
            "end": 79.42
          },
          {
            "word": "outside",
            "start": 79.42,
            "end": 80.66
          },
          {
            "word": "with",
            "start": 80.66,
            "end": 81.37
          },
          {
            "word": "me!",
            "start": 81.37,
            "end": 81.9
          }
        ]
      },
      {
        "id": 21,
        "startTime": 82.0,
        "endTime": 85.4,
        "nextLineTime": 85.5,
        "text": "Sunny, sunny, clap your hands!",
        "words": [
          {
            "word": "Sunny,",
            "start": 82.0,
            "end": 82.71
          },
          {
            "word": "sunny,",
            "start": 82.71,
            "end": 83.42
          },
          {
            "word": "clap",
            "start": 83.42,
            "end": 83.99
          },
          {
            "word": "your",
            "start": 83.99,
            "end": 84.56
          },
          {
            "word": "hands!",
            "start": 84.56,
            "end": 85.41
          }
        ]
      },
      {
        "id": 22,
        "startTime": 85.5,
        "endTime": 88.9,
        "nextLineTime": 89.0,
        "text": "Sunny, sunny, spin and dance!",
        "words": [
          {
            "word": "Sunny,",
            "start": 85.5,
            "end": 86.24
          },
          {
            "word": "sunny,",
            "start": 86.24,
            "end": 86.98
          },
          {
            "word": "spin",
            "start": 86.98,
            "end": 87.57
          },
          {
            "word": "and",
            "start": 87.57,
            "end": 88.01
          },
          {
            "word": "dance!",
            "start": 88.01,
            "end": 88.9
          }
        ]
      },
      {
        "id": 23,
        "startTime": 89.0,
        "endTime": 92.4,
        "nextLineTime": 92.5,
        "text": "One, two, three, come out and play",
        "words": [
          {
            "word": "One,",
            "start": 89.0,
            "end": 89.41
          },
          {
            "word": "two,",
            "start": 89.41,
            "end": 89.82
          },
          {
            "word": "three,",
            "start": 89.82,
            "end": 90.5
          },
          {
            "word": "come",
            "start": 90.5,
            "end": 91.04
          },
          {
            "word": "out",
            "start": 91.04,
            "end": 91.45
          },
          {
            "word": "and",
            "start": 91.45,
            "end": 91.86
          },
          {
            "word": "play",
            "start": 91.86,
            "end": 92.4
          }
        ]
      },
      {
        "id": 24,
        "startTime": 92.5,
        "endTime": 97.4,
        "nextLineTime": 97.5,
        "text": "Sunny, sunny, hooray, hooray!",
        "words": [
          {
            "word": "Sunny,",
            "start": 92.5,
            "end": 93.57
          },
          {
            "word": "sunny,",
            "start": 93.57,
            "end": 94.64
          },
          {
            "word": "hooray,",
            "start": 94.64,
            "end": 95.92
          },
          {
            "word": "hooray!",
            "start": 95.92,
            "end": 97.41
          }
        ]
      },
      {
        "id": 25,
        "startTime": 97.5,
        "endTime": 100.9,
        "nextLineTime": 101.0,
        "text": "Bird in the blue cloud drifting by",
        "words": [
          {
            "word": "Bird",
            "start": 97.5,
            "end": 97.99
          },
          {
            "word": "in",
            "start": 97.99,
            "end": 98.23
          },
          {
            "word": "the",
            "start": 98.23,
            "end": 98.59
          },
          {
            "word": "blue",
            "start": 98.59,
            "end": 99.08
          },
          {
            "word": "cloud",
            "start": 99.08,
            "end": 99.69
          },
          {
            "word": "drifting",
            "start": 99.69,
            "end": 100.66
          },
          {
            "word": "by",
            "start": 100.66,
            "end": 100.9
          }
        ]
      },
      {
        "id": 26,
        "startTime": 101.0,
        "endTime": 104.4,
        "nextLineTime": 104.5,
        "text": "We make a big kite, chase the sky",
        "words": [
          {
            "word": "We",
            "start": 101.0,
            "end": 101.26
          },
          {
            "word": "make",
            "start": 101.26,
            "end": 101.78
          },
          {
            "word": "a",
            "start": 101.78,
            "end": 102.04
          },
          {
            "word": "big",
            "start": 102.04,
            "end": 102.43
          },
          {
            "word": "kite,",
            "start": 102.43,
            "end": 102.95
          },
          {
            "word": "chase",
            "start": 102.95,
            "end": 103.6
          },
          {
            "word": "the",
            "start": 103.6,
            "end": 103.99
          },
          {
            "word": "sky",
            "start": 103.99,
            "end": 104.38
          }
        ]
      },
      {
        "id": 27,
        "startTime": 104.5,
        "endTime": 107.9,
        "nextLineTime": 108.0,
        "text": "Skip to the gate, hop to the tree",
        "words": [
          {
            "word": "Skip",
            "start": 104.5,
            "end": 105.04
          },
          {
            "word": "to",
            "start": 105.04,
            "end": 105.31
          },
          {
            "word": "the",
            "start": 105.31,
            "end": 105.72
          },
          {
            "word": "gate,",
            "start": 105.72,
            "end": 106.26
          },
          {
            "word": "hop",
            "start": 106.26,
            "end": 106.67
          },
          {
            "word": "to",
            "start": 106.67,
            "end": 106.94
          },
          {
            "word": "the",
            "start": 106.94,
            "end": 107.35
          },
          {
            "word": "tree",
            "start": 107.35,
            "end": 107.89
          }
        ]
      },
      {
        "id": 28,
        "startTime": 108.0,
        "endTime": 111.9,
        "nextLineTime": 112.0,
        "text": "Come play outside with me!",
        "words": [
          {
            "word": "Come",
            "start": 108.0,
            "end": 108.71
          },
          {
            "word": "play",
            "start": 108.71,
            "end": 109.42
          },
          {
            "word": "outside",
            "start": 109.42,
            "end": 110.66
          },
          {
            "word": "with",
            "start": 110.66,
            "end": 111.37
          },
          {
            "word": "me!",
            "start": 111.37,
            "end": 111.9
          }
        ]
      },
      {
        "id": 29,
        "startTime": 112.0,
        "endTime": 115.4,
        "nextLineTime": 115.5,
        "text": "Sunny, sunny, clap your hands!",
        "words": [
          {
            "word": "Sunny,",
            "start": 112.0,
            "end": 112.71
          },
          {
            "word": "sunny,",
            "start": 112.71,
            "end": 113.42
          },
          {
            "word": "clap",
            "start": 113.42,
            "end": 113.99
          },
          {
            "word": "your",
            "start": 113.99,
            "end": 114.56
          },
          {
            "word": "hands!",
            "start": 114.56,
            "end": 115.41
          }
        ]
      },
      {
        "id": 30,
        "startTime": 115.5,
        "endTime": 118.9,
        "nextLineTime": 119.0,
        "text": "Sunny, sunny, spin and dance!",
        "words": [
          {
            "word": "Sunny,",
            "start": 115.5,
            "end": 116.24
          },
          {
            "word": "sunny,",
            "start": 116.24,
            "end": 116.98
          },
          {
            "word": "spin",
            "start": 116.98,
            "end": 117.57
          },
          {
            "word": "and",
            "start": 117.57,
            "end": 118.01
          },
          {
            "word": "dance!",
            "start": 118.01,
            "end": 118.9
          }
        ]
      },
      {
        "id": 31,
        "startTime": 119.0,
        "endTime": 122.4,
        "nextLineTime": 122.5,
        "text": "One, two, three, come out and play",
        "words": [
          {
            "word": "One,",
            "start": 119.0,
            "end": 119.41
          },
          {
            "word": "two,",
            "start": 119.41,
            "end": 119.82
          },
          {
            "word": "three,",
            "start": 119.82,
            "end": 120.5
          },
          {
            "word": "come",
            "start": 120.5,
            "end": 121.04
          },
          {
            "word": "out",
            "start": 121.04,
            "end": 121.45
          },
          {
            "word": "and",
            "start": 121.45,
            "end": 121.86
          },
          {
            "word": "play",
            "start": 121.86,
            "end": 122.4
          }
        ]
      },
      {
        "id": 32,
        "startTime": 122.5,
        "endTime": 125.9,
        "nextLineTime": 126.0,
        "text": "Sunny, sunny, hooray, hooray!",
        "words": [
          {
            "word": "Sunny,",
            "start": 122.5,
            "end": 123.24
          },
          {
            "word": "sunny,",
            "start": 123.24,
            "end": 123.98
          },
          {
            "word": "hooray,",
            "start": 123.98,
            "end": 124.87
          },
          {
            "word": "hooray!",
            "start": 124.87,
            "end": 125.9
          }
        ]
      },
      {
        "id": 33,
        "startTime": 126.0,
        "endTime": 129.9,
        "nextLineTime": 130.0,
        "text": "Sunny, sunny, hooray, hooray!",
        "words": [
          {
            "word": "Sunny,",
            "start": 126.0,
            "end": 126.85
          },
          {
            "word": "sunny,",
            "start": 126.85,
            "end": 127.7
          },
          {
            "word": "hooray,",
            "start": 127.7,
            "end": 128.72
          },
          {
            "word": "hooray!",
            "start": 128.72,
            "end": 129.91
          }
        ]
      },
      {
        "id": 34,
        "startTime": 130.0,
        "endTime": 133.4,
        "nextLineTime": 133.5,
        "text": "Sunny, sunny, you and me",
        "words": [
          {
            "word": "Sunny,",
            "start": 130.0,
            "end": 130.94
          },
          {
            "word": "sunny,",
            "start": 130.94,
            "end": 131.88
          },
          {
            "word": "you",
            "start": 131.88,
            "end": 132.45
          },
          {
            "word": "and",
            "start": 132.45,
            "end": 133.02
          },
          {
            "word": "me",
            "start": 133.02,
            "end": 133.4
          }
        ]
      },
      {
        "id": 35,
        "startTime": 133.5,
        "endTime": 137.06,
        "nextLineTime": 137.16,
        "text": "One, two, three!",
        "words": [
          {
            "word": "One,",
            "start": 133.5,
            "end": 134.39
          },
          {
            "word": "two,",
            "start": 134.39,
            "end": 135.28
          },
          {
            "word": "three!",
            "start": 135.28,
            "end": 137.06
          }
        ]
      }
    ]
  },
  {
    "id": "karaoke-tieng-ru-coi-nguon",
    "filename": "TIẾNG RU CỘI NGUỒN.mp3",
    "title": "Tiếng Ru Cội Nguồn",
    "artist": "Anh Trai Vượt Ngàn Chông Gai (Đông Hùng, Thuận Nguyễn, Toki Thành Thỏ, Cheng, K.O, Duy Khánh, OSAD, Hà An Huy)",
    "duration": 393.82,
    "audioUrl": "/karaoke/karaoke-tieng-ru-coi-nguon.mp3",
    "thumbUrl": "/karaoke/karaoke-tieng-ru-coi-nguon.jpg",
    "lines": [
      {
        "id": 0,
        "startTime": 1.66,
        "endTime": 4.74,
        "nextLineTime": 4.84,
        "text": "À á a à ời",
        "words": [
          {
            "word": "À",
            "start": 1.66,
            "end": 2.28
          },
          {
            "word": "á",
            "start": 2.28,
            "end": 2.9
          },
          {
            "word": "a",
            "start": 2.9,
            "end": 3.52
          },
          {
            "word": "à",
            "start": 3.52,
            "end": 4.14
          },
          {
            "word": "ời",
            "start": 4.14,
            "end": 4.76
          }
        ]
      },
      {
        "id": 1,
        "startTime": 4.84,
        "endTime": 10.44,
        "nextLineTime": 13.9,
        "text": "À á a à ơi",
        "words": [
          {
            "word": "À",
            "start": 4.84,
            "end": 5.96
          },
          {
            "word": "á",
            "start": 5.96,
            "end": 7.08
          },
          {
            "word": "a",
            "start": 7.08,
            "end": 8.2
          },
          {
            "word": "à",
            "start": 8.2,
            "end": 9.32
          },
          {
            "word": "ơi",
            "start": 9.32,
            "end": 10.44
          }
        ]
      },
      {
        "id": 2,
        "startTime": 13.9,
        "endTime": 17.01,
        "nextLineTime": 17.11,
        "text": "Ru con từ thuở hồng hoang",
        "words": [
          {
            "word": "Ru",
            "start": 13.9,
            "end": 14.21
          },
          {
            "word": "con",
            "start": 14.21,
            "end": 14.68
          },
          {
            "word": "từ",
            "start": 14.68,
            "end": 14.99
          },
          {
            "word": "thuở",
            "start": 14.99,
            "end": 15.61
          },
          {
            "word": "hồng",
            "start": 15.61,
            "end": 16.23
          },
          {
            "word": "hoang",
            "start": 16.23,
            "end": 17.01
          }
        ]
      },
      {
        "id": 3,
        "startTime": 17.11,
        "endTime": 22.71,
        "nextLineTime": 26.17,
        "text": "Mẹ ru lúa chín cha ru mái chèo",
        "words": [
          {
            "word": "Mẹ",
            "start": 17.11,
            "end": 17.6
          },
          {
            "word": "ru",
            "start": 17.6,
            "end": 18.09
          },
          {
            "word": "lúa",
            "start": 18.09,
            "end": 18.82
          },
          {
            "word": "chín",
            "start": 18.82,
            "end": 19.79
          },
          {
            "word": "cha",
            "start": 19.79,
            "end": 20.52
          },
          {
            "word": "ru",
            "start": 20.52,
            "end": 21.01
          },
          {
            "word": "mái",
            "start": 21.01,
            "end": 21.74
          },
          {
            "word": "chèo",
            "start": 21.74,
            "end": 22.71
          }
        ]
      },
      {
        "id": 4,
        "startTime": 26.17,
        "endTime": 31.39,
        "nextLineTime": 31.49,
        "text": "À á a à ời",
        "words": [
          {
            "word": "À",
            "start": 26.17,
            "end": 27.21
          },
          {
            "word": "á",
            "start": 27.21,
            "end": 28.25
          },
          {
            "word": "a",
            "start": 28.25,
            "end": 29.29
          },
          {
            "word": "à",
            "start": 29.29,
            "end": 30.33
          },
          {
            "word": "ời",
            "start": 30.33,
            "end": 31.37
          }
        ]
      },
      {
        "id": 5,
        "startTime": 31.49,
        "endTime": 37.09,
        "nextLineTime": 44.68,
        "text": "À á a à ơi",
        "words": [
          {
            "word": "À",
            "start": 31.49,
            "end": 32.61
          },
          {
            "word": "á",
            "start": 32.61,
            "end": 33.73
          },
          {
            "word": "a",
            "start": 33.73,
            "end": 34.85
          },
          {
            "word": "à",
            "start": 34.85,
            "end": 35.97
          },
          {
            "word": "ơi",
            "start": 35.97,
            "end": 37.09
          }
        ]
      },
      {
        "id": 6,
        "startTime": 44.68,
        "endTime": 47.78,
        "nextLineTime": 47.88,
        "text": "Nghe theo lời mẹ",
        "words": [
          {
            "word": "Nghe",
            "start": 44.68,
            "end": 45.63
          },
          {
            "word": "theo",
            "start": 45.63,
            "end": 46.58
          },
          {
            "word": "lời",
            "start": 46.58,
            "end": 47.3
          },
          {
            "word": "mẹ",
            "start": 47.3,
            "end": 47.78
          }
        ]
      },
      {
        "id": 7,
        "startTime": 47.88,
        "endTime": 49.37,
        "nextLineTime": 49.47,
        "text": "Con bước vào đời",
        "words": [
          {
            "word": "Con",
            "start": 47.88,
            "end": 48.22
          },
          {
            "word": "bước",
            "start": 48.22,
            "end": 48.68
          },
          {
            "word": "vào",
            "start": 48.68,
            "end": 49.02
          },
          {
            "word": "đời",
            "start": 49.02,
            "end": 49.36
          }
        ]
      },
      {
        "id": 8,
        "startTime": 49.47,
        "endTime": 51.48,
        "nextLineTime": 51.58,
        "text": "Mang yêu thương làm hành trang",
        "words": [
          {
            "word": "Mang",
            "start": 49.47,
            "end": 49.79
          },
          {
            "word": "yêu",
            "start": 49.79,
            "end": 50.03
          },
          {
            "word": "thương",
            "start": 50.03,
            "end": 50.51
          },
          {
            "word": "làm",
            "start": 50.51,
            "end": 50.75
          },
          {
            "word": "hành",
            "start": 50.75,
            "end": 51.07
          },
          {
            "word": "trang",
            "start": 51.07,
            "end": 51.47
          }
        ]
      },
      {
        "id": 9,
        "startTime": 51.58,
        "endTime": 53.08,
        "nextLineTime": 53.18,
        "text": "Luôn tin mình dù mai",
        "words": [
          {
            "word": "Luôn",
            "start": 51.58,
            "end": 51.95
          },
          {
            "word": "tin",
            "start": 51.95,
            "end": 52.23
          },
          {
            "word": "mình",
            "start": 52.23,
            "end": 52.6
          },
          {
            "word": "dù",
            "start": 52.6,
            "end": 52.79
          },
          {
            "word": "mai",
            "start": 52.79,
            "end": 53.07
          }
        ]
      },
      {
        "id": 10,
        "startTime": 53.18,
        "endTime": 56.79,
        "nextLineTime": 56.89,
        "text": "Sóng gió vô vàn",
        "words": [
          {
            "word": "Sóng",
            "start": 53.18,
            "end": 54.38
          },
          {
            "word": "gió",
            "start": 54.38,
            "end": 55.28
          },
          {
            "word": "vô",
            "start": 55.28,
            "end": 55.88
          },
          {
            "word": "vàn",
            "start": 55.88,
            "end": 56.78
          }
        ]
      },
      {
        "id": 11,
        "startTime": 56.89,
        "endTime": 59.45,
        "nextLineTime": 59.55,
        "text": "Cây có cội và sông có ngàn",
        "words": [
          {
            "word": "Cây",
            "start": 56.89,
            "end": 57.27
          },
          {
            "word": "có",
            "start": 57.27,
            "end": 57.53
          },
          {
            "word": "cội",
            "start": 57.53,
            "end": 57.91
          },
          {
            "word": "và",
            "start": 57.91,
            "end": 58.17
          },
          {
            "word": "sông",
            "start": 58.17,
            "end": 58.68
          },
          {
            "word": "có",
            "start": 58.68,
            "end": 58.94
          },
          {
            "word": "ngàn",
            "start": 58.94,
            "end": 59.45
          }
        ]
      },
      {
        "id": 12,
        "startTime": 59.55,
        "endTime": 61.58,
        "nextLineTime": 61.68,
        "text": "Lời mẹ như ánh trăng treo",
        "words": [
          {
            "word": "Lời",
            "start": 59.55,
            "end": 59.85
          },
          {
            "word": "mẹ",
            "start": 59.85,
            "end": 60.05
          },
          {
            "word": "như",
            "start": 60.05,
            "end": 60.35
          },
          {
            "word": "ánh",
            "start": 60.35,
            "end": 60.65
          },
          {
            "word": "trăng",
            "start": 60.65,
            "end": 61.16
          },
          {
            "word": "treo",
            "start": 61.16,
            "end": 61.57
          }
        ]
      },
      {
        "id": 13,
        "startTime": 61.68,
        "endTime": 63.69,
        "nextLineTime": 63.79,
        "text": "Chớ có thấy sóng cả",
        "words": [
          {
            "word": "Chớ",
            "start": 61.68,
            "end": 62.08
          },
          {
            "word": "có",
            "start": 62.08,
            "end": 62.35
          },
          {
            "word": "thấy",
            "start": 62.35,
            "end": 62.89
          },
          {
            "word": "sóng",
            "start": 62.89,
            "end": 63.43
          },
          {
            "word": "cả",
            "start": 63.43,
            "end": 63.7
          }
        ]
      },
      {
        "id": 14,
        "startTime": 63.79,
        "endTime": 66.88,
        "nextLineTime": 66.98,
        "text": "Mà ngã tay chèo",
        "words": [
          {
            "word": "Mà",
            "start": 63.79,
            "end": 64.31
          },
          {
            "word": "ngã",
            "start": 64.31,
            "end": 65.08
          },
          {
            "word": "tay",
            "start": 65.08,
            "end": 65.85
          },
          {
            "word": "chèo",
            "start": 65.85,
            "end": 66.88
          }
        ]
      },
      {
        "id": 15,
        "startTime": 66.98,
        "endTime": 69.97,
        "nextLineTime": 70.07,
        "text": "Biển rộng sóng lớn bão bùng từ muôn phương",
        "words": [
          {
            "word": "Biển",
            "start": 66.98,
            "end": 67.33
          },
          {
            "word": "rộng",
            "start": 67.33,
            "end": 67.68
          },
          {
            "word": "sóng",
            "start": 67.68,
            "end": 68.03
          },
          {
            "word": "lớn",
            "start": 68.03,
            "end": 68.29
          },
          {
            "word": "bão",
            "start": 68.29,
            "end": 68.55
          },
          {
            "word": "bùng",
            "start": 68.55,
            "end": 68.9
          },
          {
            "word": "từ",
            "start": 68.9,
            "end": 69.08
          },
          {
            "word": "muôn",
            "start": 69.08,
            "end": 69.43
          },
          {
            "word": "phương",
            "start": 69.43,
            "end": 69.96
          }
        ]
      },
      {
        "id": 16,
        "startTime": 70.07,
        "endTime": 72.35,
        "nextLineTime": 72.45,
        "text": "Thuyền con vẫn căng buồm",
        "words": [
          {
            "word": "Thuyền",
            "start": 70.07,
            "end": 70.75
          },
          {
            "word": "con",
            "start": 70.75,
            "end": 71.09
          },
          {
            "word": "vẫn",
            "start": 71.09,
            "end": 71.43
          },
          {
            "word": "căng",
            "start": 71.43,
            "end": 71.89
          },
          {
            "word": "buồm",
            "start": 71.89,
            "end": 72.35
          }
        ]
      },
      {
        "id": 17,
        "startTime": 72.45,
        "endTime": 75.16,
        "nextLineTime": 75.26,
        "text": "Màn đêm có vương nặng vai áo",
        "words": [
          {
            "word": "Màn",
            "start": 72.45,
            "end": 72.82
          },
          {
            "word": "đêm",
            "start": 72.82,
            "end": 73.19
          },
          {
            "word": "có",
            "start": 73.19,
            "end": 73.44
          },
          {
            "word": "vương",
            "start": 73.44,
            "end": 74.06
          },
          {
            "word": "nặng",
            "start": 74.06,
            "end": 74.55
          },
          {
            "word": "vai",
            "start": 74.55,
            "end": 74.92
          },
          {
            "word": "áo",
            "start": 74.92,
            "end": 75.17
          }
        ]
      },
      {
        "id": 18,
        "startTime": 75.26,
        "endTime": 77.93,
        "nextLineTime": 78.03,
        "text": "Ướt đẫm bao hạt sương",
        "words": [
          {
            "word": "Ướt",
            "start": 75.26,
            "end": 75.73
          },
          {
            "word": "đẫm",
            "start": 75.73,
            "end": 76.2
          },
          {
            "word": "bao",
            "start": 76.2,
            "end": 76.67
          },
          {
            "word": "hạt",
            "start": 76.67,
            "end": 77.14
          },
          {
            "word": "sương",
            "start": 77.14,
            "end": 77.93
          }
        ]
      },
      {
        "id": 19,
        "startTime": 78.03,
        "endTime": 79.15,
        "nextLineTime": 79.25,
        "text": "Còn nhiều gian khó",
        "words": [
          {
            "word": "Còn",
            "start": 78.03,
            "end": 78.25
          },
          {
            "word": "nhiều",
            "start": 78.25,
            "end": 78.62
          },
          {
            "word": "gian",
            "start": 78.62,
            "end": 78.92
          },
          {
            "word": "khó",
            "start": 78.92,
            "end": 79.14
          }
        ]
      },
      {
        "id": 20,
        "startTime": 79.25,
        "endTime": 80.73,
        "nextLineTime": 80.83,
        "text": "Đang chờ ở phía trước",
        "words": [
          {
            "word": "Đang",
            "start": 79.25,
            "end": 79.58
          },
          {
            "word": "chờ",
            "start": 79.58,
            "end": 79.83
          },
          {
            "word": "ở",
            "start": 79.83,
            "end": 79.99
          },
          {
            "word": "phía",
            "start": 79.99,
            "end": 80.32
          },
          {
            "word": "trước",
            "start": 80.32,
            "end": 80.73
          }
        ]
      },
      {
        "id": 21,
        "startTime": 80.83,
        "endTime": 82.71,
        "nextLineTime": 82.81,
        "text": "Mẹ dạy con sống kiên cường",
        "words": [
          {
            "word": "Mẹ",
            "start": 80.83,
            "end": 81.01
          },
          {
            "word": "dạy",
            "start": 81.01,
            "end": 81.28
          },
          {
            "word": "con",
            "start": 81.28,
            "end": 81.55
          },
          {
            "word": "sống",
            "start": 81.55,
            "end": 81.91
          },
          {
            "word": "kiên",
            "start": 81.91,
            "end": 82.27
          },
          {
            "word": "cường",
            "start": 82.27,
            "end": 82.72
          }
        ]
      },
      {
        "id": 22,
        "startTime": 82.81,
        "endTime": 85.92,
        "nextLineTime": 86.02,
        "text": "Dù đi xa trăm đường trăm hướng",
        "words": [
          {
            "word": "Dù",
            "start": 82.81,
            "end": 83.07
          },
          {
            "word": "đi",
            "start": 83.07,
            "end": 83.33
          },
          {
            "word": "xa",
            "start": 83.33,
            "end": 83.59
          },
          {
            "word": "trăm",
            "start": 83.59,
            "end": 84.11
          },
          {
            "word": "đường",
            "start": 84.11,
            "end": 84.76
          },
          {
            "word": "trăm",
            "start": 84.76,
            "end": 85.28
          },
          {
            "word": "hướng",
            "start": 85.28,
            "end": 85.93
          }
        ]
      },
      {
        "id": 23,
        "startTime": 86.02,
        "endTime": 89.11,
        "nextLineTime": 89.21,
        "text": "Vẫn nhớ về quê hương",
        "words": [
          {
            "word": "Vẫn",
            "start": 86.02,
            "end": 86.6
          },
          {
            "word": "nhớ",
            "start": 86.6,
            "end": 87.18
          },
          {
            "word": "về",
            "start": 87.18,
            "end": 87.57
          },
          {
            "word": "quê",
            "start": 87.57,
            "end": 88.15
          },
          {
            "word": "hương",
            "start": 88.15,
            "end": 89.12
          }
        ]
      },
      {
        "id": 24,
        "startTime": 89.21,
        "endTime": 90.68,
        "nextLineTime": 90.78,
        "text": "Dạy con cách yêu thương người",
        "words": [
          {
            "word": "Dạy",
            "start": 89.21,
            "end": 89.39
          },
          {
            "word": "con",
            "start": 89.39,
            "end": 89.57
          },
          {
            "word": "cách",
            "start": 89.57,
            "end": 89.81
          },
          {
            "word": "yêu",
            "start": 89.81,
            "end": 89.99
          },
          {
            "word": "thương",
            "start": 89.99,
            "end": 90.36
          },
          {
            "word": "người",
            "start": 90.36,
            "end": 90.67
          }
        ]
      },
      {
        "id": 25,
        "startTime": 90.78,
        "endTime": 93.61,
        "nextLineTime": 93.71,
        "text": "Dạy con khí phách ngút trời",
        "words": [
          {
            "word": "Dạy",
            "start": 90.78,
            "end": 91.17
          },
          {
            "word": "con",
            "start": 91.17,
            "end": 91.56
          },
          {
            "word": "khí",
            "start": 91.56,
            "end": 91.95
          },
          {
            "word": "phách",
            "start": 91.95,
            "end": 92.59
          },
          {
            "word": "ngút",
            "start": 92.59,
            "end": 93.1
          },
          {
            "word": "trời",
            "start": 93.1,
            "end": 93.61
          }
        ]
      },
      {
        "id": 26,
        "startTime": 93.71,
        "endTime": 95.21,
        "nextLineTime": 95.31,
        "text": "Dạy con đứng hiên ngang",
        "words": [
          {
            "word": "Dạy",
            "start": 93.71,
            "end": 93.95
          },
          {
            "word": "con",
            "start": 93.95,
            "end": 94.19
          },
          {
            "word": "đứng",
            "start": 94.19,
            "end": 94.51
          },
          {
            "word": "hiên",
            "start": 94.51,
            "end": 94.83
          },
          {
            "word": "ngang",
            "start": 94.83,
            "end": 95.22
          }
        ]
      },
      {
        "id": 27,
        "startTime": 95.31,
        "endTime": 99.51,
        "nextLineTime": 99.61,
        "text": "Giữ nước non bờ cõi",
        "words": [
          {
            "word": "Giữ",
            "start": 95.31,
            "end": 96.15
          },
          {
            "word": "nước",
            "start": 96.15,
            "end": 97.27
          },
          {
            "word": "non",
            "start": 97.27,
            "end": 98.11
          },
          {
            "word": "bờ",
            "start": 98.11,
            "end": 98.67
          },
          {
            "word": "cõi",
            "start": 98.67,
            "end": 99.51
          }
        ]
      },
      {
        "id": 28,
        "startTime": 99.61,
        "endTime": 101.64,
        "nextLineTime": 101.74,
        "text": "Dù làm mây vắt ngang lưng đồi",
        "words": [
          {
            "word": "Dù",
            "start": 99.61,
            "end": 99.79
          },
          {
            "word": "làm",
            "start": 99.79,
            "end": 100.05
          },
          {
            "word": "mây",
            "start": 100.05,
            "end": 100.31
          },
          {
            "word": "vắt",
            "start": 100.31,
            "end": 100.57
          },
          {
            "word": "ngang",
            "start": 100.57,
            "end": 101.01
          },
          {
            "word": "lưng",
            "start": 101.01,
            "end": 101.36
          },
          {
            "word": "đồi",
            "start": 101.36,
            "end": 101.62
          }
        ]
      },
      {
        "id": 29,
        "startTime": 101.74,
        "endTime": 104.35,
        "nextLineTime": 104.45,
        "text": "Dù làm con sóng xô ngoài khơi",
        "words": [
          {
            "word": "Dù",
            "start": 101.74,
            "end": 101.97
          },
          {
            "word": "làm",
            "start": 101.97,
            "end": 102.31
          },
          {
            "word": "con",
            "start": 102.31,
            "end": 102.65
          },
          {
            "word": "sóng",
            "start": 102.65,
            "end": 103.1
          },
          {
            "word": "xô",
            "start": 103.1,
            "end": 103.33
          },
          {
            "word": "ngoài",
            "start": 103.33,
            "end": 103.9
          },
          {
            "word": "khơi",
            "start": 103.9,
            "end": 104.35
          }
        ]
      },
      {
        "id": 30,
        "startTime": 104.45,
        "endTime": 105.94,
        "nextLineTime": 106.04,
        "text": "Đừng quên tiếng ru cội nguồn",
        "words": [
          {
            "word": "Đừng",
            "start": 104.45,
            "end": 104.71
          },
          {
            "word": "quên",
            "start": 104.71,
            "end": 104.97
          },
          {
            "word": "tiếng",
            "start": 104.97,
            "end": 105.29
          },
          {
            "word": "ru",
            "start": 105.29,
            "end": 105.42
          },
          {
            "word": "cội",
            "start": 105.42,
            "end": 105.61
          },
          {
            "word": "nguồn",
            "start": 105.61,
            "end": 105.93
          }
        ]
      },
      {
        "id": 31,
        "startTime": 106.04,
        "endTime": 110.72,
        "nextLineTime": 110.82,
        "text": "Hỡi đồng bào ơi",
        "words": [
          {
            "word": "Hỡi",
            "start": 106.04,
            "end": 107.21
          },
          {
            "word": "đồng",
            "start": 107.21,
            "end": 108.77
          },
          {
            "word": "bào",
            "start": 108.77,
            "end": 109.94
          },
          {
            "word": "ơi",
            "start": 109.94,
            "end": 110.72
          }
        ]
      },
      {
        "id": 32,
        "startTime": 110.82,
        "endTime": 112.89,
        "nextLineTime": 112.99,
        "text": "À a á a ời",
        "words": [
          {
            "word": "À",
            "start": 110.82,
            "end": 111.23
          },
          {
            "word": "a",
            "start": 111.23,
            "end": 111.64
          },
          {
            "word": "á",
            "start": 111.64,
            "end": 112.05
          },
          {
            "word": "a",
            "start": 112.05,
            "end": 112.46
          },
          {
            "word": "ời",
            "start": 112.46,
            "end": 112.87
          }
        ]
      },
      {
        "id": 33,
        "startTime": 112.99,
        "endTime": 115.01,
        "nextLineTime": 115.11,
        "text": "À a á a ơi",
        "words": [
          {
            "word": "À",
            "start": 112.99,
            "end": 113.39
          },
          {
            "word": "a",
            "start": 113.39,
            "end": 113.79
          },
          {
            "word": "á",
            "start": 113.79,
            "end": 114.19
          },
          {
            "word": "a",
            "start": 114.19,
            "end": 114.59
          },
          {
            "word": "ơi",
            "start": 114.59,
            "end": 114.99
          }
        ]
      },
      {
        "id": 34,
        "startTime": 115.11,
        "endTime": 120.71,
        "nextLineTime": 120.95,
        "text": "Á a a à ới",
        "words": [
          {
            "word": "Á",
            "start": 115.11,
            "end": 116.23
          },
          {
            "word": "a",
            "start": 116.23,
            "end": 117.35
          },
          {
            "word": "a",
            "start": 117.35,
            "end": 118.47
          },
          {
            "word": "à",
            "start": 118.47,
            "end": 119.59
          },
          {
            "word": "ới",
            "start": 119.59,
            "end": 120.71
          }
        ]
      },
      {
        "id": 35,
        "startTime": 120.95,
        "endTime": 122.97,
        "nextLineTime": 123.07,
        "text": "À á a a ời",
        "words": [
          {
            "word": "À",
            "start": 120.95,
            "end": 121.35
          },
          {
            "word": "á",
            "start": 121.35,
            "end": 121.75
          },
          {
            "word": "a",
            "start": 121.75,
            "end": 122.15
          },
          {
            "word": "a",
            "start": 122.15,
            "end": 122.55
          },
          {
            "word": "ời",
            "start": 122.55,
            "end": 122.95
          }
        ]
      },
      {
        "id": 36,
        "startTime": 123.07,
        "endTime": 125.64,
        "nextLineTime": 125.74,
        "text": "À á a à ơi",
        "words": [
          {
            "word": "À",
            "start": 123.07,
            "end": 123.58
          },
          {
            "word": "á",
            "start": 123.58,
            "end": 124.09
          },
          {
            "word": "a",
            "start": 124.09,
            "end": 124.6
          },
          {
            "word": "à",
            "start": 124.6,
            "end": 125.11
          },
          {
            "word": "ơi",
            "start": 125.11,
            "end": 125.62
          }
        ]
      },
      {
        "id": 37,
        "startTime": 125.74,
        "endTime": 131.34,
        "nextLineTime": 157.95,
        "text": "Á a a à ới",
        "words": [
          {
            "word": "Á",
            "start": 125.74,
            "end": 126.86
          },
          {
            "word": "a",
            "start": 126.86,
            "end": 127.98
          },
          {
            "word": "a",
            "start": 127.98,
            "end": 129.1
          },
          {
            "word": "à",
            "start": 129.1,
            "end": 130.22
          },
          {
            "word": "ới",
            "start": 130.22,
            "end": 131.34
          }
        ]
      },
      {
        "id": 38,
        "startTime": 157.95,
        "endTime": 159.92,
        "nextLineTime": 160.02,
        "text": "Nghe lời cha là con tiên rồng",
        "words": [
          {
            "word": "Nghe",
            "start": 157.95,
            "end": 158.29
          },
          {
            "word": "lời",
            "start": 158.29,
            "end": 158.55
          },
          {
            "word": "cha",
            "start": 158.55,
            "end": 158.81
          },
          {
            "word": "là",
            "start": 158.81,
            "end": 158.98
          },
          {
            "word": "con",
            "start": 158.98,
            "end": 159.24
          },
          {
            "word": "tiên",
            "start": 159.24,
            "end": 159.58
          },
          {
            "word": "rồng",
            "start": 159.58,
            "end": 159.92
          }
        ]
      },
      {
        "id": 39,
        "startTime": 160.02,
        "endTime": 162.05,
        "nextLineTime": 162.15,
        "text": "Thì cưỡi mây trời mà bay",
        "words": [
          {
            "word": "Thì",
            "start": 160.02,
            "end": 160.34
          },
          {
            "word": "cưỡi",
            "start": 160.34,
            "end": 160.77
          },
          {
            "word": "mây",
            "start": 160.77,
            "end": 161.09
          },
          {
            "word": "trời",
            "start": 161.09,
            "end": 161.52
          },
          {
            "word": "mà",
            "start": 161.52,
            "end": 161.73
          },
          {
            "word": "bay",
            "start": 161.73,
            "end": 162.05
          }
        ]
      },
      {
        "id": 40,
        "startTime": 162.15,
        "endTime": 163.37,
        "nextLineTime": 163.47,
        "text": "Thẳng lưng mà tung hoành",
        "words": [
          {
            "word": "Thẳng",
            "start": 162.15,
            "end": 162.46
          },
          {
            "word": "lưng",
            "start": 162.46,
            "end": 162.7
          },
          {
            "word": "mà",
            "start": 162.7,
            "end": 162.82
          },
          {
            "word": "tung",
            "start": 162.82,
            "end": 163.06
          },
          {
            "word": "hoành",
            "start": 163.06,
            "end": 163.37
          }
        ]
      },
      {
        "id": 41,
        "startTime": 163.47,
        "endTime": 164.7,
        "nextLineTime": 164.8,
        "text": "Dẫu thế thời đổi thay",
        "words": [
          {
            "word": "Dẫu",
            "start": 163.47,
            "end": 163.69
          },
          {
            "word": "thế",
            "start": 163.69,
            "end": 163.91
          },
          {
            "word": "thời",
            "start": 163.91,
            "end": 164.2
          },
          {
            "word": "đổi",
            "start": 164.2,
            "end": 164.42
          },
          {
            "word": "thay",
            "start": 164.42,
            "end": 164.71
          }
        ]
      },
      {
        "id": 42,
        "startTime": 164.8,
        "endTime": 167.89,
        "nextLineTime": 167.99,
        "text": "Ngựa phi nước đại kiên cường mà đi",
        "words": [
          {
            "word": "Ngựa",
            "start": 164.8,
            "end": 165.26
          },
          {
            "word": "phi",
            "start": 165.26,
            "end": 165.6
          },
          {
            "word": "nước",
            "start": 165.6,
            "end": 166.06
          },
          {
            "word": "đại",
            "start": 166.06,
            "end": 166.4
          },
          {
            "word": "kiên",
            "start": 166.4,
            "end": 166.86
          },
          {
            "word": "cường",
            "start": 166.86,
            "end": 167.43
          },
          {
            "word": "mà",
            "start": 167.43,
            "end": 167.66
          },
          {
            "word": "đi",
            "start": 167.66,
            "end": 167.89
          }
        ]
      },
      {
        "id": 43,
        "startTime": 167.99,
        "endTime": 170.55,
        "nextLineTime": 170.65,
        "text": "Đội non nước trên vai",
        "words": [
          {
            "word": "Đội",
            "start": 167.99,
            "end": 168.44
          },
          {
            "word": "non",
            "start": 168.44,
            "end": 168.89
          },
          {
            "word": "nước",
            "start": 168.89,
            "end": 169.49
          },
          {
            "word": "trên",
            "start": 169.49,
            "end": 170.09
          },
          {
            "word": "vai",
            "start": 170.09,
            "end": 170.54
          }
        ]
      },
      {
        "id": 44,
        "startTime": 170.65,
        "endTime": 171.6,
        "nextLineTime": 171.7,
        "text": "Dạy con rồng lượn rồng bay",
        "words": [
          {
            "word": "Dạy",
            "start": 170.65,
            "end": 170.79
          },
          {
            "word": "con",
            "start": 170.79,
            "end": 170.93
          },
          {
            "word": "rồng",
            "start": 170.93,
            "end": 171.11
          },
          {
            "word": "lượn",
            "start": 171.11,
            "end": 171.29
          },
          {
            "word": "rồng",
            "start": 171.29,
            "end": 171.47
          },
          {
            "word": "bay",
            "start": 171.47,
            "end": 171.61
          }
        ]
      },
      {
        "id": 45,
        "startTime": 171.7,
        "endTime": 172.94,
        "nextLineTime": 173.04,
        "text": "Dù đôi khi rồng chao rồng đảo",
        "words": [
          {
            "word": "Dù",
            "start": 171.7,
            "end": 171.81
          },
          {
            "word": "đôi",
            "start": 171.81,
            "end": 171.97
          },
          {
            "word": "khi",
            "start": 171.97,
            "end": 172.13
          },
          {
            "word": "rồng",
            "start": 172.13,
            "end": 172.35
          },
          {
            "word": "chao",
            "start": 172.35,
            "end": 172.57
          },
          {
            "word": "rồng",
            "start": 172.57,
            "end": 172.79
          },
          {
            "word": "đảo",
            "start": 172.79,
            "end": 172.95
          }
        ]
      },
      {
        "id": 46,
        "startTime": 173.04,
        "endTime": 174.26,
        "nextLineTime": 174.36,
        "text": "Nhưng con không được phép cúi đầu",
        "words": [
          {
            "word": "Nhưng",
            "start": 173.04,
            "end": 173.27
          },
          {
            "word": "con",
            "start": 173.27,
            "end": 173.41
          },
          {
            "word": "không",
            "start": 173.41,
            "end": 173.64
          },
          {
            "word": "được",
            "start": 173.64,
            "end": 173.82
          },
          {
            "word": "phép",
            "start": 173.82,
            "end": 174.0
          },
          {
            "word": "cúi",
            "start": 174.0,
            "end": 174.14
          },
          {
            "word": "đầu",
            "start": 174.14,
            "end": 174.28
          }
        ]
      },
      {
        "id": 47,
        "startTime": 174.36,
        "endTime": 175.86,
        "nextLineTime": 175.96,
        "text": "Đời nhân đời quả người vay người trả",
        "words": [
          {
            "word": "Đời",
            "start": 174.36,
            "end": 174.52
          },
          {
            "word": "nhân",
            "start": 174.52,
            "end": 174.73
          },
          {
            "word": "đời",
            "start": 174.73,
            "end": 174.89
          },
          {
            "word": "quả",
            "start": 174.89,
            "end": 175.05
          },
          {
            "word": "người",
            "start": 175.05,
            "end": 175.31
          },
          {
            "word": "vay",
            "start": 175.31,
            "end": 175.47
          },
          {
            "word": "người",
            "start": 175.47,
            "end": 175.73
          },
          {
            "word": "trả",
            "start": 175.73,
            "end": 175.89
          }
        ]
      },
      {
        "id": 48,
        "startTime": 175.96,
        "endTime": 177.45,
        "nextLineTime": 177.55,
        "text": "Qua cầu thì phải biết nông sâu",
        "words": [
          {
            "word": "Qua",
            "start": 175.96,
            "end": 176.15
          },
          {
            "word": "cầu",
            "start": 176.15,
            "end": 176.34
          },
          {
            "word": "thì",
            "start": 176.34,
            "end": 176.53
          },
          {
            "word": "phải",
            "start": 176.53,
            "end": 176.78
          },
          {
            "word": "biết",
            "start": 176.78,
            "end": 177.03
          },
          {
            "word": "nông",
            "start": 177.03,
            "end": 177.28
          },
          {
            "word": "sâu",
            "start": 177.28,
            "end": 177.47
          }
        ]
      },
      {
        "id": 49,
        "startTime": 177.55,
        "endTime": 178.78,
        "nextLineTime": 178.88,
        "text": "Non sông kết thành vần câu",
        "words": [
          {
            "word": "Non",
            "start": 177.55,
            "end": 177.73
          },
          {
            "word": "sông",
            "start": 177.73,
            "end": 177.96
          },
          {
            "word": "kết",
            "start": 177.96,
            "end": 178.14
          },
          {
            "word": "thành",
            "start": 178.14,
            "end": 178.43
          },
          {
            "word": "vần",
            "start": 178.43,
            "end": 178.61
          },
          {
            "word": "câu",
            "start": 178.61,
            "end": 178.79
          }
        ]
      },
      {
        "id": 50,
        "startTime": 178.88,
        "endTime": 180.38,
        "nextLineTime": 180.48,
        "text": "Anh em hợp ý tâm đầu",
        "words": [
          {
            "word": "Anh",
            "start": 178.88,
            "end": 179.16
          },
          {
            "word": "em",
            "start": 179.16,
            "end": 179.35
          },
          {
            "word": "hợp",
            "start": 179.35,
            "end": 179.63
          },
          {
            "word": "ý",
            "start": 179.63,
            "end": 179.82
          },
          {
            "word": "tâm",
            "start": 179.82,
            "end": 180.1
          },
          {
            "word": "đầu",
            "start": 180.1,
            "end": 180.38
          }
        ]
      },
      {
        "id": 51,
        "startTime": 180.48,
        "endTime": 181.97,
        "nextLineTime": 182.07,
        "text": "Ta say nghĩa tình đậm sâu",
        "words": [
          {
            "word": "Ta",
            "start": 180.48,
            "end": 180.63
          },
          {
            "word": "say",
            "start": 180.63,
            "end": 180.85
          },
          {
            "word": "nghĩa",
            "start": 180.85,
            "end": 181.22
          },
          {
            "word": "tình",
            "start": 181.22,
            "end": 181.52
          },
          {
            "word": "đậm",
            "start": 181.52,
            "end": 181.74
          },
          {
            "word": "sâu",
            "start": 181.74,
            "end": 181.96
          }
        ]
      },
      {
        "id": 52,
        "startTime": 182.07,
        "endTime": 182.87,
        "nextLineTime": 182.86,
        "text": "Ngoắc cả cần câu",
        "words": [
          {
            "word": "Ngoắc",
            "start": 182.07,
            "end": 182.38
          },
          {
            "word": "cả",
            "start": 182.38,
            "end": 182.5
          },
          {
            "word": "cần",
            "start": 182.5,
            "end": 182.68
          },
          {
            "word": "câu",
            "start": 182.68,
            "end": 182.86
          }
        ]
      },
      {
        "id": 53,
        "startTime": 182.86,
        "endTime": 184.36,
        "nextLineTime": 184.46,
        "text": "Nghe lời cha nên con phải kiên cường",
        "words": [
          {
            "word": "Nghe",
            "start": 182.86,
            "end": 183.07
          },
          {
            "word": "lời",
            "start": 183.07,
            "end": 183.23
          },
          {
            "word": "cha",
            "start": 183.23,
            "end": 183.39
          },
          {
            "word": "nên",
            "start": 183.39,
            "end": 183.55
          },
          {
            "word": "con",
            "start": 183.55,
            "end": 183.71
          },
          {
            "word": "phải",
            "start": 183.71,
            "end": 183.92
          },
          {
            "word": "kiên",
            "start": 183.92,
            "end": 184.13
          },
          {
            "word": "cường",
            "start": 184.13,
            "end": 184.39
          }
        ]
      },
      {
        "id": 54,
        "startTime": 184.46,
        "endTime": 185.26,
        "nextLineTime": 185.26,
        "text": "Vì cuộc đời đôi khi",
        "words": [
          {
            "word": "Vì",
            "start": 184.46,
            "end": 184.57
          },
          {
            "word": "cuộc",
            "start": 184.57,
            "end": 184.78
          },
          {
            "word": "đời",
            "start": 184.78,
            "end": 184.94
          },
          {
            "word": "đôi",
            "start": 184.94,
            "end": 185.1
          },
          {
            "word": "khi",
            "start": 185.1,
            "end": 185.26
          }
        ]
      },
      {
        "id": 55,
        "startTime": 185.26,
        "endTime": 186.06,
        "nextLineTime": 186.05,
        "text": "Không ngọt như viên đường",
        "words": [
          {
            "word": "Không",
            "start": 185.26,
            "end": 185.45
          },
          {
            "word": "ngọt",
            "start": 185.45,
            "end": 185.6
          },
          {
            "word": "như",
            "start": 185.6,
            "end": 185.71
          },
          {
            "word": "viên",
            "start": 185.71,
            "end": 185.86
          },
          {
            "word": "đường",
            "start": 185.86,
            "end": 186.05
          }
        ]
      },
      {
        "id": 56,
        "startTime": 186.05,
        "endTime": 187.29,
        "nextLineTime": 187.39,
        "text": "Trên lưng ngựa phải chắc cái dây cương",
        "words": [
          {
            "word": "Trên",
            "start": 186.05,
            "end": 186.21
          },
          {
            "word": "lưng",
            "start": 186.21,
            "end": 186.37
          },
          {
            "word": "ngựa",
            "start": 186.37,
            "end": 186.53
          },
          {
            "word": "phải",
            "start": 186.53,
            "end": 186.69
          },
          {
            "word": "chắc",
            "start": 186.69,
            "end": 186.85
          },
          {
            "word": "cái",
            "start": 186.85,
            "end": 186.97
          },
          {
            "word": "dây",
            "start": 186.97,
            "end": 187.09
          },
          {
            "word": "cương",
            "start": 187.09,
            "end": 187.29
          }
        ]
      },
      {
        "id": 57,
        "startTime": 187.39,
        "endTime": 188.19,
        "nextLineTime": 187.92,
        "text": "Đầu ngẩng cao",
        "words": [
          {
            "word": "Đầu",
            "start": 187.39,
            "end": 187.61
          },
          {
            "word": "ngẩng",
            "start": 187.61,
            "end": 187.97
          },
          {
            "word": "cao",
            "start": 187.97,
            "end": 188.19
          }
        ]
      },
      {
        "id": 58,
        "startTime": 187.92,
        "endTime": 188.88,
        "nextLineTime": 188.98,
        "text": "Nhưng luôn phải khiêm nhường",
        "words": [
          {
            "word": "Nhưng",
            "start": 187.92,
            "end": 188.12
          },
          {
            "word": "luôn",
            "start": 188.12,
            "end": 188.28
          },
          {
            "word": "phải",
            "start": 188.28,
            "end": 188.44
          },
          {
            "word": "khiêm",
            "start": 188.44,
            "end": 188.64
          },
          {
            "word": "nhường",
            "start": 188.64,
            "end": 188.88
          }
        ]
      },
      {
        "id": 59,
        "startTime": 188.98,
        "endTime": 189.78,
        "nextLineTime": 189.77,
        "text": "Trách nhiệm trên vai",
        "words": [
          {
            "word": "Trách",
            "start": 188.98,
            "end": 189.22
          },
          {
            "word": "nhiệm",
            "start": 189.22,
            "end": 189.46
          },
          {
            "word": "trên",
            "start": 189.46,
            "end": 189.65
          },
          {
            "word": "vai",
            "start": 189.65,
            "end": 189.79
          }
        ]
      },
      {
        "id": 60,
        "startTime": 189.77,
        "endTime": 191.0,
        "nextLineTime": 191.1,
        "text": "Phải gánh vác vì con là thân trai",
        "words": [
          {
            "word": "Phải",
            "start": 189.77,
            "end": 189.96
          },
          {
            "word": "gánh",
            "start": 189.96,
            "end": 190.15
          },
          {
            "word": "vác",
            "start": 190.15,
            "end": 190.29
          },
          {
            "word": "vì",
            "start": 190.29,
            "end": 190.38
          },
          {
            "word": "con",
            "start": 190.38,
            "end": 190.52
          },
          {
            "word": "là",
            "start": 190.52,
            "end": 190.61
          },
          {
            "word": "thân",
            "start": 190.61,
            "end": 190.8
          },
          {
            "word": "trai",
            "start": 190.8,
            "end": 190.99
          }
        ]
      },
      {
        "id": 61,
        "startTime": 191.1,
        "endTime": 192.86,
        "nextLineTime": 192.96,
        "text": "Biết cho đi và biết cách nhận lại",
        "words": [
          {
            "word": "Biết",
            "start": 191.1,
            "end": 191.37
          },
          {
            "word": "cho",
            "start": 191.37,
            "end": 191.57
          },
          {
            "word": "đi",
            "start": 191.57,
            "end": 191.71
          },
          {
            "word": "và",
            "start": 191.71,
            "end": 191.85
          },
          {
            "word": "biết",
            "start": 191.85,
            "end": 192.12
          },
          {
            "word": "cách",
            "start": 192.12,
            "end": 192.39
          },
          {
            "word": "nhận",
            "start": 192.39,
            "end": 192.66
          },
          {
            "word": "lại",
            "start": 192.66,
            "end": 192.86
          }
        ]
      },
      {
        "id": 62,
        "startTime": 192.96,
        "endTime": 193.76,
        "nextLineTime": 193.76,
        "text": "Biết cách đối diện",
        "words": [
          {
            "word": "Biết",
            "start": 192.96,
            "end": 193.17
          },
          {
            "word": "cách",
            "start": 193.17,
            "end": 193.38
          },
          {
            "word": "đối",
            "start": 193.38,
            "end": 193.54
          },
          {
            "word": "diện",
            "start": 193.54,
            "end": 193.75
          }
        ]
      },
      {
        "id": 63,
        "startTime": 193.76,
        "endTime": 195.44,
        "nextLineTime": 195.54,
        "text": "Và biết cách sửa sai",
        "words": [
          {
            "word": "Và",
            "start": 193.76,
            "end": 193.97
          },
          {
            "word": "biết",
            "start": 193.97,
            "end": 194.39
          },
          {
            "word": "cách",
            "start": 194.39,
            "end": 194.81
          },
          {
            "word": "sửa",
            "start": 194.81,
            "end": 195.12
          },
          {
            "word": "sai",
            "start": 195.12,
            "end": 195.44
          }
        ]
      },
      {
        "id": 64,
        "startTime": 195.54,
        "endTime": 196.51,
        "nextLineTime": 196.61,
        "text": "Mai đây con đi xa đam mê",
        "words": [
          {
            "word": "Mai",
            "start": 195.54,
            "end": 195.7
          },
          {
            "word": "đây",
            "start": 195.7,
            "end": 195.86
          },
          {
            "word": "con",
            "start": 195.86,
            "end": 196.02
          },
          {
            "word": "đi",
            "start": 196.02,
            "end": 196.13
          },
          {
            "word": "xa",
            "start": 196.13,
            "end": 196.24
          },
          {
            "word": "đam",
            "start": 196.24,
            "end": 196.4
          },
          {
            "word": "mê",
            "start": 196.4,
            "end": 196.51
          }
        ]
      },
      {
        "id": 65,
        "startTime": 196.61,
        "endTime": 197.41,
        "nextLineTime": 197.41,
        "text": "Trong tim đưa con bay cao",
        "words": [
          {
            "word": "Trong",
            "start": 196.61,
            "end": 196.81
          },
          {
            "word": "tim",
            "start": 196.81,
            "end": 196.93
          },
          {
            "word": "đưa",
            "start": 196.93,
            "end": 197.05
          },
          {
            "word": "con",
            "start": 197.05,
            "end": 197.17
          },
          {
            "word": "bay",
            "start": 197.17,
            "end": 197.29
          },
          {
            "word": "cao",
            "start": 197.29,
            "end": 197.41
          }
        ]
      },
      {
        "id": 66,
        "startTime": 197.41,
        "endTime": 198.21,
        "nextLineTime": 198.21,
        "text": "Trong thâm tâm luôn mang theo",
        "words": [
          {
            "word": "Trong",
            "start": 197.41,
            "end": 197.58
          },
          {
            "word": "thâm",
            "start": 197.58,
            "end": 197.71
          },
          {
            "word": "tâm",
            "start": 197.71,
            "end": 197.81
          },
          {
            "word": "luôn",
            "start": 197.81,
            "end": 197.94
          },
          {
            "word": "mang",
            "start": 197.94,
            "end": 198.07
          },
          {
            "word": "theo",
            "start": 198.07,
            "end": 198.2
          }
        ]
      },
      {
        "id": 67,
        "startTime": 198.21,
        "endTime": 199.01,
        "nextLineTime": 199.01,
        "text": "Lời căn dặn ngày nào",
        "words": [
          {
            "word": "Lời",
            "start": 198.21,
            "end": 198.36
          },
          {
            "word": "căn",
            "start": 198.36,
            "end": 198.51
          },
          {
            "word": "dặn",
            "start": 198.51,
            "end": 198.66
          },
          {
            "word": "ngày",
            "start": 198.66,
            "end": 198.86
          },
          {
            "word": "nào",
            "start": 198.86,
            "end": 199.01
          }
        ]
      },
      {
        "id": 68,
        "startTime": 199.01,
        "endTime": 199.81,
        "nextLineTime": 199.73,
        "text": "Thân nam nhi nên không lung lay",
        "words": [
          {
            "word": "Thân",
            "start": 199.01,
            "end": 199.14
          },
          {
            "word": "nam",
            "start": 199.14,
            "end": 199.24
          },
          {
            "word": "nhi",
            "start": 199.24,
            "end": 199.34
          },
          {
            "word": "nên",
            "start": 199.34,
            "end": 199.44
          },
          {
            "word": "không",
            "start": 199.44,
            "end": 199.6
          },
          {
            "word": "lung",
            "start": 199.6,
            "end": 199.73
          },
          {
            "word": "lay",
            "start": 199.73,
            "end": 199.83
          }
        ]
      },
      {
        "id": 69,
        "startTime": 199.73,
        "endTime": 200.53,
        "nextLineTime": 200.2,
        "text": "Vì ba cái chuyện tầm phào",
        "words": [
          {
            "word": "Vì",
            "start": 199.73,
            "end": 199.81
          },
          {
            "word": "ba",
            "start": 199.81,
            "end": 199.89
          },
          {
            "word": "cái",
            "start": 199.89,
            "end": 200.01
          },
          {
            "word": "chuyện",
            "start": 200.01,
            "end": 200.25
          },
          {
            "word": "tầm",
            "start": 200.25,
            "end": 200.37
          },
          {
            "word": "phào",
            "start": 200.37,
            "end": 200.53
          }
        ]
      },
      {
        "id": 70,
        "startTime": 200.2,
        "endTime": 201.0,
        "nextLineTime": 200.99,
        "text": "Phải bỏ ngoài tai mấy lời xì xào",
        "words": [
          {
            "word": "Phải",
            "start": 200.2,
            "end": 200.33
          },
          {
            "word": "bỏ",
            "start": 200.33,
            "end": 200.39
          },
          {
            "word": "ngoài",
            "start": 200.39,
            "end": 200.55
          },
          {
            "word": "tai",
            "start": 200.55,
            "end": 200.65
          },
          {
            "word": "mấy",
            "start": 200.65,
            "end": 200.75
          },
          {
            "word": "lời",
            "start": 200.75,
            "end": 200.85
          },
          {
            "word": "xì",
            "start": 200.85,
            "end": 200.91
          },
          {
            "word": "xào",
            "start": 200.91,
            "end": 201.01
          }
        ]
      },
      {
        "id": 71,
        "startTime": 200.99,
        "endTime": 201.88,
        "nextLineTime": 201.98,
        "text": "Làm từng người yêu mến con tự hào",
        "words": [
          {
            "word": "Làm",
            "start": 200.99,
            "end": 201.09
          },
          {
            "word": "từng",
            "start": 201.09,
            "end": 201.23
          },
          {
            "word": "người",
            "start": 201.23,
            "end": 201.4
          },
          {
            "word": "yêu",
            "start": 201.4,
            "end": 201.5
          },
          {
            "word": "mến",
            "start": 201.5,
            "end": 201.6
          },
          {
            "word": "con",
            "start": 201.6,
            "end": 201.7
          },
          {
            "word": "tự",
            "start": 201.7,
            "end": 201.77
          },
          {
            "word": "hào",
            "start": 201.77,
            "end": 201.87
          }
        ]
      },
      {
        "id": 72,
        "startTime": 201.98,
        "endTime": 203.49,
        "nextLineTime": 203.59,
        "text": "Lao vào đời và con lại chiến đấu",
        "words": [
          {
            "word": "Lao",
            "start": 201.98,
            "end": 202.16
          },
          {
            "word": "vào",
            "start": 202.16,
            "end": 202.34
          },
          {
            "word": "đời",
            "start": 202.34,
            "end": 202.52
          },
          {
            "word": "và",
            "start": 202.52,
            "end": 202.64
          },
          {
            "word": "con",
            "start": 202.64,
            "end": 202.82
          },
          {
            "word": "lại",
            "start": 202.82,
            "end": 203.0
          },
          {
            "word": "chiến",
            "start": 203.0,
            "end": 203.3
          },
          {
            "word": "đấu",
            "start": 203.3,
            "end": 203.48
          }
        ]
      },
      {
        "id": 73,
        "startTime": 203.59,
        "endTime": 204.82,
        "nextLineTime": 204.92,
        "text": "Từng bản nhạc để con biến tấu",
        "words": [
          {
            "word": "Từng",
            "start": 203.59,
            "end": 203.8
          },
          {
            "word": "bản",
            "start": 203.8,
            "end": 203.96
          },
          {
            "word": "nhạc",
            "start": 203.96,
            "end": 204.17
          },
          {
            "word": "để",
            "start": 204.17,
            "end": 204.28
          },
          {
            "word": "con",
            "start": 204.28,
            "end": 204.44
          },
          {
            "word": "biến",
            "start": 204.44,
            "end": 204.65
          },
          {
            "word": "tấu",
            "start": 204.65,
            "end": 204.81
          }
        ]
      },
      {
        "id": 74,
        "startTime": 204.92,
        "endTime": 205.72,
        "nextLineTime": 205.73,
        "text": "Con làm vì gia đình",
        "words": [
          {
            "word": "Con",
            "start": 204.92,
            "end": 205.08
          },
          {
            "word": "làm",
            "start": 205.08,
            "end": 205.24
          },
          {
            "word": "vì",
            "start": 205.24,
            "end": 205.35
          },
          {
            "word": "gia",
            "start": 205.35,
            "end": 205.51
          },
          {
            "word": "đình",
            "start": 205.51,
            "end": 205.72
          }
        ]
      },
      {
        "id": 75,
        "startTime": 205.73,
        "endTime": 206.53,
        "nextLineTime": 206.52,
        "text": "Và vì mảnh đất thiêng",
        "words": [
          {
            "word": "Và",
            "start": 205.73,
            "end": 205.82
          },
          {
            "word": "vì",
            "start": 205.82,
            "end": 205.91
          },
          {
            "word": "mảnh",
            "start": 205.91,
            "end": 206.1
          },
          {
            "word": "đất",
            "start": 206.1,
            "end": 206.24
          },
          {
            "word": "thiêng",
            "start": 206.24,
            "end": 206.52
          }
        ]
      },
      {
        "id": 76,
        "startTime": 206.52,
        "endTime": 207.48,
        "nextLineTime": 207.58,
        "text": "Bởi vì trong huyết quản",
        "words": [
          {
            "word": "Bởi",
            "start": 206.52,
            "end": 206.67
          },
          {
            "word": "vì",
            "start": 206.67,
            "end": 206.77
          },
          {
            "word": "trong",
            "start": 206.77,
            "end": 207.02
          },
          {
            "word": "huyết",
            "start": 207.02,
            "end": 207.27
          },
          {
            "word": "quản",
            "start": 207.27,
            "end": 207.47
          }
        ]
      },
      {
        "id": 77,
        "startTime": 207.58,
        "endTime": 213.18,
        "nextLineTime": 241.75,
        "text": "Là con rồng cháu tiên",
        "words": [
          {
            "word": "Là",
            "start": 207.58,
            "end": 208.24
          },
          {
            "word": "con",
            "start": 208.24,
            "end": 209.23
          },
          {
            "word": "rồng",
            "start": 209.23,
            "end": 210.55
          },
          {
            "word": "cháu",
            "start": 210.55,
            "end": 211.87
          },
          {
            "word": "tiên",
            "start": 211.87,
            "end": 213.19
          }
        ]
      },
      {
        "id": 78,
        "startTime": 241.75,
        "endTime": 245.37,
        "nextLineTime": 245.47,
        "text": "Giống rồng tiên dựng sơn hà",
        "words": [
          {
            "word": "Giống",
            "start": 241.75,
            "end": 242.57
          },
          {
            "word": "rồng",
            "start": 242.57,
            "end": 243.23
          },
          {
            "word": "tiên",
            "start": 243.23,
            "end": 243.89
          },
          {
            "word": "dựng",
            "start": 243.89,
            "end": 244.55
          },
          {
            "word": "sơn",
            "start": 244.55,
            "end": 245.04
          },
          {
            "word": "hà",
            "start": 245.04,
            "end": 245.37
          }
        ]
      },
      {
        "id": 79,
        "startTime": 245.47,
        "endTime": 251.07,
        "nextLineTime": 252.93,
        "text": "Trăm con chung một mái nhà yêu thương",
        "words": [
          {
            "word": "Trăm",
            "start": 245.47,
            "end": 246.22
          },
          {
            "word": "con",
            "start": 246.22,
            "end": 246.78
          },
          {
            "word": "chung",
            "start": 246.78,
            "end": 247.71
          },
          {
            "word": "một",
            "start": 247.71,
            "end": 248.27
          },
          {
            "word": "mái",
            "start": 248.27,
            "end": 248.83
          },
          {
            "word": "nhà",
            "start": 248.83,
            "end": 249.39
          },
          {
            "word": "yêu",
            "start": 249.39,
            "end": 249.95
          },
          {
            "word": "thương",
            "start": 249.95,
            "end": 251.07
          }
        ]
      },
      {
        "id": 80,
        "startTime": 252.93,
        "endTime": 256.01,
        "nextLineTime": 256.11,
        "text": "Thăng Long vươn xa văn hiến ngàn năm",
        "words": [
          {
            "word": "Thăng",
            "start": 252.93,
            "end": 253.46
          },
          {
            "word": "Long",
            "start": 253.46,
            "end": 253.88
          },
          {
            "word": "vươn",
            "start": 253.88,
            "end": 254.3
          },
          {
            "word": "xa",
            "start": 254.3,
            "end": 254.51
          },
          {
            "word": "văn",
            "start": 254.51,
            "end": 254.83
          },
          {
            "word": "hiến",
            "start": 254.83,
            "end": 255.25
          },
          {
            "word": "ngàn",
            "start": 255.25,
            "end": 255.67
          },
          {
            "word": "năm",
            "start": 255.67,
            "end": 255.99
          }
        ]
      },
      {
        "id": 81,
        "startTime": 256.11,
        "endTime": 258.12,
        "nextLineTime": 258.22,
        "text": "Đất trời son sắc nòi giống",
        "words": [
          {
            "word": "Đất",
            "start": 256.11,
            "end": 256.4
          },
          {
            "word": "trời",
            "start": 256.4,
            "end": 256.78
          },
          {
            "word": "son",
            "start": 256.78,
            "end": 257.07
          },
          {
            "word": "sắc",
            "start": 257.07,
            "end": 257.36
          },
          {
            "word": "nòi",
            "start": 257.36,
            "end": 257.65
          },
          {
            "word": "giống",
            "start": 257.65,
            "end": 258.13
          }
        ]
      },
      {
        "id": 82,
        "startTime": 258.22,
        "endTime": 259.72,
        "nextLineTime": 259.82,
        "text": "Tiên trang sử vàng",
        "words": [
          {
            "word": "Tiên",
            "start": 258.22,
            "end": 258.62
          },
          {
            "word": "trang",
            "start": 258.62,
            "end": 259.12
          },
          {
            "word": "sử",
            "start": 259.12,
            "end": 259.32
          },
          {
            "word": "vàng",
            "start": 259.32,
            "end": 259.72
          }
        ]
      },
      {
        "id": 83,
        "startTime": 259.82,
        "endTime": 261.73,
        "nextLineTime": 261.83,
        "text": "A ới a á a a à à a a",
        "words": [
          {
            "word": "A",
            "start": 259.82,
            "end": 260.01
          },
          {
            "word": "ới",
            "start": 260.01,
            "end": 260.2
          },
          {
            "word": "a",
            "start": 260.2,
            "end": 260.39
          },
          {
            "word": "á",
            "start": 260.39,
            "end": 260.58
          },
          {
            "word": "a",
            "start": 260.58,
            "end": 260.77
          },
          {
            "word": "a",
            "start": 260.77,
            "end": 260.96
          },
          {
            "word": "à",
            "start": 260.96,
            "end": 261.15
          },
          {
            "word": "à",
            "start": 261.15,
            "end": 261.34
          },
          {
            "word": "a",
            "start": 261.34,
            "end": 261.53
          },
          {
            "word": "a",
            "start": 261.53,
            "end": 261.72
          }
        ]
      },
      {
        "id": 84,
        "startTime": 261.83,
        "endTime": 265.47,
        "nextLineTime": 265.57,
        "text": "A ới a á a a à à a a",
        "words": [
          {
            "word": "A",
            "start": 261.83,
            "end": 262.19
          },
          {
            "word": "ới",
            "start": 262.19,
            "end": 262.55
          },
          {
            "word": "a",
            "start": 262.55,
            "end": 262.91
          },
          {
            "word": "á",
            "start": 262.91,
            "end": 263.27
          },
          {
            "word": "a",
            "start": 263.27,
            "end": 263.63
          },
          {
            "word": "a",
            "start": 263.63,
            "end": 263.99
          },
          {
            "word": "à",
            "start": 263.99,
            "end": 264.35
          },
          {
            "word": "à",
            "start": 264.35,
            "end": 264.71
          },
          {
            "word": "a",
            "start": 264.71,
            "end": 265.07
          },
          {
            "word": "a",
            "start": 265.07,
            "end": 265.43
          }
        ]
      },
      {
        "id": 85,
        "startTime": 265.57,
        "endTime": 268.14,
        "nextLineTime": 268.24,
        "text": "Ngày hội bên non sông một nhà",
        "words": [
          {
            "word": "Ngày",
            "start": 265.57,
            "end": 266.02
          },
          {
            "word": "hội",
            "start": 266.02,
            "end": 266.36
          },
          {
            "word": "bên",
            "start": 266.36,
            "end": 266.7
          },
          {
            "word": "non",
            "start": 266.7,
            "end": 267.04
          },
          {
            "word": "sông",
            "start": 267.04,
            "end": 267.49
          },
          {
            "word": "một",
            "start": 267.49,
            "end": 267.83
          },
          {
            "word": "nhà",
            "start": 267.83,
            "end": 268.17
          }
        ]
      },
      {
        "id": 86,
        "startTime": 268.24,
        "endTime": 269.15,
        "nextLineTime": 269.25,
        "text": "Anh em ta đồng lòng",
        "words": [
          {
            "word": "Anh",
            "start": 268.24,
            "end": 268.42
          },
          {
            "word": "em",
            "start": 268.42,
            "end": 268.54
          },
          {
            "word": "ta",
            "start": 268.54,
            "end": 268.66
          },
          {
            "word": "đồng",
            "start": 268.66,
            "end": 268.9
          },
          {
            "word": "lòng",
            "start": 268.9,
            "end": 269.14
          }
        ]
      },
      {
        "id": 87,
        "startTime": 269.25,
        "endTime": 270.73,
        "nextLineTime": 270.83,
        "text": "Đồng tâm dựng xây Tổ quốc",
        "words": [
          {
            "word": "Đồng",
            "start": 269.25,
            "end": 269.55
          },
          {
            "word": "tâm",
            "start": 269.55,
            "end": 269.77
          },
          {
            "word": "dựng",
            "start": 269.77,
            "end": 270.07
          },
          {
            "word": "xây",
            "start": 270.07,
            "end": 270.29
          },
          {
            "word": "Tổ",
            "start": 270.29,
            "end": 270.44
          },
          {
            "word": "quốc",
            "start": 270.44,
            "end": 270.74
          }
        ]
      },
      {
        "id": 88,
        "startTime": 270.83,
        "endTime": 272.36,
        "nextLineTime": 272.46,
        "text": "Kỉ nguyên vươn mình vang trời",
        "words": [
          {
            "word": "Kỉ",
            "start": 270.83,
            "end": 270.96
          },
          {
            "word": "nguyên",
            "start": 270.96,
            "end": 271.34
          },
          {
            "word": "vươn",
            "start": 271.34,
            "end": 271.59
          },
          {
            "word": "mình",
            "start": 271.59,
            "end": 271.84
          },
          {
            "word": "vang",
            "start": 271.84,
            "end": 272.09
          },
          {
            "word": "trời",
            "start": 272.09,
            "end": 272.34
          }
        ]
      },
      {
        "id": 89,
        "startTime": 272.46,
        "endTime": 275.55,
        "nextLineTime": 275.65,
        "text": "A ới a á a a à à a a",
        "words": [
          {
            "word": "A",
            "start": 272.46,
            "end": 272.77
          },
          {
            "word": "ới",
            "start": 272.77,
            "end": 273.08
          },
          {
            "word": "a",
            "start": 273.08,
            "end": 273.39
          },
          {
            "word": "á",
            "start": 273.39,
            "end": 273.7
          },
          {
            "word": "a",
            "start": 273.7,
            "end": 274.01
          },
          {
            "word": "a",
            "start": 274.01,
            "end": 274.32
          },
          {
            "word": "à",
            "start": 274.32,
            "end": 274.63
          },
          {
            "word": "à",
            "start": 274.63,
            "end": 274.94
          },
          {
            "word": "a",
            "start": 274.94,
            "end": 275.25
          },
          {
            "word": "a",
            "start": 275.25,
            "end": 275.56
          }
        ]
      },
      {
        "id": 90,
        "startTime": 275.65,
        "endTime": 281.25,
        "nextLineTime": 310.92,
        "text": "A ới a á a a à à a a",
        "words": [
          {
            "word": "A",
            "start": 275.65,
            "end": 276.21
          },
          {
            "word": "ới",
            "start": 276.21,
            "end": 276.77
          },
          {
            "word": "a",
            "start": 276.77,
            "end": 277.33
          },
          {
            "word": "á",
            "start": 277.33,
            "end": 277.89
          },
          {
            "word": "a",
            "start": 277.89,
            "end": 278.45
          },
          {
            "word": "a",
            "start": 278.45,
            "end": 279.01
          },
          {
            "word": "à",
            "start": 279.01,
            "end": 279.57
          },
          {
            "word": "à",
            "start": 279.57,
            "end": 280.13
          },
          {
            "word": "a",
            "start": 280.13,
            "end": 280.69
          },
          {
            "word": "a",
            "start": 280.69,
            "end": 281.25
          }
        ]
      },
      {
        "id": 91,
        "startTime": 310.92,
        "endTime": 312.84,
        "nextLineTime": 312.94,
        "text": "Dạy con cách yêu thương người",
        "words": [
          {
            "word": "Dạy",
            "start": 310.92,
            "end": 311.16
          },
          {
            "word": "con",
            "start": 311.16,
            "end": 311.4
          },
          {
            "word": "cách",
            "start": 311.4,
            "end": 311.72
          },
          {
            "word": "yêu",
            "start": 311.72,
            "end": 311.96
          },
          {
            "word": "thương",
            "start": 311.96,
            "end": 312.44
          },
          {
            "word": "người",
            "start": 312.44,
            "end": 312.84
          }
        ]
      },
      {
        "id": 92,
        "startTime": 312.94,
        "endTime": 315.74,
        "nextLineTime": 315.84,
        "text": "Dạy con khí phách ngút trời",
        "words": [
          {
            "word": "Dạy",
            "start": 312.94,
            "end": 313.32
          },
          {
            "word": "con",
            "start": 313.32,
            "end": 313.7
          },
          {
            "word": "khí",
            "start": 313.7,
            "end": 314.08
          },
          {
            "word": "phách",
            "start": 314.08,
            "end": 314.72
          },
          {
            "word": "ngút",
            "start": 314.72,
            "end": 315.23
          },
          {
            "word": "trời",
            "start": 315.23,
            "end": 315.74
          }
        ]
      },
      {
        "id": 93,
        "startTime": 315.84,
        "endTime": 317.35,
        "nextLineTime": 317.45,
        "text": "Dạy con đứng hiên ngang",
        "words": [
          {
            "word": "Dạy",
            "start": 315.84,
            "end": 316.08
          },
          {
            "word": "con",
            "start": 316.08,
            "end": 316.32
          },
          {
            "word": "đứng",
            "start": 316.32,
            "end": 316.64
          },
          {
            "word": "hiên",
            "start": 316.64,
            "end": 316.96
          },
          {
            "word": "ngang",
            "start": 316.96,
            "end": 317.36
          }
        ]
      },
      {
        "id": 94,
        "startTime": 317.45,
        "endTime": 320.52,
        "nextLineTime": 320.62,
        "text": "Giữ nước non bờ cõi",
        "words": [
          {
            "word": "Giữ",
            "start": 317.45,
            "end": 318.06
          },
          {
            "word": "nước",
            "start": 318.06,
            "end": 318.88
          },
          {
            "word": "non",
            "start": 318.88,
            "end": 319.49
          },
          {
            "word": "bờ",
            "start": 319.49,
            "end": 319.9
          },
          {
            "word": "cõi",
            "start": 319.9,
            "end": 320.51
          }
        ]
      },
      {
        "id": 95,
        "startTime": 320.62,
        "endTime": 323.72,
        "nextLineTime": 323.82,
        "text": "Dù làm mây vắt ngang lưng đồi",
        "words": [
          {
            "word": "Dù",
            "start": 320.62,
            "end": 320.89
          },
          {
            "word": "làm",
            "start": 320.89,
            "end": 321.29
          },
          {
            "word": "mây",
            "start": 321.29,
            "end": 321.69
          },
          {
            "word": "vắt",
            "start": 321.69,
            "end": 322.09
          },
          {
            "word": "ngang",
            "start": 322.09,
            "end": 322.76
          },
          {
            "word": "lưng",
            "start": 322.76,
            "end": 323.3
          },
          {
            "word": "đồi",
            "start": 323.3,
            "end": 323.7
          }
        ]
      },
      {
        "id": 96,
        "startTime": 323.82,
        "endTime": 326.38,
        "nextLineTime": 326.48,
        "text": "Dù làm con sóng xô ngoài khơi",
        "words": [
          {
            "word": "Dù",
            "start": 323.82,
            "end": 324.04
          },
          {
            "word": "làm",
            "start": 324.04,
            "end": 324.37
          },
          {
            "word": "con",
            "start": 324.37,
            "end": 324.7
          },
          {
            "word": "sóng",
            "start": 324.7,
            "end": 325.15
          },
          {
            "word": "xô",
            "start": 325.15,
            "end": 325.37
          },
          {
            "word": "ngoài",
            "start": 325.37,
            "end": 325.93
          },
          {
            "word": "khơi",
            "start": 325.93,
            "end": 326.38
          }
        ]
      },
      {
        "id": 97,
        "startTime": 326.48,
        "endTime": 328.49,
        "nextLineTime": 328.59,
        "text": "Đừng quên tiếng ru cội nguồn",
        "words": [
          {
            "word": "Đừng",
            "start": 326.48,
            "end": 326.83
          },
          {
            "word": "quên",
            "start": 326.83,
            "end": 327.18
          },
          {
            "word": "tiếng",
            "start": 327.18,
            "end": 327.62
          },
          {
            "word": "ru",
            "start": 327.62,
            "end": 327.79
          },
          {
            "word": "cội",
            "start": 327.79,
            "end": 328.05
          },
          {
            "word": "nguồn",
            "start": 328.05,
            "end": 328.49
          }
        ]
      },
      {
        "id": 98,
        "startTime": 328.59,
        "endTime": 331.59,
        "nextLineTime": 331.69,
        "text": "Hỡi đồng bào ơi",
        "words": [
          {
            "word": "Hỡi",
            "start": 328.59,
            "end": 329.34
          },
          {
            "word": "đồng",
            "start": 329.34,
            "end": 330.34
          },
          {
            "word": "bào",
            "start": 330.34,
            "end": 331.09
          },
          {
            "word": "ơi",
            "start": 331.09,
            "end": 331.59
          }
        ]
      },
      {
        "id": 99,
        "startTime": 331.69,
        "endTime": 334.27,
        "nextLineTime": 334.37,
        "text": "Dạy con cách yêu thương người",
        "words": [
          {
            "word": "Dạy",
            "start": 331.69,
            "end": 332.01
          },
          {
            "word": "con",
            "start": 332.01,
            "end": 332.33
          },
          {
            "word": "cách",
            "start": 332.33,
            "end": 332.76
          },
          {
            "word": "yêu",
            "start": 332.76,
            "end": 333.08
          },
          {
            "word": "thương",
            "start": 333.08,
            "end": 333.72
          },
          {
            "word": "người",
            "start": 333.72,
            "end": 334.26
          }
        ]
      },
      {
        "id": 100,
        "startTime": 334.37,
        "endTime": 336.97,
        "nextLineTime": 337.07,
        "text": "Dạy con khí phách ngút trời",
        "words": [
          {
            "word": "Dạy",
            "start": 334.37,
            "end": 334.72
          },
          {
            "word": "con",
            "start": 334.72,
            "end": 335.07
          },
          {
            "word": "khí",
            "start": 335.07,
            "end": 335.42
          },
          {
            "word": "phách",
            "start": 335.42,
            "end": 336.01
          },
          {
            "word": "ngút",
            "start": 336.01,
            "end": 336.48
          },
          {
            "word": "trời",
            "start": 336.48,
            "end": 336.95
          }
        ]
      },
      {
        "id": 101,
        "startTime": 337.07,
        "endTime": 338.56,
        "nextLineTime": 338.66,
        "text": "Dạy con đứng hiên ngang",
        "words": [
          {
            "word": "Dạy",
            "start": 337.07,
            "end": 337.31
          },
          {
            "word": "con",
            "start": 337.31,
            "end": 337.55
          },
          {
            "word": "đứng",
            "start": 337.55,
            "end": 337.86
          },
          {
            "word": "hiên",
            "start": 337.86,
            "end": 338.17
          },
          {
            "word": "ngang",
            "start": 338.17,
            "end": 338.56
          }
        ]
      },
      {
        "id": 102,
        "startTime": 338.66,
        "endTime": 342.28,
        "nextLineTime": 342.38,
        "text": "Giữ nước non bờ cõi",
        "words": [
          {
            "word": "Giữ",
            "start": 338.66,
            "end": 339.38
          },
          {
            "word": "nước",
            "start": 339.38,
            "end": 340.35
          },
          {
            "word": "non",
            "start": 340.35,
            "end": 341.07
          },
          {
            "word": "bờ",
            "start": 341.07,
            "end": 341.55
          },
          {
            "word": "cõi",
            "start": 341.55,
            "end": 342.27
          }
        ]
      },
      {
        "id": 103,
        "startTime": 342.38,
        "endTime": 345.46,
        "nextLineTime": 345.56,
        "text": "Dù làm mây vắt ngang lưng đồi",
        "words": [
          {
            "word": "Dù",
            "start": 342.38,
            "end": 342.65
          },
          {
            "word": "làm",
            "start": 342.65,
            "end": 343.05
          },
          {
            "word": "mây",
            "start": 343.05,
            "end": 343.45
          },
          {
            "word": "vắt",
            "start": 343.45,
            "end": 343.85
          },
          {
            "word": "ngang",
            "start": 343.85,
            "end": 344.52
          },
          {
            "word": "lưng",
            "start": 344.52,
            "end": 345.06
          },
          {
            "word": "đồi",
            "start": 345.06,
            "end": 345.46
          }
        ]
      },
      {
        "id": 104,
        "startTime": 345.56,
        "endTime": 348.12,
        "nextLineTime": 348.22,
        "text": "Dù làm con sóng xô ngoài khơi",
        "words": [
          {
            "word": "Dù",
            "start": 345.56,
            "end": 345.78
          },
          {
            "word": "làm",
            "start": 345.78,
            "end": 346.11
          },
          {
            "word": "con",
            "start": 346.11,
            "end": 346.44
          },
          {
            "word": "sóng",
            "start": 346.44,
            "end": 346.89
          },
          {
            "word": "xô",
            "start": 346.89,
            "end": 347.11
          },
          {
            "word": "ngoài",
            "start": 347.11,
            "end": 347.67
          },
          {
            "word": "khơi",
            "start": 347.67,
            "end": 348.12
          }
        ]
      },
      {
        "id": 105,
        "startTime": 348.22,
        "endTime": 350.26,
        "nextLineTime": 350.36,
        "text": "Đừng quên tiếng ru cội nguồn",
        "words": [
          {
            "word": "Đừng",
            "start": 348.22,
            "end": 348.57
          },
          {
            "word": "quên",
            "start": 348.57,
            "end": 348.92
          },
          {
            "word": "tiếng",
            "start": 348.92,
            "end": 349.36
          },
          {
            "word": "ru",
            "start": 349.36,
            "end": 349.54
          },
          {
            "word": "cội",
            "start": 349.54,
            "end": 349.81
          },
          {
            "word": "nguồn",
            "start": 349.81,
            "end": 350.25
          }
        ]
      },
      {
        "id": 106,
        "startTime": 350.36,
        "endTime": 353.43,
        "nextLineTime": 353.53,
        "text": "Hỡi đồng bào ơi",
        "words": [
          {
            "word": "Hỡi",
            "start": 350.36,
            "end": 351.13
          },
          {
            "word": "đồng",
            "start": 351.13,
            "end": 352.15
          },
          {
            "word": "bào",
            "start": 352.15,
            "end": 352.92
          },
          {
            "word": "ơi",
            "start": 352.92,
            "end": 353.43
          }
        ]
      },
      {
        "id": 107,
        "startTime": 353.53,
        "endTime": 356.11,
        "nextLineTime": 356.21,
        "text": "À a á a ời",
        "words": [
          {
            "word": "À",
            "start": 353.53,
            "end": 354.05
          },
          {
            "word": "a",
            "start": 354.05,
            "end": 354.57
          },
          {
            "word": "á",
            "start": 354.57,
            "end": 355.09
          },
          {
            "word": "a",
            "start": 355.09,
            "end": 355.61
          },
          {
            "word": "ời",
            "start": 355.61,
            "end": 356.13
          }
        ]
      },
      {
        "id": 108,
        "startTime": 356.21,
        "endTime": 358.75,
        "nextLineTime": 358.85,
        "text": "À a á a ơi",
        "words": [
          {
            "word": "À",
            "start": 356.21,
            "end": 356.72
          },
          {
            "word": "a",
            "start": 356.72,
            "end": 357.23
          },
          {
            "word": "á",
            "start": 357.23,
            "end": 357.74
          },
          {
            "word": "a",
            "start": 357.74,
            "end": 358.25
          },
          {
            "word": "ơi",
            "start": 358.25,
            "end": 358.76
          }
        ]
      },
      {
        "id": 109,
        "startTime": 358.85,
        "endTime": 364.37,
        "nextLineTime": 364.47,
        "text": "Á a a à ới",
        "words": [
          {
            "word": "Á",
            "start": 358.85,
            "end": 359.95
          },
          {
            "word": "a",
            "start": 359.95,
            "end": 361.05
          },
          {
            "word": "a",
            "start": 361.05,
            "end": 362.15
          },
          {
            "word": "à",
            "start": 362.15,
            "end": 363.25
          },
          {
            "word": "ới",
            "start": 363.25,
            "end": 364.35
          }
        ]
      },
      {
        "id": 110,
        "startTime": 364.47,
        "endTime": 367.01,
        "nextLineTime": 367.11,
        "text": "À á a a ời",
        "words": [
          {
            "word": "À",
            "start": 364.47,
            "end": 364.98
          },
          {
            "word": "á",
            "start": 364.98,
            "end": 365.49
          },
          {
            "word": "a",
            "start": 365.49,
            "end": 366.0
          },
          {
            "word": "a",
            "start": 366.0,
            "end": 366.51
          },
          {
            "word": "ời",
            "start": 366.51,
            "end": 367.02
          }
        ]
      },
      {
        "id": 111,
        "startTime": 367.11,
        "endTime": 369.66,
        "nextLineTime": 369.76,
        "text": "À á a à ơi",
        "words": [
          {
            "word": "À",
            "start": 367.11,
            "end": 367.62
          },
          {
            "word": "á",
            "start": 367.62,
            "end": 368.13
          },
          {
            "word": "a",
            "start": 368.13,
            "end": 368.64
          },
          {
            "word": "à",
            "start": 368.64,
            "end": 369.15
          },
          {
            "word": "ơi",
            "start": 369.15,
            "end": 369.66
          }
        ]
      },
      {
        "id": 112,
        "startTime": 369.76,
        "endTime": 375.36,
        "nextLineTime": 393.82,
        "text": "Á a a à ới",
        "words": [
          {
            "word": "Á",
            "start": 369.76,
            "end": 370.88
          },
          {
            "word": "a",
            "start": 370.88,
            "end": 372.0
          },
          {
            "word": "a",
            "start": 372.0,
            "end": 373.12
          },
          {
            "word": "à",
            "start": 373.12,
            "end": 374.24
          },
          {
            "word": "ới",
            "start": 374.24,
            "end": 375.36
          }
        ]
      }
    ]
  },
  {
    "id": "karaoke-anh-sang-cua-doi-toi",
    "filename": "ÁNH SÁNG CỦA ĐỜI TÔI.mp3",
    "title": "Ánh Sáng Của Đời Tôi",
    "artist": "Anh Trai Vượt Ngàn Chông Gai (Thai VG, Jun Phạm, Hoàng Rob, Hoàng Dũng)",
    "duration": 353.54,
    "audioUrl": "/karaoke/karaoke-anh-sang-cua-doi-toi.mp3",
    "thumbUrl": "/karaoke/karaoke-anh-sang-cua-doi-toi.jpg",
    "lines": [
      {
        "id": 0,
        "startTime": 46.25,
        "endTime": 51.85,
        "nextLineTime": 52.52,
        "text": "Em đã cất bước quay mặt đi vội vàng",
        "words": [
          {
            "word": "Em",
            "start": 46.25,
            "end": 46.66
          },
          {
            "word": "đã",
            "start": 46.66,
            "end": 47.07
          },
          {
            "word": "cất",
            "start": 47.07,
            "end": 47.69
          },
          {
            "word": "bước",
            "start": 47.69,
            "end": 48.52
          },
          {
            "word": "quay",
            "start": 48.52,
            "end": 49.35
          },
          {
            "word": "mặt",
            "start": 49.35,
            "end": 49.97
          },
          {
            "word": "đi",
            "start": 49.97,
            "end": 50.38
          },
          {
            "word": "vội",
            "start": 50.38,
            "end": 51.0
          },
          {
            "word": "vàng",
            "start": 51.0,
            "end": 51.83
          }
        ]
      },
      {
        "id": 1,
        "startTime": 52.52,
        "endTime": 58.12,
        "nextLineTime": 59.95,
        "text": "Chuyện hôm qua khiến cho lòng ta ngỡ ngàng",
        "words": [
          {
            "word": "Chuyện",
            "start": 52.52,
            "end": 53.51
          },
          {
            "word": "hôm",
            "start": 53.51,
            "end": 54.0
          },
          {
            "word": "qua",
            "start": 54.0,
            "end": 54.49
          },
          {
            "word": "khiến",
            "start": 54.49,
            "end": 55.31
          },
          {
            "word": "cho",
            "start": 55.31,
            "end": 55.8
          },
          {
            "word": "lòng",
            "start": 55.8,
            "end": 56.46
          },
          {
            "word": "ta",
            "start": 56.46,
            "end": 56.79
          },
          {
            "word": "ngỡ",
            "start": 56.79,
            "end": 57.28
          },
          {
            "word": "ngàng",
            "start": 57.28,
            "end": 58.1
          }
        ]
      },
      {
        "id": 2,
        "startTime": 59.95,
        "endTime": 64.89,
        "nextLineTime": 64.99,
        "text": "Giữa căn phòng im tiếng người",
        "words": [
          {
            "word": "Giữa",
            "start": 59.95,
            "end": 60.77
          },
          {
            "word": "căn",
            "start": 60.77,
            "end": 61.39
          },
          {
            "word": "phòng",
            "start": 61.39,
            "end": 62.42
          },
          {
            "word": "im",
            "start": 62.42,
            "end": 62.83
          },
          {
            "word": "tiếng",
            "start": 62.83,
            "end": 63.86
          },
          {
            "word": "người",
            "start": 63.86,
            "end": 64.89
          }
        ]
      },
      {
        "id": 3,
        "startTime": 64.99,
        "endTime": 70.59,
        "nextLineTime": 72.13,
        "text": "Ngoài kia gió gào mưa vẫn rơi",
        "words": [
          {
            "word": "Ngoài",
            "start": 64.99,
            "end": 66.21
          },
          {
            "word": "kia",
            "start": 66.21,
            "end": 66.94
          },
          {
            "word": "gió",
            "start": 66.94,
            "end": 67.67
          },
          {
            "word": "gào",
            "start": 67.67,
            "end": 68.4
          },
          {
            "word": "mưa",
            "start": 68.4,
            "end": 69.13
          },
          {
            "word": "vẫn",
            "start": 69.13,
            "end": 69.86
          },
          {
            "word": "rơi",
            "start": 69.86,
            "end": 70.59
          }
        ]
      },
      {
        "id": 4,
        "startTime": 72.13,
        "endTime": 77.73,
        "nextLineTime": 78.67,
        "text": "Mong em sẽ thứ tha lời nói vô tình",
        "words": [
          {
            "word": "Mong",
            "start": 72.13,
            "end": 72.99
          },
          {
            "word": "em",
            "start": 72.99,
            "end": 73.42
          },
          {
            "word": "sẽ",
            "start": 73.42,
            "end": 73.85
          },
          {
            "word": "thứ",
            "start": 73.85,
            "end": 74.5
          },
          {
            "word": "tha",
            "start": 74.5,
            "end": 75.15
          },
          {
            "word": "lời",
            "start": 75.15,
            "end": 75.8
          },
          {
            "word": "nói",
            "start": 75.8,
            "end": 76.45
          },
          {
            "word": "vô",
            "start": 76.45,
            "end": 76.88
          },
          {
            "word": "tình",
            "start": 76.88,
            "end": 77.74
          }
        ]
      },
      {
        "id": 5,
        "startTime": 78.67,
        "endTime": 84.27,
        "nextLineTime": 85.95,
        "text": "Giờ đây giữa trái tim còn in bóng hình",
        "words": [
          {
            "word": "Giờ",
            "start": 78.67,
            "end": 79.23
          },
          {
            "word": "đây",
            "start": 79.23,
            "end": 79.79
          },
          {
            "word": "giữa",
            "start": 79.79,
            "end": 80.54
          },
          {
            "word": "trái",
            "start": 80.54,
            "end": 81.29
          },
          {
            "word": "tim",
            "start": 81.29,
            "end": 81.85
          },
          {
            "word": "còn",
            "start": 81.85,
            "end": 82.41
          },
          {
            "word": "in",
            "start": 82.41,
            "end": 82.78
          },
          {
            "word": "bóng",
            "start": 82.78,
            "end": 83.53
          },
          {
            "word": "hình",
            "start": 83.53,
            "end": 84.28
          }
        ]
      },
      {
        "id": 6,
        "startTime": 85.95,
        "endTime": 90.79,
        "nextLineTime": 90.89,
        "text": "Có em kề bên nói cười",
        "words": [
          {
            "word": "Có",
            "start": 85.95,
            "end": 86.56
          },
          {
            "word": "em",
            "start": 86.56,
            "end": 87.17
          },
          {
            "word": "kề",
            "start": 87.17,
            "end": 87.78
          },
          {
            "word": "bên",
            "start": 87.78,
            "end": 88.69
          },
          {
            "word": "nói",
            "start": 88.69,
            "end": 89.6
          },
          {
            "word": "cười",
            "start": 89.6,
            "end": 90.81
          }
        ]
      },
      {
        "id": 7,
        "startTime": 90.89,
        "endTime": 96.49,
        "nextLineTime": 98.12,
        "text": "Người là ánh sáng của đời tôi",
        "words": [
          {
            "word": "Người",
            "start": 90.89,
            "end": 92.11
          },
          {
            "word": "là",
            "start": 92.11,
            "end": 92.6
          },
          {
            "word": "ánh",
            "start": 92.6,
            "end": 93.33
          },
          {
            "word": "sáng",
            "start": 93.33,
            "end": 94.3
          },
          {
            "word": "của",
            "start": 94.3,
            "end": 95.03
          },
          {
            "word": "đời",
            "start": 95.03,
            "end": 95.76
          },
          {
            "word": "tôi",
            "start": 95.76,
            "end": 96.49
          }
        ]
      },
      {
        "id": 8,
        "startTime": 98.12,
        "endTime": 103.72,
        "nextLineTime": 104.57,
        "text": "Khi em đã bước đi chẳng quay trở về",
        "words": [
          {
            "word": "Khi",
            "start": 98.12,
            "end": 98.74
          },
          {
            "word": "em",
            "start": 98.74,
            "end": 99.15
          },
          {
            "word": "đã",
            "start": 99.15,
            "end": 99.56
          },
          {
            "word": "bước",
            "start": 99.56,
            "end": 100.39
          },
          {
            "word": "đi",
            "start": 100.39,
            "end": 100.8
          },
          {
            "word": "chẳng",
            "start": 100.8,
            "end": 101.84
          },
          {
            "word": "quay",
            "start": 101.84,
            "end": 102.67
          },
          {
            "word": "trở",
            "start": 102.67,
            "end": 103.29
          },
          {
            "word": "về",
            "start": 103.29,
            "end": 103.7
          }
        ]
      },
      {
        "id": 9,
        "startTime": 104.57,
        "endTime": 109.87,
        "nextLineTime": 109.97,
        "text": "Nghe như trong lòng anh băng giá tái tê",
        "words": [
          {
            "word": "Nghe",
            "start": 104.57,
            "end": 105.25
          },
          {
            "word": "như",
            "start": 105.25,
            "end": 105.76
          },
          {
            "word": "trong",
            "start": 105.76,
            "end": 106.61
          },
          {
            "word": "lòng",
            "start": 106.61,
            "end": 107.29
          },
          {
            "word": "anh",
            "start": 107.29,
            "end": 107.8
          },
          {
            "word": "băng",
            "start": 107.8,
            "end": 108.48
          },
          {
            "word": "giá",
            "start": 108.48,
            "end": 108.99
          },
          {
            "word": "tái",
            "start": 108.99,
            "end": 109.5
          },
          {
            "word": "tê",
            "start": 109.5,
            "end": 109.84
          }
        ]
      },
      {
        "id": 10,
        "startTime": 109.97,
        "endTime": 112.54,
        "nextLineTime": 112.64,
        "text": "Anh mới hay rằng trái",
        "words": [
          {
            "word": "Anh",
            "start": 109.97,
            "end": 110.42
          },
          {
            "word": "mới",
            "start": 110.42,
            "end": 110.87
          },
          {
            "word": "hay",
            "start": 110.87,
            "end": 111.32
          },
          {
            "word": "rằng",
            "start": 111.32,
            "end": 111.92
          },
          {
            "word": "trái",
            "start": 111.92,
            "end": 112.52
          }
        ]
      },
      {
        "id": 11,
        "startTime": 112.64,
        "endTime": 116.56,
        "nextLineTime": 116.66,
        "text": "tim đã hiến dâng người",
        "words": [
          {
            "word": "tim",
            "start": 112.64,
            "end": 113.29
          },
          {
            "word": "đã",
            "start": 113.29,
            "end": 113.73
          },
          {
            "word": "hiến",
            "start": 113.73,
            "end": 114.6
          },
          {
            "word": "dâng",
            "start": 114.6,
            "end": 115.47
          },
          {
            "word": "người",
            "start": 115.47,
            "end": 116.56
          }
        ]
      },
      {
        "id": 12,
        "startTime": 116.66,
        "endTime": 122.26,
        "nextLineTime": 123.97,
        "text": "Đời anh vô nghĩa khi lìa xa người ơi",
        "words": [
          {
            "word": "Đời",
            "start": 116.66,
            "end": 117.26
          },
          {
            "word": "anh",
            "start": 117.26,
            "end": 117.86
          },
          {
            "word": "vô",
            "start": 117.86,
            "end": 118.26
          },
          {
            "word": "nghĩa",
            "start": 118.26,
            "end": 119.26
          },
          {
            "word": "khi",
            "start": 119.26,
            "end": 119.86
          },
          {
            "word": "lìa",
            "start": 119.86,
            "end": 120.46
          },
          {
            "word": "xa",
            "start": 120.46,
            "end": 120.86
          },
          {
            "word": "người",
            "start": 120.86,
            "end": 121.86
          },
          {
            "word": "ơi",
            "start": 121.86,
            "end": 122.26
          }
        ]
      },
      {
        "id": 13,
        "startTime": 123.97,
        "endTime": 129.57,
        "nextLineTime": 130.3,
        "text": "Cơn giông tố nhỏ nhoi rồi sẽ phai tàn",
        "words": [
          {
            "word": "Cơn",
            "start": 123.97,
            "end": 124.55
          },
          {
            "word": "giông",
            "start": 124.55,
            "end": 125.52
          },
          {
            "word": "tố",
            "start": 125.52,
            "end": 125.91
          },
          {
            "word": "nhỏ",
            "start": 125.91,
            "end": 126.49
          },
          {
            "word": "nhoi",
            "start": 126.49,
            "end": 127.26
          },
          {
            "word": "rồi",
            "start": 127.26,
            "end": 127.84
          },
          {
            "word": "sẽ",
            "start": 127.84,
            "end": 128.23
          },
          {
            "word": "phai",
            "start": 128.23,
            "end": 129.0
          },
          {
            "word": "tàn",
            "start": 129.0,
            "end": 129.58
          }
        ]
      },
      {
        "id": 14,
        "startTime": 130.3,
        "endTime": 135.9,
        "nextLineTime": 136.17,
        "text": "Xin bao dung để tình yêu mãi chứa chan",
        "words": [
          {
            "word": "Xin",
            "start": 130.3,
            "end": 130.86
          },
          {
            "word": "bao",
            "start": 130.86,
            "end": 131.42
          },
          {
            "word": "dung",
            "start": 131.42,
            "end": 132.17
          },
          {
            "word": "để",
            "start": 132.17,
            "end": 132.54
          },
          {
            "word": "tình",
            "start": 132.54,
            "end": 133.29
          },
          {
            "word": "yêu",
            "start": 133.29,
            "end": 133.85
          },
          {
            "word": "mãi",
            "start": 133.85,
            "end": 134.41
          },
          {
            "word": "chứa",
            "start": 134.41,
            "end": 135.16
          },
          {
            "word": "chan",
            "start": 135.16,
            "end": 135.91
          }
        ]
      },
      {
        "id": 15,
        "startTime": 136.17,
        "endTime": 141.77,
        "nextLineTime": 143.33,
        "text": "Cõi thiên đường sẽ hoang tàn nếu vắng em",
        "words": [
          {
            "word": "Cõi",
            "start": 136.17,
            "end": 136.69
          },
          {
            "word": "thiên",
            "start": 136.69,
            "end": 137.56
          },
          {
            "word": "đường",
            "start": 137.56,
            "end": 138.44
          },
          {
            "word": "sẽ",
            "start": 138.44,
            "end": 138.79
          },
          {
            "word": "hoang",
            "start": 138.79,
            "end": 139.66
          },
          {
            "word": "tàn",
            "start": 139.66,
            "end": 140.19
          },
          {
            "word": "nếu",
            "start": 140.19,
            "end": 140.72
          },
          {
            "word": "vắng",
            "start": 140.72,
            "end": 141.42
          },
          {
            "word": "em",
            "start": 141.42,
            "end": 141.77
          }
        ]
      },
      {
        "id": 16,
        "startTime": 143.33,
        "endTime": 148.93,
        "nextLineTime": 150.7,
        "text": "Ngàn trăng sao nhớ em đêm đêm",
        "words": [
          {
            "word": "Ngàn",
            "start": 143.33,
            "end": 144.3
          },
          {
            "word": "trăng",
            "start": 144.3,
            "end": 145.52
          },
          {
            "word": "sao",
            "start": 145.52,
            "end": 146.25
          },
          {
            "word": "nhớ",
            "start": 146.25,
            "end": 146.98
          },
          {
            "word": "em",
            "start": 146.98,
            "end": 147.47
          },
          {
            "word": "đêm",
            "start": 147.47,
            "end": 148.2
          },
          {
            "word": "đêm",
            "start": 148.2,
            "end": 148.93
          }
        ]
      },
      {
        "id": 17,
        "startTime": 150.7,
        "endTime": 153.88,
        "nextLineTime": 153.98,
        "text": "La-da-da-di-da",
        "words": [
          {
            "word": "La-da-da-di-da",
            "start": 150.7,
            "end": 153.88
          }
        ]
      },
      {
        "id": 18,
        "startTime": 153.98,
        "endTime": 157.05,
        "nextLineTime": 157.15,
        "text": "La-da-da-di-da",
        "words": [
          {
            "word": "La-da-da-di-da",
            "start": 153.98,
            "end": 157.05
          }
        ]
      },
      {
        "id": 19,
        "startTime": 157.15,
        "endTime": 162.75,
        "nextLineTime": 162.93,
        "text": "La-da-da-di-da-da-da-da-da-da",
        "words": [
          {
            "word": "La-da-da-di-da-da-da-da-da-da",
            "start": 157.15,
            "end": 162.75
          }
        ]
      },
      {
        "id": 20,
        "startTime": 162.93,
        "endTime": 165.07,
        "nextLineTime": 165.17,
        "text": "Anh gửi tâm sự qua",
        "words": [
          {
            "word": "Anh",
            "start": 162.93,
            "end": 163.39
          },
          {
            "word": "gửi",
            "start": 163.39,
            "end": 163.85
          },
          {
            "word": "tâm",
            "start": 163.85,
            "end": 164.31
          },
          {
            "word": "sự",
            "start": 164.31,
            "end": 164.62
          },
          {
            "word": "qua",
            "start": 164.62,
            "end": 165.08
          }
        ]
      },
      {
        "id": 21,
        "startTime": 165.17,
        "endTime": 169.21,
        "nextLineTime": 169.31,
        "text": "trời cao xuống nới em ngồi",
        "words": [
          {
            "word": "trời",
            "start": 165.17,
            "end": 165.94
          },
          {
            "word": "cao",
            "start": 165.94,
            "end": 166.52
          },
          {
            "word": "xuống",
            "start": 166.52,
            "end": 167.48
          },
          {
            "word": "nới",
            "start": 167.48,
            "end": 168.06
          },
          {
            "word": "em",
            "start": 168.06,
            "end": 168.44
          },
          {
            "word": "ngồi",
            "start": 168.44,
            "end": 169.21
          }
        ]
      },
      {
        "id": 22,
        "startTime": 169.31,
        "endTime": 171.88,
        "nextLineTime": 171.98,
        "text": "Mang bình minh này thay",
        "words": [
          {
            "word": "Mang",
            "start": 169.31,
            "end": 169.85
          },
          {
            "word": "bình",
            "start": 169.85,
            "end": 170.39
          },
          {
            "word": "minh",
            "start": 170.39,
            "end": 170.93
          },
          {
            "word": "này",
            "start": 170.93,
            "end": 171.34
          },
          {
            "word": "thay",
            "start": 171.34,
            "end": 171.88
          }
        ]
      },
      {
        "id": 23,
        "startTime": 171.98,
        "endTime": 174.65,
        "nextLineTime": 174.75,
        "text": "nụ hôn sưởi ấm đơn côi",
        "words": [
          {
            "word": "nụ",
            "start": 171.98,
            "end": 172.29
          },
          {
            "word": "hôn",
            "start": 172.29,
            "end": 172.76
          },
          {
            "word": "sưởi",
            "start": 172.76,
            "end": 173.39
          },
          {
            "word": "ấm",
            "start": 173.39,
            "end": 173.7
          },
          {
            "word": "đơn",
            "start": 173.7,
            "end": 174.17
          },
          {
            "word": "côi",
            "start": 174.17,
            "end": 174.64
          }
        ]
      },
      {
        "id": 24,
        "startTime": 174.75,
        "endTime": 177.18,
        "nextLineTime": 177.28,
        "text": "Chỉ cần dù một khắc khi",
        "words": [
          {
            "word": "Chỉ",
            "start": 174.75,
            "end": 175.16
          },
          {
            "word": "cần",
            "start": 175.16,
            "end": 175.56
          },
          {
            "word": "dù",
            "start": 175.56,
            "end": 175.83
          },
          {
            "word": "một",
            "start": 175.83,
            "end": 176.24
          },
          {
            "word": "khắc",
            "start": 176.24,
            "end": 176.78
          },
          {
            "word": "khi",
            "start": 176.78,
            "end": 177.19
          }
        ]
      },
      {
        "id": 25,
        "startTime": 177.28,
        "endTime": 181.12,
        "nextLineTime": 181.22,
        "text": "ngước nhìn trời em thấy vui",
        "words": [
          {
            "word": "ngước",
            "start": 177.28,
            "end": 178.15
          },
          {
            "word": "nhìn",
            "start": 178.15,
            "end": 178.85
          },
          {
            "word": "trời",
            "start": 178.85,
            "end": 179.55
          },
          {
            "word": "em",
            "start": 179.55,
            "end": 179.9
          },
          {
            "word": "thấy",
            "start": 179.9,
            "end": 180.6
          },
          {
            "word": "vui",
            "start": 180.6,
            "end": 181.12
          }
        ]
      },
      {
        "id": 26,
        "startTime": 181.22,
        "endTime": 183.87,
        "nextLineTime": 183.97,
        "text": "Một chút ánh sáng nhỏ nhoi sẽ",
        "words": [
          {
            "word": "Một",
            "start": 181.22,
            "end": 181.57
          },
          {
            "word": "chút",
            "start": 181.57,
            "end": 182.03
          },
          {
            "word": "ánh",
            "start": 182.03,
            "end": 182.38
          },
          {
            "word": "sáng",
            "start": 182.38,
            "end": 182.84
          },
          {
            "word": "nhỏ",
            "start": 182.84,
            "end": 183.19
          },
          {
            "word": "nhoi",
            "start": 183.19,
            "end": 183.65
          },
          {
            "word": "sẽ",
            "start": 183.65,
            "end": 183.88
          }
        ]
      },
      {
        "id": 27,
        "startTime": 183.97,
        "endTime": 187.17,
        "nextLineTime": 187.27,
        "text": "thắp trong màn đêm anh lẻ loi",
        "words": [
          {
            "word": "thắp",
            "start": 183.97,
            "end": 184.53
          },
          {
            "word": "trong",
            "start": 184.53,
            "end": 185.23
          },
          {
            "word": "màn",
            "start": 185.23,
            "end": 185.65
          },
          {
            "word": "đêm",
            "start": 185.65,
            "end": 186.07
          },
          {
            "word": "anh",
            "start": 186.07,
            "end": 186.49
          },
          {
            "word": "lẻ",
            "start": 186.49,
            "end": 186.77
          },
          {
            "word": "loi",
            "start": 186.77,
            "end": 187.19
          }
        ]
      },
      {
        "id": 28,
        "startTime": 187.27,
        "endTime": 188.61,
        "nextLineTime": 188.71,
        "text": "Người hỡi",
        "words": [
          {
            "word": "Người",
            "start": 187.27,
            "end": 188.11
          },
          {
            "word": "hỡi",
            "start": 188.11,
            "end": 188.61
          }
        ]
      },
      {
        "id": 29,
        "startTime": 188.71,
        "endTime": 194.31,
        "nextLineTime": 195.36,
        "text": "Khi em đã bước đi chẳng quay trở về (Hỡi)",
        "words": [
          {
            "word": "Khi",
            "start": 188.71,
            "end": 189.24
          },
          {
            "word": "em",
            "start": 189.24,
            "end": 189.59
          },
          {
            "word": "đã",
            "start": 189.59,
            "end": 189.94
          },
          {
            "word": "bước",
            "start": 189.94,
            "end": 190.64
          },
          {
            "word": "đi",
            "start": 190.64,
            "end": 190.99
          },
          {
            "word": "chẳng",
            "start": 190.99,
            "end": 191.87
          },
          {
            "word": "quay",
            "start": 191.87,
            "end": 192.57
          },
          {
            "word": "trở",
            "start": 192.57,
            "end": 193.09
          },
          {
            "word": "về",
            "start": 193.09,
            "end": 193.44
          },
          {
            "word": "(Hỡi)",
            "start": 193.44,
            "end": 194.31
          }
        ]
      },
      {
        "id": 30,
        "startTime": 195.36,
        "endTime": 200.68,
        "nextLineTime": 200.78,
        "text": "Nghe như trong lòng anh băng giá tái tê",
        "words": [
          {
            "word": "Nghe",
            "start": 195.36,
            "end": 196.05
          },
          {
            "word": "như",
            "start": 196.05,
            "end": 196.56
          },
          {
            "word": "trong",
            "start": 196.56,
            "end": 197.42
          },
          {
            "word": "lòng",
            "start": 197.42,
            "end": 198.11
          },
          {
            "word": "anh",
            "start": 198.11,
            "end": 198.62
          },
          {
            "word": "băng",
            "start": 198.62,
            "end": 199.31
          },
          {
            "word": "giá",
            "start": 199.31,
            "end": 199.82
          },
          {
            "word": "tái",
            "start": 199.82,
            "end": 200.33
          },
          {
            "word": "tê",
            "start": 200.33,
            "end": 200.67
          }
        ]
      },
      {
        "id": 31,
        "startTime": 200.78,
        "endTime": 203.35,
        "nextLineTime": 203.45,
        "text": "Anh mới hay rằng trái",
        "words": [
          {
            "word": "Anh",
            "start": 200.78,
            "end": 201.23
          },
          {
            "word": "mới",
            "start": 201.23,
            "end": 201.68
          },
          {
            "word": "hay",
            "start": 201.68,
            "end": 202.13
          },
          {
            "word": "rằng",
            "start": 202.13,
            "end": 202.73
          },
          {
            "word": "trái",
            "start": 202.73,
            "end": 203.33
          }
        ]
      },
      {
        "id": 32,
        "startTime": 203.45,
        "endTime": 207.39,
        "nextLineTime": 207.49,
        "text": "tim đã hiến dâng người",
        "words": [
          {
            "word": "tim",
            "start": 203.45,
            "end": 204.11
          },
          {
            "word": "đã",
            "start": 204.11,
            "end": 204.55
          },
          {
            "word": "hiến",
            "start": 204.55,
            "end": 205.43
          },
          {
            "word": "dâng",
            "start": 205.43,
            "end": 206.31
          },
          {
            "word": "người",
            "start": 206.31,
            "end": 207.4
          }
        ]
      },
      {
        "id": 33,
        "startTime": 207.49,
        "endTime": 213.09,
        "nextLineTime": 214.77,
        "text": "Đời anh vô nghĩa khi lìa xa người ơi",
        "words": [
          {
            "word": "Đời",
            "start": 207.49,
            "end": 208.09
          },
          {
            "word": "anh",
            "start": 208.09,
            "end": 208.69
          },
          {
            "word": "vô",
            "start": 208.69,
            "end": 209.09
          },
          {
            "word": "nghĩa",
            "start": 209.09,
            "end": 210.09
          },
          {
            "word": "khi",
            "start": 210.09,
            "end": 210.69
          },
          {
            "word": "lìa",
            "start": 210.69,
            "end": 211.29
          },
          {
            "word": "xa",
            "start": 211.29,
            "end": 211.69
          },
          {
            "word": "người",
            "start": 211.69,
            "end": 212.69
          },
          {
            "word": "ơi",
            "start": 212.69,
            "end": 213.09
          }
        ]
      },
      {
        "id": 34,
        "startTime": 214.77,
        "endTime": 220.37,
        "nextLineTime": 221.2,
        "text": "Cơn giông tố nhỏ nhoi rồi sẽ phai tàn",
        "words": [
          {
            "word": "Cơn",
            "start": 214.77,
            "end": 215.35
          },
          {
            "word": "giông",
            "start": 215.35,
            "end": 216.32
          },
          {
            "word": "tố",
            "start": 216.32,
            "end": 216.71
          },
          {
            "word": "nhỏ",
            "start": 216.71,
            "end": 217.29
          },
          {
            "word": "nhoi",
            "start": 217.29,
            "end": 218.06
          },
          {
            "word": "rồi",
            "start": 218.06,
            "end": 218.64
          },
          {
            "word": "sẽ",
            "start": 218.64,
            "end": 219.03
          },
          {
            "word": "phai",
            "start": 219.03,
            "end": 219.8
          },
          {
            "word": "tàn",
            "start": 219.8,
            "end": 220.38
          }
        ]
      },
      {
        "id": 35,
        "startTime": 221.2,
        "endTime": 226.8,
        "nextLineTime": 227.03,
        "text": "Xin bao dung để tình yêu mãi chứa chan",
        "words": [
          {
            "word": "Xin",
            "start": 221.2,
            "end": 221.76
          },
          {
            "word": "bao",
            "start": 221.76,
            "end": 222.32
          },
          {
            "word": "dung",
            "start": 222.32,
            "end": 223.07
          },
          {
            "word": "để",
            "start": 223.07,
            "end": 223.44
          },
          {
            "word": "tình",
            "start": 223.44,
            "end": 224.19
          },
          {
            "word": "yêu",
            "start": 224.19,
            "end": 224.75
          },
          {
            "word": "mãi",
            "start": 224.75,
            "end": 225.31
          },
          {
            "word": "chứa",
            "start": 225.31,
            "end": 226.06
          },
          {
            "word": "chan",
            "start": 226.06,
            "end": 226.81
          }
        ]
      },
      {
        "id": 36,
        "startTime": 227.03,
        "endTime": 232.63,
        "nextLineTime": 234.42,
        "text": "Cõi thiên đường sẽ hoang tàn nếu vắng em",
        "words": [
          {
            "word": "Cõi",
            "start": 227.03,
            "end": 227.56
          },
          {
            "word": "thiên",
            "start": 227.56,
            "end": 228.44
          },
          {
            "word": "đường",
            "start": 228.44,
            "end": 229.31
          },
          {
            "word": "sẽ",
            "start": 229.31,
            "end": 229.66
          },
          {
            "word": "hoang",
            "start": 229.66,
            "end": 230.53
          },
          {
            "word": "tàn",
            "start": 230.53,
            "end": 231.06
          },
          {
            "word": "nếu",
            "start": 231.06,
            "end": 231.59
          },
          {
            "word": "vắng",
            "start": 231.59,
            "end": 232.29
          },
          {
            "word": "em",
            "start": 232.29,
            "end": 232.64
          }
        ]
      },
      {
        "id": 37,
        "startTime": 234.42,
        "endTime": 239.31,
        "nextLineTime": 239.41,
        "text": "Ngàn trăng sao nhớ em đêm đêm",
        "words": [
          {
            "word": "Ngàn",
            "start": 234.42,
            "end": 235.27
          },
          {
            "word": "trăng",
            "start": 235.27,
            "end": 236.33
          },
          {
            "word": "sao",
            "start": 236.33,
            "end": 236.97
          },
          {
            "word": "nhớ",
            "start": 236.97,
            "end": 237.61
          },
          {
            "word": "em",
            "start": 237.61,
            "end": 238.04
          },
          {
            "word": "đêm",
            "start": 238.04,
            "end": 238.68
          },
          {
            "word": "đêm",
            "start": 238.68,
            "end": 239.32
          }
        ]
      },
      {
        "id": 38,
        "startTime": 239.41,
        "endTime": 240.93,
        "nextLineTime": 241.03,
        "text": "Từng đêm anh thức, trong",
        "words": [
          {
            "word": "Từng",
            "start": 239.41,
            "end": 239.73
          },
          {
            "word": "đêm",
            "start": 239.73,
            "end": 239.97
          },
          {
            "word": "anh",
            "start": 239.97,
            "end": 240.21
          },
          {
            "word": "thức,",
            "start": 240.21,
            "end": 240.53
          },
          {
            "word": "trong",
            "start": 240.53,
            "end": 240.93
          }
        ]
      },
      {
        "id": 39,
        "startTime": 241.03,
        "endTime": 242.58,
        "nextLineTime": 242.68,
        "text": "màn mưa rơi ngoài hiên",
        "words": [
          {
            "word": "màn",
            "start": 241.03,
            "end": 241.29
          },
          {
            "word": "mưa",
            "start": 241.29,
            "end": 241.55
          },
          {
            "word": "rơi",
            "start": 241.55,
            "end": 241.81
          },
          {
            "word": "ngoài",
            "start": 241.81,
            "end": 242.24
          },
          {
            "word": "hiên",
            "start": 242.24,
            "end": 242.58
          }
        ]
      },
      {
        "id": 40,
        "startTime": 242.68,
        "endTime": 243.89,
        "nextLineTime": 243.99,
        "text": "Bao nhiêu tổn thương",
        "words": [
          {
            "word": "Bao",
            "start": 242.68,
            "end": 242.89
          },
          {
            "word": "nhiêu",
            "start": 242.89,
            "end": 243.25
          },
          {
            "word": "tổn",
            "start": 243.25,
            "end": 243.46
          },
          {
            "word": "thương",
            "start": 243.46,
            "end": 243.89
          }
        ]
      },
      {
        "id": 41,
        "startTime": 243.99,
        "endTime": 245.7,
        "nextLineTime": 245.8,
        "text": "mình giữ trong lòng riêng",
        "words": [
          {
            "word": "mình",
            "start": 243.99,
            "end": 244.32
          },
          {
            "word": "giữ",
            "start": 244.32,
            "end": 244.56
          },
          {
            "word": "trong",
            "start": 244.56,
            "end": 244.97
          },
          {
            "word": "lòng",
            "start": 244.97,
            "end": 245.3
          },
          {
            "word": "riêng",
            "start": 245.3,
            "end": 245.71
          }
        ]
      },
      {
        "id": 42,
        "startTime": 245.8,
        "endTime": 248.95,
        "nextLineTime": 249.05,
        "text": "Có những lúc muốn đi thật xa khỏi nơi này",
        "words": [
          {
            "word": "Có",
            "start": 245.8,
            "end": 246.0
          },
          {
            "word": "những",
            "start": 246.0,
            "end": 246.49
          },
          {
            "word": "lúc",
            "start": 246.49,
            "end": 246.79
          },
          {
            "word": "muốn",
            "start": 246.79,
            "end": 247.18
          },
          {
            "word": "đi",
            "start": 247.18,
            "end": 247.38
          },
          {
            "word": "thật",
            "start": 247.38,
            "end": 247.77
          },
          {
            "word": "xa",
            "start": 247.77,
            "end": 247.97
          },
          {
            "word": "khỏi",
            "start": 247.97,
            "end": 248.36
          },
          {
            "word": "nơi",
            "start": 248.36,
            "end": 248.66
          },
          {
            "word": "này",
            "start": 248.66,
            "end": 248.96
          }
        ]
      },
      {
        "id": 43,
        "startTime": 249.05,
        "endTime": 251.09,
        "nextLineTime": 251.19,
        "text": "Nhưng trái tim kéo anh quay",
        "words": [
          {
            "word": "Nhưng",
            "start": 249.05,
            "end": 249.51
          },
          {
            "word": "trái",
            "start": 249.51,
            "end": 249.88
          },
          {
            "word": "tim",
            "start": 249.88,
            "end": 250.16
          },
          {
            "word": "kéo",
            "start": 250.16,
            "end": 250.44
          },
          {
            "word": "anh",
            "start": 250.44,
            "end": 250.72
          },
          {
            "word": "quay",
            "start": 250.72,
            "end": 251.09
          }
        ]
      },
      {
        "id": 44,
        "startTime": 251.19,
        "endTime": 253.25,
        "nextLineTime": 253.35,
        "text": "về đây (Mình từng cãi vã)",
        "words": [
          {
            "word": "về",
            "start": 251.19,
            "end": 251.4
          },
          {
            "word": "đây",
            "start": 251.4,
            "end": 251.71
          },
          {
            "word": "(Mình",
            "start": 251.71,
            "end": 252.22
          },
          {
            "word": "từng",
            "start": 252.22,
            "end": 252.63
          },
          {
            "word": "cãi",
            "start": 252.63,
            "end": 252.94
          },
          {
            "word": "vã)",
            "start": 252.94,
            "end": 253.25
          }
        ]
      },
      {
        "id": 45,
        "startTime": 253.35,
        "endTime": 256.45,
        "nextLineTime": 256.55,
        "text": "Làm đau nhau rất nhiều (Nhưng sau tất cả)",
        "words": [
          {
            "word": "Làm",
            "start": 253.35,
            "end": 253.63
          },
          {
            "word": "đau",
            "start": 253.63,
            "end": 253.91
          },
          {
            "word": "nhau",
            "start": 253.91,
            "end": 254.29
          },
          {
            "word": "rất",
            "start": 254.29,
            "end": 254.57
          },
          {
            "word": "nhiều",
            "start": 254.57,
            "end": 255.04
          },
          {
            "word": "(Nhưng",
            "start": 255.04,
            "end": 255.6
          },
          {
            "word": "sau",
            "start": 255.6,
            "end": 255.88
          },
          {
            "word": "tất",
            "start": 255.88,
            "end": 256.16
          },
          {
            "word": "cả)",
            "start": 256.16,
            "end": 256.44
          }
        ]
      },
      {
        "id": 46,
        "startTime": 256.55,
        "endTime": 257.75,
        "nextLineTime": 257.85,
        "text": "Và anh vẫn không muốn mất",
        "words": [
          {
            "word": "Và",
            "start": 256.55,
            "end": 256.67
          },
          {
            "word": "anh",
            "start": 256.67,
            "end": 256.85
          },
          {
            "word": "vẫn",
            "start": 256.85,
            "end": 257.03
          },
          {
            "word": "không",
            "start": 257.03,
            "end": 257.33
          },
          {
            "word": "muốn",
            "start": 257.33,
            "end": 257.57
          },
          {
            "word": "mất",
            "start": 257.57,
            "end": 257.75
          }
        ]
      },
      {
        "id": 47,
        "startTime": 257.85,
        "endTime": 259.05,
        "nextLineTime": 259.15,
        "text": "điều mà hai đứa đã xây",
        "words": [
          {
            "word": "điều",
            "start": 257.85,
            "end": 258.13
          },
          {
            "word": "mà",
            "start": 258.13,
            "end": 258.27
          },
          {
            "word": "hai",
            "start": 258.27,
            "end": 258.48
          },
          {
            "word": "đứa",
            "start": 258.48,
            "end": 258.69
          },
          {
            "word": "đã",
            "start": 258.69,
            "end": 258.83
          },
          {
            "word": "xây",
            "start": 258.83,
            "end": 259.04
          }
        ]
      },
      {
        "id": 48,
        "startTime": 259.15,
        "endTime": 261.18,
        "nextLineTime": 261.28,
        "text": "Bằng ánh sáng và bóng tối",
        "words": [
          {
            "word": "Bằng",
            "start": 259.15,
            "end": 259.56
          },
          {
            "word": "ánh",
            "start": 259.56,
            "end": 259.86
          },
          {
            "word": "sáng",
            "start": 259.86,
            "end": 260.27
          },
          {
            "word": "và",
            "start": 260.27,
            "end": 260.47
          },
          {
            "word": "bóng",
            "start": 260.47,
            "end": 260.88
          },
          {
            "word": "tối",
            "start": 260.88,
            "end": 261.18
          }
        ]
      },
      {
        "id": 49,
        "startTime": 261.28,
        "endTime": 262.75,
        "nextLineTime": 262.85,
        "text": "Dù tình yêu đau anh",
        "words": [
          {
            "word": "Dù",
            "start": 261.28,
            "end": 261.48
          },
          {
            "word": "tình",
            "start": 261.48,
            "end": 261.87
          },
          {
            "word": "yêu",
            "start": 261.87,
            "end": 262.16
          },
          {
            "word": "đau",
            "start": 262.16,
            "end": 262.45
          },
          {
            "word": "anh",
            "start": 262.45,
            "end": 262.74
          }
        ]
      },
      {
        "id": 50,
        "startTime": 262.85,
        "endTime": 264.83,
        "nextLineTime": 264.93,
        "text": "vẫn muốn bên em mà thôi",
        "words": [
          {
            "word": "vẫn",
            "start": 262.85,
            "end": 263.18
          },
          {
            "word": "muốn",
            "start": 263.18,
            "end": 263.62
          },
          {
            "word": "bên",
            "start": 263.62,
            "end": 263.95
          },
          {
            "word": "em",
            "start": 263.95,
            "end": 264.17
          },
          {
            "word": "mà",
            "start": 264.17,
            "end": 264.39
          },
          {
            "word": "thôi",
            "start": 264.39,
            "end": 264.83
          }
        ]
      },
      {
        "id": 51,
        "startTime": 264.93,
        "endTime": 266.25,
        "nextLineTime": 266.35,
        "text": "I'm tired of pretending",
        "words": [
          {
            "word": "I'm",
            "start": 264.93,
            "end": 265.13
          },
          {
            "word": "tired",
            "start": 265.13,
            "end": 265.46
          },
          {
            "word": "of",
            "start": 265.46,
            "end": 265.59
          },
          {
            "word": "pretending",
            "start": 265.59,
            "end": 266.25
          }
        ]
      },
      {
        "id": 52,
        "startTime": 266.35,
        "endTime": 268.02,
        "nextLineTime": 268.12,
        "text": "that the damage ain't deep",
        "words": [
          {
            "word": "that",
            "start": 266.35,
            "end": 266.65
          },
          {
            "word": "the",
            "start": 266.65,
            "end": 266.88
          },
          {
            "word": "damage",
            "start": 266.88,
            "end": 267.34
          },
          {
            "word": "ain't",
            "start": 267.34,
            "end": 267.72
          },
          {
            "word": "deep",
            "start": 267.72,
            "end": 268.02
          }
        ]
      },
      {
        "id": 53,
        "startTime": 268.12,
        "endTime": 269.48,
        "nextLineTime": 269.58,
        "text": "Some nights I lose myself,",
        "words": [
          {
            "word": "Some",
            "start": 268.12,
            "end": 268.37
          },
          {
            "word": "nights",
            "start": 268.37,
            "end": 268.74
          },
          {
            "word": "I",
            "start": 268.74,
            "end": 268.86
          },
          {
            "word": "lose",
            "start": 268.86,
            "end": 269.11
          },
          {
            "word": "myself,",
            "start": 269.11,
            "end": 269.48
          }
        ]
      },
      {
        "id": 54,
        "startTime": 269.58,
        "endTime": 271.04,
        "nextLineTime": 271.14,
        "text": "some nights I can't sleep",
        "words": [
          {
            "word": "some",
            "start": 269.58,
            "end": 269.85
          },
          {
            "word": "nights",
            "start": 269.85,
            "end": 270.25
          },
          {
            "word": "I",
            "start": 270.25,
            "end": 270.38
          },
          {
            "word": "can't",
            "start": 270.38,
            "end": 270.71
          },
          {
            "word": "sleep",
            "start": 270.71,
            "end": 271.04
          }
        ]
      },
      {
        "id": 55,
        "startTime": 271.14,
        "endTime": 271.99,
        "nextLineTime": 272.09,
        "text": "If our love is a",
        "words": [
          {
            "word": "If",
            "start": 271.14,
            "end": 271.27
          },
          {
            "word": "our",
            "start": 271.27,
            "end": 271.47
          },
          {
            "word": "love",
            "start": 271.47,
            "end": 271.73
          },
          {
            "word": "is",
            "start": 271.73,
            "end": 271.86
          },
          {
            "word": "a",
            "start": 271.86,
            "end": 271.99
          }
        ]
      },
      {
        "id": 56,
        "startTime": 272.09,
        "endTime": 274.39,
        "nextLineTime": 274.49,
        "text": "fire then we're walking through flames",
        "words": [
          {
            "word": "fire",
            "start": 272.09,
            "end": 272.37
          },
          {
            "word": "then",
            "start": 272.37,
            "end": 272.65
          },
          {
            "word": "we're",
            "start": 272.65,
            "end": 273.0
          },
          {
            "word": "walking",
            "start": 273.0,
            "end": 273.49
          },
          {
            "word": "through",
            "start": 273.49,
            "end": 273.98
          },
          {
            "word": "flames",
            "start": 273.98,
            "end": 274.4
          }
        ]
      },
      {
        "id": 57,
        "startTime": 274.49,
        "endTime": 276.98,
        "nextLineTime": 277.08,
        "text": "Holding on together while",
        "words": [
          {
            "word": "Holding",
            "start": 274.49,
            "end": 275.28
          },
          {
            "word": "on",
            "start": 275.28,
            "end": 275.51
          },
          {
            "word": "together",
            "start": 275.51,
            "end": 276.42
          },
          {
            "word": "while",
            "start": 276.42,
            "end": 276.99
          }
        ]
      },
      {
        "id": 58,
        "startTime": 277.08,
        "endTime": 282.68,
        "nextLineTime": 282.93,
        "text": "we breaking through the pain",
        "words": [
          {
            "word": "we",
            "start": 277.08,
            "end": 277.55
          },
          {
            "word": "breaking",
            "start": 277.55,
            "end": 279.42
          },
          {
            "word": "through",
            "start": 279.42,
            "end": 281.05
          },
          {
            "word": "the",
            "start": 281.05,
            "end": 281.75
          },
          {
            "word": "pain",
            "start": 281.75,
            "end": 282.68
          }
        ]
      },
      {
        "id": 59,
        "startTime": 282.93,
        "endTime": 288.53,
        "nextLineTime": 289.2,
        "text": "Khi em đã bước đi chẳng quay trở về",
        "words": [
          {
            "word": "Khi",
            "start": 282.93,
            "end": 283.55
          },
          {
            "word": "em",
            "start": 283.55,
            "end": 283.96
          },
          {
            "word": "đã",
            "start": 283.96,
            "end": 284.37
          },
          {
            "word": "bước",
            "start": 284.37,
            "end": 285.2
          },
          {
            "word": "đi",
            "start": 285.2,
            "end": 285.61
          },
          {
            "word": "chẳng",
            "start": 285.61,
            "end": 286.65
          },
          {
            "word": "quay",
            "start": 286.65,
            "end": 287.48
          },
          {
            "word": "trở",
            "start": 287.48,
            "end": 288.1
          },
          {
            "word": "về",
            "start": 288.1,
            "end": 288.51
          }
        ]
      },
      {
        "id": 60,
        "startTime": 289.2,
        "endTime": 294.63,
        "nextLineTime": 294.73,
        "text": "Nghe như trong lòng anh băng giá tái tê",
        "words": [
          {
            "word": "Nghe",
            "start": 289.2,
            "end": 289.9
          },
          {
            "word": "như",
            "start": 289.9,
            "end": 290.43
          },
          {
            "word": "trong",
            "start": 290.43,
            "end": 291.31
          },
          {
            "word": "lòng",
            "start": 291.31,
            "end": 292.01
          },
          {
            "word": "anh",
            "start": 292.01,
            "end": 292.54
          },
          {
            "word": "băng",
            "start": 292.54,
            "end": 293.24
          },
          {
            "word": "giá",
            "start": 293.24,
            "end": 293.77
          },
          {
            "word": "tái",
            "start": 293.77,
            "end": 294.3
          },
          {
            "word": "tê",
            "start": 294.3,
            "end": 294.65
          }
        ]
      },
      {
        "id": 61,
        "startTime": 294.73,
        "endTime": 297.3,
        "nextLineTime": 297.4,
        "text": "Anh mới hay rằng trái",
        "words": [
          {
            "word": "Anh",
            "start": 294.73,
            "end": 295.18
          },
          {
            "word": "mới",
            "start": 295.18,
            "end": 295.63
          },
          {
            "word": "hay",
            "start": 295.63,
            "end": 296.08
          },
          {
            "word": "rằng",
            "start": 296.08,
            "end": 296.68
          },
          {
            "word": "trái",
            "start": 296.68,
            "end": 297.28
          }
        ]
      },
      {
        "id": 62,
        "startTime": 297.4,
        "endTime": 301.83,
        "nextLineTime": 301.93,
        "text": "tim đã hiến dâng người",
        "words": [
          {
            "word": "tim",
            "start": 297.4,
            "end": 298.14
          },
          {
            "word": "đã",
            "start": 298.14,
            "end": 298.63
          },
          {
            "word": "hiến",
            "start": 298.63,
            "end": 299.61
          },
          {
            "word": "dâng",
            "start": 299.61,
            "end": 300.59
          },
          {
            "word": "người",
            "start": 300.59,
            "end": 301.82
          }
        ]
      },
      {
        "id": 63,
        "startTime": 301.93,
        "endTime": 307.53,
        "nextLineTime": 308.99,
        "text": "Đời anh vô nghĩa khi lìa xa người ơi",
        "words": [
          {
            "word": "Đời",
            "start": 301.93,
            "end": 302.53
          },
          {
            "word": "anh",
            "start": 302.53,
            "end": 303.13
          },
          {
            "word": "vô",
            "start": 303.13,
            "end": 303.53
          },
          {
            "word": "nghĩa",
            "start": 303.53,
            "end": 304.53
          },
          {
            "word": "khi",
            "start": 304.53,
            "end": 305.13
          },
          {
            "word": "lìa",
            "start": 305.13,
            "end": 305.73
          },
          {
            "word": "xa",
            "start": 305.73,
            "end": 306.13
          },
          {
            "word": "người",
            "start": 306.13,
            "end": 307.13
          },
          {
            "word": "ơi",
            "start": 307.13,
            "end": 307.53
          }
        ]
      },
      {
        "id": 64,
        "startTime": 308.99,
        "endTime": 314.59,
        "nextLineTime": 315.38,
        "text": "Cơn giông tố nhỏ nhoi rồi sẽ phai tàn (Ơi)",
        "words": [
          {
            "word": "Cơn",
            "start": 308.99,
            "end": 309.5
          },
          {
            "word": "giông",
            "start": 309.5,
            "end": 310.35
          },
          {
            "word": "tố",
            "start": 310.35,
            "end": 310.69
          },
          {
            "word": "nhỏ",
            "start": 310.69,
            "end": 311.2
          },
          {
            "word": "nhoi",
            "start": 311.2,
            "end": 311.88
          },
          {
            "word": "rồi",
            "start": 311.88,
            "end": 312.39
          },
          {
            "word": "sẽ",
            "start": 312.39,
            "end": 312.73
          },
          {
            "word": "phai",
            "start": 312.73,
            "end": 313.41
          },
          {
            "word": "tàn",
            "start": 313.41,
            "end": 313.92
          },
          {
            "word": "(Ơi)",
            "start": 313.92,
            "end": 314.6
          }
        ]
      },
      {
        "id": 65,
        "startTime": 315.38,
        "endTime": 317.65,
        "nextLineTime": 317.75,
        "text": "Xin bao dung để tình",
        "words": [
          {
            "word": "Xin",
            "start": 315.38,
            "end": 315.81
          },
          {
            "word": "bao",
            "start": 315.81,
            "end": 316.24
          },
          {
            "word": "dung",
            "start": 316.24,
            "end": 316.81
          },
          {
            "word": "để",
            "start": 316.81,
            "end": 317.09
          },
          {
            "word": "tình",
            "start": 317.09,
            "end": 317.66
          }
        ]
      },
      {
        "id": 66,
        "startTime": 317.75,
        "endTime": 320.95,
        "nextLineTime": 321.05,
        "text": "yêu mãi chứa chan (Huh-oh)",
        "words": [
          {
            "word": "yêu",
            "start": 317.75,
            "end": 318.19
          },
          {
            "word": "mãi",
            "start": 318.19,
            "end": 318.63
          },
          {
            "word": "chứa",
            "start": 318.63,
            "end": 319.21
          },
          {
            "word": "chan",
            "start": 319.21,
            "end": 319.79
          },
          {
            "word": "(Huh-oh)",
            "start": 319.79,
            "end": 320.95
          }
        ]
      },
      {
        "id": 67,
        "startTime": 321.05,
        "endTime": 323.79,
        "nextLineTime": 323.89,
        "text": "Cõi thiên đường sẽ hoang tàn nếu vắng",
        "words": [
          {
            "word": "Cõi",
            "start": 321.05,
            "end": 321.32
          },
          {
            "word": "thiên",
            "start": 321.32,
            "end": 321.78
          },
          {
            "word": "đường",
            "start": 321.78,
            "end": 322.24
          },
          {
            "word": "sẽ",
            "start": 322.24,
            "end": 322.42
          },
          {
            "word": "hoang",
            "start": 322.42,
            "end": 322.88
          },
          {
            "word": "tàn",
            "start": 322.88,
            "end": 323.15
          },
          {
            "word": "nếu",
            "start": 323.15,
            "end": 323.42
          },
          {
            "word": "vắng",
            "start": 323.42,
            "end": 323.79
          }
        ]
      },
      {
        "id": 68,
        "startTime": 323.89,
        "endTime": 328.29,
        "nextLineTime": 328.39,
        "text": "em (Got to be love, got to be love)",
        "words": [
          {
            "word": "em",
            "start": 323.89,
            "end": 324.23
          },
          {
            "word": "(Got",
            "start": 324.23,
            "end": 324.91
          },
          {
            "word": "to",
            "start": 324.91,
            "end": 325.25
          },
          {
            "word": "be",
            "start": 325.25,
            "end": 325.59
          },
          {
            "word": "love,",
            "start": 325.59,
            "end": 326.27
          },
          {
            "word": "got",
            "start": 326.27,
            "end": 326.78
          },
          {
            "word": "to",
            "start": 326.78,
            "end": 327.12
          },
          {
            "word": "be",
            "start": 327.12,
            "end": 327.46
          },
          {
            "word": "love)",
            "start": 327.46,
            "end": 328.31
          }
        ]
      },
      {
        "id": 69,
        "startTime": 328.39,
        "endTime": 333.99,
        "nextLineTime": 334.84,
        "text": "Ngàn trăng sao nhớ em đêm đêm",
        "words": [
          {
            "word": "Ngàn",
            "start": 328.39,
            "end": 329.36
          },
          {
            "word": "trăng",
            "start": 329.36,
            "end": 330.58
          },
          {
            "word": "sao",
            "start": 330.58,
            "end": 331.31
          },
          {
            "word": "nhớ",
            "start": 331.31,
            "end": 332.04
          },
          {
            "word": "em",
            "start": 332.04,
            "end": 332.53
          },
          {
            "word": "đêm",
            "start": 332.53,
            "end": 333.26
          },
          {
            "word": "đêm",
            "start": 333.26,
            "end": 333.99
          }
        ]
      },
      {
        "id": 70,
        "startTime": 334.84,
        "endTime": 340.44,
        "nextLineTime": 353.54,
        "text": "Ngàn trăng sao nhớ em",
        "words": [
          {
            "word": "Ngàn",
            "start": 334.84,
            "end": 336.16
          },
          {
            "word": "trăng",
            "start": 336.16,
            "end": 337.81
          },
          {
            "word": "sao",
            "start": 337.81,
            "end": 338.8
          },
          {
            "word": "nhớ",
            "start": 338.8,
            "end": 339.79
          },
          {
            "word": "em",
            "start": 339.79,
            "end": 340.45
          }
        ]
      }
    ]
  },
  {
    "id": "karaoke-let-me-go",
    "filename": "LET ME GO - THƠM (Da LAB), VƯƠNG ANH TÚ, HOÀNG ROB, HOÀNG DŨNG, CHENG - ATVNCG 2026.mp3",
    "title": "Let Me Go",
    "artist": "Anh Trai Vượt Ngàn Chông Gai (Thơm Da LAB, Vương Anh Tú, Hoàng Rob, Hoàng Dũng, Cheng)",
    "duration": 323.92,
    "audioUrl": "/karaoke/karaoke-let-me-go.mp3",
    "thumbUrl": "/karaoke/karaoke-let-me-go.jpg",
    "lines": [
      {
        "id": 0,
        "startTime": 47.76,
        "endTime": 51.26,
        "nextLineTime": 51.36,
        "text": "Còn chi em tiếc nuối",
        "words": [
          {
            "word": "Còn",
            "start": 47.76,
            "end": 48.42
          },
          {
            "word": "chi",
            "start": 48.42,
            "end": 49.08
          },
          {
            "word": "em",
            "start": 49.08,
            "end": 49.52
          },
          {
            "word": "tiếc",
            "start": 49.52,
            "end": 50.4
          },
          {
            "word": "nuối",
            "start": 50.4,
            "end": 51.27
          }
        ]
      },
      {
        "id": 1,
        "startTime": 51.36,
        "endTime": 54.9,
        "nextLineTime": 55.0,
        "text": "Và đây là phút cuối cùng, ah yeah",
        "words": [
          {
            "word": "Và",
            "start": 51.36,
            "end": 51.64
          },
          {
            "word": "đây",
            "start": 51.64,
            "end": 52.06
          },
          {
            "word": "là",
            "start": 52.06,
            "end": 52.34
          },
          {
            "word": "phút",
            "start": 52.34,
            "end": 52.91
          },
          {
            "word": "cuối",
            "start": 52.91,
            "end": 53.48
          },
          {
            "word": "cùng,",
            "start": 53.48,
            "end": 54.05
          },
          {
            "word": "ah",
            "start": 54.05,
            "end": 54.33
          },
          {
            "word": "yeah",
            "start": 54.33,
            "end": 54.9
          }
        ]
      },
      {
        "id": 2,
        "startTime": 55.0,
        "endTime": 59.06,
        "nextLineTime": 59.16,
        "text": "Có nói gì cũng thế thôi em à",
        "words": [
          {
            "word": "Có",
            "start": 55.0,
            "end": 55.37
          },
          {
            "word": "nói",
            "start": 55.37,
            "end": 55.92
          },
          {
            "word": "gì",
            "start": 55.92,
            "end": 56.29
          },
          {
            "word": "cũng",
            "start": 56.29,
            "end": 57.03
          },
          {
            "word": "thế",
            "start": 57.03,
            "end": 57.58
          },
          {
            "word": "thôi",
            "start": 57.58,
            "end": 58.32
          },
          {
            "word": "em",
            "start": 58.32,
            "end": 58.69
          },
          {
            "word": "à",
            "start": 58.69,
            "end": 59.06
          }
        ]
      },
      {
        "id": 3,
        "startTime": 59.16,
        "endTime": 62.14,
        "nextLineTime": 62.24,
        "text": "Chẳng được chi, yah",
        "words": [
          {
            "word": "Chẳng",
            "start": 59.16,
            "end": 60.15
          },
          {
            "word": "được",
            "start": 60.15,
            "end": 60.94
          },
          {
            "word": "chi,",
            "start": 60.94,
            "end": 61.54
          },
          {
            "word": "yah",
            "start": 61.54,
            "end": 62.14
          }
        ]
      },
      {
        "id": 4,
        "startTime": 62.24,
        "endTime": 65.86,
        "nextLineTime": 65.96,
        "text": "Chắc chắn là chấm hết",
        "words": [
          {
            "word": "Chắc",
            "start": 62.24,
            "end": 63.09
          },
          {
            "word": "chắn",
            "start": 63.09,
            "end": 63.94
          },
          {
            "word": "là",
            "start": 63.94,
            "end": 64.37
          },
          {
            "word": "chấm",
            "start": 64.37,
            "end": 65.22
          },
          {
            "word": "hết",
            "start": 65.22,
            "end": 65.86
          }
        ]
      },
      {
        "id": 5,
        "startTime": 65.96,
        "endTime": 69.5,
        "nextLineTime": 69.6,
        "text": "Con tim này đã chết, chết, chết từ lâu",
        "words": [
          {
            "word": "Con",
            "start": 65.96,
            "end": 66.34
          },
          {
            "word": "tim",
            "start": 66.34,
            "end": 66.72
          },
          {
            "word": "này",
            "start": 66.72,
            "end": 67.1
          },
          {
            "word": "đã",
            "start": 67.1,
            "end": 67.35
          },
          {
            "word": "chết,",
            "start": 67.35,
            "end": 67.86
          },
          {
            "word": "chết,",
            "start": 67.86,
            "end": 68.37
          },
          {
            "word": "chết",
            "start": 68.37,
            "end": 68.88
          },
          {
            "word": "từ",
            "start": 68.88,
            "end": 69.13
          },
          {
            "word": "lâu",
            "start": 69.13,
            "end": 69.51
          }
        ]
      },
      {
        "id": 6,
        "startTime": 69.6,
        "endTime": 71.94,
        "nextLineTime": 72.04,
        "text": "Tình này trao em từ phút giây ban đầu",
        "words": [
          {
            "word": "Tình",
            "start": 69.6,
            "end": 69.92
          },
          {
            "word": "này",
            "start": 69.92,
            "end": 70.16
          },
          {
            "word": "trao",
            "start": 70.16,
            "end": 70.48
          },
          {
            "word": "em",
            "start": 70.48,
            "end": 70.64
          },
          {
            "word": "từ",
            "start": 70.64,
            "end": 70.8
          },
          {
            "word": "phút",
            "start": 70.8,
            "end": 71.12
          },
          {
            "word": "giây",
            "start": 71.12,
            "end": 71.44
          },
          {
            "word": "ban",
            "start": 71.44,
            "end": 71.68
          },
          {
            "word": "đầu",
            "start": 71.68,
            "end": 71.92
          }
        ]
      },
      {
        "id": 7,
        "startTime": 72.04,
        "endTime": 77.64,
        "nextLineTime": 91.16,
        "text": "Em chẳng thiết tha mong cầu, I know woah",
        "words": [
          {
            "word": "Em",
            "start": 72.04,
            "end": 72.39
          },
          {
            "word": "chẳng",
            "start": 72.39,
            "end": 73.27
          },
          {
            "word": "thiết",
            "start": 73.27,
            "end": 74.14
          },
          {
            "word": "tha",
            "start": 74.14,
            "end": 74.67
          },
          {
            "word": "mong",
            "start": 74.67,
            "end": 75.37
          },
          {
            "word": "cầu,",
            "start": 75.37,
            "end": 75.9
          },
          {
            "word": "I",
            "start": 75.9,
            "end": 76.25
          },
          {
            "word": "know",
            "start": 76.25,
            "end": 76.95
          },
          {
            "word": "woah",
            "start": 76.95,
            "end": 77.65
          }
        ]
      },
      {
        "id": 8,
        "startTime": 91.16,
        "endTime": 93.26,
        "nextLineTime": 93.36,
        "text": "Anh vốn chẳng là gì trong mắt em",
        "words": [
          {
            "word": "Anh",
            "start": 91.16,
            "end": 91.41
          },
          {
            "word": "vốn",
            "start": 91.41,
            "end": 91.66
          },
          {
            "word": "chẳng",
            "start": 91.66,
            "end": 92.08
          },
          {
            "word": "là",
            "start": 92.08,
            "end": 92.25
          },
          {
            "word": "gì",
            "start": 92.25,
            "end": 92.42
          },
          {
            "word": "trong",
            "start": 92.42,
            "end": 92.84
          },
          {
            "word": "mắt",
            "start": 92.84,
            "end": 93.09
          },
          {
            "word": "em",
            "start": 93.09,
            "end": 93.26
          }
        ]
      },
      {
        "id": 9,
        "startTime": 93.36,
        "endTime": 95.0,
        "nextLineTime": 95.1,
        "text": "Em chẳng cần nói đâu",
        "words": [
          {
            "word": "Em",
            "start": 93.36,
            "end": 93.56
          },
          {
            "word": "chẳng",
            "start": 93.56,
            "end": 94.07
          },
          {
            "word": "cần",
            "start": 94.07,
            "end": 94.38
          },
          {
            "word": "nói",
            "start": 94.38,
            "end": 94.69
          },
          {
            "word": "đâu",
            "start": 94.69,
            "end": 95.0
          }
        ]
      },
      {
        "id": 10,
        "startTime": 95.1,
        "endTime": 96.7,
        "nextLineTime": 96.8,
        "text": "Trước kia trái tim em sắt đá",
        "words": [
          {
            "word": "Trước",
            "start": 95.1,
            "end": 95.46
          },
          {
            "word": "kia",
            "start": 95.46,
            "end": 95.68
          },
          {
            "word": "trái",
            "start": 95.68,
            "end": 95.97
          },
          {
            "word": "tim",
            "start": 95.97,
            "end": 96.19
          },
          {
            "word": "em",
            "start": 96.19,
            "end": 96.34
          },
          {
            "word": "sắt",
            "start": 96.34,
            "end": 96.56
          },
          {
            "word": "đá",
            "start": 96.56,
            "end": 96.71
          }
        ]
      },
      {
        "id": 11,
        "startTime": 96.8,
        "endTime": 98.58,
        "nextLineTime": 98.68,
        "text": "Em vứt trong hố sâu, bae",
        "words": [
          {
            "word": "Em",
            "start": 96.8,
            "end": 97.0
          },
          {
            "word": "vứt",
            "start": 97.0,
            "end": 97.3
          },
          {
            "word": "trong",
            "start": 97.3,
            "end": 97.79
          },
          {
            "word": "hố",
            "start": 97.79,
            "end": 97.99
          },
          {
            "word": "sâu,",
            "start": 97.99,
            "end": 98.29
          },
          {
            "word": "bae",
            "start": 98.29,
            "end": 98.59
          }
        ]
      },
      {
        "id": 12,
        "startTime": 98.68,
        "endTime": 100.3,
        "nextLineTime": 100.4,
        "text": "Trò chơi giờ là hồi kết",
        "words": [
          {
            "word": "Trò",
            "start": 98.68,
            "end": 98.95
          },
          {
            "word": "chơi",
            "start": 98.95,
            "end": 99.31
          },
          {
            "word": "giờ",
            "start": 99.31,
            "end": 99.58
          },
          {
            "word": "là",
            "start": 99.58,
            "end": 99.76
          },
          {
            "word": "hồi",
            "start": 99.76,
            "end": 100.03
          },
          {
            "word": "kết",
            "start": 100.03,
            "end": 100.3
          }
        ]
      },
      {
        "id": 13,
        "startTime": 100.4,
        "endTime": 102.22,
        "nextLineTime": 102.32,
        "text": "Nên em vội quay lại phía sau",
        "words": [
          {
            "word": "Nên",
            "start": 100.4,
            "end": 100.65
          },
          {
            "word": "em",
            "start": 100.65,
            "end": 100.82
          },
          {
            "word": "vội",
            "start": 100.82,
            "end": 101.07
          },
          {
            "word": "quay",
            "start": 101.07,
            "end": 101.4
          },
          {
            "word": "lại",
            "start": 101.4,
            "end": 101.65
          },
          {
            "word": "phía",
            "start": 101.65,
            "end": 101.98
          },
          {
            "word": "sau",
            "start": 101.98,
            "end": 102.23
          }
        ]
      },
      {
        "id": 14,
        "startTime": 102.32,
        "endTime": 103.9,
        "nextLineTime": 104.0,
        "text": "Chuyện mình chẳng còn gì đâu",
        "words": [
          {
            "word": "Chuyện",
            "start": 102.32,
            "end": 102.73
          },
          {
            "word": "mình",
            "start": 102.73,
            "end": 103.0
          },
          {
            "word": "chẳng",
            "start": 103.0,
            "end": 103.34
          },
          {
            "word": "còn",
            "start": 103.34,
            "end": 103.55
          },
          {
            "word": "gì",
            "start": 103.55,
            "end": 103.69
          },
          {
            "word": "đâu",
            "start": 103.69,
            "end": 103.9
          }
        ]
      },
      {
        "id": 15,
        "startTime": 104.0,
        "endTime": 105.86,
        "nextLineTime": 105.96,
        "text": "Nên em đừng mong phút ban đầu",
        "words": [
          {
            "word": "Nên",
            "start": 104.0,
            "end": 104.24
          },
          {
            "word": "em",
            "start": 104.24,
            "end": 104.4
          },
          {
            "word": "đừng",
            "start": 104.4,
            "end": 104.72
          },
          {
            "word": "mong",
            "start": 104.72,
            "end": 105.04
          },
          {
            "word": "phút",
            "start": 105.04,
            "end": 105.36
          },
          {
            "word": "ban",
            "start": 105.36,
            "end": 105.6
          },
          {
            "word": "đầu",
            "start": 105.6,
            "end": 105.84
          }
        ]
      },
      {
        "id": 16,
        "startTime": 105.96,
        "endTime": 107.5,
        "nextLineTime": 107.6,
        "text": "Vì mọi chuyện giờ đã khác",
        "words": [
          {
            "word": "Vì",
            "start": 105.96,
            "end": 106.11
          },
          {
            "word": "mọi",
            "start": 106.11,
            "end": 106.34
          },
          {
            "word": "chuyện",
            "start": 106.34,
            "end": 106.8
          },
          {
            "word": "giờ",
            "start": 106.8,
            "end": 107.03
          },
          {
            "word": "đã",
            "start": 107.03,
            "end": 107.18
          },
          {
            "word": "khác",
            "start": 107.18,
            "end": 107.49
          }
        ]
      },
      {
        "id": 17,
        "startTime": 107.6,
        "endTime": 108.82,
        "nextLineTime": 108.92,
        "text": "Anh cũng chẳng mong cảm",
        "words": [
          {
            "word": "Anh",
            "start": 107.6,
            "end": 107.79
          },
          {
            "word": "cũng",
            "start": 107.79,
            "end": 108.05
          },
          {
            "word": "chẳng",
            "start": 108.05,
            "end": 108.37
          },
          {
            "word": "mong",
            "start": 108.37,
            "end": 108.63
          },
          {
            "word": "cảm",
            "start": 108.63,
            "end": 108.82
          }
        ]
      },
      {
        "id": 18,
        "startTime": 108.92,
        "endTime": 110.18,
        "nextLineTime": 110.28,
        "text": "giác yêu đương gì đâu",
        "words": [
          {
            "word": "giác",
            "start": 108.92,
            "end": 109.22
          },
          {
            "word": "yêu",
            "start": 109.22,
            "end": 109.44
          },
          {
            "word": "đương",
            "start": 109.44,
            "end": 109.81
          },
          {
            "word": "gì",
            "start": 109.81,
            "end": 109.96
          },
          {
            "word": "đâu",
            "start": 109.96,
            "end": 110.18
          }
        ]
      },
      {
        "id": 19,
        "startTime": 110.28,
        "endTime": 113.06,
        "nextLineTime": 113.16,
        "text": "Yah, you know, woah-oh-oh",
        "words": [
          {
            "word": "Yah,",
            "start": 110.28,
            "end": 110.7
          },
          {
            "word": "you",
            "start": 110.7,
            "end": 111.12
          },
          {
            "word": "know,",
            "start": 111.12,
            "end": 111.68
          },
          {
            "word": "woah-oh-oh",
            "start": 111.68,
            "end": 113.07
          }
        ]
      },
      {
        "id": 20,
        "startTime": 113.16,
        "endTime": 115.18,
        "nextLineTime": 115.28,
        "text": "Chẳng còn điều gì cần thiết ngay bây giờ",
        "words": [
          {
            "word": "Chẳng",
            "start": 113.16,
            "end": 113.48
          },
          {
            "word": "còn",
            "start": 113.48,
            "end": 113.67
          },
          {
            "word": "điều",
            "start": 113.67,
            "end": 113.92
          },
          {
            "word": "gì",
            "start": 113.92,
            "end": 114.05
          },
          {
            "word": "cần",
            "start": 114.05,
            "end": 114.24
          },
          {
            "word": "thiết",
            "start": 114.24,
            "end": 114.56
          },
          {
            "word": "ngay",
            "start": 114.56,
            "end": 114.81
          },
          {
            "word": "bây",
            "start": 114.81,
            "end": 115.0
          },
          {
            "word": "giờ",
            "start": 115.0,
            "end": 115.19
          }
        ]
      },
      {
        "id": 21,
        "startTime": 115.28,
        "endTime": 117.3,
        "nextLineTime": 117.4,
        "text": "Anh cũng chẳng biết đâu em à",
        "words": [
          {
            "word": "Anh",
            "start": 115.28,
            "end": 115.54
          },
          {
            "word": "cũng",
            "start": 115.54,
            "end": 115.89
          },
          {
            "word": "chẳng",
            "start": 115.89,
            "end": 116.33
          },
          {
            "word": "biết",
            "start": 116.33,
            "end": 116.68
          },
          {
            "word": "đâu",
            "start": 116.68,
            "end": 116.94
          },
          {
            "word": "em",
            "start": 116.94,
            "end": 117.12
          },
          {
            "word": "à",
            "start": 117.12,
            "end": 117.3
          }
        ]
      },
      {
        "id": 22,
        "startTime": 117.4,
        "endTime": 121.46,
        "nextLineTime": 121.56,
        "text": "Bae, let me go, woah-oh-oh",
        "words": [
          {
            "word": "Bae,",
            "start": 117.4,
            "end": 118.01
          },
          {
            "word": "let",
            "start": 118.01,
            "end": 118.62
          },
          {
            "word": "me",
            "start": 118.62,
            "end": 119.03
          },
          {
            "word": "go,",
            "start": 119.03,
            "end": 119.44
          },
          {
            "word": "woah-oh-oh",
            "start": 119.44,
            "end": 121.47
          }
        ]
      },
      {
        "id": 23,
        "startTime": 121.56,
        "endTime": 123.04,
        "nextLineTime": 123.14,
        "text": "Trên lưng ngựa mang theo khát khao",
        "words": [
          {
            "word": "Trên",
            "start": 121.56,
            "end": 121.77
          },
          {
            "word": "lưng",
            "start": 121.77,
            "end": 121.98
          },
          {
            "word": "ngựa",
            "start": 121.98,
            "end": 122.19
          },
          {
            "word": "mang",
            "start": 122.19,
            "end": 122.4
          },
          {
            "word": "theo",
            "start": 122.4,
            "end": 122.61
          },
          {
            "word": "khát",
            "start": 122.61,
            "end": 122.82
          },
          {
            "word": "khao",
            "start": 122.82,
            "end": 123.03
          }
        ]
      },
      {
        "id": 24,
        "startTime": 123.14,
        "endTime": 124.46,
        "nextLineTime": 124.56,
        "text": "Muốn chiếm em nhưng phải break down",
        "words": [
          {
            "word": "Muốn",
            "start": 123.14,
            "end": 123.32
          },
          {
            "word": "chiếm",
            "start": 123.32,
            "end": 123.55
          },
          {
            "word": "em",
            "start": 123.55,
            "end": 123.64
          },
          {
            "word": "nhưng",
            "start": 123.64,
            "end": 123.87
          },
          {
            "word": "phải",
            "start": 123.87,
            "end": 124.05
          },
          {
            "word": "break",
            "start": 124.05,
            "end": 124.28
          },
          {
            "word": "down",
            "start": 124.28,
            "end": 124.46
          }
        ]
      },
      {
        "id": 25,
        "startTime": 124.56,
        "endTime": 126.26,
        "nextLineTime": 126.36,
        "text": "Em đang không muốn làm gì có cách nào",
        "words": [
          {
            "word": "Em",
            "start": 124.56,
            "end": 124.68
          },
          {
            "word": "đang",
            "start": 124.68,
            "end": 124.91
          },
          {
            "word": "không",
            "start": 124.91,
            "end": 125.2
          },
          {
            "word": "muốn",
            "start": 125.2,
            "end": 125.43
          },
          {
            "word": "làm",
            "start": 125.43,
            "end": 125.61
          },
          {
            "word": "gì",
            "start": 125.61,
            "end": 125.73
          },
          {
            "word": "có",
            "start": 125.73,
            "end": 125.85
          },
          {
            "word": "cách",
            "start": 125.85,
            "end": 126.08
          },
          {
            "word": "nào",
            "start": 126.08,
            "end": 126.26
          }
        ]
      },
      {
        "id": 26,
        "startTime": 126.36,
        "endTime": 127.82,
        "nextLineTime": 127.92,
        "text": "Tình duyên lận đận biết sao",
        "words": [
          {
            "word": "Tình",
            "start": 126.36,
            "end": 126.63
          },
          {
            "word": "duyên",
            "start": 126.63,
            "end": 126.96
          },
          {
            "word": "lận",
            "start": 126.96,
            "end": 127.16
          },
          {
            "word": "đận",
            "start": 127.16,
            "end": 127.36
          },
          {
            "word": "biết",
            "start": 127.36,
            "end": 127.63
          },
          {
            "word": "sao",
            "start": 127.63,
            "end": 127.83
          }
        ]
      },
      {
        "id": 27,
        "startTime": 127.92,
        "endTime": 130.22,
        "nextLineTime": 130.32,
        "text": "Yêu em lúc nào không tỉnh táo",
        "words": [
          {
            "word": "Yêu",
            "start": 127.92,
            "end": 128.22
          },
          {
            "word": "em",
            "start": 128.22,
            "end": 128.42
          },
          {
            "word": "lúc",
            "start": 128.42,
            "end": 128.72
          },
          {
            "word": "nào",
            "start": 128.72,
            "end": 129.02
          },
          {
            "word": "không",
            "start": 129.02,
            "end": 129.52
          },
          {
            "word": "tỉnh",
            "start": 129.52,
            "end": 129.92
          },
          {
            "word": "táo",
            "start": 129.92,
            "end": 130.22
          }
        ]
      },
      {
        "id": 28,
        "startTime": 130.32,
        "endTime": 132.14,
        "nextLineTime": 132.24,
        "text": "Đâu ngờ sau lớp áo em rắp tâm ngụy tạo",
        "words": [
          {
            "word": "Đâu",
            "start": 130.32,
            "end": 130.51
          },
          {
            "word": "ngờ",
            "start": 130.51,
            "end": 130.7
          },
          {
            "word": "sau",
            "start": 130.7,
            "end": 130.89
          },
          {
            "word": "lớp",
            "start": 130.89,
            "end": 131.08
          },
          {
            "word": "áo",
            "start": 131.08,
            "end": 131.21
          },
          {
            "word": "em",
            "start": 131.21,
            "end": 131.34
          },
          {
            "word": "rắp",
            "start": 131.34,
            "end": 131.53
          },
          {
            "word": "tâm",
            "start": 131.53,
            "end": 131.72
          },
          {
            "word": "ngụy",
            "start": 131.72,
            "end": 131.97
          },
          {
            "word": "tạo",
            "start": 131.97,
            "end": 132.16
          }
        ]
      },
      {
        "id": 29,
        "startTime": 132.24,
        "endTime": 133.78,
        "nextLineTime": 133.88,
        "text": "Hiện thân trong em là con cáo",
        "words": [
          {
            "word": "Hiện",
            "start": 132.24,
            "end": 132.51
          },
          {
            "word": "thân",
            "start": 132.51,
            "end": 132.78
          },
          {
            "word": "trong",
            "start": 132.78,
            "end": 133.11
          },
          {
            "word": "em",
            "start": 133.11,
            "end": 133.24
          },
          {
            "word": "là",
            "start": 133.24,
            "end": 133.37
          },
          {
            "word": "con",
            "start": 133.37,
            "end": 133.57
          },
          {
            "word": "cáo",
            "start": 133.57,
            "end": 133.77
          }
        ]
      },
      {
        "id": 30,
        "startTime": 133.88,
        "endTime": 136.06,
        "nextLineTime": 136.16,
        "text": "Anh là thỏ, trốn em bằng cách nào",
        "words": [
          {
            "word": "Anh",
            "start": 133.88,
            "end": 134.14
          },
          {
            "word": "là",
            "start": 134.14,
            "end": 134.31
          },
          {
            "word": "thỏ,",
            "start": 134.31,
            "end": 134.57
          },
          {
            "word": "trốn",
            "start": 134.57,
            "end": 134.92
          },
          {
            "word": "em",
            "start": 134.92,
            "end": 135.09
          },
          {
            "word": "bằng",
            "start": 135.09,
            "end": 135.44
          },
          {
            "word": "cách",
            "start": 135.44,
            "end": 135.79
          },
          {
            "word": "nào",
            "start": 135.79,
            "end": 136.05
          }
        ]
      },
      {
        "id": 31,
        "startTime": 136.16,
        "endTime": 137.7,
        "nextLineTime": 137.8,
        "text": "Anh tìm về thế giới mới",
        "words": [
          {
            "word": "Anh",
            "start": 136.16,
            "end": 136.42
          },
          {
            "word": "tìm",
            "start": 136.42,
            "end": 136.68
          },
          {
            "word": "về",
            "start": 136.68,
            "end": 136.85
          },
          {
            "word": "thế",
            "start": 136.85,
            "end": 137.11
          },
          {
            "word": "giới",
            "start": 137.11,
            "end": 137.45
          },
          {
            "word": "mới",
            "start": 137.45,
            "end": 137.71
          }
        ]
      },
      {
        "id": 32,
        "startTime": 137.8,
        "endTime": 139.7,
        "nextLineTime": 139.8,
        "text": "Trên thảo nguyên rực cháy khúc tráng ca",
        "words": [
          {
            "word": "Trên",
            "start": 137.8,
            "end": 138.04
          },
          {
            "word": "thảo",
            "start": 138.04,
            "end": 138.28
          },
          {
            "word": "nguyên",
            "start": 138.28,
            "end": 138.64
          },
          {
            "word": "rực",
            "start": 138.64,
            "end": 138.82
          },
          {
            "word": "cháy",
            "start": 138.82,
            "end": 139.06
          },
          {
            "word": "khúc",
            "start": 139.06,
            "end": 139.3
          },
          {
            "word": "tráng",
            "start": 139.3,
            "end": 139.6
          },
          {
            "word": "ca",
            "start": 139.6,
            "end": 139.72
          }
        ]
      },
      {
        "id": 33,
        "startTime": 139.8,
        "endTime": 141.3,
        "nextLineTime": 141.4,
        "text": "Có hoa lửa bùng trong ánh mắt",
        "words": [
          {
            "word": "Có",
            "start": 139.8,
            "end": 139.93
          },
          {
            "word": "hoa",
            "start": 139.93,
            "end": 140.13
          },
          {
            "word": "lửa",
            "start": 140.13,
            "end": 140.33
          },
          {
            "word": "bùng",
            "start": 140.33,
            "end": 140.59
          },
          {
            "word": "trong",
            "start": 140.59,
            "end": 140.92
          },
          {
            "word": "ánh",
            "start": 140.92,
            "end": 141.12
          },
          {
            "word": "mắt",
            "start": 141.12,
            "end": 141.32
          }
        ]
      },
      {
        "id": 34,
        "startTime": 141.4,
        "endTime": 143.1,
        "nextLineTime": 143.2,
        "text": "Set me free, set me free!",
        "words": [
          {
            "word": "Set",
            "start": 141.4,
            "end": 141.67
          },
          {
            "word": "me",
            "start": 141.67,
            "end": 141.85
          },
          {
            "word": "free,",
            "start": 141.85,
            "end": 142.21
          },
          {
            "word": "set",
            "start": 142.21,
            "end": 142.48
          },
          {
            "word": "me",
            "start": 142.48,
            "end": 142.66
          },
          {
            "word": "free!",
            "start": 142.66,
            "end": 143.11
          }
        ]
      },
      {
        "id": 35,
        "startTime": 143.2,
        "endTime": 145.0,
        "nextLineTime": 145.1,
        "text": "Căng buồm đến đại dương xa xôi",
        "words": [
          {
            "word": "Căng",
            "start": 143.2,
            "end": 143.5
          },
          {
            "word": "buồm",
            "start": 143.5,
            "end": 143.8
          },
          {
            "word": "đến",
            "start": 143.8,
            "end": 144.03
          },
          {
            "word": "đại",
            "start": 144.03,
            "end": 144.25
          },
          {
            "word": "dương",
            "start": 144.25,
            "end": 144.62
          },
          {
            "word": "xa",
            "start": 144.62,
            "end": 144.77
          },
          {
            "word": "xôi",
            "start": 144.77,
            "end": 145.0
          }
        ]
      },
      {
        "id": 36,
        "startTime": 145.1,
        "endTime": 146.94,
        "nextLineTime": 147.04,
        "text": "Hải đăng vẫn khiêu vũ nơi bóng tối",
        "words": [
          {
            "word": "Hải",
            "start": 145.1,
            "end": 145.3
          },
          {
            "word": "đăng",
            "start": 145.3,
            "end": 145.57
          },
          {
            "word": "vẫn",
            "start": 145.57,
            "end": 145.77
          },
          {
            "word": "khiêu",
            "start": 145.77,
            "end": 146.11
          },
          {
            "word": "vũ",
            "start": 146.11,
            "end": 146.25
          },
          {
            "word": "nơi",
            "start": 146.25,
            "end": 146.45
          },
          {
            "word": "bóng",
            "start": 146.45,
            "end": 146.72
          },
          {
            "word": "tối",
            "start": 146.72,
            "end": 146.92
          }
        ]
      },
      {
        "id": 37,
        "startTime": 147.04,
        "endTime": 148.74,
        "nextLineTime": 148.84,
        "text": "Nước mắt rơi hoang mạc không lời",
        "words": [
          {
            "word": "Nước",
            "start": 147.04,
            "end": 147.3
          },
          {
            "word": "mắt",
            "start": 147.3,
            "end": 147.5
          },
          {
            "word": "rơi",
            "start": 147.5,
            "end": 147.7
          },
          {
            "word": "hoang",
            "start": 147.7,
            "end": 148.03
          },
          {
            "word": "mạc",
            "start": 148.03,
            "end": 148.23
          },
          {
            "word": "không",
            "start": 148.23,
            "end": 148.56
          },
          {
            "word": "lời",
            "start": 148.56,
            "end": 148.76
          }
        ]
      },
      {
        "id": 38,
        "startTime": 148.84,
        "endTime": 151.26,
        "nextLineTime": 151.36,
        "text": "Đâm chồi, vươn lên một nhành hoa",
        "words": [
          {
            "word": "Đâm",
            "start": 148.84,
            "end": 149.13
          },
          {
            "word": "chồi,",
            "start": 149.13,
            "end": 149.52
          },
          {
            "word": "vươn",
            "start": 149.52,
            "end": 149.91
          },
          {
            "word": "lên",
            "start": 149.91,
            "end": 150.2
          },
          {
            "word": "một",
            "start": 150.2,
            "end": 150.49
          },
          {
            "word": "nhành",
            "start": 150.49,
            "end": 150.97
          },
          {
            "word": "hoa",
            "start": 150.97,
            "end": 151.26
          }
        ]
      },
      {
        "id": 39,
        "startTime": 151.36,
        "endTime": 153.58,
        "nextLineTime": 153.68,
        "text": "Anh vốn chẳng là gì trong mắt em",
        "words": [
          {
            "word": "Anh",
            "start": 151.36,
            "end": 151.63
          },
          {
            "word": "vốn",
            "start": 151.63,
            "end": 151.9
          },
          {
            "word": "chẳng",
            "start": 151.9,
            "end": 152.34
          },
          {
            "word": "là",
            "start": 152.34,
            "end": 152.52
          },
          {
            "word": "gì",
            "start": 152.52,
            "end": 152.7
          },
          {
            "word": "trong",
            "start": 152.7,
            "end": 153.14
          },
          {
            "word": "mắt",
            "start": 153.14,
            "end": 153.41
          },
          {
            "word": "em",
            "start": 153.41,
            "end": 153.59
          }
        ]
      },
      {
        "id": 40,
        "startTime": 153.68,
        "endTime": 155.1,
        "nextLineTime": 155.2,
        "text": "Em chẳng cần nói đâu",
        "words": [
          {
            "word": "Em",
            "start": 153.68,
            "end": 153.86
          },
          {
            "word": "chẳng",
            "start": 153.86,
            "end": 154.3
          },
          {
            "word": "cần",
            "start": 154.3,
            "end": 154.57
          },
          {
            "word": "nói",
            "start": 154.57,
            "end": 154.84
          },
          {
            "word": "đâu",
            "start": 154.84,
            "end": 155.11
          }
        ]
      },
      {
        "id": 41,
        "startTime": 155.2,
        "endTime": 156.7,
        "nextLineTime": 156.8,
        "text": "Trước kia trái tim em sắt đá",
        "words": [
          {
            "word": "Trước",
            "start": 155.2,
            "end": 155.54
          },
          {
            "word": "kia",
            "start": 155.54,
            "end": 155.74
          },
          {
            "word": "trái",
            "start": 155.74,
            "end": 156.01
          },
          {
            "word": "tim",
            "start": 156.01,
            "end": 156.21
          },
          {
            "word": "em",
            "start": 156.21,
            "end": 156.35
          },
          {
            "word": "sắt",
            "start": 156.35,
            "end": 156.55
          },
          {
            "word": "đá",
            "start": 156.55,
            "end": 156.69
          }
        ]
      },
      {
        "id": 42,
        "startTime": 156.8,
        "endTime": 158.98,
        "nextLineTime": 159.08,
        "text": "Em vứt trong hố sâu, bae",
        "words": [
          {
            "word": "Em",
            "start": 156.8,
            "end": 157.04
          },
          {
            "word": "vứt",
            "start": 157.04,
            "end": 157.4
          },
          {
            "word": "trong",
            "start": 157.4,
            "end": 158.01
          },
          {
            "word": "hố",
            "start": 158.01,
            "end": 158.25
          },
          {
            "word": "sâu,",
            "start": 158.25,
            "end": 158.61
          },
          {
            "word": "bae",
            "start": 158.61,
            "end": 158.97
          }
        ]
      },
      {
        "id": 43,
        "startTime": 159.08,
        "endTime": 160.5,
        "nextLineTime": 160.6,
        "text": "Trò chơi giờ là hồi kết",
        "words": [
          {
            "word": "Trò",
            "start": 159.08,
            "end": 159.32
          },
          {
            "word": "chơi",
            "start": 159.32,
            "end": 159.64
          },
          {
            "word": "giờ",
            "start": 159.64,
            "end": 159.88
          },
          {
            "word": "là",
            "start": 159.88,
            "end": 160.04
          },
          {
            "word": "hồi",
            "start": 160.04,
            "end": 160.28
          },
          {
            "word": "kết",
            "start": 160.28,
            "end": 160.52
          }
        ]
      },
      {
        "id": 44,
        "startTime": 160.6,
        "endTime": 162.14,
        "nextLineTime": 162.24,
        "text": "Nên em vội quay lại phía sau",
        "words": [
          {
            "word": "Nên",
            "start": 160.6,
            "end": 160.81
          },
          {
            "word": "em",
            "start": 160.81,
            "end": 160.95
          },
          {
            "word": "vội",
            "start": 160.95,
            "end": 161.16
          },
          {
            "word": "quay",
            "start": 161.16,
            "end": 161.44
          },
          {
            "word": "lại",
            "start": 161.44,
            "end": 161.65
          },
          {
            "word": "phía",
            "start": 161.65,
            "end": 161.93
          },
          {
            "word": "sau",
            "start": 161.93,
            "end": 162.14
          }
        ]
      },
      {
        "id": 45,
        "startTime": 162.24,
        "endTime": 163.7,
        "nextLineTime": 163.8,
        "text": "Chuyện mình chẳng còn gì đâu",
        "words": [
          {
            "word": "Chuyện",
            "start": 162.24,
            "end": 162.62
          },
          {
            "word": "mình",
            "start": 162.62,
            "end": 162.87
          },
          {
            "word": "chẳng",
            "start": 162.87,
            "end": 163.19
          },
          {
            "word": "còn",
            "start": 163.19,
            "end": 163.38
          },
          {
            "word": "gì",
            "start": 163.38,
            "end": 163.51
          },
          {
            "word": "đâu",
            "start": 163.51,
            "end": 163.7
          }
        ]
      },
      {
        "id": 46,
        "startTime": 163.8,
        "endTime": 165.82,
        "nextLineTime": 165.92,
        "text": "Nên em đừng mong gì hơn nữa",
        "words": [
          {
            "word": "Nên",
            "start": 163.8,
            "end": 164.09
          },
          {
            "word": "em",
            "start": 164.09,
            "end": 164.28
          },
          {
            "word": "đừng",
            "start": 164.28,
            "end": 164.66
          },
          {
            "word": "mong",
            "start": 164.66,
            "end": 165.04
          },
          {
            "word": "gì",
            "start": 165.04,
            "end": 165.23
          },
          {
            "word": "hơn",
            "start": 165.23,
            "end": 165.52
          },
          {
            "word": "nữa",
            "start": 165.52,
            "end": 165.81
          }
        ]
      },
      {
        "id": 47,
        "startTime": 165.92,
        "endTime": 167.5,
        "nextLineTime": 167.6,
        "text": "Vì mọi chuyện giờ đã khác",
        "words": [
          {
            "word": "Vì",
            "start": 165.92,
            "end": 166.08
          },
          {
            "word": "mọi",
            "start": 166.08,
            "end": 166.32
          },
          {
            "word": "chuyện",
            "start": 166.32,
            "end": 166.79
          },
          {
            "word": "giờ",
            "start": 166.79,
            "end": 167.03
          },
          {
            "word": "đã",
            "start": 167.03,
            "end": 167.19
          },
          {
            "word": "khác",
            "start": 167.19,
            "end": 167.51
          }
        ]
      },
      {
        "id": 48,
        "startTime": 167.6,
        "endTime": 168.8,
        "nextLineTime": 168.9,
        "text": "Anh cũng chẳng mong cảm",
        "words": [
          {
            "word": "Anh",
            "start": 167.6,
            "end": 167.79
          },
          {
            "word": "cũng",
            "start": 167.79,
            "end": 168.04
          },
          {
            "word": "chẳng",
            "start": 168.04,
            "end": 168.36
          },
          {
            "word": "mong",
            "start": 168.36,
            "end": 168.61
          },
          {
            "word": "cảm",
            "start": 168.61,
            "end": 168.8
          }
        ]
      },
      {
        "id": 49,
        "startTime": 168.9,
        "endTime": 170.14,
        "nextLineTime": 170.24,
        "text": "giác yêu đương gì đâu",
        "words": [
          {
            "word": "giác",
            "start": 168.9,
            "end": 169.19
          },
          {
            "word": "yêu",
            "start": 169.19,
            "end": 169.41
          },
          {
            "word": "đương",
            "start": 169.41,
            "end": 169.77
          },
          {
            "word": "gì",
            "start": 169.77,
            "end": 169.92
          },
          {
            "word": "đâu",
            "start": 169.92,
            "end": 170.14
          }
        ]
      },
      {
        "id": 50,
        "startTime": 170.24,
        "endTime": 173.06,
        "nextLineTime": 173.16,
        "text": "Yah, you know, woah-oh-oh",
        "words": [
          {
            "word": "Yah,",
            "start": 170.24,
            "end": 170.66
          },
          {
            "word": "you",
            "start": 170.66,
            "end": 171.08
          },
          {
            "word": "know,",
            "start": 171.08,
            "end": 171.64
          },
          {
            "word": "woah-oh-oh",
            "start": 171.64,
            "end": 173.05
          }
        ]
      },
      {
        "id": 51,
        "startTime": 173.16,
        "endTime": 174.86,
        "nextLineTime": 174.96,
        "text": "Chẳng còn điều gì cần thiết ngay bây giờ",
        "words": [
          {
            "word": "Chẳng",
            "start": 173.16,
            "end": 173.43
          },
          {
            "word": "còn",
            "start": 173.43,
            "end": 173.59
          },
          {
            "word": "điều",
            "start": 173.59,
            "end": 173.8
          },
          {
            "word": "gì",
            "start": 173.8,
            "end": 173.91
          },
          {
            "word": "cần",
            "start": 173.91,
            "end": 174.07
          },
          {
            "word": "thiết",
            "start": 174.07,
            "end": 174.34
          },
          {
            "word": "ngay",
            "start": 174.34,
            "end": 174.55
          },
          {
            "word": "bây",
            "start": 174.55,
            "end": 174.71
          },
          {
            "word": "giờ",
            "start": 174.71,
            "end": 174.87
          }
        ]
      },
      {
        "id": 52,
        "startTime": 174.96,
        "endTime": 176.58,
        "nextLineTime": 176.68,
        "text": "Anh cũng chẳng biết đâu em à",
        "words": [
          {
            "word": "Anh",
            "start": 174.96,
            "end": 175.17
          },
          {
            "word": "cũng",
            "start": 175.17,
            "end": 175.45
          },
          {
            "word": "chẳng",
            "start": 175.45,
            "end": 175.8
          },
          {
            "word": "biết",
            "start": 175.8,
            "end": 176.08
          },
          {
            "word": "đâu",
            "start": 176.08,
            "end": 176.29
          },
          {
            "word": "em",
            "start": 176.29,
            "end": 176.43
          },
          {
            "word": "à",
            "start": 176.43,
            "end": 176.57
          }
        ]
      },
      {
        "id": 53,
        "startTime": 176.68,
        "endTime": 180.46,
        "nextLineTime": 180.56,
        "text": "Bae, let me go, woah-oh-oh",
        "words": [
          {
            "word": "Bae,",
            "start": 176.68,
            "end": 177.25
          },
          {
            "word": "let",
            "start": 177.25,
            "end": 177.82
          },
          {
            "word": "me",
            "start": 177.82,
            "end": 178.2
          },
          {
            "word": "go,",
            "start": 178.2,
            "end": 178.58
          },
          {
            "word": "woah-oh-oh",
            "start": 178.58,
            "end": 180.47
          }
        ]
      },
      {
        "id": 54,
        "startTime": 180.56,
        "endTime": 182.06,
        "nextLineTime": 182.16,
        "text": "Chẳng còn điều gì để cố,",
        "words": [
          {
            "word": "Chẳng",
            "start": 180.56,
            "end": 180.98
          },
          {
            "word": "còn",
            "start": 180.98,
            "end": 181.23
          },
          {
            "word": "điều",
            "start": 181.23,
            "end": 181.56
          },
          {
            "word": "gì",
            "start": 181.56,
            "end": 181.73
          },
          {
            "word": "để",
            "start": 181.73,
            "end": 181.9
          },
          {
            "word": "cố,",
            "start": 181.9,
            "end": 182.07
          }
        ]
      },
      {
        "id": 55,
        "startTime": 182.16,
        "endTime": 184.02,
        "nextLineTime": 184.12,
        "text": "để níu, để kéo thêm nữa đâu",
        "words": [
          {
            "word": "để",
            "start": 182.16,
            "end": 182.35
          },
          {
            "word": "níu,",
            "start": 182.35,
            "end": 182.63
          },
          {
            "word": "để",
            "start": 182.63,
            "end": 182.82
          },
          {
            "word": "kéo",
            "start": 182.82,
            "end": 183.1
          },
          {
            "word": "thêm",
            "start": 183.1,
            "end": 183.47
          },
          {
            "word": "nữa",
            "start": 183.47,
            "end": 183.75
          },
          {
            "word": "đâu",
            "start": 183.75,
            "end": 184.03
          }
        ]
      },
      {
        "id": 56,
        "startTime": 184.12,
        "endTime": 187.22,
        "nextLineTime": 187.32,
        "text": "Vì mọi chuyện giờ đã khác, đã khác rồi",
        "words": [
          {
            "word": "Vì",
            "start": 184.12,
            "end": 184.33
          },
          {
            "word": "mọi",
            "start": 184.33,
            "end": 184.65
          },
          {
            "word": "chuyện",
            "start": 184.65,
            "end": 185.29
          },
          {
            "word": "giờ",
            "start": 185.29,
            "end": 185.61
          },
          {
            "word": "đã",
            "start": 185.61,
            "end": 185.82
          },
          {
            "word": "khác,",
            "start": 185.82,
            "end": 186.25
          },
          {
            "word": "đã",
            "start": 186.25,
            "end": 186.46
          },
          {
            "word": "khác",
            "start": 186.46,
            "end": 186.89
          },
          {
            "word": "rồi",
            "start": 186.89,
            "end": 187.21
          }
        ]
      },
      {
        "id": 57,
        "startTime": 187.32,
        "endTime": 188.9,
        "nextLineTime": 189.0,
        "text": "Chẳng còn điều gì để cố,",
        "words": [
          {
            "word": "Chẳng",
            "start": 187.32,
            "end": 187.76
          },
          {
            "word": "còn",
            "start": 187.76,
            "end": 188.02
          },
          {
            "word": "điều",
            "start": 188.02,
            "end": 188.37
          },
          {
            "word": "gì",
            "start": 188.37,
            "end": 188.55
          },
          {
            "word": "để",
            "start": 188.55,
            "end": 188.73
          },
          {
            "word": "cố,",
            "start": 188.73,
            "end": 188.91
          }
        ]
      },
      {
        "id": 58,
        "startTime": 189.0,
        "endTime": 190.9,
        "nextLineTime": 191.0,
        "text": "phải níu, nên thế em cứ đi",
        "words": [
          {
            "word": "phải",
            "start": 189.0,
            "end": 189.4
          },
          {
            "word": "níu,",
            "start": 189.4,
            "end": 189.7
          },
          {
            "word": "nên",
            "start": 189.7,
            "end": 190.0
          },
          {
            "word": "thế",
            "start": 190.0,
            "end": 190.3
          },
          {
            "word": "em",
            "start": 190.3,
            "end": 190.5
          },
          {
            "word": "cứ",
            "start": 190.5,
            "end": 190.7
          },
          {
            "word": "đi",
            "start": 190.7,
            "end": 190.9
          }
        ]
      },
      {
        "id": 59,
        "startTime": 191.0,
        "endTime": 192.7,
        "nextLineTime": 192.8,
        "text": "Vì mọi chuyện giờ đã khác, đã khác rồi",
        "words": [
          {
            "word": "Vì",
            "start": 191.0,
            "end": 191.12
          },
          {
            "word": "mọi",
            "start": 191.12,
            "end": 191.3
          },
          {
            "word": "chuyện",
            "start": 191.3,
            "end": 191.65
          },
          {
            "word": "giờ",
            "start": 191.65,
            "end": 191.83
          },
          {
            "word": "đã",
            "start": 191.83,
            "end": 191.95
          },
          {
            "word": "khác,",
            "start": 191.95,
            "end": 192.18
          },
          {
            "word": "đã",
            "start": 192.18,
            "end": 192.3
          },
          {
            "word": "khác",
            "start": 192.3,
            "end": 192.53
          },
          {
            "word": "rồi",
            "start": 192.53,
            "end": 192.71
          }
        ]
      },
      {
        "id": 60,
        "startTime": 192.8,
        "endTime": 196.74,
        "nextLineTime": 196.84,
        "text": "Anh đã cố mà cố lại càng đau em à",
        "words": [
          {
            "word": "Anh",
            "start": 192.8,
            "end": 193.27
          },
          {
            "word": "đã",
            "start": 193.27,
            "end": 193.59
          },
          {
            "word": "cố",
            "start": 193.59,
            "end": 193.91
          },
          {
            "word": "mà",
            "start": 193.91,
            "end": 194.23
          },
          {
            "word": "cố",
            "start": 194.23,
            "end": 194.55
          },
          {
            "word": "lại",
            "start": 194.55,
            "end": 195.02
          },
          {
            "word": "càng",
            "start": 195.02,
            "end": 195.65
          },
          {
            "word": "đau",
            "start": 195.65,
            "end": 196.12
          },
          {
            "word": "em",
            "start": 196.12,
            "end": 196.44
          },
          {
            "word": "à",
            "start": 196.44,
            "end": 196.76
          }
        ]
      },
      {
        "id": 61,
        "startTime": 196.84,
        "endTime": 199.43,
        "nextLineTime": 199.53,
        "text": "Là đúng hay là sai, tình",
        "words": [
          {
            "word": "Là",
            "start": 196.84,
            "end": 197.13
          },
          {
            "word": "đúng",
            "start": 197.13,
            "end": 197.71
          },
          {
            "word": "hay",
            "start": 197.71,
            "end": 198.14
          },
          {
            "word": "là",
            "start": 198.14,
            "end": 198.43
          },
          {
            "word": "sai,",
            "start": 198.43,
            "end": 198.86
          },
          {
            "word": "tình",
            "start": 198.86,
            "end": 199.44
          }
        ]
      },
      {
        "id": 62,
        "startTime": 199.53,
        "endTime": 203.98,
        "nextLineTime": 204.08,
        "text": "yêu mà không phải sai lầm",
        "words": [
          {
            "word": "yêu",
            "start": 199.53,
            "end": 200.2
          },
          {
            "word": "mà",
            "start": 200.2,
            "end": 200.64
          },
          {
            "word": "không",
            "start": 200.64,
            "end": 201.75
          },
          {
            "word": "phải",
            "start": 201.75,
            "end": 202.64
          },
          {
            "word": "sai",
            "start": 202.64,
            "end": 203.31
          },
          {
            "word": "lầm",
            "start": 203.31,
            "end": 203.98
          }
        ]
      },
      {
        "id": 63,
        "startTime": 204.08,
        "endTime": 206.94,
        "nextLineTime": 207.04,
        "text": "Tình em giống như loài hoa,",
        "words": [
          {
            "word": "Tình",
            "start": 204.08,
            "end": 204.62
          },
          {
            "word": "em",
            "start": 204.62,
            "end": 204.89
          },
          {
            "word": "giống",
            "start": 204.89,
            "end": 205.57
          },
          {
            "word": "như",
            "start": 205.57,
            "end": 205.98
          },
          {
            "word": "loài",
            "start": 205.98,
            "end": 206.52
          },
          {
            "word": "hoa,",
            "start": 206.52,
            "end": 206.93
          }
        ]
      },
      {
        "id": 64,
        "startTime": 207.04,
        "endTime": 211.3,
        "nextLineTime": 211.4,
        "text": "mà đau như ngàn gai đâm",
        "words": [
          {
            "word": "mà",
            "start": 207.04,
            "end": 207.51
          },
          {
            "word": "đau",
            "start": 207.51,
            "end": 208.22
          },
          {
            "word": "như",
            "start": 208.22,
            "end": 208.93
          },
          {
            "word": "ngàn",
            "start": 208.93,
            "end": 209.88
          },
          {
            "word": "gai",
            "start": 209.88,
            "end": 210.59
          },
          {
            "word": "đâm",
            "start": 210.59,
            "end": 211.3
          }
        ]
      },
      {
        "id": 65,
        "startTime": 211.4,
        "endTime": 213.04,
        "nextLineTime": 213.14,
        "text": "Anh vẫn sẽ biết thoát ra,",
        "words": [
          {
            "word": "Anh",
            "start": 211.4,
            "end": 211.66
          },
          {
            "word": "vẫn",
            "start": 211.66,
            "end": 211.92
          },
          {
            "word": "sẽ",
            "start": 211.92,
            "end": 212.09
          },
          {
            "word": "biết",
            "start": 212.09,
            "end": 212.44
          },
          {
            "word": "thoát",
            "start": 212.44,
            "end": 212.87
          },
          {
            "word": "ra,",
            "start": 212.87,
            "end": 213.04
          }
        ]
      },
      {
        "id": 66,
        "startTime": 213.14,
        "endTime": 214.94,
        "nextLineTime": 215.04,
        "text": "vì mọi chuyện giờ đã khác",
        "words": [
          {
            "word": "vì",
            "start": 213.14,
            "end": 213.32
          },
          {
            "word": "mọi",
            "start": 213.32,
            "end": 213.59
          },
          {
            "word": "chuyện",
            "start": 213.59,
            "end": 214.13
          },
          {
            "word": "giờ",
            "start": 214.13,
            "end": 214.4
          },
          {
            "word": "đã",
            "start": 214.4,
            "end": 214.58
          },
          {
            "word": "khác",
            "start": 214.58,
            "end": 214.94
          }
        ]
      },
      {
        "id": 67,
        "startTime": 215.04,
        "endTime": 216.52,
        "nextLineTime": 216.62,
        "text": "Chỉ cần em let me go,",
        "words": [
          {
            "word": "Chỉ",
            "start": 215.04,
            "end": 215.34
          },
          {
            "word": "cần",
            "start": 215.34,
            "end": 215.64
          },
          {
            "word": "em",
            "start": 215.64,
            "end": 215.84
          },
          {
            "word": "let",
            "start": 215.84,
            "end": 216.14
          },
          {
            "word": "me",
            "start": 216.14,
            "end": 216.34
          },
          {
            "word": "go,",
            "start": 216.34,
            "end": 216.54
          }
        ]
      },
      {
        "id": 68,
        "startTime": 216.62,
        "endTime": 218.58,
        "nextLineTime": 218.68,
        "text": "vì mọi chuyện giờ đã khác",
        "words": [
          {
            "word": "vì",
            "start": 216.62,
            "end": 216.82
          },
          {
            "word": "mọi",
            "start": 216.82,
            "end": 217.11
          },
          {
            "word": "chuyện",
            "start": 217.11,
            "end": 217.7
          },
          {
            "word": "giờ",
            "start": 217.7,
            "end": 217.99
          },
          {
            "word": "đã",
            "start": 217.99,
            "end": 218.19
          },
          {
            "word": "khác",
            "start": 218.19,
            "end": 218.58
          }
        ]
      },
      {
        "id": 69,
        "startTime": 218.68,
        "endTime": 221.33,
        "nextLineTime": 221.43,
        "text": "Anh vẫn sẽ biết thoát ra,",
        "words": [
          {
            "word": "Anh",
            "start": 218.68,
            "end": 219.1
          },
          {
            "word": "vẫn",
            "start": 219.1,
            "end": 219.52
          },
          {
            "word": "sẽ",
            "start": 219.52,
            "end": 219.8
          },
          {
            "word": "biết",
            "start": 219.8,
            "end": 220.36
          },
          {
            "word": "thoát",
            "start": 220.36,
            "end": 221.06
          },
          {
            "word": "ra,",
            "start": 221.06,
            "end": 221.34
          }
        ]
      },
      {
        "id": 70,
        "startTime": 221.43,
        "endTime": 227.03,
        "nextLineTime": 240.56,
        "text": "vì mọi chuyện giờ đã khác",
        "words": [
          {
            "word": "vì",
            "start": 221.43,
            "end": 221.99
          },
          {
            "word": "mọi",
            "start": 221.99,
            "end": 222.83
          },
          {
            "word": "chuyện",
            "start": 222.83,
            "end": 224.51
          },
          {
            "word": "giờ",
            "start": 224.51,
            "end": 225.35
          },
          {
            "word": "đã",
            "start": 225.35,
            "end": 225.91
          },
          {
            "word": "khác",
            "start": 225.91,
            "end": 227.03
          }
        ]
      },
      {
        "id": 71,
        "startTime": 240.56,
        "endTime": 242.18,
        "nextLineTime": 242.28,
        "text": "Vì mọi chuyện giờ đã khác...",
        "words": [
          {
            "word": "Vì",
            "start": 240.56,
            "end": 240.72
          },
          {
            "word": "mọi",
            "start": 240.72,
            "end": 240.96
          },
          {
            "word": "chuyện",
            "start": 240.96,
            "end": 241.45
          },
          {
            "word": "giờ",
            "start": 241.45,
            "end": 241.69
          },
          {
            "word": "đã",
            "start": 241.69,
            "end": 241.85
          },
          {
            "word": "khác...",
            "start": 241.85,
            "end": 242.17
          }
        ]
      },
      {
        "id": 72,
        "startTime": 242.28,
        "endTime": 244.02,
        "nextLineTime": 244.12,
        "text": "Vì mọi chuyện giờ đã khác...",
        "words": [
          {
            "word": "Vì",
            "start": 242.28,
            "end": 242.45
          },
          {
            "word": "mọi",
            "start": 242.45,
            "end": 242.71
          },
          {
            "word": "chuyện",
            "start": 242.71,
            "end": 243.23
          },
          {
            "word": "giờ",
            "start": 243.23,
            "end": 243.49
          },
          {
            "word": "đã",
            "start": 243.49,
            "end": 243.66
          },
          {
            "word": "khác...",
            "start": 243.66,
            "end": 244.01
          }
        ]
      },
      {
        "id": 73,
        "startTime": 244.12,
        "endTime": 249.72,
        "nextLineTime": 323.92,
        "text": "Bae, let me go, woah-oh-oh!",
        "words": [
          {
            "word": "Bae,",
            "start": 244.12,
            "end": 244.92
          },
          {
            "word": "let",
            "start": 244.92,
            "end": 245.72
          },
          {
            "word": "me",
            "start": 245.72,
            "end": 246.25
          },
          {
            "word": "go,",
            "start": 246.25,
            "end": 246.78
          },
          {
            "word": "woah-oh-oh!",
            "start": 246.78,
            "end": 249.71
          }
        ]
      }
    ]
  },
  {
    "id": "karaoke-em-toi",
    "filename": "EM TÔI.mp3",
    "title": "Em Tôi",
    "artist": "Anh Trai Vượt Ngàn Chông Gai (Thanh Duy, THỎ, Hoàng Tôn, Đinh Mạnh Ninh, Cheng)",
    "duration": 337.48,
    "audioUrl": "/karaoke/karaoke-em-toi.mp3",
    "thumbUrl": "/karaoke/karaoke-em-toi.jpg",
    "lines": [
      {
        "id": 0,
        "startTime": 7.73,
        "endTime": 13.33,
        "nextLineTime": 16.25,
        "text": "Mây buồn, giấu nắng ở đâu",
        "words": [
          {
            "word": "Mây",
            "start": 7.73,
            "end": 8.57
          },
          {
            "word": "buồn,",
            "start": 8.57,
            "end": 9.69
          },
          {
            "word": "giấu",
            "start": 9.69,
            "end": 10.81
          },
          {
            "word": "nắng",
            "start": 10.81,
            "end": 11.93
          },
          {
            "word": "ở",
            "start": 11.93,
            "end": 12.49
          },
          {
            "word": "đâu",
            "start": 12.49,
            "end": 13.33
          }
        ]
      },
      {
        "id": 1,
        "startTime": 16.25,
        "endTime": 21.85,
        "nextLineTime": 44.97,
        "text": "Để mưa nặng hạt em lâu chưa về",
        "words": [
          {
            "word": "Để",
            "start": 16.25,
            "end": 16.74
          },
          {
            "word": "mưa",
            "start": 16.74,
            "end": 17.47
          },
          {
            "word": "nặng",
            "start": 17.47,
            "end": 18.44
          },
          {
            "word": "hạt",
            "start": 18.44,
            "end": 19.17
          },
          {
            "word": "em",
            "start": 19.17,
            "end": 19.66
          },
          {
            "word": "lâu",
            "start": 19.66,
            "end": 20.39
          },
          {
            "word": "chưa",
            "start": 20.39,
            "end": 21.36
          },
          {
            "word": "về",
            "start": 21.36,
            "end": 21.85
          }
        ]
      },
      {
        "id": 2,
        "startTime": 44.97,
        "endTime": 50.57,
        "nextLineTime": 52.42,
        "text": "Mây buồn, giấu nắng ở đâu",
        "words": [
          {
            "word": "Mây",
            "start": 44.97,
            "end": 45.81
          },
          {
            "word": "buồn,",
            "start": 45.81,
            "end": 46.93
          },
          {
            "word": "giấu",
            "start": 46.93,
            "end": 48.05
          },
          {
            "word": "nắng",
            "start": 48.05,
            "end": 49.17
          },
          {
            "word": "ở",
            "start": 49.17,
            "end": 49.73
          },
          {
            "word": "đâu",
            "start": 49.73,
            "end": 50.57
          }
        ]
      },
      {
        "id": 3,
        "startTime": 52.42,
        "endTime": 58.02,
        "nextLineTime": 60.96,
        "text": "Để mưa nặng hạt em lâu chưa về",
        "words": [
          {
            "word": "Để",
            "start": 52.42,
            "end": 52.91
          },
          {
            "word": "mưa",
            "start": 52.91,
            "end": 53.64
          },
          {
            "word": "nặng",
            "start": 53.64,
            "end": 54.61
          },
          {
            "word": "hạt",
            "start": 54.61,
            "end": 55.34
          },
          {
            "word": "em",
            "start": 55.34,
            "end": 55.83
          },
          {
            "word": "lâu",
            "start": 55.83,
            "end": 56.56
          },
          {
            "word": "chưa",
            "start": 56.56,
            "end": 57.53
          },
          {
            "word": "về",
            "start": 57.53,
            "end": 58.02
          }
        ]
      },
      {
        "id": 4,
        "startTime": 60.96,
        "endTime": 66.56,
        "nextLineTime": 68.92,
        "text": "Mây buồn, giấu nắng ở đâu",
        "words": [
          {
            "word": "Mây",
            "start": 60.96,
            "end": 61.8
          },
          {
            "word": "buồn,",
            "start": 61.8,
            "end": 62.92
          },
          {
            "word": "giấu",
            "start": 62.92,
            "end": 64.04
          },
          {
            "word": "nắng",
            "start": 64.04,
            "end": 65.16
          },
          {
            "word": "ở",
            "start": 65.16,
            "end": 65.72
          },
          {
            "word": "đâu",
            "start": 65.72,
            "end": 66.56
          }
        ]
      },
      {
        "id": 5,
        "startTime": 68.92,
        "endTime": 74.52,
        "nextLineTime": 78.49,
        "text": "Để mưa nặng hạt em lâu chưa về",
        "words": [
          {
            "word": "Để",
            "start": 68.92,
            "end": 69.41
          },
          {
            "word": "mưa",
            "start": 69.41,
            "end": 70.14
          },
          {
            "word": "nặng",
            "start": 70.14,
            "end": 71.11
          },
          {
            "word": "hạt",
            "start": 71.11,
            "end": 71.84
          },
          {
            "word": "em",
            "start": 71.84,
            "end": 72.33
          },
          {
            "word": "lâu",
            "start": 72.33,
            "end": 73.06
          },
          {
            "word": "chưa",
            "start": 73.06,
            "end": 74.03
          },
          {
            "word": "về",
            "start": 74.03,
            "end": 74.52
          }
        ]
      },
      {
        "id": 6,
        "startTime": 78.49,
        "endTime": 83.56,
        "nextLineTime": 83.66,
        "text": "Ước gì là gió mùa hè",
        "words": [
          {
            "word": "Ước",
            "start": 78.49,
            "end": 79.5
          },
          {
            "word": "gì",
            "start": 79.5,
            "end": 80.18
          },
          {
            "word": "là",
            "start": 80.18,
            "end": 80.86
          },
          {
            "word": "gió",
            "start": 80.86,
            "end": 81.87
          },
          {
            "word": "mùa",
            "start": 81.87,
            "end": 82.88
          },
          {
            "word": "hè",
            "start": 82.88,
            "end": 83.56
          }
        ]
      },
      {
        "id": 7,
        "startTime": 83.66,
        "endTime": 89.26,
        "nextLineTime": 92.7,
        "text": "Xua mây mưa để nắng về em tôi",
        "words": [
          {
            "word": "Xua",
            "start": 83.66,
            "end": 84.42
          },
          {
            "word": "mây",
            "start": 84.42,
            "end": 85.18
          },
          {
            "word": "mưa",
            "start": 85.18,
            "end": 85.94
          },
          {
            "word": "để",
            "start": 85.94,
            "end": 86.45
          },
          {
            "word": "nắng",
            "start": 86.45,
            "end": 87.47
          },
          {
            "word": "về",
            "start": 87.47,
            "end": 87.98
          },
          {
            "word": "em",
            "start": 87.98,
            "end": 88.49
          },
          {
            "word": "tôi",
            "start": 88.49,
            "end": 89.25
          }
        ]
      },
      {
        "id": 8,
        "startTime": 92.7,
        "endTime": 97.35,
        "nextLineTime": 97.45,
        "text": "Ước là gió thổi mây trôi",
        "words": [
          {
            "word": "Ước",
            "start": 92.7,
            "end": 93.43
          },
          {
            "word": "là",
            "start": 93.43,
            "end": 93.92
          },
          {
            "word": "gió",
            "start": 93.92,
            "end": 94.65
          },
          {
            "word": "thổi",
            "start": 94.65,
            "end": 95.63
          },
          {
            "word": "mây",
            "start": 95.63,
            "end": 96.36
          },
          {
            "word": "trôi",
            "start": 96.36,
            "end": 97.34
          }
        ]
      },
      {
        "id": 9,
        "startTime": 97.45,
        "endTime": 103.05,
        "nextLineTime": 106.55,
        "text": "Để cho tôi ngắm mặt trời em tôi",
        "words": [
          {
            "word": "Để",
            "start": 97.45,
            "end": 97.92
          },
          {
            "word": "cho",
            "start": 97.92,
            "end": 98.62
          },
          {
            "word": "tôi",
            "start": 98.62,
            "end": 99.32
          },
          {
            "word": "ngắm",
            "start": 99.32,
            "end": 100.25
          },
          {
            "word": "mặt",
            "start": 100.25,
            "end": 100.95
          },
          {
            "word": "trời",
            "start": 100.95,
            "end": 101.88
          },
          {
            "word": "em",
            "start": 101.88,
            "end": 102.35
          },
          {
            "word": "tôi",
            "start": 102.35,
            "end": 103.05
          }
        ]
      },
      {
        "id": 10,
        "startTime": 106.55,
        "endTime": 110.72,
        "nextLineTime": 110.82,
        "text": "Hỏi mưa hỡi mưa đi về đường nào",
        "words": [
          {
            "word": "Hỏi",
            "start": 106.55,
            "end": 107.07
          },
          {
            "word": "mưa",
            "start": 107.07,
            "end": 107.59
          },
          {
            "word": "hỡi",
            "start": 107.59,
            "end": 108.11
          },
          {
            "word": "mưa",
            "start": 108.11,
            "end": 108.63
          },
          {
            "word": "đi",
            "start": 108.63,
            "end": 108.98
          },
          {
            "word": "về",
            "start": 108.98,
            "end": 109.33
          },
          {
            "word": "đường",
            "start": 109.33,
            "end": 110.2
          },
          {
            "word": "nào",
            "start": 110.2,
            "end": 110.72
          }
        ]
      },
      {
        "id": 11,
        "startTime": 110.82,
        "endTime": 114.42,
        "nextLineTime": 114.52,
        "text": "Hỏi gió nhắn câu thưa chào",
        "words": [
          {
            "word": "Hỏi",
            "start": 110.82,
            "end": 111.33
          },
          {
            "word": "gió",
            "start": 111.33,
            "end": 111.84
          },
          {
            "word": "nhắn",
            "start": 111.84,
            "end": 112.53
          },
          {
            "word": "câu",
            "start": 112.53,
            "end": 113.04
          },
          {
            "word": "thưa",
            "start": 113.04,
            "end": 113.73
          },
          {
            "word": "chào",
            "start": 113.73,
            "end": 114.42
          }
        ]
      },
      {
        "id": 12,
        "startTime": 114.52,
        "endTime": 118.1,
        "nextLineTime": 118.2,
        "text": "Sương mai gầy hao, thơ ngây là bao",
        "words": [
          {
            "word": "Sương",
            "start": 114.52,
            "end": 115.21
          },
          {
            "word": "mai",
            "start": 115.21,
            "end": 115.62
          },
          {
            "word": "gầy",
            "start": 115.62,
            "end": 116.03
          },
          {
            "word": "hao,",
            "start": 116.03,
            "end": 116.44
          },
          {
            "word": "thơ",
            "start": 116.44,
            "end": 116.85
          },
          {
            "word": "ngây",
            "start": 116.85,
            "end": 117.4
          },
          {
            "word": "là",
            "start": 117.4,
            "end": 117.68
          },
          {
            "word": "bao",
            "start": 117.68,
            "end": 118.09
          }
        ]
      },
      {
        "id": 13,
        "startTime": 118.2,
        "endTime": 120.25,
        "nextLineTime": 120.35,
        "text": "Bóng trăng tàn phai",
        "words": [
          {
            "word": "Bóng",
            "start": 118.2,
            "end": 118.71
          },
          {
            "word": "trăng",
            "start": 118.71,
            "end": 119.35
          },
          {
            "word": "tàn",
            "start": 119.35,
            "end": 119.73
          },
          {
            "word": "phai",
            "start": 119.73,
            "end": 120.24
          }
        ]
      },
      {
        "id": 14,
        "startTime": 120.35,
        "endTime": 122.38,
        "nextLineTime": 122.48,
        "text": "Khi sóng nước cuộn trào",
        "words": [
          {
            "word": "Khi",
            "start": 120.35,
            "end": 120.67
          },
          {
            "word": "sóng",
            "start": 120.67,
            "end": 121.1
          },
          {
            "word": "nước",
            "start": 121.1,
            "end": 121.53
          },
          {
            "word": "cuộn",
            "start": 121.53,
            "end": 121.96
          },
          {
            "word": "trào",
            "start": 121.96,
            "end": 122.39
          }
        ]
      },
      {
        "id": 15,
        "startTime": 122.48,
        "endTime": 125.57,
        "nextLineTime": 125.67,
        "text": "Hỏi em có hóa thành",
        "words": [
          {
            "word": "Hỏi",
            "start": 122.48,
            "end": 123.1
          },
          {
            "word": "em",
            "start": 123.1,
            "end": 123.51
          },
          {
            "word": "có",
            "start": 123.51,
            "end": 123.92
          },
          {
            "word": "hóa",
            "start": 123.92,
            "end": 124.54
          },
          {
            "word": "thành",
            "start": 124.54,
            "end": 125.57
          }
        ]
      },
      {
        "id": 16,
        "startTime": 125.67,
        "endTime": 127.72,
        "nextLineTime": 127.82,
        "text": "Cơn mưa đầu hè",
        "words": [
          {
            "word": "Cơn",
            "start": 125.67,
            "end": 126.23
          },
          {
            "word": "mưa",
            "start": 126.23,
            "end": 126.79
          },
          {
            "word": "đầu",
            "start": 126.79,
            "end": 127.35
          },
          {
            "word": "hè",
            "start": 127.35,
            "end": 127.72
          }
        ]
      },
      {
        "id": 17,
        "startTime": 127.82,
        "endTime": 130.92,
        "nextLineTime": 131.02,
        "text": "Hóa thành một dòng sông",
        "words": [
          {
            "word": "Hóa",
            "start": 127.82,
            "end": 128.31
          },
          {
            "word": "thành",
            "start": 128.31,
            "end": 129.13
          },
          {
            "word": "một",
            "start": 129.13,
            "end": 129.62
          },
          {
            "word": "dòng",
            "start": 129.62,
            "end": 130.27
          },
          {
            "word": "sông",
            "start": 130.27,
            "end": 130.92
          }
        ]
      },
      {
        "id": 18,
        "startTime": 131.02,
        "endTime": 133.57,
        "nextLineTime": 133.67,
        "text": "Đưa tôi trở về",
        "words": [
          {
            "word": "Đưa",
            "start": 131.02,
            "end": 131.72
          },
          {
            "word": "tôi",
            "start": 131.72,
            "end": 132.42
          },
          {
            "word": "trở",
            "start": 132.42,
            "end": 133.12
          },
          {
            "word": "về",
            "start": 133.12,
            "end": 133.58
          }
        ]
      },
      {
        "id": 19,
        "startTime": 133.67,
        "endTime": 139.27,
        "nextLineTime": 160.54,
        "text": "Ngày đó một thoáng em tôi",
        "words": [
          {
            "word": "Ngày",
            "start": 133.67,
            "end": 134.79
          },
          {
            "word": "đó",
            "start": 134.79,
            "end": 135.35
          },
          {
            "word": "một",
            "start": 135.35,
            "end": 136.19
          },
          {
            "word": "thoáng",
            "start": 136.19,
            "end": 137.87
          },
          {
            "word": "em",
            "start": 137.87,
            "end": 138.43
          },
          {
            "word": "tôi",
            "start": 138.43,
            "end": 139.27
          }
        ]
      },
      {
        "id": 20,
        "startTime": 160.54,
        "endTime": 165.21,
        "nextLineTime": 165.31,
        "text": "Ước gì là gió mùa hè",
        "words": [
          {
            "word": "Ước",
            "start": 160.54,
            "end": 161.47
          },
          {
            "word": "gì",
            "start": 161.47,
            "end": 162.09
          },
          {
            "word": "là",
            "start": 162.09,
            "end": 162.71
          },
          {
            "word": "gió",
            "start": 162.71,
            "end": 163.64
          },
          {
            "word": "mùa",
            "start": 163.64,
            "end": 164.57
          },
          {
            "word": "hè",
            "start": 164.57,
            "end": 165.19
          }
        ]
      },
      {
        "id": 21,
        "startTime": 165.31,
        "endTime": 170.91,
        "nextLineTime": 174.36,
        "text": "Xua mây mưa để nắng về em tôi",
        "words": [
          {
            "word": "Xua",
            "start": 165.31,
            "end": 166.07
          },
          {
            "word": "mây",
            "start": 166.07,
            "end": 166.83
          },
          {
            "word": "mưa",
            "start": 166.83,
            "end": 167.59
          },
          {
            "word": "để",
            "start": 167.59,
            "end": 168.1
          },
          {
            "word": "nắng",
            "start": 168.1,
            "end": 169.12
          },
          {
            "word": "về",
            "start": 169.12,
            "end": 169.63
          },
          {
            "word": "em",
            "start": 169.63,
            "end": 170.14
          },
          {
            "word": "tôi",
            "start": 170.14,
            "end": 170.9
          }
        ]
      },
      {
        "id": 22,
        "startTime": 174.36,
        "endTime": 179.8,
        "nextLineTime": 179.9,
        "text": "Ước là gió thổi mây trôi",
        "words": [
          {
            "word": "Ước",
            "start": 174.36,
            "end": 175.22
          },
          {
            "word": "là",
            "start": 175.22,
            "end": 175.79
          },
          {
            "word": "gió",
            "start": 175.79,
            "end": 176.65
          },
          {
            "word": "thổi",
            "start": 176.65,
            "end": 177.8
          },
          {
            "word": "mây",
            "start": 177.8,
            "end": 178.66
          },
          {
            "word": "trôi",
            "start": 178.66,
            "end": 179.81
          }
        ]
      },
      {
        "id": 23,
        "startTime": 179.9,
        "endTime": 185.5,
        "nextLineTime": 188.38,
        "text": "Để cho tôi ngắm mặt trời em tôi",
        "words": [
          {
            "word": "Để",
            "start": 179.9,
            "end": 180.37
          },
          {
            "word": "cho",
            "start": 180.37,
            "end": 181.07
          },
          {
            "word": "tôi",
            "start": 181.07,
            "end": 181.77
          },
          {
            "word": "ngắm",
            "start": 181.77,
            "end": 182.7
          },
          {
            "word": "mặt",
            "start": 182.7,
            "end": 183.4
          },
          {
            "word": "trời",
            "start": 183.4,
            "end": 184.33
          },
          {
            "word": "em",
            "start": 184.33,
            "end": 184.8
          },
          {
            "word": "tôi",
            "start": 184.8,
            "end": 185.5
          }
        ]
      },
      {
        "id": 24,
        "startTime": 188.38,
        "endTime": 192.55,
        "nextLineTime": 192.65,
        "text": "Hỏi mưa hỡi mưa đi về đường nào",
        "words": [
          {
            "word": "Hỏi",
            "start": 188.38,
            "end": 188.9
          },
          {
            "word": "mưa",
            "start": 188.9,
            "end": 189.42
          },
          {
            "word": "hỡi",
            "start": 189.42,
            "end": 189.94
          },
          {
            "word": "mưa",
            "start": 189.94,
            "end": 190.46
          },
          {
            "word": "đi",
            "start": 190.46,
            "end": 190.81
          },
          {
            "word": "về",
            "start": 190.81,
            "end": 191.16
          },
          {
            "word": "đường",
            "start": 191.16,
            "end": 192.03
          },
          {
            "word": "nào",
            "start": 192.03,
            "end": 192.55
          }
        ]
      },
      {
        "id": 25,
        "startTime": 192.65,
        "endTime": 196.26,
        "nextLineTime": 196.36,
        "text": "Hỏi gió nhắn câu thưa chào",
        "words": [
          {
            "word": "Hỏi",
            "start": 192.65,
            "end": 193.17
          },
          {
            "word": "gió",
            "start": 193.17,
            "end": 193.69
          },
          {
            "word": "nhắn",
            "start": 193.69,
            "end": 194.38
          },
          {
            "word": "câu",
            "start": 194.38,
            "end": 194.9
          },
          {
            "word": "thưa",
            "start": 194.9,
            "end": 195.59
          },
          {
            "word": "chào",
            "start": 195.59,
            "end": 196.28
          }
        ]
      },
      {
        "id": 26,
        "startTime": 196.36,
        "endTime": 199.97,
        "nextLineTime": 200.07,
        "text": "Sương mai gầy hao, thơ ngây là bao",
        "words": [
          {
            "word": "Sương",
            "start": 196.36,
            "end": 197.05
          },
          {
            "word": "mai",
            "start": 197.05,
            "end": 197.47
          },
          {
            "word": "gầy",
            "start": 197.47,
            "end": 197.89
          },
          {
            "word": "hao,",
            "start": 197.89,
            "end": 198.31
          },
          {
            "word": "thơ",
            "start": 198.31,
            "end": 198.73
          },
          {
            "word": "ngây",
            "start": 198.73,
            "end": 199.29
          },
          {
            "word": "là",
            "start": 199.29,
            "end": 199.57
          },
          {
            "word": "bao",
            "start": 199.57,
            "end": 199.99
          }
        ]
      },
      {
        "id": 27,
        "startTime": 200.07,
        "endTime": 202.1,
        "nextLineTime": 202.2,
        "text": "Bóng trăng tàn phai",
        "words": [
          {
            "word": "Bóng",
            "start": 200.07,
            "end": 200.58
          },
          {
            "word": "trăng",
            "start": 200.58,
            "end": 201.21
          },
          {
            "word": "tàn",
            "start": 201.21,
            "end": 201.59
          },
          {
            "word": "phai",
            "start": 201.59,
            "end": 202.1
          }
        ]
      },
      {
        "id": 28,
        "startTime": 202.2,
        "endTime": 204.22,
        "nextLineTime": 204.32,
        "text": "Khi sóng nước cuộn trào",
        "words": [
          {
            "word": "Khi",
            "start": 202.2,
            "end": 202.52
          },
          {
            "word": "sóng",
            "start": 202.52,
            "end": 202.95
          },
          {
            "word": "nước",
            "start": 202.95,
            "end": 203.38
          },
          {
            "word": "cuộn",
            "start": 203.38,
            "end": 203.81
          },
          {
            "word": "trào",
            "start": 203.81,
            "end": 204.24
          }
        ]
      },
      {
        "id": 29,
        "startTime": 204.32,
        "endTime": 207.4,
        "nextLineTime": 207.5,
        "text": "Hỏi em có hóa thành",
        "words": [
          {
            "word": "Hỏi",
            "start": 204.32,
            "end": 204.94
          },
          {
            "word": "em",
            "start": 204.94,
            "end": 205.35
          },
          {
            "word": "có",
            "start": 205.35,
            "end": 205.76
          },
          {
            "word": "hóa",
            "start": 205.76,
            "end": 206.38
          },
          {
            "word": "thành",
            "start": 206.38,
            "end": 207.41
          }
        ]
      },
      {
        "id": 30,
        "startTime": 207.5,
        "endTime": 209.54,
        "nextLineTime": 209.64,
        "text": "Cơn mưa đầu hè",
        "words": [
          {
            "word": "Cơn",
            "start": 207.5,
            "end": 208.06
          },
          {
            "word": "mưa",
            "start": 208.06,
            "end": 208.62
          },
          {
            "word": "đầu",
            "start": 208.62,
            "end": 209.18
          },
          {
            "word": "hè",
            "start": 209.18,
            "end": 209.55
          }
        ]
      },
      {
        "id": 31,
        "startTime": 209.64,
        "endTime": 212.7,
        "nextLineTime": 212.8,
        "text": "Hóa thành một dòng sông",
        "words": [
          {
            "word": "Hóa",
            "start": 209.64,
            "end": 210.12
          },
          {
            "word": "thành",
            "start": 210.12,
            "end": 210.93
          },
          {
            "word": "một",
            "start": 210.93,
            "end": 211.41
          },
          {
            "word": "dòng",
            "start": 211.41,
            "end": 212.05
          },
          {
            "word": "sông",
            "start": 212.05,
            "end": 212.69
          }
        ]
      },
      {
        "id": 32,
        "startTime": 212.8,
        "endTime": 214.86,
        "nextLineTime": 214.96,
        "text": "Đưa tôi trở về",
        "words": [
          {
            "word": "Đưa",
            "start": 212.8,
            "end": 213.36
          },
          {
            "word": "tôi",
            "start": 213.36,
            "end": 213.92
          },
          {
            "word": "trở",
            "start": 213.92,
            "end": 214.48
          },
          {
            "word": "về",
            "start": 214.48,
            "end": 214.85
          }
        ]
      },
      {
        "id": 33,
        "startTime": 214.96,
        "endTime": 220.56,
        "nextLineTime": 242.52,
        "text": "Ngày đó một thoáng em tôi",
        "words": [
          {
            "word": "Ngày",
            "start": 214.96,
            "end": 216.08
          },
          {
            "word": "đó",
            "start": 216.08,
            "end": 216.64
          },
          {
            "word": "một",
            "start": 216.64,
            "end": 217.48
          },
          {
            "word": "thoáng",
            "start": 217.48,
            "end": 219.16
          },
          {
            "word": "em",
            "start": 219.16,
            "end": 219.72
          },
          {
            "word": "tôi",
            "start": 219.72,
            "end": 220.56
          }
        ]
      },
      {
        "id": 34,
        "startTime": 242.52,
        "endTime": 246.66,
        "nextLineTime": 246.76,
        "text": "Ngỡ dáng em còn ở đây",
        "words": [
          {
            "word": "Ngỡ",
            "start": 242.52,
            "end": 243.25
          },
          {
            "word": "dáng",
            "start": 243.25,
            "end": 244.22
          },
          {
            "word": "em",
            "start": 244.22,
            "end": 244.71
          },
          {
            "word": "còn",
            "start": 244.71,
            "end": 245.44
          },
          {
            "word": "ở",
            "start": 245.44,
            "end": 245.93
          },
          {
            "word": "đây",
            "start": 245.93,
            "end": 246.66
          }
        ]
      },
      {
        "id": 35,
        "startTime": 246.76,
        "endTime": 250.39,
        "nextLineTime": 250.49,
        "text": "Yên giấc say khi ngày vừa lên",
        "words": [
          {
            "word": "Yên",
            "start": 246.76,
            "end": 247.23
          },
          {
            "word": "giấc",
            "start": 247.23,
            "end": 247.86
          },
          {
            "word": "say",
            "start": 247.86,
            "end": 248.33
          },
          {
            "word": "khi",
            "start": 248.33,
            "end": 248.8
          },
          {
            "word": "ngày",
            "start": 248.8,
            "end": 249.43
          },
          {
            "word": "vừa",
            "start": 249.43,
            "end": 249.9
          },
          {
            "word": "lên",
            "start": 249.9,
            "end": 250.37
          }
        ]
      },
      {
        "id": 36,
        "startTime": 250.49,
        "endTime": 252.5,
        "nextLineTime": 252.6,
        "text": "Xuân sắc nguyên vẹn",
        "words": [
          {
            "word": "Xuân",
            "start": 250.49,
            "end": 250.99
          },
          {
            "word": "sắc",
            "start": 250.99,
            "end": 251.37
          },
          {
            "word": "nguyên",
            "start": 251.37,
            "end": 252.12
          },
          {
            "word": "vẹn",
            "start": 252.12,
            "end": 252.5
          }
        ]
      },
      {
        "id": 37,
        "startTime": 252.6,
        "endTime": 258.2,
        "nextLineTime": 258.99,
        "text": "Năm tháng xanh vừa đến",
        "words": [
          {
            "word": "Năm",
            "start": 252.6,
            "end": 253.53
          },
          {
            "word": "tháng",
            "start": 253.53,
            "end": 255.09
          },
          {
            "word": "xanh",
            "start": 255.09,
            "end": 256.33
          },
          {
            "word": "vừa",
            "start": 256.33,
            "end": 257.26
          },
          {
            "word": "đến",
            "start": 257.26,
            "end": 258.19
          }
        ]
      },
      {
        "id": 38,
        "startTime": 258.99,
        "endTime": 263.13,
        "nextLineTime": 263.23,
        "text": "Gió lặng rồi mưa qua",
        "words": [
          {
            "word": "Gió",
            "start": 258.99,
            "end": 259.77
          },
          {
            "word": "lặng",
            "start": 259.77,
            "end": 260.81
          },
          {
            "word": "rồi",
            "start": 260.81,
            "end": 261.59
          },
          {
            "word": "mưa",
            "start": 261.59,
            "end": 262.37
          },
          {
            "word": "qua",
            "start": 262.37,
            "end": 263.15
          }
        ]
      },
      {
        "id": 39,
        "startTime": 263.23,
        "endTime": 266.71,
        "nextLineTime": 266.81,
        "text": "Cánh hoa tàn úa phai màu",
        "words": [
          {
            "word": "Cánh",
            "start": 263.23,
            "end": 263.96
          },
          {
            "word": "hoa",
            "start": 263.96,
            "end": 264.51
          },
          {
            "word": "tàn",
            "start": 264.51,
            "end": 265.06
          },
          {
            "word": "úa",
            "start": 265.06,
            "end": 265.43
          },
          {
            "word": "phai",
            "start": 265.43,
            "end": 266.16
          },
          {
            "word": "màu",
            "start": 266.16,
            "end": 266.71
          }
        ]
      },
      {
        "id": 40,
        "startTime": 266.81,
        "endTime": 268.86,
        "nextLineTime": 268.96,
        "text": "Ngày về nắng xanh trên đầu",
        "words": [
          {
            "word": "Ngày",
            "start": 266.81,
            "end": 267.2
          },
          {
            "word": "về",
            "start": 267.2,
            "end": 267.4
          },
          {
            "word": "nắng",
            "start": 267.4,
            "end": 267.79
          },
          {
            "word": "xanh",
            "start": 267.79,
            "end": 268.18
          },
          {
            "word": "trên",
            "start": 268.18,
            "end": 268.57
          },
          {
            "word": "đầu",
            "start": 268.57,
            "end": 268.86
          }
        ]
      },
      {
        "id": 41,
        "startTime": 268.96,
        "endTime": 274.56,
        "nextLineTime": 276.89,
        "text": "Mà chẳng thấy em tôi giờ ở đâu",
        "words": [
          {
            "word": "Mà",
            "start": 268.96,
            "end": 269.43
          },
          {
            "word": "chẳng",
            "start": 269.43,
            "end": 270.6
          },
          {
            "word": "thấy",
            "start": 270.6,
            "end": 271.53
          },
          {
            "word": "em",
            "start": 271.53,
            "end": 272.0
          },
          {
            "word": "tôi",
            "start": 272.0,
            "end": 272.7
          },
          {
            "word": "giờ",
            "start": 272.7,
            "end": 273.4
          },
          {
            "word": "ở",
            "start": 273.4,
            "end": 273.87
          },
          {
            "word": "đâu",
            "start": 273.87,
            "end": 274.57
          }
        ]
      },
      {
        "id": 42,
        "startTime": 276.89,
        "endTime": 281.06,
        "nextLineTime": 281.16,
        "text": "Hỏi mưa hỡi mưa đi về đường nào",
        "words": [
          {
            "word": "Hỏi",
            "start": 276.89,
            "end": 277.41
          },
          {
            "word": "mưa",
            "start": 277.41,
            "end": 277.93
          },
          {
            "word": "hỡi",
            "start": 277.93,
            "end": 278.45
          },
          {
            "word": "mưa",
            "start": 278.45,
            "end": 278.97
          },
          {
            "word": "đi",
            "start": 278.97,
            "end": 279.32
          },
          {
            "word": "về",
            "start": 279.32,
            "end": 279.67
          },
          {
            "word": "đường",
            "start": 279.67,
            "end": 280.54
          },
          {
            "word": "nào",
            "start": 280.54,
            "end": 281.06
          }
        ]
      },
      {
        "id": 43,
        "startTime": 281.16,
        "endTime": 284.31,
        "nextLineTime": 284.41,
        "text": "Hỏi gió nhắn câu thưa chào",
        "words": [
          {
            "word": "Hỏi",
            "start": 281.16,
            "end": 281.61
          },
          {
            "word": "gió",
            "start": 281.61,
            "end": 282.06
          },
          {
            "word": "nhắn",
            "start": 282.06,
            "end": 282.66
          },
          {
            "word": "câu",
            "start": 282.66,
            "end": 283.11
          },
          {
            "word": "thưa",
            "start": 283.11,
            "end": 283.71
          },
          {
            "word": "chào",
            "start": 283.71,
            "end": 284.31
          }
        ]
      },
      {
        "id": 44,
        "startTime": 284.41,
        "endTime": 288.57,
        "nextLineTime": 288.67,
        "text": "Sương mai gầy hao, thơ ngây là bao",
        "words": [
          {
            "word": "Sương",
            "start": 284.41,
            "end": 285.21
          },
          {
            "word": "mai",
            "start": 285.21,
            "end": 285.69
          },
          {
            "word": "gầy",
            "start": 285.69,
            "end": 286.17
          },
          {
            "word": "hao,",
            "start": 286.17,
            "end": 286.65
          },
          {
            "word": "thơ",
            "start": 286.65,
            "end": 287.13
          },
          {
            "word": "ngây",
            "start": 287.13,
            "end": 287.77
          },
          {
            "word": "là",
            "start": 287.77,
            "end": 288.09
          },
          {
            "word": "bao",
            "start": 288.09,
            "end": 288.57
          }
        ]
      },
      {
        "id": 45,
        "startTime": 288.67,
        "endTime": 290.17,
        "nextLineTime": 290.27,
        "text": "Bóng trăng tàn phai",
        "words": [
          {
            "word": "Bóng",
            "start": 288.67,
            "end": 289.05
          },
          {
            "word": "trăng",
            "start": 289.05,
            "end": 289.52
          },
          {
            "word": "tàn",
            "start": 289.52,
            "end": 289.8
          },
          {
            "word": "phai",
            "start": 289.8,
            "end": 290.18
          }
        ]
      },
      {
        "id": 46,
        "startTime": 290.27,
        "endTime": 292.27,
        "nextLineTime": 292.37,
        "text": "Khi sóng nước cuộn trào",
        "words": [
          {
            "word": "Khi",
            "start": 290.27,
            "end": 290.59
          },
          {
            "word": "sóng",
            "start": 290.59,
            "end": 291.01
          },
          {
            "word": "nước",
            "start": 291.01,
            "end": 291.43
          },
          {
            "word": "cuộn",
            "start": 291.43,
            "end": 291.85
          },
          {
            "word": "trào",
            "start": 291.85,
            "end": 292.27
          }
        ]
      },
      {
        "id": 47,
        "startTime": 292.37,
        "endTime": 295.49,
        "nextLineTime": 295.59,
        "text": "Hỏi em có hóa thành",
        "words": [
          {
            "word": "Hỏi",
            "start": 292.37,
            "end": 292.99
          },
          {
            "word": "em",
            "start": 292.99,
            "end": 293.41
          },
          {
            "word": "có",
            "start": 293.41,
            "end": 293.83
          },
          {
            "word": "hóa",
            "start": 293.83,
            "end": 294.45
          },
          {
            "word": "thành",
            "start": 294.45,
            "end": 295.49
          }
        ]
      },
      {
        "id": 48,
        "startTime": 295.59,
        "endTime": 297.58,
        "nextLineTime": 297.68,
        "text": "Cơn mưa đầu hè",
        "words": [
          {
            "word": "Cơn",
            "start": 295.59,
            "end": 296.13
          },
          {
            "word": "mưa",
            "start": 296.13,
            "end": 296.67
          },
          {
            "word": "đầu",
            "start": 296.67,
            "end": 297.21
          },
          {
            "word": "hè",
            "start": 297.21,
            "end": 297.57
          }
        ]
      },
      {
        "id": 49,
        "startTime": 297.68,
        "endTime": 300.79,
        "nextLineTime": 300.89,
        "text": "Hóa thành một dòng sông",
        "words": [
          {
            "word": "Hóa",
            "start": 297.68,
            "end": 298.17
          },
          {
            "word": "thành",
            "start": 298.17,
            "end": 298.99
          },
          {
            "word": "một",
            "start": 298.99,
            "end": 299.48
          },
          {
            "word": "dòng",
            "start": 299.48,
            "end": 300.13
          },
          {
            "word": "sông",
            "start": 300.13,
            "end": 300.78
          }
        ]
      },
      {
        "id": 50,
        "startTime": 300.89,
        "endTime": 303.44,
        "nextLineTime": 303.54,
        "text": "Đưa tôi trở về",
        "words": [
          {
            "word": "Đưa",
            "start": 300.89,
            "end": 301.59
          },
          {
            "word": "tôi",
            "start": 301.59,
            "end": 302.29
          },
          {
            "word": "trở",
            "start": 302.29,
            "end": 302.99
          },
          {
            "word": "về",
            "start": 302.99,
            "end": 303.45
          }
        ]
      },
      {
        "id": 51,
        "startTime": 303.54,
        "endTime": 309.14,
        "nextLineTime": 309.91,
        "text": "Ngày đó một thoáng em tôi",
        "words": [
          {
            "word": "Ngày",
            "start": 303.54,
            "end": 304.66
          },
          {
            "word": "đó",
            "start": 304.66,
            "end": 305.22
          },
          {
            "word": "một",
            "start": 305.22,
            "end": 306.06
          },
          {
            "word": "thoáng",
            "start": 306.06,
            "end": 307.74
          },
          {
            "word": "em",
            "start": 307.74,
            "end": 308.3
          },
          {
            "word": "tôi",
            "start": 308.3,
            "end": 309.14
          }
        ]
      },
      {
        "id": 52,
        "startTime": 309.91,
        "endTime": 315.51,
        "nextLineTime": 317.35,
        "text": "Mây buồn giấu nắng ở đâu",
        "words": [
          {
            "word": "Mây",
            "start": 309.91,
            "end": 310.75
          },
          {
            "word": "buồn",
            "start": 310.75,
            "end": 311.87
          },
          {
            "word": "giấu",
            "start": 311.87,
            "end": 312.99
          },
          {
            "word": "nắng",
            "start": 312.99,
            "end": 314.11
          },
          {
            "word": "ở",
            "start": 314.11,
            "end": 314.67
          },
          {
            "word": "đâu",
            "start": 314.67,
            "end": 315.51
          }
        ]
      },
      {
        "id": 53,
        "startTime": 317.35,
        "endTime": 322.95,
        "nextLineTime": 337.48,
        "text": "Để mưa nặng hạt em lâu chưa về",
        "words": [
          {
            "word": "Để",
            "start": 317.35,
            "end": 317.84
          },
          {
            "word": "mưa",
            "start": 317.84,
            "end": 318.57
          },
          {
            "word": "nặng",
            "start": 318.57,
            "end": 319.54
          },
          {
            "word": "hạt",
            "start": 319.54,
            "end": 320.27
          },
          {
            "word": "em",
            "start": 320.27,
            "end": 320.76
          },
          {
            "word": "lâu",
            "start": 320.76,
            "end": 321.49
          },
          {
            "word": "chưa",
            "start": 321.49,
            "end": 322.46
          },
          {
            "word": "về",
            "start": 322.46,
            "end": 322.95
          }
        ]
      }
    ]
  },
  {
    "id": "karaoke-nhong-nhong-nhong",
    "filename": "NHONG NHONG NHONG.mp3",
    "title": "Nhong Nhong Nhong",
    "artist": "Anh Trai Vượt Ngàn Chông Gai (Thai VG, Huỳnh Lập, Thái Lê Minh Hiếu)",
    "duration": 290.87,
    "audioUrl": "/karaoke/karaoke-nhong-nhong-nhong.mp3",
    "thumbUrl": "/karaoke/karaoke-nhong-nhong-nhong.jpg",
    "lines": [
      {
        "id": 0,
        "startTime": 8.51,
        "endTime": 9.45,
        "nextLineTime": 9.55,
        "text": "Lộc cà lộc cà lộc",
        "words": [
          {
            "word": "Lộc",
            "start": 8.51,
            "end": 8.73
          },
          {
            "word": "cà",
            "start": 8.73,
            "end": 8.87
          },
          {
            "word": "lộc",
            "start": 8.87,
            "end": 9.09
          },
          {
            "word": "cà",
            "start": 9.09,
            "end": 9.23
          },
          {
            "word": "lộc",
            "start": 9.23,
            "end": 9.45
          }
        ]
      },
      {
        "id": 1,
        "startTime": 9.55,
        "endTime": 11.59,
        "nextLineTime": 11.69,
        "text": "Lộc cà nhong nhong nhong",
        "words": [
          {
            "word": "Lộc",
            "start": 9.55,
            "end": 9.86
          },
          {
            "word": "cà",
            "start": 9.86,
            "end": 10.06
          },
          {
            "word": "nhong",
            "start": 10.06,
            "end": 10.57
          },
          {
            "word": "nhong",
            "start": 10.57,
            "end": 11.08
          },
          {
            "word": "nhong",
            "start": 11.08,
            "end": 11.59
          }
        ]
      },
      {
        "id": 2,
        "startTime": 11.69,
        "endTime": 12.92,
        "nextLineTime": 13.02,
        "text": "Lộc cà lộc cà lộc",
        "words": [
          {
            "word": "Lộc",
            "start": 11.69,
            "end": 11.97
          },
          {
            "word": "cà",
            "start": 11.97,
            "end": 12.16
          },
          {
            "word": "lộc",
            "start": 12.16,
            "end": 12.44
          },
          {
            "word": "cà",
            "start": 12.44,
            "end": 12.63
          },
          {
            "word": "lộc",
            "start": 12.63,
            "end": 12.91
          }
        ]
      },
      {
        "id": 3,
        "startTime": 13.02,
        "endTime": 16.09,
        "nextLineTime": 16.19,
        "text": "Lộc cà nhong nhong nhong",
        "words": [
          {
            "word": "Lộc",
            "start": 13.02,
            "end": 13.48
          },
          {
            "word": "cà",
            "start": 13.48,
            "end": 13.79
          },
          {
            "word": "nhong",
            "start": 13.79,
            "end": 14.56
          },
          {
            "word": "nhong",
            "start": 14.56,
            "end": 15.33
          },
          {
            "word": "nhong",
            "start": 15.33,
            "end": 16.1
          }
        ]
      },
      {
        "id": 4,
        "startTime": 16.19,
        "endTime": 19.59,
        "nextLineTime": 19.69,
        "text": "Nhong nhong nhong, cha làm con ngựa",
        "words": [
          {
            "word": "Nhong",
            "start": 16.19,
            "end": 16.8
          },
          {
            "word": "nhong",
            "start": 16.8,
            "end": 17.41
          },
          {
            "word": "nhong,",
            "start": 17.41,
            "end": 18.02
          },
          {
            "word": "cha",
            "start": 18.02,
            "end": 18.38
          },
          {
            "word": "làm",
            "start": 18.38,
            "end": 18.74
          },
          {
            "word": "con",
            "start": 18.74,
            "end": 19.1
          },
          {
            "word": "ngựa",
            "start": 19.1,
            "end": 19.59
          }
        ]
      },
      {
        "id": 5,
        "startTime": 19.69,
        "endTime": 22.81,
        "nextLineTime": 22.91,
        "text": "Để cho con vui cưỡi trên lưng",
        "words": [
          {
            "word": "Để",
            "start": 19.69,
            "end": 19.96
          },
          {
            "word": "cho",
            "start": 19.96,
            "end": 20.37
          },
          {
            "word": "con",
            "start": 20.37,
            "end": 20.78
          },
          {
            "word": "vui",
            "start": 20.78,
            "end": 21.19
          },
          {
            "word": "cưỡi",
            "start": 21.19,
            "end": 21.73
          },
          {
            "word": "trên",
            "start": 21.73,
            "end": 22.27
          },
          {
            "word": "lưng",
            "start": 22.27,
            "end": 22.81
          }
        ]
      },
      {
        "id": 6,
        "startTime": 22.91,
        "endTime": 25.97,
        "nextLineTime": 26.07,
        "text": "Nhong nhong nhong, cha làm con ngựa",
        "words": [
          {
            "word": "Nhong",
            "start": 22.91,
            "end": 23.46
          },
          {
            "word": "nhong",
            "start": 23.46,
            "end": 24.01
          },
          {
            "word": "nhong,",
            "start": 24.01,
            "end": 24.56
          },
          {
            "word": "cha",
            "start": 24.56,
            "end": 24.89
          },
          {
            "word": "làm",
            "start": 24.89,
            "end": 25.22
          },
          {
            "word": "con",
            "start": 25.22,
            "end": 25.55
          },
          {
            "word": "ngựa",
            "start": 25.55,
            "end": 25.99
          }
        ]
      },
      {
        "id": 7,
        "startTime": 26.07,
        "endTime": 30.21,
        "nextLineTime": 30.31,
        "text": "Để cho con vui thỏa tiếng cười",
        "words": [
          {
            "word": "Để",
            "start": 26.07,
            "end": 26.41
          },
          {
            "word": "cho",
            "start": 26.41,
            "end": 26.93
          },
          {
            "word": "con",
            "start": 26.93,
            "end": 27.45
          },
          {
            "word": "vui",
            "start": 27.45,
            "end": 27.97
          },
          {
            "word": "thỏa",
            "start": 27.97,
            "end": 28.66
          },
          {
            "word": "tiếng",
            "start": 28.66,
            "end": 29.52
          },
          {
            "word": "cười",
            "start": 29.52,
            "end": 30.21
          }
        ]
      },
      {
        "id": 8,
        "startTime": 30.31,
        "endTime": 31.11,
        "nextLineTime": 30.88,
        "text": "Nhong nhong nhong",
        "words": [
          {
            "word": "Nhong",
            "start": 30.31,
            "end": 30.58
          },
          {
            "word": "nhong",
            "start": 30.58,
            "end": 30.85
          },
          {
            "word": "nhong",
            "start": 30.85,
            "end": 31.12
          }
        ]
      },
      {
        "id": 9,
        "startTime": 30.88,
        "endTime": 32.48,
        "nextLineTime": 32.58,
        "text": "Ba đã không còn là thằng bé long nhong",
        "words": [
          {
            "word": "Ba",
            "start": 30.88,
            "end": 30.99
          },
          {
            "word": "đã",
            "start": 30.99,
            "end": 31.1
          },
          {
            "word": "không",
            "start": 31.1,
            "end": 31.37
          },
          {
            "word": "còn",
            "start": 31.37,
            "end": 31.53
          },
          {
            "word": "là",
            "start": 31.53,
            "end": 31.64
          },
          {
            "word": "thằng",
            "start": 31.64,
            "end": 31.91
          },
          {
            "word": "bé",
            "start": 31.91,
            "end": 32.02
          },
          {
            "word": "long",
            "start": 32.02,
            "end": 32.23
          },
          {
            "word": "nhong",
            "start": 32.23,
            "end": 32.5
          }
        ]
      },
      {
        "id": 10,
        "startTime": 32.58,
        "endTime": 34.34,
        "nextLineTime": 34.44,
        "text": "Ngày đầu tiên ba thấy mặt con",
        "words": [
          {
            "word": "Ngày",
            "start": 32.58,
            "end": 32.89
          },
          {
            "word": "đầu",
            "start": 32.89,
            "end": 33.12
          },
          {
            "word": "tiên",
            "start": 33.12,
            "end": 33.43
          },
          {
            "word": "ba",
            "start": 33.43,
            "end": 33.58
          },
          {
            "word": "thấy",
            "start": 33.58,
            "end": 33.89
          },
          {
            "word": "mặt",
            "start": 33.89,
            "end": 34.12
          },
          {
            "word": "con",
            "start": 34.12,
            "end": 34.35
          }
        ]
      },
      {
        "id": 11,
        "startTime": 34.44,
        "endTime": 36.2,
        "nextLineTime": 36.3,
        "text": "You know I'll never leave you 'lone",
        "words": [
          {
            "word": "You",
            "start": 34.44,
            "end": 34.62
          },
          {
            "word": "know",
            "start": 34.62,
            "end": 34.86
          },
          {
            "word": "I'll",
            "start": 34.86,
            "end": 35.1
          },
          {
            "word": "never",
            "start": 35.1,
            "end": 35.4
          },
          {
            "word": "leave",
            "start": 35.4,
            "end": 35.7
          },
          {
            "word": "you",
            "start": 35.7,
            "end": 35.88
          },
          {
            "word": "'lone",
            "start": 35.88,
            "end": 36.18
          }
        ]
      },
      {
        "id": 12,
        "startTime": 36.3,
        "endTime": 37.1,
        "nextLineTime": 37.11,
        "text": "Nhong nhong nhong",
        "words": [
          {
            "word": "Nhong",
            "start": 36.3,
            "end": 36.57
          },
          {
            "word": "nhong",
            "start": 36.57,
            "end": 36.84
          },
          {
            "word": "nhong",
            "start": 36.84,
            "end": 37.11
          }
        ]
      },
      {
        "id": 13,
        "startTime": 37.11,
        "endTime": 39.07,
        "nextLineTime": 39.17,
        "text": "Mới làm ba nên ba chẳng biết đâu",
        "words": [
          {
            "word": "Mới",
            "start": 37.11,
            "end": 37.35
          },
          {
            "word": "làm",
            "start": 37.35,
            "end": 37.59
          },
          {
            "word": "ba",
            "start": 37.59,
            "end": 37.75
          },
          {
            "word": "nên",
            "start": 37.75,
            "end": 37.99
          },
          {
            "word": "ba",
            "start": 37.99,
            "end": 38.15
          },
          {
            "word": "chẳng",
            "start": 38.15,
            "end": 38.54
          },
          {
            "word": "biết",
            "start": 38.54,
            "end": 38.85
          },
          {
            "word": "đâu",
            "start": 38.85,
            "end": 39.09
          }
        ]
      },
      {
        "id": 14,
        "startTime": 39.17,
        "endTime": 40.67,
        "nextLineTime": 40.77,
        "text": "Biết cái gì cần thiết đâu",
        "words": [
          {
            "word": "Biết",
            "start": 39.17,
            "end": 39.47
          },
          {
            "word": "cái",
            "start": 39.47,
            "end": 39.7
          },
          {
            "word": "gì",
            "start": 39.7,
            "end": 39.85
          },
          {
            "word": "cần",
            "start": 39.85,
            "end": 40.08
          },
          {
            "word": "thiết",
            "start": 40.08,
            "end": 40.45
          },
          {
            "word": "đâu",
            "start": 40.45,
            "end": 40.68
          }
        ]
      },
      {
        "id": 15,
        "startTime": 40.77,
        "endTime": 42.54,
        "nextLineTime": 42.64,
        "text": "Learning as I go through",
        "words": [
          {
            "word": "Learning",
            "start": 40.77,
            "end": 41.44
          },
          {
            "word": "as",
            "start": 41.44,
            "end": 41.61
          },
          {
            "word": "I",
            "start": 41.61,
            "end": 41.78
          },
          {
            "word": "go",
            "start": 41.78,
            "end": 41.95
          },
          {
            "word": "through",
            "start": 41.95,
            "end": 42.54
          }
        ]
      },
      {
        "id": 16,
        "startTime": 42.64,
        "endTime": 43.92,
        "nextLineTime": 44.02,
        "text": "Đau đầu, đau đầu, đau đầu",
        "words": [
          {
            "word": "Đau",
            "start": 42.64,
            "end": 42.85
          },
          {
            "word": "đầu,",
            "start": 42.85,
            "end": 43.06
          },
          {
            "word": "đau",
            "start": 43.06,
            "end": 43.27
          },
          {
            "word": "đầu,",
            "start": 43.27,
            "end": 43.48
          },
          {
            "word": "đau",
            "start": 43.48,
            "end": 43.69
          },
          {
            "word": "đầu",
            "start": 43.69,
            "end": 43.9
          }
        ]
      },
      {
        "id": 17,
        "startTime": 44.02,
        "endTime": 45.98,
        "nextLineTime": 46.08,
        "text": "Ba chẳng biết tương lai sau này",
        "words": [
          {
            "word": "Ba",
            "start": 44.02,
            "end": 44.18
          },
          {
            "word": "chẳng",
            "start": 44.18,
            "end": 44.57
          },
          {
            "word": "biết",
            "start": 44.57,
            "end": 44.88
          },
          {
            "word": "tương",
            "start": 44.88,
            "end": 45.27
          },
          {
            "word": "lai",
            "start": 45.27,
            "end": 45.51
          },
          {
            "word": "sau",
            "start": 45.51,
            "end": 45.75
          },
          {
            "word": "này",
            "start": 45.75,
            "end": 45.99
          }
        ]
      },
      {
        "id": 18,
        "startTime": 46.08,
        "endTime": 47.59,
        "nextLineTime": 47.69,
        "text": "Kiếm cho ví ba thật mau đầy",
        "words": [
          {
            "word": "Kiếm",
            "start": 46.08,
            "end": 46.37
          },
          {
            "word": "cho",
            "start": 46.37,
            "end": 46.59
          },
          {
            "word": "ví",
            "start": 46.59,
            "end": 46.73
          },
          {
            "word": "ba",
            "start": 46.73,
            "end": 46.87
          },
          {
            "word": "thật",
            "start": 46.87,
            "end": 47.16
          },
          {
            "word": "mau",
            "start": 47.16,
            "end": 47.38
          },
          {
            "word": "đầy",
            "start": 47.38,
            "end": 47.6
          }
        ]
      },
      {
        "id": 19,
        "startTime": 47.69,
        "endTime": 49.17,
        "nextLineTime": 49.27,
        "text": "Sắp xếp cho thật ngay ngắn",
        "words": [
          {
            "word": "Sắp",
            "start": 47.69,
            "end": 47.9
          },
          {
            "word": "xếp",
            "start": 47.9,
            "end": 48.11
          },
          {
            "word": "cho",
            "start": 48.11,
            "end": 48.32
          },
          {
            "word": "thật",
            "start": 48.32,
            "end": 48.6
          },
          {
            "word": "ngay",
            "start": 48.6,
            "end": 48.88
          },
          {
            "word": "ngắn",
            "start": 48.88,
            "end": 49.16
          }
        ]
      },
      {
        "id": 20,
        "startTime": 49.27,
        "endTime": 51.51,
        "nextLineTime": 51.61,
        "text": "Có ba, con đừng lo lắng",
        "words": [
          {
            "word": "Có",
            "start": 49.27,
            "end": 49.53
          },
          {
            "word": "ba,",
            "start": 49.53,
            "end": 49.79
          },
          {
            "word": "con",
            "start": 49.79,
            "end": 50.19
          },
          {
            "word": "đừng",
            "start": 50.19,
            "end": 50.72
          },
          {
            "word": "lo",
            "start": 50.72,
            "end": 50.98
          },
          {
            "word": "lắng",
            "start": 50.98,
            "end": 51.51
          }
        ]
      },
      {
        "id": 21,
        "startTime": 51.61,
        "endTime": 52.53,
        "nextLineTime": 52.63,
        "text": "Tiền nước, tiền điện, tiền tăng",
        "words": [
          {
            "word": "Tiền",
            "start": 51.61,
            "end": 51.76
          },
          {
            "word": "nước,",
            "start": 51.76,
            "end": 51.91
          },
          {
            "word": "tiền",
            "start": 51.91,
            "end": 52.06
          },
          {
            "word": "điện,",
            "start": 52.06,
            "end": 52.21
          },
          {
            "word": "tiền",
            "start": 52.21,
            "end": 52.36
          },
          {
            "word": "tăng",
            "start": 52.36,
            "end": 52.51
          }
        ]
      },
      {
        "id": 22,
        "startTime": 52.63,
        "endTime": 54.83,
        "nextLineTime": 54.93,
        "text": "Tiền xăng, tiền ăn, tiền nhà",
        "words": [
          {
            "word": "Tiền",
            "start": 52.63,
            "end": 53.05
          },
          {
            "word": "xăng,",
            "start": 53.05,
            "end": 53.47
          },
          {
            "word": "tiền",
            "start": 53.47,
            "end": 53.89
          },
          {
            "word": "ăn,",
            "start": 53.89,
            "end": 54.1
          },
          {
            "word": "tiền",
            "start": 54.1,
            "end": 54.52
          },
          {
            "word": "nhà",
            "start": 54.52,
            "end": 54.83
          }
        ]
      },
      {
        "id": 23,
        "startTime": 54.93,
        "endTime": 56.42,
        "nextLineTime": 56.52,
        "text": "Ba rap, ba bán, ba kiếm dollar",
        "words": [
          {
            "word": "Ba",
            "start": 54.93,
            "end": 55.07
          },
          {
            "word": "rap,",
            "start": 55.07,
            "end": 55.27
          },
          {
            "word": "ba",
            "start": 55.27,
            "end": 55.41
          },
          {
            "word": "bán,",
            "start": 55.41,
            "end": 55.61
          },
          {
            "word": "ba",
            "start": 55.61,
            "end": 55.75
          },
          {
            "word": "kiếm",
            "start": 55.75,
            "end": 56.02
          },
          {
            "word": "dollar",
            "start": 56.02,
            "end": 56.43
          }
        ]
      },
      {
        "id": 24,
        "startTime": 56.52,
        "endTime": 57.48,
        "nextLineTime": 57.58,
        "text": "Ba chi tiền nhà",
        "words": [
          {
            "word": "Ba",
            "start": 56.52,
            "end": 56.68
          },
          {
            "word": "chi",
            "start": 56.68,
            "end": 56.92
          },
          {
            "word": "tiền",
            "start": 56.92,
            "end": 57.24
          },
          {
            "word": "nhà",
            "start": 57.24,
            "end": 57.48
          }
        ]
      },
      {
        "id": 25,
        "startTime": 57.58,
        "endTime": 59.08,
        "nextLineTime": 59.18,
        "text": "Biết là không dễ không gì không thể",
        "words": [
          {
            "word": "Biết",
            "start": 57.58,
            "end": 57.79
          },
          {
            "word": "là",
            "start": 57.79,
            "end": 57.9
          },
          {
            "word": "không",
            "start": 57.9,
            "end": 58.17
          },
          {
            "word": "dễ",
            "start": 58.17,
            "end": 58.28
          },
          {
            "word": "không",
            "start": 58.28,
            "end": 58.55
          },
          {
            "word": "gì",
            "start": 58.55,
            "end": 58.66
          },
          {
            "word": "không",
            "start": 58.66,
            "end": 58.93
          },
          {
            "word": "thể",
            "start": 58.93,
            "end": 59.09
          }
        ]
      },
      {
        "id": 26,
        "startTime": 59.18,
        "endTime": 60.73,
        "nextLineTime": 60.83,
        "text": "Hy vọng to lớn đặt vào con",
        "words": [
          {
            "word": "Hy",
            "start": 59.18,
            "end": 59.34
          },
          {
            "word": "vọng",
            "start": 59.34,
            "end": 59.65
          },
          {
            "word": "to",
            "start": 59.65,
            "end": 59.8
          },
          {
            "word": "lớn",
            "start": 59.8,
            "end": 60.03
          },
          {
            "word": "đặt",
            "start": 60.03,
            "end": 60.26
          },
          {
            "word": "vào",
            "start": 60.26,
            "end": 60.49
          },
          {
            "word": "con",
            "start": 60.49,
            "end": 60.72
          }
        ]
      },
      {
        "id": 27,
        "startTime": 60.83,
        "endTime": 62.31,
        "nextLineTime": 62.41,
        "text": "Không ngại vất vả ba làm tất cả",
        "words": [
          {
            "word": "Không",
            "start": 60.83,
            "end": 61.14
          },
          {
            "word": "ngại",
            "start": 61.14,
            "end": 61.39
          },
          {
            "word": "vất",
            "start": 61.39,
            "end": 61.58
          },
          {
            "word": "vả",
            "start": 61.58,
            "end": 61.7
          },
          {
            "word": "ba",
            "start": 61.7,
            "end": 61.82
          },
          {
            "word": "làm",
            "start": 61.82,
            "end": 62.01
          },
          {
            "word": "tất",
            "start": 62.01,
            "end": 62.2
          },
          {
            "word": "cả",
            "start": 62.2,
            "end": 62.32
          }
        ]
      },
      {
        "id": 28,
        "startTime": 62.41,
        "endTime": 64.19,
        "nextLineTime": 64.29,
        "text": "Chỉ để nuôi lớn mặt trời con",
        "words": [
          {
            "word": "Chỉ",
            "start": 62.41,
            "end": 62.65
          },
          {
            "word": "để",
            "start": 62.65,
            "end": 62.81
          },
          {
            "word": "nuôi",
            "start": 62.81,
            "end": 63.13
          },
          {
            "word": "lớn",
            "start": 63.13,
            "end": 63.37
          },
          {
            "word": "mặt",
            "start": 63.37,
            "end": 63.61
          },
          {
            "word": "trời",
            "start": 63.61,
            "end": 63.93
          },
          {
            "word": "con",
            "start": 63.93,
            "end": 64.17
          }
        ]
      },
      {
        "id": 29,
        "startTime": 64.29,
        "endTime": 66.0,
        "nextLineTime": 66.1,
        "text": "Ba chẳng có sao đâu",
        "words": [
          {
            "word": "Ba",
            "start": 64.29,
            "end": 64.52
          },
          {
            "word": "chẳng",
            "start": 64.52,
            "end": 65.09
          },
          {
            "word": "có",
            "start": 65.09,
            "end": 65.32
          },
          {
            "word": "sao",
            "start": 65.32,
            "end": 65.66
          },
          {
            "word": "đâu",
            "start": 65.66,
            "end": 66.0
          }
        ]
      },
      {
        "id": 30,
        "startTime": 66.1,
        "endTime": 67.6,
        "nextLineTime": 67.7,
        "text": "Chẳng có sao đâu",
        "words": [
          {
            "word": "Chẳng",
            "start": 66.1,
            "end": 66.68
          },
          {
            "word": "có",
            "start": 66.68,
            "end": 66.91
          },
          {
            "word": "sao",
            "start": 66.91,
            "end": 67.26
          },
          {
            "word": "đâu",
            "start": 67.26,
            "end": 67.61
          }
        ]
      },
      {
        "id": 31,
        "startTime": 67.7,
        "endTime": 69.45,
        "nextLineTime": 69.55,
        "text": "Không có xa đâu",
        "words": [
          {
            "word": "Không",
            "start": 67.7,
            "end": 68.43
          },
          {
            "word": "có",
            "start": 68.43,
            "end": 68.72
          },
          {
            "word": "xa",
            "start": 68.72,
            "end": 69.01
          },
          {
            "word": "đâu",
            "start": 69.01,
            "end": 69.45
          }
        ]
      },
      {
        "id": 32,
        "startTime": 69.55,
        "endTime": 75.15,
        "nextLineTime": 86.96,
        "text": "Kho báu bé con đây",
        "words": [
          {
            "word": "Kho",
            "start": 69.55,
            "end": 70.75
          },
          {
            "word": "báu",
            "start": 70.75,
            "end": 71.95
          },
          {
            "word": "bé",
            "start": 71.95,
            "end": 72.75
          },
          {
            "word": "con",
            "start": 72.75,
            "end": 73.95
          },
          {
            "word": "đây",
            "start": 73.95,
            "end": 75.15
          }
        ]
      },
      {
        "id": 33,
        "startTime": 86.96,
        "endTime": 91.11,
        "nextLineTime": 91.21,
        "text": "Nhong nhong nhong ngựa phi thật khùng",
        "words": [
          {
            "word": "Nhong",
            "start": 86.96,
            "end": 87.63
          },
          {
            "word": "nhong",
            "start": 87.63,
            "end": 88.3
          },
          {
            "word": "nhong",
            "start": 88.3,
            "end": 88.97
          },
          {
            "word": "ngựa",
            "start": 88.97,
            "end": 89.51
          },
          {
            "word": "phi",
            "start": 89.51,
            "end": 89.91
          },
          {
            "word": "thật",
            "start": 89.91,
            "end": 90.45
          },
          {
            "word": "khùng",
            "start": 90.45,
            "end": 91.12
          }
        ]
      },
      {
        "id": 34,
        "startTime": 91.21,
        "endTime": 95.1,
        "nextLineTime": 95.2,
        "text": "Hai cha con cùng ngã lăn đùng",
        "words": [
          {
            "word": "Hai",
            "start": 91.21,
            "end": 91.72
          },
          {
            "word": "cha",
            "start": 91.72,
            "end": 92.23
          },
          {
            "word": "con",
            "start": 92.23,
            "end": 92.74
          },
          {
            "word": "cùng",
            "start": 92.74,
            "end": 93.42
          },
          {
            "word": "ngã",
            "start": 93.42,
            "end": 93.93
          },
          {
            "word": "lăn",
            "start": 93.93,
            "end": 94.44
          },
          {
            "word": "đùng",
            "start": 94.44,
            "end": 95.12
          }
        ]
      },
      {
        "id": 35,
        "startTime": 95.2,
        "endTime": 96.44,
        "nextLineTime": 96.54,
        "text": "Con biết ba chỉ là ba",
        "words": [
          {
            "word": "Con",
            "start": 95.2,
            "end": 95.43
          },
          {
            "word": "biết",
            "start": 95.43,
            "end": 95.74
          },
          {
            "word": "ba",
            "start": 95.74,
            "end": 95.89
          },
          {
            "word": "chỉ",
            "start": 95.89,
            "end": 96.12
          },
          {
            "word": "là",
            "start": 96.12,
            "end": 96.28
          },
          {
            "word": "ba",
            "start": 96.28,
            "end": 96.44
          }
        ]
      },
      {
        "id": 36,
        "startTime": 96.54,
        "endTime": 97.74,
        "nextLineTime": 97.84,
        "text": "Lần đầu mà ba tập làm ba",
        "words": [
          {
            "word": "Lần",
            "start": 96.54,
            "end": 96.74
          },
          {
            "word": "đầu",
            "start": 96.74,
            "end": 96.94
          },
          {
            "word": "mà",
            "start": 96.94,
            "end": 97.07
          },
          {
            "word": "ba",
            "start": 97.07,
            "end": 97.2
          },
          {
            "word": "tập",
            "start": 97.2,
            "end": 97.4
          },
          {
            "word": "làm",
            "start": 97.4,
            "end": 97.6
          },
          {
            "word": "ba",
            "start": 97.6,
            "end": 97.73
          }
        ]
      },
      {
        "id": 37,
        "startTime": 97.84,
        "endTime": 99.38,
        "nextLineTime": 99.48,
        "text": "Là những lần ba phải đi làm xa",
        "words": [
          {
            "word": "Là",
            "start": 97.84,
            "end": 97.97
          },
          {
            "word": "những",
            "start": 97.97,
            "end": 98.3
          },
          {
            "word": "lần",
            "start": 98.3,
            "end": 98.5
          },
          {
            "word": "ba",
            "start": 98.5,
            "end": 98.63
          },
          {
            "word": "phải",
            "start": 98.63,
            "end": 98.9
          },
          {
            "word": "đi",
            "start": 98.9,
            "end": 99.03
          },
          {
            "word": "làm",
            "start": 99.03,
            "end": 99.23
          },
          {
            "word": "xa",
            "start": 99.23,
            "end": 99.36
          }
        ]
      },
      {
        "id": 38,
        "startTime": 99.48,
        "endTime": 100.28,
        "nextLineTime": 100.27,
        "text": "Giấu đi vất vả",
        "words": [
          {
            "word": "Giấu",
            "start": 99.48,
            "end": 99.77
          },
          {
            "word": "đi",
            "start": 99.77,
            "end": 99.92
          },
          {
            "word": "vất",
            "start": 99.92,
            "end": 100.14
          },
          {
            "word": "vả",
            "start": 100.14,
            "end": 100.29
          }
        ]
      },
      {
        "id": 39,
        "startTime": 100.27,
        "endTime": 102.61,
        "nextLineTime": 102.71,
        "text": "Mang nụ cười về nhà cùng quà trên tay",
        "words": [
          {
            "word": "Mang",
            "start": 100.27,
            "end": 100.59
          },
          {
            "word": "nụ",
            "start": 100.59,
            "end": 100.75
          },
          {
            "word": "cười",
            "start": 100.75,
            "end": 101.07
          },
          {
            "word": "về",
            "start": 101.07,
            "end": 101.23
          },
          {
            "word": "nhà",
            "start": 101.23,
            "end": 101.47
          },
          {
            "word": "cùng",
            "start": 101.47,
            "end": 101.79
          },
          {
            "word": "quà",
            "start": 101.79,
            "end": 102.03
          },
          {
            "word": "trên",
            "start": 102.03,
            "end": 102.35
          },
          {
            "word": "tay",
            "start": 102.35,
            "end": 102.59
          }
        ]
      },
      {
        "id": 40,
        "startTime": 102.71,
        "endTime": 105.79,
        "nextLineTime": 105.89,
        "text": "Để cho con được thấy yên lòng",
        "words": [
          {
            "word": "Để",
            "start": 102.71,
            "end": 102.98
          },
          {
            "word": "cho",
            "start": 102.98,
            "end": 103.38
          },
          {
            "word": "con",
            "start": 103.38,
            "end": 103.78
          },
          {
            "word": "được",
            "start": 103.78,
            "end": 104.32
          },
          {
            "word": "thấy",
            "start": 104.32,
            "end": 104.86
          },
          {
            "word": "yên",
            "start": 104.86,
            "end": 105.26
          },
          {
            "word": "lòng",
            "start": 105.26,
            "end": 105.8
          }
        ]
      },
      {
        "id": 41,
        "startTime": 105.89,
        "endTime": 108.71,
        "nextLineTime": 108.81,
        "text": "Vì đời cha con đã lắm bão giông",
        "words": [
          {
            "word": "Vì",
            "start": 105.89,
            "end": 106.12
          },
          {
            "word": "đời",
            "start": 106.12,
            "end": 106.47
          },
          {
            "word": "cha",
            "start": 106.47,
            "end": 106.82
          },
          {
            "word": "con",
            "start": 106.82,
            "end": 107.17
          },
          {
            "word": "đã",
            "start": 107.17,
            "end": 107.41
          },
          {
            "word": "lắm",
            "start": 107.41,
            "end": 107.76
          },
          {
            "word": "bão",
            "start": 107.76,
            "end": 108.11
          },
          {
            "word": "giông",
            "start": 108.11,
            "end": 108.7
          }
        ]
      },
      {
        "id": 42,
        "startTime": 108.81,
        "endTime": 110.35,
        "nextLineTime": 110.45,
        "text": "Thế giới của con là trắng, xanh, vàng, đỏ",
        "words": [
          {
            "word": "Thế",
            "start": 108.81,
            "end": 108.96
          },
          {
            "word": "giới",
            "start": 108.96,
            "end": 109.17
          },
          {
            "word": "của",
            "start": 109.17,
            "end": 109.32
          },
          {
            "word": "con",
            "start": 109.32,
            "end": 109.47
          },
          {
            "word": "là",
            "start": 109.47,
            "end": 109.57
          },
          {
            "word": "trắng,",
            "start": 109.57,
            "end": 109.83
          },
          {
            "word": "xanh,",
            "start": 109.83,
            "end": 110.04
          },
          {
            "word": "vàng,",
            "start": 110.04,
            "end": 110.25
          },
          {
            "word": "đỏ",
            "start": 110.25,
            "end": 110.35
          }
        ]
      },
      {
        "id": 43,
        "startTime": 110.45,
        "endTime": 111.95,
        "nextLineTime": 112.05,
        "text": "Thế giới của ba là trầy xát đôi tay",
        "words": [
          {
            "word": "Thế",
            "start": 110.45,
            "end": 110.62
          },
          {
            "word": "giới",
            "start": 110.62,
            "end": 110.84
          },
          {
            "word": "của",
            "start": 110.84,
            "end": 111.01
          },
          {
            "word": "ba",
            "start": 111.01,
            "end": 111.12
          },
          {
            "word": "là",
            "start": 111.12,
            "end": 111.23
          },
          {
            "word": "trầy",
            "start": 111.23,
            "end": 111.45
          },
          {
            "word": "xát",
            "start": 111.45,
            "end": 111.62
          },
          {
            "word": "đôi",
            "start": 111.62,
            "end": 111.79
          },
          {
            "word": "tay",
            "start": 111.79,
            "end": 111.96
          }
        ]
      },
      {
        "id": 44,
        "startTime": 112.05,
        "endTime": 113.0,
        "nextLineTime": 113.1,
        "text": "Để con chẳng thua ai",
        "words": [
          {
            "word": "Để",
            "start": 112.05,
            "end": 112.17
          },
          {
            "word": "con",
            "start": 112.17,
            "end": 112.35
          },
          {
            "word": "chẳng",
            "start": 112.35,
            "end": 112.65
          },
          {
            "word": "thua",
            "start": 112.65,
            "end": 112.89
          },
          {
            "word": "ai",
            "start": 112.89,
            "end": 113.01
          }
        ]
      },
      {
        "id": 45,
        "startTime": 113.1,
        "endTime": 113.9,
        "nextLineTime": 113.9,
        "text": "Được thắt khăn quàng đỏ",
        "words": [
          {
            "word": "Được",
            "start": 113.1,
            "end": 113.27
          },
          {
            "word": "thắt",
            "start": 113.27,
            "end": 113.44
          },
          {
            "word": "khăn",
            "start": 113.44,
            "end": 113.61
          },
          {
            "word": "quàng",
            "start": 113.61,
            "end": 113.82
          },
          {
            "word": "đỏ",
            "start": 113.82,
            "end": 113.9
          }
        ]
      },
      {
        "id": 46,
        "startTime": 113.9,
        "endTime": 114.7,
        "nextLineTime": 114.73,
        "text": "Ba con phải làm lụm",
        "words": [
          {
            "word": "Ba",
            "start": 113.9,
            "end": 114.01
          },
          {
            "word": "con",
            "start": 114.01,
            "end": 114.17
          },
          {
            "word": "phải",
            "start": 114.17,
            "end": 114.38
          },
          {
            "word": "làm",
            "start": 114.38,
            "end": 114.54
          },
          {
            "word": "lụm",
            "start": 114.54,
            "end": 114.7
          }
        ]
      },
      {
        "id": 47,
        "startTime": 114.73,
        "endTime": 115.74,
        "nextLineTime": 115.84,
        "text": "Quên mất đêm ngày",
        "words": [
          {
            "word": "Quên",
            "start": 114.73,
            "end": 115.02
          },
          {
            "word": "mất",
            "start": 115.02,
            "end": 115.24
          },
          {
            "word": "đêm",
            "start": 115.24,
            "end": 115.46
          },
          {
            "word": "ngày",
            "start": 115.46,
            "end": 115.75
          }
        ]
      },
      {
        "id": 48,
        "startTime": 115.84,
        "endTime": 117.32,
        "nextLineTime": 117.42,
        "text": "Ba ơi, ba đói nhưng sao ba không nói",
        "words": [
          {
            "word": "Ba",
            "start": 115.84,
            "end": 115.95
          },
          {
            "word": "ơi,",
            "start": 115.95,
            "end": 116.06
          },
          {
            "word": "ba",
            "start": 116.06,
            "end": 116.17
          },
          {
            "word": "đói",
            "start": 116.17,
            "end": 116.33
          },
          {
            "word": "nhưng",
            "start": 116.33,
            "end": 116.6
          },
          {
            "word": "sao",
            "start": 116.6,
            "end": 116.76
          },
          {
            "word": "ba",
            "start": 116.76,
            "end": 116.87
          },
          {
            "word": "không",
            "start": 116.87,
            "end": 117.14
          },
          {
            "word": "nói",
            "start": 117.14,
            "end": 117.3
          }
        ]
      },
      {
        "id": 49,
        "startTime": 117.42,
        "endTime": 118.22,
        "nextLineTime": 118.23,
        "text": "Khi đèn đường le lói",
        "words": [
          {
            "word": "Khi",
            "start": 117.42,
            "end": 117.57
          },
          {
            "word": "đèn",
            "start": 117.57,
            "end": 117.72
          },
          {
            "word": "đường",
            "start": 117.72,
            "end": 117.97
          },
          {
            "word": "le",
            "start": 117.97,
            "end": 118.07
          },
          {
            "word": "lói",
            "start": 118.07,
            "end": 118.22
          }
        ]
      },
      {
        "id": 50,
        "startTime": 118.23,
        "endTime": 119.03,
        "nextLineTime": 119.06,
        "text": "Thì ba con mới tan ca",
        "words": [
          {
            "word": "Thì",
            "start": 118.23,
            "end": 118.38
          },
          {
            "word": "ba",
            "start": 118.38,
            "end": 118.48
          },
          {
            "word": "con",
            "start": 118.48,
            "end": 118.63
          },
          {
            "word": "mới",
            "start": 118.63,
            "end": 118.78
          },
          {
            "word": "tan",
            "start": 118.78,
            "end": 118.93
          },
          {
            "word": "ca",
            "start": 118.93,
            "end": 119.03
          }
        ]
      },
      {
        "id": 51,
        "startTime": 119.06,
        "endTime": 119.99,
        "nextLineTime": 120.09,
        "text": "Ba con mua bánh",
        "words": [
          {
            "word": "Ba",
            "start": 119.06,
            "end": 119.22
          },
          {
            "word": "con",
            "start": 119.22,
            "end": 119.45
          },
          {
            "word": "mua",
            "start": 119.45,
            "end": 119.68
          },
          {
            "word": "bánh",
            "start": 119.68,
            "end": 119.99
          }
        ]
      },
      {
        "id": 52,
        "startTime": 120.09,
        "endTime": 120.89,
        "nextLineTime": 120.89,
        "text": "Ba con mua quà",
        "words": [
          {
            "word": "Ba",
            "start": 120.09,
            "end": 120.24
          },
          {
            "word": "con",
            "start": 120.24,
            "end": 120.46
          },
          {
            "word": "mua",
            "start": 120.46,
            "end": 120.68
          },
          {
            "word": "quà",
            "start": 120.68,
            "end": 120.9
          }
        ]
      },
      {
        "id": 53,
        "startTime": 120.89,
        "endTime": 121.69,
        "nextLineTime": 121.68,
        "text": "Ba mua cho con",
        "words": [
          {
            "word": "Ba",
            "start": 120.89,
            "end": 121.04
          },
          {
            "word": "mua",
            "start": 121.04,
            "end": 121.26
          },
          {
            "word": "cho",
            "start": 121.26,
            "end": 121.48
          },
          {
            "word": "con",
            "start": 121.48,
            "end": 121.7
          }
        ]
      },
      {
        "id": 54,
        "startTime": 121.68,
        "endTime": 122.9,
        "nextLineTime": 123.0,
        "text": "Sao không mua cho ba",
        "words": [
          {
            "word": "Sao",
            "start": 121.68,
            "end": 121.91
          },
          {
            "word": "không",
            "start": 121.91,
            "end": 122.29
          },
          {
            "word": "mua",
            "start": 122.29,
            "end": 122.52
          },
          {
            "word": "cho",
            "start": 122.52,
            "end": 122.75
          },
          {
            "word": "ba",
            "start": 122.75,
            "end": 122.9
          }
        ]
      },
      {
        "id": 55,
        "startTime": 123.0,
        "endTime": 126.35,
        "nextLineTime": 126.45,
        "text": "Biết bao nhiêu sương gió trên vai gầy",
        "words": [
          {
            "word": "Biết",
            "start": 123.0,
            "end": 123.45
          },
          {
            "word": "bao",
            "start": 123.45,
            "end": 123.78
          },
          {
            "word": "nhiêu",
            "start": 123.78,
            "end": 124.34
          },
          {
            "word": "sương",
            "start": 124.34,
            "end": 124.9
          },
          {
            "word": "gió",
            "start": 124.9,
            "end": 125.23
          },
          {
            "word": "trên",
            "start": 125.23,
            "end": 125.68
          },
          {
            "word": "vai",
            "start": 125.68,
            "end": 126.02
          },
          {
            "word": "gầy",
            "start": 126.02,
            "end": 126.35
          }
        ]
      },
      {
        "id": 56,
        "startTime": 126.45,
        "endTime": 129.74,
        "nextLineTime": 129.84,
        "text": "Mà con thờ ơ nào đâu thấy",
        "words": [
          {
            "word": "Mà",
            "start": 126.45,
            "end": 126.78
          },
          {
            "word": "con",
            "start": 126.78,
            "end": 127.27
          },
          {
            "word": "thờ",
            "start": 127.27,
            "end": 127.76
          },
          {
            "word": "ơ",
            "start": 127.76,
            "end": 128.09
          },
          {
            "word": "nào",
            "start": 128.09,
            "end": 128.58
          },
          {
            "word": "đâu",
            "start": 128.58,
            "end": 129.07
          },
          {
            "word": "thấy",
            "start": 129.07,
            "end": 129.73
          }
        ]
      },
      {
        "id": 57,
        "startTime": 129.84,
        "endTime": 132.93,
        "nextLineTime": 133.03,
        "text": "Phải đến khi con làm cha như cha rồi",
        "words": [
          {
            "word": "Phải",
            "start": 129.84,
            "end": 130.28
          },
          {
            "word": "đến",
            "start": 130.28,
            "end": 130.61
          },
          {
            "word": "khi",
            "start": 130.61,
            "end": 130.94
          },
          {
            "word": "con",
            "start": 130.94,
            "end": 131.27
          },
          {
            "word": "làm",
            "start": 131.27,
            "end": 131.6
          },
          {
            "word": "cha",
            "start": 131.6,
            "end": 131.93
          },
          {
            "word": "như",
            "start": 131.93,
            "end": 132.26
          },
          {
            "word": "cha",
            "start": 132.26,
            "end": 132.59
          },
          {
            "word": "rồi",
            "start": 132.59,
            "end": 132.92
          }
        ]
      },
      {
        "id": 58,
        "startTime": 133.03,
        "endTime": 136.13,
        "nextLineTime": 136.23,
        "text": "Thì con mới hiểu là",
        "words": [
          {
            "word": "Thì",
            "start": 133.03,
            "end": 133.65
          },
          {
            "word": "con",
            "start": 133.65,
            "end": 134.27
          },
          {
            "word": "mới",
            "start": 134.27,
            "end": 134.89
          },
          {
            "word": "hiểu",
            "start": 134.89,
            "end": 135.72
          },
          {
            "word": "là",
            "start": 135.72,
            "end": 136.13
          }
        ]
      },
      {
        "id": 59,
        "startTime": 136.23,
        "endTime": 137.78,
        "nextLineTime": 137.88,
        "text": "Con ăn những món ba con chưa thử",
        "words": [
          {
            "word": "Con",
            "start": 136.23,
            "end": 136.42
          },
          {
            "word": "ăn",
            "start": 136.42,
            "end": 136.54
          },
          {
            "word": "những",
            "start": 136.54,
            "end": 136.85
          },
          {
            "word": "món",
            "start": 136.85,
            "end": 137.04
          },
          {
            "word": "ba",
            "start": 137.04,
            "end": 137.16
          },
          {
            "word": "con",
            "start": 137.16,
            "end": 137.35
          },
          {
            "word": "chưa",
            "start": 137.35,
            "end": 137.6
          },
          {
            "word": "thử",
            "start": 137.6,
            "end": 137.79
          }
        ]
      },
      {
        "id": 60,
        "startTime": 137.88,
        "endTime": 138.68,
        "nextLineTime": 138.68,
        "text": "Quần áo con tươm tất",
        "words": [
          {
            "word": "Quần",
            "start": 137.88,
            "end": 138.08
          },
          {
            "word": "áo",
            "start": 138.08,
            "end": 138.18
          },
          {
            "word": "con",
            "start": 138.18,
            "end": 138.33
          },
          {
            "word": "tươm",
            "start": 138.33,
            "end": 138.53
          },
          {
            "word": "tất",
            "start": 138.53,
            "end": 138.68
          }
        ]
      },
      {
        "id": 61,
        "startTime": 138.68,
        "endTime": 139.64,
        "nextLineTime": 139.74,
        "text": "Ba con lấm lem",
        "words": [
          {
            "word": "Ba",
            "start": 138.68,
            "end": 138.85
          },
          {
            "word": "con",
            "start": 138.85,
            "end": 139.11
          },
          {
            "word": "lấm",
            "start": 139.11,
            "end": 139.37
          },
          {
            "word": "lem",
            "start": 139.37,
            "end": 139.63
          }
        ]
      },
      {
        "id": 62,
        "startTime": 139.74,
        "endTime": 140.54,
        "nextLineTime": 140.48,
        "text": "Cho con yên giấc",
        "words": [
          {
            "word": "Cho",
            "start": 139.74,
            "end": 139.92
          },
          {
            "word": "con",
            "start": 139.92,
            "end": 140.1
          },
          {
            "word": "yên",
            "start": 140.1,
            "end": 140.28
          },
          {
            "word": "giấc",
            "start": 140.28,
            "end": 140.53
          }
        ]
      },
      {
        "id": 63,
        "startTime": 140.48,
        "endTime": 141.28,
        "nextLineTime": 141.29,
        "text": "Kể cả những ngày mưa phủ",
        "words": [
          {
            "word": "Kể",
            "start": 140.48,
            "end": 140.56
          },
          {
            "word": "cả",
            "start": 140.56,
            "end": 140.64
          },
          {
            "word": "những",
            "start": 140.64,
            "end": 140.85
          },
          {
            "word": "ngày",
            "start": 140.85,
            "end": 141.02
          },
          {
            "word": "mưa",
            "start": 141.02,
            "end": 141.15
          },
          {
            "word": "phủ",
            "start": 141.15,
            "end": 141.28
          }
        ]
      },
      {
        "id": 64,
        "startTime": 141.29,
        "endTime": 142.09,
        "nextLineTime": 142.07,
        "text": "Ngập lặn giữa thành phố",
        "words": [
          {
            "word": "Ngập",
            "start": 141.29,
            "end": 141.46
          },
          {
            "word": "lặn",
            "start": 141.46,
            "end": 141.59
          },
          {
            "word": "giữa",
            "start": 141.59,
            "end": 141.76
          },
          {
            "word": "thành",
            "start": 141.76,
            "end": 141.97
          },
          {
            "word": "phố",
            "start": 141.97,
            "end": 142.1
          }
        ]
      },
      {
        "id": 65,
        "startTime": 142.07,
        "endTime": 143.03,
        "nextLineTime": 143.13,
        "text": "Ba như cái chấm đen",
        "words": [
          {
            "word": "Ba",
            "start": 142.07,
            "end": 142.2
          },
          {
            "word": "như",
            "start": 142.2,
            "end": 142.39
          },
          {
            "word": "cái",
            "start": 142.39,
            "end": 142.58
          },
          {
            "word": "chấm",
            "start": 142.58,
            "end": 142.84
          },
          {
            "word": "đen",
            "start": 142.84,
            "end": 143.03
          }
        ]
      },
      {
        "id": 66,
        "startTime": 143.13,
        "endTime": 145.13,
        "nextLineTime": 145.23,
        "text": "Là bình minh tựa đầu nơi con dựa vào",
        "words": [
          {
            "word": "Là",
            "start": 143.13,
            "end": 143.27
          },
          {
            "word": "bình",
            "start": 143.27,
            "end": 143.56
          },
          {
            "word": "minh",
            "start": 143.56,
            "end": 143.85
          },
          {
            "word": "tựa",
            "start": 143.85,
            "end": 144.06
          },
          {
            "word": "đầu",
            "start": 144.06,
            "end": 144.27
          },
          {
            "word": "nơi",
            "start": 144.27,
            "end": 144.48
          },
          {
            "word": "con",
            "start": 144.48,
            "end": 144.69
          },
          {
            "word": "dựa",
            "start": 144.69,
            "end": 144.9
          },
          {
            "word": "vào",
            "start": 144.9,
            "end": 145.11
          }
        ]
      },
      {
        "id": 67,
        "startTime": 145.23,
        "endTime": 146.71,
        "nextLineTime": 146.81,
        "text": "Bình yên đằng sau tấm lưng",
        "words": [
          {
            "word": "Bình",
            "start": 145.23,
            "end": 145.51
          },
          {
            "word": "yên",
            "start": 145.51,
            "end": 145.72
          },
          {
            "word": "đằng",
            "start": 145.72,
            "end": 146.0
          },
          {
            "word": "sau",
            "start": 146.0,
            "end": 146.21
          },
          {
            "word": "tấm",
            "start": 146.21,
            "end": 146.42
          },
          {
            "word": "lưng",
            "start": 146.42,
            "end": 146.7
          }
        ]
      },
      {
        "id": 68,
        "startTime": 146.81,
        "endTime": 148.57,
        "nextLineTime": 148.67,
        "text": "Là dịu êm ngày đầu lo lắng mai sau",
        "words": [
          {
            "word": "Là",
            "start": 146.81,
            "end": 146.95
          },
          {
            "word": "dịu",
            "start": 146.95,
            "end": 147.15
          },
          {
            "word": "êm",
            "start": 147.15,
            "end": 147.29
          },
          {
            "word": "ngày",
            "start": 147.29,
            "end": 147.56
          },
          {
            "word": "đầu",
            "start": 147.56,
            "end": 147.76
          },
          {
            "word": "lo",
            "start": 147.76,
            "end": 147.9
          },
          {
            "word": "lắng",
            "start": 147.9,
            "end": 148.17
          },
          {
            "word": "mai",
            "start": 148.17,
            "end": 148.37
          },
          {
            "word": "sau",
            "start": 148.37,
            "end": 148.57
          }
        ]
      },
      {
        "id": 69,
        "startTime": 148.67,
        "endTime": 149.58,
        "nextLineTime": 149.68,
        "text": "Đời cha nào đâu dễ",
        "words": [
          {
            "word": "Đời",
            "start": 148.67,
            "end": 148.86
          },
          {
            "word": "cha",
            "start": 148.86,
            "end": 149.06
          },
          {
            "word": "nào",
            "start": 149.06,
            "end": 149.25
          },
          {
            "word": "đâu",
            "start": 149.25,
            "end": 149.44
          },
          {
            "word": "dễ",
            "start": 149.44,
            "end": 149.57
          }
        ]
      },
      {
        "id": 70,
        "startTime": 149.68,
        "endTime": 153.03,
        "nextLineTime": 153.13,
        "text": "Nhong nhong nhong, cha làm con ngựa",
        "words": [
          {
            "word": "Nhong",
            "start": 149.68,
            "end": 150.28
          },
          {
            "word": "nhong",
            "start": 150.28,
            "end": 150.88
          },
          {
            "word": "nhong,",
            "start": 150.88,
            "end": 151.48
          },
          {
            "word": "cha",
            "start": 151.48,
            "end": 151.84
          },
          {
            "word": "làm",
            "start": 151.84,
            "end": 152.2
          },
          {
            "word": "con",
            "start": 152.2,
            "end": 152.56
          },
          {
            "word": "ngựa",
            "start": 152.56,
            "end": 153.04
          }
        ]
      },
      {
        "id": 71,
        "startTime": 153.13,
        "endTime": 156.25,
        "nextLineTime": 156.35,
        "text": "Để cho con lên cưỡi trên lưng",
        "words": [
          {
            "word": "Để",
            "start": 153.13,
            "end": 153.4
          },
          {
            "word": "cho",
            "start": 153.4,
            "end": 153.81
          },
          {
            "word": "con",
            "start": 153.81,
            "end": 154.22
          },
          {
            "word": "lên",
            "start": 154.22,
            "end": 154.63
          },
          {
            "word": "cưỡi",
            "start": 154.63,
            "end": 155.17
          },
          {
            "word": "trên",
            "start": 155.17,
            "end": 155.71
          },
          {
            "word": "lưng",
            "start": 155.71,
            "end": 156.25
          }
        ]
      },
      {
        "id": 72,
        "startTime": 156.35,
        "endTime": 159.74,
        "nextLineTime": 159.84,
        "text": "Nhong nhong nhong, cha làm con ngựa",
        "words": [
          {
            "word": "Nhong",
            "start": 156.35,
            "end": 156.96
          },
          {
            "word": "nhong",
            "start": 156.96,
            "end": 157.57
          },
          {
            "word": "nhong,",
            "start": 157.57,
            "end": 158.18
          },
          {
            "word": "cha",
            "start": 158.18,
            "end": 158.54
          },
          {
            "word": "làm",
            "start": 158.54,
            "end": 158.9
          },
          {
            "word": "con",
            "start": 158.9,
            "end": 159.26
          },
          {
            "word": "ngựa",
            "start": 159.26,
            "end": 159.74
          }
        ]
      },
      {
        "id": 73,
        "startTime": 159.84,
        "endTime": 163.75,
        "nextLineTime": 163.85,
        "text": "Để cho con vui thỏa tiếng cười",
        "words": [
          {
            "word": "Để",
            "start": 159.84,
            "end": 160.17
          },
          {
            "word": "cho",
            "start": 160.17,
            "end": 160.66
          },
          {
            "word": "con",
            "start": 160.66,
            "end": 161.15
          },
          {
            "word": "vui",
            "start": 161.15,
            "end": 161.64
          },
          {
            "word": "thỏa",
            "start": 161.64,
            "end": 162.29
          },
          {
            "word": "tiếng",
            "start": 162.29,
            "end": 163.1
          },
          {
            "word": "cười",
            "start": 163.1,
            "end": 163.75
          }
        ]
      },
      {
        "id": 74,
        "startTime": 163.85,
        "endTime": 164.65,
        "nextLineTime": 164.59,
        "text": "Ba ơi mệt không",
        "words": [
          {
            "word": "Ba",
            "start": 163.85,
            "end": 163.98
          },
          {
            "word": "ơi",
            "start": 163.98,
            "end": 164.11
          },
          {
            "word": "mệt",
            "start": 164.11,
            "end": 164.31
          },
          {
            "word": "không",
            "start": 164.31,
            "end": 164.64
          }
        ]
      },
      {
        "id": 75,
        "startTime": 164.59,
        "endTime": 165.39,
        "nextLineTime": 165.39,
        "text": "Ba cười không nói",
        "words": [
          {
            "word": "Ba",
            "start": 164.59,
            "end": 164.7
          },
          {
            "word": "cười",
            "start": 164.7,
            "end": 164.93
          },
          {
            "word": "không",
            "start": 164.93,
            "end": 165.22
          },
          {
            "word": "nói",
            "start": 165.22,
            "end": 165.39
          }
        ]
      },
      {
        "id": 76,
        "startTime": 165.39,
        "endTime": 166.19,
        "nextLineTime": 166.2,
        "text": "Hay mình đi chơi",
        "words": [
          {
            "word": "Hay",
            "start": 165.39,
            "end": 165.57
          },
          {
            "word": "mình",
            "start": 165.57,
            "end": 165.82
          },
          {
            "word": "đi",
            "start": 165.82,
            "end": 165.94
          },
          {
            "word": "chơi",
            "start": 165.94,
            "end": 166.19
          }
        ]
      },
      {
        "id": 77,
        "startTime": 166.2,
        "endTime": 167.0,
        "nextLineTime": 167.01,
        "text": "Ba lười nên thôi",
        "words": [
          {
            "word": "Ba",
            "start": 166.2,
            "end": 166.32
          },
          {
            "word": "lười",
            "start": 166.32,
            "end": 166.57
          },
          {
            "word": "nên",
            "start": 166.57,
            "end": 166.75
          },
          {
            "word": "thôi",
            "start": 166.75,
            "end": 167.0
          }
        ]
      },
      {
        "id": 78,
        "startTime": 167.01,
        "endTime": 167.96,
        "nextLineTime": 168.06,
        "text": "Ba muốn gì không",
        "words": [
          {
            "word": "Ba",
            "start": 167.01,
            "end": 167.16
          },
          {
            "word": "muốn",
            "start": 167.16,
            "end": 167.45
          },
          {
            "word": "gì",
            "start": 167.45,
            "end": 167.6
          },
          {
            "word": "không",
            "start": 167.6,
            "end": 167.97
          }
        ]
      },
      {
        "id": 79,
        "startTime": 168.06,
        "endTime": 168.86,
        "nextLineTime": 168.86,
        "text": "Ba cười ba nói",
        "words": [
          {
            "word": "Ba",
            "start": 168.06,
            "end": 168.21
          },
          {
            "word": "cười",
            "start": 168.21,
            "end": 168.5
          },
          {
            "word": "ba",
            "start": 168.5,
            "end": 168.65
          },
          {
            "word": "nói",
            "start": 168.65,
            "end": 168.87
          }
        ]
      },
      {
        "id": 80,
        "startTime": 168.86,
        "endTime": 170.63,
        "nextLineTime": 170.73,
        "text": "Ba chỉ muốn bên gia đình ba thôi",
        "words": [
          {
            "word": "Ba",
            "start": 168.86,
            "end": 169.0
          },
          {
            "word": "chỉ",
            "start": 169.0,
            "end": 169.21
          },
          {
            "word": "muốn",
            "start": 169.21,
            "end": 169.49
          },
          {
            "word": "bên",
            "start": 169.49,
            "end": 169.7
          },
          {
            "word": "gia",
            "start": 169.7,
            "end": 169.91
          },
          {
            "word": "đình",
            "start": 169.91,
            "end": 170.19
          },
          {
            "word": "ba",
            "start": 170.19,
            "end": 170.33
          },
          {
            "word": "thôi",
            "start": 170.33,
            "end": 170.61
          }
        ]
      },
      {
        "id": 81,
        "startTime": 170.73,
        "endTime": 174.34,
        "nextLineTime": 174.44,
        "text": "Phải đến khi con làm ba như ba rồi",
        "words": [
          {
            "word": "Phải",
            "start": 170.73,
            "end": 171.29
          },
          {
            "word": "đến",
            "start": 171.29,
            "end": 171.71
          },
          {
            "word": "khi",
            "start": 171.71,
            "end": 172.13
          },
          {
            "word": "con",
            "start": 172.13,
            "end": 172.55
          },
          {
            "word": "làm",
            "start": 172.55,
            "end": 172.97
          },
          {
            "word": "ba",
            "start": 172.97,
            "end": 173.25
          },
          {
            "word": "như",
            "start": 173.25,
            "end": 173.67
          },
          {
            "word": "ba",
            "start": 173.67,
            "end": 173.95
          },
          {
            "word": "rồi",
            "start": 173.95,
            "end": 174.37
          }
        ]
      },
      {
        "id": 82,
        "startTime": 174.44,
        "endTime": 180.04,
        "nextLineTime": 186.13,
        "text": "Thì ba ơi, ba mệt lắm đúng hông",
        "words": [
          {
            "word": "Thì",
            "start": 174.44,
            "end": 175.17
          },
          {
            "word": "ba",
            "start": 175.17,
            "end": 175.66
          },
          {
            "word": "ơi,",
            "start": 175.66,
            "end": 176.15
          },
          {
            "word": "ba",
            "start": 176.15,
            "end": 176.64
          },
          {
            "word": "mệt",
            "start": 176.64,
            "end": 177.37
          },
          {
            "word": "lắm",
            "start": 177.37,
            "end": 178.1
          },
          {
            "word": "đúng",
            "start": 178.1,
            "end": 179.07
          },
          {
            "word": "hông",
            "start": 179.07,
            "end": 180.04
          }
        ]
      },
      {
        "id": 83,
        "startTime": 186.13,
        "endTime": 190.29,
        "nextLineTime": 190.39,
        "text": "Nhong nhong nhong, cha làm con ngựa",
        "words": [
          {
            "word": "Nhong",
            "start": 186.13,
            "end": 186.87
          },
          {
            "word": "nhong",
            "start": 186.87,
            "end": 187.61
          },
          {
            "word": "nhong,",
            "start": 187.61,
            "end": 188.35
          },
          {
            "word": "cha",
            "start": 188.35,
            "end": 188.8
          },
          {
            "word": "làm",
            "start": 188.8,
            "end": 189.25
          },
          {
            "word": "con",
            "start": 189.25,
            "end": 189.7
          },
          {
            "word": "ngựa",
            "start": 189.7,
            "end": 190.29
          }
        ]
      },
      {
        "id": 84,
        "startTime": 190.39,
        "endTime": 194.69,
        "nextLineTime": 194.79,
        "text": "Để cho con lên cưỡi trên lưng",
        "words": [
          {
            "word": "Để",
            "start": 190.39,
            "end": 190.76
          },
          {
            "word": "cho",
            "start": 190.76,
            "end": 191.32
          },
          {
            "word": "con",
            "start": 191.32,
            "end": 191.88
          },
          {
            "word": "lên",
            "start": 191.88,
            "end": 192.44
          },
          {
            "word": "cưỡi",
            "start": 192.44,
            "end": 193.19
          },
          {
            "word": "trên",
            "start": 193.19,
            "end": 193.94
          },
          {
            "word": "lưng",
            "start": 193.94,
            "end": 194.69
          }
        ]
      },
      {
        "id": 85,
        "startTime": 194.79,
        "endTime": 198.71,
        "nextLineTime": 198.81,
        "text": "Nhong nhong nhong, cha làm con ngựa",
        "words": [
          {
            "word": "Nhong",
            "start": 194.79,
            "end": 195.49
          },
          {
            "word": "nhong",
            "start": 195.49,
            "end": 196.19
          },
          {
            "word": "nhong,",
            "start": 196.19,
            "end": 196.89
          },
          {
            "word": "cha",
            "start": 196.89,
            "end": 197.31
          },
          {
            "word": "làm",
            "start": 197.31,
            "end": 197.73
          },
          {
            "word": "con",
            "start": 197.73,
            "end": 198.15
          },
          {
            "word": "ngựa",
            "start": 198.15,
            "end": 198.71
          }
        ]
      },
      {
        "id": 86,
        "startTime": 198.81,
        "endTime": 202.68,
        "nextLineTime": 202.78,
        "text": "Để cho con vui thỏa tiếng cười",
        "words": [
          {
            "word": "Để",
            "start": 198.81,
            "end": 199.13
          },
          {
            "word": "cho",
            "start": 199.13,
            "end": 199.61
          },
          {
            "word": "con",
            "start": 199.61,
            "end": 200.09
          },
          {
            "word": "vui",
            "start": 200.09,
            "end": 200.57
          },
          {
            "word": "thỏa",
            "start": 200.57,
            "end": 201.22
          },
          {
            "word": "tiếng",
            "start": 201.22,
            "end": 202.03
          },
          {
            "word": "cười",
            "start": 202.03,
            "end": 202.68
          }
        ]
      },
      {
        "id": 87,
        "startTime": 202.78,
        "endTime": 207.07,
        "nextLineTime": 207.17,
        "text": "Nhong nhong nhong, ngựa cha mệt quá",
        "words": [
          {
            "word": "Nhong",
            "start": 202.78,
            "end": 203.55
          },
          {
            "word": "nhong",
            "start": 203.55,
            "end": 204.32
          },
          {
            "word": "nhong,",
            "start": 204.32,
            "end": 205.09
          },
          {
            "word": "ngựa",
            "start": 205.09,
            "end": 205.7
          },
          {
            "word": "cha",
            "start": 205.7,
            "end": 206.16
          },
          {
            "word": "mệt",
            "start": 206.16,
            "end": 206.62
          },
          {
            "word": "quá",
            "start": 206.62,
            "end": 207.08
          }
        ]
      },
      {
        "id": 88,
        "startTime": 207.17,
        "endTime": 211.04,
        "nextLineTime": 211.14,
        "text": "Con không biết, con nói ngựa phi",
        "words": [
          {
            "word": "Con",
            "start": 207.17,
            "end": 207.63
          },
          {
            "word": "không",
            "start": 207.63,
            "end": 208.4
          },
          {
            "word": "biết,",
            "start": 208.4,
            "end": 209.02
          },
          {
            "word": "con",
            "start": 209.02,
            "end": 209.48
          },
          {
            "word": "nói",
            "start": 209.48,
            "end": 209.94
          },
          {
            "word": "ngựa",
            "start": 209.94,
            "end": 210.56
          },
          {
            "word": "phi",
            "start": 210.56,
            "end": 211.02
          }
        ]
      },
      {
        "id": 89,
        "startTime": 211.14,
        "endTime": 215.43,
        "nextLineTime": 215.53,
        "text": "Nhong nhong nhong, ngựa phi thật khùng",
        "words": [
          {
            "word": "Nhong",
            "start": 211.14,
            "end": 211.83
          },
          {
            "word": "nhong",
            "start": 211.83,
            "end": 212.52
          },
          {
            "word": "nhong,",
            "start": 212.52,
            "end": 213.21
          },
          {
            "word": "ngựa",
            "start": 213.21,
            "end": 213.76
          },
          {
            "word": "phi",
            "start": 213.76,
            "end": 214.18
          },
          {
            "word": "thật",
            "start": 214.18,
            "end": 214.73
          },
          {
            "word": "khùng",
            "start": 214.73,
            "end": 215.42
          }
        ]
      },
      {
        "id": 90,
        "startTime": 215.53,
        "endTime": 221.13,
        "nextLineTime": 223.4,
        "text": "Hai cha con cùng ngã lăn đùng",
        "words": [
          {
            "word": "Hai",
            "start": 215.53,
            "end": 216.26
          },
          {
            "word": "cha",
            "start": 216.26,
            "end": 216.99
          },
          {
            "word": "con",
            "start": 216.99,
            "end": 217.72
          },
          {
            "word": "cùng",
            "start": 217.72,
            "end": 218.69
          },
          {
            "word": "ngã",
            "start": 218.69,
            "end": 219.42
          },
          {
            "word": "lăn",
            "start": 219.42,
            "end": 220.15
          },
          {
            "word": "đùng",
            "start": 220.15,
            "end": 221.12
          }
        ]
      },
      {
        "id": 91,
        "startTime": 223.4,
        "endTime": 226.48,
        "nextLineTime": 226.58,
        "text": "Nhong nhong nhong, cha làm con ngựa",
        "words": [
          {
            "word": "Nhong",
            "start": 223.4,
            "end": 223.95
          },
          {
            "word": "nhong",
            "start": 223.95,
            "end": 224.5
          },
          {
            "word": "nhong,",
            "start": 224.5,
            "end": 225.05
          },
          {
            "word": "cha",
            "start": 225.05,
            "end": 225.38
          },
          {
            "word": "làm",
            "start": 225.38,
            "end": 225.71
          },
          {
            "word": "con",
            "start": 225.71,
            "end": 226.04
          },
          {
            "word": "ngựa",
            "start": 226.04,
            "end": 226.48
          }
        ]
      },
      {
        "id": 92,
        "startTime": 226.58,
        "endTime": 230.07,
        "nextLineTime": 230.17,
        "text": "Để cho con lên cưỡi trên lưng",
        "words": [
          {
            "word": "Để",
            "start": 226.58,
            "end": 226.88
          },
          {
            "word": "cho",
            "start": 226.88,
            "end": 227.34
          },
          {
            "word": "con",
            "start": 227.34,
            "end": 227.8
          },
          {
            "word": "lên",
            "start": 227.8,
            "end": 228.26
          },
          {
            "word": "cưỡi",
            "start": 228.26,
            "end": 228.87
          },
          {
            "word": "trên",
            "start": 228.87,
            "end": 229.48
          },
          {
            "word": "lưng",
            "start": 229.48,
            "end": 230.09
          }
        ]
      },
      {
        "id": 93,
        "startTime": 230.17,
        "endTime": 233.27,
        "nextLineTime": 233.37,
        "text": "Nhong nhong nhong, cha làm con ngựa",
        "words": [
          {
            "word": "Nhong",
            "start": 230.17,
            "end": 230.72
          },
          {
            "word": "nhong",
            "start": 230.72,
            "end": 231.27
          },
          {
            "word": "nhong,",
            "start": 231.27,
            "end": 231.82
          },
          {
            "word": "cha",
            "start": 231.82,
            "end": 232.15
          },
          {
            "word": "làm",
            "start": 232.15,
            "end": 232.48
          },
          {
            "word": "con",
            "start": 232.48,
            "end": 232.81
          },
          {
            "word": "ngựa",
            "start": 232.81,
            "end": 233.25
          }
        ]
      },
      {
        "id": 94,
        "startTime": 233.37,
        "endTime": 236.84,
        "nextLineTime": 236.94,
        "text": "Để cho con vui thỏa tiếng cười",
        "words": [
          {
            "word": "Để",
            "start": 233.37,
            "end": 233.66
          },
          {
            "word": "cho",
            "start": 233.66,
            "end": 234.09
          },
          {
            "word": "con",
            "start": 234.09,
            "end": 234.52
          },
          {
            "word": "vui",
            "start": 234.52,
            "end": 234.95
          },
          {
            "word": "thỏa",
            "start": 234.95,
            "end": 235.53
          },
          {
            "word": "tiếng",
            "start": 235.53,
            "end": 236.25
          },
          {
            "word": "cười",
            "start": 236.25,
            "end": 236.83
          }
        ]
      },
      {
        "id": 95,
        "startTime": 236.94,
        "endTime": 240.43,
        "nextLineTime": 240.53,
        "text": "Nhong nhong nhong, ngựa cha mệt quá",
        "words": [
          {
            "word": "Nhong",
            "start": 236.94,
            "end": 237.56
          },
          {
            "word": "nhong",
            "start": 237.56,
            "end": 238.18
          },
          {
            "word": "nhong,",
            "start": 238.18,
            "end": 238.8
          },
          {
            "word": "ngựa",
            "start": 238.8,
            "end": 239.3
          },
          {
            "word": "cha",
            "start": 239.3,
            "end": 239.67
          },
          {
            "word": "mệt",
            "start": 239.67,
            "end": 240.04
          },
          {
            "word": "quá",
            "start": 240.04,
            "end": 240.41
          }
        ]
      },
      {
        "id": 96,
        "startTime": 240.53,
        "endTime": 243.63,
        "nextLineTime": 243.73,
        "text": "Con không biết, con nói ngựa phi",
        "words": [
          {
            "word": "Con",
            "start": 240.53,
            "end": 240.9
          },
          {
            "word": "không",
            "start": 240.9,
            "end": 241.52
          },
          {
            "word": "biết,",
            "start": 241.52,
            "end": 242.02
          },
          {
            "word": "con",
            "start": 242.02,
            "end": 242.39
          },
          {
            "word": "nói",
            "start": 242.39,
            "end": 242.76
          },
          {
            "word": "ngựa",
            "start": 242.76,
            "end": 243.26
          },
          {
            "word": "phi",
            "start": 243.26,
            "end": 243.63
          }
        ]
      },
      {
        "id": 97,
        "startTime": 243.73,
        "endTime": 247.22,
        "nextLineTime": 247.32,
        "text": "Nhong nhong nhong, ngựa phi thật khùng",
        "words": [
          {
            "word": "Nhong",
            "start": 243.73,
            "end": 244.29
          },
          {
            "word": "nhong",
            "start": 244.29,
            "end": 244.85
          },
          {
            "word": "nhong,",
            "start": 244.85,
            "end": 245.41
          },
          {
            "word": "ngựa",
            "start": 245.41,
            "end": 245.86
          },
          {
            "word": "phi",
            "start": 245.86,
            "end": 246.2
          },
          {
            "word": "thật",
            "start": 246.2,
            "end": 246.65
          },
          {
            "word": "khùng",
            "start": 246.65,
            "end": 247.21
          }
        ]
      },
      {
        "id": 98,
        "startTime": 247.32,
        "endTime": 250.87,
        "nextLineTime": 250.97,
        "text": "Hai cha con cùng ngã lăn đùng",
        "words": [
          {
            "word": "Hai",
            "start": 247.32,
            "end": 247.78
          },
          {
            "word": "cha",
            "start": 247.78,
            "end": 248.24
          },
          {
            "word": "con",
            "start": 248.24,
            "end": 248.7
          },
          {
            "word": "cùng",
            "start": 248.7,
            "end": 249.32
          },
          {
            "word": "ngã",
            "start": 249.32,
            "end": 249.78
          },
          {
            "word": "lăn",
            "start": 249.78,
            "end": 250.24
          },
          {
            "word": "đùng",
            "start": 250.24,
            "end": 250.86
          }
        ]
      },
      {
        "id": 99,
        "startTime": 250.97,
        "endTime": 251.77,
        "nextLineTime": 251.72,
        "text": "Người là bình minh",
        "words": [
          {
            "word": "Người",
            "start": 250.97,
            "end": 251.24
          },
          {
            "word": "là",
            "start": 251.24,
            "end": 251.35
          },
          {
            "word": "bình",
            "start": 251.35,
            "end": 251.56
          },
          {
            "word": "minh",
            "start": 251.56,
            "end": 251.77
          }
        ]
      },
      {
        "id": 100,
        "startTime": 251.72,
        "endTime": 252.99,
        "nextLineTime": 253.09,
        "text": "Tựa đầu nơi con dựa vào",
        "words": [
          {
            "word": "Tựa",
            "start": 251.72,
            "end": 251.93
          },
          {
            "word": "đầu",
            "start": 251.93,
            "end": 252.14
          },
          {
            "word": "nơi",
            "start": 252.14,
            "end": 252.35
          },
          {
            "word": "con",
            "start": 252.35,
            "end": 252.56
          },
          {
            "word": "dựa",
            "start": 252.56,
            "end": 252.77
          },
          {
            "word": "vào",
            "start": 252.77,
            "end": 252.98
          }
        ]
      },
      {
        "id": 101,
        "startTime": 253.09,
        "endTime": 254.57,
        "nextLineTime": 254.67,
        "text": "Bình yên đằng sau tấm lưng",
        "words": [
          {
            "word": "Bình",
            "start": 253.09,
            "end": 253.37
          },
          {
            "word": "yên",
            "start": 253.37,
            "end": 253.58
          },
          {
            "word": "đằng",
            "start": 253.58,
            "end": 253.86
          },
          {
            "word": "sau",
            "start": 253.86,
            "end": 254.07
          },
          {
            "word": "tấm",
            "start": 254.07,
            "end": 254.28
          },
          {
            "word": "lưng",
            "start": 254.28,
            "end": 254.56
          }
        ]
      },
      {
        "id": 102,
        "startTime": 254.67,
        "endTime": 256.43,
        "nextLineTime": 256.53,
        "text": "Là dịu êm ngày đầu lo lắng mai sau",
        "words": [
          {
            "word": "Là",
            "start": 254.67,
            "end": 254.81
          },
          {
            "word": "dịu",
            "start": 254.81,
            "end": 255.01
          },
          {
            "word": "êm",
            "start": 255.01,
            "end": 255.15
          },
          {
            "word": "ngày",
            "start": 255.15,
            "end": 255.42
          },
          {
            "word": "đầu",
            "start": 255.42,
            "end": 255.62
          },
          {
            "word": "lo",
            "start": 255.62,
            "end": 255.76
          },
          {
            "word": "lắng",
            "start": 255.76,
            "end": 256.03
          },
          {
            "word": "mai",
            "start": 256.03,
            "end": 256.23
          },
          {
            "word": "sau",
            "start": 256.23,
            "end": 256.43
          }
        ]
      },
      {
        "id": 103,
        "startTime": 256.53,
        "endTime": 258.01,
        "nextLineTime": 258.11,
        "text": "Đời cha nào đâu dễ",
        "words": [
          {
            "word": "Đời",
            "start": 256.53,
            "end": 256.85
          },
          {
            "word": "cha",
            "start": 256.85,
            "end": 257.17
          },
          {
            "word": "nào",
            "start": 257.17,
            "end": 257.49
          },
          {
            "word": "đâu",
            "start": 257.49,
            "end": 257.81
          },
          {
            "word": "dễ",
            "start": 257.81,
            "end": 258.02
          }
        ]
      },
      {
        "id": 104,
        "startTime": 258.11,
        "endTime": 259.62,
        "nextLineTime": 259.72,
        "text": "Nhong nhong nhong, cha làm con ngựa",
        "words": [
          {
            "word": "Nhong",
            "start": 258.11,
            "end": 258.38
          },
          {
            "word": "nhong",
            "start": 258.38,
            "end": 258.65
          },
          {
            "word": "nhong,",
            "start": 258.65,
            "end": 258.92
          },
          {
            "word": "cha",
            "start": 258.92,
            "end": 259.08
          },
          {
            "word": "làm",
            "start": 259.08,
            "end": 259.24
          },
          {
            "word": "con",
            "start": 259.24,
            "end": 259.4
          },
          {
            "word": "ngựa",
            "start": 259.4,
            "end": 259.62
          }
        ]
      },
      {
        "id": 105,
        "startTime": 259.72,
        "endTime": 261.22,
        "nextLineTime": 261.32,
        "text": "Mong cho con hạnh phúc con ơi",
        "words": [
          {
            "word": "Mong",
            "start": 259.72,
            "end": 259.98
          },
          {
            "word": "cho",
            "start": 259.98,
            "end": 260.18
          },
          {
            "word": "con",
            "start": 260.18,
            "end": 260.38
          },
          {
            "word": "hạnh",
            "start": 260.38,
            "end": 260.64
          },
          {
            "word": "phúc",
            "start": 260.64,
            "end": 260.9
          },
          {
            "word": "con",
            "start": 260.9,
            "end": 261.1
          },
          {
            "word": "ơi",
            "start": 261.1,
            "end": 261.23
          }
        ]
      },
      {
        "id": 106,
        "startTime": 261.32,
        "endTime": 262.84,
        "nextLineTime": 262.94,
        "text": "Nhong nhong nhong, cha làm con ngựa",
        "words": [
          {
            "word": "Nhong",
            "start": 261.32,
            "end": 261.59
          },
          {
            "word": "nhong",
            "start": 261.59,
            "end": 261.86
          },
          {
            "word": "nhong,",
            "start": 261.86,
            "end": 262.13
          },
          {
            "word": "cha",
            "start": 262.13,
            "end": 262.29
          },
          {
            "word": "làm",
            "start": 262.29,
            "end": 262.45
          },
          {
            "word": "con",
            "start": 262.45,
            "end": 262.61
          },
          {
            "word": "ngựa",
            "start": 262.61,
            "end": 262.83
          }
        ]
      },
      {
        "id": 107,
        "startTime": 262.94,
        "endTime": 265.45,
        "nextLineTime": 265.55,
        "text": "Để cho con nương tựa suốt đời",
        "words": [
          {
            "word": "Để",
            "start": 262.94,
            "end": 263.16
          },
          {
            "word": "cho",
            "start": 263.16,
            "end": 263.49
          },
          {
            "word": "con",
            "start": 263.49,
            "end": 263.82
          },
          {
            "word": "nương",
            "start": 263.82,
            "end": 264.37
          },
          {
            "word": "tựa",
            "start": 264.37,
            "end": 264.7
          },
          {
            "word": "suốt",
            "start": 264.7,
            "end": 265.14
          },
          {
            "word": "đời",
            "start": 265.14,
            "end": 265.47
          }
        ]
      },
      {
        "id": 108,
        "startTime": 265.55,
        "endTime": 268.31,
        "nextLineTime": 268.41,
        "text": "Để cho con được thấy yên lòng",
        "words": [
          {
            "word": "Để",
            "start": 265.55,
            "end": 265.79
          },
          {
            "word": "cho",
            "start": 265.79,
            "end": 266.15
          },
          {
            "word": "con",
            "start": 266.15,
            "end": 266.51
          },
          {
            "word": "được",
            "start": 266.51,
            "end": 266.99
          },
          {
            "word": "thấy",
            "start": 266.99,
            "end": 267.47
          },
          {
            "word": "yên",
            "start": 267.47,
            "end": 267.83
          },
          {
            "word": "lòng",
            "start": 267.83,
            "end": 268.31
          }
        ]
      },
      {
        "id": 109,
        "startTime": 268.41,
        "endTime": 271.81,
        "nextLineTime": 271.91,
        "text": "Vì đời cha con chỉ còn tấm lưng còng",
        "words": [
          {
            "word": "Vì",
            "start": 268.41,
            "end": 268.65
          },
          {
            "word": "đời",
            "start": 268.65,
            "end": 269.01
          },
          {
            "word": "cha",
            "start": 269.01,
            "end": 269.37
          },
          {
            "word": "con",
            "start": 269.37,
            "end": 269.73
          },
          {
            "word": "chỉ",
            "start": 269.73,
            "end": 270.09
          },
          {
            "word": "còn",
            "start": 270.09,
            "end": 270.45
          },
          {
            "word": "tấm",
            "start": 270.45,
            "end": 270.81
          },
          {
            "word": "lưng",
            "start": 270.81,
            "end": 271.3
          },
          {
            "word": "còng",
            "start": 271.3,
            "end": 271.79
          }
        ]
      },
      {
        "id": 110,
        "startTime": 271.91,
        "endTime": 273.14,
        "nextLineTime": 273.24,
        "text": "Nhong nhong nhong, cha làm con ngựa",
        "words": [
          {
            "word": "Nhong",
            "start": 271.91,
            "end": 272.13
          },
          {
            "word": "nhong",
            "start": 272.13,
            "end": 272.35
          },
          {
            "word": "nhong,",
            "start": 272.35,
            "end": 272.57
          },
          {
            "word": "cha",
            "start": 272.57,
            "end": 272.7
          },
          {
            "word": "làm",
            "start": 272.7,
            "end": 272.83
          },
          {
            "word": "con",
            "start": 272.83,
            "end": 272.96
          },
          {
            "word": "ngựa",
            "start": 272.96,
            "end": 273.14
          }
        ]
      },
      {
        "id": 111,
        "startTime": 273.24,
        "endTime": 274.99,
        "nextLineTime": 275.09,
        "text": "Mong cho con hạnh phúc con ơi",
        "words": [
          {
            "word": "Mong",
            "start": 273.24,
            "end": 273.54
          },
          {
            "word": "cho",
            "start": 273.54,
            "end": 273.77
          },
          {
            "word": "con",
            "start": 273.77,
            "end": 274.0
          },
          {
            "word": "hạnh",
            "start": 274.0,
            "end": 274.3
          },
          {
            "word": "phúc",
            "start": 274.3,
            "end": 274.6
          },
          {
            "word": "con",
            "start": 274.6,
            "end": 274.83
          },
          {
            "word": "ơi",
            "start": 274.83,
            "end": 274.98
          }
        ]
      },
      {
        "id": 112,
        "startTime": 275.09,
        "endTime": 276.86,
        "nextLineTime": 276.96,
        "text": "Nhong nhong nhong, cha làm con ngựa",
        "words": [
          {
            "word": "Nhong",
            "start": 275.09,
            "end": 275.41
          },
          {
            "word": "nhong",
            "start": 275.41,
            "end": 275.73
          },
          {
            "word": "nhong,",
            "start": 275.73,
            "end": 276.05
          },
          {
            "word": "cha",
            "start": 276.05,
            "end": 276.24
          },
          {
            "word": "làm",
            "start": 276.24,
            "end": 276.43
          },
          {
            "word": "con",
            "start": 276.43,
            "end": 276.62
          },
          {
            "word": "ngựa",
            "start": 276.62,
            "end": 276.87
          }
        ]
      },
      {
        "id": 113,
        "startTime": 276.96,
        "endTime": 282.56,
        "nextLineTime": 290.87,
        "text": "Để cho con nương tựa suốt đời",
        "words": [
          {
            "word": "Để",
            "start": 276.96,
            "end": 277.45
          },
          {
            "word": "cho",
            "start": 277.45,
            "end": 278.18
          },
          {
            "word": "con",
            "start": 278.18,
            "end": 278.91
          },
          {
            "word": "nương",
            "start": 278.91,
            "end": 280.13
          },
          {
            "word": "tựa",
            "start": 280.13,
            "end": 280.86
          },
          {
            "word": "suốt",
            "start": 280.86,
            "end": 281.83
          },
          {
            "word": "đời",
            "start": 281.83,
            "end": 282.56
          }
        ]
      }
    ]
  },
  {
    "id": "karaoke-com-nha",
    "filename": "CƠM NHÀ.mp3",
    "title": "Cơm Nhà",
    "artist": "Anh Trai Vượt Ngàn Chông Gai (Thai VG, JGKiD, Đông Hùng, CHARLES., Toki Thành Thỏ)",
    "duration": 331.65,
    "audioUrl": "/karaoke/karaoke-com-nha.mp3",
    "thumbUrl": "/karaoke/karaoke-com-nha.jpg",
    "lines": [
      {
        "id": 0,
        "startTime": 24.65,
        "endTime": 27.23,
        "nextLineTime": 27.33,
        "text": "Cơm nhà",
        "words": [
          {
            "word": "Cơm",
            "start": 24.65,
            "end": 25.94
          },
          {
            "word": "nhà",
            "start": 25.94,
            "end": 27.23
          }
        ]
      },
      {
        "id": 1,
        "startTime": 27.33,
        "endTime": 32.56,
        "nextLineTime": 32.66,
        "text": "Đã bao lâu ta chưa ăn cơm nhà",
        "words": [
          {
            "word": "Đã",
            "start": 27.33,
            "end": 27.81
          },
          {
            "word": "bao",
            "start": 27.81,
            "end": 28.52
          },
          {
            "word": "lâu",
            "start": 28.52,
            "end": 29.23
          },
          {
            "word": "ta",
            "start": 29.23,
            "end": 29.71
          },
          {
            "word": "chưa",
            "start": 29.71,
            "end": 30.66
          },
          {
            "word": "ăn",
            "start": 30.66,
            "end": 31.14
          },
          {
            "word": "cơm",
            "start": 31.14,
            "end": 31.85
          },
          {
            "word": "nhà",
            "start": 31.85,
            "end": 32.56
          }
        ]
      },
      {
        "id": 2,
        "startTime": 32.66,
        "endTime": 37.89,
        "nextLineTime": 37.99,
        "text": "Vị canh khi xưa chan lên dưa cà",
        "words": [
          {
            "word": "Vị",
            "start": 32.66,
            "end": 33.1
          },
          {
            "word": "canh",
            "start": 33.1,
            "end": 33.97
          },
          {
            "word": "khi",
            "start": 33.97,
            "end": 34.62
          },
          {
            "word": "xưa",
            "start": 34.62,
            "end": 35.27
          },
          {
            "word": "chan",
            "start": 35.27,
            "end": 36.14
          },
          {
            "word": "lên",
            "start": 36.14,
            "end": 36.79
          },
          {
            "word": "dưa",
            "start": 36.79,
            "end": 37.44
          },
          {
            "word": "cà",
            "start": 37.44,
            "end": 37.88
          }
        ]
      },
      {
        "id": 3,
        "startTime": 37.99,
        "endTime": 42.99,
        "nextLineTime": 43.09,
        "text": "Mẹ bắt ta ăn nhiều rau nhiều cá",
        "words": [
          {
            "word": "Mẹ",
            "start": 37.99,
            "end": 38.41
          },
          {
            "word": "bắt",
            "start": 38.41,
            "end": 39.03
          },
          {
            "word": "ta",
            "start": 39.03,
            "end": 39.45
          },
          {
            "word": "ăn",
            "start": 39.45,
            "end": 39.87
          },
          {
            "word": "nhiều",
            "start": 39.87,
            "end": 40.91
          },
          {
            "word": "rau",
            "start": 40.91,
            "end": 41.53
          },
          {
            "word": "nhiều",
            "start": 41.53,
            "end": 42.57
          },
          {
            "word": "cá",
            "start": 42.57,
            "end": 42.99
          }
        ]
      },
      {
        "id": 4,
        "startTime": 43.09,
        "endTime": 45.64,
        "nextLineTime": 45.74,
        "text": "Cũng qua lâu rồi",
        "words": [
          {
            "word": "Cũng",
            "start": 43.09,
            "end": 43.87
          },
          {
            "word": "qua",
            "start": 43.87,
            "end": 44.46
          },
          {
            "word": "lâu",
            "start": 44.46,
            "end": 45.05
          },
          {
            "word": "rồi",
            "start": 45.05,
            "end": 45.64
          }
        ]
      },
      {
        "id": 5,
        "startTime": 45.74,
        "endTime": 48.31,
        "nextLineTime": 48.41,
        "text": "Cơm nhà",
        "words": [
          {
            "word": "Cơm",
            "start": 45.74,
            "end": 47.02
          },
          {
            "word": "nhà",
            "start": 47.02,
            "end": 48.3
          }
        ]
      },
      {
        "id": 6,
        "startTime": 48.41,
        "endTime": 53.08,
        "nextLineTime": 53.18,
        "text": "Tuổi thơ rong chơi ta thường mơ xa",
        "words": [
          {
            "word": "Tuổi",
            "start": 48.41,
            "end": 49.1
          },
          {
            "word": "thơ",
            "start": 49.1,
            "end": 49.62
          },
          {
            "word": "rong",
            "start": 49.62,
            "end": 50.31
          },
          {
            "word": "chơi",
            "start": 50.31,
            "end": 51.0
          },
          {
            "word": "ta",
            "start": 51.0,
            "end": 51.35
          },
          {
            "word": "thường",
            "start": 51.35,
            "end": 52.39
          },
          {
            "word": "mơ",
            "start": 52.39,
            "end": 52.74
          },
          {
            "word": "xa",
            "start": 52.74,
            "end": 53.09
          }
        ]
      },
      {
        "id": 7,
        "startTime": 53.18,
        "endTime": 57.32,
        "nextLineTime": 57.42,
        "text": "Thời xuân ai chẳng miệt mài bôn ba",
        "words": [
          {
            "word": "Thời",
            "start": 53.18,
            "end": 53.79
          },
          {
            "word": "xuân",
            "start": 53.79,
            "end": 54.4
          },
          {
            "word": "ai",
            "start": 54.4,
            "end": 54.71
          },
          {
            "word": "chẳng",
            "start": 54.71,
            "end": 55.48
          },
          {
            "word": "miệt",
            "start": 55.48,
            "end": 56.09
          },
          {
            "word": "mài",
            "start": 56.09,
            "end": 56.55
          },
          {
            "word": "bôn",
            "start": 56.55,
            "end": 57.01
          },
          {
            "word": "ba",
            "start": 57.01,
            "end": 57.32
          }
        ]
      },
      {
        "id": 8,
        "startTime": 57.42,
        "endTime": 59.45,
        "nextLineTime": 59.55,
        "text": "Đến khi mệt nhoài",
        "words": [
          {
            "word": "Đến",
            "start": 57.42,
            "end": 57.86
          },
          {
            "word": "khi",
            "start": 57.86,
            "end": 58.3
          },
          {
            "word": "mệt",
            "start": 58.3,
            "end": 58.73
          },
          {
            "word": "nhoài",
            "start": 58.73,
            "end": 59.45
          }
        ]
      },
      {
        "id": 9,
        "startTime": 59.55,
        "endTime": 65.15,
        "nextLineTime": 65.94,
        "text": "Mới quay về nhà, oh oh",
        "words": [
          {
            "word": "Mới",
            "start": 59.55,
            "end": 60.6
          },
          {
            "word": "quay",
            "start": 60.6,
            "end": 62.0
          },
          {
            "word": "về",
            "start": 62.0,
            "end": 62.7
          },
          {
            "word": "nhà,",
            "start": 62.7,
            "end": 63.75
          },
          {
            "word": "oh",
            "start": 63.75,
            "end": 64.45
          },
          {
            "word": "oh",
            "start": 64.45,
            "end": 65.15
          }
        ]
      },
      {
        "id": 10,
        "startTime": 65.94,
        "endTime": 69.0,
        "nextLineTime": 69.1,
        "text": "Cơm nhà",
        "words": [
          {
            "word": "Cơm",
            "start": 65.94,
            "end": 67.47
          },
          {
            "word": "nhà",
            "start": 67.47,
            "end": 69.0
          }
        ]
      },
      {
        "id": 11,
        "startTime": 69.1,
        "endTime": 73.82,
        "nextLineTime": 73.92,
        "text": "Mẹ ơi giờ con lại nhớ cơm nhà",
        "words": [
          {
            "word": "Mẹ",
            "start": 69.1,
            "end": 69.53
          },
          {
            "word": "ơi",
            "start": 69.53,
            "end": 69.96
          },
          {
            "word": "giờ",
            "start": 69.96,
            "end": 70.6
          },
          {
            "word": "con",
            "start": 70.6,
            "end": 71.24
          },
          {
            "word": "lại",
            "start": 71.24,
            "end": 71.88
          },
          {
            "word": "nhớ",
            "start": 71.88,
            "end": 72.52
          },
          {
            "word": "cơm",
            "start": 72.52,
            "end": 73.16
          },
          {
            "word": "nhà",
            "start": 73.16,
            "end": 73.8
          }
        ]
      },
      {
        "id": 12,
        "startTime": 73.92,
        "endTime": 78.6,
        "nextLineTime": 78.7,
        "text": "Thịt quay còn thơm mùi mỡ năm nào",
        "words": [
          {
            "word": "Thịt",
            "start": 73.92,
            "end": 74.64
          },
          {
            "word": "quay",
            "start": 74.64,
            "end": 75.36
          },
          {
            "word": "còn",
            "start": 75.36,
            "end": 75.9
          },
          {
            "word": "thơm",
            "start": 75.9,
            "end": 76.62
          },
          {
            "word": "mùi",
            "start": 76.62,
            "end": 77.16
          },
          {
            "word": "mỡ",
            "start": 77.16,
            "end": 77.52
          },
          {
            "word": "năm",
            "start": 77.52,
            "end": 78.06
          },
          {
            "word": "nào",
            "start": 78.06,
            "end": 78.6
          }
        ]
      },
      {
        "id": 13,
        "startTime": 78.7,
        "endTime": 84.3,
        "nextLineTime": 87.04,
        "text": "Quyện thêm mùi hương canh cua cà pháo",
        "words": [
          {
            "word": "Quyện",
            "start": 78.7,
            "end": 79.63
          },
          {
            "word": "thêm",
            "start": 79.63,
            "end": 80.38
          },
          {
            "word": "mùi",
            "start": 80.38,
            "end": 80.94
          },
          {
            "word": "hương",
            "start": 80.94,
            "end": 81.87
          },
          {
            "word": "canh",
            "start": 81.87,
            "end": 82.62
          },
          {
            "word": "cua",
            "start": 82.62,
            "end": 83.18
          },
          {
            "word": "cà",
            "start": 83.18,
            "end": 83.55
          },
          {
            "word": "pháo",
            "start": 83.55,
            "end": 84.3
          }
        ]
      },
      {
        "id": 14,
        "startTime": 87.04,
        "endTime": 89.09,
        "nextLineTime": 89.19,
        "text": "Cơm nhà",
        "words": [
          {
            "word": "Cơm",
            "start": 87.04,
            "end": 88.06
          },
          {
            "word": "nhà",
            "start": 88.06,
            "end": 89.08
          }
        ]
      },
      {
        "id": 15,
        "startTime": 89.19,
        "endTime": 93.31,
        "nextLineTime": 93.41,
        "text": "Giờ con nguyện đi vòng quanh thế gian",
        "words": [
          {
            "word": "Giờ",
            "start": 89.19,
            "end": 89.6
          },
          {
            "word": "con",
            "start": 89.6,
            "end": 90.01
          },
          {
            "word": "nguyện",
            "start": 90.01,
            "end": 90.83
          },
          {
            "word": "đi",
            "start": 90.83,
            "end": 91.1
          },
          {
            "word": "vòng",
            "start": 91.1,
            "end": 91.65
          },
          {
            "word": "quanh",
            "start": 91.65,
            "end": 92.34
          },
          {
            "word": "thế",
            "start": 92.34,
            "end": 92.75
          },
          {
            "word": "gian",
            "start": 92.75,
            "end": 93.3
          }
        ]
      },
      {
        "id": 16,
        "startTime": 93.41,
        "endTime": 99.01,
        "nextLineTime": 99.79,
        "text": "Để xin một chén cơm nhà còn ấm",
        "words": [
          {
            "word": "Để",
            "start": 93.41,
            "end": 93.9
          },
          {
            "word": "xin",
            "start": 93.9,
            "end": 94.63
          },
          {
            "word": "một",
            "start": 94.63,
            "end": 95.36
          },
          {
            "word": "chén",
            "start": 95.36,
            "end": 96.33
          },
          {
            "word": "cơm",
            "start": 96.33,
            "end": 97.06
          },
          {
            "word": "nhà",
            "start": 97.06,
            "end": 97.79
          },
          {
            "word": "còn",
            "start": 97.79,
            "end": 98.52
          },
          {
            "word": "ấm",
            "start": 98.52,
            "end": 99.01
          }
        ]
      },
      {
        "id": 17,
        "startTime": 99.79,
        "endTime": 102.38,
        "nextLineTime": 102.48,
        "text": "Vì dù đời con đắng cay thăng trầm",
        "words": [
          {
            "word": "Vì",
            "start": 99.79,
            "end": 99.99
          },
          {
            "word": "dù",
            "start": 99.99,
            "end": 100.19
          },
          {
            "word": "đời",
            "start": 100.19,
            "end": 100.49
          },
          {
            "word": "con",
            "start": 100.49,
            "end": 100.79
          },
          {
            "word": "đắng",
            "start": 100.79,
            "end": 101.19
          },
          {
            "word": "cay",
            "start": 101.19,
            "end": 101.49
          },
          {
            "word": "thăng",
            "start": 101.49,
            "end": 101.99
          },
          {
            "word": "trầm",
            "start": 101.99,
            "end": 102.39
          }
        ]
      },
      {
        "id": 18,
        "startTime": 102.48,
        "endTime": 103.97,
        "nextLineTime": 104.07,
        "text": "Làm sao so với",
        "words": [
          {
            "word": "Làm",
            "start": 102.48,
            "end": 102.89
          },
          {
            "word": "sao",
            "start": 102.89,
            "end": 103.3
          },
          {
            "word": "so",
            "start": 103.3,
            "end": 103.57
          },
          {
            "word": "với",
            "start": 103.57,
            "end": 103.98
          }
        ]
      },
      {
        "id": 19,
        "startTime": 104.07,
        "endTime": 106.13,
        "nextLineTime": 106.23,
        "text": "Những ân cần quan tâm",
        "words": [
          {
            "word": "Những",
            "start": 104.07,
            "end": 104.68
          },
          {
            "word": "ân",
            "start": 104.68,
            "end": 104.92
          },
          {
            "word": "cần",
            "start": 104.92,
            "end": 105.28
          },
          {
            "word": "quan",
            "start": 105.28,
            "end": 105.76
          },
          {
            "word": "tâm",
            "start": 105.76,
            "end": 106.12
          }
        ]
      },
      {
        "id": 20,
        "startTime": 106.23,
        "endTime": 111.83,
        "nextLineTime": 128.5,
        "text": "Gửi trong mâm cơm nhà",
        "words": [
          {
            "word": "Gửi",
            "start": 106.23,
            "end": 107.22
          },
          {
            "word": "trong",
            "start": 107.22,
            "end": 108.87
          },
          {
            "word": "mâm",
            "start": 108.87,
            "end": 109.86
          },
          {
            "word": "cơm",
            "start": 109.86,
            "end": 110.85
          },
          {
            "word": "nhà",
            "start": 110.85,
            "end": 111.84
          }
        ]
      },
      {
        "id": 21,
        "startTime": 128.5,
        "endTime": 130.24,
        "nextLineTime": 130.34,
        "text": "Anh lớn lên bằng bữa cơm của mẹ",
        "words": [
          {
            "word": "Anh",
            "start": 128.5,
            "end": 128.72
          },
          {
            "word": "lớn",
            "start": 128.72,
            "end": 128.94
          },
          {
            "word": "lên",
            "start": 128.94,
            "end": 129.16
          },
          {
            "word": "bằng",
            "start": 129.16,
            "end": 129.45
          },
          {
            "word": "bữa",
            "start": 129.45,
            "end": 129.67
          },
          {
            "word": "cơm",
            "start": 129.67,
            "end": 129.89
          },
          {
            "word": "của",
            "start": 129.89,
            "end": 130.11
          },
          {
            "word": "mẹ",
            "start": 130.11,
            "end": 130.26
          }
        ]
      },
      {
        "id": 22,
        "startTime": 130.34,
        "endTime": 133.17,
        "nextLineTime": 133.27,
        "text": "Và trong gia đình thiếu bóng người cha",
        "words": [
          {
            "word": "Và",
            "start": 130.34,
            "end": 130.52
          },
          {
            "word": "trong",
            "start": 130.52,
            "end": 130.98
          },
          {
            "word": "gia",
            "start": 130.98,
            "end": 131.25
          },
          {
            "word": "đình",
            "start": 131.25,
            "end": 131.62
          },
          {
            "word": "thiếu",
            "start": 131.62,
            "end": 132.08
          },
          {
            "word": "bóng",
            "start": 132.08,
            "end": 132.45
          },
          {
            "word": "người",
            "start": 132.45,
            "end": 132.91
          },
          {
            "word": "cha",
            "start": 132.91,
            "end": 133.18
          }
        ]
      },
      {
        "id": 23,
        "startTime": 133.27,
        "endTime": 134.07,
        "nextLineTime": 134.06,
        "text": "Bữa cơm của mẹ",
        "words": [
          {
            "word": "Bữa",
            "start": 133.27,
            "end": 133.49
          },
          {
            "word": "cơm",
            "start": 133.49,
            "end": 133.71
          },
          {
            "word": "của",
            "start": 133.71,
            "end": 133.93
          },
          {
            "word": "mẹ",
            "start": 133.93,
            "end": 134.08
          }
        ]
      },
      {
        "id": 24,
        "startTime": 134.06,
        "endTime": 135.29,
        "nextLineTime": 135.39,
        "text": "Lúc nào cũng vội vã",
        "words": [
          {
            "word": "Lúc",
            "start": 134.06,
            "end": 134.31
          },
          {
            "word": "nào",
            "start": 134.31,
            "end": 134.56
          },
          {
            "word": "cũng",
            "start": 134.56,
            "end": 134.89
          },
          {
            "word": "vội",
            "start": 134.89,
            "end": 135.14
          },
          {
            "word": "vã",
            "start": 135.14,
            "end": 135.3
          }
        ]
      },
      {
        "id": 25,
        "startTime": 135.39,
        "endTime": 136.62,
        "nextLineTime": 136.72,
        "text": "Vì mẹ phải gánh vác",
        "words": [
          {
            "word": "Vì",
            "start": 135.39,
            "end": 135.55
          },
          {
            "word": "mẹ",
            "start": 135.55,
            "end": 135.71
          },
          {
            "word": "phải",
            "start": 135.71,
            "end": 136.04
          },
          {
            "word": "gánh",
            "start": 136.04,
            "end": 136.37
          },
          {
            "word": "vác",
            "start": 136.37,
            "end": 136.62
          }
        ]
      },
      {
        "id": 26,
        "startTime": 136.72,
        "endTime": 138.21,
        "nextLineTime": 138.31,
        "text": "Luôn cả phần ba",
        "words": [
          {
            "word": "Luôn",
            "start": 136.72,
            "end": 137.22
          },
          {
            "word": "cả",
            "start": 137.22,
            "end": 137.47
          },
          {
            "word": "phần",
            "start": 137.47,
            "end": 137.97
          },
          {
            "word": "ba",
            "start": 137.97,
            "end": 138.22
          }
        ]
      },
      {
        "id": 27,
        "startTime": 138.31,
        "endTime": 140.98,
        "nextLineTime": 141.08,
        "text": "Cơm nhà là một điều quý giá",
        "words": [
          {
            "word": "Cơm",
            "start": 138.31,
            "end": 138.69
          },
          {
            "word": "nhà",
            "start": 138.69,
            "end": 139.07
          },
          {
            "word": "là",
            "start": 139.07,
            "end": 139.32
          },
          {
            "word": "một",
            "start": 139.32,
            "end": 139.7
          },
          {
            "word": "điều",
            "start": 139.7,
            "end": 140.21
          },
          {
            "word": "quý",
            "start": 140.21,
            "end": 140.59
          },
          {
            "word": "giá",
            "start": 140.59,
            "end": 140.97
          }
        ]
      },
      {
        "id": 28,
        "startTime": 141.08,
        "endTime": 143.4,
        "nextLineTime": 143.5,
        "text": "Ta đâu nhận ra suốt thời gian qua",
        "words": [
          {
            "word": "Ta",
            "start": 141.08,
            "end": 141.26
          },
          {
            "word": "đâu",
            "start": 141.26,
            "end": 141.53
          },
          {
            "word": "nhận",
            "start": 141.53,
            "end": 141.89
          },
          {
            "word": "ra",
            "start": 141.89,
            "end": 142.07
          },
          {
            "word": "suốt",
            "start": 142.07,
            "end": 142.43
          },
          {
            "word": "thời",
            "start": 142.43,
            "end": 142.79
          },
          {
            "word": "gian",
            "start": 142.79,
            "end": 143.15
          },
          {
            "word": "qua",
            "start": 143.15,
            "end": 143.42
          }
        ]
      },
      {
        "id": 29,
        "startTime": 143.5,
        "endTime": 145.81,
        "nextLineTime": 145.91,
        "text": "Xa biệt nơi chôn nhau cắt rốn",
        "words": [
          {
            "word": "Xa",
            "start": 143.5,
            "end": 143.7
          },
          {
            "word": "biệt",
            "start": 143.7,
            "end": 144.1
          },
          {
            "word": "nơi",
            "start": 144.1,
            "end": 144.4
          },
          {
            "word": "chôn",
            "start": 144.4,
            "end": 144.8
          },
          {
            "word": "nhau",
            "start": 144.8,
            "end": 145.2
          },
          {
            "word": "cắt",
            "start": 145.2,
            "end": 145.5
          },
          {
            "word": "rốn",
            "start": 145.5,
            "end": 145.8
          }
        ]
      },
      {
        "id": 30,
        "startTime": 145.91,
        "endTime": 147.0,
        "nextLineTime": 147.1,
        "text": "Quay về đây",
        "words": [
          {
            "word": "Quay",
            "start": 145.91,
            "end": 146.39
          },
          {
            "word": "về",
            "start": 146.39,
            "end": 146.63
          },
          {
            "word": "đây",
            "start": 146.63,
            "end": 146.99
          }
        ]
      },
      {
        "id": 31,
        "startTime": 147.1,
        "endTime": 150.43,
        "nextLineTime": 150.53,
        "text": "Để ta tìm thấy quê nhà",
        "words": [
          {
            "word": "Để",
            "start": 147.1,
            "end": 147.49
          },
          {
            "word": "ta",
            "start": 147.49,
            "end": 147.88
          },
          {
            "word": "tìm",
            "start": 147.88,
            "end": 148.47
          },
          {
            "word": "thấy",
            "start": 148.47,
            "end": 149.25
          },
          {
            "word": "quê",
            "start": 149.25,
            "end": 149.84
          },
          {
            "word": "nhà",
            "start": 149.84,
            "end": 150.43
          }
        ]
      },
      {
        "id": 32,
        "startTime": 150.53,
        "endTime": 152.41,
        "nextLineTime": 152.51,
        "text": "Lại một lần nữa giữa bữa tiệc tàn",
        "words": [
          {
            "word": "Lại",
            "start": 150.53,
            "end": 150.75
          },
          {
            "word": "một",
            "start": 150.75,
            "end": 150.97
          },
          {
            "word": "lần",
            "start": 150.97,
            "end": 151.19
          },
          {
            "word": "nữa",
            "start": 151.19,
            "end": 151.41
          },
          {
            "word": "giữa",
            "start": 151.41,
            "end": 151.7
          },
          {
            "word": "bữa",
            "start": 151.7,
            "end": 151.92
          },
          {
            "word": "tiệc",
            "start": 151.92,
            "end": 152.21
          },
          {
            "word": "tàn",
            "start": 152.21,
            "end": 152.43
          }
        ]
      },
      {
        "id": 33,
        "startTime": 152.51,
        "endTime": 154.83,
        "nextLineTime": 154.93,
        "text": "Họ đã về hết chỉ có riêng con",
        "words": [
          {
            "word": "Họ",
            "start": 152.51,
            "end": 152.72
          },
          {
            "word": "đã",
            "start": 152.72,
            "end": 152.93
          },
          {
            "word": "về",
            "start": 152.93,
            "end": 153.14
          },
          {
            "word": "hết",
            "start": 153.14,
            "end": 153.46
          },
          {
            "word": "chỉ",
            "start": 153.46,
            "end": 153.78
          },
          {
            "word": "có",
            "start": 153.78,
            "end": 153.99
          },
          {
            "word": "riêng",
            "start": 153.99,
            "end": 154.52
          },
          {
            "word": "con",
            "start": 154.52,
            "end": 154.84
          }
        ]
      },
      {
        "id": 34,
        "startTime": 154.93,
        "endTime": 157.22,
        "nextLineTime": 157.32,
        "text": "Một mình ở giữa, giữa những chênh vênh",
        "words": [
          {
            "word": "Một",
            "start": 154.93,
            "end": 155.15
          },
          {
            "word": "mình",
            "start": 155.15,
            "end": 155.45
          },
          {
            "word": "ở",
            "start": 155.45,
            "end": 155.6
          },
          {
            "word": "giữa,",
            "start": 155.6,
            "end": 155.9
          },
          {
            "word": "giữa",
            "start": 155.9,
            "end": 156.2
          },
          {
            "word": "những",
            "start": 156.2,
            "end": 156.57
          },
          {
            "word": "chênh",
            "start": 156.57,
            "end": 156.94
          },
          {
            "word": "vênh",
            "start": 156.94,
            "end": 157.24
          }
        ]
      },
      {
        "id": 35,
        "startTime": 157.32,
        "endTime": 158.82,
        "nextLineTime": 158.92,
        "text": "Đời mình thì lênh đênh vô bờ",
        "words": [
          {
            "word": "Đời",
            "start": 157.32,
            "end": 157.52
          },
          {
            "word": "mình",
            "start": 157.52,
            "end": 157.79
          },
          {
            "word": "thì",
            "start": 157.79,
            "end": 157.99
          },
          {
            "word": "lênh",
            "start": 157.99,
            "end": 158.26
          },
          {
            "word": "đênh",
            "start": 158.26,
            "end": 158.53
          },
          {
            "word": "vô",
            "start": 158.53,
            "end": 158.67
          },
          {
            "word": "bờ",
            "start": 158.67,
            "end": 158.81
          }
        ]
      },
      {
        "id": 36,
        "startTime": 158.92,
        "endTime": 161.61,
        "nextLineTime": 161.71,
        "text": "Giờ đây con chỉ muốn về nhà",
        "words": [
          {
            "word": "Giờ",
            "start": 158.92,
            "end": 159.3
          },
          {
            "word": "đây",
            "start": 159.3,
            "end": 159.68
          },
          {
            "word": "con",
            "start": 159.68,
            "end": 160.06
          },
          {
            "word": "chỉ",
            "start": 160.06,
            "end": 160.44
          },
          {
            "word": "muốn",
            "start": 160.44,
            "end": 160.95
          },
          {
            "word": "về",
            "start": 160.95,
            "end": 161.21
          },
          {
            "word": "nhà",
            "start": 161.21,
            "end": 161.59
          }
        ]
      },
      {
        "id": 37,
        "startTime": 161.71,
        "endTime": 164.0,
        "nextLineTime": 164.1,
        "text": "Dù con biết đã chẳng thế nào",
        "words": [
          {
            "word": "Dù",
            "start": 161.71,
            "end": 161.92
          },
          {
            "word": "con",
            "start": 161.92,
            "end": 162.23
          },
          {
            "word": "biết",
            "start": 162.23,
            "end": 162.65
          },
          {
            "word": "đã",
            "start": 162.65,
            "end": 162.86
          },
          {
            "word": "chẳng",
            "start": 162.86,
            "end": 163.38
          },
          {
            "word": "thế",
            "start": 163.38,
            "end": 163.69
          },
          {
            "word": "nào",
            "start": 163.69,
            "end": 164.0
          }
        ]
      },
      {
        "id": 38,
        "startTime": 164.1,
        "endTime": 169.57,
        "nextLineTime": 169.67,
        "text": "Mong ước đó vẫn sẽ vỗ về con",
        "words": [
          {
            "word": "Mong",
            "start": 164.1,
            "end": 165.14
          },
          {
            "word": "ước",
            "start": 165.14,
            "end": 165.92
          },
          {
            "word": "đó",
            "start": 165.92,
            "end": 166.44
          },
          {
            "word": "vẫn",
            "start": 166.44,
            "end": 167.22
          },
          {
            "word": "sẽ",
            "start": 167.22,
            "end": 167.74
          },
          {
            "word": "vỗ",
            "start": 167.74,
            "end": 168.26
          },
          {
            "word": "về",
            "start": 168.26,
            "end": 168.78
          },
          {
            "word": "con",
            "start": 168.78,
            "end": 169.56
          }
        ]
      },
      {
        "id": 39,
        "startTime": 169.67,
        "endTime": 171.71,
        "nextLineTime": 171.81,
        "text": "Cơm nhà",
        "words": [
          {
            "word": "Cơm",
            "start": 169.67,
            "end": 170.69
          },
          {
            "word": "nhà",
            "start": 170.69,
            "end": 171.71
          }
        ]
      },
      {
        "id": 40,
        "startTime": 171.81,
        "endTime": 177.02,
        "nextLineTime": 177.12,
        "text": "Mẹ ơi giờ con lại nhớ cơm nhà",
        "words": [
          {
            "word": "Mẹ",
            "start": 171.81,
            "end": 172.28
          },
          {
            "word": "ơi",
            "start": 172.28,
            "end": 172.75
          },
          {
            "word": "giờ",
            "start": 172.75,
            "end": 173.46
          },
          {
            "word": "con",
            "start": 173.46,
            "end": 174.17
          },
          {
            "word": "lại",
            "start": 174.17,
            "end": 174.88
          },
          {
            "word": "nhớ",
            "start": 174.88,
            "end": 175.59
          },
          {
            "word": "cơm",
            "start": 175.59,
            "end": 176.3
          },
          {
            "word": "nhà",
            "start": 176.3,
            "end": 177.01
          }
        ]
      },
      {
        "id": 41,
        "startTime": 177.12,
        "endTime": 182.34,
        "nextLineTime": 182.44,
        "text": "Thịt quay còn thơm mùi mỡ năm nào",
        "words": [
          {
            "word": "Thịt",
            "start": 177.12,
            "end": 177.92
          },
          {
            "word": "quay",
            "start": 177.92,
            "end": 178.72
          },
          {
            "word": "còn",
            "start": 178.72,
            "end": 179.32
          },
          {
            "word": "thơm",
            "start": 179.32,
            "end": 180.12
          },
          {
            "word": "mùi",
            "start": 180.12,
            "end": 180.72
          },
          {
            "word": "mỡ",
            "start": 180.72,
            "end": 181.12
          },
          {
            "word": "năm",
            "start": 181.12,
            "end": 181.72
          },
          {
            "word": "nào",
            "start": 181.72,
            "end": 182.32
          }
        ]
      },
      {
        "id": 42,
        "startTime": 182.44,
        "endTime": 188.04,
        "nextLineTime": 189.86,
        "text": "Quyện thêm mùi hương canh cua cà pháo",
        "words": [
          {
            "word": "Quyện",
            "start": 182.44,
            "end": 183.37
          },
          {
            "word": "thêm",
            "start": 183.37,
            "end": 184.12
          },
          {
            "word": "mùi",
            "start": 184.12,
            "end": 184.68
          },
          {
            "word": "hương",
            "start": 184.68,
            "end": 185.61
          },
          {
            "word": "canh",
            "start": 185.61,
            "end": 186.36
          },
          {
            "word": "cua",
            "start": 186.36,
            "end": 186.92
          },
          {
            "word": "cà",
            "start": 186.92,
            "end": 187.29
          },
          {
            "word": "pháo",
            "start": 187.29,
            "end": 188.04
          }
        ]
      },
      {
        "id": 43,
        "startTime": 189.86,
        "endTime": 192.96,
        "nextLineTime": 193.06,
        "text": "Cơm nhà",
        "words": [
          {
            "word": "Cơm",
            "start": 189.86,
            "end": 191.41
          },
          {
            "word": "nhà",
            "start": 191.41,
            "end": 192.96
          }
        ]
      },
      {
        "id": 44,
        "startTime": 193.06,
        "endTime": 196.12,
        "nextLineTime": 196.22,
        "text": "Giờ con nguyện đi vòng quanh thế gian",
        "words": [
          {
            "word": "Giờ",
            "start": 193.06,
            "end": 193.37
          },
          {
            "word": "con",
            "start": 193.37,
            "end": 193.68
          },
          {
            "word": "nguyện",
            "start": 193.68,
            "end": 194.29
          },
          {
            "word": "đi",
            "start": 194.29,
            "end": 194.49
          },
          {
            "word": "vòng",
            "start": 194.49,
            "end": 194.9
          },
          {
            "word": "quanh",
            "start": 194.9,
            "end": 195.41
          },
          {
            "word": "thế",
            "start": 195.41,
            "end": 195.72
          },
          {
            "word": "gian",
            "start": 195.72,
            "end": 196.13
          }
        ]
      },
      {
        "id": 45,
        "startTime": 196.22,
        "endTime": 201.82,
        "nextLineTime": 202.41,
        "text": "Để xin một chén cơm nhà còn ấm",
        "words": [
          {
            "word": "Để",
            "start": 196.22,
            "end": 196.71
          },
          {
            "word": "xin",
            "start": 196.71,
            "end": 197.44
          },
          {
            "word": "một",
            "start": 197.44,
            "end": 198.17
          },
          {
            "word": "chén",
            "start": 198.17,
            "end": 199.14
          },
          {
            "word": "cơm",
            "start": 199.14,
            "end": 199.87
          },
          {
            "word": "nhà",
            "start": 199.87,
            "end": 200.6
          },
          {
            "word": "còn",
            "start": 200.6,
            "end": 201.33
          },
          {
            "word": "ấm",
            "start": 201.33,
            "end": 201.82
          }
        ]
      },
      {
        "id": 46,
        "startTime": 202.41,
        "endTime": 205.47,
        "nextLineTime": 205.57,
        "text": "Vì dù đời con đắng cay thăng trầm",
        "words": [
          {
            "word": "Vì",
            "start": 202.41,
            "end": 202.65
          },
          {
            "word": "dù",
            "start": 202.65,
            "end": 202.89
          },
          {
            "word": "đời",
            "start": 202.89,
            "end": 203.24
          },
          {
            "word": "con",
            "start": 203.24,
            "end": 203.59
          },
          {
            "word": "đắng",
            "start": 203.59,
            "end": 204.06
          },
          {
            "word": "cay",
            "start": 204.06,
            "end": 204.41
          },
          {
            "word": "thăng",
            "start": 204.41,
            "end": 205.0
          },
          {
            "word": "trầm",
            "start": 205.0,
            "end": 205.47
          }
        ]
      },
      {
        "id": 47,
        "startTime": 205.57,
        "endTime": 206.56,
        "nextLineTime": 206.66,
        "text": "Làm sao so với",
        "words": [
          {
            "word": "Làm",
            "start": 205.57,
            "end": 205.84
          },
          {
            "word": "sao",
            "start": 205.84,
            "end": 206.11
          },
          {
            "word": "so",
            "start": 206.11,
            "end": 206.29
          },
          {
            "word": "với",
            "start": 206.29,
            "end": 206.56
          }
        ]
      },
      {
        "id": 48,
        "startTime": 206.66,
        "endTime": 209.75,
        "nextLineTime": 209.85,
        "text": "Những ân cần quan tâm",
        "words": [
          {
            "word": "Những",
            "start": 206.66,
            "end": 207.57
          },
          {
            "word": "ân",
            "start": 207.57,
            "end": 207.93
          },
          {
            "word": "cần",
            "start": 207.93,
            "end": 208.48
          },
          {
            "word": "quan",
            "start": 208.48,
            "end": 209.21
          },
          {
            "word": "tâm",
            "start": 209.21,
            "end": 209.76
          }
        ]
      },
      {
        "id": 49,
        "startTime": 209.85,
        "endTime": 211.86,
        "nextLineTime": 211.96,
        "text": "Gửi trong mâm cơm nhà",
        "words": [
          {
            "word": "Gửi",
            "start": 209.85,
            "end": 210.2
          },
          {
            "word": "trong",
            "start": 210.2,
            "end": 210.79
          },
          {
            "word": "mâm",
            "start": 210.79,
            "end": 211.14
          },
          {
            "word": "cơm",
            "start": 211.14,
            "end": 211.49
          },
          {
            "word": "nhà",
            "start": 211.49,
            "end": 211.84
          }
        ]
      },
      {
        "id": 50,
        "startTime": 211.96,
        "endTime": 214.0,
        "nextLineTime": 214.1,
        "text": "Mẹ là giấc mơ bao la",
        "words": [
          {
            "word": "Mẹ",
            "start": 211.96,
            "end": 212.23
          },
          {
            "word": "là",
            "start": 212.23,
            "end": 212.5
          },
          {
            "word": "giấc",
            "start": 212.5,
            "end": 213.04
          },
          {
            "word": "mơ",
            "start": 213.04,
            "end": 213.31
          },
          {
            "word": "bao",
            "start": 213.31,
            "end": 213.72
          },
          {
            "word": "la",
            "start": 213.72,
            "end": 213.99
          }
        ]
      },
      {
        "id": 51,
        "startTime": 214.1,
        "endTime": 216.69,
        "nextLineTime": 216.79,
        "text": "Hiền hòa giống như hôm qua",
        "words": [
          {
            "word": "Hiền",
            "start": 214.1,
            "end": 214.59
          },
          {
            "word": "hòa",
            "start": 214.59,
            "end": 214.96
          },
          {
            "word": "giống",
            "start": 214.96,
            "end": 215.58
          },
          {
            "word": "như",
            "start": 215.58,
            "end": 215.95
          },
          {
            "word": "hôm",
            "start": 215.95,
            "end": 216.32
          },
          {
            "word": "qua",
            "start": 216.32,
            "end": 216.69
          }
        ]
      },
      {
        "id": 52,
        "startTime": 216.79,
        "endTime": 218.29,
        "nextLineTime": 218.39,
        "text": "Mẹ là mùi hương ấy",
        "words": [
          {
            "word": "Mẹ",
            "start": 216.79,
            "end": 217.0
          },
          {
            "word": "là",
            "start": 217.0,
            "end": 217.21
          },
          {
            "word": "mùi",
            "start": 217.21,
            "end": 217.53
          },
          {
            "word": "hương",
            "start": 217.53,
            "end": 218.07
          },
          {
            "word": "ấy",
            "start": 218.07,
            "end": 218.28
          }
        ]
      },
      {
        "id": 53,
        "startTime": 218.39,
        "endTime": 219.5,
        "nextLineTime": 219.6,
        "text": "Mùi vị năm xưa đấy",
        "words": [
          {
            "word": "Mùi",
            "start": 218.39,
            "end": 218.63
          },
          {
            "word": "vị",
            "start": 218.63,
            "end": 218.79
          },
          {
            "word": "năm",
            "start": 218.79,
            "end": 219.03
          },
          {
            "word": "xưa",
            "start": 219.03,
            "end": 219.27
          },
          {
            "word": "đấy",
            "start": 219.27,
            "end": 219.51
          }
        ]
      },
      {
        "id": 54,
        "startTime": 219.6,
        "endTime": 221.64,
        "nextLineTime": 221.74,
        "text": "Bây giờ con nhớ lắm mẹ ơi",
        "words": [
          {
            "word": "Bây",
            "start": 219.6,
            "end": 219.92
          },
          {
            "word": "giờ",
            "start": 219.92,
            "end": 220.24
          },
          {
            "word": "con",
            "start": 220.24,
            "end": 220.56
          },
          {
            "word": "nhớ",
            "start": 220.56,
            "end": 220.88
          },
          {
            "word": "lắm",
            "start": 220.88,
            "end": 221.2
          },
          {
            "word": "mẹ",
            "start": 221.2,
            "end": 221.41
          },
          {
            "word": "ơi",
            "start": 221.41,
            "end": 221.62
          }
        ]
      },
      {
        "id": 55,
        "startTime": 221.74,
        "endTime": 224.33,
        "nextLineTime": 224.43,
        "text": "Dù con có đi nơi xa",
        "words": [
          {
            "word": "Dù",
            "start": 221.74,
            "end": 222.11
          },
          {
            "word": "con",
            "start": 222.11,
            "end": 222.67
          },
          {
            "word": "có",
            "start": 222.67,
            "end": 223.04
          },
          {
            "word": "đi",
            "start": 223.04,
            "end": 223.41
          },
          {
            "word": "nơi",
            "start": 223.41,
            "end": 223.97
          },
          {
            "word": "xa",
            "start": 223.97,
            "end": 224.34
          }
        ]
      },
      {
        "id": 56,
        "startTime": 224.43,
        "endTime": 226.45,
        "nextLineTime": 226.55,
        "text": "Một đời thế nhân trôi qua",
        "words": [
          {
            "word": "Một",
            "start": 224.43,
            "end": 224.73
          },
          {
            "word": "đời",
            "start": 224.73,
            "end": 225.03
          },
          {
            "word": "thế",
            "start": 225.03,
            "end": 225.33
          },
          {
            "word": "nhân",
            "start": 225.33,
            "end": 225.73
          },
          {
            "word": "trôi",
            "start": 225.73,
            "end": 226.13
          },
          {
            "word": "qua",
            "start": 226.13,
            "end": 226.43
          }
        ]
      },
      {
        "id": 57,
        "startTime": 226.55,
        "endTime": 228.04,
        "nextLineTime": 228.14,
        "text": "Làm sao để nếm",
        "words": [
          {
            "word": "Làm",
            "start": 226.55,
            "end": 226.96
          },
          {
            "word": "sao",
            "start": 226.96,
            "end": 227.37
          },
          {
            "word": "để",
            "start": 227.37,
            "end": 227.64
          },
          {
            "word": "nếm",
            "start": 227.64,
            "end": 228.05
          }
        ]
      },
      {
        "id": 58,
        "startTime": 228.14,
        "endTime": 231.22,
        "nextLineTime": 231.32,
        "text": "Những hương vị như ngày xưa có mẹ?",
        "words": [
          {
            "word": "Những",
            "start": 228.14,
            "end": 228.71
          },
          {
            "word": "hương",
            "start": 228.71,
            "end": 229.28
          },
          {
            "word": "vị",
            "start": 229.28,
            "end": 229.51
          },
          {
            "word": "như",
            "start": 229.51,
            "end": 229.85
          },
          {
            "word": "ngày",
            "start": 229.85,
            "end": 230.31
          },
          {
            "word": "xưa",
            "start": 230.31,
            "end": 230.65
          },
          {
            "word": "có",
            "start": 230.65,
            "end": 230.88
          },
          {
            "word": "mẹ?",
            "start": 230.88,
            "end": 231.22
          }
        ]
      },
      {
        "id": 59,
        "startTime": 231.32,
        "endTime": 233.36,
        "nextLineTime": 233.46,
        "text": "Mẹ hiền ơi, mẹ hiền ơi",
        "words": [
          {
            "word": "Mẹ",
            "start": 231.32,
            "end": 231.57
          },
          {
            "word": "hiền",
            "start": 231.57,
            "end": 232.08
          },
          {
            "word": "ơi,",
            "start": 232.08,
            "end": 232.34
          },
          {
            "word": "mẹ",
            "start": 232.34,
            "end": 232.59
          },
          {
            "word": "hiền",
            "start": 232.59,
            "end": 233.1
          },
          {
            "word": "ơi",
            "start": 233.1,
            "end": 233.35
          }
        ]
      },
      {
        "id": 60,
        "startTime": 233.46,
        "endTime": 236.55,
        "nextLineTime": 236.65,
        "text": "Mẹ hiền ơi, mẹ hiền ơi oh",
        "words": [
          {
            "word": "Mẹ",
            "start": 233.46,
            "end": 233.8
          },
          {
            "word": "hiền",
            "start": 233.8,
            "end": 234.49
          },
          {
            "word": "ơi,",
            "start": 234.49,
            "end": 234.83
          },
          {
            "word": "mẹ",
            "start": 234.83,
            "end": 235.17
          },
          {
            "word": "hiền",
            "start": 235.17,
            "end": 235.86
          },
          {
            "word": "ơi",
            "start": 235.86,
            "end": 236.2
          },
          {
            "word": "oh",
            "start": 236.2,
            "end": 236.54
          }
        ]
      },
      {
        "id": 61,
        "startTime": 236.65,
        "endTime": 241.71,
        "nextLineTime": 241.81,
        "text": "Mẹ ơi con nhớ",
        "words": [
          {
            "word": "Mẹ",
            "start": 236.65,
            "end": 237.66
          },
          {
            "word": "ơi",
            "start": 237.66,
            "end": 238.67
          },
          {
            "word": "con",
            "start": 238.67,
            "end": 240.19
          },
          {
            "word": "nhớ",
            "start": 240.19,
            "end": 241.71
          }
        ]
      },
      {
        "id": 62,
        "startTime": 241.81,
        "endTime": 244.23,
        "nextLineTime": 244.33,
        "text": "Cơm nhà",
        "words": [
          {
            "word": "Cơm",
            "start": 241.81,
            "end": 243.02
          },
          {
            "word": "nhà",
            "start": 243.02,
            "end": 244.23
          }
        ]
      },
      {
        "id": 63,
        "startTime": 244.33,
        "endTime": 249.01,
        "nextLineTime": 249.11,
        "text": "Mẹ ơi giờ con chờ cũng như vậy",
        "words": [
          {
            "word": "Mẹ",
            "start": 244.33,
            "end": 244.74
          },
          {
            "word": "ơi",
            "start": 244.74,
            "end": 245.15
          },
          {
            "word": "giờ",
            "start": 245.15,
            "end": 245.76
          },
          {
            "word": "con",
            "start": 245.76,
            "end": 246.37
          },
          {
            "word": "chờ",
            "start": 246.37,
            "end": 246.98
          },
          {
            "word": "cũng",
            "start": 246.98,
            "end": 247.79
          },
          {
            "word": "như",
            "start": 247.79,
            "end": 248.4
          },
          {
            "word": "vậy",
            "start": 248.4,
            "end": 249.01
          }
        ]
      },
      {
        "id": 64,
        "startTime": 249.11,
        "endTime": 254.35,
        "nextLineTime": 254.45,
        "text": "Để những phần ngon lại cũng như vậy",
        "words": [
          {
            "word": "Để",
            "start": 249.11,
            "end": 249.48
          },
          {
            "word": "những",
            "start": 249.48,
            "end": 250.42
          },
          {
            "word": "phần",
            "start": 250.42,
            "end": 251.17
          },
          {
            "word": "ngon",
            "start": 251.17,
            "end": 251.92
          },
          {
            "word": "lại",
            "start": 251.92,
            "end": 252.48
          },
          {
            "word": "cũng",
            "start": 252.48,
            "end": 253.23
          },
          {
            "word": "như",
            "start": 253.23,
            "end": 253.79
          },
          {
            "word": "vậy",
            "start": 253.79,
            "end": 254.35
          }
        ]
      },
      {
        "id": 65,
        "startTime": 254.45,
        "endTime": 255.95,
        "nextLineTime": 256.05,
        "text": "Nhìn xa chờ con",
        "words": [
          {
            "word": "Nhìn",
            "start": 254.45,
            "end": 254.95
          },
          {
            "word": "xa",
            "start": 254.95,
            "end": 255.2
          },
          {
            "word": "chờ",
            "start": 255.2,
            "end": 255.57
          },
          {
            "word": "con",
            "start": 255.57,
            "end": 255.94
          }
        ]
      },
      {
        "id": 66,
        "startTime": 256.05,
        "endTime": 261.65,
        "nextLineTime": 262.27,
        "text": "Mỗi khi chiều xuống, mới biết",
        "words": [
          {
            "word": "Mỗi",
            "start": 256.05,
            "end": 256.78
          },
          {
            "word": "khi",
            "start": 256.78,
            "end": 257.51
          },
          {
            "word": "chiều",
            "start": 257.51,
            "end": 258.73
          },
          {
            "word": "xuống,",
            "start": 258.73,
            "end": 259.95
          },
          {
            "word": "mới",
            "start": 259.95,
            "end": 260.68
          },
          {
            "word": "biết",
            "start": 260.68,
            "end": 261.65
          }
        ]
      },
      {
        "id": 67,
        "startTime": 262.27,
        "endTime": 264.85,
        "nextLineTime": 264.95,
        "text": "Cơm nhà",
        "words": [
          {
            "word": "Cơm",
            "start": 262.27,
            "end": 263.56
          },
          {
            "word": "nhà",
            "start": 263.56,
            "end": 264.85
          }
        ]
      },
      {
        "id": 68,
        "startTime": 264.95,
        "endTime": 268.56,
        "nextLineTime": 268.66,
        "text": "Giờ con nguyện đi vòng quanh thế gian",
        "words": [
          {
            "word": "Giờ",
            "start": 264.95,
            "end": 265.31
          },
          {
            "word": "con",
            "start": 265.31,
            "end": 265.67
          },
          {
            "word": "nguyện",
            "start": 265.67,
            "end": 266.39
          },
          {
            "word": "đi",
            "start": 266.39,
            "end": 266.63
          },
          {
            "word": "vòng",
            "start": 266.63,
            "end": 267.11
          },
          {
            "word": "quanh",
            "start": 267.11,
            "end": 267.71
          },
          {
            "word": "thế",
            "start": 267.71,
            "end": 268.07
          },
          {
            "word": "gian",
            "start": 268.07,
            "end": 268.55
          }
        ]
      },
      {
        "id": 69,
        "startTime": 268.66,
        "endTime": 274.26,
        "nextLineTime": 275.55,
        "text": "Để xin một chén cơm nhà còn ấm",
        "words": [
          {
            "word": "Để",
            "start": 268.66,
            "end": 269.15
          },
          {
            "word": "xin",
            "start": 269.15,
            "end": 269.88
          },
          {
            "word": "một",
            "start": 269.88,
            "end": 270.61
          },
          {
            "word": "chén",
            "start": 270.61,
            "end": 271.58
          },
          {
            "word": "cơm",
            "start": 271.58,
            "end": 272.31
          },
          {
            "word": "nhà",
            "start": 272.31,
            "end": 273.04
          },
          {
            "word": "còn",
            "start": 273.04,
            "end": 273.77
          },
          {
            "word": "ấm",
            "start": 273.77,
            "end": 274.26
          }
        ]
      },
      {
        "id": 70,
        "startTime": 275.55,
        "endTime": 278.11,
        "nextLineTime": 278.21,
        "text": "Vì dù đời con đắng cay thăng trầm",
        "words": [
          {
            "word": "Vì",
            "start": 275.55,
            "end": 275.75
          },
          {
            "word": "dù",
            "start": 275.75,
            "end": 275.95
          },
          {
            "word": "đời",
            "start": 275.95,
            "end": 276.25
          },
          {
            "word": "con",
            "start": 276.25,
            "end": 276.55
          },
          {
            "word": "đắng",
            "start": 276.55,
            "end": 276.94
          },
          {
            "word": "cay",
            "start": 276.94,
            "end": 277.24
          },
          {
            "word": "thăng",
            "start": 277.24,
            "end": 277.73
          },
          {
            "word": "trầm",
            "start": 277.73,
            "end": 278.12
          }
        ]
      },
      {
        "id": 71,
        "startTime": 278.21,
        "endTime": 279.2,
        "nextLineTime": 279.3,
        "text": "Làm sao so với",
        "words": [
          {
            "word": "Làm",
            "start": 278.21,
            "end": 278.48
          },
          {
            "word": "sao",
            "start": 278.48,
            "end": 278.75
          },
          {
            "word": "so",
            "start": 278.75,
            "end": 278.93
          },
          {
            "word": "với",
            "start": 278.93,
            "end": 279.2
          }
        ]
      },
      {
        "id": 72,
        "startTime": 279.3,
        "endTime": 281.36,
        "nextLineTime": 281.46,
        "text": "Những ân cần quan tâm",
        "words": [
          {
            "word": "Những",
            "start": 279.3,
            "end": 279.91
          },
          {
            "word": "ân",
            "start": 279.91,
            "end": 280.15
          },
          {
            "word": "cần",
            "start": 280.15,
            "end": 280.51
          },
          {
            "word": "quan",
            "start": 280.51,
            "end": 280.99
          },
          {
            "word": "tâm",
            "start": 280.99,
            "end": 281.35
          }
        ]
      },
      {
        "id": 73,
        "startTime": 281.46,
        "endTime": 286.07,
        "nextLineTime": 286.17,
        "text": "Gửi trong mâm cơm nhà",
        "words": [
          {
            "word": "Gửi",
            "start": 281.46,
            "end": 282.27
          },
          {
            "word": "trong",
            "start": 282.27,
            "end": 283.63
          },
          {
            "word": "mâm",
            "start": 283.63,
            "end": 284.44
          },
          {
            "word": "cơm",
            "start": 284.44,
            "end": 285.25
          },
          {
            "word": "nhà",
            "start": 285.25,
            "end": 286.06
          }
        ]
      },
      {
        "id": 74,
        "startTime": 286.17,
        "endTime": 289.27,
        "nextLineTime": 289.37,
        "text": "Đời con chạy đi vòng quanh thế gian",
        "words": [
          {
            "word": "Đời",
            "start": 286.17,
            "end": 286.5
          },
          {
            "word": "con",
            "start": 286.5,
            "end": 286.83
          },
          {
            "word": "chạy",
            "start": 286.83,
            "end": 287.27
          },
          {
            "word": "đi",
            "start": 287.27,
            "end": 287.49
          },
          {
            "word": "vòng",
            "start": 287.49,
            "end": 287.93
          },
          {
            "word": "quanh",
            "start": 287.93,
            "end": 288.48
          },
          {
            "word": "thế",
            "start": 288.48,
            "end": 288.81
          },
          {
            "word": "gian",
            "start": 288.81,
            "end": 289.25
          }
        ]
      },
      {
        "id": 75,
        "startTime": 289.37,
        "endTime": 294.97,
        "nextLineTime": 295.76,
        "text": "Chỉ để nhận ra một điều còn mãi",
        "words": [
          {
            "word": "Chỉ",
            "start": 289.37,
            "end": 290.07
          },
          {
            "word": "để",
            "start": 290.07,
            "end": 290.54
          },
          {
            "word": "nhận",
            "start": 290.54,
            "end": 291.47
          },
          {
            "word": "ra",
            "start": 291.47,
            "end": 291.94
          },
          {
            "word": "một",
            "start": 291.94,
            "end": 292.64
          },
          {
            "word": "điều",
            "start": 292.64,
            "end": 293.57
          },
          {
            "word": "còn",
            "start": 293.57,
            "end": 294.27
          },
          {
            "word": "mãi",
            "start": 294.27,
            "end": 294.97
          }
        ]
      },
      {
        "id": 76,
        "startTime": 295.76,
        "endTime": 298.35,
        "nextLineTime": 298.45,
        "text": "Dù đời con đắng cay thăng trầm",
        "words": [
          {
            "word": "Dù",
            "start": 295.76,
            "end": 295.98
          },
          {
            "word": "đời",
            "start": 295.98,
            "end": 296.3
          },
          {
            "word": "con",
            "start": 296.3,
            "end": 296.62
          },
          {
            "word": "đắng",
            "start": 296.62,
            "end": 297.05
          },
          {
            "word": "cay",
            "start": 297.05,
            "end": 297.37
          },
          {
            "word": "thăng",
            "start": 297.37,
            "end": 297.91
          },
          {
            "word": "trầm",
            "start": 297.91,
            "end": 298.34
          }
        ]
      },
      {
        "id": 77,
        "startTime": 298.45,
        "endTime": 299.91,
        "nextLineTime": 300.01,
        "text": "Làm sao so với",
        "words": [
          {
            "word": "Làm",
            "start": 298.45,
            "end": 298.85
          },
          {
            "word": "sao",
            "start": 298.85,
            "end": 299.25
          },
          {
            "word": "so",
            "start": 299.25,
            "end": 299.52
          },
          {
            "word": "với",
            "start": 299.52,
            "end": 299.92
          }
        ]
      },
      {
        "id": 78,
        "startTime": 300.01,
        "endTime": 302.57,
        "nextLineTime": 302.67,
        "text": "Những ân cần quan tâm",
        "words": [
          {
            "word": "Những",
            "start": 300.01,
            "end": 300.76
          },
          {
            "word": "ân",
            "start": 300.76,
            "end": 301.06
          },
          {
            "word": "cần",
            "start": 301.06,
            "end": 301.51
          },
          {
            "word": "quan",
            "start": 301.51,
            "end": 302.11
          },
          {
            "word": "tâm",
            "start": 302.11,
            "end": 302.56
          }
        ]
      },
      {
        "id": 79,
        "startTime": 302.67,
        "endTime": 308.27,
        "nextLineTime": 331.65,
        "text": "Ngày xưa cơm nhà",
        "words": [
          {
            "word": "Ngày",
            "start": 302.67,
            "end": 304.39
          },
          {
            "word": "xưa",
            "start": 304.39,
            "end": 305.68
          },
          {
            "word": "cơm",
            "start": 305.68,
            "end": 306.97
          },
          {
            "word": "nhà",
            "start": 306.97,
            "end": 308.26
          }
        ]
      }
    ]
  },
  {
    "id": "karaoke-nho-xiu-nho-xiu",
    "filename": "NHỎ XÍU NHỎ XIU.mp3",
    "title": "Nhỏ Xíu Nhỏ Xiu",
    "artist": "Anh Trai Vượt Ngàn Chông Gai (JGKiD, Jun Phạm, Huỳnh Lập, CHARLES., Hồ Đông Quan)",
    "duration": 283.66,
    "audioUrl": "/karaoke/karaoke-nho-xiu-nho-xiu.mp3",
    "thumbUrl": "/karaoke/karaoke-nho-xiu-nho-xiu.jpg",
    "lines": [
      {
        "id": 0,
        "startTime": 16.71,
        "endTime": 18.69,
        "nextLineTime": 18.79,
        "text": "Ok chơi năm mười",
        "words": [
          {
            "word": "Ok",
            "start": 16.71,
            "end": 17.01
          },
          {
            "word": "chơi",
            "start": 17.01,
            "end": 17.62
          },
          {
            "word": "năm",
            "start": 17.62,
            "end": 18.08
          },
          {
            "word": "mười",
            "start": 18.08,
            "end": 18.69
          }
        ]
      },
      {
        "id": 1,
        "startTime": 18.79,
        "endTime": 20.85,
        "nextLineTime": 20.95,
        "text": "Ta cùng nhau chơi năm mười",
        "words": [
          {
            "word": "Ta",
            "start": 18.79,
            "end": 18.99
          },
          {
            "word": "cùng",
            "start": 18.99,
            "end": 19.38
          },
          {
            "word": "nhau",
            "start": 19.38,
            "end": 19.77
          },
          {
            "word": "chơi",
            "start": 19.77,
            "end": 20.16
          },
          {
            "word": "năm",
            "start": 20.16,
            "end": 20.45
          },
          {
            "word": "mười",
            "start": 20.45,
            "end": 20.84
          }
        ]
      },
      {
        "id": 2,
        "startTime": 20.95,
        "endTime": 23.02,
        "nextLineTime": 23.12,
        "text": "Nhắm mắt, nhắm mắt xong rồi đếm",
        "words": [
          {
            "word": "Nhắm",
            "start": 20.95,
            "end": 21.29
          },
          {
            "word": "mắt,",
            "start": 21.29,
            "end": 21.55
          },
          {
            "word": "nhắm",
            "start": 21.55,
            "end": 21.89
          },
          {
            "word": "mắt",
            "start": 21.89,
            "end": 22.15
          },
          {
            "word": "xong",
            "start": 22.15,
            "end": 22.49
          },
          {
            "word": "rồi",
            "start": 22.49,
            "end": 22.75
          },
          {
            "word": "đếm",
            "start": 22.75,
            "end": 23.01
          }
        ]
      },
      {
        "id": 3,
        "startTime": 23.12,
        "endTime": 25.12,
        "nextLineTime": 25.22,
        "text": "Nhắm mắt, nhắm mắt xong rồi trốn",
        "words": [
          {
            "word": "Nhắm",
            "start": 23.12,
            "end": 23.44
          },
          {
            "word": "mắt,",
            "start": 23.44,
            "end": 23.68
          },
          {
            "word": "nhắm",
            "start": 23.68,
            "end": 24.0
          },
          {
            "word": "mắt",
            "start": 24.0,
            "end": 24.24
          },
          {
            "word": "xong",
            "start": 24.24,
            "end": 24.56
          },
          {
            "word": "rồi",
            "start": 24.56,
            "end": 24.8
          },
          {
            "word": "trốn",
            "start": 24.8,
            "end": 25.12
          }
        ]
      },
      {
        "id": 4,
        "startTime": 25.22,
        "endTime": 27.44,
        "nextLineTime": 27.54,
        "text": "Trốn vào những buổi chiều",
        "words": [
          {
            "word": "Trốn",
            "start": 25.22,
            "end": 25.64
          },
          {
            "word": "vào",
            "start": 25.64,
            "end": 25.96
          },
          {
            "word": "những",
            "start": 25.96,
            "end": 26.49
          },
          {
            "word": "buổi",
            "start": 26.49,
            "end": 26.91
          },
          {
            "word": "chiều",
            "start": 26.91,
            "end": 27.44
          }
        ]
      },
      {
        "id": 5,
        "startTime": 27.54,
        "endTime": 29.68,
        "nextLineTime": 29.78,
        "text": "Vi vu cùng cánh diều",
        "words": [
          {
            "word": "Vi",
            "start": 27.54,
            "end": 27.81
          },
          {
            "word": "vu",
            "start": 27.81,
            "end": 28.08
          },
          {
            "word": "cùng",
            "start": 28.08,
            "end": 28.61
          },
          {
            "word": "cánh",
            "start": 28.61,
            "end": 29.14
          },
          {
            "word": "diều",
            "start": 29.14,
            "end": 29.68
          }
        ]
      },
      {
        "id": 6,
        "startTime": 29.78,
        "endTime": 31.81,
        "nextLineTime": 31.91,
        "text": "Đếm những áng mây trên",
        "words": [
          {
            "word": "Đếm",
            "start": 29.78,
            "end": 30.12
          },
          {
            "word": "những",
            "start": 30.12,
            "end": 30.68
          },
          {
            "word": "áng",
            "start": 30.68,
            "end": 31.02
          },
          {
            "word": "mây",
            "start": 31.02,
            "end": 31.36
          },
          {
            "word": "trên",
            "start": 31.36,
            "end": 31.81
          }
        ]
      },
      {
        "id": 7,
        "startTime": 31.91,
        "endTime": 33.94,
        "nextLineTime": 34.04,
        "text": "trời thật xa vời vợi",
        "words": [
          {
            "word": "trời",
            "start": 31.91,
            "end": 32.42
          },
          {
            "word": "thật",
            "start": 32.42,
            "end": 32.93
          },
          {
            "word": "xa",
            "start": 32.93,
            "end": 33.18
          },
          {
            "word": "vời",
            "start": 33.18,
            "end": 33.56
          },
          {
            "word": "vợi",
            "start": 33.56,
            "end": 33.94
          }
        ]
      },
      {
        "id": 8,
        "startTime": 34.04,
        "endTime": 36.18,
        "nextLineTime": 36.28,
        "text": "Ta mang theo trăng sao và cầu vồng",
        "words": [
          {
            "word": "Ta",
            "start": 34.04,
            "end": 34.2
          },
          {
            "word": "mang",
            "start": 34.2,
            "end": 34.52
          },
          {
            "word": "theo",
            "start": 34.52,
            "end": 34.84
          },
          {
            "word": "trăng",
            "start": 34.84,
            "end": 35.24
          },
          {
            "word": "sao",
            "start": 35.24,
            "end": 35.48
          },
          {
            "word": "và",
            "start": 35.48,
            "end": 35.64
          },
          {
            "word": "cầu",
            "start": 35.64,
            "end": 35.88
          },
          {
            "word": "vồng",
            "start": 35.88,
            "end": 36.2
          }
        ]
      },
      {
        "id": 9,
        "startTime": 36.28,
        "endTime": 38.34,
        "nextLineTime": 38.44,
        "text": "Thay suy tư bằng những giấc mơ màu hồng",
        "words": [
          {
            "word": "Thay",
            "start": 36.28,
            "end": 36.55
          },
          {
            "word": "suy",
            "start": 36.55,
            "end": 36.75
          },
          {
            "word": "tư",
            "start": 36.75,
            "end": 36.88
          },
          {
            "word": "bằng",
            "start": 36.88,
            "end": 37.15
          },
          {
            "word": "những",
            "start": 37.15,
            "end": 37.48
          },
          {
            "word": "giấc",
            "start": 37.48,
            "end": 37.75
          },
          {
            "word": "mơ",
            "start": 37.75,
            "end": 37.88
          },
          {
            "word": "màu",
            "start": 37.88,
            "end": 38.08
          },
          {
            "word": "hồng",
            "start": 38.08,
            "end": 38.35
          }
        ]
      },
      {
        "id": 10,
        "startTime": 38.44,
        "endTime": 40.54,
        "nextLineTime": 40.64,
        "text": "Khi ta chưa biết yêu (Giận hờn vô cớ)",
        "words": [
          {
            "word": "Khi",
            "start": 38.44,
            "end": 38.66
          },
          {
            "word": "ta",
            "start": 38.66,
            "end": 38.8
          },
          {
            "word": "chưa",
            "start": 38.8,
            "end": 39.09
          },
          {
            "word": "biết",
            "start": 39.09,
            "end": 39.38
          },
          {
            "word": "yêu",
            "start": 39.38,
            "end": 39.6
          },
          {
            "word": "(Giận",
            "start": 39.6,
            "end": 39.96
          },
          {
            "word": "hờn",
            "start": 39.96,
            "end": 40.18
          },
          {
            "word": "vô",
            "start": 40.18,
            "end": 40.32
          },
          {
            "word": "cớ)",
            "start": 40.32,
            "end": 40.54
          }
        ]
      },
      {
        "id": 11,
        "startTime": 40.64,
        "endTime": 42.69,
        "nextLineTime": 42.79,
        "text": "Khi ta chưa biết điều (Biết sầu, biết nhớ)",
        "words": [
          {
            "word": "Khi",
            "start": 40.64,
            "end": 40.83
          },
          {
            "word": "ta",
            "start": 40.83,
            "end": 40.95
          },
          {
            "word": "chưa",
            "start": 40.95,
            "end": 41.2
          },
          {
            "word": "biết",
            "start": 41.2,
            "end": 41.45
          },
          {
            "word": "điều",
            "start": 41.45,
            "end": 41.7
          },
          {
            "word": "(Biết",
            "start": 41.7,
            "end": 42.01
          },
          {
            "word": "sầu,",
            "start": 42.01,
            "end": 42.2
          },
          {
            "word": "biết",
            "start": 42.2,
            "end": 42.45
          },
          {
            "word": "nhớ)",
            "start": 42.45,
            "end": 42.7
          }
        ]
      },
      {
        "id": 12,
        "startTime": 42.79,
        "endTime": 44.79,
        "nextLineTime": 44.89,
        "text": "Ta gom thêm ước mơ và diệu kỳ",
        "words": [
          {
            "word": "Ta",
            "start": 42.79,
            "end": 42.97
          },
          {
            "word": "gom",
            "start": 42.97,
            "end": 43.24
          },
          {
            "word": "thêm",
            "start": 43.24,
            "end": 43.6
          },
          {
            "word": "ước",
            "start": 43.6,
            "end": 43.87
          },
          {
            "word": "mơ",
            "start": 43.87,
            "end": 44.05
          },
          {
            "word": "và",
            "start": 44.05,
            "end": 44.23
          },
          {
            "word": "diệu",
            "start": 44.23,
            "end": 44.59
          },
          {
            "word": "kỳ",
            "start": 44.59,
            "end": 44.77
          }
        ]
      },
      {
        "id": 13,
        "startTime": 44.89,
        "endTime": 47.05,
        "nextLineTime": 47.15,
        "text": "Thay cho những hóa đơn còn nằm lỳ",
        "words": [
          {
            "word": "Thay",
            "start": 44.89,
            "end": 45.22
          },
          {
            "word": "cho",
            "start": 45.22,
            "end": 45.47
          },
          {
            "word": "những",
            "start": 45.47,
            "end": 45.89
          },
          {
            "word": "hóa",
            "start": 45.89,
            "end": 46.14
          },
          {
            "word": "đơn",
            "start": 46.14,
            "end": 46.39
          },
          {
            "word": "còn",
            "start": 46.39,
            "end": 46.64
          },
          {
            "word": "nằm",
            "start": 46.64,
            "end": 46.89
          },
          {
            "word": "lỳ",
            "start": 46.89,
            "end": 47.06
          }
        ]
      },
      {
        "id": 14,
        "startTime": 47.15,
        "endTime": 49.24,
        "nextLineTime": 49.34,
        "text": "Gấp hết những nghĩ suy (Làm con hạc giấy)",
        "words": [
          {
            "word": "Gấp",
            "start": 47.15,
            "end": 47.34
          },
          {
            "word": "hết",
            "start": 47.34,
            "end": 47.53
          },
          {
            "word": "những",
            "start": 47.53,
            "end": 47.85
          },
          {
            "word": "nghĩ",
            "start": 47.85,
            "end": 48.1
          },
          {
            "word": "suy",
            "start": 48.1,
            "end": 48.29
          },
          {
            "word": "(Làm",
            "start": 48.29,
            "end": 48.54
          },
          {
            "word": "con",
            "start": 48.54,
            "end": 48.73
          },
          {
            "word": "hạc",
            "start": 48.73,
            "end": 48.92
          },
          {
            "word": "giấy)",
            "start": 48.92,
            "end": 49.24
          }
        ]
      },
      {
        "id": 15,
        "startTime": 49.34,
        "endTime": 52.11,
        "nextLineTime": 52.21,
        "text": "Treo lên những ước ao đã từng ở đây",
        "words": [
          {
            "word": "Treo",
            "start": 49.34,
            "end": 49.74
          },
          {
            "word": "lên",
            "start": 49.74,
            "end": 50.04
          },
          {
            "word": "những",
            "start": 50.04,
            "end": 50.53
          },
          {
            "word": "ước",
            "start": 50.53,
            "end": 50.83
          },
          {
            "word": "ao",
            "start": 50.83,
            "end": 51.03
          },
          {
            "word": "đã",
            "start": 51.03,
            "end": 51.23
          },
          {
            "word": "từng",
            "start": 51.23,
            "end": 51.63
          },
          {
            "word": "ở",
            "start": 51.63,
            "end": 51.83
          },
          {
            "word": "đây",
            "start": 51.83,
            "end": 52.13
          }
        ]
      },
      {
        "id": 16,
        "startTime": 52.21,
        "endTime": 56.43,
        "nextLineTime": 56.53,
        "text": "Một với một với một, một với một là hai",
        "words": [
          {
            "word": "Một",
            "start": 52.21,
            "end": 52.65
          },
          {
            "word": "với",
            "start": 52.65,
            "end": 53.09
          },
          {
            "word": "một",
            "start": 53.09,
            "end": 53.53
          },
          {
            "word": "với",
            "start": 53.53,
            "end": 53.97
          },
          {
            "word": "một,",
            "start": 53.97,
            "end": 54.41
          },
          {
            "word": "một",
            "start": 54.41,
            "end": 54.85
          },
          {
            "word": "với",
            "start": 54.85,
            "end": 55.29
          },
          {
            "word": "một",
            "start": 55.29,
            "end": 55.73
          },
          {
            "word": "là",
            "start": 55.73,
            "end": 56.02
          },
          {
            "word": "hai",
            "start": 56.02,
            "end": 56.46
          }
        ]
      },
      {
        "id": 17,
        "startTime": 56.53,
        "endTime": 60.96,
        "nextLineTime": 61.06,
        "text": "Một mơ mộng cho lòng này thêm nặng tình ai",
        "words": [
          {
            "word": "Một",
            "start": 56.53,
            "end": 56.93
          },
          {
            "word": "mơ",
            "start": 56.93,
            "end": 57.2
          },
          {
            "word": "mộng",
            "start": 57.2,
            "end": 57.74
          },
          {
            "word": "cho",
            "start": 57.74,
            "end": 58.14
          },
          {
            "word": "lòng",
            "start": 58.14,
            "end": 58.68
          },
          {
            "word": "này",
            "start": 58.68,
            "end": 59.08
          },
          {
            "word": "thêm",
            "start": 59.08,
            "end": 59.62
          },
          {
            "word": "nặng",
            "start": 59.62,
            "end": 60.16
          },
          {
            "word": "tình",
            "start": 60.16,
            "end": 60.7
          },
          {
            "word": "ai",
            "start": 60.7,
            "end": 60.97
          }
        ]
      },
      {
        "id": 18,
        "startTime": 61.06,
        "endTime": 65.25,
        "nextLineTime": 65.35,
        "text": "Một với một với một, một với một là hai",
        "words": [
          {
            "word": "Một",
            "start": 61.06,
            "end": 61.49
          },
          {
            "word": "với",
            "start": 61.49,
            "end": 61.92
          },
          {
            "word": "một",
            "start": 61.92,
            "end": 62.35
          },
          {
            "word": "với",
            "start": 62.35,
            "end": 62.78
          },
          {
            "word": "một,",
            "start": 62.78,
            "end": 63.21
          },
          {
            "word": "một",
            "start": 63.21,
            "end": 63.64
          },
          {
            "word": "với",
            "start": 63.64,
            "end": 64.07
          },
          {
            "word": "một",
            "start": 64.07,
            "end": 64.5
          },
          {
            "word": "là",
            "start": 64.5,
            "end": 64.79
          },
          {
            "word": "hai",
            "start": 64.79,
            "end": 65.22
          }
        ]
      },
      {
        "id": 19,
        "startTime": 65.35,
        "endTime": 68.85,
        "nextLineTime": 68.95,
        "text": "Một giai điệu quen thuộc, à i ai í ai",
        "words": [
          {
            "word": "Một",
            "start": 65.35,
            "end": 65.7
          },
          {
            "word": "giai",
            "start": 65.7,
            "end": 66.17
          },
          {
            "word": "điệu",
            "start": 66.17,
            "end": 66.64
          },
          {
            "word": "quen",
            "start": 66.64,
            "end": 67.11
          },
          {
            "word": "thuộc,",
            "start": 67.11,
            "end": 67.69
          },
          {
            "word": "à",
            "start": 67.69,
            "end": 67.92
          },
          {
            "word": "i",
            "start": 67.92,
            "end": 68.15
          },
          {
            "word": "ai",
            "start": 68.15,
            "end": 68.38
          },
          {
            "word": "í",
            "start": 68.38,
            "end": 68.61
          },
          {
            "word": "ai",
            "start": 68.61,
            "end": 68.84
          }
        ]
      },
      {
        "id": 20,
        "startTime": 68.95,
        "endTime": 73.2,
        "nextLineTime": 73.3,
        "text": "Cho ta bé lại, cho ta nhỏ lại",
        "words": [
          {
            "word": "Cho",
            "start": 68.95,
            "end": 69.56
          },
          {
            "word": "ta",
            "start": 69.56,
            "end": 69.96
          },
          {
            "word": "bé",
            "start": 69.96,
            "end": 70.36
          },
          {
            "word": "lại,",
            "start": 70.36,
            "end": 70.97
          },
          {
            "word": "cho",
            "start": 70.97,
            "end": 71.58
          },
          {
            "word": "ta",
            "start": 71.58,
            "end": 71.98
          },
          {
            "word": "nhỏ",
            "start": 71.98,
            "end": 72.59
          },
          {
            "word": "lại",
            "start": 72.59,
            "end": 73.2
          }
        ]
      },
      {
        "id": 21,
        "startTime": 73.3,
        "endTime": 77.27,
        "nextLineTime": 77.37,
        "text": "Cho ta bé lại, woah, nhỏ xíu xiu",
        "words": [
          {
            "word": "Cho",
            "start": 73.3,
            "end": 73.82
          },
          {
            "word": "ta",
            "start": 73.82,
            "end": 74.17
          },
          {
            "word": "bé",
            "start": 74.17,
            "end": 74.52
          },
          {
            "word": "lại,",
            "start": 74.52,
            "end": 75.04
          },
          {
            "word": "woah,",
            "start": 75.04,
            "end": 75.73
          },
          {
            "word": "nhỏ",
            "start": 75.73,
            "end": 76.25
          },
          {
            "word": "xíu",
            "start": 76.25,
            "end": 76.77
          },
          {
            "word": "xiu",
            "start": 76.77,
            "end": 77.29
          }
        ]
      },
      {
        "id": 22,
        "startTime": 77.37,
        "endTime": 79.7,
        "nextLineTime": 79.8,
        "text": "Xin cho ta bé lại",
        "words": [
          {
            "word": "Xin",
            "start": 77.37,
            "end": 77.91
          },
          {
            "word": "cho",
            "start": 77.91,
            "end": 78.45
          },
          {
            "word": "ta",
            "start": 78.45,
            "end": 78.81
          },
          {
            "word": "bé",
            "start": 78.81,
            "end": 79.17
          },
          {
            "word": "lại",
            "start": 79.17,
            "end": 79.71
          }
        ]
      },
      {
        "id": 23,
        "startTime": 79.8,
        "endTime": 81.99,
        "nextLineTime": 82.09,
        "text": "Cho ta nhỏ lại",
        "words": [
          {
            "word": "Cho",
            "start": 79.8,
            "end": 80.4
          },
          {
            "word": "ta",
            "start": 80.4,
            "end": 80.8
          },
          {
            "word": "nhỏ",
            "start": 80.8,
            "end": 81.4
          },
          {
            "word": "lại",
            "start": 81.4,
            "end": 82.0
          }
        ]
      },
      {
        "id": 24,
        "startTime": 82.09,
        "endTime": 84.29,
        "nextLineTime": 84.39,
        "text": "Cho ta bé lại, woah, nhỏ",
        "words": [
          {
            "word": "Cho",
            "start": 82.09,
            "end": 82.48
          },
          {
            "word": "ta",
            "start": 82.48,
            "end": 82.74
          },
          {
            "word": "bé",
            "start": 82.74,
            "end": 83.0
          },
          {
            "word": "lại,",
            "start": 83.0,
            "end": 83.39
          },
          {
            "word": "woah,",
            "start": 83.39,
            "end": 83.91
          },
          {
            "word": "nhỏ",
            "start": 83.91,
            "end": 84.3
          }
        ]
      },
      {
        "id": 25,
        "startTime": 84.39,
        "endTime": 87.36,
        "nextLineTime": 87.46,
        "text": "xíu, nhỏ xiu, nhỏ xíu, nhỏ xiu",
        "words": [
          {
            "word": "xíu,",
            "start": 84.39,
            "end": 84.81
          },
          {
            "word": "nhỏ",
            "start": 84.81,
            "end": 85.23
          },
          {
            "word": "xiu,",
            "start": 85.23,
            "end": 85.65
          },
          {
            "word": "nhỏ",
            "start": 85.65,
            "end": 86.07
          },
          {
            "word": "xíu,",
            "start": 86.07,
            "end": 86.49
          },
          {
            "word": "nhỏ",
            "start": 86.49,
            "end": 86.91
          },
          {
            "word": "xiu",
            "start": 86.91,
            "end": 87.33
          }
        ]
      },
      {
        "id": 26,
        "startTime": 87.46,
        "endTime": 89.08,
        "nextLineTime": 89.18,
        "text": "Bật beat bên bến bờ",
        "words": [
          {
            "word": "Bật",
            "start": 87.46,
            "end": 87.78
          },
          {
            "word": "beat",
            "start": 87.78,
            "end": 88.21
          },
          {
            "word": "bên",
            "start": 88.21,
            "end": 88.53
          },
          {
            "word": "bến",
            "start": 88.53,
            "end": 88.85
          },
          {
            "word": "bờ",
            "start": 88.85,
            "end": 89.07
          }
        ]
      },
      {
        "id": 27,
        "startTime": 89.18,
        "endTime": 91.77,
        "nextLineTime": 91.87,
        "text": "Bềnh bồng băng băng bước",
        "words": [
          {
            "word": "Bềnh",
            "start": 89.18,
            "end": 89.7
          },
          {
            "word": "bồng",
            "start": 89.7,
            "end": 90.22
          },
          {
            "word": "băng",
            "start": 90.22,
            "end": 90.74
          },
          {
            "word": "băng",
            "start": 90.74,
            "end": 91.26
          },
          {
            "word": "bước",
            "start": 91.26,
            "end": 91.78
          }
        ]
      },
      {
        "id": 28,
        "startTime": 91.87,
        "endTime": 93.52,
        "nextLineTime": 93.62,
        "text": "Bức bối bao bão bùng",
        "words": [
          {
            "word": "Bức",
            "start": 91.87,
            "end": 92.18
          },
          {
            "word": "bối",
            "start": 92.18,
            "end": 92.49
          },
          {
            "word": "bao",
            "start": 92.49,
            "end": 92.8
          },
          {
            "word": "bão",
            "start": 92.8,
            "end": 93.11
          },
          {
            "word": "bùng",
            "start": 93.11,
            "end": 93.52
          }
        ]
      },
      {
        "id": 29,
        "startTime": 93.62,
        "endTime": 95.82,
        "nextLineTime": 95.92,
        "text": "Bình bình ba bốn bể",
        "words": [
          {
            "word": "Bình",
            "start": 93.62,
            "end": 94.21
          },
          {
            "word": "bình",
            "start": 94.21,
            "end": 94.8
          },
          {
            "word": "ba",
            "start": 94.8,
            "end": 95.09
          },
          {
            "word": "bốn",
            "start": 95.09,
            "end": 95.53
          },
          {
            "word": "bể",
            "start": 95.53,
            "end": 95.82
          }
        ]
      },
      {
        "id": 30,
        "startTime": 95.92,
        "endTime": 98.07,
        "nextLineTime": 98.17,
        "text": "Mơ về nơi mà tôi thường hay chơi trốn tìm",
        "words": [
          {
            "word": "Mơ",
            "start": 95.92,
            "end": 96.05
          },
          {
            "word": "về",
            "start": 96.05,
            "end": 96.18
          },
          {
            "word": "nơi",
            "start": 96.18,
            "end": 96.38
          },
          {
            "word": "mà",
            "start": 96.38,
            "end": 96.51
          },
          {
            "word": "tôi",
            "start": 96.51,
            "end": 96.71
          },
          {
            "word": "thường",
            "start": 96.71,
            "end": 97.11
          },
          {
            "word": "hay",
            "start": 97.11,
            "end": 97.31
          },
          {
            "word": "chơi",
            "start": 97.31,
            "end": 97.58
          },
          {
            "word": "trốn",
            "start": 97.58,
            "end": 97.85
          },
          {
            "word": "tìm",
            "start": 97.85,
            "end": 98.05
          }
        ]
      },
      {
        "id": 31,
        "startTime": 98.17,
        "endTime": 100.26,
        "nextLineTime": 100.36,
        "text": "Chơi từ trưa đến tối mà sao chẳng mỏi mệt",
        "words": [
          {
            "word": "Chơi",
            "start": 98.17,
            "end": 98.43
          },
          {
            "word": "từ",
            "start": 98.43,
            "end": 98.56
          },
          {
            "word": "trưa",
            "start": 98.56,
            "end": 98.82
          },
          {
            "word": "đến",
            "start": 98.82,
            "end": 99.02
          },
          {
            "word": "tối",
            "start": 99.02,
            "end": 99.22
          },
          {
            "word": "mà",
            "start": 99.22,
            "end": 99.35
          },
          {
            "word": "sao",
            "start": 99.35,
            "end": 99.55
          },
          {
            "word": "chẳng",
            "start": 99.55,
            "end": 99.88
          },
          {
            "word": "mỏi",
            "start": 99.88,
            "end": 100.08
          },
          {
            "word": "mệt",
            "start": 100.08,
            "end": 100.28
          }
        ]
      },
      {
        "id": 32,
        "startTime": 100.36,
        "endTime": 102.44,
        "nextLineTime": 102.54,
        "text": "Ngây thơ như cơn gió chợt qua, ah",
        "words": [
          {
            "word": "Ngây",
            "start": 100.36,
            "end": 100.69
          },
          {
            "word": "thơ",
            "start": 100.69,
            "end": 100.94
          },
          {
            "word": "như",
            "start": 100.94,
            "end": 101.19
          },
          {
            "word": "cơn",
            "start": 101.19,
            "end": 101.44
          },
          {
            "word": "gió",
            "start": 101.44,
            "end": 101.69
          },
          {
            "word": "chợt",
            "start": 101.69,
            "end": 102.02
          },
          {
            "word": "qua,",
            "start": 102.02,
            "end": 102.27
          },
          {
            "word": "ah",
            "start": 102.27,
            "end": 102.44
          }
        ]
      },
      {
        "id": 33,
        "startTime": 102.54,
        "endTime": 103.53,
        "nextLineTime": 103.63,
        "text": "Chẳng thế nào tìm thấy",
        "words": [
          {
            "word": "Chẳng",
            "start": 102.54,
            "end": 102.81
          },
          {
            "word": "thế",
            "start": 102.81,
            "end": 102.97
          },
          {
            "word": "nào",
            "start": 102.97,
            "end": 103.13
          },
          {
            "word": "tìm",
            "start": 103.13,
            "end": 103.29
          },
          {
            "word": "thấy",
            "start": 103.29,
            "end": 103.51
          }
        ]
      },
      {
        "id": 34,
        "startTime": 103.63,
        "endTime": 104.76,
        "nextLineTime": 104.86,
        "text": "đường quay về, quay về",
        "words": [
          {
            "word": "đường",
            "start": 103.63,
            "end": 103.96
          },
          {
            "word": "quay",
            "start": 103.96,
            "end": 104.23
          },
          {
            "word": "về,",
            "start": 104.23,
            "end": 104.36
          },
          {
            "word": "quay",
            "start": 104.36,
            "end": 104.63
          },
          {
            "word": "về",
            "start": 104.63,
            "end": 104.76
          }
        ]
      },
      {
        "id": 35,
        "startTime": 104.86,
        "endTime": 105.66,
        "nextLineTime": 105.75,
        "text": "Theo chân tuổi thơ tôi tìm",
        "words": [
          {
            "word": "Theo",
            "start": 104.86,
            "end": 105.01
          },
          {
            "word": "chân",
            "start": 105.01,
            "end": 105.16
          },
          {
            "word": "tuổi",
            "start": 105.16,
            "end": 105.31
          },
          {
            "word": "thơ",
            "start": 105.31,
            "end": 105.42
          },
          {
            "word": "tôi",
            "start": 105.42,
            "end": 105.53
          },
          {
            "word": "tìm",
            "start": 105.53,
            "end": 105.64
          }
        ]
      },
      {
        "id": 36,
        "startTime": 105.75,
        "endTime": 106.71,
        "nextLineTime": 106.81,
        "text": "về vùng đất thật là diệu kỳ",
        "words": [
          {
            "word": "về",
            "start": 105.75,
            "end": 105.84
          },
          {
            "word": "vùng",
            "start": 105.84,
            "end": 106.02
          },
          {
            "word": "đất",
            "start": 106.02,
            "end": 106.16
          },
          {
            "word": "thật",
            "start": 106.16,
            "end": 106.34
          },
          {
            "word": "là",
            "start": 106.34,
            "end": 106.43
          },
          {
            "word": "diệu",
            "start": 106.43,
            "end": 106.61
          },
          {
            "word": "kỳ",
            "start": 106.61,
            "end": 106.7
          }
        ]
      },
      {
        "id": 37,
        "startTime": 106.81,
        "endTime": 107.67,
        "nextLineTime": 107.77,
        "text": "Trăng thì nằm dưới đất còn",
        "words": [
          {
            "word": "Trăng",
            "start": 106.81,
            "end": 107.01
          },
          {
            "word": "thì",
            "start": 107.01,
            "end": 107.13
          },
          {
            "word": "nằm",
            "start": 107.13,
            "end": 107.25
          },
          {
            "word": "dưới",
            "start": 107.25,
            "end": 107.41
          },
          {
            "word": "đất",
            "start": 107.41,
            "end": 107.53
          },
          {
            "word": "còn",
            "start": 107.53,
            "end": 107.65
          }
        ]
      },
      {
        "id": 38,
        "startTime": 107.77,
        "endTime": 108.96,
        "nextLineTime": 109.06,
        "text": "mặt trời thì cười hiền thầm thì",
        "words": [
          {
            "word": "mặt",
            "start": 107.77,
            "end": 107.91
          },
          {
            "word": "trời",
            "start": 107.91,
            "end": 108.1
          },
          {
            "word": "thì",
            "start": 108.1,
            "end": 108.24
          },
          {
            "word": "cười",
            "start": 108.24,
            "end": 108.43
          },
          {
            "word": "hiền",
            "start": 108.43,
            "end": 108.62
          },
          {
            "word": "thầm",
            "start": 108.62,
            "end": 108.81
          },
          {
            "word": "thì",
            "start": 108.81,
            "end": 108.95
          }
        ]
      },
      {
        "id": 39,
        "startTime": 109.06,
        "endTime": 111.18,
        "nextLineTime": 111.28,
        "text": "Hô biến cây chổi thành ghi-ta",
        "words": [
          {
            "word": "Hô",
            "start": 109.06,
            "end": 109.24
          },
          {
            "word": "biến",
            "start": 109.24,
            "end": 109.59
          },
          {
            "word": "cây",
            "start": 109.59,
            "end": 109.86
          },
          {
            "word": "chổi",
            "start": 109.86,
            "end": 110.21
          },
          {
            "word": "thành",
            "start": 110.21,
            "end": 110.65
          },
          {
            "word": "ghi-ta",
            "start": 110.65,
            "end": 111.18
          }
        ]
      },
      {
        "id": 40,
        "startTime": 111.28,
        "endTime": 113.36,
        "nextLineTime": 113.46,
        "text": "Mở thêm concert trước sân nhà",
        "words": [
          {
            "word": "Mở",
            "start": 111.28,
            "end": 111.45
          },
          {
            "word": "thêm",
            "start": 111.45,
            "end": 111.8
          },
          {
            "word": "concert",
            "start": 111.8,
            "end": 112.41
          },
          {
            "word": "trước",
            "start": 112.41,
            "end": 112.84
          },
          {
            "word": "sân",
            "start": 112.84,
            "end": 113.1
          },
          {
            "word": "nhà",
            "start": 113.1,
            "end": 113.36
          }
        ]
      },
      {
        "id": 41,
        "startTime": 113.46,
        "endTime": 115.45,
        "nextLineTime": 115.55,
        "text": "Oẳn tù tì, ra cái gì? Ra cái gì?",
        "words": [
          {
            "word": "Oẳn",
            "start": 113.46,
            "end": 113.72
          },
          {
            "word": "tù",
            "start": 113.72,
            "end": 113.89
          },
          {
            "word": "tì,",
            "start": 113.89,
            "end": 114.06
          },
          {
            "word": "ra",
            "start": 114.06,
            "end": 114.23
          },
          {
            "word": "cái",
            "start": 114.23,
            "end": 114.49
          },
          {
            "word": "gì?",
            "start": 114.49,
            "end": 114.75
          },
          {
            "word": "Ra",
            "start": 114.75,
            "end": 114.92
          },
          {
            "word": "cái",
            "start": 114.92,
            "end": 115.18
          },
          {
            "word": "gì?",
            "start": 115.18,
            "end": 115.44
          }
        ]
      },
      {
        "id": 42,
        "startTime": 115.55,
        "endTime": 117.73,
        "nextLineTime": 117.83,
        "text": "Oẳn tù tì, ra cái ổ bánh mì",
        "words": [
          {
            "word": "Oẳn",
            "start": 115.55,
            "end": 115.88
          },
          {
            "word": "tù",
            "start": 115.88,
            "end": 116.1
          },
          {
            "word": "tì,",
            "start": 116.1,
            "end": 116.32
          },
          {
            "word": "ra",
            "start": 116.32,
            "end": 116.54
          },
          {
            "word": "cái",
            "start": 116.54,
            "end": 116.87
          },
          {
            "word": "ổ",
            "start": 116.87,
            "end": 117.09
          },
          {
            "word": "bánh",
            "start": 117.09,
            "end": 117.53
          },
          {
            "word": "mì",
            "start": 117.53,
            "end": 117.75
          }
        ]
      },
      {
        "id": 43,
        "startTime": 117.83,
        "endTime": 119.54,
        "nextLineTime": 119.64,
        "text": "Oẳn tù tì ta oẳn tù tì",
        "words": [
          {
            "word": "Oẳn",
            "start": 117.83,
            "end": 118.15
          },
          {
            "word": "tù",
            "start": 118.15,
            "end": 118.36
          },
          {
            "word": "tì",
            "start": 118.36,
            "end": 118.57
          },
          {
            "word": "ta",
            "start": 118.57,
            "end": 118.78
          },
          {
            "word": "oẳn",
            "start": 118.78,
            "end": 119.1
          },
          {
            "word": "tù",
            "start": 119.1,
            "end": 119.31
          },
          {
            "word": "tì",
            "start": 119.31,
            "end": 119.52
          }
        ]
      },
      {
        "id": 44,
        "startTime": 119.64,
        "endTime": 122.0,
        "nextLineTime": 122.1,
        "text": "Ra những thàng ngày hồn nhiên, ới a ới a",
        "words": [
          {
            "word": "Ra",
            "start": 119.64,
            "end": 119.79
          },
          {
            "word": "những",
            "start": 119.79,
            "end": 120.16
          },
          {
            "word": "thàng",
            "start": 120.16,
            "end": 120.53
          },
          {
            "word": "ngày",
            "start": 120.53,
            "end": 120.83
          },
          {
            "word": "hồn",
            "start": 120.83,
            "end": 121.05
          },
          {
            "word": "nhiên,",
            "start": 121.05,
            "end": 121.42
          },
          {
            "word": "ới",
            "start": 121.42,
            "end": 121.57
          },
          {
            "word": "a",
            "start": 121.57,
            "end": 121.72
          },
          {
            "word": "ới",
            "start": 121.72,
            "end": 121.87
          },
          {
            "word": "a",
            "start": 121.87,
            "end": 122.02
          }
        ]
      },
      {
        "id": 45,
        "startTime": 122.1,
        "endTime": 126.48,
        "nextLineTime": 126.58,
        "text": "Một với một với một, một với một là hai",
        "words": [
          {
            "word": "Một",
            "start": 122.1,
            "end": 122.55
          },
          {
            "word": "với",
            "start": 122.55,
            "end": 123.0
          },
          {
            "word": "một",
            "start": 123.0,
            "end": 123.45
          },
          {
            "word": "với",
            "start": 123.45,
            "end": 123.9
          },
          {
            "word": "một,",
            "start": 123.9,
            "end": 124.35
          },
          {
            "word": "một",
            "start": 124.35,
            "end": 124.8
          },
          {
            "word": "với",
            "start": 124.8,
            "end": 125.25
          },
          {
            "word": "một",
            "start": 125.25,
            "end": 125.7
          },
          {
            "word": "là",
            "start": 125.7,
            "end": 126.0
          },
          {
            "word": "hai",
            "start": 126.0,
            "end": 126.45
          }
        ]
      },
      {
        "id": 46,
        "startTime": 126.58,
        "endTime": 130.84,
        "nextLineTime": 130.94,
        "text": "Một mơ mộng cho lòng này thêm nặng tình ai",
        "words": [
          {
            "word": "Một",
            "start": 126.58,
            "end": 126.97
          },
          {
            "word": "mơ",
            "start": 126.97,
            "end": 127.23
          },
          {
            "word": "mộng",
            "start": 127.23,
            "end": 127.75
          },
          {
            "word": "cho",
            "start": 127.75,
            "end": 128.14
          },
          {
            "word": "lòng",
            "start": 128.14,
            "end": 128.66
          },
          {
            "word": "này",
            "start": 128.66,
            "end": 129.05
          },
          {
            "word": "thêm",
            "start": 129.05,
            "end": 129.57
          },
          {
            "word": "nặng",
            "start": 129.57,
            "end": 130.09
          },
          {
            "word": "tình",
            "start": 130.09,
            "end": 130.61
          },
          {
            "word": "ai",
            "start": 130.61,
            "end": 130.87
          }
        ]
      },
      {
        "id": 47,
        "startTime": 130.94,
        "endTime": 135.2,
        "nextLineTime": 135.3,
        "text": "Một với một với một, một với một là hai",
        "words": [
          {
            "word": "Một",
            "start": 130.94,
            "end": 131.38
          },
          {
            "word": "với",
            "start": 131.38,
            "end": 131.82
          },
          {
            "word": "một",
            "start": 131.82,
            "end": 132.26
          },
          {
            "word": "với",
            "start": 132.26,
            "end": 132.7
          },
          {
            "word": "một,",
            "start": 132.7,
            "end": 133.14
          },
          {
            "word": "một",
            "start": 133.14,
            "end": 133.58
          },
          {
            "word": "với",
            "start": 133.58,
            "end": 134.02
          },
          {
            "word": "một",
            "start": 134.02,
            "end": 134.46
          },
          {
            "word": "là",
            "start": 134.46,
            "end": 134.75
          },
          {
            "word": "hai",
            "start": 134.75,
            "end": 135.19
          }
        ]
      },
      {
        "id": 48,
        "startTime": 135.3,
        "endTime": 138.63,
        "nextLineTime": 138.73,
        "text": "Một giai điệu quen thuộc, à i ai í ai",
        "words": [
          {
            "word": "Một",
            "start": 135.3,
            "end": 135.63
          },
          {
            "word": "giai",
            "start": 135.63,
            "end": 136.07
          },
          {
            "word": "điệu",
            "start": 136.07,
            "end": 136.51
          },
          {
            "word": "quen",
            "start": 136.51,
            "end": 136.95
          },
          {
            "word": "thuộc,",
            "start": 136.95,
            "end": 137.5
          },
          {
            "word": "à",
            "start": 137.5,
            "end": 137.72
          },
          {
            "word": "i",
            "start": 137.72,
            "end": 137.94
          },
          {
            "word": "ai",
            "start": 137.94,
            "end": 138.16
          },
          {
            "word": "í",
            "start": 138.16,
            "end": 138.38
          },
          {
            "word": "ai",
            "start": 138.38,
            "end": 138.6
          }
        ]
      },
      {
        "id": 49,
        "startTime": 138.73,
        "endTime": 140.77,
        "nextLineTime": 140.87,
        "text": "Cho ta bé lại (la-la-la-la),",
        "words": [
          {
            "word": "Cho",
            "start": 138.73,
            "end": 139.0
          },
          {
            "word": "ta",
            "start": 139.0,
            "end": 139.18
          },
          {
            "word": "bé",
            "start": 139.18,
            "end": 139.36
          },
          {
            "word": "lại",
            "start": 139.36,
            "end": 139.63
          },
          {
            "word": "(la-la-la-la),",
            "start": 139.63,
            "end": 140.78
          }
        ]
      },
      {
        "id": 50,
        "startTime": 140.87,
        "endTime": 143.08,
        "nextLineTime": 143.18,
        "text": "cho ta nhỏ lại (la-la-la-la)",
        "words": [
          {
            "word": "cho",
            "start": 140.87,
            "end": 141.15
          },
          {
            "word": "ta",
            "start": 141.15,
            "end": 141.33
          },
          {
            "word": "nhỏ",
            "start": 141.33,
            "end": 141.61
          },
          {
            "word": "lại",
            "start": 141.61,
            "end": 141.89
          },
          {
            "word": "(la-la-la-la)",
            "start": 141.89,
            "end": 143.09
          }
        ]
      },
      {
        "id": 51,
        "startTime": 143.18,
        "endTime": 144.28,
        "nextLineTime": 144.38,
        "text": "Cho ta bé lại,",
        "words": [
          {
            "word": "Cho",
            "start": 143.18,
            "end": 143.51
          },
          {
            "word": "ta",
            "start": 143.51,
            "end": 143.73
          },
          {
            "word": "bé",
            "start": 143.73,
            "end": 143.95
          },
          {
            "word": "lại,",
            "start": 143.95,
            "end": 144.28
          }
        ]
      },
      {
        "id": 52,
        "startTime": 144.38,
        "endTime": 147.12,
        "nextLineTime": 147.22,
        "text": "woah (la-la-la-la), nhỏ xíu xiu",
        "words": [
          {
            "word": "woah",
            "start": 144.38,
            "end": 144.8
          },
          {
            "word": "(la-la-la-la),",
            "start": 144.8,
            "end": 146.17
          },
          {
            "word": "nhỏ",
            "start": 146.17,
            "end": 146.49
          },
          {
            "word": "xíu",
            "start": 146.49,
            "end": 146.81
          },
          {
            "word": "xiu",
            "start": 146.81,
            "end": 147.13
          }
        ]
      },
      {
        "id": 53,
        "startTime": 147.22,
        "endTime": 149.56,
        "nextLineTime": 149.66,
        "text": "Xin cho ta bé lại (la-la-la-la)",
        "words": [
          {
            "word": "Xin",
            "start": 147.22,
            "end": 147.49
          },
          {
            "word": "cho",
            "start": 147.49,
            "end": 147.76
          },
          {
            "word": "ta",
            "start": 147.76,
            "end": 147.94
          },
          {
            "word": "bé",
            "start": 147.94,
            "end": 148.12
          },
          {
            "word": "lại",
            "start": 148.12,
            "end": 148.39
          },
          {
            "word": "(la-la-la-la)",
            "start": 148.39,
            "end": 149.56
          }
        ]
      },
      {
        "id": 54,
        "startTime": 149.66,
        "endTime": 151.75,
        "nextLineTime": 151.85,
        "text": "Cho ta nhỏ lại (la-la-la-la)",
        "words": [
          {
            "word": "Cho",
            "start": 149.66,
            "end": 149.92
          },
          {
            "word": "ta",
            "start": 149.92,
            "end": 150.09
          },
          {
            "word": "nhỏ",
            "start": 150.09,
            "end": 150.35
          },
          {
            "word": "lại",
            "start": 150.35,
            "end": 150.61
          },
          {
            "word": "(la-la-la-la)",
            "start": 150.61,
            "end": 151.74
          }
        ]
      },
      {
        "id": 55,
        "startTime": 151.85,
        "endTime": 154.45,
        "nextLineTime": 154.55,
        "text": "Cho ta bé lại, woah (la-la-la-la), nhỏ",
        "words": [
          {
            "word": "Cho",
            "start": 151.85,
            "end": 152.11
          },
          {
            "word": "ta",
            "start": 152.11,
            "end": 152.28
          },
          {
            "word": "bé",
            "start": 152.28,
            "end": 152.45
          },
          {
            "word": "lại,",
            "start": 152.45,
            "end": 152.71
          },
          {
            "word": "woah",
            "start": 152.71,
            "end": 153.06
          },
          {
            "word": "(la-la-la-la),",
            "start": 153.06,
            "end": 154.19
          },
          {
            "word": "nhỏ",
            "start": 154.19,
            "end": 154.45
          }
        ]
      },
      {
        "id": 56,
        "startTime": 154.55,
        "endTime": 156.76,
        "nextLineTime": 156.86,
        "text": "xíu, nhỏ xiu, nhỏ xíu, nhỏ xiu",
        "words": [
          {
            "word": "xíu,",
            "start": 154.55,
            "end": 154.87
          },
          {
            "word": "nhỏ",
            "start": 154.87,
            "end": 155.19
          },
          {
            "word": "xiu,",
            "start": 155.19,
            "end": 155.51
          },
          {
            "word": "nhỏ",
            "start": 155.51,
            "end": 155.83
          },
          {
            "word": "xíu,",
            "start": 155.83,
            "end": 156.15
          },
          {
            "word": "nhỏ",
            "start": 156.15,
            "end": 156.47
          },
          {
            "word": "xiu",
            "start": 156.47,
            "end": 156.79
          }
        ]
      },
      {
        "id": 57,
        "startTime": 156.86,
        "endTime": 158.72,
        "nextLineTime": 158.82,
        "text": "Có ai đang trưởng thành",
        "words": [
          {
            "word": "Có",
            "start": 156.86,
            "end": 157.06
          },
          {
            "word": "ai",
            "start": 157.06,
            "end": 157.26
          },
          {
            "word": "đang",
            "start": 157.26,
            "end": 157.65
          },
          {
            "word": "trưởng",
            "start": 157.65,
            "end": 158.24
          },
          {
            "word": "thành",
            "start": 158.24,
            "end": 158.73
          }
        ]
      },
      {
        "id": 58,
        "startTime": 158.82,
        "endTime": 161.55,
        "nextLineTime": 161.65,
        "text": "Muốn ngây thơ cười đùa một lần nữa không?",
        "words": [
          {
            "word": "Muốn",
            "start": 158.82,
            "end": 159.15
          },
          {
            "word": "ngây",
            "start": 159.15,
            "end": 159.48
          },
          {
            "word": "thơ",
            "start": 159.48,
            "end": 159.73
          },
          {
            "word": "cười",
            "start": 159.73,
            "end": 160.06
          },
          {
            "word": "đùa",
            "start": 160.06,
            "end": 160.31
          },
          {
            "word": "một",
            "start": 160.31,
            "end": 160.56
          },
          {
            "word": "lần",
            "start": 160.56,
            "end": 160.81
          },
          {
            "word": "nữa",
            "start": 160.81,
            "end": 161.06
          },
          {
            "word": "không?",
            "start": 161.06,
            "end": 161.56
          }
        ]
      },
      {
        "id": 59,
        "startTime": 161.65,
        "endTime": 163.23,
        "nextLineTime": 163.33,
        "text": "Đi theo tụi mình",
        "words": [
          {
            "word": "Đi",
            "start": 161.65,
            "end": 161.89
          },
          {
            "word": "theo",
            "start": 161.89,
            "end": 162.38
          },
          {
            "word": "tụi",
            "start": 162.38,
            "end": 162.74
          },
          {
            "word": "mình",
            "start": 162.74,
            "end": 163.23
          }
        ]
      },
      {
        "id": 60,
        "startTime": 163.33,
        "endTime": 165.42,
        "nextLineTime": 165.52,
        "text": "Lãng du trong hành trình tuyệt vời",
        "words": [
          {
            "word": "Lãng",
            "start": 163.33,
            "end": 163.63
          },
          {
            "word": "du",
            "start": 163.63,
            "end": 163.78
          },
          {
            "word": "trong",
            "start": 163.78,
            "end": 164.15
          },
          {
            "word": "hành",
            "start": 164.15,
            "end": 164.45
          },
          {
            "word": "trình",
            "start": 164.45,
            "end": 164.82
          },
          {
            "word": "tuyệt",
            "start": 164.82,
            "end": 165.19
          },
          {
            "word": "vời",
            "start": 165.19,
            "end": 165.41
          }
        ]
      },
      {
        "id": 61,
        "startTime": 165.52,
        "endTime": 168.64,
        "nextLineTime": 168.74,
        "text": "Hãy nhanh lên nào!",
        "words": [
          {
            "word": "Hãy",
            "start": 165.52,
            "end": 166.14
          },
          {
            "word": "nhanh",
            "start": 166.14,
            "end": 167.18
          },
          {
            "word": "lên",
            "start": 167.18,
            "end": 167.8
          },
          {
            "word": "nào!",
            "start": 167.8,
            "end": 168.63
          }
        ]
      },
      {
        "id": 62,
        "startTime": 168.74,
        "endTime": 171.3,
        "nextLineTime": 171.4,
        "text": "Mau cho ta bé lại, woah, nhỏ",
        "words": [
          {
            "word": "Mau",
            "start": 168.74,
            "end": 169.12
          },
          {
            "word": "cho",
            "start": 169.12,
            "end": 169.5
          },
          {
            "word": "ta",
            "start": 169.5,
            "end": 169.76
          },
          {
            "word": "bé",
            "start": 169.76,
            "end": 170.02
          },
          {
            "word": "lại,",
            "start": 170.02,
            "end": 170.4
          },
          {
            "word": "woah,",
            "start": 170.4,
            "end": 170.91
          },
          {
            "word": "nhỏ",
            "start": 170.91,
            "end": 171.29
          }
        ]
      },
      {
        "id": 63,
        "startTime": 171.4,
        "endTime": 177.0,
        "nextLineTime": 179.4,
        "text": "xíu, nhỏ xiu, nhỏ xíu, nhỏ xiu",
        "words": [
          {
            "word": "xíu,",
            "start": 171.4,
            "end": 172.2
          },
          {
            "word": "nhỏ",
            "start": 172.2,
            "end": 173.0
          },
          {
            "word": "xiu,",
            "start": 173.0,
            "end": 173.8
          },
          {
            "word": "nhỏ",
            "start": 173.8,
            "end": 174.6
          },
          {
            "word": "xíu,",
            "start": 174.6,
            "end": 175.4
          },
          {
            "word": "nhỏ",
            "start": 175.4,
            "end": 176.2
          },
          {
            "word": "xiu",
            "start": 176.2,
            "end": 177.0
          }
        ]
      },
      {
        "id": 64,
        "startTime": 179.4,
        "endTime": 185.0,
        "nextLineTime": 188.0,
        "text": "Lâu lắm mới gặp í a người quen",
        "words": [
          {
            "word": "Lâu",
            "start": 179.4,
            "end": 180.07
          },
          {
            "word": "lắm",
            "start": 180.07,
            "end": 180.74
          },
          {
            "word": "mới",
            "start": 180.74,
            "end": 181.41
          },
          {
            "word": "gặp",
            "start": 181.41,
            "end": 182.08
          },
          {
            "word": "í",
            "start": 182.08,
            "end": 182.53
          },
          {
            "word": "a",
            "start": 182.53,
            "end": 182.98
          },
          {
            "word": "người",
            "start": 182.98,
            "end": 184.1
          },
          {
            "word": "quen",
            "start": 184.1,
            "end": 185.0
          }
        ]
      },
      {
        "id": 65,
        "startTime": 188.0,
        "endTime": 193.6,
        "nextLineTime": 195.51,
        "text": "Trăm mối tơ vò cứ như tự quên",
        "words": [
          {
            "word": "Trăm",
            "start": 188.0,
            "end": 189.02
          },
          {
            "word": "mối",
            "start": 189.02,
            "end": 189.78
          },
          {
            "word": "tơ",
            "start": 189.78,
            "end": 190.29
          },
          {
            "word": "vò",
            "start": 190.29,
            "end": 190.8
          },
          {
            "word": "cứ",
            "start": 190.8,
            "end": 191.31
          },
          {
            "word": "như",
            "start": 191.31,
            "end": 192.07
          },
          {
            "word": "tự",
            "start": 192.07,
            "end": 192.58
          },
          {
            "word": "quên",
            "start": 192.58,
            "end": 193.6
          }
        ]
      },
      {
        "id": 66,
        "startTime": 195.51,
        "endTime": 199.82,
        "nextLineTime": 199.92,
        "text": "Rồi tự dưng muốn ôm, muốn ốm lấy thân",
        "words": [
          {
            "word": "Rồi",
            "start": 195.51,
            "end": 195.97
          },
          {
            "word": "tự",
            "start": 195.97,
            "end": 196.28
          },
          {
            "word": "dưng",
            "start": 196.28,
            "end": 196.9
          },
          {
            "word": "muốn",
            "start": 196.9,
            "end": 197.52
          },
          {
            "word": "ôm,",
            "start": 197.52,
            "end": 197.83
          },
          {
            "word": "muốn",
            "start": 197.83,
            "end": 198.45
          },
          {
            "word": "ốm",
            "start": 198.45,
            "end": 198.76
          },
          {
            "word": "lấy",
            "start": 198.76,
            "end": 199.22
          },
          {
            "word": "thân",
            "start": 199.22,
            "end": 199.84
          }
        ]
      },
      {
        "id": 67,
        "startTime": 199.92,
        "endTime": 204.13,
        "nextLineTime": 204.23,
        "text": "Lại được làm bé thơ, bé thơ, bé thơ",
        "words": [
          {
            "word": "Lại",
            "start": 199.92,
            "end": 200.43
          },
          {
            "word": "được",
            "start": 200.43,
            "end": 201.1
          },
          {
            "word": "làm",
            "start": 201.1,
            "end": 201.61
          },
          {
            "word": "bé",
            "start": 201.61,
            "end": 201.95
          },
          {
            "word": "thơ,",
            "start": 201.95,
            "end": 202.46
          },
          {
            "word": "bé",
            "start": 202.46,
            "end": 202.8
          },
          {
            "word": "thơ,",
            "start": 202.8,
            "end": 203.31
          },
          {
            "word": "bé",
            "start": 203.31,
            "end": 203.65
          },
          {
            "word": "thơ",
            "start": 203.65,
            "end": 204.16
          }
        ]
      },
      {
        "id": 68,
        "startTime": 204.23,
        "endTime": 206.63,
        "nextLineTime": 206.73,
        "text": "Tìm về những giấc mơ,",
        "words": [
          {
            "word": "Tìm",
            "start": 204.23,
            "end": 204.68
          },
          {
            "word": "về",
            "start": 204.68,
            "end": 204.98
          },
          {
            "word": "những",
            "start": 204.98,
            "end": 205.73
          },
          {
            "word": "giấc",
            "start": 205.73,
            "end": 206.33
          },
          {
            "word": "mơ,",
            "start": 206.33,
            "end": 206.63
          }
        ]
      },
      {
        "id": 69,
        "startTime": 206.73,
        "endTime": 212.33,
        "nextLineTime": 212.49,
        "text": "giấc mơ, giấc mơ, giấc mơ",
        "words": [
          {
            "word": "giấc",
            "start": 206.73,
            "end": 207.97
          },
          {
            "word": "mơ,",
            "start": 207.97,
            "end": 208.59
          },
          {
            "word": "giấc",
            "start": 208.59,
            "end": 209.83
          },
          {
            "word": "mơ,",
            "start": 209.83,
            "end": 210.45
          },
          {
            "word": "giấc",
            "start": 210.45,
            "end": 211.69
          },
          {
            "word": "mơ",
            "start": 211.69,
            "end": 212.31
          }
        ]
      },
      {
        "id": 70,
        "startTime": 212.49,
        "endTime": 214.68,
        "nextLineTime": 214.78,
        "text": "Chi chi chành chành",
        "words": [
          {
            "word": "Chi",
            "start": 212.49,
            "end": 212.9
          },
          {
            "word": "chi",
            "start": 212.9,
            "end": 213.31
          },
          {
            "word": "chành",
            "start": 213.31,
            "end": 213.99
          },
          {
            "word": "chành",
            "start": 213.99,
            "end": 214.67
          }
        ]
      },
      {
        "id": 71,
        "startTime": 214.78,
        "endTime": 216.87,
        "nextLineTime": 216.97,
        "text": "Cái đanh thổi lửa",
        "words": [
          {
            "word": "Cái",
            "start": 214.78,
            "end": 215.23
          },
          {
            "word": "đanh",
            "start": 215.23,
            "end": 215.83
          },
          {
            "word": "thổi",
            "start": 215.83,
            "end": 216.43
          },
          {
            "word": "lửa",
            "start": 216.43,
            "end": 216.88
          }
        ]
      },
      {
        "id": 72,
        "startTime": 216.97,
        "endTime": 219.05,
        "nextLineTime": 219.15,
        "text": "Con ngựa đứt cương",
        "words": [
          {
            "word": "Con",
            "start": 216.97,
            "end": 217.39
          },
          {
            "word": "ngựa",
            "start": 217.39,
            "end": 217.94
          },
          {
            "word": "đứt",
            "start": 217.94,
            "end": 218.36
          },
          {
            "word": "cương",
            "start": 218.36,
            "end": 219.05
          }
        ]
      },
      {
        "id": 73,
        "startTime": 219.15,
        "endTime": 221.1,
        "nextLineTime": 221.2,
        "text": "Ba vương ngũ đế",
        "words": [
          {
            "word": "Ba",
            "start": 219.15,
            "end": 219.47
          },
          {
            "word": "vương",
            "start": 219.47,
            "end": 220.28
          },
          {
            "word": "ngũ",
            "start": 220.28,
            "end": 220.77
          },
          {
            "word": "đế",
            "start": 220.77,
            "end": 221.09
          }
        ]
      },
      {
        "id": 74,
        "startTime": 221.2,
        "endTime": 223.33,
        "nextLineTime": 223.43,
        "text": "Bắt dế đi tìm",
        "words": [
          {
            "word": "Bắt",
            "start": 221.2,
            "end": 221.84
          },
          {
            "word": "dế",
            "start": 221.84,
            "end": 222.27
          },
          {
            "word": "đi",
            "start": 222.27,
            "end": 222.7
          },
          {
            "word": "tìm",
            "start": 222.7,
            "end": 223.34
          }
        ]
      },
      {
        "id": 75,
        "startTime": 223.43,
        "endTime": 225.54,
        "nextLineTime": 225.64,
        "text": "Ù à ù ập!",
        "words": [
          {
            "word": "Ù",
            "start": 223.43,
            "end": 223.9
          },
          {
            "word": "à",
            "start": 223.9,
            "end": 224.37
          },
          {
            "word": "ù",
            "start": 224.37,
            "end": 224.84
          },
          {
            "word": "ập!",
            "start": 224.84,
            "end": 225.54
          }
        ]
      },
      {
        "id": 76,
        "startTime": 225.64,
        "endTime": 227.76,
        "nextLineTime": 227.86,
        "text": "Chi chi chành chành",
        "words": [
          {
            "word": "Chi",
            "start": 225.64,
            "end": 226.04
          },
          {
            "word": "chi",
            "start": 226.04,
            "end": 226.44
          },
          {
            "word": "chành",
            "start": 226.44,
            "end": 227.1
          },
          {
            "word": "chành",
            "start": 227.1,
            "end": 227.76
          }
        ]
      },
      {
        "id": 77,
        "startTime": 227.86,
        "endTime": 229.99,
        "nextLineTime": 230.09,
        "text": "Cái đanh thổi lửa",
        "words": [
          {
            "word": "Cái",
            "start": 227.86,
            "end": 228.32
          },
          {
            "word": "đanh",
            "start": 228.32,
            "end": 228.93
          },
          {
            "word": "thổi",
            "start": 228.93,
            "end": 229.54
          },
          {
            "word": "lửa",
            "start": 229.54,
            "end": 230.0
          }
        ]
      },
      {
        "id": 78,
        "startTime": 230.09,
        "endTime": 232.08,
        "nextLineTime": 232.18,
        "text": "Con ngựa đứt cương",
        "words": [
          {
            "word": "Con",
            "start": 230.09,
            "end": 230.49
          },
          {
            "word": "ngựa",
            "start": 230.49,
            "end": 231.02
          },
          {
            "word": "đứt",
            "start": 231.02,
            "end": 231.42
          },
          {
            "word": "cương",
            "start": 231.42,
            "end": 232.08
          }
        ]
      },
      {
        "id": 79,
        "startTime": 232.18,
        "endTime": 234.2,
        "nextLineTime": 234.3,
        "text": "Ba vương ngũ đế",
        "words": [
          {
            "word": "Ba",
            "start": 232.18,
            "end": 232.52
          },
          {
            "word": "vương",
            "start": 232.52,
            "end": 233.36
          },
          {
            "word": "ngũ",
            "start": 233.36,
            "end": 233.87
          },
          {
            "word": "đế",
            "start": 233.87,
            "end": 234.21
          }
        ]
      },
      {
        "id": 80,
        "startTime": 234.3,
        "endTime": 236.49,
        "nextLineTime": 236.59,
        "text": "Bắt dế đi tìm",
        "words": [
          {
            "word": "Bắt",
            "start": 234.3,
            "end": 234.96
          },
          {
            "word": "dế",
            "start": 234.96,
            "end": 235.4
          },
          {
            "word": "đi",
            "start": 235.4,
            "end": 235.84
          },
          {
            "word": "tìm",
            "start": 235.84,
            "end": 236.5
          }
        ]
      },
      {
        "id": 81,
        "startTime": 236.59,
        "endTime": 241.36,
        "nextLineTime": 241.46,
        "text": "Ù à ù ập!",
        "words": [
          {
            "word": "Ù",
            "start": 236.59,
            "end": 237.65
          },
          {
            "word": "à",
            "start": 237.65,
            "end": 238.71
          },
          {
            "word": "ù",
            "start": 238.71,
            "end": 239.77
          },
          {
            "word": "ập!",
            "start": 239.77,
            "end": 241.36
          }
        ]
      },
      {
        "id": 82,
        "startTime": 241.46,
        "endTime": 243.36,
        "nextLineTime": 243.46,
        "text": "Cho ta bé lại (la-la-la-la),",
        "words": [
          {
            "word": "Cho",
            "start": 241.46,
            "end": 241.71
          },
          {
            "word": "ta",
            "start": 241.71,
            "end": 241.88
          },
          {
            "word": "bé",
            "start": 241.88,
            "end": 242.05
          },
          {
            "word": "lại",
            "start": 242.05,
            "end": 242.3
          },
          {
            "word": "(la-la-la-la),",
            "start": 242.3,
            "end": 243.37
          }
        ]
      },
      {
        "id": 83,
        "startTime": 243.46,
        "endTime": 245.54,
        "nextLineTime": 245.64,
        "text": "cho ta nhỏ lại (la-la-la-la)",
        "words": [
          {
            "word": "cho",
            "start": 243.46,
            "end": 243.72
          },
          {
            "word": "ta",
            "start": 243.72,
            "end": 243.89
          },
          {
            "word": "nhỏ",
            "start": 243.89,
            "end": 244.15
          },
          {
            "word": "lại",
            "start": 244.15,
            "end": 244.41
          },
          {
            "word": "(la-la-la-la)",
            "start": 244.41,
            "end": 245.54
          }
        ]
      },
      {
        "id": 84,
        "startTime": 245.64,
        "endTime": 246.8,
        "nextLineTime": 246.9,
        "text": "Cho ta bé lại,",
        "words": [
          {
            "word": "Cho",
            "start": 245.64,
            "end": 245.99
          },
          {
            "word": "ta",
            "start": 245.99,
            "end": 246.22
          },
          {
            "word": "bé",
            "start": 246.22,
            "end": 246.45
          },
          {
            "word": "lại,",
            "start": 246.45,
            "end": 246.8
          }
        ]
      },
      {
        "id": 85,
        "startTime": 246.9,
        "endTime": 249.79,
        "nextLineTime": 249.89,
        "text": "woah (la-la-la-la), nhỏ xíu xiu",
        "words": [
          {
            "word": "woah",
            "start": 246.9,
            "end": 247.34
          },
          {
            "word": "(la-la-la-la),",
            "start": 247.34,
            "end": 248.78
          },
          {
            "word": "nhỏ",
            "start": 248.78,
            "end": 249.11
          },
          {
            "word": "xíu",
            "start": 249.11,
            "end": 249.44
          },
          {
            "word": "xiu",
            "start": 249.44,
            "end": 249.77
          }
        ]
      },
      {
        "id": 86,
        "startTime": 249.89,
        "endTime": 252.19,
        "nextLineTime": 252.29,
        "text": "Xin cho ta bé lại (la-la-la-la)",
        "words": [
          {
            "word": "Xin",
            "start": 249.89,
            "end": 250.16
          },
          {
            "word": "cho",
            "start": 250.16,
            "end": 250.43
          },
          {
            "word": "ta",
            "start": 250.43,
            "end": 250.61
          },
          {
            "word": "bé",
            "start": 250.61,
            "end": 250.79
          },
          {
            "word": "lại",
            "start": 250.79,
            "end": 251.06
          },
          {
            "word": "(la-la-la-la)",
            "start": 251.06,
            "end": 252.21
          }
        ]
      },
      {
        "id": 87,
        "startTime": 252.29,
        "endTime": 254.33,
        "nextLineTime": 254.43,
        "text": "Cho ta nhỏ lại (la-la-la-la)",
        "words": [
          {
            "word": "Cho",
            "start": 252.29,
            "end": 252.54
          },
          {
            "word": "ta",
            "start": 252.54,
            "end": 252.71
          },
          {
            "word": "nhỏ",
            "start": 252.71,
            "end": 252.97
          },
          {
            "word": "lại",
            "start": 252.97,
            "end": 253.22
          },
          {
            "word": "(la-la-la-la)",
            "start": 253.22,
            "end": 254.33
          }
        ]
      },
      {
        "id": 88,
        "startTime": 254.43,
        "endTime": 257.01,
        "nextLineTime": 257.11,
        "text": "Cho ta bé lại, woah (la-la-la-la), nhỏ",
        "words": [
          {
            "word": "Cho",
            "start": 254.43,
            "end": 254.69
          },
          {
            "word": "ta",
            "start": 254.69,
            "end": 254.86
          },
          {
            "word": "bé",
            "start": 254.86,
            "end": 255.03
          },
          {
            "word": "lại,",
            "start": 255.03,
            "end": 255.29
          },
          {
            "word": "woah",
            "start": 255.29,
            "end": 255.63
          },
          {
            "word": "(la-la-la-la),",
            "start": 255.63,
            "end": 256.75
          },
          {
            "word": "nhỏ",
            "start": 256.75,
            "end": 257.01
          }
        ]
      },
      {
        "id": 89,
        "startTime": 257.11,
        "endTime": 259.3,
        "nextLineTime": 259.4,
        "text": "xíu, nhỏ xiu, nhỏ xíu, nhỏ xiu",
        "words": [
          {
            "word": "xíu,",
            "start": 257.11,
            "end": 257.42
          },
          {
            "word": "nhỏ",
            "start": 257.42,
            "end": 257.73
          },
          {
            "word": "xiu,",
            "start": 257.73,
            "end": 258.04
          },
          {
            "word": "nhỏ",
            "start": 258.04,
            "end": 258.35
          },
          {
            "word": "xíu,",
            "start": 258.35,
            "end": 258.66
          },
          {
            "word": "nhỏ",
            "start": 258.66,
            "end": 258.97
          },
          {
            "word": "xiu",
            "start": 258.97,
            "end": 259.28
          }
        ]
      },
      {
        "id": 90,
        "startTime": 259.4,
        "endTime": 261.43,
        "nextLineTime": 261.53,
        "text": "Nhỏ xíu ah (nhỏ xíu ah),",
        "words": [
          {
            "word": "Nhỏ",
            "start": 259.4,
            "end": 259.74
          },
          {
            "word": "xíu",
            "start": 259.74,
            "end": 260.08
          },
          {
            "word": "ah",
            "start": 260.08,
            "end": 260.31
          },
          {
            "word": "(nhỏ",
            "start": 260.31,
            "end": 260.76
          },
          {
            "word": "xíu",
            "start": 260.76,
            "end": 261.1
          },
          {
            "word": "ah),",
            "start": 261.1,
            "end": 261.44
          }
        ]
      },
      {
        "id": 91,
        "startTime": 261.53,
        "endTime": 263.66,
        "nextLineTime": 263.76,
        "text": "nhỏ xíu ah (nhỏ xíu ah)",
        "words": [
          {
            "word": "nhỏ",
            "start": 261.53,
            "end": 261.88
          },
          {
            "word": "xíu",
            "start": 261.88,
            "end": 262.24
          },
          {
            "word": "ah",
            "start": 262.24,
            "end": 262.48
          },
          {
            "word": "(nhỏ",
            "start": 262.48,
            "end": 262.95
          },
          {
            "word": "xíu",
            "start": 262.95,
            "end": 263.31
          },
          {
            "word": "ah)",
            "start": 263.31,
            "end": 263.67
          }
        ]
      },
      {
        "id": 92,
        "startTime": 263.76,
        "endTime": 267.19,
        "nextLineTime": 267.29,
        "text": "Nhỏ xíu ah, woah, nhỏ xíu xiu",
        "words": [
          {
            "word": "Nhỏ",
            "start": 263.76,
            "end": 264.25
          },
          {
            "word": "xíu",
            "start": 264.25,
            "end": 264.74
          },
          {
            "word": "ah,",
            "start": 264.74,
            "end": 265.07
          },
          {
            "word": "woah,",
            "start": 265.07,
            "end": 265.72
          },
          {
            "word": "nhỏ",
            "start": 265.72,
            "end": 266.21
          },
          {
            "word": "xíu",
            "start": 266.21,
            "end": 266.7
          },
          {
            "word": "xiu",
            "start": 266.7,
            "end": 267.19
          }
        ]
      },
      {
        "id": 93,
        "startTime": 267.29,
        "endTime": 269.43,
        "nextLineTime": 269.53,
        "text": "Xin cho ta nhỏ xíu ah (nhỏ",
        "words": [
          {
            "word": "Xin",
            "start": 267.29,
            "end": 267.61
          },
          {
            "word": "cho",
            "start": 267.61,
            "end": 267.93
          },
          {
            "word": "ta",
            "start": 267.93,
            "end": 268.14
          },
          {
            "word": "nhỏ",
            "start": 268.14,
            "end": 268.46
          },
          {
            "word": "xíu",
            "start": 268.46,
            "end": 268.78
          },
          {
            "word": "ah",
            "start": 268.78,
            "end": 268.99
          },
          {
            "word": "(nhỏ",
            "start": 268.99,
            "end": 269.42
          }
        ]
      },
      {
        "id": 94,
        "startTime": 269.53,
        "endTime": 272.37,
        "nextLineTime": 272.47,
        "text": "xíu ah), nhỏ xíu ah (nhỏ xíu ah)",
        "words": [
          {
            "word": "xíu",
            "start": 269.53,
            "end": 269.88
          },
          {
            "word": "ah),",
            "start": 269.88,
            "end": 270.24
          },
          {
            "word": "nhỏ",
            "start": 270.24,
            "end": 270.6
          },
          {
            "word": "xíu",
            "start": 270.6,
            "end": 270.96
          },
          {
            "word": "ah",
            "start": 270.96,
            "end": 271.2
          },
          {
            "word": "(nhỏ",
            "start": 271.2,
            "end": 271.67
          },
          {
            "word": "xíu",
            "start": 271.67,
            "end": 272.03
          },
          {
            "word": "ah)",
            "start": 272.03,
            "end": 272.38
          }
        ]
      },
      {
        "id": 95,
        "startTime": 272.47,
        "endTime": 275.17,
        "nextLineTime": 275.27,
        "text": "Nhỏ xíu ah, woah, nhỏ xíu,",
        "words": [
          {
            "word": "Nhỏ",
            "start": 272.47,
            "end": 272.92
          },
          {
            "word": "xíu",
            "start": 272.92,
            "end": 273.37
          },
          {
            "word": "ah,",
            "start": 273.37,
            "end": 273.67
          },
          {
            "word": "woah,",
            "start": 273.67,
            "end": 274.27
          },
          {
            "word": "nhỏ",
            "start": 274.27,
            "end": 274.72
          },
          {
            "word": "xíu,",
            "start": 274.72,
            "end": 275.17
          }
        ]
      },
      {
        "id": 96,
        "startTime": 275.27,
        "endTime": 280.87,
        "nextLineTime": 283.66,
        "text": "nhỏ xiu, nhỏ xíu, nhỏ xiu",
        "words": [
          {
            "word": "nhỏ",
            "start": 275.27,
            "end": 276.2
          },
          {
            "word": "xiu,",
            "start": 276.2,
            "end": 277.13
          },
          {
            "word": "nhỏ",
            "start": 277.13,
            "end": 278.06
          },
          {
            "word": "xíu,",
            "start": 278.06,
            "end": 278.99
          },
          {
            "word": "nhỏ",
            "start": 278.99,
            "end": 279.92
          },
          {
            "word": "xiu",
            "start": 279.92,
            "end": 280.85
          }
        ]
      }
    ]
  }
];
