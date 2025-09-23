import React from "react";
import { create, createConnection } from "../../lib/prisma";
import Drawer from "../../components/Drawer";

export default async function page() {
  async function createNodeRelationship(userData) {
    "use server";
    try {
      createConnection(userData);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  async function createNode(userData) {
    "use server";
    try {
      create(userData);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <>
      <div>
        <Drawer connect={createNodeRelationship} create={createNode}></Drawer>
      </div>
    </>
  );
}
