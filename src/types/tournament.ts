import { IEvent } from "./event"

export interface TournamentProps {
    id: string
    name: string
    description: string
    prize: {
        title: string
        value: string
    }[]
    startDate: string
    endDate: string
    status: string
    maxParticipants?: number
    location?: string
    rules?: string[]
    createdAt: string
    updatedAt: string
    disabled: boolean
    eventId: string
    event?: IEvent
    contestants?: {
        storeName?: string
        id: string
        name: string
        email: string
        isVerified: boolean
        storeAddress?: string
        logo?: string | null
        user: {
            id: string
            name: string
            email: string
        }
    }[]
}