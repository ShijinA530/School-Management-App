import React, { useRef } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudent } from '../../redux/features/studentSlice';
import axios from 'axios';

const StudentDeleteConfirmModal = ({ isOpen, onClose, student }) => {
  const cancelRef = useRef();
  const user = useSelector(state => state.userAuth.userInfo)
  const dispatch = useDispatch()
  const toast = useToast()

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/students/${id}`, config);
      dispatch(deleteStudent(id))
      onClose();
    } catch (err) {
      console.error('Error deleting student:', err)
      toast({
        title: 'Error Occured',
        description: err.response?.data?.message || err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right'
      })
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Student
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete {student.name}? This action cannot be undone.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => handleDelete(student._id)} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default StudentDeleteConfirmModal;
