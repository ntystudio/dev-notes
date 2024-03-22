'use client';

const DocContentItem = (props) => {

  const handleOnTitle = (title) => {
    const stringWithHyphen = title.split(" ").join("-").toLowerCase().replace(/[^\w\-]|[_\-](?=[^\w\-]*$)/g, '');
    const element = document.getElementById(stringWithHyphen);
    if (element) {
      element.scrollIntoView();
    }

  };


  return (
    <li
      className={`hover:underline text-sm text-slate-300 cursor-pointer 
    ${props.title.level <= 2 && "pb-2 text-base font-bold pt-2 first:pt-0"}
    ${props.title.level > 2 && "ml-6 pb-2"}
    `}
      onClick={() => handleOnTitle(props.title.text)}
    >
      {props.title.text}
    </li>
  );
};

export default DocContentItem;
