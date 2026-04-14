import { query } from "./_generated/server";

export const listDocsMetadata = query({
  args: {},
  handler: async (ctx) => {
    const sections = await ctx.db.query("docsSections").collect();
    return sections
      .filter((section) => section.published)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  },
});
