import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Spinner, Button, useDisclosure, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import AddEditFeeModal from '../components/miscellanious/AddEditFeeModal';
import FeeDeleteConfirmModal from '../components/miscellanious/FeeDeleteConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { setFees } from '../redux/features/feesSlice';

const FeeDetails = () => {
  const [loading, setLoading] = useState(true);
  const [editingFee, setEditingFee] = useState(null);
  const [deletingFee, setDeletingFee] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); // For Add/Edit modal
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure(); // For delete modal

  const user = useSelector(state => state.userAuth.userInfo)
  const feesRecords = useSelector(state => state.fees.feesRecords)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    const fetchFeeRemarks = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/fees`, config);
        dispatch(setFees(response.data))
        setLoading(false);
      } catch (err) {
        console.error('Error fetching fee remarks:', err)
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

    fetchFeeRemarks();
  }, []);

  const handleAddEdit = (fee = null) => {
    setEditingFee(fee);
    onOpen(); // Open the add/edit modal
  };

  const handleDelete = (fee) => {
    setDeletingFee(fee);
    onDeleteOpen(); // Open the delete confirmation modal
  };

  return (
    <Box p={2}>
      <Text fontSize="3xl" fontWeight="semibold" textAlign="center" mb={4}>
        Fee Details
      </Text>
      <Button colorScheme="teal" mb={4} onClick={() => handleAddEdit(null)}>Add Fee Remark</Button>

      {loading ? (
        <Box mt={4} display='flex' justifyContent='center'>
        <Spinner size="xl" />
      </Box>
      ) : (
          <Table variant="simple" colorScheme="cyan" border="2px" borderColor="cyan.500"  mx="auto">
          <Thead bg="cyan.500">
            <Tr>
              <Th>Student ID</Th>
              <Th>Fee Type</Th>
              <Th>Amount</Th>
              <Th>Payment Date</Th>
              <Th>Payment Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {feesRecords.map((remark) => (
              <Tr key={remark._id}>
                <Td>{remark.studentID}</Td>
                <Td>{remark.feeType}</Td>
                <Td>{remark.amount}</Td>
                <Td>
                  {new Date(remark.paymentDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </Td>
                <Td>{remark.paymentStatus}</Td>
                <Td>
                  <Button colorScheme="blue" size="sm" mr={2} onClick={() => handleAddEdit(remark)}>
                    Edit
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleDelete(remark)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Add/Edit Modal */}
      <AddEditFeeModal
        isOpen={isOpen}
        onClose={onClose}
        fee={editingFee}
      />

      {/* Delete Confirmation Modal */}
      <FeeDeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        fee={deletingFee}
      />
    </Box>
  );
};

export default FeeDetails;
