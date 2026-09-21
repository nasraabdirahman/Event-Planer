import type {Event} from "../model/Event"


export const events : Event[] = [
    {
        eventId: 1,
        userId: 1,
        location: "Jönköping",
        price: 0,
        description: "A casual gaming event where players can meet, compete and have fun together.",
        followerCount: 24,
        title: "Gaming Night",
        startTimeDate: new Date("2026-09-20 18:00:00"),
        endTimeDate: new Date("2026-09-20 19:00:00")
    },
    {
        eventId: 2,
        userId: 2,
        location: "Stockholm",
        price: 100,
        description: "A live music event featuring local artists and an evening of music and entertainment.",
        followerCount: 57,
        title: "Live Music Evening",
        startTimeDate: new Date("2026-09-25 19:30:00"),
        endTimeDate: new Date("2026-09-25 20:0:00")
    },
    {
        eventId: 3,
        userId: 5,
        location: "Gothenburg",
        price: 50,
        description: "A friendly sports competition where participants can compete against each other.",
        followerCount: 31,
        title: "Sports Competition",
        startTimeDate: new Date("2026-10-02 13:00:00"),
        endTimeDate: new Date("2026-10-02 16:0:00")
    },
    {
        eventId: 4,
        userId: 3,
        location: "Malmö",
        price: 0,
        description: "A relaxed gaming tournament for players of different skill levels.",
        followerCount: 42,
        title: "Gaming Tournament",
        startTimeDate: new Date("2026-10-10 15:00:00"),
        endTimeDate: new Date("2026-10-10 16:00:00")
    },
    {
        eventId: 5,
        userId: 4,
        location: "Linköping",
        price: 150,
        description: "A music and competition event where participants can enjoy performances and compete in different challenges.",
        followerCount: 76,
        title: "Music & Competition Festival",
        startTimeDate: new Date("2026-10-18 17:00:00"),
        endTimeDate: new Date("2026-10-18 19:00:00")
    },
];