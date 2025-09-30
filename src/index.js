const { prisma } = require("../db/config");

async function createUserWithPost({ name, email, title, content }) {
  if (!name || !email || !title || !content) {
    return { success: false };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email },
      });

      await tx.post.create({
        data: {
          title,
          content,
          userId: user.id,
        },
      });
    });

    // If transaction succeeds
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}

module.exports = { createUserWithPost };
