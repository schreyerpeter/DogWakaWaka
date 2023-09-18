export default class ClientApiService {
  // *************************************
  //
  //   APPOINTMENTS
  //
  // *************************************
  static async getAppointments(): Promise<AppointmentType[]> {
    const response: Response = await fetch("/api/appointments");
    const data: AppointmentType[] = await response.json();
    return data;
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
    try {
      const response: Response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dog,
          client,
          startTime,
        }),
      });
      if (!response.ok) {
        if (response.status === 409) {
          alert("Appointment already booked. Please refresh your browser.");
        } else {
          alert("Error creating appointment");
        }
        return null;
      }
      const data: Promise<AppointmentType> = await response.json();
      return data;
    } catch (error: any) {
      alert("Error creating appointment");
      return null;
    }
  }

  static async deleteAppointment({
    appointment,
  }: {
    appointment: AppointmentType;
  }): Promise<AppointmentType> {
    const response: Response = await fetch(
      `/api/appointments/${appointment?._id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    );
    const data: AppointmentType = await response.json();
    return data;
  }

  // *************************************
  //
  //   DOGS
  //
  // *************************************

  static async getDogs(): Promise<DogType[]> {
    const response: Response = await fetch("/api/dogs");
    const data: DogType[] = await response.json();
    return data;
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
  }): Promise<DogType> {
    const response: Response = await fetch(`/api/dogs/${user?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        breed,
        name,
        profileImg,
      }),
    });
    const data: DogType = await response.json();
    return data;
  }

  static async deleteDog({
    dog,
    user,
  }: {
    dog: DogType;
    user: UserType;
  }): Promise<DogType> {
    const response: Response = await fetch(
      `/api/dogs/${dog?._id}/${user._id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    );
    const data: DogType = await response.json();
    return data;
  }

  // *************************************
  //
  //   USERS
  //
  // *************************************

  static async getUsers(): Promise<UserType[]> {
    const response: Response = await fetch("/api/users");
    const data: UserType[] = await response.json();
    return data;
  }

  static async createUser({
    firstName,
    lastName,
    address,
    profileImg,
    dogs,
  }: {
    firstName: string;
    lastName: string;
    address: string;
    profileImg: string;
    dogs: DogType[];
  }) {
    const response: Response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        address,
        profileImg,
        dogs,
      }),
    });
    const data: UserType = await response.json();
    return data;
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
  }): Promise<UserType> {
    const response: Response = await fetch(`/api/users/${user?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        address,
      }),
    });
    const data: UserType = await response.json();
    return data;
  }

  static async deleteUser({ user }: { user: UserType }): Promise<UserType> {
    const response: Response = await fetch(`/api/users/${user._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const data: UserType = await response.json();
    return data;
  }
}
