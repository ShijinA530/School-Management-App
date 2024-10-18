import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/features/authSlice';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  useToast,
  Spinner,
  Text,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, { email, password });
      const user = await response.data;

      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });

      dispatch(login(user));

      if (user.role === 'Admin') navigate('/admin-dashboard');
      else if (user.role === 'Office Staff') navigate('/staff-dashboard');
      else navigate('/librarian-dashboard');
    } catch (err) {
      toast({
        title: 'Login Failed',
        description: err.response?.data?.message || err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bg="gray.100"
      p={4}
    >
      <Box
        w="full"
        maxW="md"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <Heading
          as="h2"
          size="lg"
          textAlign="center"
          mb={6}
          color="teal.500"
        >
          School Management Login
        </Heading>

        <form onSubmit={loginHandler}>
          <VStack spacing={4} align="stretch">
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isDisabled={loading}
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isDisabled={loading}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              w="full"
              isLoading={loading}
              loadingText="Logging in"
            >
              Login
            </Button>
          </VStack>
        </form>

        {loading && (
          <Box textAlign="center" mt={4}>
            <Spinner size="lg" color="teal.500" />
            <Text>Logging in...</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Login;
