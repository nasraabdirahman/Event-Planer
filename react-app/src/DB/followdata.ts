import type {Follow} from "../model/Follow.ts"


export const follows :  Follow[] = [
  {
    followId : 0 ,
    eventId : 1 ,
    userId : 1 ,
    notifications : true ,
  },
  {
    followId : 1 ,
    eventId : 1 ,
    userId : 2 ,
    notifications : false ,
  },
  {
    followId : 2 ,
    eventId : 2 ,
    userId : 3 ,
    notifications : true ,
  },
  {
    followId : 3 ,
    eventId : 2 ,
    userId : 2 ,
    notifications : true ,
  }
] 
