import styles from "../../styles/BuyerProcess/AddConveyancer.module.css";
import { useState, useEffect } from "react";
import { ConveyancerModal } from "../Modals/Offer.modal";

export const AddConveyancer = ({ userType, transaction, id, userInformation, transactionContent }) => {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [buyerConveyancer, setBuyerConveyancer] = useState(null);
    const [sellerConveyancer, setSellerConveyancer] = useState(null);

    useEffect(() => {
        console.log("Transaction Content:", transactionContent[0]);
        if (transactionContent[0]?.conveyancer_buyer !== "") {
            fetchConveyancerDetails(transactionContent.convenyancer_buyer, "property_seeker");
        }
        if (transactionContent[0]?.conveyancer_seller !== "") {
            fetchConveyancerDetails(transactionContent.convenyancer_seller, "Real_estate_agent");
        }
    }, [transactionContent]);

    const handleBuyerButtonClick = () => {
        setShowModal(true);
    };

    const handleAgentButtonClick = () => {
        setShowModal2(true);
    };
    const fetchConveyancerDetails = async (conveyancerID, type) => {
        console.log("Fetching conveyancer details for ID:", conveyancerID);
        try {
            const response = await fetch(`https://nutlip-backend.onrender.com/api/users/${conveyancerID}`);
            console.log("Fetch response:", response);
            if (response.ok) {
                const data = await response.json();
                if (type === "property_seeker") {
                    setBuyerConveyancer(data.data[0]);
                } else {
                    setSellerConveyancer(data.data[0]);
                }
                console.log("Fetched conveyancer details:", data.data[0]);
                console.log("seller conveyancer", sellerConveyancer)
                console.log("buyer conveynacer", buyerConveyancer)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addSellerConveyancer = async (conveyancerID) => {
        try {
            const response = await fetch("https://nutlip-backend.onrender.com/api/transaction/transaction_selleraddconveyancer_03", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: id,
                    userId: conveyancerID,
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Seller conveyancer added successfully", data);
                setShowModal2(false); // Close the modal
                await fetchConveyancerDetails(conveyancerID, "Real_estate_agent");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addBuyerConveyancer = async (conveyancerID) => {
        try {
            const response = await fetch("https://nutlip-backend.onrender.com/api/transaction/transaction_buyerconveyancer_04", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: id,
                    userid: conveyancerID,
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setShowModal(false); // Close the modal
                await fetchConveyancerDetails(conveyancerID, "property_seeker");
            }
        } catch (error) {
            console.log(' error:', error);
        }
    };


    return (
        <div className={styles.container}>
            {showModal && <ConveyancerModal addBuyerConveyancer={addBuyerConveyancer} userType={userType} addSellerConveyancer={addSellerConveyancer} handler={() => setShowModal(false)} />}
            {showModal2 && <ConveyancerModal addSellerConveyancer={addSellerConveyancer} userType={userType} addBuyerConveyancer={addBuyerConveyancer} handler={() => setShowModal2(false)} />}
            <div className={styles.Header}>
                <h2>Add Conveyancer</h2>
                <p>As your offer has been accepted, please invite a Conveyancer of your choice to become part of the transaction as your representative for a seamless process to completion.</p>
            </div>

            <section className={styles.conveyancerInvite}>
                <div className={styles.conveyancer}>
                    <div className={styles.SubHeader}>
                        <h3>Buyer Conveyancer</h3>
                        <p>Add your conveyancer by sending them an invite</p>
                    </div>
                    <hr />
                    {!buyerConveyancer ? (
                        <button
                            className={`${styles.conveyancerButton} ${userType !== "property_seeker" && styles.disabled}`}
                            onClick={handleBuyerButtonClick}
                            disabled={userType !== "property_seeker"}
                        >
                            Invite Conveyancer
                        </button>
                    ) : (
                        <span className={styles.conveyancerDetails}>
                            <h4>Conveyancer details</h4>
                            <p>Name: {buyerConveyancer.username || 'N/A'}</p>
                            <p>Agent ID: {buyerConveyancer.id ? buyerConveyancer.id.slice(0, 5) : 'N/A'}</p>
                        </span>
                    )}
                </div>
                <hr />
                <div className={styles.conveyancer}>
                    <div className={styles.SubHeader}>
                        <h3>Agent Conveyancer</h3>
                        <p>Add your conveyancer by sending them an invite</p>
                    </div>
                    <hr />
                    {!sellerConveyancer ? (
                        <button
                            className={`${styles.conveyancerButton} ${userType !== "Real_estate_agent" && styles.disabled}`}
                            onClick={handleAgentButtonClick}
                            disabled={userType !== "Real_estate_agent"}
                        >
                            Invite Conveyancer
                        </button>
                    ) : (
                        <span className={styles.conveyancerDetails}>
                            <h4>Conveyancer details</h4>
                            <p>Name: {sellerConveyancer.username || 'N/A'}</p>
                            <p>Agent ID: {sellerConveyancer._id ? sellerConveyancer._id.slice(0, 5) : 'N/A'}</p>
                        </span>
                    )}
                </div>
            </section>
        </div>
    );
};
