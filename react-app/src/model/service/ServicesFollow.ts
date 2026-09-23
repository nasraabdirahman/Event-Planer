import { follows } from "../../DB/followdata.ts";
import type { Follow } from "../Follow.ts";

export class ModelServicesFollow {
  createFollower(follow: Follow) {
    follows.push(follow);
  }

  getFollowsByUser(userId: number): Follow[] {
  return follows.filter(follow => follow.userId === userId);
}

  deleteFollowIndex(index: number) {
    follows.splice(index, 1);
  }
}