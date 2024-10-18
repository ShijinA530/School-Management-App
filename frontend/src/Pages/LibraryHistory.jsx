import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Spinner, Button, useDisclosure, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import AddEditLibraryModal from '../components/miscellanious/AddEditLibraryModal';
import LibraryDeleteConfirm from '../components/miscellanious/LibraryDeleteConfirm';
import { useSelector, useDispatch } from 'react-redux';
import { setRecords } from '../redux/features/librarySlice';

const LibraryDetails = () => {
  const [loading, setLoading] = useState(true);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); // For Add/Edit modal
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure(); // For delete modal

  const user = useSelector(state => state.userAuth.userInfo)
  const libraryRecords = useSelector(state => state.library.libraryRecords)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    const fetchLibraryRecords = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        };
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/library`, config)
        dispatch(setRecords(response.data))
        setLoading(false);
      } catch (err) {
        console.error('Error fetching library records:', err)
        toast({
          title: 'Error Occured',
          description: err.response?.data?.message || err.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'bottom-right'
        })
        setLoading(false)
      }
    };

    fetchLibraryRecords();
  }, []);

  const handleAddEdit = (record = null) => {
    setEditingRecord(record);
    onOpen(); // Open the add/edit modal
  };

  const handleDelete = (record) => {
    setDeletingRecord(record);
    onDeleteOpen(); // Open the delete confirmation modal
  };

  return (
    <Box p={2}>
      <Text fontSize="3xl" fontWeight="semibold" textAlign="center" mb={4}>
        Library History
      </Text>
      <Button colorScheme="teal" mb={4} onClick={() => handleAddEdit(null)}>Add Library Record</Button>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Table variant="simple" colorScheme="cyan" border="2px" borderColor="cyan.500"  mx="auto">
          <Thead bg='cyan.500'>
            <Tr>
              <Th>Student ID</Th>
              <Th>Book Name</Th>
              <Th>Borrow Date</Th>
              <Th>Return Date</Th>
              <Th>Status</Th>
              <Th>Fine Amount</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {libraryRecords.map((record) => (
              <Tr key={record._id}>
                <Td>{record.studentID}</Td>
                <Td>{record.bookName}</Td>
                <Td>
                  {new Date(record.borrowDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                </Td>
                <Td>{record.returnDate ? new Date(record.returnDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                }) : 'N/A'}
                </Td>
                <Td>{record.status}</Td>
                <Td>{record.fineAmount}</Td>
                <Td>
                  <Button colorScheme="blue" size="sm" mr={2} onClick={() => handleAddEdit(record)}>
                    Edit
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleDelete(record)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Add/Edit Modal */}
      <AddEditLibraryModal
        isOpen={isOpen}
        onClose={onClose}
        record={editingRecord}
      />

      {/* Delete Confirmation Modal */}
      <LibraryDeleteConfirm
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        record={deletingRecord}
      />
    </Box>
  );
};

export default LibraryDetails;
