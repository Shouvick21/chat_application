const profilePic = (gender, username) => {
  if (gender === "Male") {
    return `https://avatar.iran.liara.run/public/boy?username=${username}`;
  } else {
    return `https://avatar.iran.liara.run/public/girl?username=${username}`;
  }
};
// console.log(profilePic("female","shouvick"))

module.exports = profilePic;
