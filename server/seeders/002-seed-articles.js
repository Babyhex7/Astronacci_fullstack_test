"use strict";

// Seeder: Data sample artikel analisis
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("articles", [
      {
        title: "Analisis IHSG: Tren Bullish di Kuartal Pertama 2026",
        content:
          "Indeks Harga Saham Gabungan (IHSG) menunjukkan tren positif di awal tahun 2026. Berdasarkan analisis teknikal, IHSG berpotensi menembus level resistance di 7.500 dalam beberapa minggu ke depan. Faktor pendorong utama adalah masuknya dana asing dan stabilnya nilai tukar rupiah.",
        category: "Saham",
        thumbnail_url:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500",
        created_at: new Date(),
      },
      {
        title: "Bitcoin Menembus $100K: Apa yang Harus Diperhatikan?",
        content:
          "Bitcoin akhirnya menembus level psikologis $100.000. Artikel ini membahas faktor-faktor yang mendorong rally ini dan potensi koreksi yang mungkin terjadi. Investor perlu waspada terhadap volatilitas tinggi di level ini.",
        category: "Crypto",
        thumbnail_url:
          "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500",
        created_at: new Date(),
      },
      {
        title: "Panduan Lengkap Trading Forex untuk Pemula",
        content:
          "Trading forex bisa menjadi sumber pendapatan yang menarik jika dilakukan dengan benar. Artikel ini membahas dasar-dasar trading forex, termasuk cara membaca chart, memahami leverage, dan manajemen risiko.",
        category: "Forex",
        thumbnail_url:
          "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500",
        created_at: new Date(),
      },
      {
        title: "Saham Bank: Peluang Investasi di Sektor Perbankan",
        content:
          "Sektor perbankan Indonesia menunjukkan kinerja solid di tahun 2026. Beberapa bank besar seperti BCA, BRI, dan Bank Mandiri mencatatkan pertumbuhan laba yang signifikan. Artikel ini menganalisis prospek saham perbankan.",
        category: "Saham",
        thumbnail_url:
          "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=500",
        created_at: new Date(),
      },
      {
        title: "Ethereum 2.0: Revolusi Blockchain yang Harus Anda Ketahui",
        content:
          "Upgrade Ethereum ke versi 2.0 membawa perubahan besar dalam ekosistem blockchain. Proof of Stake menggantikan Proof of Work, membuat jaringan lebih efisien dan ramah lingkungan.",
        category: "Crypto",
        thumbnail_url:
          "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=500",
        created_at: new Date(),
      },
      {
        title: "Strategi Swing Trading: Rahasia Profit Konsisten",
        content:
          "Swing trading adalah strategi yang cocok untuk trader yang tidak bisa memantau pasar sepanjang hari. Artikel ini membahas cara menemukan setup swing trading yang potensial.",
        category: "Saham",
        thumbnail_url:
          "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500",
        created_at: new Date(),
      },
      {
        title: "USD/IDR: Analisis Fundamental dan Teknikal",
        content:
          "Pasangan mata uang USD/IDR dipengaruhi berbagai faktor ekonomi. Artikel ini membahas outlook rupiah dan strategi trading yang tepat.",
        category: "Forex",
        thumbnail_url:
          "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=500",
        created_at: new Date(),
      },
      {
        title: "Investasi Saham Dividen: Passive Income dari Pasar Modal",
        content:
          "Saham dividen bisa menjadi sumber passive income yang menarik. Berikut daftar saham dengan yield dividen tertinggi di BEI tahun 2026.",
        category: "Saham",
        thumbnail_url:
          "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500",
        created_at: new Date(),
      },
      {
        title: "Altcoin Season: Token Mana yang Potensial?",
        content:
          "Setelah Bitcoin rally, biasanya altcoin mengikuti. Artikel ini membahas altcoin dengan fundamental kuat untuk 2026.",
        category: "Crypto",
        thumbnail_url:
          "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500",
        created_at: new Date(),
      },
      {
        title: "Risk Management: Kunci Sukses Trading Jangka Panjang",
        content:
          "Banyak trader gagal karena manajemen risiko yang buruk. Artikel ini membahas teknik risk management yang tepat.",
        category: "Saham",
        thumbnail_url:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500",
        created_at: new Date(),
      },
      {
        title: "Analisis Teknikal: Support dan Resistance yang Wajib Diketahui",
        content:
          "Memahami level support dan resistance adalah dasar trading. Artikel ini mengajarkan cara mengidentifikasi level kunci.",
        category: "Saham",
        thumbnail_url:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500",
        created_at: new Date(),
      },
      {
        title: "NFT dan Metaverse: Investasi Masa Depan?",
        content:
          "NFT dan metaverse menjadi tren baru dalam dunia digital. Apakah ini investasi yang layak atau sekadar hype?",
        category: "Crypto",
        thumbnail_url:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500",
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("articles", null, {});
  },
};
