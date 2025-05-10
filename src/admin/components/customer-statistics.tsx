import React, { useState, useEffect } from 'react';
import { Box, H4, H5, Text, Loader, Illustration } from '@adminjs/design-system';

interface CustomerStatistics {
  totalCustomers: number;
  newCustomers: number;
  topCustomer: {
    id: number;
    name: string;
    orderCount: number;
  } | null;
  customersByGroup: {
    id: number;
    name: string;
    count: number;
  }[];
}

const CustomerStatistics: React.FC = () => {
  const [statistics, setStatistics] = useState<CustomerStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await fetch('/admin/api/customer-statistics');
        
        if (response.ok) {
          const data = await response.json();
          setStatistics(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to load customer statistics');
        }
      } catch (error) {
        console.error('Error fetching customer statistics:', error);
        setError('Failed to load customer statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <Box p="xl" textAlign="center">
        <Loader />
        <Text mt="default">Loading customer statistics...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p="xl" textAlign="center">
        <Illustration variant="Rocket" width={100} height={100} />
        <Text mt="default">{error}</Text>
      </Box>
    );
  }

  if (!statistics) {
    return (
      <Box p="xl" textAlign="center">
        <Text>No statistics available</Text>
      </Box>
    );
  }

  return (
    <Box>
      <H4 mb="lg">Customer Statistics</H4>
      
      <Box display="flex" flexDirection={['column', 'row']} flexWrap="wrap">
        <Box flex={1} p="lg" bg="white" mr="lg" mb="lg" boxShadow="card" width={[1, 1/3]}>
          <H5 mb="md">Total Customers</H5>
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="bold" fontSize="xl">{statistics.totalCustomers}</Text>
            <Illustration variant="Moon" width={40} height={40} />
          </Box>
        </Box>
        
        <Box flex={1} p="lg" bg="white" mr="lg" mb="lg" boxShadow="card" width={[1, 1/3]}>
          <H5 mb="md">New Customers (30 days)</H5>
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="bold" fontSize="xl">{statistics.newCustomers}</Text>
            <Illustration variant="DocumentCheck" width={40} height={40} />
          </Box>
        </Box>
        
        <Box flex={1} p="lg" bg="white" mb="lg" boxShadow="card" width={[1, 1/3]}>
          <H5 mb="md">Top Customer</H5>
          {statistics.topCustomer ? (
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Text fontWeight="bold">
                  {statistics.topCustomer.name}
                </Text>
                <Text>
                  {statistics.topCustomer.orderCount} orders
                </Text>
              </Box>
              <Illustration variant="FlagInCog" width={40} height={40} />
            </Box>
          ) : (
            <Text>No orders yet</Text>
          )}
        </Box>
      </Box>
      
      {statistics.customersByGroup.length > 0 && (
        <Box>
          <H5 mb="md">Customers by Group</H5>
          <Box bg="white" p="lg" boxShadow="card">
            {statistics.customersByGroup.map(group => (
              <Box 
                key={group.id} 
                display="flex" 
                justifyContent="space-between"
                p="md"
                borderBottom="1px solid"
                borderColor="grey20"
              >
                <Text>{group.name}</Text>
                <Text fontWeight="bold">{group.count}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CustomerStatistics; 