import classes from '@/assets/DocContentNav.module.scss'


const DocContentNav = (props) => {
  return (
    <section id='document-content-nav' className={classes['document-content-nav']}>
      {props.children}
    </section>
  );
};

export default DocContentNav;
