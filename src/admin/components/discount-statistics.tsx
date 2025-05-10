import React, { useState, useEffect } from 'react';
import { Box, H4, H5, Text, Loader, Illustration } from '@adminjs/design-system';

interface DiscountStatistics {
  totalDiscounts: number;
  activeDiscounts: number;
  mostUsedDiscount: {
    id: number;
    code: string;
    name: string;
    usedCount: number;
  } | null;
  totalDiscountAmount: number;
}

const DiscountStatistics: React.FC = () => {
  const [statistics, setStatistics] = useState<DiscountStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await fetch('/admin/api/discount-statistics');
        
        if (response.ok) {
          const data = await response.json();
          setStatistics(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to load discount statistics');
        }
      } catch (error) {
        console.error('Error fetching discount statistics:', error);
        setError('Failed to load discount statistics');
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
        <Text mt="default">Loading discount statistics...</Text>
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

  // Format currency amount
  const formatCurrency = (amount: number) => {
    return amount.toFixed(2);
  };

  return (
    <Box>
      <H4 mb="lg">Discount Statistics</H4>
      
      <Box display="flex" flexDirection={['column', 'row']} flexWrap="wrap">
        <Box flex={1} p="lg" bg="white" mr="lg" mb="lg" boxShadow="card" width={[1, 1/3]}>
          <H5 mb="md">Total Discounts</H5>
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="bold" fontSize="xl">{statistics.totalDiscounts}</Text>
            <Illustration variant="DocumentSearch" width={40} height={40} />
          </Box>
        </Box>
        
        <Box flex={1} p="lg" bg="white" mr="lg" mb="lg" boxShadow="card" width={[1, 1/3]}>
          <H5 mb="md">Active Discounts</H5>
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="bold" fontSize="xl">{statistics.activeDiscounts}</Text>
            <Illustration variant="DocumentCheck" width={40} height={40} />
          </Box>
        </Box>
        
        <Box flex={1} p="lg" bg="white" mb="lg" boxShadow="card" width={[1, 1/3]}>
          <H5 mb="md">Total Discount Amount</H5>
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="bold" fontSize="xl">${formatCurrency(statistics.totalDiscountAmount)}</Text>
            <Illustration variant="Planet" width={40} height={40} />
          </Box>
        </Box>
      </Box>
      
      {statistics.mostUsedDiscount && (
        <Box p="lg" bg="white" boxShadow="card" mt="lg">
          <H5 mb="md">Most Used Discount</H5>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontWeight="bold">
                {statistics.mostUsedDiscount.name} ({statistics.mostUsedDiscount.code})
              </Text>
              <Text mt="sm">
                Used {statistics.mostUsedDiscount.usedCount} times
              </Text>
            </Box>
            <Box 
              as="a" 
              href={`/admin/resources/Discount/records/${statistics.mostUsedDiscount.id}/show`}
              py="sm" 
              px="lg" 
              bg="primary100" 
              color="white" 
              borderRadius="default"
              style={{ textDecoration: 'none' }}
            >
              View Details
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DiscountStatistics; 