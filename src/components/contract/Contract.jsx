import React, { useState, useEffect, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { jsPDF } from "jspdf";
import { BASE_URL } from "../config/config";
import './ContractSigning.css';
import logo from '../../assets/logo/enc_logo.png';

const ContractSigning = () => {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [viewContract, setViewContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const signatureRef = useRef();
  const authToken = localStorage.getItem("authToken");
  const [message, setMessage] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (message && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [message]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchContracts = async () => {
      setLoading(true);
      setMessage(null);
      try {
        if (!authToken) {
          setMessage({ text: "Authentication token not found. Please log in.", type: "danger" });
          setLoading(false);
          return;
        }

        const response = await fetch(`${BASE_URL}/api/auth/contract/`, {
          headers: { Authorization: `Token ${authToken}` },
          signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
          throw new Error(errorData.message || `Failed to fetch contracts: ${response.statusText}`);
        }

        const data = await response.json();
        const contractsArray = Array.isArray(data) ? data : [data];
        setContracts(contractsArray);

      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching contracts:", error);
          setMessage({ text: `Failed to load contracts: ${error.message || "Network error."}`, type: "danger" });
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
      setMessage({ text: "Please draw your signature before submitting.", type: "warning" });
      return;
    }

    const signatureData = signatureRef.current.toDataURL("image/png");
    setMessage(null);
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(errorData.message || `Failed to sign contract: ${response.statusText}`);
      }

      const signedContractData = await response.json();

      setContracts(prevContracts =>
        prevContracts.map(c =>
          c.id === contract.id ? {
            ...c,
            is_signed: true,
            signature: signedContractData.signature,
            signed_at: signedContractData.signed_at,
          } : c
        )
      );

      setMessage({ text: "Contract signed successfully!", type: "success" });
      setSelectedContract(null);
      signatureRef.current.clear();
    } catch (error) {
      console.error("Error signing contract:", error);
      setMessage({ text: `Error signing contract: ${error.message || "Please try again."}`, type: "danger" });
    }
  };

  const downloadPDF = (contract) => {
    if (!contract.content || typeof contract.content !== "string") {
      setMessage({ text: "Contract content is missing or invalid. Cannot generate PDF.", type: "danger" });
      return;
    }

    const doc = new jsPDF();
    let yPos = 20;

    const addHeader = (doc, pageNumber, title) => {
      let yStart = 20;
      if (pageNumber === 1) {
        const imgWidth = 50;
        const imgHeight = 15;
        const imgX = doc.internal.pageSize.getWidth() - imgWidth - 20;
        doc.addImage(logo, 'PNG', imgX, 10, imgWidth, imgHeight);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor("#4A90E2");
        doc.text(title, 20, 25);
        doc.setDrawColor("#4A90E2");
        doc.line(20, 35, doc.internal.pageSize.getWidth() - 20, 35);
        yStart = 45;
      } else {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor("#4A90E2");
        doc.text(`Contract Agreement (Cont.)`, 20, 20);
        doc.setDrawColor("#4A90E2");
        doc.line(20, 25, doc.internal.pageSize.getWidth() - 20, 25);
        yStart = 35;
      }
      doc.setFontSize(10);
      doc.setTextColor("#666666");
      doc.text(`Document ID: ${contract.id}`, 20, yStart - 5);
      const formattedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Africa/Nairobi'
      });
      doc.text(`Generated on: ${formattedDate}`, doc.internal.pageSize.getWidth() - 20, yStart - 5, { align: 'right' });
      return yStart + 10;
    };

    const addFooter = (doc, pageNumber) => {
      doc.setFontSize(10);
      doc.setTextColor("#666666");
      doc.text(`Page ${pageNumber}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
      const currentYear = new Date().getFullYear();
      const copyrightText = `© 2025 - ${currentYear} Enceptics. All rights reserved.`;
      doc.text(copyrightText, 20, doc.internal.pageSize.getHeight() - 10);
    };

    const addWatermark = (doc) => {
      doc.setFontSize(50);
      doc.setTextColor("#D3D3D3");
      doc.text("Enceptics", doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() / 2, {
        align: 'center',
        angle: 45
      });
    };

    addWatermark(doc);
    yPos = addHeader(doc, 1, "Contract Agreement");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor("#000000");

    try {
      const textLines = doc.splitTextToSize(contract.content, 170);
      textLines.forEach(line => {
        if (yPos > doc.internal.pageSize.getHeight() - 60) {
          doc.addPage();
          addWatermark(doc);
          const currentPageNumber = doc.internal.getNumberOfPages();
          yPos = addHeader(doc, currentPageNumber, "Contract Agreement");
          doc.setFont("helvetica", "normal");
          doc.setFontSize(12);
          doc.setTextColor("#000000");
        }
        doc.text(line, 20, yPos);
        yPos += 7;
      });
      yPos += 10;
    } catch (error) {
      console.error("Error adding text to PDF:", error);
      setMessage({ text: "Error generating PDF content. Please check the contract text.", type: "danger" });
      return;
    }

    if (contract.contract_image) {
      try {
        if (yPos > doc.internal.pageSize.getHeight() - 120) {
          doc.addPage();
          addWatermark(doc);
          const currentPageNumber = doc.internal.getNumberOfPages();
          yPos = addHeader(doc, currentPageNumber, "Contract Agreement");
          doc.setFont("helvetica", "normal");
          doc.setFontSize(12);
          doc.setTextColor("#000000");
        }
        doc.addImage(contract.contract_image, "JPEG", 20, yPos, 170, 100);
        yPos += 110;
      } catch (error) {
        console.error("Error adding contract image to PDF:", error);
        setMessage({ text: "Could not add contract image to PDF. Image format might be incorrect.", type: "warning" });
      }
    }

    if (contract.is_signed && contract.signature) {
      const { signature, signed_at } = contract;

      if (yPos > doc.internal.pageSize.getHeight() - 80) {
        doc.addPage();
        addWatermark(doc);
        const currentPageNumber = doc.internal.getNumberOfPages();
        yPos = addHeader(doc, currentPageNumber, "Contract Agreement");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor("#000000");
      }

      doc.setFont("helvetica", "bold");
      doc.text("Signature:", 20, yPos);
      yPos += 10;
      doc.addImage(signature, "PNG", 20, yPos, 100, 50);
      yPos += 60;

      doc.setFont("helvetica", "normal");
      const signedDate = new Date(signed_at);
      const signedDateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
        timeZone: 'Africa/Nairobi'
      };
      const formattedSignedDate = signedDate.toLocaleDateString('en-US', signedDateOptions);
      doc.text(`Signed on: ${formattedSignedDate}`, 20, yPos);
    } else {
      setMessage({ text: "No signature found for this contract. PDF will not include a signature.", type: "warning" });
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addFooter(doc, i);
    }

    doc.save(`Contract_${contract.full_name || contract.id}.pdf`);
    setMessage({ text: "PDF generated successfully!", type: "success" });
  };

  const handleViewContract = (contract) => {
    setViewContract(contract);
  };

  const handleCloseModal = () => {
    setViewContract(null);
  };

  return (
    <div className="contract-signing-container">
      <div className="contract-signing-card">
        <div className="contract-header">
          <h1 className="contract-title">
            Contract Signing Portal
          </h1>
          <p className="contract-subtitle">Review and sign your contracts securely</p>
        </div>

        <div ref={messagesEndRef} className="messages-container">
          {message && (
            <div className={`alert alert-${message.type}`}>
              <span>{message.text}</span>
              <button className="alert-close" onClick={() => setMessage(null)}>
                &times;
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading contracts...</p>
          </div>
        ) : (
          <div className="contracts-table-container">
            <table className="contracts-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Contract Title</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contracts.length > 0 ? (
                  contracts.map((contract) => {
                    const isSigned = contract.is_signed;
                    return (
                      <tr key={contract.id}>
                        <td className="contract-date">
                          {contract.signed_at_human_readable || 'N/A'}
                        </td>
                        <td className="contract-name">
                          {contract.full_name || `Contract ${contract.id}`}
                        </td>
                        <td className="text-center">
                          <span className={`status-badge ${isSigned ? "signed" : "unsigned"}`}>
                            {isSigned ? "Signed" : "Not Signed"}
                          </span>
                        </td>
                        <td className="contract-actions text-center">
                          <button
                            onClick={() => handleViewContract(contract)}
                            className="btn btn-view"
                          >
                            View
                          </button>
                          {isSigned ? (
                            <button
                              onClick={() => downloadPDF(contract)}
                              className="btn btn-download"
                            >
                              Download PDF
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedContract(contract)}
                              className="btn btn-sign"
                            >
                              Sign
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="no-contracts">
                      <div className="empty-state">
                        <div className="empty-icon">📄</div>
                        <h3>No contracts available</h3>
                        <p>You don't have any contracts to sign at this time.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Signature Section */}
        {selectedContract && !selectedContract.is_signed && (
          <div className="signature-section">
            <h2>Sign Contract: {selectedContract.full_name || `Contract ${selectedContract.id}`}</h2>
            <div className="contract-preview">
              <p>{selectedContract.content}</p>
              {selectedContract.contract_image && (
                <img src={selectedContract.contract_image} alt="Contract visual" />
              )}
            </div>
            <div className="signature-area">
              <p className="signature-label">Please draw your signature below:</p>
              <div className="signature-canvas-container">
                <SignatureCanvas
                  ref={signatureRef}
                  penColor="#6A0DAD"
                  canvasProps={{
                    className: "signature-canvas",
                  }}
                  minWidth={0.5}
                  maxWidth={2.5}
                  throttle={16}
                />
              </div>
              <p className="signature-help">Click and drag to sign. Click Clear to start over.</p>
              <div className="signature-controls">
                <button
                  onClick={() => signatureRef.current.clear()}
                  className="btn btn-clear"
                >
                  Clear Signature
                </button>
                <button
                  onClick={() => {
                    setSelectedContract(null);
                    signatureRef.current.clear();
                  }}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSignContract(selectedContract)}
                  className="btn btn-confirm"
                >
                  Agree & Sign
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Contract Modal */}
        {viewContract && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Contract Details: {viewContract.full_name || `Contract ${viewContract.id}`}</h2>
                <button className="modal-close" onClick={handleCloseModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="contract-content">
                  <p>{viewContract.content}</p>
                </div>
                {viewContract.contract_image && (
                  <img src={viewContract.contract_image} alt="Contract visual" className="contract-image" />
                )}
                {viewContract.is_signed && viewContract.signature && (
                  <div className="signature-display">
                    <h3>Signature</h3>
                    <img
                      src={viewContract.signature}
                      alt="Signed Signature"
                    />
                    <p className="signature-date">
                      Signed on: {new Date(viewContract.signed_at).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-close-modal"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractSigning;