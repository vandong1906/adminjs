import React, { useState, useEffect } from 'react';
import { Box, H4, H5, Text, Loader, Illustration } from '@adminjs/design-system';
const DiscountStatistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                setLoading(true);
                const response = await fetch('/admin/api/discount-statistics');
                if (response.ok) {
                    const data = await response.json();
                    setStatistics(data);
                }
                else {
                    const errorData = await response.json();
                    setError(errorData.error || 'Failed to load discount statistics');
                }
            }
            catch (error) {
                console.error('Error fetching discount statistics:', error);
                setError('Failed to load discount statistics');
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
            React.createElement(Text, { mt: "default" }, "Loading discount statistics...")));
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
    const formatCurrency = (amount) => {
        return amount.toFixed(2);
    };
    return (React.createElement(Box, null,
        React.createElement(H4, { mb: "lg" }, "Discount Statistics"),
        React.createElement(Box, { display: "flex", flexDirection: ['column', 'row'], flexWrap: "wrap" },
            React.createElement(Box, { flex: 1, p: "lg", bg: "white", mr: "lg", mb: "lg", boxShadow: "card", width: [1, 1 / 3] },
                React.createElement(H5, { mb: "md" }, "Total Discounts"),
                React.createElement(Box, { display: "flex", justifyContent: "space-between" },
                    React.createElement(Text, { fontWeight: "bold", fontSize: "xl" }, statistics.totalDiscounts),
                    React.createElement(Illustration, { variant: "DocumentSearch", width: 40, height: 40 }))),
            React.createElement(Box, { flex: 1, p: "lg", bg: "white", mr: "lg", mb: "lg", boxShadow: "card", width: [1, 1 / 3] },
                React.createElement(H5, { mb: "md" }, "Active Discounts"),
                React.createElement(Box, { display: "flex", justifyContent: "space-between" },
                    React.createElement(Text, { fontWeight: "bold", fontSize: "xl" }, statistics.activeDiscounts),
                    React.createElement(Illustration, { variant: "DocumentCheck", width: 40, height: 40 }))),
            React.createElement(Box, { flex: 1, p: "lg", bg: "white", mb: "lg", boxShadow: "card", width: [1, 1 / 3] },
                React.createElement(H5, { mb: "md" }, "Total Discount Amount"),
                React.createElement(Box, { display: "flex", justifyContent: "space-between" },
                    React.createElement(Text, { fontWeight: "bold", fontSize: "xl" },
                        "$",
                        formatCurrency(statistics.totalDiscountAmount)),
                    React.createElement(Illustration, { variant: "Planet", width: 40, height: 40 })))),
        statistics.mostUsedDiscount && (React.createElement(Box, { p: "lg", bg: "white", boxShadow: "card", mt: "lg" },
            React.createElement(H5, { mb: "md" }, "Most Used Discount"),
            React.createElement(Box, { display: "flex", justifyContent: "space-between", alignItems: "center" },
                React.createElement(Box, null,
                    React.createElement(Text, { fontWeight: "bold" },
                        statistics.mostUsedDiscount.name,
                        " (",
                        statistics.mostUsedDiscount.code,
                        ")"),
                    React.createElement(Text, { mt: "sm" },
                        "Used ",
                        statistics.mostUsedDiscount.usedCount,
                        " times")),
                React.createElement(Box, { as: "a", href: `/admin/resources/Discount/records/${statistics.mostUsedDiscount.id}/show`, py: "sm", px: "lg", bg: "primary100", color: "white", borderRadius: "default", style: { textDecoration: 'none' } }, "View Details"))))));
};
export default DiscountStatistics;
