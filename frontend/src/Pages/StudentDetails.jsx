import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Spinner, Box, useDisclosure, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import AddEditStudentModal from '../components/miscellanious/AddEditStudentModal';
import StudentDeleteConfirmModal from '../components/miscellanious/StudentDeleteConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents } from '../redux/features/studentSlice'

const StudentDetails = () => {
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [studentToDelete, setStudentToDelete] = useState(null);
  
  const user = useSelector(state => state.userAuth.userInfo)
  const students = useSelector(state => state.students.students)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/students`, config);
        dispatch(setStudents(response.data))
        setLoading(false);
      } catch (err) {
        console.log({ error: err.message })
        toast({
          title: 'Error Occured',
          description: err.response?.data?.message || err.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'bottom-right'
        })
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleAddEdit = (student) => {
    setEditingStudent(student);
    onOpen(); // Open modal for add/edit
  };

  const handleDeleteConfirmation = (student) => {
    setStudentToDelete(student);
    onDeleteOpen(); // Open the delete confirmation modal
  };

  return (
    <Box p={2}>
      <Text fontSize="3xl" fontWeight="semibold" textAlign="center" mb={4}>
        Student Details
      </Text>
      <Button
        isDisabled={user.role === 'Librarian'}
        colorScheme="teal"
        mb={4}
        onClick={() => handleAddEdit(null)}
      >
        Add Student
      </Button>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Table variant="simple" colorScheme="cyan" border="2px" borderColor="cyan.500"  mx="auto">
          <Thead bg="cyan.500">
            <Tr>
              <Th>Student ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>Address</Th>
              <Th>Class</Th>
              <Th>Division</Th>
              <Th>Guardian Name</Th>
              <Th>Guardian Number</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map(student => (
              <Tr key={student._id}>
                <Td>{student.studentID}</Td>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td>{student.phoneNumber}</Td>
                <Td>{student.address}</Td>
                <Td>{student.class}</Td>
                <Td>{student.division}</Td>
                <Td>{student.guardianName}</Td>
                <Td>{student.guardianNumber}</Td>
                <Td>
                  <Button
                    isDisabled={user.role === 'Librarian'}
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleAddEdit(student)}
                  >
                    Edit
                  </Button>
                  <Button 
                    isDisabled={user.role === 'Librarian'}
                    colorScheme="red"
                    size="sm"
                    ml={2}
                    onClick={() => handleDeleteConfirmation(student)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Modal for Add/Edit */}
      {isOpen && (
        <AddEditStudentModal
          isOpen={isOpen}
          onClose={onClose}
          student={editingStudent}
        />
      )}

      {/* Modal for Delete Confirmation */}
      {isDeleteOpen && (
        <StudentDeleteConfirmModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          student={studentToDelete}
        />
      )}
    </Box>
  );
};

export default StudentDetails;
