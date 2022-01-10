export default function GameDetail(props) {
  return (
    <ul>
      <li>Name: {props.gameData.name}</li>
      <li>Summary: {props.gameData.summary}</li>
    </ul>
  );
}