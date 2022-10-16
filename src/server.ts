import express, { query } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

app.get("/games", async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    res.status(200).json(games)
})

app.post("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id
    const body = request.body

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays,
            hourStart: Number(body.hourStart),
            hourEnd: Number(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    response.status(200).json(body)
})

app.get("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id
    
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            yearsPlaying: true,
            weekDays: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true,           
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    response.status(200).json(ads)
})

app.get("/ads/:id/discord", async (request, response) => {
    const adId = request.params.id
    
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
           discord: true,

        },
        where: {
            id: adId
        },
    })

    response.status(200).json({ discord: ad.discord })
})

app.listen("3000")
console.log("[online] http://localhost:3000")