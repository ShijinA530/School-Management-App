import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addStaff, updateStaff } from '../../redux/features/staffSlice';

const AddEditStaffModal = ({ isOpen, onClose, staff }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('');
  
  const [loading, setLoading] = useState(false)

  const user = useSelector(state => state.userAuth.userInfo)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    if (staff) {
      setName(staff.name);
      setEmail(staff.email)
      setRole(staff.role);
    } else {
      setName('');
      setEmail('')
      setRole('');
    }
  }, [staff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      if (staff) {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/staff/${staff._id}`, { name, email, role }, config);
        dispatch(addStaff(response.data))
      } else {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/staff`, { name, email, role }, config);
        dispatch(updateStaff(response.data))
        toast({
          title: 'Account created successfully',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'bottom-right'
        })
      }
      onClose();
    } catch (error) {
      console.error('Error saving staff account:', error.response ? error.response.data : error.message)
      toast({
        title: 'Error Occured',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right'
      })
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{staff ? 'Edit Staff' : 'Add Staff'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter staff name" />
            </FormControl>
            {
              !staff && (
              <>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter staff email" />
                  </FormControl>
                </>
            )}
          <FormControl isRequired>
            <FormLabel mt={4}>Role</FormLabel>
            <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder='Admin, Office Staff, Librarian' />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={loading}
            colorScheme="teal"
            onClick={handleSubmit}
          >
            {staff ? 'Update' : 'Add'}
          </Button>
          <Button onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEditStaffModal;
