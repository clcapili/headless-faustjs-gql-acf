import classNames from 'classnames/bind';
import { NavigationMenu } from '../../components';
import styles from './Footer.module.scss';

let cx = classNames.bind(styles);

export default function Footer({ title, menuItems }) {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className='container'>
        <NavigationMenu menuItems={menuItems} />
        <p>{`${title} © ${year}`}</p>
      </div>
    </footer>
  );
}
