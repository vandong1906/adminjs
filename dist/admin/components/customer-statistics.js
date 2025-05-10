import React, { useState, useEffect } from 'react';
import { Box, H4, H5, Text, Loader, Illustration } from '@adminjs/design-system';
const CustomerStatistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                setLoading(true);
                const response = await fetch('/admin/api/customer-statistics');
                if (response.ok) {
                    const data = await response.json();
                    setStatistics(data);
                }
                else {
                    const errorData = await response.json();
                    setError(errorData.error || 'Failed to load customer statistics');
                }
            }
            catch (error) {
                console.error('Error fetching customer statistics:', error);
                setError('Failed to load customer statistics');
            }
            finally {
                setLoading(false);
            }
        };
        fetchStatistics();
    }, []);
    if (loading) {
        return (React.createElement(Box, { p: "xl", textAlign: "center" },
            React.createElement(Loader, null),
            React.createElement(Text, { mt: "default" }, "Loading customer statistics...")));
    }
    if (error) {
        return (React.createElement(Box, { p: "xl", textAlign: "center" },
            React.createElement(Illustration, { variant: "Rocket", width: 100, height: 100 }),
            React.createElement(Text, { mt: "default" }, error)));
    }
    if (!statistics) {
        return (React.createElement(Box, { p: "xl", textAlign: "center" },
            React.createElement(Text, null, "No statistics available")));
    }
    return (React.createElement(Box, null,
        React.createElement(H4, { mb: "lg" }, "Customer Statistics"),
        React.createElement(Box, { display: "flex", flexDirection: ['column', 'row'], flexWrap: "wrap" },
            React.createElement(Box, { flex: 1, p: "lg", bg: "white", mr: "lg", mb: "lg", boxShadow: "card", width: [1, 1 / 3] },
                React.createElement(H5, { mb: "md" }, "Total Customers"),
                React.createElement(Box, { display: "flex", justifyContent: "space-between" },
                    React.createElement(Text, { fontWeight: "bold", fontSize: "xl" }, statistics.totalCustomers),
                    React.createElement(Illustration, { variant: "Moon", width: 40, height: 40 }))),
            React.createElement(Box, { flex: 1, p: "lg", bg: "white", mr: "lg", mb: "lg", boxShadow: "card", width: [1, 1 / 3] },
                React.createElement(H5, { mb: "md" }, "New Customers (30 days)"),
                React.createElement(Box, { display: "flex", justifyContent: "space-between" },
                    React.createElement(Text, { fontWeight: "bold", fontSize: "xl" }, statistics.newCustomers),
                    React.createElement(Illustration, { variant: "DocumentCheck", width: 40, height: 40 }))),
            React.createElement(Box, { flex: 1, p: "lg", bg: "white", mb: "lg", boxShadow: "card", width: [1, 1 / 3] },
                React.createElement(H5, { mb: "md" }, "Top Customer"),
                statistics.topCustomer ? (React.createElement(Box, { display: "flex", justifyContent: "space-between" },
                    React.createElement(Box, null,
                        React.createElement(Text, { fontWeight: "bold" }, statistics.topCustomer.name),
                        React.createElement(Text, null,
                            statistics.topCustomer.orderCount,
                            " orders")),
                    React.createElement(Illustration, { variant: "FlagInCog", width: 40, height: 40 }))) : (React.createElement(Text, null, "No orders yet")))),
        statistics.customersByGroup.length > 0 && (React.createElement(Box, null,
            React.createElement(H5, { mb: "md" }, "Customers by Group"),
            React.createElement(Box, { bg: "white", p: "lg", boxShadow: "card" }, statistics.customersByGroup.map(group => (React.createElement(Box, { key: group.id, display: "flex", justifyContent: "space-between", p: "md", borderBottom: "1px solid", borderColor: "grey20" },
                React.createElement(Text, null, group.name),
                React.createElement(Text, { fontWeight: "bold" }, group.count)))))))));
};
export default CustomerStatistics;
