/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const tableData = [
  { no: 1, name: "Class 1", minTeam: 0, minDirect: 3, minPoint: 1, maxPoint: 5000 },
  { no: 2, name: "Class 2", minTeam: 50, minDirect: 10, minPoint: 5001, maxPoint: 15000 },
  { no: 3, name: "Class 3", minTeam: 100, minDirect: 20, minPoint: 15001, maxPoint: 50000 },
  { no: 4, name: "Class 4", minTeam: 200, minDirect: 30, minPoint: 50001, maxPoint: 100000 },
  { no: 5, name: "Class 5", minTeam: 500, minDirect: 40, minPoint: 100001, maxPoint: 300000 },
  { no: 6, name: "Class 6", minTeam: 1000, minDirect: 50, minPoint: 300001, maxPoint: 600000 },
  { no: 7, name: "Class 7", minTeam: 2000, minDirect: 60, minPoint: 600001, maxPoint: 1200000 },
  { no: 8, name: "Class 8", minTeam: 5000, minDirect: 70, minPoint: 1200001, maxPoint: 2500000 },
  { no: 9, name: "Class 9", minTeam: 10000, minDirect: 100, minPoint: 2500001, maxPoint: 5000000 },
  { no: 10, name: "Class 10", minTeam: 20000, minDirect: 150, minPoint: 5000001, maxPoint: 10000000 },
  { no: 11, name: "H.S.", minTeam: 40000, minDirect: 200, minPoint: 10000001, maxPoint: 25000000 },
  { no: 12, name: "Graduate", minTeam: 80000, minDirect: 250, minPoint: 25000001, maxPoint: 50000000 },
  { no: 13, name: "Post Graduate", minTeam: 100000, minDirect: 300, minPoint: 50000001, maxPoint: 100000000 },
  { no: 14, name: "PhD", minTeam: 150000, minDirect: 500, minPoint: 100000001, maxPoint: 250000000 },
];

const getUserRank = (totalTeam, directTeam, points) => {
  let achievedRank = "No Rank";

  for (let i = 0; i < tableData.length; i++) {
    const rank = tableData[i];

    if (points >= rank.minPoint) {
      if (totalTeam >= rank.minTeam && directTeam >= rank.minDirect) {
        achievedRank = rank.name;
      } else break;
    } else break;
  }

  return achievedRank;
};

const Rankusers = () => {
  const ROOT_URL = import.meta.env.VITE_LOCALHOST_URL;
  const [status, setStatus] = useState("");
  const [processing, setProcessing] = useState(false);
  const [allRanks, setAllRanks] = useState([]);

  // 🔥 Fetch all saved ranks
  const fetchAllRanks = async () => {
    try {
      const res = await axios.get(`${ROOT_URL}/api/rank/all`);
      if (res.data.success) {
        console.log("Fetched all ranks:", res.data.data);
        setAllRanks(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching ranks:", error);
    }
  };

  // 🔥 Process all users → save rank → then fetch saved ranks
  const processRanksForAllUsers = async () => {
    setProcessing(true);
    setStatus("Fetching all users...");

    try {
      const res = await axios.get(`${ROOT_URL}/api/referral/team-summary/all`);
      if (!res.data.success) return;

      const users = res.data.data;
      setStatus(`Processing ${users.length} users...`);

      for (let i = 0; i < users.length; i++) {
        const user = users[i];

        const achievedRank = getUserRank(
          user.totalDownlineCount,
          user.directReferrals,
          user.totalPoints
        );

        // Skip if "No Rank"
        if (achievedRank === "No Rank") {
          setStatus(`Skipped: ${user.userId} (No Rank)`);
          continue;
        }

        const body = {
          userId: user.userId,
          name: user.name,
          rankName: achievedRank,
          totalTeam: user.totalDownlineCount,
          directTeam: user.directReferrals,
          points: user.totalPoints,
        };

        await axios.post(`${ROOT_URL}/api/rank/save-rank`, body);
        setStatus(`Saved rank for: ${user.userId} (${i + 1}/${users.length})`);
      }

      // swal("Success!", "All user ranks processed successfully!", "success");

      // 👇 Fetch all ranks AFTER saving
      await fetchAllRanks();

      setStatus("Completed");

    } catch (err) {
      console.error(err);
      swal("Error!", "Failed to process ranks", "error");
      setStatus("Error occurred");
    }

    setProcessing(false);
  };

  useEffect(() => {
    processRanksForAllUsers();
  }, []);

  return (
    <div className="p-4">
      {/* <h3>Processing User Ranks…</h3> */}
      {/* <p>{status}</p>

      {processing && <p>Please wait…</p>} */}

      {/* <hr /> */}

      <h4 className="mt-4">All Ranks</h4>

      <table className="table table-bordered table-hover mt-3">
        <thead className="table-light text-center">
          <tr>
            <th>S/N</th>
            <th>User ID</th>
            <th>Name</th>
          
            <th>Total Team</th>
            <th>Direct Team</th>
            <th>Points</th>
              <th>Rank</th>
              <th>Action</th>
          
          </tr>
        </thead>

       <tbody className="text-center">
  {allRanks.length > 0 ? (
    allRanks.map((rank, index) => {
      
      // Get pending rewards only
      const pendingRewards = rank.rewards.filter(r => r.status === "pending");

      // Extract rank names
      const pendingRankNames = pendingRewards.map(r => r.rankName).join(", ");

      return (
        <tr key={rank._id}>
          <td>{index + 1}</td>
          <td>{rank.userId}</td>
          <td>{rank.name}</td>

          <td>{rank.totalTeam}</td>
          <td>{rank.directTeam}</td>
          <td>{rank.points}</td>

          {/* SHOW ONLY PENDING RANKS */}
          <td className="fw-bold">
            {pendingRankNames || "No Rank"}
          </td>
          <td><button className="btn btn-success">Paid</button></td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="8">No rank records found.</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

export default Rankusers;
