import fs from "fs";
import matter from "gray-matter";
import getPostMetaData from "@/util/getPostMetadata";
import {getAllTagPastRelatedToPage} from "@/util/tags";
import MarkdowContent from "@/components/MarkdowContent";
import {PostMetaData} from "@/interface/PostMetaData";
import {Metadata} from "next";
import Link from "next/link";
import dayjs from "dayjs";

const getPostContent = (slug: string, folder: string) => {
  const file = `${folder}/${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  return matter(content);
};

// const getTitlesFromText = (text: string) => {
//   const headerRegex = /^(#+)\s*(.*)/gm;
//   const matches = [];
//   let match;
//   while ((match = headerRegex.exec(text)) !== null) {
//     matches.push({ level: match[1].length, text: match[2] });
//   }
//   return matches;
// };

type Props = {
  params: { slug: string };
  searchParams: { folder: string };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const matterResult = getPostContent(params.slug, searchParams.folder);
  return {
    // title: matterResult.data.title,
    description: matterResult.data.subtitle,
    openGraph: {
      title: matterResult.data.title, // Add Open Graph title
      description: matterResult.data.subtitle, // Add Open Graph description
      images: {
        url: matterResult.data?.img, // Add Open Graph image URL
        alt: "Image Alt Text", // Add alternative text for the image
        width: 800,
        height: 600,
      },
    },
  };
}

export const generateStaticParams = async () => {
  const postPreview = getPostMetaData();
  const slugs: string[] = [];
  Object.keys(postPreview).forEach((key: string) =>
    postPreview[key].forEach((post: PostMetaData) => {
      slugs.push(post.slug);
    })
  );
  return slugs.map((post) => ({
    slug: post,
  }));
};

export default function posts(props: any) {
  const slug = props.params.slug;
  const folder = props.searchParams.folder;
  const matterResult = getPostContent(slug, folder);
  // const tags = getAllTagPastRelatedToPage(slug, folder);
  const tags = getAllTagPastRelatedToPage(decodeURI(slug), folder);

  // const titles = getTitlesFromText(matterResult.content);

  return (
    <section className="flex  justify-center">
      <div className="pb-24">
        <article
          className="mb-8"
          style={{ minWidth: "100%", maxWidth: "890px" }}
        >
          <p className="font-mono text-sm font-semibold text-light-color-base-70 dark:text-dark-color-base-70 uppercase mb-4">
            Last updated {dayjs(matterResult.data.date).format("MMMM DD, YYYY")}{" "}
            ({dayjs().diff(matterResult.data.date, "day")} days ago)
          </p>
          <p className="font-sans font-semibold text-light-color-base-100 dark:text-dark-color-base-100  text-3xl mb-1">
            {matterResult.data.title === undefined
              ? matterResult.data.slug
              : matterResult.data.title}
          </p>
          <p className="font-sans dark:text-dark-color-base-70 text-light-color-base-70">
            {matterResult.data.subtitle}
          </p>
          <div className="flex flex-col md:flex-row mt-6">
            <p className="font-mono dark:text-dark-color-base-70 text-light-color-base-70 flex uppercase text-base items-center">
              Kristian Bouw
            </p>
            <p className="invisible md:visible text-slate-500 flex mx-3">•</p>
            <ul className="flex flex-col md:flex-row m-0 p-0">
              {Object.keys(tags).map(
                (
                  key: string // Use map instead of forEach
                ) => (
                  <li className="md:mr-3 cursor-pointer" key={key}>
                    <Link
                      href={`/tags/${key}`}
                      className="font-mono w-fit mb-3 md:mb-0 flex px-3 py-1 dark:text-dark-color-base-100 text-light-color-base-100 font-semibold rounded dark:bg-dark-color-base-20 bg-light-color-base-20 text-sm uppercase hover:bg-light-color-base-30 dark:hover:bg-dark-color-base-30"
                    >
                      {key}
                      <span
                        className="font-mono text-dark-color-base-20 dark:text-light-color-base-20 rounded flex justify-center items-center"
                        style={{
                          width: "20px",
                          height: "20px",
                          fontSize: "13px",
                        }}
                      >
                        {tags[key].length}
                      </span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <hr className="mt-8" />
        </article>

        <div className="flex justify-center">
          <article className="prose prose-sm">
            <MarkdowContent>{matterResult.content}</MarkdowContent>
          </article>
        </div>
      </div>
      {/* <DocContentNav>
        <ul>
          {titles.map((title) => (
            <DocContentItem title={title} />
          ))}
        </ul>
      </DocContentNav> */}
    </section>
  );
}
