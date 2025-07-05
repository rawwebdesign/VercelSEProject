import { z } from "zod";

export const StorySchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string().optional(),
  score: z.number(),
  by: z.string(),
  time: z.number(),
  descendants: z.number().optional(),
});

export const AlgoliaSearchResultSchema = z.object({
  hits: z.array(
    z.object({
      objectID: z.string(),
      title: z.string(),
      url: z.string().optional(),
      author: z.string(),
      points: z.number(),
      created_at_i: z.number(),
      num_comments: z.number().optional(),
    }),
  ),
});
