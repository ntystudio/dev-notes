// import matter from "gray-matter";
import getPostMetaData from "@/util/getPostMetadata";
import fs from "fs";
import matter from "gray-matter";
import { PostMetaData, PostMetaDataCollection } from "@/interface/PostMetaData";

export const getAllTags = () => {
  const postPreview = getPostMetaData();
  const tags: PostMetaDataCollection = {};

  Object.keys(postPreview).forEach((key) =>
    postPreview[key].forEach((post) => {
      const t = post.tags;
      if (t !== undefined) {
        const tagsArray = t.replace(" ", "").split(",");

        tagsArray.forEach((tempTag) => {
          if (tags.hasOwnProperty(tempTag)) {
            tags[tempTag].push(post);
          } else {
            tags[tempTag] = [post];
          }
        });
      }
    })
  );
  return tags;
};

export const getAllTagPastRelatedToPage = (slug: string, folder: string) => {
  const file = `${folder}/${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  const tags = getAllTags();
  const pageTags: PostMetaDataCollection = {};

  if (matterResult.data.hasOwnProperty("tags")) {
    const t = matterResult.data.tags.replace(" ", "").split(",") as string[];
    t.forEach((tag) => {
      pageTags[tag] = tags[tag];
    });
  }
  return pageTags;
};
