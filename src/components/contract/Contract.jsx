import React, { useState, useEffect, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { jsPDF } from "jspdf";
import { BASE_URL } from "../config/config";

const ContractSigning = () => {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [signedContracts, setSignedContracts] = useState({});
  const [viewContract, setViewContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const signatureRef = useRef();
  const authToken = localStorage.getItem("authToken");
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchContracts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/auth/contract/`, {
          headers: { Authorization: `Token ${authToken}` },
          signal,
        });

        if (!response.ok) throw new Error("Failed to fetch contracts");

        const data = await response.json();
        console.log("Fetched contracts:", data);

        const contractsArray = Array.isArray(data) ? data : [data];
        setContracts(contractsArray);

        const signedContractsData = {};
        const signedResponses = await Promise.all(
          contractsArray.map(async (contract) => {
            const res = await fetch(`${BASE_URL}/api/auth/contract/signed/${contract.id}/`, {
              headers: { Authorization: `Token ${authToken}` },
              signal,
            });
            return res.ok ? res.json() : null;
          })
        );

        contractsArray.forEach((contract, index) => {
          if (signedResponses[index]) {
            signedContractsData[String(contract.id)] = {
              signature: signedResponses[index].signature,
              signed_at: signedResponses[index].signed_at,
            };
          }
        });

        console.log("Signed Contracts Data:", signedContractsData);
        setSignedContracts(signedContractsData);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching contracts:", error);
          setMessage({ text: "Error fetching contracts.", type: "error" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();

    return () => controller.abort();
  }, [authToken]);

  const handleSignContract = async (contract) => {
    if (signatureRef.current.isEmpty()) {
      setMessage({ text: "Please sign the contract before submitting.", type: "warning" });
      return;
    }

    const signatureData = signatureRef.current.toDataURL("image/png");

    try {
      const response = await fetch(`${BASE_URL}/api/auth/contract/sign/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({
          contract_id: contract.id,
          signature: signatureData,
          signed_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to sign contract");

      setSignedContracts((prev) => ({
        ...prev,
        [contract.id]: {
          signature: signatureData,
          signed_at: new Date().toISOString(),
        },
      }));

      setMessage({ text: "Contract signed successfully!", type: "success" });
      setSelectedContract(null);
    } catch (error) {
      console.error("Error signing contract:", error);
      setMessage({ text: "Error signing contract.", type: "error" });
    }
  };

const downloadPDF = (contract) => {
    console.log("Downloading contract:", contract);

    if (!contract.content || typeof contract.content !== "string") {
        alert("Contract text is missing or invalid.");
        return;
    }

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Contract Agreement", 20, 20);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    try {
        const textLines = doc.splitTextToSize(contract.content, 170);
        doc.text(textLines, 20, 30);
    } catch (error) {
        console.error("Error adding text to PDF:", error);
        alert("Error generating PDF. Please check the contract text.");
        return;
    }

    // Add the contract image if available
    if (contract.contract_image) {
        const imgData = contract.contract_image; // Ensure this is the correct URL or base64 string
        doc.addImage(imgData, "JPEG", 20, 100, 170, 100); // Adjust width and height as needed
    }

    if (signedContracts[contract.id]?.signature) {
        const { signature, signed_at } = signedContracts[contract.id];
        
        doc.setFont("helvetica", "bold");
        doc.text("Signature:", 20, 210);
        doc.addImage(signature, "PNG", 20, 220, 100, 50);
        
        doc.setFont("helvetica", "normal");
        doc.text(`Signed on: ${new Date(signed_at).toLocaleDateString()}`, 20, 280);
    }

    doc.save(`Contract_${contract.id}.pdf`);
};

  const handleViewContract = (contract) => {
    setViewContract(contract);
  };

  const handleCloseModal = () => {
    setViewContract(null);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-3xl">
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center my-4 text-dark">
    Contract Signing
</h1>      <hr />
      {loading && <p>Loading contracts...</p>}
      {message.text && (
        <div
          className={`p-3 mb-4 rounded-md text-dark ${
            message.type === "success" ? "bg-green-500" :
            message.type === "error" ? "bg-red-500" :
            "bg-yellow-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="overflow-auto max-h-96">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Date Signed</th>
              <th className="border p-2">Contract</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.length > 0 ? (
              contracts.map((contract) => (
                <tr key={contract.id} className="border">
                  <td className="p-2">{contract.signed_at_human_readable}</td>
                  <td className="p-2" style={{ textTransform: 'capitalize' }}>{contract.full_name}</td>
                  <td
                    className="p-2 text-center font-semibold"
                    style={{ color: contract.is_signed ? "#16A34A" : "#DC2626" }}
                  >
                    {contract.is_signed ? "Signed" : "Not Signed"}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleViewContract(contract)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                    >
                      View
                    </button>
                    {contract.is_signed ? (
                      <button
                        onClick={() => downloadPDF(contract)}
                        className="bg-green-600 text-white px-3 mx-2 py-1 rounded-md hover:bg-green-700 ml-2"
                      >
                        Download PDF
                      </button> 
                    ) : (
                      <button
                        onClick={() => setSelectedContract(contract)}
                        className="bg-blue-600 text-white px-3 mx-2 py-1 rounded-md hover:bg-blue-700 ml-2"
                      >
                        Sign
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No contracts available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedContract && !signedContracts[selectedContract.id] && (
        <div className="mt-6 p-4 border rounded-lg ">
          <h2 className="text-sm font-semibold">Sign Contract</h2>
          <p className="mt-2">{selectedContract.content}</p>

          <div className="mt-4">
            <p className="font-semibold">Signature:</p>
            <div className="border bg-white rounded-md p-2 w-full max-w-lg mx-auto">
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  className: "w-full h-24 sm:h-32 md:h-40 max-h-[200px] min-h-[80px]",
                }}
              />
            </div>
          </div>

          {message.text && (
            <div
              className={`p-3 mb-4 rounded-md text-dark ${
                message.type === "success" ? "bg-green-500" :
                message.type === "error" ? "bg-red-500" :
                "bg-yellow-500"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setSelectedContract(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSignContract(selectedContract)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Agree & Sign
            </button>
          </div>
        </div>
      )}

      {viewContract && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Contract Details</h2>
            <p>{viewContract.content}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractSigning;