import prisma from "../lib/prisma.js";


export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    // Validate each chat for receiver and fetch receiver details if valid
    const chatsWithReceivers = await Promise.all(
      chats.map(async (chat) => {
        const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

        // Check if receiverId is valid
        if (!receiverId) {
          console.error(`Receiver ID is undefined for chat ID: ${chat.id}`);
          return null; // Skip this chat
        }

        try {
          const receiver = await prisma.user.findUnique({
            where: {
              id: receiverId,
            },
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          });

          // Check if receiver was found
          if (!receiver) {
            console.error(`Receiver not found for chat ID: ${chat.id}`);
            return null; // Handle the missing receiver case
          }

          // Attach receiver info to chat
          chat.receiver = receiver;
          return chat;
        } catch (receiverError) {
          console.error(`Error fetching receiver for chat ID ${chat.id}:`, receiverError);
          throw receiverError; // Properly propagate error to handle in catch block
        }
      })
    );

    // Filter out any chats that failed receiver validation
    res.status(200).json(chatsWithReceivers.filter(Boolean));
  } catch (err) {
    console.error("Error fetching chats:", err.message, err.stack);
    res.status(500).json({ message: "Failed to get chats!", error: err.message });
  }
};



export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const { receiverId } = req.body;

  if (!receiverId) {
    console.error("Error: receiverId is missing in request body");
    return res.status(400).json({ message: "receiverId is required" });
  }

  try {
    // Check if the receiver exists
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });

    if (!receiver) {
      console.error(`Receiver not found: ID ${receiverId}`);
      return res.status(404).json({ message: "Receiver not found" });
    }

    // Check if a chat already exists between these users
    const existingChat = await prisma.chat.findFirst({
      where: {
        userIDs: {
          hasEvery: [tokenUserId, receiverId],
        },
      },
    });

    if (existingChat) {
      console.log("Chat already exists, returning existing chat");
      return res.status(200).json(existingChat);
    }

    // Create a new chat
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, receiverId],
      },
    });

    console.log("New chat created successfully:", newChat);
    res.status(201).json(newChat);
  } catch (err) {
    console.error("Error in addChat:", err.message, err.stack); // Log stack trace for more detail
    res.status(500).json({ message: "Failed to add chat", error: err.message });
  }
};


export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  
  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};
