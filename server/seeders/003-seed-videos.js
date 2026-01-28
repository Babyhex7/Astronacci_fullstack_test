"use strict";

// Seeder: Data sample video tutorial
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("videos", [
      {
        title: "Cara Membaca Candlestick untuk Pemula",
        description:
          "Tutorial lengkap memahami pola candlestick dalam trading saham dan crypto. Cocok untuk pemula yang baru belajar analisis teknikal.",
        category: "Teknikal",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500",
        duration: 15,
        created_at: new Date(),
      },
      {
        title: "Fibonacci Retracement: Cara Menentukan Target Price",
        description:
          "Panduan menggunakan Fibonacci retracement untuk menentukan level support, resistance, dan target harga.",
        category: "Teknikal",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500",
        duration: 20,
        created_at: new Date(),
      },
      {
        title: "Analisis Fundamental Saham: Cara Baca Laporan Keuangan",
        description:
          "Tutorial cara membaca dan menganalisis laporan keuangan perusahaan untuk investasi saham.",
        category: "Fundamental",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500",
        duration: 25,
        created_at: new Date(),
      },
      {
        title: "Moving Average: Indikator Wajib untuk Trader",
        description:
          "Cara menggunakan Moving Average (MA, EMA, SMA) untuk mengidentifikasi trend dan entry point.",
        category: "Teknikal",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500",
        duration: 18,
        created_at: new Date(),
      },
      {
        title: "RSI dan MACD: Kombinasi Indikator yang Powerful",
        description:
          "Tutorial menggunakan RSI dan MACD bersamaan untuk konfirmasi sinyal trading.",
        category: "Teknikal",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500",
        duration: 22,
        created_at: new Date(),
      },
      {
        title: "Cara Buat Trading Plan yang Efektif",
        description:
          "Panduan membuat trading plan lengkap termasuk entry, exit, dan risk management.",
        category: "Strategi",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500",
        duration: 30,
        created_at: new Date(),
      },
      {
        title: "Psikologi Trading: Mengendalikan Emosi saat Trading",
        description:
          "Tips mengelola emosi fear dan greed yang sering mengganggu keputusan trading.",
        category: "Psikologi",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=500",
        duration: 15,
        created_at: new Date(),
      },
      {
        title: "Cara Trading Crypto di Bursa Indonesia",
        description:
          "Tutorial lengkap trading crypto di exchange Indonesia yang legal dan aman.",
        category: "Crypto",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500",
        duration: 20,
        created_at: new Date(),
      },
      {
        title: "Bollinger Bands: Strategi Trading Volatility",
        description:
          "Cara menggunakan Bollinger Bands untuk trading saat market volatile.",
        category: "Teknikal",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500",
        duration: 17,
        created_at: new Date(),
      },
      {
        title: "Money Management: Atur Modal Trading dengan Benar",
        description:
          "Panduan mengatur alokasi modal dan position sizing dalam trading.",
        category: "Strategi",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500",
        duration: 25,
        created_at: new Date(),
      },
      {
        title: "Scalping vs Swing Trading: Mana yang Cocok untuk Anda?",
        description:
          "Perbandingan strategi scalping dan swing trading beserta kelebihan dan kekurangannya.",
        category: "Strategi",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500",
        duration: 20,
        created_at: new Date(),
      },
      {
        title: "Chart Pattern: Head and Shoulders, Double Top/Bottom",
        description:
          "Tutorial mengenali dan trading pola chart klasik yang sering muncul.",
        category: "Teknikal",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500",
        duration: 28,
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("videos", null, {});
  },
};
