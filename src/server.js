import app from "./app.js";
// import dbConnect from "./config/db.js";
import "dotenv/config";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PORT = process.env.PORT || 3001;

// dbConnect()
//   .then(() => {

//   })
//   .catch((err) => {
//     console.log("Error in creating a server: " + err);
//   });

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

const test = async () => {
  const { name, phone, email, password, status, role } = {
    name: "Udhay",
    email: "pagal@123",
    password: "password",
    isAdmin: true,
    isActive: true,
    phone: "2453599",
  };

  console.log("inside test");
  try {
    const createdUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        isAdmin: Boolean(role),
        isActive: Boolean(status),
        phoneNumber: phone,
      },
    });

    const createdProfile = await prisma.profile.create({
      data: {
        userNameee: "pagalavan-7",
        bio: "Im nothing",
        userId: createdUser.userId,
      },
    });

    const result = { createdUser, createdProfile };

    console.log("one-to-many-relationship");

    const fetchedUser = await prisma.user.findUnique({
      where: {
        userId: createdUser.userId,
      },
      include: {
        profile: {
          select: {
            userNameee: true,
            userId: true,
          },
        },
      },
    });
    console.log("fetched users are", fetchedUser);
  } catch (err) {
    throw err;
  }
};
test();
