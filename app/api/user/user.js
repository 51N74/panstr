// client.js (ส่วนการดึงข้อมูลจาก Auth0 และบันทึกลงฐานข้อมูล)

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const saveUserProfile = async (auth0User) => {
  const { sub, email, name, picture } = auth0User

  const user = await prisma.user.upsert({
    where: { auth0Id: sub },
    update: {
      email: email,
      name: name,
      profilePicture: picture,
    },
    create: {
      auth0Id: sub,
      email: email,
      name: name,
      profilePicture: picture,
    },
  })

  return user
}

export default saveUserProfile
