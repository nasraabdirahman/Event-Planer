import { ObjectId } from 'mongodb';
import db from '../MongoDB/initDB';
import type Event from '../../src/interfaces/Event';
import type Follow from '../../src/interfaces/Follow';

export default class RouteServiceNotification {
  async getUpcomingNotifications(userId: string): Promise<Event[]> {
    const userFollows = await db
      .collection<Follow>('Follow')
      .find({
        userId: new ObjectId(userId),
        notifications: true,
      })
      .toArray();
    if (userFollows.length === 0) {
      return [];
    }

    const eventIds = userFollows.map((follow) => {
      return follow.eventId;
    });

    const followedEvents = await db
      .collection<Event>('Events')
      .find({
        _id: {$in:eventIds}
      })
      .toArray();

    const currentTime = Date.now();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const oneDayLater = currentTime + oneDayInMilliseconds;

    const upcomingEvents = followedEvents.filter((event) => {
      const eventStartTime = new Date(event.startTimeDate).getTime();
      
      const isInTheFuture = eventStartTime > currentTime;
      const isWithinOneDay = eventStartTime <= oneDayLater;
      return isInTheFuture && isWithinOneDay;
    });
    return upcomingEvents;
  }
}