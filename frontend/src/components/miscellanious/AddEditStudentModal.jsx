import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, updateStudent } from '../../redux/features/studentSlice';

const AddEditStudentModal = ({ isOpen, onClose, student }) => {
  const [formData, setFormData] = useState(student || {
    studentID: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    class: '',
    division: '',
    guardianName: '',
    guardianNumber: ''
  });

  const user = useSelector(state => state.userAuth.userInfo)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    if (student) {
      setFormData(student)
    }
  }, [student]);

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
      if (student) {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/students/${student._id}`, formData, config);
        dispatch(updateStudent(response.data))
      } else {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/students`, formData, config);
        dispatch(addStudent(response.data))
      }
      onClose();
    } catch (err) {
      console.error('Error saving student:', err.response)
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
        <ModalHeader>{student ? 'Edit Student' : 'Add New Student'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4} isRequired>
            <FormLabel>Student ID</FormLabel>
            <Input type='string' name="studentID" value={formData.studentID} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input type='number' name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Address</FormLabel>
            <Input name="address" value={formData.address} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Class</FormLabel>
            <Input name="class" value={formData.class} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Division</FormLabel>
            <Input name="division" value={formData.division} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Guardian Name</FormLabel>
            <Input name="guardianName" value={formData.guardianName} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Guardian Number</FormLabel>
            <Input type='number' name="guardianNumber" value={formData.guardianNumber} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {student ? 'Update' : 'Add'}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEditStudentModal;
