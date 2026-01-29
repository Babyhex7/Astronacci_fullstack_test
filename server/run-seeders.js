// Script untuk menjalankan semua seeder
const db = require("./models");

async function runSeeders() {
  try {
    console.log("🌱 Menjalankan seeders...\n");

    // Seed Articles
    const articles = [
      {
        title: "Analisis IHSG: Tren Bullish di Kuartal Pertama 2026",
        content:
          "Indeks Harga Saham Gabungan (IHSG) menunjukkan tren positif di awal tahun 2026.",
        category: "Saham",
        thumbnail_url:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500",
      },
      {
        title: "Bitcoin Menembus $100K: Apa yang Harus Diperhatikan?",
        content: "Bitcoin akhirnya menembus level psikologis $100.000.",
        category: "Crypto",
        thumbnail_url:
          "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500",
      },
      {
        title: "Panduan Lengkap Trading Forex untuk Pemula",
        content: "Trading forex bisa menjadi sumber pendapatan yang menarik.",
        category: "Forex",
        thumbnail_url:
          "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500",
      },
      {
        title: "Saham Bank: Peluang Investasi di Sektor Perbankan",
        content: "Sektor perbankan Indonesia menunjukkan kinerja solid.",
        category: "Saham",
        thumbnail_url:
          "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=500",
      },
      {
        title: "Ethereum 2.0: Revolusi Blockchain",
        content: "Upgrade Ethereum ke versi 2.0 membawa perubahan besar.",
        category: "Crypto",
        thumbnail_url:
          "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=500",
      },
      {
        title: "Strategi Swing Trading: Rahasia Profit Konsisten",
        content: "Swing trading adalah strategi yang cocok untuk trader.",
        category: "Saham",
        thumbnail_url:
          "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500",
      },
      {
        title: "USD/IDR: Analisis Fundamental dan Teknikal",
        content:
          "Pasangan mata uang USD/IDR dipengaruhi berbagai faktor ekonomi.",
        category: "Forex",
        thumbnail_url:
          "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=500",
      },
      {
        title: "Investasi Saham Dividen: Passive Income",
        content: "Saham dividen bisa menjadi sumber passive income.",
        category: "Saham",
        thumbnail_url:
          "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500",
      },
      {
        title: "Altcoin Season: Token Mana yang Potensial?",
        content: "Setelah Bitcoin rally, biasanya altcoin mengikuti.",
        category: "Crypto",
        thumbnail_url:
          "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500",
      },
      {
        title: "Risk Management: Kunci Sukses Trading",
        content: "Banyak trader gagal karena manajemen risiko yang buruk.",
        category: "Saham",
        thumbnail_url:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500",
      },
      {
        title: "Support dan Resistance Wajib Diketahui",
        content: "Memahami level support dan resistance adalah dasar trading.",
        category: "Saham",
        thumbnail_url:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500",
      },
      {
        title: "NFT dan Metaverse: Investasi Masa Depan?",
        content: "NFT dan metaverse menjadi tren baru dalam dunia digital.",
        category: "Crypto",
        thumbnail_url:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500",
      },
    ];
    await db.Article.bulkCreate(articles);
    console.log("✅ Articles seeded: 12 records");

    // Seed Videos
    const videos = [
      {
        title: "Cara Membaca Candlestick untuk Pemula",
        description: "Tutorial lengkap memahami pola candlestick.",
        category: "Teknikal",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500",
        duration: 15,
      },
      {
        title: "Fibonacci Retracement: Cara Menentukan Target Price",
        description: "Panduan menggunakan Fibonacci retracement.",
        category: "Teknikal",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500",
        duration: 20,
      },
      {
        title: "Analisis Fundamental Saham",
        description: "Tutorial cara membaca laporan keuangan.",
        category: "Fundamental",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500",
        duration: 25,
      },
      {
        title: "Moving Average: Indikator Wajib untuk Trader",
        description: "Cara menggunakan Moving Average (MA, EMA, SMA).",
        category: "Teknikal",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500",
        duration: 18,
      },
      {
        title: "RSI dan MACD: Kombinasi Indikator yang Powerful",
        description: "Tutorial menggunakan RSI dan MACD bersamaan.",
        category: "Teknikal",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500",
        duration: 22,
      },
      {
        title: "Cara Buat Trading Plan yang Efektif",
        description: "Panduan membuat trading plan lengkap.",
        category: "Strategi",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500",
        duration: 30,
      },
      {
        title: "Psikologi Trading: Mengendalikan Emosi",
        description: "Tips mengelola emosi fear dan greed.",
        category: "Psikologi",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=500",
        duration: 15,
      },
      {
        title: "Cara Trading Crypto di Bursa Indonesia",
        description: "Tutorial lengkap trading crypto yang legal.",
        category: "Crypto",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500",
        duration: 20,
      },
      {
        title: "Bollinger Bands: Strategi Trading Volatility",
        description: "Cara menggunakan Bollinger Bands.",
        category: "Teknikal",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500",
        duration: 17,
      },
      {
        title: "Money Management: Atur Modal Trading",
        description: "Panduan mengatur alokasi modal.",
        category: "Strategi",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500",
        duration: 25,
      },
      {
        title: "Scalping vs Swing Trading",
        description: "Perbandingan strategi scalping dan swing trading.",
        category: "Strategi",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500",
        duration: 20,
      },
      {
        title: "Chart Pattern: Head and Shoulders",
        description: "Tutorial mengenali pola chart klasik.",
        category: "Teknikal",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail_url:
          "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500",
        duration: 28,
      },
    ];
    await db.Video.bulkCreate(videos);
    console.log("✅ Videos seeded: 12 records");

    console.log("\n🎉 Semua seeder berhasil dijalankan!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await db.sequelize.close();
  }
}

runSeeders();
