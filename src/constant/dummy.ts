
export enum Status {
    UPCOMING = 'Upcoming',
    LIVE = 'Live',
    COMPLETED = 'Completed'
}

export interface Event {
    id: string;
    image: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: Status;
    tournamentCount: number;
    location: string;
    rules: string;
}

export interface Tournament {
    id: string;
    eventId: string;
    eventName: string;
    eventImage: string;
    name: string;
    startDate: string;
    endDate: string;
    status: Status;
    location: string;
    description: string;
}

export interface Article {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    author: string;
}

export interface GalleryItem {
    id: string;
    url: string;
    title: string;
    category: string;
}

export interface VideoClip {
    id: string;
    thumbnail: string;
    title: string;
    duration: string;
    views: string;
}


export const EVENTS: Event[] = [
    {
        id: 'e1',
        name: 'Cyber Strike Masters',
        image: 'https://picsum.photos/seed/cs/800/400',
        description: 'The ultimate tactical shooter showdown featuring the best teams worldwide.',
        startDate: '2024-05-15',
        endDate: '2024-05-20',
        status: Status.LIVE,
        tournamentCount: 4,
        location: 'Jakarta Esports Arena',
        rules: '5v5 Tactical Shooter. Single elimination. Global rules apply.'
    },
    {
        id: 'e2',
        name: 'League of Legends Regional',
        image: 'https://picsum.photos/seed/lol/800/400',
        description: 'Battle for dominance in the Summoner Rift. National qualifiers start now.',
        startDate: '2024-06-10',
        endDate: '2024-06-25',
        status: Status.UPCOMING,
        tournamentCount: 2,
        location: 'Online / Surabaya Hub',
        rules: 'Tournament draft mode. Double elimination bracket.'
    }
];

export const TOURNAMENTS: Tournament[] = [
    {
        id: 't1',
        eventId: 'e1',
        eventName: 'Cyber Strike Masters',
        eventImage: 'https://picsum.photos/seed/cs/800/400',
        name: 'Grand Finals Pro League',
        startDate: '2024-05-19',
        endDate: '2024-05-20',
        status: Status.LIVE,
        location: 'Main Stage Jakarta',
        description: 'The final battle between Top 8 teams for the $100,000 prize pool.'
    },
    {
        id: 't2',
        eventId: 'e1',
        eventName: 'Cyber Strike Masters',
        eventImage: 'https://picsum.photos/seed/cs/800/400',
        name: 'Challenger Open Qualifier',
        startDate: '2024-05-15',
        endDate: '2024-05-16',
        status: Status.COMPLETED,
        location: 'Jakarta Hall B',
        description: 'Open bracket for aspiring pro players.'
    },
    {
        id: 't3',
        eventId: 'e2',
        eventName: 'League of Legends Regional',
        eventImage: 'https://picsum.photos/seed/lol/800/400',
        name: 'Rookie Rising Stars',
        startDate: '2024-06-12',
        endDate: '2024-06-15',
        status: Status.UPCOMING,
        location: 'Surabaya Gaming Center',
        description: 'Finding the next big talent in the local LoL scene.'
    }
];

export const ARTICLES: Article[] = [
    {
        id: 'a1',
        title: 'The Rise of Indonesian Esports',
        excerpt: 'How the archipelago became a powerhouse in the global gaming industry.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        image: 'https://picsum.photos/seed/article1/400/300',
        date: '2024-04-20',
        author: 'Admin'
    },
    {
        id: 'a2',
        title: '5 Tips for Tournament Prep',
        excerpt: 'Get ready for your next big match with these professional strategies.',
        content: 'Mastering the meta is just the beginning. Preparation is key...',
        image: 'https://picsum.photos/seed/article2/400/300',
        date: '2024-04-22',
        author: 'Coach J'
    }
];

export const GALLERY: GalleryItem[] = [
    { id: 'g1', url: 'https://picsum.photos/seed/g1/600/600', title: 'Grand Stage Jakarta', category: 'Events' },
    { id: 'g2', url: 'https://picsum.photos/seed/g2/600/600', title: 'Winner Trophy', category: 'Awards' },
    { id: 'g3', url: 'https://picsum.photos/seed/g3/600/600', title: 'Crowd Reaction', category: 'Live' },
    { id: 'g4', url: 'https://picsum.photos/seed/g4/600/600', title: 'Team Synergy', category: 'Players' },
];

export const VIDEOS: VideoClip[] = [
    { id: 'v1', thumbnail: 'https://picsum.photos/seed/v1/400/225', title: 'Insane 1v5 Clutch - CS Masters', duration: '0:45', views: '1.2M' },
    { id: 'v2', thumbnail: 'https://picsum.photos/seed/v2/400/225', title: 'Tournament Opening Ceremony 2024', duration: '5:30', views: '250K' },
    { id: 'v3', thumbnail: 'https://picsum.photos/seed/v3/400/225', title: 'Top 10 Plays of the Week', duration: '10:15', views: '800K' },
];
