import Image from 'next/image'
import styles from "../../styles/BuyerProcess/Contract.module.css"
import { useContext, useEffect, useState } from 'react';
import { ImageContext } from '../../context/ImageContext.context';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';



export const Contract = ({ userType, transaction, id, transactionContent }) => {
    const [uploading, setUploading] = useState(false);
    const { url, setUrl } = useContext(ImageContext);
    const [fileUrl, setFileUrl] = useState('');
    const [upload, setupload] = useState(false);
    const [receiveFile, setReceiveFile] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                setUploading(true);
            },
            (error) => {
                console.error(error);
                setUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFileUrl(downloadURL);
                    setUrl(downloadURL); // Store the URL in context
                    console.log('File available at:', downloadURL);
                    setUploading(false);
                });
            }
        );
    };

    const HandleSubmitSeller = async () => {
        try {
            const response = await fetch(`https://nutlip-backend.onrender.com/api/transaction/transaction_contractupload_06_seller`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: id,
                    content: fileUrl, // Use the fileUrl instead of url
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Successfully uploaded message
            }
        } catch (error) {
            console.error('Error submitting contract upload:', error);
        }
    };
    const HandleSubmitBuyer = async () => {
        try {
            const response = await fetch(`https://nutlip-backend.onrender.com/api/transaction/transaction_contractupload_06_buyer`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: id,
                    content: fileUrl, // Use the fileUrl instead of url
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Successfully uploaded message
            }
        } catch (error) {
            console.error('Error submitting contract upload:', error);
        }
    };


    const HandleConfirm = async () => {
        try {
            const response = await fetch(`https://nutlip-backend.onrender.com/api/transaction/transaction_contractupload_06_seller_confirms`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                console.log("successfullly confirmed")// Successfully Confirmed message
            }
        } catch (error) {
            console.error('Error Confirming contract upload:', error);
        }
    }

    return (
        <div className={styles.offer}>
            <section className={styles.text}>
                <h2>Contract Upload</h2>
                {userType === "buyer" && <p>Your representative has confirmed receipt of the Contract document from the Seller for the sale of the real estate property. Please view the Contract document attached below</p>}
                {userType === "agent" && <p>Your representative has sent over the Contract document for the sale of this real estate property. Please view the Contract document attached below.</p>}
                {userType === "property_seeker" && <p>It is now the Exhange of Contract process. The Agent/Seller Conveyancer has sent over the Contract. Please go through the Contract and if satisfied,  sign and send a copy back to the Seller/Agent Conveyancer.</p>}
                {userType === "Real_estate_agent" && <p>{"It is now the Exchange of Contract process. Please upload the Contract for the Sale of the Real Estate Property to the Buyer's Conveyancer. "}</p>}
            </section>

            {userType === "buyer" || userType == "agent" && (
                <div className={styles.fileContainer}>
                    <section id={styles.file_upload}>
                        <label>
                            {transactionContent?.contract_upload_unsigned_seller
                                &&
                                <img src={transactionContent?.contract_upload_unsigned_seller
                                } width={250} height={200} alt="Uploaded document" />
                            }
                        </label>
                    </section>

                    <div className={styles.buttonContainer}>
                        <a href={receiveFile} download className={styles.download}><em>Download Contract</em></a>
                    </div>
                </div>
            )}

            {userType === "property_seeker" && (
                <div className={styles.fileContainer}>
                    <section id={styles.file_upload}>
                        <label>
                            {transactionContent?.contract_upload_unsigned_seller
                                &&
                                <img src={transactionContent?.contract_upload_unsigned_seller || receiveFile} width={250} height={200} alt="Uploaded document" />
                            }
                        </label>
                    </section>

                    {transactionContent.contract_upload_unsigned_seller && <button style={{
                        background: "green"
                    }} className={styles.fileuploadButton}>Received</button>}


                    <div className={styles.buttonContainer}>
                        <a href={transactionContent?.contract_upload_unsigned_seller
                        } download className={styles.download}><em>Download Contract</em></a>
                        <button onClick={() => setupload(!upload)} className={styles.download}>Upload Document</button>
                    </div>



                    {!transactionContent.contract_upload_signed_buyer && <section id={styles.file_upload}>
                        <label>
                            {fileUrl ? (
                                <img src={fileUrl} width={250} height={200} alt="Uploaded document" />
                            ) : (
                                <p>Upload Document</p>
                            )}
                            <input type="file" onChange={handleImageChange} disabled={uploading} />
                        </label>
                        {uploading && <p>Uploading...</p>}
                    </section>
                    }

                    {
                        transactionContent.contract_upload_signed_buyer && <section id={styles.file_upload}>
                            <label>
                                {transactionContent?.contract_upload_signed_buyer &&
                                    <img src={transactionContent?.contract_upload_signed_buyer} width={250} height={200} alt="Uploaded document" />
                                }
                            </label>
                        </section>
                    }

                    {transactionContent.contract_upload_signed_seller_confirmed_date && <button style={{ background: "green" }} className={styles.fileuploadButton}>Confirmed</button>}


                    {fileUrl && <button onClick={HandleSubmitBuyer} style={transactionContent?.contract_upload_signed_buyer ? { background: "green" } : null} className={styles.fileuploadButton}>{transactionContent?.contract_upload_signed_buyer ? <p>Sent!</p> : <p>Send</p>}</button>}
                </div>
            )}


            {userType === "Real_estate_agent" && (
                <div className={styles.fileContainer}>
                    <section id={styles.file_upload}>
                        <label>
                            {transactionContent?.contract_upload_signed_buyer &&
                                <img src={transactionContent?.contract_upload_signed_buyer} width={250} height={200} alt="Uploaded document" />
                            }
                        </label>

                        {transactionContent?.contract_upload_signed_buyer && <button onClick={HandleConfirm} style={transactionContent.contract_upload_signed_seller_confirmed_date ? { display: "none" } : null} className={styles.fileuploadButton}> <p>Confirm</p></button>}
                        {transactionContent.contract_upload_signed_seller_confirmed_date && <button style={{ background: "green" }} className={styles.fileuploadButton}>Confirmed</button>}


                        <div className={styles.buttonContainer}>
                            <a href={receiveFile} download className={styles.download}><em>Download Contract</em></a>
                            <button onClick={() => setupload(!upload)} className={styles.download}>Upload Document</button>
                        </div>
                    </section>





                    {!transactionContent.contract_upload_unsigned_seller && (<section id={styles.file_upload}>
                        <label>
                            {fileUrl ? (
                                <img src={fileUrl} width={250} height={200} alt="Uploaded document" />
                            ) : (
                                <p>Upload Document</p>
                            )}
                            <input type="file" onChange={handleImageChange} disabled={uploading} />
                        </label>
                        {uploading && <p>Uploading...</p>}
                        {fileUrl && <button onClick={HandleSubmitSeller} className={styles.fileuploadButton}>send</button>}
                    </section>)
                    }

                    {
                        transactionContent.contract_upload_unsigned_seller && <section id={styles.file_upload}>
                            <label>
                                {transactionContent?.contract_upload_unsigned_seller &&
                                    <img src={transactionContent?.contract_upload_unsigned_seller} width={250} height={200} alt="Uploaded document" />
                                }
                            </label>


                            <button style={{ background: "green" }} className={styles.fileuploadButton}> Sent </button>
                        </section>
                    }


                </div>
            )}
        </div>
    )
}