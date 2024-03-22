'use client';
import SideNavItem from '@/components/SideNavItem';


const SideNav = (props) => {
  return (
    <section className="px-12 md:px-4 pt-4 md:pl-4 pb-4 md:mr-4 w-screen lg:w-80">
      <nav id='side-nav' className="overflow-auto">
        {Object.keys(props.postMetaData).map((key, index) => (
          <SideNavItem key={`${key}-${index}`} title={key} posts={props.postMetaData[key]} closeOnClick={props.closeOnClick && props.closeOnClick} />
        ))}
      </nav>
    </section>
  );
};

export default SideNav;
