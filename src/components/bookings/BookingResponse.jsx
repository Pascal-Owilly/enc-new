import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PesapalPaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const orderTrackingId = searchParams.get("OrderTrackingId");
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactionStatus = async () => {
            if (!orderTrackingId) return;
            
            try {
                const response = await axios.get(
                    `/api/transactions/status?OrderTrackingId=${orderTrackingId}`
                );
                setStatus(response.data);
            } catch (error) {
                console.error("Error fetching transaction status:", error);
                setStatus({ error: "Failed to retrieve transaction status." });
            }
            setLoading(false);
        };
        
        fetchTransactionStatus();
    }, [orderTrackingId]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Pesapal Payment Status</h2>
                {loading ? (
                    <p className="text-gray-600">Checking payment status...</p>
                ) : status?.error ? (
                    <p className="text-red-600">{status.error}</p>
                ) : (
                    <div>
                        <p><strong>Transaction ID:</strong> {status?.orderTrackingId}</p>
                        <p><strong>Status:</strong> {status?.status}</p>
                        <p><strong>Amount:</strong> {status?.amount} KES</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PesapalPaymentStatus;
