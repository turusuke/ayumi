import { Client } from "@notionhq/client";
import { getDataBase } from "./getDataBase";
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function getUsers() {
  try {
    if (typeof databaseId !== "string") {
      return Promise.reject();
    }

    const dataBase = await getDataBase();

    return dataBase.properties.Member.select.options;
  } catch (error) {
    return error;
  }
}
