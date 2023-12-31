'use client'
import { useSelector, useDispatch } from '@/lib/redux/hooks';
import { toggleMenu } from '@/lib/redux/features/menuSlice';
import styles from './menu.module.css'; 
import Link from 'next/link';
import Image from 'next/image';

const MenuButton = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.menu.isOpen);
  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  const { id, name } = useSelector((state) => state.userProfile);

  return (
    <div>
      <button onClick={handleToggleMenu} className={styles.menuButton}>
        <Image src='/menu.svg' width={30} height={50} color='with' alt='menu'></Image>
      </button>
      {isMenuOpen && (
        <div className={styles.menu}>
          <ul>
          <li>Register</li>
              <div className='flex flex-col items-center'>
                <Link href="/register"><li>User</li></Link>
                <Link href="/registerLocal"><li>Local</li></Link>
              </div>
            <Link href="/addProduct"><li>Create Products</li></Link>
            <Link href={`/users/profile/${id}`}><li>perfil {name}</li></Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuButton;