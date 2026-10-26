interface EventData{
  location : string ;
  price : number ;
  description : string ;
  title : string ;
  startTimeDate : Date | null ;
  endTimeDate : Date | null ;
}

export interface EventError{
  count? : number ;
  locationError? : string ;
  priceError? : string ;
  descriptionError? : string ;
  titleError? : string ;
  startTimeDateError? : string ;
  endTimeDateError? : string ;
}

export function eventInputValidation(event: EventData): EventError {
  const errors: EventError = {};
  const today = new Date();
  errors.count = 0 ;

  if(!event.title.trim()){
    errors.count++;
    errors.titleError = "Title is required" ;
  }
  if(!event.description.trim()){
    errors.count++;
    errors.descriptionError = "Description is required" ;
  }
  if(!event.location.trim()){
    errors.count++;
    errors.locationError = "Location is required" ;
  }
  if(event.price < 0){
    errors.count++;
    errors.priceError = "Price can't be negativ" ;
  }
  if(!event.startTimeDate){
    errors.count++;
    errors.startTimeDateError = "Start time and date are required" ;
  }
  if(!event.endTimeDate){
    errors.count++;
    errors.endTimeDateError = "End time and date are required" ;
  }
  if(event.startTimeDate && event.endTimeDate && event.startTimeDate > event.endTimeDate){
    errors.count++;
    errors.endTimeDateError = "End date and time has to be after start time and date" ;
  }
  if(event.startTimeDate && event.endTimeDate && event.startTimeDate < today){
    errors.count++;
    errors.startTimeDateError = "Can't add historical events";
  }

  return errors;
}