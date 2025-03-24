// import React from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   IconButton,
//   Avatar,
//   CircularProgress,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { profilemodalProps } from "@/typeScript/cms.interface";
// import { profileDetailsQuery } from "@/customHooks/query/cms.query.createhooks";
// import { useUserStore } from "@/toolkit/store/store";

// const ProfileModal: React.FC<profilemodalProps> = ({ isOpen, onClose }) => {
//   const {
//     data,
//     isPending: isPendingCategories,
//     isError: isErrorCategories,
//   } = profileDetailsQuery();
// const {user}=useUserStore();
//   return (
//     <Modal
//       open={isOpen}
//       onClose={onClose}
//       aria-labelledby="profile-modal-title"
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 400,
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 2,
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Typography id="profile-modal-title" variant="h6" component="h2">
//             <strong>Profile Details</strong>
//           </Typography>
//           <IconButton onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         {isPendingCategories ? (
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : isErrorCategories ? (
//           <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
//             Error fetching profile details.
//           </Typography>
//         ) : (
//           data && (
//             <Box sx={{ textAlign: "center", mt: 4 }}>
//               <Avatar
//                 src={`https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/${data.profile_pic}` }
//                 alt="existing"
//                 sx={{
//                   width: 120,
//                   height: 120,
//                   mx: "auto",
//                   mb: 2,
//                   border: "3px solid #1976d2",
//                 }}
//               />
//               <Typography variant="h6">
//                 <strong>First Name:</strong> {data.first_name}
//               </Typography>
//               <Typography variant="h6">
//                 {" "}
//                 <strong>Last Name: </strong>
//                 {data.last_name}{" "}
//               </Typography>
//               <Typography>
//                 <strong>Email: </strong>
//                 {data.email}
//               </Typography>
//             </Box>
//           )
//         )}
//       </Box>
//     </Modal>
//   );
// };

// export default ProfileModal;


import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { profilemodalProps } from "@/typeScript/cms.interface";
import { profileDetailsQuery } from "@/customHooks/query/cms.query.createhooks";
// import { useUserStore } from "@/toolkit/store/store";

const ProfileModal: React.FC<profilemodalProps> = ({ isOpen, onClose }) => {
  const {
    data,
    isPending: isPendingCategories,
    isError: isErrorCategories,
  } = profileDetailsQuery();

  // const { user, setUser } = useUserStore(); // Ensure setUser is available

  // Debugging: Check API Response
  // console.log("Profile Data from API:", data);
  // console.log("User from Zustand Store:", user);

  // Update Zustand store when data is fetched
  // React.useEffect(() => {
  //   if (data && !isPendingCategories) {
  //     setUser({
  //       first_name: data.first_name,
  //       last_name: data.last_name,
  //       email: data.email,
  //       profile_pic: data.profile_pic,
  //     });
  //   }
  // }, [data, isPendingCategories, setUser]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="profile-modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography id="profile-modal-title" variant="h6" component="h2">
            <strong>Profile Details</strong>
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {isPendingCategories ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : isErrorCategories ? (
          <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
            Error fetching profile details.
          </Typography>
        ) : (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Avatar
              src={
                data?.profile_pic
                  ? `https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/${data.profile_pic}`
                  : "/default-avatar.png"
              }
              alt="User Avatar"
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                border: "3px solid #1976d2",
              }}
            />
            <Typography variant="h6">
              <strong>First Name:</strong> {data?.first_name || "N/A"}
            </Typography>
            <Typography variant="h6">
              <strong>Last Name: </strong>
              {data?.last_name || "N/A"}
            </Typography>
            <Typography>
              <strong>Email: </strong>
              {data?.email  || "N/A"}
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ProfileModal;

