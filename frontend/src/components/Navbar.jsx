import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, Button, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { logout } from '../redux/features/authSlice'

const Navbar = ({ baseRoute }) => {
  const user = useSelector(state => state.userAuth.userInfo)
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-2xl font-bold flex-grow text-center pl-16">{user.role} Dashboard</h2>
        
        {/* Profile Menu */}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={openModal}>My Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>

      {/* Navbar Links */}
      <nav className="bg-blue-500 p-4">
        <ul className="flex justify-center space-x-6 text-white">
          <li>
            <Link 
              to={`${baseRoute}/students`} 
              className={location.pathname.includes(`${baseRoute}/students`) ? 'font-medium' : ''}>
              Student Details
            </Link>
          </li>
          {user.role !== 'Librarian' && (
            <li>
              <Link
                to={`${baseRoute}/fees`}
                className={location.pathname.includes(`${baseRoute}/fees`) ? 'font-medium' : ''}>
                Fee Details
              </Link>
            </li>
          )}
          <li>
            <Link 
              to={`${baseRoute}/library`} 
              className={location.pathname.includes(`${baseRoute}/library`) ? 'font-medium' : ''}>
              Library Details
            </Link>
          </li>
          {user.role === 'Admin' && (
            <li>
              <Link 
                to={`${baseRoute}/accounts`} 
                className={location.pathname.includes(`${baseRoute}/accounts`) ? 'font-medium' : ''}>
                Account Management
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Modal for My Profile */}
      <Modal size='lg' isOpen={isModalOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent h='300px'>
          <ModalHeader
          fontSize='40px'
          fontFamily='Work sans'
          display='flex'
            justifyContent='center'
          paddingTop={7}>
            My Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display='flex'
          flexDir='column'
            alignItems='center'
          >
            <Text
              fontSize={{ base: '28px', md: '30px' }}
              paddingBottom={1}
            >Name: <strong className='font-semibold'>{user.name}</strong> 
            </Text>
            <Text
            fontSize={{base: '28px', md: '30px'}}
            >Role: <strong className='font-semibold'>{user.role}</strong>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
