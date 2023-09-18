import helpers from "../helpers";
import ClientApiService from "../services/api_service";

export default class ClientApiProvider {
  // *************************************
  //
  //   APPOINTMENTS
  //
  // *************************************
  static async getAppointments(): Promise<AppointmentType[] | null> {
    try {
      const data: AppointmentType[] = await ClientApiService.getAppointments();
      return data;
    } catch (error) {
      console.error("Error getting appointments", error);
    }
    return null;
  }

  static async createAppointment({
    startTime,
    client,
    dog,
  }: {
    startTime: string;
    client: UserType;
    dog: DogType;
  }): Promise<AppointmentType | null> {
    const data: AppointmentType | null =
      await ClientApiService.createAppointment({
        dog,
        client,
        startTime,
      });
    return data;
  }

  static async deleteAppointment({
    appointment,
  }: {
    appointment: AppointmentType;
  }): Promise<AppointmentType | null> {
    try {
      const data: AppointmentType = await ClientApiService.deleteAppointment({
        appointment,
      });
      return data;
    } catch (error) {
      console.error("Error deleting appointment", error);
    }
    // Refresh UI
    await this.getAppointments();
    return null;
  }

  // *************************************
  //
  //   DOGS
  //
  // *************************************

  static async getDogs(): Promise<DogType[] | null> {
    try {
      const data: DogType[] = await ClientApiService.getDogs();
      return data;
    } catch (error) {
      console.error("Error getting dogs", error);
    }
    return null;
  }

  static async createDog({
    profileImg,
    name,
    breed,
    user,
  }: {
    profileImg: string;
    name: string;
    breed: string;
    user: UserType;
  }): Promise<DogType | null> {
    try {
      const data: DogType = await ClientApiService.createDog({
        profileImg: helpers.generateRandomDogProfilePic(),
        name,
        breed,
        user,
      });
      return data;
    } catch (error) {
      console.error("Error creating dog", error);
    }
    await this.getDogs();
    return null;
  }

  static async deleteDog({
    dog,
    user,
  }: {
    dog: DogType;
    user: UserType;
  }): Promise<DogType | null> {
    try {
      const data: DogType = await ClientApiService.deleteDog({
        dog,
        user,
      });
      return data;
    } catch (error) {
      console.error("Error deleting dog", error);
    }
    await this.getDogs();
    await this.getUsers();
    return null;
  }

  // *************************************
  //
  //   USERS
  //
  // *************************************

  static async getUsers(): Promise<UserType[] | null> {
    try {
      const data: UserType[] = await ClientApiService.getUsers();
      return data;
    } catch (error) {
      console.error("Error getting users", error);
    }
    return null;
  }

  static async createUser(): Promise<UserType | null> {
    try {
      const { firstName, lastName, address, profileImg, dogs } =
        helpers.generateRandomUser();
      const data: UserType = await ClientApiService.createUser({
        firstName,
        lastName,
        address,
        profileImg,
        dogs,
      });
      return data;
    } catch (error) {
      console.error("Error creating user", error);
    }
    return null;
  }

  static async updateUser({
    firstName,
    lastName,
    address,
    user,
  }: {
    firstName: string;
    lastName: string;
    address: string;
    user: UserType;
  }): Promise<UserType | null> {
    try {
      const data: UserType = await ClientApiService.updateUser({
        firstName,
        lastName,
        address,
        user,
      });
      return data;
    } catch (error) {
      console.error("Error updating user", error);
    }
    return null;
  }

  static async deleteUser({
    user,
  }: {
    user: UserType;
  }): Promise<UserType | null> {
    try {
      const data: UserType = await ClientApiService.deleteUser({
        user,
      });
      return data;
    } catch (error) {
      console.error("Error deleting user", error);
    }
    return null;
  }
}
