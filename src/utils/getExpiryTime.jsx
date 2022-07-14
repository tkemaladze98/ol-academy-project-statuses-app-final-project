const ExpiryTime = 10 * 60 * 1000;
const getExpiryTime = () => {
  localStorage.setItem("expiry", new Date().getTime() + ExpiryTime);
  return;
};

export default getExpiryTime;
