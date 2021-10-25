import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function getDataBase() {
  try {
    if (typeof databaseId !== "string") {
      return;
    }

    return await notion.databases.retrieve({
      database_id: databaseId,
    });
  } catch (error) {
    return error;
  }
}
