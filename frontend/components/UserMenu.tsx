import { useAppSelector } from '@/app/hook';
import { RootState } from '@/app/store';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { useState } from 'react';

const UserMenu = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    user.auth.signOut();
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <div className="" onClick={handleLogout}>
          Logout
        </div>
      ),
      key: '0',
    },
  ];

  return (
    <Dropdown
      className="cursor-pointer"
      menu={{
        items,
      }}
      trigger={['click']}
      placement="bottomRight"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div>
        <span className="mr-1 font-medium text-base">{user.displayName}</span>
        <Avatar src={user.photoURL} />
      </div>
    </Dropdown>
  );
};

export default UserMenu;
