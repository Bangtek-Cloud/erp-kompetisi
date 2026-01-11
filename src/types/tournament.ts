export interface TournamentProps {
    id: string;
    name: string;
    start: string;
    image: string;
    rules: string[]
    maxParticipan: number;
    status: string;
    participan: number
    end: string
    desciption: string
    isActive: boolean
    prize: {
        title: string,
        value: string
    }[]
    eventName: string
    location: string

    // id: item.id,
    //     rules: item?.rules,
    //     participan: item.contestants.length,
    //     maxParticipan: item.maxParticipants,
    //     status: item.status,
    //     start: item.startDate,
    //     end: item.endDate,
    //     desciption: item.description,
    //     isActive: !item.disabled,
    //     prize: item.prize,
    //     image: item.event.eventLogoUrl
    //         ? process.env.S3_URL + item.event.eventLogoUrl
    //         : null,
    //     eventName: item?.event?.name,
    //     location: item?.event?.location
}