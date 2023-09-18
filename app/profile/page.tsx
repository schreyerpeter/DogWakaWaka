"use client";

import { useState } from "react";
import PageLayout from "../../src/components/layouts/PageLayout";
import UserDetailsHeader from "../../src/components/molecules/UserDetailsHeader";
import UserDetailsGrid from "../../src/components/molecules/UserDetailsGrid";
import DogsListHeader from "../../src/components/molecules/DogsGridHeader";
import DogsList from "../../src/components/molecules/DogsGrid";
import AddDogModal from "../../src/components/molecules/AddDogModal";
import EditUserDetailsModal from "../../src/components/molecules/EditUserDetailsModal";
import CreateNewUserHeader from "@/src/components/molecules/CreateNewUserHeader";

export default function Profile() {
  const [openAddUserDetailsModal, setOpenAddUserDetailsModal] = useState(false);
  const [openAddDogModal, setOpenAddDogModal] = useState(false);
  return (
    <PageLayout>
      <CreateNewUserHeader />
      <UserDetailsHeader onEdit={() => setOpenAddUserDetailsModal(true)} />
      <UserDetailsGrid />
      <DogsListHeader onRemove={() => setOpenAddDogModal(true)} />
      <DogsList />
      <AddDogModal open={openAddDogModal} setOpen={setOpenAddDogModal} />
      <EditUserDetailsModal
        open={openAddUserDetailsModal}
        setOpen={setOpenAddUserDetailsModal}
      />
    </PageLayout>
  );
}
