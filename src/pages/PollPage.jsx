import Poll from "../Components/Home/Poll";

export default function PollPage() {
  return (
    <div style={{ width: "60%", margin: "auto", marginTop: "30px" }}>
      <h1>Poll of the Week</h1>
      <h2>Do you want to change canteen menu?</h2>
      <Poll />
    </div>
  );
}