import type { Follow } from "../model/Follow.ts" ;

export class FollowerController {
  follow(follow : Follow) {
    return fetch(`/api/followers`, {
      method: "POST" ,
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify(follow)
    });
  }

  unfollow(followId : number) {
    return fetch(`/api/followers/${followId}`, {
      method: "DELETE"
    });
  }
}