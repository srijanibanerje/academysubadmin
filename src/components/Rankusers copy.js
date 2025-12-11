/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from 'sweetalert'
import {
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from "@coreui/react";

const tableData = [
  { no: 1, name: "Class 1", minTeam: 0, minDirect: 3, minPoint: 1, maxPoint: 5000, reward: "Customized back cover" },
  { no: 2, name: "Class 2", minTeam: 50, minDirect: 10, minPoint: 5001, maxPoint: 15000, reward:"Dinner set"  },
  { no: 3, name: "Class 3", minTeam: 100, minDirect: 20, minPoint: 15001, maxPoint: 50000, reward: "Smart watch" },
  { no: 4, name: "Class 4", minTeam: 200, minDirect: 30, minPoint: 50001, maxPoint: 100000, reward: "Titan fastrack watch" },
  { no: 5, name: "Class 5", minTeam: 500, minDirect: 40, minPoint: 100001, maxPoint: 300000, reward: "Tab"},
  { no: 6, name: "Class 6", minTeam: 1000, minDirect: 50, minPoint: 300001, maxPoint: 600000, reward: "Premium android" },
  { no: 7, name: "Class 7", minTeam: 2000, minDirect: 60, minPoint: 600001, maxPoint: 1200000, reward: "iPad" },
  { no: 8, name: "Class 8", minTeam: 5000, minDirect: 70, minPoint: 1200001, maxPoint: 2500000, reward: "iPhone"  },
  { no: 9, name: "Class 9", minTeam: 10000, minDirect: 100, minPoint: 2500001, maxPoint: 5000000, reward: "Royal Enfield"  },
  { no: 10, name: "Class 10", minTeam: 20000, minDirect: 150, minPoint: 5000001, maxPoint: 10000000, reward:  "5 seater car"},
  { no: 11, name: "H.S.", minTeam: 40000, minDirect: 200, minPoint: 10000001, maxPoint: 25000000, reward:  "7 seater car" },
  { no: 12, name: "Graduate", minTeam: 80000, minDirect: 250, minPoint: 25000001, maxPoint: 50000000, reward: "Audi" },
  { no: 13, name: "Post Graduate", minTeam: 100000, minDirect: 300, minPoint: 50000001, maxPoint: 100000000, reward: "Mercedes" },
  { no: 14, name: "PhD", minTeam: 150000, minDirect: 500, minPoint: 100000001, maxPoint: 250000000, reward: "Range Rover" },
];

const getUserRank = (totalTeam, directTeam, points) => {
  let achievedRank = "No Rank";
  let reward = "-";

  for (let i = 0; i < tableData.length; i++) {
    const rank = tableData[i];

    if (points >= rank.minPoint) {
      if (totalTeam >= rank.minTeam && directTeam >= rank.minDirect) {
        achievedRank = rank.name;
        reward = rank.reward;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return { achievedRank, reward };
};

const Rankusers = () => {
  const [paidUsers, setPaidUsers] = useState([]);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const ROOT_URL = import.meta.env.VITE_LOCALHOST_URL

  // Fetch from API
  const handlePaid = async (userId, name, rankName) => {
  try {
    const res = await axios.post(`${ROOT_URL}/api/rank/save-rank`, {
      userId,
      name,
      rankName,
    });

    if (res.data.success) {
      swal("Success!",`Rank "${rankName}" saved successfully for ${name}!`,"success");
        if (res.data.success) {
      setPaidUsers((prev) => [...prev, userId]); // <-- Mark as paid
    }
      fetchUsers(); // refresh list
    }
  } catch (error) {
    console.error("Error saving rank:", error);
    swal("Opps!","Failed to update rank","error");
  }
};
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${ROOT_URL}/api/referral/team-summary/all`);
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading user ranks...</p>;

  return (
    <>
      <CCardHeader className="d-flex justify-content-between align-items-center mb-3">
        <h5>User Rank Summary</h5>
      </CCardHeader>

      <CTable responsive bordered hover>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell>S/N</CTableHeaderCell>
            <CTableHeaderCell>User ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Total Points</CTableHeaderCell>
            <CTableHeaderCell>Total Team</CTableHeaderCell>
            <CTableHeaderCell>Direct Team</CTableHeaderCell>
            <CTableHeaderCell>Rank</CTableHeaderCell>
            <CTableHeaderCell>Reward</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {users.map((user, index) => {
            const { achievedRank, reward } = getUserRank(
              user.totalDownlineCount,
              user.directReferrals,
              user.totalPoints
            );

            return (
              <CTableRow key={user.userId}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{user.userId}</CTableDataCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.totalPoints}</CTableDataCell>
                <CTableDataCell>{user.totalDownlineCount}</CTableDataCell>
                <CTableDataCell>{user.directReferrals}</CTableDataCell>
                <CTableDataCell>{achievedRank}</CTableDataCell>
                <CTableDataCell>{reward}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    color="success"
                    size="md"
                     disabled={paidUsers.includes(user.userId)}  
                    onClick={() =>
                      handlePaid(user.userId, user.name, achievedRank)
                    }
                  >
                    {paidUsers.includes(user.userId) ? "Paid" : "Paid"}
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            );
          })}
        </CTableBody>
      </CTable>
    </>
  );
};

export default Rankusers;
