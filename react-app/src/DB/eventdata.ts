import type {Event} from "../model/Events"


const events : Event[] = [
    {
        eventid: 1,
        userid: 1,
        location: "Jönköping",
        price: 0,
        description: "A casual gaming event where players can meet, compete and have fun together.",
        followerCount: 24,
        title: "Gaming Night",
        timedate: "2026-09-20 18:00:00"
    },
    {
        eventid: 2,
        userid: 2,
        location: "Stockholm",
        price: 100,
        description: "A live music event featuring local artists and an evening of music and entertainment.",
        followerCount: 57,
        title: "Live Music Evening",
        timedate: "2026-09-25 19:30:00"
    },
    {
        eventid: 3,
        userid: 5,
        location: "Gothenburg",
        price: 50,
        description: "A friendly sports competition where participants can compete against each other.",
        followerCount: 31,
        title: "Sports Competition",
        timedate: "2026-10-02 13:00:00"
    },
    {
        eventid: 4,
        userid: 3,
        location: "Malmö",
        price: 0,
        description: "A relaxed gaming tournament for players of different skill levels.",
        followerCount: 42,
        title: "Gaming Tournament",
        timedate: "2026-10-10 15:00:00"
    },
    {
        eventid: 5,
        userid: 4,
        location: "Linköping",
        price: 150,
        description: "A music and competition event where participants can enjoy performances and compete in different challenges.",
        followerCount: 76,
        title: "Music & Competition Festival",
        timedate: "2026-10-18 17:00:00"
    },
]

export function getEvents(){
    return events;
}