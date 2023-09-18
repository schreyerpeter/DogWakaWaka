// getTimeStampsOfCurrentDayOpenings accepts a Date, parses it, and returns each hour of that day
// from 9 AM - 5 PM, which is the time range that the business is open, which will be
// compared against the appointments from the DB appointments to determine availability
//
// i.e. "Sat Sep 16 2023 19:44:07 GMT-0700 (Pacific Daylight Time)" yields
// [
// "Sat Sep 16 2023 9:00:00 GMT-0700 (Pacific Daylight Time)"
// "Sat Sep 16 2023 10:00:00 GMT-0700 (Pacific Daylight Time)"
// "Sat Sep 16 2023 11:00:00 GMT-0700 (Pacific Daylight Time)"
// "Sat Sep 16 2023 12:00:00 GMT-0700 (Pacific Daylight Time)"
// "Sat Sep 16 2023 13:00:00 GMT-0700 (Pacific Daylight Time)"
// "Sat Sep 16 2023 14:00:00 GMT-0700 (Pacific Daylight Time)"
// "Sat Sep 16 2023 15:00:00 GMT-0700 (Pacific Daylight Time)"
// "Sat Sep 16 2023 16:00:00 GMT-0700 (Pacific Daylight Time)"
// "Sat Sep 16 2023 17:00:00 GMT-0700 (Pacific Daylight Time)"
// ]

function getTimeStampsOfCurrentDayOpenings(dayToParse: Date): string[] {
  const parsedTimeSlots = [];
  const stringifiedDayToParse: String = dayToParse.toString();
  for (let currentHour = 9; currentHour < 18; currentHour++) {
    // Replace the hours, minutes, and seconds of the current day with the start of the appointment hour
    // i.e. replace 19:44:07 in the timestamp with 9:00:00, then 10:00:00, then 11:00:00, etc.
    const timeSlot = stringifiedDayToParse.replace(
      `${dayToParse.getHours() < 10 ? "0" : ""}${dayToParse.getHours()}:${
        dayToParse.getMinutes() < 10 ? "0" : ""
      }${dayToParse.getMinutes()}:${
        dayToParse.getSeconds() < 10 ? "0" : ""
      }${dayToParse.getSeconds()}`,
      `${currentHour}:00:00`
    );
    // Store timeslots as strings because DB returns them as ISO strings
    parsedTimeSlots.push(timeSlot);
  }
  return parsedTimeSlots;
}

function generateRandomDogProfilePic(): string {
  const dogProfilePics = [
    "https://i.chzbgr.com/full/7704732928/h523E518D/dog",
    "https://i.chzbgr.com/full/7704736256/h40253094/dog",
    "https://d.newsweek.com/en/full/2175816/stock-image-pitt-bull.webp?w=790&f=694c98e574b3d223a1cc33174df014da",
    "https://images.unsplash.com/photo-1554224311-beee415c201f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnVubnklMjBkb2d8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    "https://media.istockphoto.com/id/104254942/photo/front-view-of-angry-chihuahua-growling-standing.jpg?s=612x612&w=0&k=20&c=Bm_Oln-w50EvxC6cGklnkRGasV4PlCRgvBL0f6f77bo=",
    "https://cdn.statically.io/img/blazepress.com/.image/2021/10/dog-intro.jpeg?quality=100&f=auto",
  ];
  const randomInt = Math.floor(Math.random() * dogProfilePics.length);
  return dogProfilePics[randomInt];
}

function generateRandomProfilePic(): string {
  const profilePics = [
    "https://assets.hongkiat.com/uploads/people-who-changed-the-internet/steve-jobs.jpg",
    "https://assets.hongkiat.com/uploads/people-who-changed-the-internet/Julian-Assange-WikiLeaks.jpg",
    "https://assets.hongkiat.com/uploads/people-who-changed-the-internet/Mark-Zuckerberg-Facebook.jpg",
    "https://assets.hongkiat.com/uploads/people-who-changed-the-internet/Jack-Dorsey-Twitter.jpg",
    "https://assets.hongkiat.com/uploads/people-who-changed-the-internet/Jeff-Bezos-Amazon.jpg",
  ];
  const randomInt = Math.floor(Math.random() * profilePics.length);
  return profilePics[randomInt];
}

function generateRandomName(): string {
  const names = [
    "Steve Jobs",
    "Bill Gates",
    "Linus Torvald",
    "Elon Musk",
    "Mark Zuckerberg",
  ];
  const randomInt = Math.floor(Math.random() * names.length);
  return names[randomInt];
}

function generateRandomUser() {
  return {
    firstName: generateRandomName().split(" ")[0],
    lastName: generateRandomName().split(" ")[1],
    address: "123 Main St",
    dogs: <DogType[]>[],
    profileImg: generateRandomProfilePic(),
  };
}

export default {
  getTimeStampsOfCurrentDayOpenings,
  generateRandomDogProfilePic,
  generateRandomUser,
};
