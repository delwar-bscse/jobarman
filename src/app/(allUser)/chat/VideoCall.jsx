// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable react-hooks/exhaustive-deps */

// "use client";

// import { useState, useEffect, useRef } from "react";
// import Peer from "simple-peer";
// // import io from "socket.io-client";

// // Initialize socket connection (replace with your signaling server URL)
// // const socket = io("http://localhost:3001");

// const VideoCall = ({ selectedUser, onClose }) => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [isCallActive, setIsCallActive] = useState(false);
//   const [callTime, setCallTime] = useState(0);
//   const [error, setError] = useState(null);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerRef = useRef(null);
//   const timerRef = useRef(null);

//   // Initialize media stream
//   useEffect(() => {
//     const initMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         setLocalStream(stream);
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         setError("Failed to access camera or microphone: " + err.message);
//       }
//     };
//     initMedia();

//     return () => {
//       if (localStream) {
//         localStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   // Handle WebRTC peer connection and timer
//   useEffect(() => {
//     if (!localStream || !selectedUser) return;

//     // Initialize Peer
//     peerRef.current = new Peer({
//       initiator: true,
//       trickle: false,
//       stream: localStream,
//     });

//     // Send signaling data to the other user
//     peerRef.current.on("signal", (data) => {
//       socket.emit("call-user", {
//         userId: selectedUser.id,
//         signalData: data,
//       });
//     });

//     // Receive remote stream
//     peerRef.current.on("stream", (stream) => {
//       setRemoteStream(stream);
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = stream;
//       }
//       setIsCallActive(true);
//       startTimer();
//     });

//     // Handle errors
//     peerRef.current.on("error", (err) => {
//       setError("Video call error: " + err.message);
//     });

//     // Handle incoming signal data
//     socket.on("call-accepted", (data) => {
//       peerRef.current.signal(data.signalData);
//     });

//     // Handle call rejection or end
//     socket.on("call-ended", () => {
//       endCall();
//     });

//     return () => {
//       socket.off("call-accepted");
//       socket.off("call-ended");
//       if (peerRef.current) {
//         peerRef.current.destroy();
//       }
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, [localStream, selectedUser]);

//   // Handle incoming calls
//   useEffect(() => {
//     socket.on("incoming-call", (data) => {
//       if (!localStream) return;
//       peerRef.current = new Peer({
//         initiator: false,
//         trickle: false,
//         stream: localStream,
//       });

//       peerRef.current.on("signal", (signalData) => {
//         socket.emit("accept-call", { userId: data.userId, signalData });
//       });

//       peerRef.current.on("stream", (stream) => {
//         setRemoteStream(stream);
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = stream;
//         }
//         setIsCallActive(true);
//         startTimer();
//       });

//       peerRef.current.on("error", (err) => {
//         setError("Video call error: " + err.message);
//       });

//       peerRef.current.signal(data.signalData);
//     });

//     return () => {
//       socket.off("incoming-call");
//     };
//   }, [localStream]);

//   // Start call timer
//   const startTimer = () => {
//     if (timerRef.current) clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setCallTime((prev) => prev + 1);
//     }, 1000);
//   };

//   // Format time as HH:MM:SS
//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, "0")}:${mins
//       .toString()
//       .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   // End the call
//   const endCall = () => {
//     if (localStream) {
//       localStream.getTracks().forEach((track) => track.stop());
//     }
//     if (peerRef.current) {
//       peerRef.current.destroy();
//     }
//     socket.emit("end-call", { userId: selectedUser.id });
//     setLocalStream(null);
//     setRemoteStream(null);
//     setIsCallActive(false);
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       setCallTime(0);
//     }
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-gray-800 rounded-lg p-2 w-full max-w-4xl overflow-hidden border border-gray-700 shadow-lg">
//         {/* Header */}
//         <div className="flex justify-between items-center p-2 bg-gray-900 text-white rounded-t-lg">
//           <div className="flex items-center">
//             <img
//               src={selectedUser?.avatar || "https://via.placeholder.com/40"}
//               alt={selectedUser?.name || "User"}
//               className="w-8 h-8 rounded-full mr-2"
//             />
//             <span className="text-sm font-medium">
//               {selectedUser?.name || "User"}
//             </span>
//             <span className="text-xs text-green-400 ml-2">Online</span>
//           </div>
//         </div>

//         {/* Video Feed */}
//         <div className="relative w-full h-[70vh]">
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             className="w-full h-full object-cover rounded-lg"
//           />
//           <div className="absolute inset-0 bg-blur bg-gray-900 opacity-50"></div>
//           {localStream && (
//             <video
//               ref={localVideoRef}
//               autoPlay
//               muted
//               className="absolute bottom-4 right-4 w-1/4 h-auto rounded-lg border-2 border-gray-700"
//             />
//           )}
//         </div>

//         {/* Timer and Controls */}
//         <div className="flex flex-col items-center p-2 bg-gray-900 text-white rounded-b-lg">
//           <div className="text-lg font-medium mb-2">{formatTime(callTime)}</div>
//           <div className="flex space-x-4">
//             <button
//               onClick={() => {
//                 if (localStream) {
//                   localStream.getVideoTracks().forEach((track) => {
//                     track.enabled = !track.enabled;
//                   });
//                 }
//               }}
//               className="text-gray-400 hover:text-white"
//             >
//               <svg
//                 className="w-8 h-8"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
//                 />
//               </svg>
//             </button>
//             <button
//               onClick={endCall}
//               className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full flex items-center justify-center"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M9.25 9.75c-.42 0-.82.13-1.15.36l-1.64 1.14a2.25 2.25 0 0 0-.96 2.03l.18 1.97a2.25 2.25 0 0 0 2.2 2.05h1.22a.75.75 0 0 0 .75-.75v-2.25a.75.75 0 0 0-.75-.75h-.25a.75.75 0 0 1-.75-.75v-.5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-.25a.75.75 0 0 0-.75.75v2.25a.75.75 0 0 0 .75.75h1.22a2.25 2.25 0 0 0 2.2-2.05l.18-1.97a2.25 2.25 0 0 0-.96-2.03l-1.64-1.14a1.75 1.75 0 0 0-1.15-.36H9.25z"
//                 />
//               </svg>
//             </button>

//             <button
//               onClick={() => {
//                 if (localStream) {
//                   localStream.getAudioTracks().forEach((track) => {
//                     track.enabled = !track.enabled;
//                   });
//                 }
//               }}
//               className="text-gray-400 hover:text-white"
//             >
//               <svg
//                 className="w-8 h-8"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {error && <div className="text-red-500 text-center mt-2">{error}</div>}
//       </div>
//     </div>
//   );
// };

// export default VideoCall;
