import React from 'react';
import { Box, Link, VStack, Tooltip } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { BiShield, BiShieldQuarter } from 'react-icons/bi';

const Sidebar = () => {
  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      height="100vh"
      width="60px"
      bg="gray.800"
      color="white"
      padding={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      boxShadow='xl'
    >
      <Box fontWeight="bold" fontSize="sm" marginTop={2} bg="purple.300" rounded="md" padding={2} >
        N5
      </Box>
      <VStack spacing={4} align="center" marginTop={8}>
        <Tooltip label="Permission Types">
          <Link
            as={ReactLink}
            to="/permission-types-table"
            display="flex"
            flexDirection="column"
            alignItems="center"
            fontSize="sm"
            color="whiteAlpha.800"
            _hover={{
              textDecoration: 'none',
              bg: 'gray.700',
              rounded: 'md',
              color: 'purple.300'
            }}
            padding={2}
          >
            <Box marginTop={1}>
              <BiShieldQuarter size={20} />
            </Box>
          </Link>
        </Tooltip>
        <Tooltip label="Permissions">
          <Link
            as={ReactLink}
            to="/permissions-table"
            display="flex"
            flexDirection="column"
            alignItems="center"
            fontSize="sm"
            color="whiteAlpha.800"
            _hover={{
              textDecoration: 'none',
              bg: 'gray.700',
              rounded: 'md',
              color: 'purple.300'
            }}
            padding={2}
          >
            <Box marginBottom={1}>
              <BiShield size={20} />
            </Box>
          </Link>
        </Tooltip>
      </VStack>
    </Box>
  );
};

export default Sidebar;
