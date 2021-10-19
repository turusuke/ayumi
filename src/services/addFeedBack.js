import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function addFeedback() {
  try {
    await notion.request({
      path: "pages",
      method: "post",
      body: {
        parent: { database_id: databaseId },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: text,
                },
              },
            ],
          },
        },
      },
    });
    console.log("Success! Entry added.");
  } catch (error) {
    console.error(error);
  }
}
