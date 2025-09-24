import React from "react";
import { create } from "../../lib/prisma";
import Drawer from "../../components/Drawer";

export default async function page() {
  async function createNode(userData) {
    "use server";
    try {
      await create(userData);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <>
      <div>
        <Drawer create={createNode}></Drawer>
      </div>
    </>
  );
}
