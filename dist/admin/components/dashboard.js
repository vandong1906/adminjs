import React, { useEffect, useState } from 'react';
import { Box, H2, H5, Text, Illustration, H4, Button } from '@adminjs/design-system';
import CustomerStatistics from './customer-statistics.js';
const Dashboard = () => {
    const [data, setData] = useState({
        products: 0,
        orders: 0,
        customers: 0,
        revenue: 0,
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
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
            }
            catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);
    const formattedRevenue = typeof data.revenue === 'number'
        ? data.revenue.toFixed(2)
        : '0.00';
    return (React.createElement(Box, null,
        React.createElement(Box, { position: "relative", overflow: "hidden", bg: "white", mb: "xxl" },
            React.createElement(Box, { position: "absolute", top: -30, left: -30, opacity: 0.2 },
                React.createElement(Illustration, { variant: "Rocket", width: 200, height: 200 })),
            React.createElement(Box, { p: "xl", position: "relative", zIndex: 2 },
                React.createElement(H2, null, "Welcome to Your Lunar Ecommerce Admin"),
                React.createElement(Text, null, "Manage your products, orders, customers, and more."))),
        React.createElement(Box, { display: "flex", flexDirection: ['column', 'row'], mb: "xl" },
            React.createElement(Box, { flex: 1, p: "lg", bg: "white", mr: "lg", mb: "lg", boxShadow: "card", width: [1, 1 / 4], as: "a", href: "/admin/resources/Product", style: { textDecoration: 'none', borderRadius: '4px' } },
                React.createElement(H5, { mb: "md" }, "Products"),
                React.createElement(Box, { display: "flex", justifyContent: "space-between" },
                    React.createElement(H4, null, data.products),
                    React.createElement(Illustration, { variant: "DocumentCheck", width: 40, height: 40 }))),
            React.createElement(Box, { flex: 1, p: "lg", bg: "white", mr: "lg", mb: "lg", boxShadow: "card", width: [1, 1 / 4], as: "a", href: "/admin/resources/Order", style: { textDecoration: 'none', borderRadius: '4px' } },
                React.createElement(H5, { mb: "md" }, "Orders"),
                React.createElement(Box, { display: "flex", justifyContent: "space-between" },
                    React.createElement(H4, null, data.orders),
                    React.createElement(Illustration, { variant: "DocumentSearch", width: 40, height: 40 }))),
            React.createElement(Box, { flex: 1, p: "lg", bg: "white", mr: "lg", mb: "lg", boxShadow: "card", width: [1, 1 / 4], as: "a", href: "/admin/resources/Customer", style: { textDecoration: 'none', borderRadius: '4px' } },
                React.createElement(H5, { mb: "md" }, "Customers"),
                React.createElement(Box, { display: "flex", justifyContent: "space-between" },
                    React.createElement(H4, null, data.customers),
                    React.createElement(Illustration, { variant: "Moon", width: 40, height: 40 }))),
            React.createElement(Box, { flex: 1, p: "lg", bg: "white", mb: "lg", boxShadow: "card", width: [1, 1 / 4], as: "a", href: "/admin/resources/Order", style: { textDecoration: 'none', borderRadius: '4px' } },
                React.createElement(H5, { mb: "md" }, "Revenue"),
                React.createElement(Box, { display: "flex", justifyContent: "space-between" },
                    React.createElement(H4, null,
                        "$",
                        formattedRevenue),
                    React.createElement(Illustration, { variant: "Planet", width: 40, height: 40 })))),
        React.createElement(Box, { mb: "xl" },
            React.createElement(CustomerStatistics, null)),
        React.createElement(Box, { mb: "xl" },
            React.createElement(H5, { mb: "lg" }, "Quick Actions"),
            React.createElement(Box, { display: "flex", flexDirection: ['column', 'row'], flexWrap: "wrap" },
                React.createElement(Box, { p: "lg", bg: "white", mr: "lg", mb: "lg", boxShadow: "card", width: [1, 1 / 4], as: "a", href: "/admin/resources/Product/actions/new", style: { textDecoration: 'none', borderRadius: '4px' } },
                    React.createElement(Box, { p: "md", textAlign: "center" },
                        React.createElement(Illustration, { variant: "FileSearch", width: 40, height: 40 }),
                        React.createElement(Text, { fontWeight: "bold" }, "Add New Product"))),
                React.createElement(Box, { p: "lg", bg: "white", mr: "lg", mb: "lg", boxShadow: "card", width: [1, 1 / 4], as: "a", href: "/admin/resources/Customer/actions/new", style: { textDecoration: 'none', borderRadius: '4px' } },
                    React.createElement(Box, { p: "md", textAlign: "center" },
                        React.createElement(Illustration, { variant: "FlagInCog", width: 40, height: 40 }),
                        React.createElement(Text, { fontWeight: "bold" }, "Add New Customer"))),
                React.createElement(Box, { p: "lg", bg: "white", mr: "lg", mb: "lg", boxShadow: "card", width: [1, 1 / 4], as: "a", href: "/admin/resources/Discount/actions/new", style: { textDecoration: 'none', borderRadius: '4px' } },
                    React.createElement(Box, { p: "md", textAlign: "center" },
                        React.createElement(Illustration, { variant: "DocumentCheck", width: 40, height: 40 }),
                        React.createElement(Text, { fontWeight: "bold" }, "Create Discount"))),
                React.createElement(Box, { p: "lg", bg: "white", mb: "lg", boxShadow: "card", width: [1, 1 / 4], as: "a", href: "/admin/resources/Collection/actions/new", style: { textDecoration: 'none', borderRadius: '4px' } },
                    React.createElement(Box, { p: "md", textAlign: "center" },
                        React.createElement(Illustration, { variant: "Folders", width: 40, height: 40 }),
                        React.createElement(Text, { fontWeight: "bold" }, "Create Collection"))))),
        React.createElement(Box, { p: "xl", bg: "grey100", mt: "xl", boxShadow: "card", style: { borderRadius: '4px' } },
            React.createElement(H5, null, "Documentation & Resources"),
            React.createElement(Text, { mb: "lg" }, "Find more information about your ecommerce platform in the links below:"),
            React.createElement(Box, { display: "flex", flexDirection: ['column', 'row'] },
                React.createElement(Button, { as: "a", href: "https://docs.lunarphp.io/", target: "_blank", mr: "default", mb: ['default', 0] }, "Documentation"),
                React.createElement(Button, { as: "a", href: "https://github.com/lunarphp/lunar", target: "_blank", mr: "default", mb: ['default', 0], variant: "light" }, "GitHub"),
                React.createElement(Button, { as: "a", href: "https://discord.com/invite/v6qVWmA", target: "_blank", variant: "light" }, "Discord Community")))));
};
export default Dashboard;
