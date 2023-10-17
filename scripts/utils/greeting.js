const greeting = () => {
  let text;
  const hour = new Date().getHours();
  if (hour < 12) {
    text = "Good Morning";
  } else if (hour < 17) {
    text = "Good Afternoon";
  } else if (hour < 20) {
    text = "Good Evening";
  } else {
    text = "Good Night"
  }
  return text;
}
export default greeting;