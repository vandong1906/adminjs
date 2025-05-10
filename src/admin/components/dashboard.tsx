import React, { useEffect, useState } from 'react';
import { Box, H2, H5, Text, Illustration, H4, Button } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import CustomerStatistics from './customer-statistics.js';

interface DashboardData {
  products: number;
  orders: number;
  customers: number;
  revenue: number;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load dashboard data
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Sử dụng fetch thay vì ApiClient để gọi API mới
        const response = await fetch('/admin/api/dashboard');
        if (response.ok) {
          const jsonData = await response.json();
          setData({
            products: jsonData.products || 0,
            orders: jsonData.orders || 0,
            customers: jsonData.customers || 0,
            revenue: jsonData.revenue || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format revenue with 2 decimal places or show 0
  const formattedRevenue = typeof data.revenue === 'number' 
    ? data.revenue.toFixed(2) 
    : '0.00';

  return (
    <Box>
      <Box position="relative" overflow="hidden" bg="white" mb="xxl">
        <Box position="absolute" top={-30} left={-30} opacity={0.2}>
          <Illustration variant="Rocket" width={200} height={200} />
        </Box>
        <Box p="xl" position="relative" zIndex={2}>
          <H2>Welcome to Your Lunar Ecommerce Admin</H2>
          <Text>Manage your products, orders, customers, and more.</Text>
        </Box>
      </Box>

      {/* Metrics */}
      <Box display="flex" flexDirection={['column', 'row']} mb="xl">
        <Box
          flex={1}
          p="lg"
          bg="white"
          mr="lg"
          mb="lg"
          boxShadow="card"
          width={[1, 1/4]}
          as="a"
          href="/admin/resources/Product"
          style={{ textDecoration: 'none', borderRadius: '4px' }}
        >
          <H5 mb="md">Products</H5>
          <Box display="flex" justifyContent="space-between">
            <H4>{data.products}</H4>
            <Illustration variant="DocumentCheck" width={40} height={40} />
          </Box>
        </Box>
        
        <Box
          flex={1}
          p="lg"
          bg="white"
          mr="lg"
          mb="lg"
          boxShadow="card"
          width={[1, 1/4]}
          as="a"
          href="/admin/resources/Order"
          style={{ textDecoration: 'none', borderRadius: '4px' }}
        >
          <H5 mb="md">Orders</H5>
          <Box display="flex" justifyContent="space-between">
            <H4>{data.orders}</H4>
            <Illustration variant="DocumentSearch" width={40} height={40} />
          </Box>
        </Box>
        
        <Box
          flex={1}
          p="lg"
          bg="white"
          mr="lg"
          mb="lg"
          boxShadow="card"
          width={[1, 1/4]}
          as="a"
          href="/admin/resources/Customer"
          style={{ textDecoration: 'none', borderRadius: '4px' }}
        >
          <H5 mb="md">Customers</H5>
          <Box display="flex" justifyContent="space-between">
            <H4>{data.customers}</H4>
            <Illustration variant="Moon" width={40} height={40} />
          </Box>
        </Box>
        
        <Box
          flex={1}
          p="lg"
          bg="white"
          mb="lg"
          boxShadow="card"
          width={[1, 1/4]}
          as="a"
          href="/admin/resources/Order"
          style={{ textDecoration: 'none', borderRadius: '4px' }}
        >
          <H5 mb="md">Revenue</H5>
          <Box display="flex" justifyContent="space-between">
            <H4>${formattedRevenue}</H4>
            <Illustration variant="Planet" width={40} height={40} />
          </Box>
        </Box>
      </Box>
      
      {/* Customer Statistics */}
      <Box mb="xl">
        <CustomerStatistics />
      </Box>
      
      {/* Quick Actions */}
      <Box mb="xl">
        <H5 mb="lg">Quick Actions</H5>
        <Box display="flex" flexDirection={['column', 'row']} flexWrap="wrap">
          <Box
            p="lg"
            bg="white"
            mr="lg"
            mb="lg"
            boxShadow="card"
            width={[1, 1/4]}
            as="a"
            href="/admin/resources/Product/actions/new"
            style={{ textDecoration: 'none', borderRadius: '4px' }}
          >
            <Box p="md" textAlign="center">
              <Illustration variant="FileSearch" width={40} height={40} />
              <Text fontWeight="bold">Add New Product</Text>
            </Box>
          </Box>
          
          <Box
            p="lg"
            bg="white"
            mr="lg"
            mb="lg"
            boxShadow="card"
            width={[1, 1/4]}
            as="a"
            href="/admin/resources/Customer/actions/new"
            style={{ textDecoration: 'none', borderRadius: '4px' }}
          >
            <Box p="md" textAlign="center">
              <Illustration variant="FlagInCog" width={40} height={40} />
              <Text fontWeight="bold">Add New Customer</Text>
            </Box>
          </Box>
          
          <Box
            p="lg"
            bg="white"
            mr="lg"
            mb="lg"
            boxShadow="card"
            width={[1, 1/4]}
            as="a"
            href="/admin/resources/Discount/actions/new"
            style={{ textDecoration: 'none', borderRadius: '4px' }}
          >
            <Box p="md" textAlign="center">
              <Illustration variant="DocumentCheck" width={40} height={40} />
              <Text fontWeight="bold">Create Discount</Text>
            </Box>
          </Box>
          
          <Box
            p="lg"
            bg="white"
            mb="lg"
            boxShadow="card"
            width={[1, 1/4]}
            as="a"
            href="/admin/resources/Collection/actions/new"
            style={{ textDecoration: 'none', borderRadius: '4px' }}
          >
            <Box p="md" textAlign="center">
              <Illustration variant="Folders" width={40} height={40} />
              <Text fontWeight="bold">Create Collection</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      
      {/* Documentation */}
      <Box p="xl" bg="grey100" mt="xl" boxShadow="card" style={{ borderRadius: '4px' }}>
        <H5>Documentation & Resources</H5>
        <Text mb="lg">Find more information about your ecommerce platform in the links below:</Text>
        
        <Box display="flex" flexDirection={['column', 'row']}>
          <Button as="a" href="https://docs.lunarphp.io/" target="_blank" mr="default" mb={['default', 0]}>
            Documentation
          </Button>
          <Button as="a" href="https://github.com/lunarphp/lunar" target="_blank" mr="default" mb={['default', 0]} variant="light">
            GitHub
          </Button>
          <Button as="a" href="https://discord.com/invite/v6qVWmA" target="_blank" variant="light">
            Discord Community
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard; 