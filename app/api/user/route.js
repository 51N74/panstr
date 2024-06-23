// pages/api/save-profile.js
import { getSession } from '@auth0/nextjs-auth0'
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

export default async function handler(req, res) {
  const session = getSession(req, res)
  if (!session) {
    res.status(401).send('Unauthorized')
    return
  }

  const user = session.user
  try {
    const savedUser = await saveUserProfile(user)
    res.status(201).json(savedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
