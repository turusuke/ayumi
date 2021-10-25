import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function addFeedback({ summary, title, member, reaction, url }) {
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
                  content: summary,
                },
              },
            ],
          },
          Member: {
            select: {
              name: member,
            },
          },
          URL: {
            url: url,
          },
          Reaction: {
            select: {
              name: reaction,
            },
          },
        },
        children: [
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              text: [
                {
                  type: "text",
                  text: {
                    content: "",
                  },
                },
              ],
            },
          },
        ],
      },
    });
  } catch (error) {
    return error;
  }
}
