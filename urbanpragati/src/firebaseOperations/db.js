import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
export const createComplaint = async (complaintData) => {
  try {
    const dataWithTimestamp = {
      ...complaintData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: complaintData.status || "Pending",
    };
    const docRef = await addDoc(
      collection(db, "complaints"),
      dataWithTimestamp,
    );
    return { id: docRef.id, ...dataWithTimestamp };
  } catch (error) {
    throw error;
  }
};
export const getComplaintsByDepartment = async (department) => {
  try {
    const q = query(
      collection(db, "complaints"),
      where("department", "==", department),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};
export const getComplaintsByUser = async (userId) => {
  try {
    const q = query(
      collection(db, "complaints"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};
export const updateComplaintStatus = async (complaintId, status) => {
  try {
    const complaintRef = doc(db, "complaints", complaintId);
    await updateDoc(complaintRef, {
      status: status,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
export const getAllComplaints = async () => {
  try {
    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};
export const assignComplaintToWorker = async (complaintId, workerId) => {
  try {
    const complaintRef = doc(db, "complaints", complaintId);
    await updateDoc(complaintRef, {
      workerId: workerId,
      status: "Assigned",
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
export const approveComplaint = async (complaintId) => {
  try {
    const complaintRef = doc(db, "complaints", complaintId);
    await updateDoc(complaintRef, {
      status: "Approved",
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
export const createServiceRequest = async (serviceData) => {
  try {
    const dataWithTimestamp = {
      ...serviceData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: serviceData.status || "Pending",
    };
    const docRef = await addDoc(collection(db, "services"), dataWithTimestamp);
    return { id: docRef.id, ...dataWithTimestamp };
  } catch (error) {
    throw error;
  }
};
export const getServiceRequestsByDepartment = async (department) => {
  try {
    const q = query(
      collection(db, "services"),
      where("department", "==", department),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};
export const getServiceRequestsByUser = async (userId) => {
  try {
    const q = query(
      collection(db, "services"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};
export const updateServiceRequestStatus = async (serviceId, status) => {
  try {
    const serviceRef = doc(db, "services", serviceId);
    await updateDoc(serviceRef, {
      status: status,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
export const getAllFeedbacks = async () => {
  try {
    const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};
export const getTopCitizens = async () => {
  try {
    const q = query(collection(db, "citizens"), orderBy("points", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const getWorkersByDepartment = async (department) => {
  try {
    const q = query(collection(db, "workers"), where("department", "==", department));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const createNewDevelopment = async (devData) => {
  try {
    const dataWithTimestamp = {
      ...devData,
      createdAt: serverTimestamp(),
      interested_citizens: [],
      not_interested_citizens: [],
    };
    const docRef = await addDoc(collection(db, "new_developments"), dataWithTimestamp);
    return { id: docRef.id, ...dataWithTimestamp };
  } catch (error) {
    throw error;
  }
};

export const getAllDevelopments = async () => {
  try {
    const q = query(collection(db, "new_developments"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const voteDevelopment = async (devId, userId, voteType) => {
  try {
    const devRef = doc(db, "new_developments", devId);
    if (voteType === "interest") {
      await updateDoc(devRef, {
        interested_citizens: arrayUnion(userId),
        not_interested_citizens: arrayRemove(userId),
      });
    } else {
      await updateDoc(devRef, {
        not_interested_citizens: arrayUnion(userId),
        interested_citizens: arrayRemove(userId),
      });
    }
    return true;
  } catch (error) {
    throw error;
  }
};
