import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;

  // Basic validation
  if (!chatId || !text) {
    return res.status(400).json({ message: "Chat ID and text are required" });
  }

  try {
    // Finding the chat with correct query using findFirst
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    // If no chat is found, return 404
    if (!chat) {
      console.log(`Chat not found for ID: ${chatId} and UserID: ${tokenUserId}`);
      return res.status(404).json({ message: "Chat not found!" });
    }

    // Creating a message in the chat
    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    // Updating the chat with the new message details
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: { set: [tokenUserId] }, // Ensures `seenBy` is set correctly; adjust as needed
        lastMessage: text,
      },
    });

    res.status(200).json(message);
  } catch (err) {
    console.error("Error adding message:", err); // Log detailed error
    res.status(500).json({ message: "Failed to add message!" });
  }
};
