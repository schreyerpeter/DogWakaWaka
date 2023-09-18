"use client";

import React, { useState } from "react";
import BasicButton from "../atoms/BasicButton";
import helpers from "@/src/helpers";
import useUserState from "@/src/hooks/useAppState";
import ClientApiProvider from "@/src/providers/api_provider";

function AddDogForm({ onComplete }: { onComplete: () => void }) {
  const { user, mutate } = useUserState();
  const [formState, setFormState] = useState({
    name: "",
    breed: "",
  });

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { name, breed } = formState;
    try {
      const dog: DogType | null = await ClientApiProvider.createDog({
        profileImg: helpers.generateRandomDogProfilePic(),
        name,
        breed,
        user,
      });
      if (dog) mutate({ ...user, dogs: [...user.dogs, dog] });
    } catch (error) {
      // TODO: handle this
    }
    onComplete();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  required
                  onChange={handleFormChange}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="breed"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Breed
              </label>
              <div className="mt-2">
                <input
                  required
                  onChange={handleFormChange}
                  type="text"
                  name="breed"
                  id="breed"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <BasicButton type="submit" theme="blue">
          Save
        </BasicButton>
      </div>
    </form>
  );
}

export default AddDogForm;
