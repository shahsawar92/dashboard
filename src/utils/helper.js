// // Encryption function
// export const encrypt = (text, shift) => {
//   let encryptedText = "";
//   for (let i = 0; i < text.length; i++) {
//     let char = text.charCodeAt(i);
//     if (isAlphanumeric(char)) {
//       char = shiftCharacter(char, shift);
//     }
//     encryptedText += String.fromCharCode(char);
//   }
//   return encryptedText;
// };

import { Alert } from "@mui/material";

// export const decrypt = (encryptedText, shift) => {
//   let decryptedText = "";
//   for (let i = 0; i < encryptedText.length; i++) {
//     let char = encryptedText.charCodeAt(i);
//     if (isAlphanumeric(char)) {
//       char = shiftCharacter(char, -shift);
//     }
//     decryptedText += String.fromCharCode(char);
//   }
//   return decryptedText;
// };

// // Helper function to check if the character is alphanumeric
// const isAlphanumeric = (charCode) => {
//   return (
//     (charCode >= 48 && charCode <= 57) || // Digits
//     (charCode >= 65 && charCode <= 90) || // Uppercase letters
//     (charCode >= 97 && charCode <= 122) // Lowercase letters
//   );
// };

// // Helper function to shift the character
// const shiftCharacter = (charCode, shift) => {
//   const totalChars = 26; // Total number of letters in the English alphabet

//   // Normalize the character code to the range of alphanumeric characters
//   if (charCode >= 48 && charCode <= 57) {
//     charCode = ((charCode - 48 + shift) % 10) + 48; // Shift digits
//   } else if (charCode >= 65 && charCode <= 90) {
//     charCode = ((charCode - 65 + shift) % totalChars) + 65; // Shift uppercase letters
//   } else if (charCode >= 97 && charCode <= 122) {
//     charCode = ((charCode - 97 + shift) % totalChars) + 97; // Shift lowercase letters
//   }
//   return charCode;
// };

  export const ErrorMessage = ({ message }) => {
  return (
    <Alert severity="error">
      {message}
    </Alert>
  );
};

export function groupFilesByDate(files) {
  const groupedFiles = files?.reduce((groups, eachfile) => {
    const date = new Date(eachfile.date);
    const formattedDate = date.toLocaleDateString();

    if (!groups[formattedDate]) {
      groups[formattedDate] = [];
    }

    groups[formattedDate].push(eachfile);
    return groups;
  }, {});

  const sortedGroups = Object.entries(groupedFiles).sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    return dateA - dateB;
  });

  return Object.fromEntries(sortedGroups);
}

