import { z } from "zod";

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

export const PopularTopics = z.array(z.string());
