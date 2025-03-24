// import React from "react";
// import { Modal, Box, Typography, Avatar, Button, CircularProgress } from "@mui/material";
// import { profileDetailsQuery } from "@/customHooks/query/cms.query.createhooks";

// interface ProfileModalProps {
//   open: boolean;
//   onClose: () => void;
// }

// const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose }) => {
//   const { data: profile, isLoading, error } = profileDetailsQuery();

//   return (
//     <Modal open={open} onClose={onClose} aria-labelledby="profile-modal">
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 400,
//           bgcolor: "#ede7f6",
//           boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
//           p: 4,
//           borderRadius: 3,
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="h4" align="center" mb={2}>
//           Profile Details
//         </Typography>

//         {isLoading ? (
//           <CircularProgress />
//         ) : error ? (
//           <Typography color="error">Error loading profile details</Typography>
//         ) : (
//           <>
//             <Avatar
//               src={profile?.profile_pic || "/images/profile-placeholder.jpg"}
//               alt="Profile"
//               sx={{
//                 width: 120,
//                 height: 120,
//                 mx: "auto",
//                 mb: 2,
//                 border: "3px solid #000",
//                 boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
//               }}
//             />
//             <Typography variant="h6">First Name: {profile?.first_name}</Typography>
//             <Typography variant="h6">Last Name: {profile?.last_name}</Typography>
//             <Typography variant="body1" color="text.secondary">
//               Email: {profile?.email}
//             </Typography>

//             <Button onClick={onClose} sx={{ mt: 3 }} variant="contained" color="secondary">
//               Close
//             </Button>
//           </>
//         )}
//       </Box>
//     </Modal>
//   );
// };

// export default ProfileModal;
