import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function getUsers() {
  try {
    if (typeof databaseId !== "string") {
      return Promise.reject();
    }

    const { results } = await notion.users.list({
      page_size: 100,
    });

    return results
    .filter(({ type }) => type !== "bot")
    .map(({ id, name }) => ({ id, name }));
  } catch (error) {
    console.error(error);
  }
}
