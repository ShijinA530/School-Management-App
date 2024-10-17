import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import AddEditStaffModal from '../components/miscellanious/AddEditStaffModal'
import StaffDeleteConfirmModal from '../components/miscellanious/StaffDeleteConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { setStaffs } from '../redux/features/staffSlice';

const AccountManagement = () => {
  const [loading, setLoading] = useState(true);
  const [editingStaff, setEditingStaff] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [staffToDelete, setStaffToDelete] = useState(null);
  
  const user = useSelector(state => state.userAuth.userInfo)
  const staff = useSelector(state => state.staffs.staffList)
  const toast = useToast()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/staff`, config);
        dispatch(setStaffs(response.data))
        setLoading(false);
      } catch (err) {
        console.error('Error fetching staff accounts:', err.message)
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

    fetchStaffs();
  }, [staff]);

  const handleAddEdit = (staffMember) => {
    setEditingStaff(staffMember);
    onOpen(); // Open modal for add/edit
  };

  // Handle Delete Confirmation
  const handleDeleteConfirmation = (staffMember) => {
    setStaffToDelete(staffMember);
    onDeleteOpen(); // Open the delete confirmation modal
  };

  return (
    <Box p={2} justifyContent='center'>
      <Text fontSize="3xl" fontWeight="semibold" textAlign="center" mb={6}>
        Account Management (Staff)
      </Text>
      <Box textAlign="center" mb={6}>
    <Button colorScheme="teal" onClick={() => handleAddEdit(null)}>
      Add Staff
    </Button>
  </Box>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Table variant="simple" colorScheme="cyan" border="2px" borderColor="cyan.500"  mx="auto" width='550px'>
          <Thead bg="cyan.500">
            <Tr>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {staff.map(member => (
              <Tr key={member._id}>
                <Td>{member.name}</Td>
                <Td>{member.role}</Td>
                <Td>
                  <Button colorScheme="blue" size="sm" onClick={() => handleAddEdit(member)}>
                    Edit
                  </Button>
                  <Button colorScheme="red" size="sm" ml={2} onClick={() => handleDeleteConfirmation(member)}>
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
        <AddEditStaffModal
          isOpen={isOpen}
          onClose={onClose}
          staff={editingStaff}
        />
      )}

      {/* Modal for Delete Confirmation */}
      {isDeleteOpen && (
        <StaffDeleteConfirmModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          staff={staffToDelete}
        />
      )}
    </Box>
  );
};

export default AccountManagement;
