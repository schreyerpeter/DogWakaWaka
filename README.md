Let’s Build a Dog Walking App
Problem Overview
You are starting a dog walking company and want to build an app to let customers schedule a time slot to have their dog walked.
Assumptions
• You are the sole employee, so you’ll be responsible for building the app, and walking the dogs
• Walks will always be 1 hour time slots, and there is no need to account for the location of an appointment, or time between walks to get to the next appointment
• You’ll only walk 1 dog at a time per time slot
• We can assume that there is some kind of user registration and authentication flow,
but we want to focus more on the scheduling aspect
Questions

1.  Describe the stack you’d use to build this app and why you’d choose these technologies over others

    ## Front End:

    ### `React JS`

        - The ecosystem, documentation, and support around the library are immense, especially for SPAs, with many stable options for routing, testing, styling, and state management.
        - React was built with scalability in mind, and it is a breeze to reuse components and business logic using hooks.
        - In the case of large demand for a mobile app, React Native could be employed and potentially reuse components and hooks already built for web, assuming platform-specific code has been extracted.
        - The mocks don't give me the impression that there would ever be a problematic amount of components to render simultaneously, which can cause performance issues.
        - In the case that I had to step away from the code to focus on the business, I am confident I could quickly find a competent React dev to take over, because React is still the most popular library over Angular, Vue, Svelte, etc. in terms of downloads.
        - I am experienced with React, and enjoy working with the paradigm of functional components and hooks.

    ### `Next JS`

        - Users expect very snappy response times, even if the UI isn't immediately interactive, which is why I would SSR with Next JS, which conveniently offers TypeScript boilerplate. NOTE: I ended up trying out the new `App router` from Next which has server rendered and client rendered component.
        - The Next TypeScript boilerplate has built in support for ESLint, Tailwind CSS, and routing.
        - Next gives developers a large amount of control over server side behavior on a per page basis, in terms of revalidation frequency, caching preferences, and SEO.
        - Routing is intuitive and based on file heirarchy, and Next middleware makes logic like redirecting based on a cookie, proxying, or setting a header a piece of cake.
        - Similar tools like Gatsby are great as well, but don't offer the configurability that Next offers. I've found when I use packages that abstract away too much of what's going on under the hood, I often wish I had that more granular control.
        - Again, another reason I am choosing this package because I'm experienced with it and enjoy it. The Vercel team creates some fabulous software and has great documentation and support.

    ### `TypeScript`

        - As I am the sole developer and dog walker at this company, nobody is going to keep me honest in the code except for myself. This is precisely why I would want TypeScript to prevent me from making easily preventable mistakes when I'm inevitably crushing bugs late at night after a long day of walking dogs.
        - Support for the package is huge, and there are many options for auto-generating TypeScript types based on schema, which removes the time-consuming manual curation of types.
        - I know some developers have a lot of spicy opinions about TypeScript, but personally I quite enjoy it, even if it may seem excessive for a project of this size. I've been on a team that grew way too quickly and had high dev turnover with no type system a few years ago, and it was a code-smelly nightmare.

    ### `MaterialUI` or `Tailwind CSS`

        - MaterialUI might be overkill, but it's a very convenient library for throwing some prepackaged templates, themes, and components together if you are in a rush. It offers CSS-in-JS, which I enjoy and find very intuitive, coming from a styled-components background.
        - Tailwind is a lighter package, and offers the classic stylesheet approach, with goodies like built-in support for pseudo-classes, as well as a component library to choose from. NOTE: I ended up using Tailwind because I had never spent much time with it and wanted to poke around with it. Styling was not prioritized, and please forgive me for the pain your eyes are going to endure.

    ### `State Management`

        - Right now the data the app manages is very light, so between React hooks and the React Context API, I don't see much reason we need to add any other package to manage state. NOTE: I ended up using SWR because Next recommended it and its behavior was more predictable than my custom hook+context solution.
        - In the case of unexpected state complexity, the `useReducer` hook can replicate Redux without the overhead of installing the package.

    ### `Data Fetching`

        - I would most likely just use the raw fetch API against a RESTful API because the payloads are light, simple, and relatively flat, and Next is already handling caching and memoization. Axios is popular and powerful, but I'll be fine for now with just fetch and some clean architecture patterns.
        - A solution that would absolutely be overkill in this situation is Apollo GraphQL Client, but I would be remiss if I didn't mention how much I love this package once the data models become more complex and intertwined. Being able to tailor bespoke calls to be as light or as heavy as desired could be a good idea for this app a few years down the road.
        - As the user base grows, we may need a pub/sub solution like Kafka so the web client can listen for updates to appointments. I imagine it would be very frustrating for users to be viewing a stale experience and repeatedly get denied trying to book an appointment that was already booked. NOTE: SWR does offer periodic revalidation that could accomplish a similar effect.

    ### `Testing`

        - Cypress optionally ships with Next, and is a wonderful tool for both E2E and Component tests, especially if you implement it into your CI/CD flow.
        - NOTE: I did not end up having much time for tests, but did throw together a little bit around the Appointments controller, as it seems like it would be the most critical to have coverage for. Next steps would be to get it actually talking to the DB and not mocking so many things. I did not get around to UI unit testing, but I have a good amount of experience with React Testing Library, which is very interaction-focused.
        - You can run the tests in the server repo with `npm run test`

    ### `CI/CD`

        -  GitHub actions are great for processes like linting and sanity checking code before it gets merged into a higher environment. I did no CI/CD work.

    ## API Layer

    ### `Node JS and Nest JS`

        - I would choose Nest JS running on a Node server to be my RESTful API layer, because it is straightforward to get up and serving, is in TypeScript as well so I wouldn't have to context switch between languages, is well documented/supported, and has a wide array of very intuitive and declarative functionality.
        - Nest JS is an abstraction over Express JS, whose core package is minimalist and unopinionated, and you can add middleware packages as you see fit to handle your specific use cases, such as add role guards around routes.
        - Because of the JS event loop, Express can handle a large amount of concurrent requests gracefully in memory, which results in high availability and speed.
        - Computationally heavy processes are not ideal for Node, however, but worker threads make it possible for separate Node instances to run in the same process, all sharing memory. So even though it's single threaded, it won't totally block the CPU.
        - In my opinion, the benefits of choosing a Node JS server over something like PHP or Java far outweigh the downsides, especially if you already know how to code in JS and are a small business owner trying to get an app out quickly.
        - NOTE: I did not end up having time to implement role guards or any sort of client/server authentication, but it looks fairly straightforward with Nest.

    ## DB

    ### `MongoDB and Mongoose`

        - MongoDB really shines in this exact use case of the lone developer who is just starting a project and unsure of the long-term vision. It is a breeze to frequently edit the schema, you can store almost any data type, and it automatically indexes fields.
        - Because the required data model for the dog walking app is extremely simple and I don't anticipate needing to do any insane table joins, so a NoSQL DB like MongoDB will be a better choice than an relational SQL DB like Postgres, although honestly in terms of speed, both would work beautifully for an app this size.
        - MongoDB uses locking and concurrency control to prevent two clients from changing a document at the same time, using ACID transactions, so either all changes are made or none are.
        - The Mongoose package exposes declarative operations (like `findOneAndUpdate`) that are used instead of SQL commands to communicate with the DB. This is obviously great for when a team grows and new or junior devs need to understand the logic.
        - Mongoose also allows devs to declare schema that reference other schema, easily creating as nested of a schema as desired, and plays well with Nest JS, coincidentally.

2.  Detail the database schema you would use to represent all of the data displayed in the wireframes (hint: keep it simple!)

    ```javascript
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    // USER SCHEMA: let's assume a many-to-one relationship with dogs to users
    // I was lazy and just combined all parts of address into one string
    const userSchema = new Schema({
        _id: Schema.types.UUID,
        profileImg: String,
        firstName: String,
        lastName: String,
        address: String,
        dogs: [{
            type: Schema.Types.UUID,
            ref: 'Dog'
        }]
    });
    const User = mongoose.model('User', userSchema);

    // DOG SCHEMA
    const dogSchema = new Schema({
        _id: Schema.types.UUID,
        name: String,
        breedName: String,
        profileImg: String,
        owner: {
            type: Schema.Types.UUID,
            ref: 'User'
        }
    });
    const Dog = mongoose.model('Dog', dogSchema);

    // APPOINTMENT SCHEMA
    const appointmentSchema = new Schema({
        _id: Schema.types.UUID
        startTime: Date,
        client: {
            type: Schema.Types.UUID,
            ref: 'User'
        },
        dog: {
            type: Schema.Types.UUID,
            ref: 'Dog'
        }
    });
    const Appointment = mongoose.model('Appointment', appointmentSchema);
    ```

3.  What does the API layer between the front and back end look like? Which routes are needed to display all the data in the wireframes and handle all potential actions?

    - The API layer needs to support a few CRUD operations for each model.
    - The spec does not say anything about me getting weekends or holidays off, so this will be built under the assumption that users will be able to book 1 hour slots from 9 AM - 5 PM every day. I will not take timezones into account.
    - The API layer can be viewed at https://github.com/schreyerpeter/DogWakaWakaBackend and is built with Nest JS. I will summarize the `Dogs` routes below for brevity, and the `Appointments` and `Users` routes are similar, with some notable callouts.
    - I would love to fire up the app for you and show it off, assuming I get invited to do so, but you won't be able try it unless I whitelist your IP with my MongoDB Atlas cluster. Ideally I would have Dockerized everything.

    ```javascript
      // The Dogs controller supports creating, finding all, finding one by id, and deleting one by id
      // Nest and Mongoose make it a breeze to CRUD any model and their nested relational models

      class CreateDogDto {
      // The DTO (Data Transfer Object) defines how a dev should interact with the API
      // For instance, when we create a dog, we require the following, and can reference other Mongoose models
        readonly name: string;
        readonly breed: string;
        readonly profileImg: string;
        readonly owner: User;
      }

        // The controller delegates incoming requests
      @Controller('dogs')
      // These routes now exposed at `/dogs`, though I've proxied
      // the Nest JS server from Next JS at `/api/*` so `/api/dogs`
      export class DogsController {
        constructor(private readonly dogsService: DogsService) {}
        // Decorators allow us to configure our endpoints
        @Post(':ownerId')
        // Hit this endpoint by POSTing to `/dogs/${ownerId}` with a body containing
        // JSON that can be deserialized to the CreateDogDto model (example request below)
        async create(
            @Body() createDogDto: CreateDogDto,
            // @Body exposes the body of the POST
            @Param('ownerId') ownerId: string,
            // @Param exposes the `ownerId` param from the path
            @Res({ passthrough: true }) res: Response,
            // @Res lets us modify the response to the client
        ) {
            try {
            return await this.dogsService.create(createDogDto, ownerId);
            } catch (error) {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send('Internal server error');
            }
        }

        @Get()
        async findAll(@Res({ passthrough: true }) res: Response): Promise<Dog[]> {
            try {
            return await this.dogsService.findAll();
            } catch (error) {
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send('Internal server error');
            }
        }

        @Get(':id')
        async findOne(
            @Param('id') id: string,
            @Res({ passthrough: true }) res: Response,
        ): Promise<Dog> {
            try {
                return await this.dogsService.findOne(id);
            } catch (error) {
            // we can throw specific exceptions from the
            // service layer and return appropriate statuses
            if (error instanceof NotFoundException) {
                res.status(HttpStatus.NOT_FOUND).send(error.message);
            }
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send('Internal server error');
            }
        }

        @Delete(':id/:ownerId')
        async delete(
            @Param('id') id: string,
            @Param('ownerId') ownerId: string,
            @Res({ passthrough: true }) res: Response,
        ) {
            try {
                return await this.dogsService.delete(id, ownerId);
            } catch (error) {
            if (error instanceof NotFoundException) {
                res.status(HttpStatus.NOT_FOUND).send(error.message);
            }
            res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send('Internal server error');
            }
        }
      }

      // The POST route would be used from the front end like
      //  await fetch(`/api/dogs/${ownerId}`, {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json;charset=UTF-8",
      //   },
      //   body: JSON.stringify({
      //     profileImg: helpers.generateRandomDogProfilePic(),
      //     name,
      //     breed,
      //   }),
      // });

      // The dogs service is where Mongoose CRUDs the DB documents
      @Injectable()
      export class DogsService {
        constructor(
          @InjectModel(Dog.name) private readonly dogModel: Model<Dog>,
          // We need to inject the User and Appointment models because
          // we will reference them when we delete a dog document
          @InjectModel(User.name) private readonly userModel: Model<User>,
          @InjectModel(Appointment.name)
          private readonly appointmentModel: Model<Appointment>,
        ) {}

        async create(createDogDto: CreateDogDto, ownerId: string): Promise<Dog> {
          // Create the new Dog document
          const createdDog = await this.dogModel.create(createDogDto);
          // Add the Dog to the user's dogs array and update the document
          this.userModel
            .updateOne({ _id: ownerId }, { $push: { dogs: createdDog } })
            .exec();
          return createdDog;
        }

        async findAll(): Promise<Dog[]> {
          return this.dogModel.find().exec();
        }

        async findOne(id: string): Promise<Dog> {
          const dog = await this.dogModel.findOne({ _id: id }).exec();
          if (!dog) {
            throw new NotFoundException();
          }
          return dog;
        }

        async delete(id: string, ownerId: string) {
          const deletedDog = await this.dogModel
            .findByIdAndRemove({ _id: id })
            .exec();
          if (!deletedDog) {
            throw new NotFoundException();
          }
          // Remove all appointments that reference this dog
          await this.appointmentModel.deleteMany({ dog: id });
          // Remove all references to this dog from the user
          this.userModel
            .findOneAndUpdate(
              { _id: ownerId },
              {
                $pull: {
                  dogs: id,
                },
              },
            )
            .exec();
          return deletedDog;
        }
      }


      // One more thing to note is that Mongoose stores nested models as their
      // referenceId unless you explicitly tell it to populate the fields.
      // Here is an example of how to do that from the AppointmentsService,
      // which references the User and Dog models.

      export class CreateAppointmentDto {
        readonly startTime: string;
        readonly client: User;
        readonly dog: Dog;
      }

      async findAll(): Promise<Appointment[]> {
        // if `populate` isn't called on fields referencing other models, the field will
        // have the reference ID of the nested document instead of the document itself
        // i.e. {
        //    startTime: "Sat Sep 16 2023 19:44:07 GMT-0700 (Pacific Daylight Time)",
        //    client: "client-model-reference-id-string",
        //    dog: "dog-model-reference-id-string"
        //  }
        return this.appointmentModel
          .find()
          .populate('dog')
          .populate('client')
          .exec();
      }
    ```

4.  Write a React or React Native component for a row in the calendar that handles the various states it can be in (available, booked with someone else’s dog, booked with your dog)

```javascript
// src/components/atoms/BookingButton.tsx
'use client';

import { useAppointmentsState } from '@/src/hooks/useAppState';
import BasicButton from './BasicButton';
import Dropdown from './Dropdown';
import ClientApiProvider from '@/src/providers/api_provider';

// **************************************************************************
// Scenarios:
// 1. Appointment is available (null appointment for that timeslot)
//   1a. User has no dogs (disabled button)
//   1b. User has one dog (no dropdown, just button that adds appointment for the dog)
//   1c. User has multiple dogs (dropdown choosing which dog)
// 2. Appointment is booked by current user (appointment is not null and client is current user => cancel button)
// 3. Appointment is booked by another user or edge case (appointment is not null and client is not current user => disabled button)
// **************************************************************************
export default function BookingButton({
  appointment,
  appointmentIsAvailable,
  appointmentIsBookedByCurrentUser,
  timeSlot,
  user,
}: {
  appointment?: AppointmentType,
  appointmentIsAvailable: boolean,
  appointmentIsBookedByCurrentUser: boolean,
  timeSlot: string,
  user: UserType,
}) {
  const { mutate, data } = useAppointmentsState();
  const usersDogs = user?.dogs ?? [];

  if (appointmentIsAvailable) {
    switch (usersDogs.length) {
      case 0:
        return (
          <BasicButton theme="grey" disabled>
            No dogs to book
          </BasicButton>
        );
      case 1:
        return (
          <BasicButton
            theme="blue"
            onClick={async () => {
              const appointment: AppointmentType | null =
                await ClientApiProvider.createAppointment({
                  startTime: timeSlot,
                  client: user,
                  dog: usersDogs[0],
                });
              if (appointment != null) mutate(data.concat(appointment));
            }}
          >
            Book
          </BasicButton>
        );
      default:
        return (
          <Dropdown dropdownText="book">
            <DogDropdownOptions dogs={usersDogs} timeSlot={timeSlot} />
          </Dropdown>
        );
    }
  }
  if (appointmentIsBookedByCurrentUser && appointment != null)
    return (
      <BasicButton
        theme="white"
        onClick={async () => {
          const deletedAppointment: AppointmentType | null =
            await ClientApiProvider.deleteAppointment({ appointment });
          if (deletedAppointment != null)
            // mutate SWR state so the UI reflects changes
            mutate(
              data.filter(
                (apt: AppointmentType) => apt._id != deletedAppointment._id,
              ),
            );
        }}
      >
        Cancel
      </BasicButton>
    );
  // appointment is booked by other user or edge case
  return (
    <BasicButton theme="grey" disabled>
      Booked
    </BasicButton>
  );
}
```

5.  Write the server side function that runs when a user presses “book” (pseudocode is fine)

- When `book` is pressed, the web client POSTs to `/api/appointments` a JSON body containing the user, dog, and timestamp of the desired appointment, which is received by the `AppointmentsController`, and the JSON is deserialized to the `CreateAppointmentDto` model.
- We would definitely want to pass a bearer token as well to make sure the user booking the appointment is who they say they are, but I did not get around to implementing any form of this. I did not get around to role guards either, but I imagine routes like creating an appointment would be available to an authenticated user and an admin, for instance, so somebody could call by phone to schedule.
- In a production app, we would not be hitting the server directly, but would have load balancers between the client and the server.
- The server then checks if there are any other appointments scheduled for that time slot in the database, in case the user's UI is stale. If there is a conflict, the server returns a 409 conflict exception, which the client receives to let the user know it's already booked. If the appointment is not booked, we create that entry in the DB, and return a 201 created response, as well as the created entry that the client can update the UI with.
