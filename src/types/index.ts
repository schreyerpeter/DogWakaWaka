// TypeScript types for the app
// TODO: split these out into separate files
type UserType = {
  // _id is the unique identifier for the user from Mongo
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  profileImg: string;
  dogs: DogType[];
};

type DogType = {
  _id: string;
  name: string;
  breed: string;
  profileImg: string;
  owner: UserType;
};

type AppointmentType = {
  _id: string;
  startTime: string;
  client: UserType;
  dog: DogType;
};
