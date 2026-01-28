"use strict";

// Seeder: Data awal tipe membership
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("memberships", [
      {
        name: "Tipe A - Free",
        type: "A",
        article_limit: 3,
        video_limit: 3,
        created_at: new Date(),
      },
      {
        name: "Tipe B - Basic",
        type: "B",
        article_limit: 10,
        video_limit: 10,
        created_at: new Date(),
      },
      {
        name: "Tipe C - Premium",
        type: "C",
        article_limit: -1, // Unlimited
        video_limit: -1, // Unlimited
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("memberships", null, {});
  },
};
