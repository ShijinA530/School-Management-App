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
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addFee, updateFee } from '../../redux/features/feesSlice';

const AddEditFeeModal = ({ isOpen, onClose, fee }) => {
  const [formData, setFormData] = useState({
    studentID: '',
    feeType: '',
    amount: '',
    paymentDate: '',
    paymentStatus: '',
  })

  const user = useSelector((state) => state.userAuth.userInfo)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    if (fee) {
      setFormData(fee)
    } else {
      resetForm();
    }
  }, [fee, isOpen]); // Also reset when modal opens

  const resetForm = () => {
    setFormData({
      studentID: '',
      feeType: '',
      amount: '',
      paymentDate: '',
      paymentStatus: '',
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
      }
      if (fee) {
        
      console.log(formData)
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/fees/${fee._id}`, formData, config);
        dispatch(updateFee(response.data))
      } else {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/fees`, formData, config);
        dispatch(addFee(response.data))
      }
      onClose();
    } catch (err) {
      console.error('Error saving fee remark:', err.message)
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
        <ModalHeader>{fee ? 'Edit Fee Remark' : 'Add Fee Remark'}</ModalHeader>
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
            <FormLabel>Fee Type</FormLabel>
            <Input
              name="feeType"
              value={formData.feeType}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              type="number"
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Payment Date</FormLabel>
            <Input
              type="date"
              name="paymentDate"
              value={formData.paymentDate.split('T')[0]}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Payment Status</FormLabel>
            <Input
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {fee ? 'Update' : 'Add'}
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEditFeeModal;
