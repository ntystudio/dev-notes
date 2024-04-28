import Link from "next/link";
import { getAllTags } from "@/util/tags";
import { PostMetaData } from "@/interface/PostMetaData";

export const generateStaticParams = async () => {
  const tags = getAllTags();

  const slugs: string[] = [];
  Object.keys(tags).forEach((key: string) => slugs.push(key));
  return slugs.map((slug) => ({ slug }));
};

export default function posts(props: any) {
  const slug = decodeURI(props.params.slug);
  const tags = getAllTags();
  const items = tags[slug] || [];

  const rootPostPreview = items.map((post: PostMetaData) => (
    <div
      className=" px-4 py-2 rounded hover:dark:bg-dark-color-base-40 hover:bg-light-color-base-30 mb-5"
      key={post.slug}
    >
      <Link href={`/posts/${post.slug}?folder=${post.folder}`}>
        <p className="font-mono text-sm font-semibold text-light-color-base-70 dark:text-dark-color-base-70 uppercase mb-2">
          {post.date}
        </p>
        <p className="font-sans text-xl font-semibold text-light-color-base-100 dark:text-dark-color-base-100 mb-1">
          {post.title === undefined ? post.slug : post.title}
        </p>
        <p className="font-sans text-base dark:text-dark-color-base-70 text-light-color-base-70">
          {post.subtitle}
        </p>
      </Link>
    </div>
  ));

  return (
    <>
      <h1 className="text-3xl font-mono uppercase">
        Tag:{slug} - {items.length}
      </h1>
      <hr className="my-8" />
      <section>{rootPostPreview}</section>
    </>
  );
}
