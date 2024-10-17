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
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addRecord, updateRecord } from '../../redux/features/librarySlice';

const AddEditLibraryModal = ({ isOpen, onClose, record }) => {
  const [formData, setFormData] = useState({
    studentID: '',
    bookName: '',
    borrowDate: '',
    returnDate: '',
    status: 'Borrowed',
    fineAmount: 0,
  })

  const user = useSelector((state) => state.userAuth.userInfo)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    if (record) {
      setFormData(record)
    } else {
      resetForm();
    }
  }, [record, isOpen]); // Also reset when modal opens

  const resetForm = () => {
    setFormData({
      studentID: '',
      bookName: '',
      borrowDate: '',
      returnDate: '',
      status: '',
      fineAmount: 0,
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      if (record) {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/library/${record._id}`, formData, config);
        dispatch(updateRecord(response.data))
      } else {
        // Add new record
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/library`, formData, config);
        dispatch(addRecord(response.data))
      }
      onClose();
    } catch (err) {
      console.error('Error saving library record:', err.message);
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{record ? 'Edit Library Record' : 'Add Library Record'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4} isRequired>
            <FormLabel>Student ID</FormLabel>
            <Input
              name="studentID"
              value={formData.studentID}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Book Name</FormLabel>
            <Input
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Borrow Date</FormLabel>
            <Input
              type="date"
              name="borrowDate"
              value={formData.borrowDate.split('T')[0]}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Return Date</FormLabel>
            <Input
              type="date"
              name="returnDate"
              value={formData.returnDate && formData.returnDate.split('T')[0]}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Status</FormLabel>
            <Input
              name="status"
              placeholder='Borrowed, Returned, Overdue'
              value={formData.status}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Fine Amount</FormLabel>
            <Input
              type="number"
              name="fineAmount"
              value={formData.fineAmount}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {record ? 'Update' : 'Add'}
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEditLibraryModal;
