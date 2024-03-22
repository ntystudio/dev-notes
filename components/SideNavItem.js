import Link from "next/link";
import { useState } from "react";
// import Image from "next/image";
const root = 'posts'
const SideNavItem = (props) => {
  const [isOpen, setIsOpen] = useState(props.title === root)
  return (
    <div>
      <h3 className="side-nav-item active font-semibold text-lg pb-2 mt-2 cursor-pointer flex items-center" onClick={() => setIsOpen(!isOpen)}>
        <span className="flex-1">{props.title}</span>
        {/* <Image height='24' width='24' src='/images/arrow.svg' className={} /> */}
        <i className={`icon-svg arrow dark:bg-light-color-base-00 bg-dark-color-base-00 ${!isOpen === false ? 'rotate-180' : undefined}`}  ></i>
      </h3>
      {isOpen && <ul className="side-nav-content">
        {props.posts.map((post) => (
          <li className="pl-2 pb-2" key={post.slug} onClick={props.closeOnClick && props.closeOnClick}>
            <Link
              href={`/posts/${post.slug}?folder=${post.folder}`}
              className="text-sm hover:underline hover:text-opacity-50 truncate w-50 block"
            >
              {post.title === undefined ? post.slug : post.title}
            </Link>
          </li>
        ))}
      </ul>}
    </div>
  );
};

export default SideNavItem;
