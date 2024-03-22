import { PostMetaData } from "@/interface/PostMetaData";
import Link from "next/link";
import getPostMetaData from "@/util/getPostMetadata";

export default function Home() {
    const postMetaData = getPostMetaData();

    const rootPostPreview = postMetaData["posts"].map((post: PostMetaData) => (
        <div
            className=" px-4 py-2 rounded hover:dark:bg-dark-color-base-40 hover:bg-light-color-base-30 mb-5"
            key={post.slug}
        >
            <Link href={`/posts/${post.slug}?folder=${post.folder}`} className="hover:bg-light-color-orange">
                <p className="font-mono text-sm font-semibold text-light-color-base-70 dark:text-dark-color-base-70 uppercase mb-2">{post.date}</p>
                <p className="font-sans text-xl font-semibold text-light-color-base-100 dark:text-dark-color-base-100 mb-1">
                    {post.title === undefined ? post.slug : post.title}
                </p>
                <p className="font-sans text-base dark:text-dark-color-base-70 text-light-color-base-70">{post.subtitle}</p>
            </Link>
        </div>
    ));
    return (
        <div className="py-4">
            <p className="text-2xl mb-8">Dev notes exploring pixels and code from our studio.</p>

            <hr/>

            <div className="flex flex-row mb-8">
                <div className="flex flex-row mt-4">
                    <img
                        src="https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_kristian_bouw_avatar.jpg"
                        className="w-auto max-w-48 lg:max-w-72 h-fit rounded mr-4"
                        alt="Kristian Bouw"
                    />
                    <div className="font-sans">
                        <h1 className="text-2xl font-bold mb-8 pb-4">About me:</h1>
                        <p className="mb-4">
                            I'm a software engineer (and founder) leading technology and research at{" "} <a
                            href="">Notiontheory</a> & <a href="">NTY.studio</a>.
                        </p>
                        <p className="mb-4">
                            I'm surrounded by an incredible team of tinkerers, thinkers, and creatives who I learn from-and-with everyday.
                        </p>
                        <p className="mb-4">
                            The contents of this site are heavily inspired by my interactions and conversations with those very team members.
                        </p>
                        <p className="mb-4">
                            This site is a random-but-organized assortment of things learned covering game development, game design, real-time rendering, networking, spatial computing, and much more.
                        </p>
                        <p className="mb-4">
                            The best way to reach me is on <a href="https://www.linkedin.com/in/kbouw/" target="_blank">LinkedIn</a> or <a href="https://twitter.com/kebaux" target="_blank">Twitter</a>.
                        </p>
                    </div>
                </div>
            </div>

            {/*<hr/>*/}
            
            {/*<h3>Recent Posts</h3>*/}
            {/*<section>*/}
            {/*    {rootPostPreview}*/}
            {/*</section>*/}
        </div>
    );
}
